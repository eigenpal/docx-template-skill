import * as fs from "fs";
import * as path from "path";
import PizZip from "pizzip";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";

const WORD_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

// xmldom types don't match global DOM types, use any for XML element params
type XmlEl = any;
type XmlDoc = any;

interface Modification {
  type:
    | "replaceTag"
    | "addVariable"
    | "removeTag"
    | "wrapLoop"
    | "addConditional"
    | "mergeFloatingTables";
  oldTag?: string;
  newTag?: string;
  searchText?: string;
  tag?: string;
  loopTag?: string;
  startText?: string;
  endText?: string;
  conditionalTag?: string;
  paragraphText?: string;
  tableIndices?: number[];
}

interface ModificationsFile {
  modifications: Modification[];
}

// ---------------------------------------------------------------------------
// Helpers (duplicated from generate.ts to keep each file standalone)
// ---------------------------------------------------------------------------

/** Get only direct child elements with given localName (avoids nested matches). */
function getDirectChildElements(parent: XmlEl, localName: string): XmlEl[] {
  const result: XmlEl[] = [];
  const children = parent.childNodes;
  if (!children) return result;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (
      child.nodeType === 1 &&
      child.localName === localName &&
      child.namespaceURI === WORD_NS
    ) {
      result.push(child);
    }
  }
  return result;
}

function concatenateRunText(paragraph: XmlEl): string {
  const runs = paragraph.getElementsByTagNameNS(WORD_NS, "r");
  let text = "";
  for (let i = 0; i < runs.length; i++) {
    const tElements = runs[i].getElementsByTagNameNS(WORD_NS, "t");
    for (let j = 0; j < tElements.length; j++) {
      text += tElements[j].textContent || "";
    }
  }
  return text;
}

/**
 * Style-preserving text replacement.
 * Only modifies the w:t nodes whose text overlaps the match.
 * All other runs keep their original text and formatting (w:rPr).
 */
function replaceInParagraph(
  paragraph: XmlEl,
  searchValue: string,
  replaceValue: string
): boolean {
  const runs = paragraph.getElementsByTagNameNS(WORD_NS, "r");
  if (runs.length === 0) return false;

  interface Seg {
    tNode: XmlEl;
    text: string;
    start: number;
  }
  const segments: Seg[] = [];
  let pos = 0;
  for (let i = 0; i < runs.length; i++) {
    const tEls = runs[i].getElementsByTagNameNS(WORD_NS, "t");
    for (let j = 0; j < tEls.length; j++) {
      const text: string = tEls[j].textContent || "";
      segments.push({ tNode: tEls[j], text, start: pos });
      pos += text.length;
    }
  }

  const fullText = segments.map((s) => s.text).join("");
  const matchStart = fullText.indexOf(searchValue);
  if (matchStart === -1) return false;
  const matchEnd = matchStart + searchValue.length;

  let placed = false;

  for (const seg of segments) {
    const segEnd = seg.start + seg.text.length;
    if (segEnd <= matchStart || seg.start >= matchEnd) continue;

    const keepBefore = seg.text.substring(
      0,
      Math.max(0, matchStart - seg.start)
    );
    const keepAfter = seg.text.substring(
      Math.min(seg.text.length, matchEnd - seg.start)
    );

    let newContent: string;
    if (!placed) {
      newContent = keepBefore + replaceValue + keepAfter;
      placed = true;
    } else {
      newContent = keepBefore + keepAfter;
    }

    seg.tNode.textContent = newContent;
    if (newContent.length > 0) {
      seg.tNode.setAttribute("xml:space", "preserve");
    }
  }

  return placed;
}

/** Insert a bare tag paragraph BEFORE `paragraph` (for conditionals). */
function insertTagParagraphBefore(
  doc: XmlDoc,
  paragraph: XmlEl,
  tag: string
): void {
  const newPara = doc.createElementNS(WORD_NS, "w:p");
  const newRun = doc.createElementNS(WORD_NS, "w:r");
  const newText = doc.createElementNS(WORD_NS, "w:t");
  newText.setAttribute("xml:space", "preserve");
  newText.textContent = tag;
  newRun.appendChild(newText);
  newPara.appendChild(newRun);
  paragraph.parentNode?.insertBefore(newPara, paragraph);
}

/** Insert a bare tag paragraph AFTER `paragraph` (for conditionals). */
function insertTagParagraphAfter(
  doc: XmlDoc,
  paragraph: XmlEl,
  tag: string
): void {
  const newPara = doc.createElementNS(WORD_NS, "w:p");
  const newRun = doc.createElementNS(WORD_NS, "w:r");
  const newText = doc.createElementNS(WORD_NS, "w:t");
  newText.setAttribute("xml:space", "preserve");
  newText.textContent = tag;
  newRun.appendChild(newText);
  newPara.appendChild(newRun);
  const next = paragraph.nextSibling;
  if (next) {
    paragraph.parentNode?.insertBefore(newPara, next);
  } else {
    paragraph.parentNode?.appendChild(newPara);
  }
}

// ---------------------------------------------------------------------------
// Modification application
// ---------------------------------------------------------------------------

function applyModification(
  doc: XmlDoc,
  body: XmlEl,
  mod: Modification
): void {
  const paragraphs = body.getElementsByTagNameNS(WORD_NS, "p");

  switch (mod.type) {
    case "replaceTag": {
      if (!mod.oldTag || !mod.newTag) break;
      const oldPlaceholder = `{${mod.oldTag}}`;
      const newPlaceholder = `{${mod.newTag}}`;
      for (let i = 0; i < paragraphs.length; i++) {
        replaceInParagraph(paragraphs[i], oldPlaceholder, newPlaceholder);
      }
      break;
    }

    case "addVariable": {
      if (!mod.searchText || !mod.tag) break;
      const tagPlaceholder = `{${mod.tag}}`;
      for (let i = 0; i < paragraphs.length; i++) {
        replaceInParagraph(paragraphs[i], mod.searchText, tagPlaceholder);
      }
      break;
    }

    case "removeTag": {
      if (!mod.oldTag) break;
      const placeholder = `{${mod.oldTag}}`;
      for (let i = 0; i < paragraphs.length; i++) {
        replaceInParagraph(paragraphs[i], placeholder, "");
      }
      const openTag = `{#${mod.oldTag}}`;
      const closeTag = `{/${mod.oldTag}}`;
      // Iterate backwards because removal shifts the live NodeList
      for (let i = paragraphs.length - 1; i >= 0; i--) {
        const text = concatenateRunText(paragraphs[i]);
        if (text.trim() === openTag || text.trim() === closeTag) {
          paragraphs[i].parentNode?.removeChild(paragraphs[i]);
        }
      }
      break;
    }

    case "wrapLoop": {
      if (!mod.loopTag || !mod.startText || !mod.endText) break;
      let startPara: XmlEl = null;
      let endPara: XmlEl = null;
      for (let i = 0; i < paragraphs.length; i++) {
        const text = concatenateRunText(paragraphs[i]);
        if (text.includes(mod.startText) && !startPara) {
          startPara = paragraphs[i];
        }
        if (text.includes(mod.endText)) {
          endPara = paragraphs[i];
        }
      }
      if (startPara) {
        insertTagParagraphBefore(doc, startPara, `{#${mod.loopTag}}`);
      }
      if (endPara) {
        insertTagParagraphAfter(doc, endPara, `{/${mod.loopTag}}`);
      }
      break;
    }

    case "addConditional": {
      if (!mod.conditionalTag || !mod.paragraphText) break;
      for (let i = 0; i < paragraphs.length; i++) {
        const text = concatenateRunText(paragraphs[i]);
        if (text.includes(mod.paragraphText)) {
          insertTagParagraphBefore(
            doc,
            paragraphs[i],
            `{#${mod.conditionalTag}}`
          );
          insertTagParagraphAfter(
            doc,
            paragraphs[i],
            `{/${mod.conditionalTag}}`
          );
          break;
        }
      }
      break;
    }

    case "mergeFloatingTables": {
      // Merge multiple floating tables into a single inline multi-column table.
      // Detects floating tables (w:tblpPr) and combines their cells side-by-side.
      const tables = getDirectChildElements(body, "tbl");

      // Determine which tables to merge
      let indicesToMerge: number[];
      if (mod.tableIndices && mod.tableIndices.length >= 2) {
        indicesToMerge = mod.tableIndices;
      } else {
        // Auto-detect: find all consecutive floating tables
        indicesToMerge = [];
        for (let i = 0; i < tables.length; i++) {
          const tblPr = getDirectChildElements(tables[i], "tblPr")[0];
          if (tblPr) {
            const tblpPr = getDirectChildElements(tblPr, "tblpPr")[0];
            if (tblpPr) {
              indicesToMerge.push(i);
            }
          }
        }
      }

      if (indicesToMerge.length < 2) break;

      const tablesToMerge = indicesToMerge.map((i) => tables[i]);

      // Collect rows from each table
      const allTableRows: XmlEl[][] = tablesToMerge.map((t) =>
        getDirectChildElements(t, "tr")
      );
      const maxRows = Math.max(...allTableRows.map((r) => r.length));

      // Count total columns for the merged table grid
      const colCounts = allTableRows.map((rows) => {
        if (rows.length === 0) return 1;
        return getDirectChildElements(rows[0], "tc").length;
      });
      const totalCols = colCounts.reduce((a, b) => a + b, 0);

      // Build the merged table
      const newTable = doc.createElementNS(WORD_NS, "w:tbl");

      // Create tblPr (inline, no floating, no borders)
      const newTblPr = doc.createElementNS(WORD_NS, "w:tblPr");
      const tblW = doc.createElementNS(WORD_NS, "w:tblW");
      tblW.setAttribute("w:w", "0");
      tblW.setAttribute("w:type", "auto");
      newTblPr.appendChild(tblW);

      // No borders
      const tblBorders = doc.createElementNS(WORD_NS, "w:tblBorders");
      for (const side of ["top", "left", "bottom", "right", "insideH", "insideV"]) {
        const border = doc.createElementNS(WORD_NS, `w:${side}`);
        border.setAttribute("w:val", "none");
        border.setAttribute("w:sz", "0");
        border.setAttribute("w:space", "0");
        border.setAttribute("w:color", "auto");
        tblBorders.appendChild(border);
      }
      newTblPr.appendChild(tblBorders);

      // Table layout fixed for predictable widths
      const tblLayout = doc.createElementNS(WORD_NS, "w:tblLayout");
      tblLayout.setAttribute("w:type", "fixed");
      newTblPr.appendChild(tblLayout);

      newTable.appendChild(newTblPr);

      // Create tblGrid with equal column widths
      const tblGrid = doc.createElementNS(WORD_NS, "w:tblGrid");
      const colWidth = Math.floor(9000 / totalCols);
      for (let c = 0; c < totalCols; c++) {
        const gridCol = doc.createElementNS(WORD_NS, "w:gridCol");
        gridCol.setAttribute("w:w", String(colWidth));
        tblGrid.appendChild(gridCol);
      }
      newTable.appendChild(tblGrid);

      // Build merged rows
      for (let ri = 0; ri < maxRows; ri++) {
        const newRow = doc.createElementNS(WORD_NS, "w:tr");

        for (let ti = 0; ti < tablesToMerge.length; ti++) {
          const rows = allTableRows[ti];
          const expectedCols = colCounts[ti];

          if (ri < rows.length) {
            // Copy cells from this table's row
            const cells = getDirectChildElements(rows[ri], "tc");
            for (const cell of cells) {
              // Clone the cell and strip any width constraints
              const clonedCell = cell.cloneNode(true);
              newRow.appendChild(clonedCell);
            }
            // Pad if this row has fewer cells than expected
            for (let pad = cells.length; pad < expectedCols; pad++) {
              const emptyCell = doc.createElementNS(WORD_NS, "w:tc");
              const emptyPara = doc.createElementNS(WORD_NS, "w:p");
              emptyCell.appendChild(emptyPara);
              newRow.appendChild(emptyCell);
            }
          } else {
            // This table has fewer rows — add empty cells
            for (let pad = 0; pad < expectedCols; pad++) {
              const emptyCell = doc.createElementNS(WORD_NS, "w:tc");
              const emptyPara = doc.createElementNS(WORD_NS, "w:p");
              emptyCell.appendChild(emptyPara);
              newRow.appendChild(emptyCell);
            }
          }
        }

        newTable.appendChild(newRow);
      }

      // Insert the merged table before the first original table
      body.insertBefore(newTable, tablesToMerge[0]);

      // Remove original tables and empty paragraphs between them
      // Collect nodes between first and last table to check for empty paragraphs
      const firstTable = tablesToMerge[0];
      const lastTable = tablesToMerge[tablesToMerge.length - 1];
      const nodesToRemove: XmlEl[] = [];

      let inRange = false;
      const bodyChildren = body.childNodes;
      for (let i = 0; i < bodyChildren.length; i++) {
        const node = bodyChildren[i];
        if (node === firstTable) {
          inRange = true;
          nodesToRemove.push(node);
          continue;
        }
        if (node === lastTable) {
          nodesToRemove.push(node);
          break;
        }
        if (inRange) {
          // Remove empty paragraphs and other floating tables between them
          nodesToRemove.push(node);
        }
      }

      for (const node of nodesToRemove) {
        body.removeChild(node);
      }

      console.error(
        `Merged ${tablesToMerge.length} floating tables into 1 inline table (${totalCols} columns, ${maxRows} rows)`
      );
      break;
    }
  }
}

function processXmlPart(xml: string, modifications: Modification[]): string {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const body = doc.documentElement;
  if (!body) return xml;

  for (const mod of modifications) {
    applyModification(doc, body, mod);
  }

  return new XMLSerializer().serializeToString(doc);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function refine(
  templatePath: string,
  modificationsPath: string,
  outputPath?: string
): Promise<void> {
  const buffer = fs.readFileSync(templatePath);
  const zip = new PizZip(buffer);
  const modsFile: ModificationsFile = JSON.parse(
    fs.readFileSync(modificationsPath, "utf-8")
  );

  const docXml = zip.file("word/document.xml")?.asText();
  if (docXml) {
    zip.file(
      "word/document.xml",
      processXmlPart(docXml, modsFile.modifications)
    );
  }

  for (const entry of Object.keys(zip.files)) {
    if (
      entry.match(/^word\/header\d+\.xml$/) ||
      entry.match(/^word\/footer\d+\.xml$/)
    ) {
      const partXml = zip.file(entry)?.asText();
      if (partXml) {
        zip.file(entry, processXmlPart(partXml, modsFile.modifications));
      }
    }
  }

  const out =
    outputPath || templatePath.replace(/\.docx$/i, "_refined.docx");
  const outputBuffer = zip.generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
  fs.writeFileSync(out, outputBuffer);
  console.log(`Refined template written to: ${out}`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error(
      "Usage: node refine.js <template.docx> <modifications.json> [output.docx]"
    );
    process.exit(1);
  }

  const templatePath = path.resolve(args[0]);
  const modificationsPath = path.resolve(args[1]);
  const outputPath = args[2] ? path.resolve(args[2]) : undefined;

  if (!fs.existsSync(templatePath)) {
    console.error(`File not found: ${templatePath}`);
    process.exit(1);
  }
  if (!fs.existsSync(modificationsPath)) {
    console.error(`File not found: ${modificationsPath}`);
    process.exit(1);
  }

  await refine(templatePath, modificationsPath, outputPath);
}

main().catch((err) => {
  console.error("Refinement failed:", err);
  process.exit(1);
});

export { refine, Modification, ModificationsFile };

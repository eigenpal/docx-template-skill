import * as fs from "fs";
import * as path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";

const WORD_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

// xmldom types don't match global DOM types, use any for XML element params
type XmlEl = any;
type XmlDoc = any;

interface FieldMapping {
  variables?: Record<string, string>;
  loops?: Array<{
    tag: string;
    tableIndex: number;
    startRow?: number;
    fields: Record<string, number>;
  }>;
  conditionals?: Array<{
    tag: string;
    paragraphText: string;
  }>;
}

// ---------------------------------------------------------------------------
// Helpers
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

/** Concatenate all w:t text across w:r runs in a paragraph. */
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

// ---------------------------------------------------------------------------
// Style-preserving text replacement
// ---------------------------------------------------------------------------

/**
 * Replace `searchValue` with `replaceValue` inside a paragraph, touching ONLY
 * the w:t nodes whose text overlaps the match.  All other runs (and their
 * formatting – w:rPr, etc.) are left completely untouched.
 *
 * The replacement text inherits the formatting of the first overlapping run,
 * which is the natural expectation.
 */
function replaceInParagraph(
  paragraph: XmlEl,
  searchValue: string,
  replaceValue: string
): boolean {
  const runs = paragraph.getElementsByTagNameNS(WORD_NS, "r");
  if (runs.length === 0) return false;

  // Build a flat list of text segments with their character offsets
  interface Seg {
    tNode: XmlEl;
    text: string;
    start: number; // inclusive char offset in concatenated text
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

    // No overlap with match range → keep as-is
    if (segEnd <= matchStart || seg.start >= matchEnd) continue;

    // Portion of this segment's text that falls BEFORE the match
    const keepBefore = seg.text.substring(
      0,
      Math.max(0, matchStart - seg.start)
    );
    // Portion that falls AFTER the match
    const keepAfter = seg.text.substring(
      Math.min(seg.text.length, matchEnd - seg.start)
    );

    let newContent: string;
    if (!placed) {
      // First overlapping segment: splice in the replacement
      newContent = keepBefore + replaceValue + keepAfter;
      placed = true;
    } else {
      // Later overlapping segments: drop the matched portion, keep the rest
      newContent = keepBefore + keepAfter;
    }

    seg.tNode.textContent = newContent;
    // Preserve leading/trailing spaces
    if (newContent.length > 0) {
      seg.tNode.setAttribute("xml:space", "preserve");
    }
  }

  return placed;
}

// ---------------------------------------------------------------------------
// Tag insertion helpers
// ---------------------------------------------------------------------------

/**
 * Insert a bare paragraph containing `tag` BEFORE `paragraph`.
 * Used for conditional section tags – docxtemplater's paragraphLoop mode
 * expects {#cond} and {/cond} as sole paragraph content.
 */
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

/** Insert a bare paragraph containing `tag` AFTER `paragraph`. */
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

/**
 * Prepend a w:r containing `tag` to the FIRST paragraph inside `cell`.
 * Inserted right after w:pPr (if any) so paragraph properties stay intact.
 * Used for table-row loop open tags.
 */
function prependTagRunToCell(doc: XmlDoc, cell: XmlEl, tag: string): void {
  const paras = getDirectChildElements(cell, "p");
  if (paras.length === 0) return;
  const para = paras[0];

  const newRun = doc.createElementNS(WORD_NS, "w:r");
  const newText = doc.createElementNS(WORD_NS, "w:t");
  newText.setAttribute("xml:space", "preserve");
  newText.textContent = tag;
  newRun.appendChild(newText);

  // Insert after w:pPr if present, otherwise at the very start
  const pPr = getDirectChildElements(para, "pPr")[0];
  if (pPr && pPr.nextSibling) {
    para.insertBefore(newRun, pPr.nextSibling);
  } else if (pPr) {
    para.appendChild(newRun);
  } else {
    if (para.firstChild) {
      para.insertBefore(newRun, para.firstChild);
    } else {
      para.appendChild(newRun);
    }
  }
}

/**
 * Append a w:r containing `tag` to the LAST paragraph inside `cell`.
 * Used for table-row loop close tags.
 */
function appendTagRunToCell(doc: XmlDoc, cell: XmlEl, tag: string): void {
  const paras = getDirectChildElements(cell, "p");
  if (paras.length === 0) return;
  const para = paras[paras.length - 1];

  const newRun = doc.createElementNS(WORD_NS, "w:r");
  const newText = doc.createElementNS(WORD_NS, "w:t");
  newText.setAttribute("xml:space", "preserve");
  newText.textContent = tag;
  newRun.appendChild(newText);
  para.appendChild(newRun);
}

// ---------------------------------------------------------------------------
// XML processing
// ---------------------------------------------------------------------------

function processXmlPart(xml: string, mapping: FieldMapping): string {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const body = doc.documentElement;
  if (!body) return xml;

  // --- Variable replacements ---
  if (mapping.variables) {
    const paragraphs = body.getElementsByTagNameNS(WORD_NS, "p");
    for (const [value, tag] of Object.entries(mapping.variables)) {
      const tagPlaceholder = `{${tag}}`;
      for (let i = 0; i < paragraphs.length; i++) {
        replaceInParagraph(paragraphs[i], value, tagPlaceholder);
      }
    }
  }

  // --- Loop insertion for table rows ---
  if (mapping.loops) {
    // Collect only top-level tables (direct children of w:body)
    const tables = getDirectChildElements(body, "tbl");
    for (const loop of mapping.loops) {
      if (loop.tableIndex >= tables.length) continue;
      const table = tables[loop.tableIndex];
      // Only direct-child rows (skip nested tables)
      const rows = getDirectChildElements(table, "tr");
      const startRow = loop.startRow ?? 1;
      if (startRow >= rows.length) continue;

      const templateRow = rows[startRow];

      // 1. Replace field values in the template row with tag placeholders
      const cells = getDirectChildElements(templateRow, "tc");
      for (const [fieldName, colIndex] of Object.entries(loop.fields)) {
        if (colIndex >= cells.length) continue;
        const cellParas = getDirectChildElements(cells[colIndex], "p");
        for (const cp of cellParas) {
          const text = concatenateRunText(cp);
          if (text.trim()) {
            replaceInParagraph(cp, text, `{${fieldName}}`);
          }
        }
      }

      // 2. Remove extra data rows (keep only the template row)
      //    Iterate backwards so indices don't shift.
      for (let ri = rows.length - 1; ri > startRow; ri--) {
        table.removeChild(rows[ri]);
      }

      // 3. Insert loop open/close tags inside the SAME row's cells
      //    so docxtemplater recognises a single-row loop.
      const cellsAfterClean = getDirectChildElements(templateRow, "tc");
      if (cellsAfterClean.length > 0) {
        prependTagRunToCell(doc, cellsAfterClean[0], `{#${loop.tag}}`);
        appendTagRunToCell(
          doc,
          cellsAfterClean[cellsAfterClean.length - 1],
          `{/${loop.tag}}`
        );
      }
    }
  }

  // --- Conditional insertion ---
  if (mapping.conditionals) {
    const paragraphs = body.getElementsByTagNameNS(WORD_NS, "p");
    for (const cond of mapping.conditionals) {
      for (let i = 0; i < paragraphs.length; i++) {
        const text = concatenateRunText(paragraphs[i]);
        if (text.includes(cond.paragraphText)) {
          insertTagParagraphBefore(doc, paragraphs[i], `{#${cond.tag}}`);
          insertTagParagraphAfter(doc, paragraphs[i], `{/${cond.tag}}`);
          break;
        }
      }
    }
  }

  return new XMLSerializer().serializeToString(doc);
}

function validateTemplate(zip: PizZip): string[] {
  try {
    new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    const content = zip.file("word/document.xml")?.asText() || "";
    const tagMatches = content.match(/\{[^}]+\}/g) || [];
    return tagMatches;
  } catch (err: any) {
    return [`Validation error: ${err.message}`];
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function generate(
  originalPath: string,
  mappingPath: string,
  outputPath?: string
): Promise<void> {
  const buffer = fs.readFileSync(originalPath);
  const zip = new PizZip(buffer);
  const mapping: FieldMapping = JSON.parse(
    fs.readFileSync(mappingPath, "utf-8")
  );

  // Process main document
  const docXml = zip.file("word/document.xml")?.asText();
  if (docXml) {
    zip.file("word/document.xml", processXmlPart(docXml, mapping));
  }

  // Process headers and footers
  for (const entry of Object.keys(zip.files)) {
    if (
      entry.match(/^word\/header\d+\.xml$/) ||
      entry.match(/^word\/footer\d+\.xml$/)
    ) {
      const partXml = zip.file(entry)?.asText();
      if (partXml) {
        zip.file(entry, processXmlPart(partXml, mapping));
      }
    }
  }

  // Validate
  const tags = validateTemplate(zip);
  if (tags.length > 0) {
    console.error("Template tags found:", tags);
  }

  // Write output
  const out = outputPath || originalPath.replace(/\.docx$/i, "_template.docx");
  const outputBuffer = zip.generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
  fs.writeFileSync(out, outputBuffer);
  console.log(`Template written to: ${out}`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error(
      "Usage: node generate.js <original.docx> <field-mapping.json> [output.docx]"
    );
    process.exit(1);
  }

  const originalPath = path.resolve(args[0]);
  const mappingPath = path.resolve(args[1]);
  const outputPath = args[2] ? path.resolve(args[2]) : undefined;

  if (!fs.existsSync(originalPath)) {
    console.error(`File not found: ${originalPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(mappingPath)) {
    console.error(`File not found: ${mappingPath}`);
    process.exit(1);
  }

  await generate(originalPath, mappingPath, outputPath);
}

main().catch((err) => {
  console.error("Generation failed:", err);
  process.exit(1);
});

export { generate, FieldMapping };

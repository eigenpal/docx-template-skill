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
    | "addConditional";
  oldTag?: string;
  newTag?: string;
  searchText?: string;
  tag?: string;
  loopTag?: string;
  startText?: string;
  endText?: string;
  conditionalTag?: string;
  paragraphText?: string;
}

interface ModificationsFile {
  modifications: Modification[];
}

// ---------------------------------------------------------------------------
// Helpers (duplicated from generate.ts to keep each file standalone)
// ---------------------------------------------------------------------------

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

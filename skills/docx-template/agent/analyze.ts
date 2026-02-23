import * as fs from "fs";
import * as path from "path";
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import mammoth from "mammoth";

const WORD_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

interface RunStyle {
  bold?: boolean;
  italic?: boolean;
  fontSize?: string;
  fontFamily?: string;
  underline?: boolean;
}

interface TextRun {
  text: string;
  style: RunStyle;
}

interface Paragraph {
  text: string;
  runs: TextRun[];
  style?: string;
  numbering?: boolean;
}

interface TableCell {
  text: string;
  paragraphs: Paragraph[];
}

interface TableRow {
  cells: TableCell[];
}

interface Table {
  rows: TableRow[];
  headerRow?: boolean;
}

interface AnalysisResult {
  paragraphs: Paragraph[];
  tables: Table[];
  headers: Paragraph[];
  footers: Paragraph[];
  plainText: string;
}

// xmldom types don't match global DOM types, use any for XML element params
type XmlEl = any;
type XmlDoc = any;

function getRunStyle(runEl: XmlEl): RunStyle {
  const style: RunStyle = {};
  const rPr = runEl.getElementsByTagNameNS(WORD_NS, "rPr")[0];
  if (!rPr) return style;

  if (rPr.getElementsByTagNameNS(WORD_NS, "b").length > 0) style.bold = true;
  if (rPr.getElementsByTagNameNS(WORD_NS, "i").length > 0) style.italic = true;
  if (rPr.getElementsByTagNameNS(WORD_NS, "u").length > 0) style.underline = true;

  const sz = rPr.getElementsByTagNameNS(WORD_NS, "sz")[0];
  if (sz) style.fontSize = sz.getAttribute("w:val") || undefined;

  const rFonts = rPr.getElementsByTagNameNS(WORD_NS, "rFonts")[0];
  if (rFonts) style.fontFamily = rFonts.getAttribute("w:ascii") || undefined;

  return style;
}

function extractParagraphs(parent: XmlEl): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const pElements = parent.getElementsByTagNameNS(WORD_NS, "p");

  for (let i = 0; i < pElements.length; i++) {
    const p = pElements[i];
    // Skip paragraphs nested inside tables
    let isInTable = false;
    let node = p.parentNode;
    while (node && node !== parent) {
      if (
        node.nodeType === 1 &&
        (node as XmlEl).localName === "tbl" &&
        (node as XmlEl).namespaceURI === WORD_NS
      ) {
        isInTable = true;
        break;
      }
      node = node.parentNode;
    }
    if (isInTable) continue;

    const runs: TextRun[] = [];
    const rElements = p.getElementsByTagNameNS(WORD_NS, "r");
    for (let j = 0; j < rElements.length; j++) {
      const r = rElements[j];
      const tElements = r.getElementsByTagNameNS(WORD_NS, "t");
      let text = "";
      for (let k = 0; k < tElements.length; k++) {
        text += tElements[k].textContent || "";
      }
      if (text) {
        runs.push({ text, style: getRunStyle(r) });
      }
    }

    const fullText = runs.map((r) => r.text).join("");
    if (!fullText.trim()) continue;

    const pPr = p.getElementsByTagNameNS(WORD_NS, "pPr")[0];
    let styleName: string | undefined;
    let numbering = false;
    if (pPr) {
      const pStyle = pPr.getElementsByTagNameNS(WORD_NS, "pStyle")[0];
      if (pStyle) styleName = pStyle.getAttribute("w:val") || undefined;
      if (pPr.getElementsByTagNameNS(WORD_NS, "numPr").length > 0)
        numbering = true;
    }

    paragraphs.push({ text: fullText, runs, style: styleName, numbering });
  }

  return paragraphs;
}

function extractTables(parent: XmlEl): Table[] {
  const tables: Table[] = [];
  const tblElements = parent.getElementsByTagNameNS(WORD_NS, "tbl");

  for (let i = 0; i < tblElements.length; i++) {
    const tbl = tblElements[i];
    const rows: TableRow[] = [];
    const trElements = tbl.getElementsByTagNameNS(WORD_NS, "tr");

    for (let j = 0; j < trElements.length; j++) {
      const tr = trElements[j];
      const cells: TableCell[] = [];
      const tcElements = tr.getElementsByTagNameNS(WORD_NS, "tc");

      for (let k = 0; k < tcElements.length; k++) {
        const tc = tcElements[k];
        const cellParagraphs = extractParagraphs(tc);
        const cellText = cellParagraphs.map((p) => p.text).join("\n");
        cells.push({ text: cellText, paragraphs: cellParagraphs });
      }
      rows.push({ cells });
    }

    const headerRow =
      rows.length > 1 &&
      rows[0].cells.every((c) =>
        c.paragraphs.some((p) => p.runs.some((r) => r.style.bold))
      );
    tables.push({ rows, headerRow });
  }

  return tables;
}

function extractFromPart(
  zip: PizZip,
  partPath: string
): { paragraphs: Paragraph[]; tables: Table[] } {
  const file = zip.file(partPath);
  if (!file) return { paragraphs: [], tables: [] };

  const xml = file.asText();
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const body = doc.documentElement;

  return {
    paragraphs: extractParagraphs(body),
    tables: extractTables(body),
  };
}

async function analyze(docxPath: string): Promise<AnalysisResult> {
  const buffer = fs.readFileSync(docxPath);
  const zip = new PizZip(buffer);

  const main = extractFromPart(zip, "word/document.xml");

  const headers: Paragraph[] = [];
  const footers: Paragraph[] = [];

  for (const entry of Object.keys(zip.files)) {
    if (entry.match(/^word\/header\d+\.xml$/)) {
      const part = extractFromPart(zip, entry);
      headers.push(...part.paragraphs);
    }
    if (entry.match(/^word\/footer\d+\.xml$/)) {
      const part = extractFromPart(zip, entry);
      footers.push(...part.paragraphs);
    }
  }

  let plainText = "";
  try {
    const result = await mammoth.extractRawText({ buffer });
    plainText = result.value;
  } catch {
    plainText = main.paragraphs.map((p) => p.text).join("\n");
  }

  return {
    paragraphs: main.paragraphs,
    tables: main.tables,
    headers,
    footers,
    plainText,
  };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Usage: node analyze.js <path-to-docx> [path2.docx] [path3.docx] ...");
    process.exit(1);
  }

  // Resolve and validate all paths
  const paths: string[] = [];
  for (const arg of args) {
    const p = path.resolve(arg);
    if (!fs.existsSync(p)) {
      console.error(`File not found: ${p}`);
      process.exit(1);
    }
    paths.push(p);
  }

  if (paths.length === 1) {
    // Single file: output analysis directly
    const result = await analyze(paths[0]);
    console.log(JSON.stringify(result, null, 2));
  } else {
    // Multiple files: output each file's analysis separately
    const results = [];
    for (const p of paths) {
      const analysis = await analyze(p);
      results.push({ file: path.basename(p), analysis });
    }
    console.log(JSON.stringify({ files: results }, null, 2));
  }
}

main().catch((err) => {
  console.error("Analysis failed:", err);
  process.exit(1);
});

export { analyze, AnalysisResult, Paragraph, Table };

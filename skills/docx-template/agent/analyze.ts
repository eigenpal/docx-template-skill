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

interface SuggestedField {
  value: string;
  suggestedTag: string;
  reason: string;
  location: string;
}

interface AnalysisResult {
  paragraphs: Paragraph[];
  tables: Table[];
  headers: Paragraph[];
  footers: Paragraph[];
  suggestedFields: SuggestedField[];
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

const DATE_PATTERNS = [
  /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b/,
  /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i,
  /\b\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i,
];

const EMAIL_PATTERN = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/;
const CURRENCY_PATTERN =
  /[$\u20AC\u00A3]\s?\d[\d,]*\.?\d*|\d[\d,]*\.?\d*\s?(?:USD|EUR|GBP)/;
const PHONE_PATTERN =
  /\b(?:\+?\d{1,3}[\s\-]?)?\(?\d{2,4}\)?[\s\-]?\d{3,4}[\s\-]?\d{3,4}\b/;

function suggestFields(
  paragraphs: Paragraph[],
  tables: Table[]
): SuggestedField[] {
  const suggestions: SuggestedField[] = [];
  const seen = new Set<string>();

  function addSuggestion(
    value: string,
    tag: string,
    reason: string,
    location: string
  ) {
    const key = `${tag}:${value}`;
    if (seen.has(key)) return;
    seen.add(key);
    suggestions.push({
      value,
      suggestedTag: tag,
      reason,
      location,
    });
  }

  for (const p of paragraphs) {
    for (const pattern of DATE_PATTERNS) {
      const match = p.text.match(pattern);
      if (match) {
        addSuggestion(match[0], "date", "Date detected", `paragraph`);
      }
    }

    const emailMatch = p.text.match(EMAIL_PATTERN);
    if (emailMatch) {
      addSuggestion(emailMatch[0], "email", "Email address detected", `paragraph`);
    }

    const currencyMatch = p.text.match(CURRENCY_PATTERN);
    if (currencyMatch) {
      addSuggestion(
        currencyMatch[0],
        "amount",
        "Currency amount detected",
        `paragraph`
      );
    }

    const phoneMatch = p.text.match(PHONE_PATTERN);
    if (phoneMatch) {
      addSuggestion(
        phoneMatch[0],
        "phone",
        "Phone number detected",
        `paragraph`
      );
    }
  }

  for (let ti = 0; ti < tables.length; ti++) {
    const table = tables[ti];
    if (table.rows.length > 2 && table.headerRow) {
      addSuggestion(
        `Table ${ti + 1} (${table.rows.length} rows)`,
        `items`,
        "Repeating table rows detected — candidate for loop",
        `table ${ti + 1}`
      );
    }
    for (const row of table.rows) {
      for (const cell of row.cells) {
        const currMatch = cell.text.match(CURRENCY_PATTERN);
        if (currMatch) {
          addSuggestion(
            currMatch[0],
            "amount",
            "Currency in table cell",
            `table ${ti + 1}`
          );
        }
      }
    }
  }

  return suggestions;
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

  const suggestedFields = suggestFields(
    [...main.paragraphs, ...headers, ...footers],
    main.tables
  );

  return {
    paragraphs: main.paragraphs,
    tables: main.tables,
    headers,
    footers,
    suggestedFields,
    plainText,
  };
}

/**
 * Compare multiple analysis results to find which text varies (likely
 * variables) vs stays the same (static content).
 */
function diffAnalyses(
  results: Array<{ file: string; analysis: AnalysisResult }>
): {
  staticText: string[];
  varyingText: Array<{ paragraphIndex: number; values: string[] }>;
  suggestedFields: SuggestedField[];
} {
  if (results.length < 2) {
    return {
      staticText: [],
      varyingText: [],
      suggestedFields: results[0]?.analysis.suggestedFields ?? [],
    };
  }

  const base = results[0].analysis;
  const staticText: string[] = [];
  const varyingText: Array<{ paragraphIndex: number; values: string[] }> = [];

  for (let i = 0; i < base.paragraphs.length; i++) {
    const baseText = base.paragraphs[i].text;
    const others = results.slice(1).map((r) => r.analysis.paragraphs[i]?.text ?? "");
    const allSame = others.every((t) => t === baseText);

    if (allSame) {
      staticText.push(baseText);
    } else {
      varyingText.push({
        paragraphIndex: i,
        values: [baseText, ...others],
      });
    }
  }

  // Merge suggested fields from all files, deduplicated
  const seen = new Set<string>();
  const allSuggested: SuggestedField[] = [];
  for (const r of results) {
    for (const f of r.analysis.suggestedFields) {
      const key = `${f.suggestedTag}:${f.value}`;
      if (!seen.has(key)) {
        seen.add(key);
        allSuggested.push(f);
      }
    }
  }

  // Add varying paragraphs as suggested fields
  for (const v of varyingText) {
    const key = `varying:para${v.paragraphIndex}`;
    if (!seen.has(key)) {
      seen.add(key);
      allSuggested.push({
        value: v.values[0],
        suggestedTag: `field${v.paragraphIndex}`,
        reason: `Text varies across ${results.length} examples: ${v.values.map((s) => `"${s.substring(0, 40)}"`).join(", ")}`,
        location: `paragraph ${v.paragraphIndex}`,
      });
    }
  }

  return { staticText, varyingText, suggestedFields: allSuggested };
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
    // Multiple files: analyze each, then diff
    const results = [];
    for (const p of paths) {
      const analysis = await analyze(p);
      results.push({ file: path.basename(p), analysis });
    }

    const diff = diffAnalyses(results);
    const output = {
      files: results.map((r) => r.file),
      fileCount: results.length,
      diff: {
        staticParagraphs: diff.staticText.length,
        varyingParagraphs: diff.varyingText.length,
        varyingText: diff.varyingText,
      },
      suggestedFields: diff.suggestedFields,
      // Include full analysis of first file as reference
      referenceAnalysis: results[0].analysis,
    };
    console.log(JSON.stringify(output, null, 2));
  }
}

main().catch((err) => {
  console.error("Analysis failed:", err);
  process.exit(1);
});

export { analyze, AnalysisResult, Paragraph, Table, SuggestedField };

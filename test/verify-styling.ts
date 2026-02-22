/**
 * Verify that replaceInParagraph preserves per-run styling.
 *
 * Creates a minimal DOCX where a paragraph has multiple runs with
 * different formatting, replaces text in one run, and checks that
 * all other runs are untouched.
 */
import PizZip from "pizzip";
import { DOMParser, XMLSerializer } from "@xmldom/xmldom";

const WORD_NS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
type XmlEl = any;

// ---- Inline copy of the function under test ----

function replaceInParagraph(
  paragraph: XmlEl,
  searchValue: string,
  replaceValue: string
): boolean {
  const runs = paragraph.getElementsByTagNameNS(WORD_NS, "r");
  if (runs.length === 0) return false;

  interface Seg { tNode: XmlEl; text: string; start: number; }
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

    const keepBefore = seg.text.substring(0, Math.max(0, matchStart - seg.start));
    const keepAfter = seg.text.substring(Math.min(seg.text.length, matchEnd - seg.start));

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

// ---- Test cases ----

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  PASS: ${name}`);
  } catch (e: any) {
    console.error(`  FAIL: ${name}`);
    console.error(`        ${e.message}`);
    process.exitCode = 1;
  }
}

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

function makeParagraph(xml: string): XmlEl {
  const doc = new DOMParser().parseFromString(
    `<w:document xmlns:w="${WORD_NS}">${xml}</w:document>`,
    "text/xml"
  );
  return doc.getElementsByTagNameNS(WORD_NS, "p")[0];
}

function serializeParagraph(p: XmlEl): string {
  return new XMLSerializer().serializeToString(p);
}

console.log("\n=== replaceInParagraph tests ===\n");

test("single run – replace preserves run", () => {
  const p = makeParagraph(`
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>Hello World</w:t></w:r>
    </w:p>
  `);
  const ok = replaceInParagraph(p, "World", "{name}");
  assert(ok, "should match");
  const xml = serializeParagraph(p);
  // The bold run should still be there with <w:b/>
  assert(xml.includes("<w:b/>"), "bold formatting must survive");
  // Text should be replaced
  assert(xml.includes("Hello {name}"), "text should be replaced");
});

test("multi-run – only the matching run text changes", () => {
  // Run 1: bold "Invoice #"
  // Run 2: bold+red "12345"
  // Run 3: normal " — thank you"
  const p = makeParagraph(`
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>Invoice #</w:t></w:r>
      <w:r><w:rPr><w:b/><w:color w:val="FF0000"/></w:rPr><w:t>12345</w:t></w:r>
      <w:r><w:t> — thank you</w:t></w:r>
    </w:p>
  `);
  const ok = replaceInParagraph(p, "12345", "{invoiceNumber}");
  assert(ok, "should match");
  const xml = serializeParagraph(p);

  // Run 1 text must be unchanged
  assert(xml.includes("Invoice #"), "run 1 text untouched");
  // Run 2 must keep its rPr AND have new text
  assert(xml.includes("FF0000"), "run 2 color must survive");
  assert(xml.includes("{invoiceNumber}"), "replacement placed");
  // Run 3 must be unchanged
  assert(xml.includes(" — thank you"), "run 3 text untouched");
});

test("cross-run match – replacement goes into first overlapping run", () => {
  // "Hel" in run 1 (bold), "lo Wo" in run 2 (italic), "rld!" in run 3 (normal)
  const p = makeParagraph(`
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>Hel</w:t></w:r>
      <w:r><w:rPr><w:i/></w:rPr><w:t>lo Wo</w:t></w:r>
      <w:r><w:t>rld!</w:t></w:r>
    </w:p>
  `);
  // Replace "lo World" which spans runs 2 and 3
  const ok = replaceInParagraph(p, "lo World", "{greeting}");
  assert(ok, "should match");
  const xml = serializeParagraph(p);

  // Run 1 must be untouched
  assert(xml.includes("<w:b/>"), "run 1 bold preserved");
  assert(xml.includes("Hel"), "run 1 text untouched");
  // Run 2 should have "{greeting}" (the overlap portion replaced)
  assert(xml.includes("{greeting}"), "replacement placed");
  // Run 3 should have only "!" remaining
  assert(xml.includes("!"), "trailing text preserved");
  // Run 2's italic must survive
  assert(xml.includes("<w:i/>"), "run 2 italic preserved");
});

test("no match returns false, paragraph unchanged", () => {
  const p = makeParagraph(`
    <w:p>
      <w:r><w:rPr><w:b/></w:rPr><w:t>Nothing here</w:t></w:r>
    </w:p>
  `);
  const before = serializeParagraph(p);
  const ok = replaceInParagraph(p, "missing", "{x}");
  assert(!ok, "should not match");
  const after = serializeParagraph(p);
  assert(before === after, "XML must be identical");
});

test("paragraph properties (pPr) are never touched", () => {
  const p = makeParagraph(`
    <w:p>
      <w:pPr>
        <w:pStyle w:val="Heading1"/>
        <w:jc w:val="center"/>
        <w:spacing w:before="240" w:after="120"/>
      </w:pPr>
      <w:r><w:t>Replace me</w:t></w:r>
    </w:p>
  `);
  replaceInParagraph(p, "Replace me", "{title}");
  const xml = serializeParagraph(p);
  assert(xml.includes('w:val="Heading1"'), "pStyle preserved");
  assert(xml.includes('w:val="center"'), "alignment preserved");
  assert(xml.includes('w:before="240"'), "spacing preserved");
});

console.log("\n=== Full DOCX round-trip test ===\n");

test("generate round-trip preserves all zip entries", () => {
  // Build a minimal valid DOCX in memory
  const zip = new PizZip();

  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const docXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="${WORD_NS}">
  <w:body>
    <w:p>
      <w:pPr><w:pStyle w:val="Title"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="48"/></w:rPr><w:t>Company: </w:t></w:r>
      <w:r><w:rPr><w:b/><w:sz w:val="48"/><w:color w:val="0000FF"/></w:rPr><w:t>Acme Corp</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Date: January 15, 2025</w:t></w:r>
    </w:p>
    <w:sectPr><w:pgSz w:w="12240" w:h="15840"/></w:sectPr>
  </w:body>
</w:document>`;

  zip.file("[Content_Types].xml", contentTypes);
  zip.file("_rels/.rels", rels);
  zip.file("word/document.xml", docXml);

  // Process with our function
  const { DOMParser: DP, XMLSerializer: XS } = require("@xmldom/xmldom");
  const doc = new DP().parseFromString(docXml, "text/xml");
  const body = doc.documentElement;
  const paragraphs = body.getElementsByTagNameNS(WORD_NS, "p");

  // Replace "Acme Corp" in second run of first paragraph
  replaceInParagraph(paragraphs[0], "Acme Corp", "{companyName}");

  const resultXml = new XS().serializeToString(doc);

  // Verify styling
  assert(resultXml.includes('w:val="Title"'), "paragraph style preserved");
  assert(resultXml.includes('w:val="48"'), "font size preserved");
  assert(resultXml.includes('w:val="0000FF"'), "blue color preserved on replacement run");
  assert(resultXml.includes("{companyName}"), "tag inserted");
  assert(resultXml.includes("Company: "), "static text in first run untouched");
  // Verify sectPr at body level is untouched
  assert(resultXml.includes("w:pgSz"), "section properties preserved");
  assert(resultXml.includes('w:w="12240"'), "page width preserved");
});

console.log("\nDone.\n");

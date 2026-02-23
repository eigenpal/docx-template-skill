# Analyze — Extraction Output Format

The `analyze.js` tool extracts content from binary DOCX files so you can read and reason about it.

## Single-file output

```json
{
  "paragraphs": [
    {
      "text": "Full paragraph text",
      "runs": [
        { "text": "Full ", "style": { "bold": true } },
        { "text": "paragraph text", "style": {} }
      ],
      "style": "Heading1",
      "numbering": false
    }
  ],
  "tables": [
    {
      "rows": [
        {
          "cells": [
            {
              "text": "Cell text",
              "paragraphs": [{ "text": "Cell text", "runs": [...], "style": null }]
            }
          ]
        }
      ],
      "headerRow": true
    }
  ],
  "headers": [...],
  "footers": [...],
  "plainText": "Full document text extracted by mammoth"
}
```

## Multi-file output

When multiple files are passed, each file's extraction is output separately:

```json
{
  "files": [
    { "file": "invoice1.docx", "analysis": { "paragraphs": [...], "tables": [...], ... } },
    { "file": "invoice2.docx", "analysis": { "paragraphs": [...], "tables": [...], ... } }
  ]
}
```

## Key fields

- **paragraphs**: Body paragraphs (excludes table content). Each has `text` (concatenated), `runs` (with per-run styling), optional `style` name, and `numbering` flag.
- **tables**: Each table has `rows` → `cells` → `paragraphs`. `headerRow` is true when the first row has all-bold text.
- **headers/footers**: Paragraphs extracted from document headers and footers.
- **plainText**: Clean text from mammoth — useful for full-text overview.

## Notes

- Paragraphs inside tables appear only in the table structure, not in the top-level `paragraphs` array.
- Run styling includes: `bold`, `italic`, `underline`, `fontSize`, `fontFamily`.
- Tables are indexed in document order (0-based) — use this index for `tableIndex` in field mappings.

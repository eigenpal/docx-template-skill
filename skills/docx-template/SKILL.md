---
name: docx-template
description: Convert filled-out DOCX documents into reusable docxtemplater templates. Compares multiple completed documents to identify what varies vs. what's boilerplate, and maps input data (forms, PDFs, spreadsheets) to template structure. Use when the user wants to create, modify, or inspect DOCX templates.
argument-hint: "[path-to-docx or instruction]"
allowed-tools: "Bash(node *)"
---

# DOCX Template Generation

You help users convert filled-out `.docx` documents into reusable [docxtemplater](https://docxtemplater.com/) templates.

The typical workflow starts with **completed, real-world documents** — not blank forms. You analyze them to reverse-engineer the template structure:

- **Multiple filled-out documents**: Compare 2+ final documents (e.g., two signed contracts for different clients) to spot what changes between instances (variables) vs. what stays the same (boilerplate). Recognize where repeated structures like numbered clauses or person listings indicate loops.
- **Input data + document**: The user provides a filled-out document alongside the source data that produced it (a form submission, PDF, spreadsheet, email). Map the input fields to where they appear in the document to determine the template structure — including which fields group into loops and how formatting like addresses should be preserved.

The tools are pre-built and ready to use — no installation needed.

Read `AGENT_INSTRUCTIONS.md` (in this skill's directory) before starting any template work.

## Tools

All tools are in `agent/dist/` relative to this skill's directory:

- `node agent/dist/analyze.js <file.docx> [file2.docx] ...` — Extract document structure (paragraphs, tables, headers/footers, plain text) as JSON. Claude can't read binary DOCX — this tool makes the content visible.
- `node agent/dist/generate.js <original.docx> <mapping.json> [output.docx]` — Create template from original + field mapping
- `node agent/dist/refine.js <template.docx> <mods.json> [output.docx]` — Modify existing template

## Workflow

### Step 1: Extract content from DOCX

Save any user-provided DOCX to `examples/` in the project root, then extract:

```bash
# Single file
node agent/dist/analyze.js examples/<filename>.docx

# Multiple files — outputs each file's extraction separately for comparison
node agent/dist/analyze.js examples/*.docx
```

### Step 2: Decide what to template

You are the analyst. Read the extracted content and reason about the template structure:

- **Compare multiple documents**: If 2+ DOCX files are provided, diff them semantically. Text that changes between documents is a variable; text that stays the same is boilerplate. Sections that appear N times in one doc but M times in another are loops.
- **Map input data to document**: If the user provides source data (form, PDF, spreadsheet, email), trace each data field to where it lands in the document. Fields that repeat per item (e.g., per shareholder, per line item) indicate a loop. Preserve the document's formatting patterns — e.g., if an address spans multiple lines with specific punctuation, the template tags should match that layout.
- **Identify structure, not just values**: Look beyond simple variable substitution. Recognize repeated numbered sections, person listings, and signature blocks as loops. Notice when section numbering depends on the number of repeated items.

### Step 3: Generate the template

Build `field-mapping.json` from your analysis, then run:

```bash
node agent/dist/generate.js examples/<original>.docx field-mapping.json templates/<output>.docx
```

Always create a matching `sample_data.json` with realistic test data.

### Step 4: Refine (if needed)

For modifications to existing templates, build `modifications.json` and run:

```bash
node agent/dist/refine.js templates/<template>.docx modifications.json templates/<output>.docx
```

## Docxtemplater Syntax Reference

| Syntax | Purpose | Example |
|--------|---------|---------|
| `{tag}` | Simple variable | `{companyName}` |
| `{#loop}{/loop}` | Loop (arrays) | `{#items}...{/items}` |
| `{#bool}{/bool}` | Conditional (truthy) | `{#showDiscount}...{/showDiscount}` |
| `{^inverted}{/inverted}` | Inverted conditional | `{^hasItems}No items{/hasItems}` |
| `{.}` | Current item in loop | Inside `{#names}{.}{/names}` |
| `{nested.field}` | Dot notation | `{address.city}` |

## Rules

- Use **camelCase** for all tag names (`companyName`, not `company_name`)
- Use **plural nouns** for loops: `items`, `employees`, `transferClauses`
- Use **boolean prefixes** for conditionals: `showDiscount`, `hasSignature`
- Always extract before generating — never guess at document structure
- Always create `sample_data.json` alongside templates
- **Table-row loops**: Tags go inside table cells (same row), not as separate paragraphs around rows
- **Paragraph-section loops**: Use generate + refine (`wrapLoop`) for repeated paragraph blocks (numbered clauses, person listings, signature blocks). This is the most common loop type in legal/formal documents.
- **Section numbering**: When a loop generates numbered sections, all section numbers become variables — inside the loop (per-item) and after it (computed from array length). See `AGENT_INSTRUCTIONS.md` for the full pattern.
- See `agent/prompts/analyze.md` and `agent/prompts/generate.md` for detailed guidance

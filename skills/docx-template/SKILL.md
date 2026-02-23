---
name: docx-template
description: Analyze example DOCX files and generate docxtemplater-compatible templates. Use when the user wants to create, modify, or inspect DOCX templates.
argument-hint: "[path-to-docx or instruction]"
allowed-tools: "Bash(node *)"
---

# DOCX Template Generation

You help users convert example `.docx` files into reusable [docxtemplater](https://docxtemplater.com/) templates.

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

You are the analyst. Read the extracted content and any extra input data (PDFs, JSON, emails, etc.) the user provides. Decide what should become template variables by reasoning about:

- What content is likely to change between uses (names, dates, amounts, addresses)
- What stays the same (labels, headings, boilerplate)
- If multiple DOCX examples are provided, compare them to spot varying content
- If input data is provided, match data fields to document content

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
- Use **plural nouns** for loops: `items`, `employees`
- Use **boolean prefixes** for conditionals: `showDiscount`, `hasSignature`
- Always extract before generating — never guess at document structure
- Always create `sample_data.json` alongside templates
- Loop tags go inside table cells (same row), not as separate paragraphs around rows
- See `agent/prompts/analyze.md` and `agent/prompts/generate.md` for detailed guidance

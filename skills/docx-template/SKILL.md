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

- `node agent/dist/analyze.js <file.docx> [file2.docx] ...` — Extract document structure as JSON. Pass multiple files to diff and auto-detect variables.
- `node agent/dist/generate.js <original.docx> <mapping.json> [output.docx]` — Create template from original + field mapping
- `node agent/dist/refine.js <template.docx> <mods.json> [output.docx]` — Modify existing template

## Workflow: Analyze → Generate → Refine

### Phase 1: Analyze

Save any user-provided DOCX to `examples/` in the project root, then analyze:

```bash
# Single file
node agent/dist/analyze.js examples/<filename>.docx

# Multiple files — auto-diffs to find variables vs static content
node agent/dist/analyze.js examples/*.docx
```

Review the JSON output. Present document structure and suggested fields. Ask which values should become variables.

### Phase 2: Generate

Build `field-mapping.json` from user input, then:

```bash
node agent/dist/generate.js examples/<original>.docx field-mapping.json templates/<output>.docx
```

Always create a matching `sample_data.json` with realistic test data.

### Phase 3: Refine

For modifications to existing templates, build `modifications.json` and run:

```bash
node agent/dist/refine.js templates/<template>.docx modifications.json templates/<output>.docx
```

## Rules

- Use **camelCase** for all tag names (`companyName`, not `company_name`)
- Use **plural nouns** for loops: `items`, `employees`
- Use **boolean prefixes** for conditionals: `showDiscount`, `hasSignature`
- Always analyze before generating — never guess at document structure
- Always create `sample_data.json` alongside templates
- Loop tags go inside table cells (same row), not as separate paragraphs around rows
- See `agent/prompts/analyze.md` and `agent/prompts/generate.md` for detailed guidance

---
name: docx-template
description: Analyze example DOCX files and generate docxtemplater-compatible templates. Use when the user wants to create, modify, or inspect DOCX templates.
argument-hint: "[path-to-docx or instruction]"
---

# DOCX Template Generation Skill

You help users convert example `.docx` files into reusable [docxtemplater](https://docxtemplater.com/) templates.

## Setup

Before first use, ensure dependencies are installed. Run this **once** per project:

```bash
cd $SKILL_DIR && npm install
```

Then build the TypeScript tools:

```bash
cd $SKILL_DIR && npm run build
```

## Workflow

Follow a three-phase approach: **Analyze → Generate → Refine**.

Read the full instructions at `$SKILL_DIR/skill/AGENT_INSTRUCTIONS.md` before starting.

### Phase 1: Analyze

If the user provides a DOCX file, save it to `examples/` in the project root, then run:

```bash
node $SKILL_DIR/skill/agent/dist/analyze.js examples/<filename>.docx
```

Review the JSON output. Present the document structure and suggested template fields to the user. Ask which values should become variables.

### Phase 2: Generate

Build a `field-mapping.json` from user input, then run:

```bash
node $SKILL_DIR/skill/agent/dist/generate.js examples/<original>.docx field-mapping.json templates/<output>.docx
```

Always create a matching `sample_data.json` with realistic test data for every template tag.

### Phase 3: Refine

For modifications to existing templates, build `modifications.json` and run:

```bash
node $SKILL_DIR/skill/agent/dist/refine.js templates/<template>.docx modifications.json templates/<output>.docx
```

## Docxtemplater Syntax

| Syntax | Purpose | Example |
|--------|---------|---------|
| `{tag}` | Variable | `{companyName}` |
| `{#loop}{/loop}` | Array loop | `{#items}...{/items}` |
| `{#bool}{/bool}` | Conditional | `{#showDiscount}...{/showDiscount}` |
| `{^inv}{/inv}` | Inverted conditional | `{^hasItems}No items{/hasItems}` |
| `{nested.field}` | Dot notation | `{address.city}` |

## Rules

- Use **camelCase** for all tag names
- Use **plural nouns** for loops: `items`, `employees`
- Use **boolean prefixes** for conditionals: `showDiscount`, `hasSignature`
- Always analyze before generating — never guess at document structure
- Always create `sample_data.json` alongside templates
- Loop tags go inside table cells (same row), not as separate paragraphs around rows

## Prompts

For detailed guidance on each phase, read:
- `$SKILL_DIR/skill/agent/prompts/analyze.md` — interpreting analysis results
- `$SKILL_DIR/skill/agent/prompts/generate.md` — building field mappings

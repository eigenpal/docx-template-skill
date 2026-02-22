# DOCX Template Generation Skill

This project uses `@eigenpal/docx-template-skill` to convert example DOCX files into reusable docxtemplater templates.

## Project Structure

```
examples/          # Place example .docx files here
templates/         # Generated templates go here
sample_data.json   # Sample data for template rendering
skill/
  AGENT_INSTRUCTIONS.md  # Detailed workflow instructions
  agent/
    dist/analyze.js      # Extract document structure
    dist/generate.js     # Create template from original + mapping
    dist/refine.js       # Modify existing template
    prompts/             # Prompt guides for each phase
```

## Workflow

### Step 1: Analyze
```bash
node skill/agent/dist/analyze.js examples/<file>.docx
```
Review the JSON output. Identify which values should become template variables.

### Step 2: Generate
Create `field-mapping.json` with variable mappings, loops, and conditionals. Then:
```bash
node skill/agent/dist/generate.js examples/<file>.docx field-mapping.json templates/<output>.docx
```

### Step 3: Refine (if needed)
Create `modifications.json` and run:
```bash
node skill/agent/dist/refine.js templates/<template>.docx modifications.json templates/<output>.docx
```

### Step 4: Preview
```bash
bun run preview
```

## Key Rules

1. Read `skill/AGENT_INSTRUCTIONS.md` before starting any template work
2. Always analyze before generating — never guess at document structure
3. Use camelCase for all template tags
4. Create `sample_data.json` for every template
5. Validate templates load without errors in docxtemplater
6. Loop tags go in table cells, not around table rows
7. Process headers and footers separately from the main body

## Docxtemplater Syntax

- `{variable}` — simple replacement
- `{#loop}...{/loop}` — array iteration
- `{#condition}...{/condition}` — conditional section
- `{^inverted}...{/inverted}` — inverted conditional
- `{nested.field}` — dot notation for nested data

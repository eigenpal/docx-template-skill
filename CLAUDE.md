# @eigenpal/docx-template-skill

AI agent skill for converting example DOCX files into docxtemplater-compatible templates.

## Commands

```bash
bun install              # install dependencies
bun run build            # compile TypeScript (skill/agent/*.ts → skill/agent/dist/*.js)
bun run test             # run styling preservation tests
bun run preview          # launch Vite+React preview app on localhost:3000
```

## Project structure

- `SKILL.md` — Claude Code skill definition (defines `/docx-template` slash command)
- `bin/init.js` — CLI entry point (`npx @eigenpal/docx-template-skill init`)
- `skill/agent/analyze.ts` — Extracts paragraphs, tables, headers/footers from DOCX; auto-detects dates, emails, currencies, phones, loop candidates
- `skill/agent/generate.ts` — Creates docxtemplater templates from original DOCX + field mapping JSON. Style-preserving: only modifies `w:t` nodes that overlap the matched text, all other runs keep their formatting
- `skill/agent/refine.ts` — Surgical modifications to existing templates (replaceTag, addVariable, removeTag, wrapLoop, addConditional)
- `skill/agent/prompts/` — Markdown prompts guiding the agent through each phase
- `skill/AGENT_INSTRUCTIONS.md` — Full workflow reference for the agent
- `skill/rules/` — Rules files for Cursor (.cursorrules, .cursor/rules/docx.mdc) and Windsurf
- `preview/` — Vite+React split-pane compare/render UI
- `scripts/preview.sh` — Auto-detects DOCX files and launches preview
- `test/verify-styling.ts` — Tests for XML manipulation correctness

## Key architecture decisions

- **Style-preserving replacement** (`replaceInParagraph`): Builds a character-offset map of all `w:t` segments, finds the match, and only modifies overlapping `w:t` nodes. Non-overlapping runs keep all formatting (bold, italic, color, font, size).
- **Direct-child traversal** (`getDirectChildElements`): Avoids `getElementsByTagNameNS` grabbing elements from nested tables.
- **Single-row table loops**: Extra data rows are removed; `{#tag}` and `{/tag}` are injected as `w:r` runs within existing paragraphs in the same `w:tr`, so docxtemplater recognizes a row loop.
- **Conditional tags**: Inserted as bare `w:p` paragraphs before/after the target, which is correct for docxtemplater's `paragraphLoop` mode.
- **PizZip for DOCX manipulation**: Only the XML parts we explicitly rewrite are modified; all other zip entries (styles.xml, media, rels) pass through untouched.

## Conventions

- Use **bun** for all dependency management and script running (not npm/yarn)
- TypeScript source in `skill/agent/*.ts`, compiled output in `skill/agent/dist/`
- Each agent utility is a standalone CLI script with a `main()` entry point
- xmldom types use `any` aliases (`XmlEl`, `XmlDoc`) to avoid DOM type conflicts in Node
- Template tags use camelCase: `{companyName}`, `{#items}`, `{showDiscount}`

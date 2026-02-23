# @eigenpal/docx-template-skill

Claude Code plugin for converting example DOCX files into docxtemplater templates.

## Commands

```bash
bun install              # install dev dependencies
bun run build            # typecheck + bundle agent tools into standalone JS
bun run bundle           # bundle only (skip typecheck)
bun run typecheck        # typecheck only (no output)
bun run test             # run styling preservation tests
```

## Project structure

- `.claude-plugin/marketplace.json` — Plugin marketplace catalog (for `/plugin marketplace add`)
- `.claude-plugin/plugin.json` — Plugin metadata
- `skills/docx-template/SKILL.md` — Skill definition (defines `/docx-template` slash command)
- `skills/docx-template/AGENT_INSTRUCTIONS.md` — Full workflow reference
- `skills/docx-template/agent/analyze.ts` — Extracts paragraphs, tables, headers/footers, plain text from binary DOCX (Claude handles all analysis)
- `skills/docx-template/agent/generate.ts` — Creates templates with style-preserving text replacement
- `skills/docx-template/agent/refine.ts` — Surgical modifications to existing templates
- `skills/docx-template/agent/dist/` — Pre-bundled standalone JS files (committed, no install needed at runtime)
- `skills/docx-template/agent/prompts/` — Agent prompt guides for each phase
- `test/verify-styling.ts` — Tests for XML manipulation correctness

## Distribution

Users install via Claude Code plugin system:
```
/plugin marketplace add eigenpal/docx-template-skill
/plugin install docx-template@eigenpal
```

Agent tools in `dist/` are pre-bundled with all dependencies (pizzip, xmldom, docxtemplater, mammoth) via `bun build --target node`. No `bun install` or build step needed after plugin install.

## Key architecture decisions

- **Pre-bundled standalone tools**: `bun build --target node` inlines all deps into single JS files (~1.3MB analyze, ~0.5MB generate, ~0.3MB refine). Zero runtime dependencies.
- **Style-preserving replacement** (`replaceInParagraph`): Only modifies `w:t` nodes that overlap the matched text. All other runs keep formatting.
- **Direct-child traversal** (`getDirectChildElements`): Avoids `getElementsByTagNameNS` grabbing elements from nested tables.
- **Single-row table loops**: Extra data rows removed; `{#tag}`/`{/tag}` injected as `w:r` runs in the same `w:tr`.
- **Conditional tags**: Bare `w:p` paragraphs before/after target (correct for docxtemplater `paragraphLoop` mode).

## Conventions

- Use **bun** for all dependency management and scripts
- TypeScript source in `skills/docx-template/agent/*.ts`
- Bundled output in `skills/docx-template/agent/dist/*.js` (committed to git)
- After changing source, run `bun run build` and commit the updated dist/ files
- Template tags use camelCase: `{companyName}`, `{#items}`, `{showDiscount}`

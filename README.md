# @eigenpal/docx-template-skill

Claude Code plugin for converting example DOCX files into reusable [docxtemplater](https://docxtemplater.com/)-compatible templates.

## Install

```
/plugin marketplace add eigenpal/docx-template-skill
/plugin install docx-template
```

The tools are pre-bundled — no build step needed.

Then use `/docx-template` or just ask naturally:

> "Analyze the invoice in examples/ and create a template"

## Workflow

1. **Analyze** — Place `.docx` files in `examples/` and ask the agent to analyze them
2. **Generate** — Confirm which values become template variables; the agent creates the template
3. **Refine** — Ask for modifications: rename tags, add conditionals, wrap loops

Pass multiple example files to auto-detect which text varies (template variables) vs stays the same (static content).

## Template Syntax

Uses [docxtemplater](https://docxtemplater.com/) syntax:

| Syntax | Purpose |
|--------|---------|
| `{tag}` | Variable replacement |
| `{#items}...{/items}` | Loop over array |
| `{#show}...{/show}` | Conditional section |
| `{^hide}...{/hide}` | Inverted conditional |
| `{nested.field}` | Dot notation |

## Project Structure

```
.claude-plugin/
  marketplace.json       # Plugin marketplace catalog
  plugin.json            # Plugin metadata
skills/docx-template/
  SKILL.md               # Slash command definition
  AGENT_INSTRUCTIONS.md  # Agent workflow guide
  agent/
    analyze.ts           # Source
    generate.ts          # Source
    refine.ts            # Source
    dist/                # Pre-bundled standalone JS (committed)
    prompts/             # Agent prompt guides
```

## Development

```bash
bun install
bun run build            # typecheck + bundle agent tools
bun run test             # styling preservation tests
```

## License

MIT

# @eigenpal/docx-template-skill

Agentic generation of `.docx` templates from examples. Helps AI agents (Claude Code, Cursor, Windsurf) analyze example DOCX files and generate [docxtemplater](https://docxtemplater.com/)-compatible templates.

## Install for Claude Code

```
/plugin marketplace add eigenpal/docx-template-skill
/plugin install docx-template
```

That's it. The tools are pre-bundled — no build step needed.

Then use `/docx-template` or just ask naturally:

> "Analyze the invoice in examples/ and create a template"

## Install for Cursor / Windsurf

```bash
npx @eigenpal/docx-template-skill init --cursor
npx @eigenpal/docx-template-skill init --windsurf
```

## Usage

### Workflow

1. **Analyze** — Place a `.docx` in `examples/` and ask the agent to analyze it
2. **Generate** — Confirm which values become template variables; the agent creates the template
3. **Refine** — Ask for modifications: rename tags, add conditionals, wrap loops

### Preview

Compare original vs template side-by-side:

```bash
bun run preview
```

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
rules/                   # Cursor/Windsurf rules
preview/                 # Vite+React preview app
```

## Development

```bash
bun install
bun run build            # typecheck + bundle agent tools
bun run test             # styling preservation tests
bun run preview          # launch preview app
```

## License

MIT

# @eigenpal/docx-template-skill

Agentic generation of `.docx` templates from examples. Helps AI agents (Claude Code, Cursor, Windsurf) analyze example DOCX files and generate [docxtemplater](https://docxtemplater.com/)-compatible templates with a built-in compare preview.

## Install for Claude Code

### Option A: Clone directly (recommended)

Clone into your personal skills directory to get `/docx-template` available in all projects:

```bash
git clone https://github.com/eigenpal/docx-template-skill.git ~/.claude/skills/docx-template
cd ~/.claude/skills/docx-template
bun install
bun run build
```

Or install per-project:

```bash
git clone https://github.com/eigenpal/docx-template-skill.git .claude/skills/docx-template
cd .claude/skills/docx-template
bun install
bun run build
```

### Option B: npx init

```bash
npx @eigenpal/docx-template-skill init          # project-level (.claude/skills/)
npx @eigenpal/docx-template-skill init --user    # user-level (~/.claude/skills/)
```

Then install dependencies:

```bash
cd .claude/skills/docx-template   # or ~/.claude/skills/docx-template
bun install
bun run build
```

## Install for Cursor / Windsurf

```bash
npx @eigenpal/docx-template-skill init --cursor
npx @eigenpal/docx-template-skill init --windsurf
npx @eigenpal/docx-template-skill init --all      # all detected environments
```

## Usage

Once installed, use the `/docx-template` slash command in Claude Code:

```
/docx-template examples/invoice.docx
```

Or just ask naturally:

> "Analyze the invoice in examples/ and create a template with fields for company name, date, and line items"

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
SKILL.md               # Claude Code skill definition (slash command)
skill/
  AGENT_INSTRUCTIONS.md  # Agent workflow guide
  agent/
    analyze.ts           # Document analyzer (source)
    generate.ts          # Template generator (source)
    refine.ts            # Template refiner (source)
    dist/                # Compiled JS (after bun run build)
    prompts/             # Agent prompt guides
  rules/                 # Rules files for Cursor/Windsurf
preview/                 # Vite+React preview app
scripts/preview.sh       # Preview launcher
bin/init.js              # CLI installer
```

## Development

```bash
bun install
bun run build            # compile TypeScript
bun run test             # run styling preservation tests
bun run preview          # launch preview app
```

## License

MIT

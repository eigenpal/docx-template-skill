# @eigenpal/docx-template-skill

Convert filled-out DOCX documents into reusable [docxtemplater](https://docxtemplater.com/) templates. Works with both **Claude Code** and **Cursor**.

Provide completed real-world documents — the agent analyzes them, identifies variables, loops, and conditionals, and generates production-ready templates with preserved styling.

## Install

### Claude Code

```
/plugin marketplace add eigenpal/docx-template-skill
/plugin install docx-template@eigenpal
```

### Cursor

Cursor loads skills from `.claude/skills/` automatically. If you already installed via Claude Code, it just works.

Otherwise, clone the skill directly:

```bash
# Project-level (this project only)
git clone https://github.com/eigenpal/docx-template-skill .claude/skills/docx-template

# User-level (all projects)
git clone https://github.com/eigenpal/docx-template-skill ~/.claude/skills/docx-template
```

### Verify installation

Type `/docx-template` in the chat — it should appear as a slash command.

## Usage

```
/docx-template [path-to-docx or instruction]
```

The skill supports three workflows:

**1. Multiple filled-out documents** — provide 2+ completed documents (e.g., two contracts for different clients). The agent compares them to find what varies (variables) vs. what stays the same (boilerplate), and detects repeated sections (loops).

**2. Input data + document** — provide a completed document alongside the source data (form, PDF, spreadsheet, email). The agent maps input fields to where they appear in the document.

**3. Existing coded templates** — provide documents with `${var}` or `{{var}}` placeholders. The agent converts the syntax to docxtemplater format.

## What it does

- Extracts content from binary DOCX (paragraphs, tables, headers/footers, styling)
- Identifies variables, loops (table-row and paragraph-section), and conditionals
- Handles dynamic section numbering when loops generate numbered clauses
- Preserves per-run formatting (bold, italic, font size, etc.) during replacement
- Generates `sample_data.json` alongside every template
- Fixes fragile floating tables by merging them into inline multi-column tables

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
.claude-plugin/          # Claude Code plugin manifest
.cursor-plugin/          # Cursor plugin manifest
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

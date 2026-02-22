#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const cwd = process.cwd();
const skillRoot = path.resolve(__dirname, "..");

function log(msg) {
  console.log(`  ${msg}`);
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`Created ${path.relative(cwd, dirPath)}/`);
  } else {
    log(`${path.relative(cwd, dirPath)}/ already exists`);
  }
}

function copyFileIfNotExists(src, dest) {
  if (fs.existsSync(dest)) {
    log(`${path.relative(cwd, dest)} already exists, skipping`);
    return false;
  }
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  log(`Created ${path.relative(cwd, dest)}`);
  return true;
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Install as Claude Code skill (copies pre-bundled tools — no build needed)
// ---------------------------------------------------------------------------

function installClaudeSkill(scope) {
  const base =
    scope === "user"
      ? path.join(require("os").homedir(), ".claude", "skills", "docx-template")
      : path.join(cwd, ".claude", "skills", "docx-template");

  ensureDir(base);

  // Copy the entire skills/docx-template/ directory (SKILL.md + tools + prompts)
  const srcSkill = path.join(skillRoot, "skills", "docx-template");
  if (fs.existsSync(srcSkill)) {
    copyRecursive(srcSkill, base);
    log("Copied skill (pre-bundled tools, no install needed)");
  }

  return base;
}

// ---------------------------------------------------------------------------
// Install for Cursor / Windsurf (rules files)
// ---------------------------------------------------------------------------

function installCursorRules() {
  const rulesDir = path.join(skillRoot, "rules");
  copyFileIfNotExists(
    path.join(rulesDir, ".cursorrules"),
    path.join(cwd, ".cursorrules")
  );
  copyFileIfNotExists(
    path.join(rulesDir, ".cursor", "rules", "docx.mdc"),
    path.join(cwd, ".cursor", "rules", "docx.mdc")
  );
}

function installWindsurfRules() {
  const rulesDir = path.join(skillRoot, "rules");
  copyFileIfNotExists(
    path.join(rulesDir, ".cursorrules"),
    path.join(cwd, ".windsurfrules")
  );
}

// ---------------------------------------------------------------------------
// Shared scaffolding
// ---------------------------------------------------------------------------

function createProjectDirs() {
  ensureDir(path.join(cwd, "examples"));
  ensureDir(path.join(cwd, "templates"));
}

function createSampleData() {
  const sampleDataPath = path.join(cwd, "sample_data.json");
  if (fs.existsSync(sampleDataPath)) {
    log("sample_data.json already exists, skipping");
    return;
  }

  const sampleData = {
    companyName: "Acme Corporation",
    date: "January 15, 2025",
    recipientName: "Jane Smith",
    recipientEmail: "jane@example.com",
    items: [
      { description: "Widget A", quantity: 10, unitPrice: "$5.00", total: "$50.00" },
      { description: "Widget B", quantity: 5, unitPrice: "$12.00", total: "$60.00" },
    ],
    subtotal: "$110.00",
    tax: "$11.00",
    total: "$121.00",
    showDiscount: false,
  };

  fs.writeFileSync(sampleDataPath, JSON.stringify(sampleData, null, 2) + "\n");
  log("Created sample_data.json");
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function printUsage() {
  console.log(`
@eigenpal/docx-template-skill

For Claude Code (recommended):
  /plugin marketplace add eigenpal/docx-template-skill
  /plugin install docx-template

For manual install or Cursor/Windsurf:
  npx @eigenpal/docx-template-skill init              # Claude Code (project-level)
  npx @eigenpal/docx-template-skill init --user        # Claude Code (user-level)
  npx @eigenpal/docx-template-skill init --cursor      # Cursor rules
  npx @eigenpal/docx-template-skill init --windsurf    # Windsurf rules
  npx @eigenpal/docx-template-skill init --all         # All detected environments
`);
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command !== "init") {
    printUsage();
    process.exit(command ? 1 : 0);
  }

  const flags = new Set(args.slice(1));
  const userScope = flags.has("--user");
  const cursorOnly = flags.has("--cursor");
  const windsurfOnly = flags.has("--windsurf");
  const all = flags.has("--all");

  console.log("\n@eigenpal/docx-template-skill — Initializing...\n");

  createProjectDirs();
  console.log();

  if (all) {
    const skillDir = installClaudeSkill(userScope ? "user" : "project");
    log(`Installed Claude Code skill → ${path.relative(cwd, skillDir) || skillDir}`);
    installCursorRules();
    installWindsurfRules();
  } else if (cursorOnly) {
    installCursorRules();
  } else if (windsurfOnly) {
    installWindsurfRules();
  } else {
    const scope = userScope ? "user" : "project";
    const skillDir = installClaudeSkill(scope);
    log(`Installed Claude Code skill → ${path.relative(cwd, skillDir) || skillDir}`);
  }

  console.log();
  createSampleData();

  console.log("\nDone! Next steps:");
  console.log("  1. Place example .docx files in examples/");
  console.log('  2. Use /docx-template in Claude Code');
  console.log('  3. Or ask: "Analyze examples/invoice.docx and create a template"\n');
}

main();

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
// Install as Claude Code skill
// ---------------------------------------------------------------------------

function installClaudeSkill(scope) {
  // scope: "project" → .claude/skills/docx-template/
  //        "user"    → ~/.claude/skills/docx-template/
  const base =
    scope === "user"
      ? path.join(require("os").homedir(), ".claude", "skills", "docx-template")
      : path.join(cwd, ".claude", "skills", "docx-template");

  ensureDir(base);

  // Copy SKILL.md
  copyFileIfNotExists(
    path.join(skillRoot, "SKILL.md"),
    path.join(base, "SKILL.md")
  );

  // Copy skill/ directory (agent tools, prompts, instructions)
  const srcSkill = path.join(skillRoot, "skill");
  const destSkill = path.join(base, "skill");
  if (!fs.existsSync(destSkill)) {
    copyRecursive(srcSkill, destSkill);
    log("Copied skill/ (agent tools + prompts)");
  } else {
    log("skill/ already exists in skill dir, skipping");
  }

  // Copy package.json + tsconfig.json so `bun install && bun run build` works
  copyFileIfNotExists(
    path.join(skillRoot, "package.json"),
    path.join(base, "package.json")
  );
  copyFileIfNotExists(
    path.join(skillRoot, "tsconfig.json"),
    path.join(base, "tsconfig.json")
  );

  // Copy preview/ and scripts/
  const srcPreview = path.join(skillRoot, "preview");
  const destPreview = path.join(base, "preview");
  if (fs.existsSync(srcPreview) && !fs.existsSync(destPreview)) {
    copyRecursive(srcPreview, destPreview);
    log("Copied preview/ app");
  }

  const srcScripts = path.join(skillRoot, "scripts");
  const destScripts = path.join(base, "scripts");
  if (fs.existsSync(srcScripts) && !fs.existsSync(destScripts)) {
    copyRecursive(srcScripts, destScripts);
    log("Copied scripts/");
  }

  return base;
}

// ---------------------------------------------------------------------------
// Install for Cursor / Windsurf (rules files)
// ---------------------------------------------------------------------------

function installCursorRules() {
  const rulesDir = path.join(skillRoot, "skill", "rules");
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
  const rulesDir = path.join(skillRoot, "skill", "rules");
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
      {
        description: "Widget A",
        quantity: 10,
        unitPrice: "$5.00",
        total: "$50.00",
      },
      {
        description: "Widget B",
        quantity: 5,
        unitPrice: "$12.00",
        total: "$60.00",
      },
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
// Detect environment
// ---------------------------------------------------------------------------

function detectEnvironment() {
  const envs = [];
  if (
    fs.existsSync(path.join(cwd, ".claude")) ||
    fs.existsSync(path.join(cwd, "CLAUDE.md"))
  ) {
    envs.push("claude");
  }
  if (
    fs.existsSync(path.join(cwd, ".cursor")) ||
    fs.existsSync(path.join(cwd, ".cursorrules"))
  ) {
    envs.push("cursor");
  }
  if (fs.existsSync(path.join(cwd, ".windsurfrules"))) {
    envs.push("windsurf");
  }
  if (envs.length === 0) envs.push("claude");
  return envs;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function printUsage() {
  console.log(`
Usage: npx @eigenpal/docx-template-skill <command>

Commands:
  init              Install skill in current project (.claude/skills/)
  init --user       Install skill globally (~/.claude/skills/)
  init --cursor     Install as Cursor rules
  init --windsurf   Install as Windsurf rules
  init --all        Install for all detected environments
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

  // Create project directories
  createProjectDirs();
  console.log();

  if (all) {
    const envs = detectEnvironment();
    log(`Detected environments: ${envs.join(", ")}`);

    const skillDir = installClaudeSkill(userScope ? "user" : "project");
    log(`Installed Claude Code skill → ${path.relative(cwd, skillDir) || skillDir}`);

    if (envs.includes("cursor") || all) installCursorRules();
    if (envs.includes("windsurf") || all) installWindsurfRules();
  } else if (cursorOnly) {
    installCursorRules();
  } else if (windsurfOnly) {
    installWindsurfRules();
  } else {
    // Default: install as Claude Code skill
    const scope = userScope ? "user" : "project";
    const skillDir = installClaudeSkill(scope);
    log(`Installed Claude Code skill → ${path.relative(cwd, skillDir) || skillDir}`);
  }

  console.log();
  createSampleData();

  console.log("\nDone! Next steps:");
  console.log("  1. Place example .docx files in examples/");
  console.log("  2. Install skill deps: cd .claude/skills/docx-template && bun install && bun run build");
  console.log("  3. Use /docx-template in Claude Code to analyze and template files");
  console.log("  4. Or ask your agent: \"Analyze examples/invoice.docx and create a template\"\n");
}

main();

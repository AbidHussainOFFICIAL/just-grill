/**
 * Exports every design token to docs/design-tokens.json so designers, other tools and
 * the brand kit pages have one machine-readable list.
 *
 *   npm run tokens          write docs/design-tokens.json
 *   npm run tokens:check    fail if the file is out of date (use after editing globals.css)
 *
 * The CSS in src/app/globals.css is the single source of truth. The output follows the
 * W3C design-token layout ($value / $type); fluid sizes, calc() and var() values stay as CSS strings
 * with the type "css".
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cssPath = join(root, "src/app/globals.css");
const outPath = join(root, "docs/design-tokens.json");

const css = readFileSync(cssPath, "utf8");

/** Returns the text between the braces that follow `marker`. */
function block(source, marker) {
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Could not find "${marker}" in globals.css`);
  const open = source.indexOf("{", start);
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === "{") depth++;
    if (source[i] === "}" && --depth === 0) return source.slice(open + 1, i);
  }
  throw new Error(`Unbalanced braces after "${marker}"`);
}

function declarations(text) {
  const clean = text.replace(/\/\*[\s\S]*?\*\//g, "");
  return [...clean.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]);
}

const theme = declarations(block(css, "@theme static"));
const base = declarations(block(block(css, "@layer base"), ":root"));

const groups = [
  ["color", "color", /^--color-/],
  ["font", "fontFamily", /^--font-/],
  ["text", "css", /^--text-/],
  ["tracking", "dimension", /^--tracking-/],
  ["spacing", "css", /^--spacing/],
  ["radius", "css", /^--radius-/],
  ["shadow", "css", /^--shadow-/],
  ["container", "dimension", /^--container-/],
  ["breakpoint", "dimension", /^--breakpoint-/],
  ["animate", "css", /^--animate-/],
  ["motion", "duration", /^--motion-/],
  ["border", "dimension", /^--border-/],
  ["z", "number", /^--z-/],
  ["section", "css", /^--section-/],
  ["header", "dimension", /^--header-/],
  ["gradient", "css", /^--gradient-/],
];

const tokens = {};
let count = 0;

for (const [name, value] of [...theme, ...base]) {
  const group = groups.find(([, , pattern]) => pattern.test(name));
  if (!group) continue;

  const [groupName, type] = group;
  const path = name.replace(/^--/, "").split("-");
  if (path[0] === groupName) path.shift();
  if (groupName === "spacing" && path.length === 0) path.push("base");

  const keys = [groupName, ...path];
  let node = tokens;
  for (const key of keys.slice(0, -1)) node = node[key] ??= {};

  // Prettier lowercases hex colours and wraps long values over several lines, so normalise both:
  // the export must not depend on formatting.
  const normalised = value
    .replace(/\s+/g, " ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\s*,\s*/g, ", ")
    .replace(/#[0-9a-fA-F]{3,8}\b/g, (hex) => hex.toUpperCase());
  const looksLikeCss = /clamp\(|calc\(|var\(/.test(normalised) || /\s/.test(normalised);
  node[keys.at(-1)] = {
    $value: normalised,
    $type: looksLikeCss && type !== "color" ? "css" : type,
  };
  count++;
}

const output =
  JSON.stringify(
    {
      $description:
        "Grilli design tokens, generated from src/app/globals.css by scripts/export-tokens.mjs. Do not edit by hand.",
      ...tokens,
    },
    null,
    2,
  ) + "\n";

if (process.argv.includes("--check")) {
  let current = "";
  try {
    current = readFileSync(outPath, "utf8");
  } catch {
    /* missing file counts as out of date */
  }
  if (current !== output) {
    console.error("docs/design-tokens.json is out of date. Run: npm run tokens");
    process.exit(1);
  }
  console.log(`design-tokens.json is up to date (${count} tokens).`);
} else {
  writeFileSync(outPath, output);
  console.log(`Wrote docs/design-tokens.json (${count} tokens).`);
}

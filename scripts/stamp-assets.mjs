#!/usr/bin/env node
// Stamp a version onto the asset URLs in the deploy directory.
//
// Sources reference their siblings as `styles.css?v=__V__`. Nothing here is
// built or content-hashed, so those filenames never change on their own —
// which is why the cache headers in firebase.json can only be long-lived if
// something makes the URLs change per deploy. That something is this script:
// it rewrites `__V__` to the commit being deployed, so every deploy serves
// fresh URLs and browsers may cache each one forever.
//
//   node scripts/stamp-assets.mjs           stamp public/ with the short SHA
//   node scripts/stamp-assets.mjs --check   fail if any __V__ is left
//
// The --check mode runs as a Firebase predeploy hook, so a deploy that skipped
// the stamping step fails loudly instead of publishing `?v=__V__` under an
// immutable header and freezing it in everyone's browser for a year.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execSync } from 'node:child_process';

const DIR = 'public';
const EXTS = new Set(['.html', '.css', '.js', '.jsx']);
// A plain string, not a /g/ regex: RegExp.test carries lastIndex between
// calls, so a shared global regex silently skips matches when reused across
// files — exactly where this guard must not have false negatives.
const TOKEN = '__V__';

const check = process.argv.includes('--check');

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (EXTS.has(extname(name))) out.push(p);
  }
  return out;
}

function version() {
  if (process.env.ASSET_VERSION) return process.env.ASSET_VERSION.trim();
  return execSync('git rev-parse --short=8 HEAD').toString().trim();
}

const files = walk(DIR);

if (check) {
  const stale = files.filter((f) => readFileSync(f, 'utf8').includes(TOKEN));
  if (stale.length) {
    console.error(
      `refusing to deploy: unstamped __V__ still in ${stale.join(', ')}\n` +
        'run "node scripts/stamp-assets.mjs" first (CI does this automatically)'
    );
    process.exit(1);
  }
  console.log(`asset versions stamped in ${files.length} files`);
  process.exit(0);
}

const v = version();
let touched = 0;
for (const f of files) {
  const before = readFileSync(f, 'utf8');
  const after = before.replaceAll(TOKEN, v);
  if (after !== before) {
    writeFileSync(f, after);
    touched++;
  }
}
console.log(`stamped ${touched} of ${files.length} files with v=${v}`);

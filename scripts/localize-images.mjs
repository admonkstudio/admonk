// Downloads every Webflow CDN image referenced in src/content/ (and the logo) into src/assets/cms/,
// then rewrites the content files to point at the local copy so Astro can resize and convert them
// (AVIF/WebP) at build time. Safe to re-run: files already downloaded are skipped.
// Runs in GitHub Actions (.github/workflows/localize-images.yml) because the CDN isn't reachable everywhere.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join, relative } from 'node:path';

const CDN = /https:\/\/cdn\.prod\.website-files\.com\/[^"\s]+/g;
const OUT = 'src/assets/cms';
mkdirSync(OUT, { recursive: true });

const files = readdirSync('src/content', { recursive: true }).filter((f) => String(f).endsWith('.json')).map((f) => join('src/content', String(f)));
const urls = new Set(files.flatMap((f) => readFileSync(f, 'utf8').match(CDN) ?? []));

// Webflow names files "<24-hex id>_<name>.<ext>"; keep the readable name, drop the id unless it clashes.
const local = new Map();
const taken = new Set();
for (const url of [...urls].sort()) {
  let name = decodeURIComponent(basename(new URL(url).pathname)).replace(/^[0-9a-f]{24}_/, '').replace(/[^\w.-]+/g, '-').toLowerCase();
  if (taken.has(name)) name = `${basename(new URL(url).pathname).slice(0, 8)}-${name}`;
  taken.add(name);
  local.set(url, name);
}

let downloaded = 0;
const failed = [];
for (const [url, name] of local) {
  const path = join(OUT, name);
  if (existsSync(path)) continue;
  const res = await fetch(url);
  if (!res.ok) { failed.push(`${res.status} ${url}`); local.delete(url); continue; }
  writeFileSync(path, Buffer.from(await res.arrayBuffer()));
  downloaded++;
}

// The site logo lives in public/ so the layout can link it directly.
const LOGO = 'https://cdn.prod.website-files.com/68f2d144268648daf2a713dc/6a445cad852e3addbfe32923_Logo%203.png';
if (!existsSync('public/logo.png')) {
  const res = await fetch(LOGO);
  if (res.ok) { mkdirSync('public', { recursive: true }); writeFileSync('public/logo.png', Buffer.from(await res.arrayBuffer())); downloaded++; }
  else failed.push(`${res.status} ${LOGO}`);
}

let rewritten = 0;
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  const next = text.replace(CDN, (url) => (local.has(url) ? relative(join(f, '..'), join(OUT, local.get(url))) : url));
  if (next !== text) { writeFileSync(f, next); rewritten++; }
}
console.log(`${urls.size} images, ${downloaded} downloaded, ${rewritten} content files updated`);
if (failed.length) console.log(`Not downloaded (left as CDN links):\n${failed.join('\n')}`);

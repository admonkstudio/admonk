// Design adjustments on top of the Webflow markup (batch 1 of Hisham's review, Nov 2026).
// Styles live in src/design/admonk.css; this file only changes markup that CSS can't reach.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { fill } from './webflow-fill.mjs';
import { tokensCss, TOKENS, ELEMENTS, GROUPS } from '../src/design/tokens.mjs';

const ROOT = process.cwd();

// Sets the theme before first paint (no flash) and wires the toggle. Replaces Webflow's click
// interaction, which recoloured a handful of classes one by one and missed the rest of the page.
const THEME_HEAD = `<script>(function(){try{var t=localStorage.getItem('am-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>`;
const THEME_BODY = `<script>
(function () {
  var root = document.documentElement, btn = document.querySelector('.mood-icon');
  if (!root.getAttribute('data-theme')) root.setAttribute('data-theme', 'dark');
  if (!btn) return;
  function label() { btn.setAttribute('aria-label', root.getAttribute('data-theme') === 'light' ? 'Switch to dark mode' : 'Switch to light mode'); }
  function toggle() {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('am-theme', next); } catch (e) {}
    label();
  }
  btn.setAttribute('role', 'button'); btn.setAttribute('tabindex', '0'); label();
  btn.addEventListener('click', toggle);
  btn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
})();
(function () {
  // Live preview for the admin design editor: the editor sends CSS to this page when it's shown in its frame.
  if (window.parent === window || !/[?&]am-preview=1/.test(location.search)) {
    // Page view for the site's own analytics (no cookies; see worker/analytics.js).
    try {
      var q = new URLSearchParams(location.search);
      var data = JSON.stringify({ p: location.pathname, r: document.referrer, u: q.get('utm_source'), t: document.documentElement.getAttribute('data-theme') });
      if (!navigator.sendBeacon || !navigator.sendBeacon('/api/t', new Blob([data], { type: 'application/json' }))) fetch('/api/t', { method: 'POST', body: data, keepalive: true, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {}
    return;
  }
  var style = document.createElement('style'); style.id = 'am-preview'; document.head.appendChild(style);
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || !e.data || e.data.type !== 'am-design') return;
    var live = document.querySelector('link[href="/api/design.css"]'); if (live) live.disabled = true;
    style.textContent = e.data.css || '';
    if (e.data.theme) document.documentElement.setAttribute('data-theme', e.data.theme);
  });
  // Keep the preview flag when following links inside the editor's preview.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (a && a.origin === location.origin && !/am-preview=1/.test(a.search)) a.search += (a.search ? '&' : '?') + 'am-preview=1';
  }, true);
  window.parent.postMessage({ type: 'am-preview-ready', path: location.pathname }, location.origin);
})();
</script>`;

// The stylesheet is the generated tokens plus src/design/admonk.css; tokens.json feeds the admin editor.
let designHref;
function designFiles() {
  if (designHref) return designHref;
  const dir = join(ROOT, 'dist/wf/am');
  mkdirSync(dir, { recursive: true });
  const css = tokensCss() + '\n' + readFileSync(join(ROOT, 'src/design/admonk.css'), 'utf8');
  writeFileSync(join(dir, 'admonk.css'), css);
  writeFileSync(join(dir, 'tokens.json'), JSON.stringify({ groups: GROUPS, tokens: TOKENS, elements: ELEMENTS }));
  writeFileSync(join(dir, 'content-index.json'), JSON.stringify(contentIndex()));
  // Which commit this build came from, so the admin can tell when a content change is live.
  let commit = process.env.WORKERS_CI_COMMIT_SHA || '';
  if (!commit) { try { commit = execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(); } catch {} }
  writeFileSync(join(dir, 'build.json'), JSON.stringify({ commit, branch: process.env.WORKERS_CI_BRANCH || '', builtAt: new Date().toISOString() }));
  // Cache-bust on content so a new build is picked up straight away.
  let h = 0; for (let i = 0; i < css.length; i++) h = (h * 31 + css.charCodeAt(i)) | 0;
  return (designHref = `/wf/am/admonk.css?v=${(h >>> 0).toString(36)}`);
}

// A light index of every content item (name, image, draft) for the admin's lists and pickers.
function contentIndex() {
  const out = {};
  const base = join(ROOT, 'src/content');
  for (const coll of readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
    out[coll] = readdirSync(join(base, coll)).filter((f) => /\.(json|md)$/.test(f) && f !== 'README.md').map((f) => {
      const id = f.replace(/\.(json|md)$/, '');
      const raw = readFileSync(join(base, coll, f), 'utf8');
      if (f.endsWith('.md')) {
        const fm = (raw.match(/^---\n([\s\S]*?)\n---/) || [])[1] || '';
        const get = (k) => (fm.match(new RegExp(`^${k}:\\s*"?(.*?)"?\\s*$`, 'm')) || [])[1];
        return { id, name: get('title') || id, draft: get('draft') === 'true', date: get('published') };
      }
      try {
        const j = JSON.parse(raw);
        return { id, name: j.name || j.title || id, draft: !!j.draft, image: j.thumbnail || j.cover || j.icon || j.logo || j.flag || null, summary: j.summary || j.hero?.title || j.role || null };
      } catch { return { id, name: id }; }
    }).sort((a, b) => String(a.name).localeCompare(String(b.name)));
  }
  return out;
}

export function adjust($, path, { copyFile, media, portfolio }) {
  const css = designFiles();
  const icon = copyFile(join(ROOT, 'src/design/logo-icon.png'), 'am/logo-icon.png');
  $('head').prepend(THEME_HEAD);
  $('head').append(`<link rel="stylesheet" href="${css}">`);
  // Changes saved in the admin design editor (served by the Worker; empty until something is changed).
  $('head').append('<link rel="stylesheet" href="/api/design.css">');

  // Theme toggle: drop Webflow's interaction (bound through data-w-id) and use ours.
  $('.mood-icon').removeAttr('data-w-id');
  $('body').append(THEME_BODY);

  // Logo cell: icon only on desktop (the CSS hides the wordmark there).
  $('.site-nav .logo-brand').each((_, el) => {
    if (!$(el).find('.am-logo-icon').length) $(el).append(`<img class="am-logo-icon" src="${icon}" alt="Admonk Studio" width="85" height="86">`);
  });

  // Menu: wrap each word so the hover roll can be clipped cleanly.
  $('.menu-link-heading').each((_, el) => {
    if (!$(el).children('.am-roll').length) $(el).html(`<span class="am-roll">${$(el).html()}</span>`);
  });

  // Client logos: one seamless loop. Webflow's version scrolled a second, empty list after the logos.
  $('.logos-marquee').each((_, el) => {
    const logos = $(el).find('.client-logo-2 img').toArray().map((img) => ({ src: $(img).attr('src'), alt: $(img).attr('alt') || '' }));
    if (!logos.length) return;
    const group = (hidden) => `<div class="am-marquee-group"${hidden ? ' aria-hidden="true"' : ''}>${logos.map((l) => `<div class="am-marquee-item"><img src="${l.src}" alt="${hidden ? '' : l.alt}" loading="lazy"></div>`).join('')}</div>`;
    $(el).replaceWith(`<div class="am-marquee" style="--am-marquee-count:${Math.max(8, logos.length)}"><div class="am-marquee-track">${group(false)}${group(true)}</div></div>`);
  });

  // Empty panels Webflow left at the end of a page (the studio page has one): drop them, and let the
  // frames on either side follow each other instead of overlapping where the panel used to be.
  $('main.page-main > .top-section').filter((_, el) => !$(el).text().trim() && !$(el).find('img, video, svg, iframe, form').length).each((_, el) => {
    const prev = $(el).prev('.down-section');
    const next = $(el).next('.down-section').length ? $(el).next('.down-section') : $(el).is(':last-child') ? $('footer .down-section').first() : $();
    $(el).remove();
    if (prev.length && next.length) { prev.css('margin-bottom', '0'); next.css('margin-top', '0'); }
  });

  fill($, path, { media });
  if (path === '/') home($, { media, portfolio });
  pageText($, path);
}

// Page text editing (admin → Pages). Top-level pages keep their copy in the Webflow markup; the admin
// stores changes in src/content/pages/<slug>.json as { replacements: [{ find, replace }] }.
// The build lists each page's original text blocks for the editor, then applies the saved changes.
export const pageSlug = (path) => (path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '-'));
function pageText($, path) {
  if (path.split('/').filter(Boolean).length > 1 || path === '/404') return;
  const slug = pageSlug(path);
  const nodes = [];
  const walk = (el, section) => {
    for (const n of el.children || []) {
      if (n.type === 'text') { const t = n.data.replace(/\s+/g, ' ').trim(); if (t.length > 1 && /[a-z]/i.test(t)) nodes.push({ n, t, section }); }
      else if (n.type === 'tag' && !['script', 'style', 'noscript', 'svg', 'template'].includes(n.name)) walk(n, section || (n.name === 'nav' || /site-nav|navigation-mobile|_141-menu/.test(n.attribs?.class || '') ? 'Menu and navigation' : null) || (/^(section|footer)$/.test(n.name) || /(top|down)-section|footer_component|am-portfolio/.test(n.attribs?.class || '') ? sectionName($, n) : null));
    }
  };
  walk($('body')[0], null);
  const seen = new Set();
  const blocks = nodes.filter(({ t }) => (seen.has(t) ? false : seen.add(t))).map(({ t, section, n }) => ({ text: t, section: section || 'Page', tag: n.parent?.name || '' }));
  const dir = join(ROOT, 'dist/wf/am/pages');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${slug}.json`), JSON.stringify({ path, slug, blocks }));
  const file = join(ROOT, 'src/content/pages', `${slug}.json`);
  if (!existsSync(file)) return;
  const { replacements = [] } = JSON.parse(readFileSync(file, 'utf8'));
  const map = new Map(replacements.filter((r) => r.find && typeof r.replace === 'string').map((r) => [r.find.replace(/\s+/g, ' ').trim(), r.replace]));
  for (const { n, t } of nodes) if (map.has(t)) n.data = n.data.replace(/^(\s*)[\s\S]*?(\s*)$/, (_, a, b) => a + map.get(t) + b);
}
function sectionName($, el) {
  const h = ($(el).find('h1, h2, .heading').first().html() || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return h ? h.slice(0, 60) : ($(el).hasClass('footer_component') || el.name === 'footer' ? 'Footer' : 'Section');
}

function home($, { media, portfolio }) {
  const main = $('main.page-main');
  const sections = main.children().toArray();
  const find = (cls, text) => sections.find((s) => $(s).hasClass(cls) && $(s).text().includes(text));
  const eyes = find('down-section', 'Check our Portfolio');
  const work = sections.find((s) => $(s).hasClass('top-section') && $(s).find('.work_wrapper').length);
  const tools = sections.find((s) => $(s).hasClass('down-section') && $(s).find('.content-frame.is-matter').length);
  const consistent = find('top-section', 'more consistent experience');
  if (!eyes || !work || !tools || !consistent) { console.warn('webflow-adjust: home layout changed, skipping reorder'); return; }

  // Read the case studies shown on the home page, in Webflow's order.
  const byName = Object.fromEntries(Object.entries(portfolio).map(([id, p]) => [p.name.toLowerCase(), { id, ...p }]));
  const cases = $(work).find('.work_item').toArray().map((it) => {
    const name = $(it).find('.work_title').text().trim();
    const p = byName[name.toLowerCase()];
    return {
      name,
      href: p ? `/portfolio/${p.id}` : '/portfolio',
      img: (p && media(p.cover)) || $(it).find('img.work_image').attr('src'),
      meta: [$(it).find('.work_description').text().trim(), $(it).find('.work_date-text').text().trim()].filter(Boolean).join(' · '),
    };
  });
  const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const arrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const section = `<section class="am-portfolio" id="portfolio" aria-labelledby="am-portfolio-title">
  <div class="am-portfolio-inner">
    <div class="am-portfolio-head">
      <div><div class="am-eyebrow">Selected work</div><h2 id="am-portfolio-title" class="am-portfolio-title">Work that moves businesses forward</h2></div>
      <p>Brands, websites and automations we've built for clients across Egypt, the Gulf, the UK, the US and Australia.</p>
    </div>
    <div class="am-portfolio-grid">
${cases.map((c) => `      <a class="am-case" href="${c.href}">
        <div class="am-case-media"><img src="${c.img}" alt="${esc(c.name)} project" loading="lazy"></div>
        <div class="am-case-body"><div><div class="am-case-title">${esc(c.name)}</div><div class="am-case-meta">${esc(c.meta)}</div></div><span class="am-case-arrow">${arrow}</span></div>
      </a>`).join('\n')}
    </div>
    <div class="am-portfolio-cta"><a class="am-button" href="/portfolio">View the full portfolio ${arrow}</a></div>
  </div>
</section>`;

  // New order: … Trusted by → tools (frame) → "more consistent" panel → eyes (frame) → portfolio.
  $(work).remove();
  $(eyes).before($(tools)).before($(consistent));
  $(eyes).after(section);
  // The eyes frame scrolls away with the portfolio instead of being covered by it.
  $(eyes).attr('style', 'margin-bottom:0');
}

// Serves the Webflow design. Runs after `astro build` and writes the final HTML into dist/.
//
// - Pages that exist in Webflow are taken from webflow-snapshot/ (the published Webflow site, mirrored by
//   .github/workflows/webflow-snapshot.yml), so markup, styles and interactions match it exactly.
// - Pages Webflow doesn't have (tool pages, the tools index, the blog and its posts) are built from the
//   Webflow service-page template and filled from src/content.
// - Every page gets the same clean-up: assets served from this site, admonk.net URLs, fixes for the bugs
//   in the Webflow build, and the contact forms wired to /api/enquiry.
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import * as cheerio from 'cheerio';
import { marked } from 'marked';
import { parse as parseYaml } from 'yaml';
import { adjust } from './webflow-adjust.mjs';

const ROOT = process.cwd();
const SNAP = join(ROOT, 'webflow-snapshot');
const PAGES = join(SNAP, 'admonkstudio.webflow.io');
const DIST = join(ROOT, 'dist');
const ORIGIN = process.env.PUBLIC_SITE_ORIGIN ?? 'https://admonk.net';
const INDEXABLE = process.env.PUBLIC_INDEXABLE === 'true';

// ---------- assets ----------
const HOSTS = {
  'cdn.prod.website-files.com': 'cdn',
  'd3e54v103j8qbb.cloudfront.net': 'wfstatic',
  'cdn.jsdelivr.net': 'jsdelivr',
  'cdnjs.cloudflare.com': 'cdnjs',
};
const copied = new Set();
let remote = 0;

/** Returns a local /wf/... URL for a mirrored asset, or the original URL when it wasn't mirrored. */
function localize(url) {
  let u;
  try { u = new URL(url.trim()); } catch { return url; }
  if (u.hostname === 'admonkstudio.webflow.io') return (u.pathname.replace(/\/$/, '') || '/') + u.hash;
  if (u.hostname === 'd3e54v103j8qbb.cloudfront.net' && /jquery-3\.5\.1/.test(u.pathname)) return copyFile(join(ROOT, 'node_modules/jquery/dist/jquery.min.js'), 'jquery-3.5.1.min.js');
  const short = HOSTS[u.hostname];
  if (!short) return url;
  for (const p of [u.pathname, decodeURIComponent(u.pathname)]) {
    const file = join(SNAP, u.hostname, p);
    if (existsSync(file) && statSync(file).isFile()) return copyFile(file, `${short}${p}`.replace(/%/g, '_'));
  }
  remote++;
  return url;
}
function copyFile(src, rel) {
  const out = `/wf/${rel}`;
  if (!copied.has(out)) {
    copied.add(out);
    mkdirSync(dirname(join(DIST, out)), { recursive: true });
    if (/\.css$/.test(src)) writeFileSync(join(DIST, out), cssUrls(readFileSync(src, 'utf8')));
    else cpSync(src, join(DIST, out));
  }
  return encodeURI(out);
}
const cssUrls = (css) => css.replace(/url\((['"]?)(https:[^'")]+)\1\)/g, (_, q, url) => `url(${q}${localize(url)}${q})`);

// ---------- content ----------
const readJson = (dir) => Object.fromEntries(readdirSync(join(ROOT, 'src/content', dir)).filter((f) => f.endsWith('.json')).map((f) => [f.slice(0, -5), JSON.parse(readFileSync(join(ROOT, 'src/content', dir, f), 'utf8'))]));
const frameworks = readJson('frameworks');
const tools = readJson('tools');
const services = readJson('services');
const solutions = readJson('solutions');
const portfolio = readJson('portfolio');
const posts = readdirSync(join(ROOT, 'src/content/blog')).filter((f) => f.endsWith('.md')).map((f) => {
  const [, fm, body] = readFileSync(join(ROOT, 'src/content/blog', f), 'utf8').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  return { id: f.slice(0, -3), ...parseYaml(fm), body };
}).filter((p) => !p.draft).sort((a, b) => new Date(b.published) - new Date(a.published));

/** A content image (a path relative to the JSON file, or a URL) as a URL this site serves. */
function media(src) {
  if (!src) return '';
  if (/^https?:/.test(src)) return localize(src);
  const file = join(ROOT, 'src/content/tools', src);
  return existsSync(file) ? copyFile(file, `media/${relative(join(ROOT, 'src/assets'), file)}`) : '';
}
const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// ---------- page clean-up shared by every page ----------
const FORM_SCRIPT = `<script>
// Webflow forms post to Webflow; ours go to the site's own enquiry endpoint (saved to the CRM).
document.querySelectorAll('form').forEach(function (form) {
  form.addEventListener('submit', async function (ev) {
    ev.preventDefault(); ev.stopImmediatePropagation();
    var wrap = form.closest('.w-form'), done = wrap && wrap.querySelector('.w-form-done'), fail = wrap && wrap.querySelector('.w-form-fail');
    var btn = form.querySelector('[type=submit]'), label = btn && btn.value;
    var data = new FormData(form), out = new FormData();
    out.set('name', data.get('name') || data.get('Name') || '');
    out.set('email', data.get('email') || data.get('Email') || '');
    out.set('message', data.get('message') || data.get('field') || data.get('Field') || '');
    ['phone', 'company', 'website', 'cf-turnstile-response'].forEach(function (k) { if (data.get(k)) out.set(k, data.get(k)); });
    out.set('source', location.pathname === '/start' ? 'start' : 'contact');
    out.set('page', location.href);
    out.set('referrer', document.referrer);
    out.set('utm', sessionStorage.getItem('utm') || '');
    if (btn) { btn.disabled = true; if (btn.dataset.wait) btn.value = btn.dataset.wait; }
    try {
      var res = await fetch('/api/enquiry', { method: 'POST', body: out });
      if (!res.ok) throw new Error(res.status);
      form.style.display = 'none'; if (done) done.style.display = 'block'; if (fail) fail.style.display = 'none';
    } catch (e) { if (fail) fail.style.display = 'block'; }
    finally { if (btn) { btn.disabled = false; btn.value = label; } }
  }, true);
});
try { var q = new URLSearchParams(location.search), utm = ['utm_source','utm_medium','utm_campaign'].map(function (k) { return q.get(k) ? k + '=' + q.get(k) : ''; }).filter(Boolean).join('&'); if (utm) sessionStorage.setItem('utm', utm); } catch (e) {}
</script>`;

function finish($, path) {
  const url = ORIGIN + (path === '/' ? '/' : path);
  $('html').attr('data-wf-domain', new URL(ORIGIN).hostname);
  $('meta[name="generator"]').remove();
  $('link[rel="canonical"]').remove();
  $('meta[name="robots"]').remove();
  $('head').append(`<link rel="canonical" href="${url}">`);
  $('meta[property="og:url"]').remove();
  $('head').append(`<meta property="og:url" content="${url}">`);
  if (!INDEXABLE) $('head').append('<meta name="robots" content="noindex,nofollow">');
  $('link[rel="shortcut icon"], link[rel="icon"], link[rel="apple-touch-icon"]').remove();
  $('head').append('<link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/logo.png">');
  $('head').append('<style>.w-webflow-badge{display:none!important}</style>');

  // Serve every mirrored asset from this site.
  for (const [sel, attr] of [['[src]', 'src'], ['link[href]', 'href'], ['a[href]', 'href'], ['[poster]', 'poster'], ['[data-src]', 'data-src'], ['[data-poster-url]', 'data-poster-url'], ['[data-video-urls]', 'data-video-urls'], ['meta[content^="https"]', 'content']]) {
    $(sel).each((_, el) => {
      const v = $(el).attr(attr);
      if (attr === 'data-video-urls') return $(el).attr(attr, v.split(',').map(localize).join(','));
      if (/^https:/.test(v)) $(el).attr(attr, localize(v));
    });
  }
  // Local copies (CSS has rewritten URLs) no longer match Webflow's integrity hashes.
  $('link[integrity], script[integrity]').each((_, el) => {
    const v = $(el).attr('href') ?? $(el).attr('src') ?? '';
    if (v.startsWith('/')) $(el).removeAttr('integrity').removeAttr('crossorigin');
  });
  // Responsive variants (-p-500 etc.) weren't mirrored; the full image is served instead.
  $('img[srcset]').each((_, el) => { if (!/^https:/.test($(el).attr('src') ?? '')) $(el).removeAttr('srcset').removeAttr('sizes'); });
  $('style').each((_, el) => { $(el).text(cssUrls($(el).text())); });
  $('[style*="url("]').each((_, el) => { $(el).attr('style', cssUrls($(el).attr('style'))); });

  // Bugs in the Webflow build.
  $('h1, h2, h3, .heading, .title').each((_, el) => {
    const h = $(el).html();
    if (h && /Framwork/.test(h)) $(el).html(h.replace(/Framwork/g, 'Framework'));
  });
  // Blog and Contact links are swapped in the footer and the menu.
  $('a').each((_, el) => {
    const t = $(el).text().trim().toLowerCase();
    if (t === 'blog') $(el).attr('href', '/blog');
    if (t === 'contact' || t === 'contact us') $(el).attr('href', '/contact-us');
  });
  // The footer's three "Solutions" headings all point at Digital Identity.
  const sol = ['/framework/digital-identity', '/framework/digital-experience', '/framework/digital-automation'];
  $('.site-footer a').filter((_, el) => $(el).text().trim() === 'Solutions').each((i, el) => { $(el).attr('href', sol[Math.min(i + 1, 2)]); });
  // Placeholder (#) links that have an obvious destination.
  const DEST = { 'start now': '/start', 'get started': '/start', 'book free consultation': '/contact-us', 'get in touch': '/contact-us', portfolio: '/portfolio', 'check what they say': '/portfolio', 'crm integration': '/solutions/crm-integration', 'marketing automation': '/solutions/marketing-automation', 'workflow automation': '/solutions/workflow-automation', solutions: '/the-framework' };
  $('a.nav-logo[href="#"]').attr('href', '/');
  $('a[href="#"]').each((_, el) => {
    const to = DEST[$(el).text().replace(/\s+/g, ' ').trim().toLowerCase()];
    if (to) $(el).attr('href', to);
  });
  // Tools & Platforms isn't in the Webflow menu.
  const last = $('ul.menu-list > li.menu-list-item').last();
  if (last.length && !$('ul.menu-list a[href="/tools-platforms"]').length) {
    const item = last.clone();
    item.find('a').attr('href', '/tools-platforms').removeClass('w--current');
    item.find('.eyebrow').text(String($('ul.menu-list > li.menu-list-item').length + 1).padStart(2, '0'));
    item.find('.menu-link-heading').text('Tools');
    last.after(item);
  }
  const mSol = $('ul.mobile-nav-list a').filter((_, el) => $(el).text().trim() === 'Solutions').closest('li');
  if (mSol.length && !$('ul.mobile-nav-list a[href="/tools-platforms"]').length) {
    const item = mSol.clone();
    item.find('a').attr('href', '/tools-platforms').removeClass('w--current').removeAttr('aria-current').text('Tools');
    mSol.after(item);
  }
  // The footer social links were copied from another site.
  const SOCIAL = { facebook: 'https://www.facebook.com/admonkstudio', instagram: 'https://www.instagram.com/admonkstudio', linkedin: 'https://www.linkedin.com/company/admonkstudio', youtube: 'https://www.youtube.com/@admonkstudio' };
  $('a[href]').filter((_, el) => /pioneers/i.test($(el).attr('href'))).each((_, el) => {
    const k = Object.keys(SOCIAL).find((s) => $(el).attr('href').includes(s));
    if (k) $(el).attr('href', SOCIAL[k]);
  });
  $('form').attr('action', '/api/enquiry').attr('method', 'post').removeAttr('data-wf-page-id').removeAttr('data-wf-element-id');
  $('form').each((_, el) => {
    if (!$(el).find('[name="website"]').length) $(el).append('<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">');
  });
  $('body').append(FORM_SCRIPT);
  adjust($, path, { copyFile, media, portfolio });
  return '<!DOCTYPE html>' + $.html().replace(/^<!DOCTYPE html>/i, '');
}

/** Removes a paragraph that Webflow prints twice in a row inside one text block. */
function dedupe($) {
  $('p, .paragraph').each((_, el) => {
    const t = $(el).text().trim();
    const half = t.length / 2;
    if (t.length > 80 && Number.isInteger(half) && t.slice(0, half).trim() === t.slice(half).trim()) $(el).text(t.slice(0, half).trim());
    else {
      const m = t.match(/^(.{60,}?[.!?])\s*\1$/s);
      if (m) $(el).text(m[1]);
    }
  });
}

function write(path, html) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  mkdirSync(dirname(join(DIST, file)), { recursive: true });
  writeFileSync(join(DIST, file), html);
}

// ---------- 1. pages that exist in Webflow ----------
const SKIP = new Set(['/blog']); // a test page in Webflow; the real blog is built below
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(join(dir, d.name)) : d.name.endsWith('.html') ? [join(dir, d.name)] : []));
let fromWebflow = 0;
for (const file of walk(PAGES)) {
  const rel = relative(PAGES, file).replace(/\.html$/, '');
  const path = rel === 'index' ? '/' : `/${rel}`;
  if (SKIP.has(path)) continue;
  const $ = cheerio.load(readFileSync(file, 'utf8'));
  dedupe($);
  write(path, finish($, path));
  fromWebflow++;
}

// ---------- 2. pages built from the Webflow service template ----------
const TEMPLATE = readFileSync(join(PAGES, 'services/seo.html'), 'utf8');

/**
 * A page in the service layout: the hero (eyebrow, heading, intro, image), a side nav, and content sections.
 * sections: [{ id, nav, title, html }]
 */
function servicePage({ path, title, description, eyebrow, heading, intro, image, sections, cta = true }) {
  const $ = cheerio.load(TEMPLATE);
  $('title').text(title);
  $('meta[name="description"], meta[property="og:description"], meta[name="twitter:description"]').attr('content', description);
  $('meta[property="og:title"], meta[name="twitter:title"]').attr('content', title);

  const hero = $('main .down-section').first();
  hero.find('.title.is-medium').first().text(eyebrow);
  hero.find('h1').first().text(heading);
  hero.find('p.paragraph').first().text(intro);
  const img = hero.find('.image-wrapper img').first();
  if (image) img.attr('src', image).attr('alt', '').removeAttr('srcset').removeAttr('sizes').addClass('is-tool-icon');
  else hero.find('.image-wrapper').first().remove();
  hero.find('a.button-3').attr('href', '/start');

  const nav = $('.page-nav').first();
  nav.find('a').remove();
  nav.find('.title').first().text(eyebrow);
  for (const s of sections) nav.append(`<a href="#${s.id}" class="text is-nav">${esc(s.nav)}</a>`);
  if (cta) nav.append('<a href="/start" class="text is-nav">Get Started</a>');

  const content = $('.page-content').first();
  const proto = content.children('section.section').first().clone();
  content.empty();
  for (const s of sections) {
    const sec = proto.clone();
    sec.attr('id', s.id);
    sec.find('.content-wrapper').first().html(`<div class="space is-section"></div><div class="text-wrapper"><div class="title">${esc(s.title)}</div><div class="space is-title"></div>${s.html}</div><div class="space is-section"></div><div class="line"></div>`);
    content.append(sec);
  }
  $('head').append(`<style>
.wf-port-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,16rem),1fr));gap:1rem}
.wf-port-card{display:flex;flex-direction:column;gap:.6rem;padding:1.5rem;border:1px solid var(--am-border);border-radius:var(--am-radius-card);color:inherit;text-decoration:none;transition:border-color .2s,transform .2s}
.wf-port-card:hover{border-color:var(--am-accent);transform:translateY(-2px)}
.wf-port-card img{width:2.75rem;height:2.75rem;object-fit:contain}
.wf-port-card .meta{font-size:.8rem;color:var(--am-muted)}
.wf-port-group{margin-top:2.5rem}
.wf-port-rich{max-width:46rem;line-height:1.7}
.wf-port-rich h2{margin:2.5rem 0 1rem;font-size:1.6rem;line-height:1.25}
.wf-port-rich h3{margin:2rem 0 .75rem;font-size:1.2rem}
.wf-port-rich p,.wf-port-rich ul,.wf-port-rich ol{margin:0 0 1.1rem}
.wf-port-rich a{text-decoration:underline}
.wf-port-rich table{width:100%;border-collapse:collapse;margin:1.5rem 0;font-size:.95rem}
.wf-port-rich th,.wf-port-rich td{border-bottom:1px solid var(--am-border);padding:.6rem .5rem;text-align:left;vertical-align:top}
img.is-tool-icon{width:min(60%,14rem);height:auto;margin:auto;object-fit:contain}
</style>`);
  write(path, finish($, path));
}

const card = (href, name, text, icon, meta) => `<a class="wf-port-card" href="${href}">${icon ? `<img src="${icon}" alt="" loading="lazy">` : ''}${meta ? `<div class="meta">${esc(meta)}</div>` : ''}<div class="title is-medium">${esc(name)}</div>${text ? `<p class="paragraph">${esc(text)}</p>` : ''}</a>`;
const FRAMEWORKS = [['digital-identity', 'Digital Identity'], ['digital-experience', 'Digital Experience'], ['digital-automation', 'Digital Automation']];
const byName = (a, b) => a[1].name.localeCompare(b[1].name);

// Tools index
servicePage({
  path: '/tools-platforms',
  title: 'Tools & Platforms We Work With | Admonk',
  description: 'The design, web, marketing and automation tools Admonk works with, from Figma and Webflow to n8n, Supabase and Claude, grouped by the Framework.',
  eyebrow: 'Tools & Platforms',
  heading: 'The tools behind the work',
  intro: `${Object.keys(tools).length} tools and platforms we design, build and automate with, grouped by the part of the Framework they serve.`,
  sections: FRAMEWORKS.map(([id, name]) => ({
    id, nav: name, title: name,
    html: `<div class="wf-port-cards">${Object.entries(tools).filter(([, t]) => t.framework === id).sort(byName).map(([tid, t]) => card(`/tools-platforms/${tid}`, t.name, t.summary, media(t.icon))).join('')}</div>`,
  })),
});

// Tool pages
// The hero intro says where the tool fits; the full description sits in "About", so it isn't shown twice.
function toolIntro(t, nWhere, nProjects) {
  const fw = frameworks[t.framework]?.name;
  const bits = [fw ? `${t.name} is one of the tools behind our ${fw} work` : `${t.name} is one of the tools we work with`];
  if (nWhere) bits.push(`used across ${nWhere} of our solutions and services`);
  if (nProjects) bits.push(`and in ${nProjects} client ${nProjects === 1 ? 'project' : 'projects'}`);
  return bits.join(', ').replace(', and', ' and') + '.';
}
const usesTool = (list, id) => Object.entries(list).filter(([, x]) => x.tools?.includes(id) && !x.draft).sort(byName);
for (const [id, t] of Object.entries(tools)) {
  const where = [...usesTool(solutions, id).map(([sid, s]) => [`/solutions/${sid}`, s]), ...usesTool(services, id).map(([sid, s]) => [`/services/${sid}`, s])];
  const projects = usesTool(portfolio, id);
  const related = posts.filter((p) => p.tools?.includes(id));
  const sections = [{ id: 'Summary', nav: 'Summary', title: `About ${t.name}`, html: `<p class="paragraph is-medium is-full">${esc(t.description)}</p>` }];
  if (where.length) sections.push({ id: 'Where-we-use-it', nav: 'Where we use it', title: 'Where we use it', html: `<div class="wf-port-cards">${where.map(([href, s]) => card(href, s.name, s.hero?.title)).join('')}</div>` });
  if (projects.length) sections.push({ id: 'Projects', nav: 'Projects', title: `Projects built with ${t.name}`, html: `<div class="wf-port-cards">${projects.map(([pid, p]) => card(`/portfolio/${pid}`, p.name, p.summary ?? p.hero?.title)).join('')}</div>` });
  if (related.length) sections.push({ id: 'Blog', nav: 'From the blog', title: 'From the blog', html: `<div class="wf-port-cards">${related.map((p) => card(`/blog/${p.id}`, p.title, p.description)).join('')}</div>` });
  servicePage({ path: `/tools-platforms/${id}`, title: t.seo?.title ?? `${t.name} | Admonk`, description: t.seo?.description ?? t.description, eyebrow: t.name, heading: t.summary, intro: toolIntro(t, where.length, projects.length), image: media(t.icon), sections });
}

// Blog index and posts
const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
servicePage({
  path: '/blog',
  title: 'Insights on Branding, Web Design & Automation | Admonk',
  description: 'Practical thinking on brand identity, website design, SEO and AI automation from the Admonk team.',
  eyebrow: 'Blog',
  heading: 'Insights',
  intro: 'Practical thinking on brand identity, websites, marketing and automation, including honest comparisons of the tools we use with clients.',
  sections: [{ id: 'Posts', nav: 'Latest posts', title: 'Latest posts', html: `<div class="wf-port-cards">${posts.map((p) => card(`/blog/${p.id}`, p.title, p.description, '', fmtDate(p.published))).join('')}</div>` }],
});
for (const p of posts) {
  // Split the post at its H2s so each becomes a section in the side nav.
  const parts = p.body.split(/^## /m);
  const intro = parts.shift().trim();
  const sections = parts.map((part, i) => {
    const [head, ...rest] = part.split('\n');
    return { id: `s${i + 1}`, nav: head.trim(), title: head.trim(), html: `<div class="wf-port-rich">${marked.parse(rest.join('\n'))}</div>` };
  });
  if (intro) sections.unshift({ id: 'Intro', nav: 'Introduction', title: 'Introduction', html: `<div class="wf-port-rich">${marked.parse(intro)}</div>` });
  servicePage({ path: `/blog/${p.id}`, title: p.title.length <= 50 ? `${p.title} | Admonk` : p.title, description: p.description, eyebrow: `Blog · ${fmtDate(p.published)}`, heading: p.title, intro: p.description, sections });
}

// 404
servicePage({ path: '/404', title: 'Page not found | Admonk', description: 'This page does not exist.', eyebrow: '404', heading: "This page doesn't exist", intro: 'It may have moved when we rebuilt the site. Try the Framework, the portfolio or the blog, or get in touch.', sections: [{ id: 'Links', nav: 'Where to next', title: 'Where to next', html: `<div class="wf-port-cards">${card('/', 'Home', 'Back to the start.')}${card('/the-framework', 'The Framework', 'Identity, Experience and Automation.')}${card('/portfolio', 'Portfolio', 'Projects we have delivered.')}${card('/contact-us', 'Contact', 'Talk to the studio.')}</div>` }] });

console.log(`webflow-port: ${fromWebflow} pages from Webflow, ${Object.keys(tools).length + 2 + posts.length} built from the template, ${copied.size} assets served locally, ${remote} asset URLs left on the Webflow CDN`);

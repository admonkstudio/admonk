// Design adjustments on top of the Webflow markup (batch 1 of Hisham's review, Nov 2026).
// Styles live in src/design/admonk.css; this file only changes markup that CSS can't reach.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

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
</script>`;

export function adjust($, path, { copyFile, media, portfolio }) {
  const css = copyFile(join(ROOT, 'src/design/admonk.css'), 'am/admonk.css');
  const icon = copyFile(join(ROOT, 'src/design/logo-icon.png'), 'am/logo-icon.png');
  $('head').prepend(THEME_HEAD);
  $('head').append(`<link rel="stylesheet" href="${css}">`);

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
    $(el).replaceWith(`<div class="am-marquee" style="--am-marquee-duration:${Math.max(25, logos.length * 3)}s"><div class="am-marquee-track">${group(false)}${group(true)}</div></div>`);
  });

  if (path === '/') home($, { media, portfolio });
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

// Fills the parts of the Webflow page templates that Webflow left static or empty (placeholder images,
// "This is some text inside of a div block.", lorem ipsum, "No items found.", # links), using src/content.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const readJson = (dir) => Object.fromEntries(readdirSync(join(ROOT, 'src/content', dir)).filter((f) => f.endsWith('.json')).map((f) => [f.slice(0, -5), JSON.parse(readFileSync(join(ROOT, 'src/content', dir, f), 'utf8'))]));
const C = {
  frameworks: readJson('frameworks'),
  solutions: readJson('solutions'),
  services: readJson('services'),
  portfolio: readJson('portfolio'),
  tools: readJson('tools'),
  industries: readJson('industries'),
  locations: readJson('locations'),
};
const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const PLACEHOLDER = (src = '') => /placeholder\.[0-9a-f]+\.svg/.test(src);

export function fill($, path, { media }) {
  // Footer: the copyright line is a link to nowhere.
  $('a.text.is-custom[href="#"]').filter((_, el) => /all rights reserved/i.test($(el).text())).each((_, el) => { $(el).replaceWith(`<span class="${$(el).attr('class')}">${$(el).html()}</span>`); });
  // Stray single-letter text Webflow left in the service template.
  $('.text-block-4').filter((_, el) => $(el).text().trim().length <= 1).remove();
  // Section navigation on solution pages: point the links at their sections.
  pageNav($);

  const [, kind, id] = path.split('/');
  if (kind === 'framework' && C.frameworks[id]) framework($, C.frameworks[id], media);
  if (kind === 'solutions' && C.solutions[id]) detail($, C.solutions[id], media, { caseId: C.solutions[id].caseStudies?.[0], included: (C.solutions[id].services || []).map((s) => [`/services/${s}`, C.services[s]?.name]) });
  if (kind === 'services' && C.services[id]) {
    const s = C.services[id];
    const parent = C.solutions[s.solution];
    detail($, s, media, { caseId: s.caseStudy, included: [...(parent ? [[`/solutions/${s.solution}`, parent.name]] : []), ...(s.related || []).map((r) => [`/services/${r}`, C.services[r]?.name])], heroImage: parent?.icon, includedTitle: parent ? 'Part of' : null });
  }
  if (kind === 'portfolio' && id && C.portfolio[id]) caseStudyPage($, C.portfolio[id], media);
  if (path === '/the-framework') theFramework($);
}

function pageNav($) {
  const ids = $('section[id]').toArray().map((s) => $(s).attr('id'));
  const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, '');
  const alias = { whatyouget: 'projectdeliverables', casestudy: 'ourproof' };
  $('.page-nav a.text.is-nav[href="#"], a.text.is-nav[href="#"]').each((_, el) => {
    const want = norm($(el).text());
    const hit = ids.find((i) => norm(i) === want || norm(i) === alias[want]);
    if (hit) $(el).attr('href', `#${hit}`);
  });
  // Solution pages have no ids on their sections; give them the ids the service pages use.
  const order = ['Summary', 'Business-Challenge', 'The-Framework', 'Business-Impact', 'Project-Deliverables', 'Our-Proof'];
  const navs = $('a.text.is-nav[href="#"]');
  if (!navs.length) return;
  const sections = $('.page-content section.section, .services-content section.section').toArray().filter((s) => !$(s).attr('id'));
  if (sections.length >= order.length) sections.slice(0, order.length).forEach((s, i) => $(s).attr('id', order[i]));
  navs.each((_, el) => {
    const want = norm($(el).text());
    const hit = order.find((i) => norm(i) === want || norm(i) === alias[want]);
    if (hit) $(el).attr('href', `#${hit}`);
  });
}

const nameOf = (coll, id) => C[coll][id]?.name ?? '';

/** Fills a case-study card (image, year, industry, location, title, text) and links it to the case study. */
function caseCard($, scope, id, media) {
  const p = C.portfolio[id];
  if (!p) return;
  const wrap = $(scope).find('.w-dyn-item .wrap').first();
  if (!wrap.length) return;
  const img = media(p.cover || p.thumbnail);
  const box = wrap.find('.image-wrapper').first();
  if (img && box.length) {
    if (box.find('img').length) box.find('img').attr('src', img).attr('alt', `${p.name} project`).removeAttr('srcset').removeAttr('sizes');
    else box.attr('style', `background-image:url("${img}")`);
  }
  const meta = wrap.find('.div-block-811 .text.is-small');
  const vals = [meta.eq(0).text().trim(), nameOf('industries', p.industry), nameOf('locations', p.location)];
  meta.each((i, el) => { if (vals[i]) $(el).text(vals[i]); });
  wrap.find('.title.is-medium').first().text(p.title || p.name).removeClass('w-dyn-bind-empty');
  wrap.find('p.paragraph').first().text(p.summary.length > 260 ? p.summary.slice(0, p.summary.lastIndexOf(' ', 250)) + '…' : p.summary).removeClass('w-dyn-bind-empty');
  if (!wrap.parent().is('a')) wrap.wrap(`<a href="/portfolio/${Object.keys(C.portfolio).find((k) => C.portfolio[k] === p)}" class="am-card-link" aria-label="${esc(p.name)} case study"></a>`);
}

function toolIcons(ids, media) {
  return ids.map((t) => C.tools[t]).filter(Boolean).map((t) => ({ name: t.name, src: media(t.icon) })).filter((t) => t.src);
}

function framework($, f, media) {
  // "The Framework" blocks: Webflow shows the three automation solutions on every framework page.
  const blocks = $('.grid.is-padding').filter((_, el) => $(el).find('.text-wrapper h2').length).toArray();
  f.solutions.forEach((sid, i) => {
    const s = C.solutions[sid];
    const b = blocks[i];
    if (!s || !b) return;
    const tw = $(b).find('.text-wrapper').first();
    tw.children('div').not('.space, .button-wrapper').first().text(s.name);
    tw.find('h2').first().text(s.hero.title);
    tw.find('p').first().text(s.hero.description);
    tw.find('a').first().attr('href', `/solutions/${sid}`);
    const icons = toolIcons([...new Set([...s.tools, ...f.tools])], media);
    if (icons.length) $(b).find('.tools-icon img').each((j, img) => { const t = icons[j % icons.length]; $(img).attr('src', t.src).attr('alt', t.name).removeAttr('srcset').removeAttr('sizes'); });
  });
  for (const b of blocks.slice(f.solutions.length)) $(b).prev('.space').remove(), $(b).remove();
  // "What you get" intro was lorem ipsum.
  $('p').filter((_, el) => /lorem ipsum/i.test($(el).text())).text(f.deliverables.summary);
  caseCard($, $('.collection-wrapper').last(), f.caseStudies?.[0], media);
}

function detail($, d, media, { caseId, included, heroImage, includedTitle }) {
  // Hero image: services had Webflow's placeholder.
  $('img').filter((_, el) => PLACEHOLDER($(el).attr('src'))).each((_, el) => {
    const src = heroImage && media(heroImage);
    if (src) $(el).attr('src', src).attr('alt', '').addClass('am-hero-icon');
    else $(el).closest('.image-wrapper').remove();
  });
  // Services included / part of.
  const items = included.filter(([, n]) => n);
  $('.title').filter((_, el) => $(el).text().trim() === 'Services Included').each((_, el) => {
    const box = $(el).parent();
    if (!items.length) { box.next('.space').remove(); box.next('.line').remove(); box.remove(); return; }
    if (includedTitle) $(el).text(includedTitle);
    box.find('.w-dyn-list').replaceWith(`<div class="am-chip-list">${items.map(([href, n]) => `<a class="am-chip" href="${href}">${esc(n)}</a>`).join('')}</div>`);
  });
  // Tools we use: Webflow shows the same eight automation tools everywhere.
  const icons = toolIcons(d.tools || [], media);
  $('.solution-tools').each((_, el) => {
    if (!icons.length) return;
    $(el).html(icons.map((t) => `<a class="icon-wrapper is-boarder" href="/tools-platforms/${Object.keys(C.tools).find((k) => C.tools[k].name === t.name)}" title="${esc(t.name)}"><img src="${t.src}" loading="lazy" alt="${esc(t.name)}"></a>`).join(''));
  });
  const proof = $('#Our-Proof').length ? $('#Our-Proof') : $('.collection-wrapper').last().closest('section');
  if (caseId && C.portfolio[caseId]) caseCard($, proof, caseId, media);
  else proof.remove(), $('a.text.is-nav[href="#Our-Proof"]').remove();
}

function caseStudyPage($, p, media) {
  if (p.websiteUrl) $('a.button-3').filter((_, el) => /visit website/i.test($(el).text())).attr('href', p.websiteUrl).attr('target', '_blank').attr('rel', 'noopener');
  else $('a.button-3').filter((_, el) => /visit website/i.test($(el).text())).remove();
  // Gallery: Webflow binds five image fields that are mostly empty (placeholder images).
  const pics = [...new Set([...(p.gallery || []), p.cover, p.thumbnail].filter(Boolean))].map(media).filter(Boolean);
  const frames = $('.div-block-804 .image-wrapper.is-frame').toArray();
  const used = new Set(frames.map((f) => $(f).find('img').attr('src')).filter((s) => s && !PLACEHOLDER(s)));
  const extra = pics.filter((s) => !used.has(s));
  for (const f of frames) {
    const img = $(f).find('img');
    if (!PLACEHOLDER(img.attr('src'))) continue;
    const next = extra.shift();
    if (next) img.attr('src', next).attr('alt', `${p.name} project`).removeClass('w-dyn-bind-empty').removeAttr('srcset').removeAttr('sizes');
    else $(f).remove();
  }
  // Any other placeholder image on the page.
  $('img').filter((_, el) => PLACEHOLDER($(el).attr('src'))).each((_, el) => {
    const src = media(p.cover || p.thumbnail);
    if (src) $(el).attr('src', src).attr('alt', `${p.name} project`);
    else $(el).remove();
  });
  // Empty bound text.
  $('.w-dyn-bind-empty').filter((_, el) => el.tagName !== 'img' && !$(el).text().trim()).remove();
}

function theFramework($) {
  // "Learn more about solution" buttons point at the framework page named by the nearest heading.
  $('a.button-3').filter((_, el) => /learn more about solution/i.test($(el).text())).each((_, a) => {
    let node = $(a);
    for (let i = 0; i < 6 && node.length; i++, node = node.parent()) {
      const h = node.find('h2').first().text().trim().toLowerCase();
      const hit = Object.entries(C.frameworks).find(([, f]) => f.name.toLowerCase() === h);
      if (hit) { $(a).attr('href', `/framework/${hit[0]}`); return; }
    }
  });
}

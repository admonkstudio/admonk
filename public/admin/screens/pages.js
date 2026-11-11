// Page text: edit the words on the top-level pages (home, studio, contact…) without touching the layout.
// The build lists each page's text blocks in /wf/am/pages/<slug>.json; changes are saved to
// src/content/pages/<slug>.json as find/replace pairs, which the next build applies.
import { api, esc, attr, icon, empty, toast, fail, can, loading } from '../core.js';
import { header, go, guard } from '../app.js';

const PAGES = [
  ['home', 'Home', '/'], ['studio', 'Studio', '/studio'], ['portfolio', 'Portfolio', '/portfolio'], ['the-framework', 'The Framework', '/the-framework'],
  ['tools-platforms', 'Tools and platforms', '/tools-platforms'], ['blog', 'Blog', '/blog'], ['contact-us', 'Contact', '/contact-us'], ['start', 'Start now', '/start'],
];

export default async function pages(view, rest) {
  const slug = rest[0];
  if (!slug) return list(view);
  const page = PAGES.find((p) => p[0] === slug);
  header(page ? page[1] : slug, { crumbs: [{ label: 'Page text', href: '/admin/pages' }] });
  view.innerHTML = loading(400);
  let noGit = '';
  const [blocks, saved] = await Promise.all([
    fetch(`/wf/am/pages/${slug}.json`, { cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)),
    api(`content/pages/${slug}`).catch((e) => { if (e.status !== 404) noGit = e.message; return null; }),
  ]).catch((e) => (fail(e), [null, null]));
  if (!blocks) { view.innerHTML = empty('This page’s text list isn’t available yet. It appears after the next build.'); return; }
  let file = { path: blocks.path, replacements: [] };
  try { if (saved) file = { ...file, ...JSON.parse(saved.content) }; } catch {}
  const repl = new Map(file.replacements.map((r) => [r.find, r.replace]));
  // One editable entry per distinct text; the same words in the menu and footer change together.
  const seen = new Set();
  const items = blocks.blocks.filter((b) => !seen.has(b.text) && seen.add(b.text));
  const sections = [...new Set(items.map((b) => b.section))];
  const editable = can('editor') && !noGit;

  header(page ? page[1] : slug, {
    crumbs: [{ label: 'Page text', href: '/admin/pages' }],
    actions: `<a class="btn" href="${attr(blocks.path)}" target="_blank" rel="noopener">${icon('external')} View page</a>${editable ? `<button class="btn primary" id="save" disabled>${icon('check')} Save and publish</button>` : ''}`,
  });
  view.innerHTML = `${noGit ? `<div class="banner">${icon('alert')}<div><b>Saving isn’t available yet.</b> ${esc(noGit)} <a href="/admin/settings" data-link>See setup</a></div></div>` : ''}
<div class="banner info">${icon('info')}<div>Change the words, not the layout. Text that appears in several places (like the menu) changes everywhere at once. Saving publishes in about two minutes.</div></div>
<div class="row wrap" style="margin:12px 0 4px"><form class="search" id="find" style="width:300px">${icon('search')}<input class="input" name="q" placeholder="Find text on this page"></form><span class="spacer"></span><span class="muted small" id="stat"></span></div>
${sections.map((s) => `<div class="card sec" style="margin-top:16px"><div class="card-h"><h2>${esc(s)}</h2></div><div class="card-b" style="padding-top:0">
${items.map((b, i) => (b.section !== s ? '' : `<div class="text-block" data-i="${i}"><div class="orig">${esc(b.tag)} · original: ${esc(b.text.length > 140 ? b.text.slice(0, 140) + '…' : b.text)}</div>
<textarea class="input" rows="1" ${editable ? '' : 'readonly'} aria-label="${attr(b.text.slice(0, 60))}">${esc(repl.get(b.text) ?? b.text)}</textarea></div>`)).join('')}
</div></div>`).join('')}`;

  const areas = [...view.querySelectorAll('.text-block')];
  const fit = (t) => { t.style.height = 'auto'; t.style.height = t.scrollHeight + 2 + 'px'; };
  const current = () => areas.map((el) => ({ find: items[+el.dataset.i].text, replace: el.querySelector('textarea').value })).filter((r) => r.replace.trim() && r.replace !== r.find);
  const initial = JSON.stringify(current());
  const dirty = () => JSON.stringify(current()) !== initial;
  const refresh = () => {
    areas.forEach((el) => el.classList.toggle('changed', el.querySelector('textarea').value !== items[+el.dataset.i].text));
    const n = current().length;
    view.querySelector('#stat').textContent = n ? `${n} text change${n === 1 ? '' : 's'} on this page` : 'No changes from the original';
    const b = document.getElementById('save'); if (b) b.disabled = !dirty();
  };
  areas.forEach((el) => { const t = el.querySelector('textarea'); fit(t); t.addEventListener('input', () => { fit(t); refresh(); }); });
  refresh();
  guard((silent) => !dirty() || (!silent && confirm('You have unsaved changes. Leave without saving?')));

  view.querySelector('#find').onsubmit = (e) => e.preventDefault();
  view.querySelector('#find input').oninput = (e) => {
    const q = e.target.value.trim().toLowerCase();
    areas.forEach((el) => { el.hidden = !!q && !(items[+el.dataset.i].text + ' ' + el.querySelector('textarea').value).toLowerCase().includes(q); });
    view.querySelectorAll('.sec').forEach((s) => { s.hidden = ![...s.querySelectorAll('.text-block')].some((el) => !el.hidden); });
  };

  document.getElementById('save')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget; btn.disabled = true;
    const content = JSON.stringify({ path: blocks.path, replacements: current() }, null, 2) + '\n';
    try {
      await api(`content/pages/${slug}`, { method: saved ? 'PUT' : 'POST', body: { content, sha: saved?.sha, message: `Edit text on ${blocks.path} (admin)` } });
      guard(null); toast('Saved. The page updates in about two minutes.'); pages(view, rest);
    } catch (err) { fail(err); btn.disabled = false; }
  });
}

async function list(view) {
  header('Page text');
  const saved = await api('content/pages').then((r) => new Set(r.items.map((i) => i.id))).catch(() => new Set());
  view.innerHTML = `
<p class="muted" style="margin:0 0 16px">Edit the headings, paragraphs, buttons and labels on the main pages. Portfolio items, services, tools and blog posts are edited under <a href="/admin/content" data-link>Content</a>.</p>
<div class="card"><div class="list">${PAGES.map(([slug, label, path]) => `<a href="/admin/pages/${slug}" data-link><div class="grow"><div class="row"><span class="title">${esc(label)}</span><span class="muted small mono">${esc(path)}</span><span class="spacer"></span>${saved.has(slug) ? '<span class="badge b-replied">edited</span>' : '<span class="badge">original</span>'}</div></div>${icon('right')}</a>`).join('')}</div></div>`;
}

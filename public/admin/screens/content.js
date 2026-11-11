// Content editor: lists and edits the site's collections (portfolio, services, blog...).
// Each save is a commit to the repo; the site rebuilds and goes live in about two minutes.
import { api, state, esc, attr, icon, badge, empty, toast, fail, can, confirmBox, mediaUrl, fileToBase64, slugify, ago, fmtDate } from '../core.js';
import { header, go, guard } from '../app.js';

// ---- Schemas (mirror src/content.config.ts) ----
const seo = { k: 'seo', t: 'group', label: 'Search engines', fields: [
  { k: 'title', t: 'text', label: 'Page title', hint: 'Shown in Google results and the browser tab. Aim for under 60 characters.', max: 60 },
  { k: 'description', t: 'textarea', label: 'Meta description', hint: 'The summary under the title in Google. Aim for 120 to 160 characters.', max: 160 },
] };
const pairs = (k, label, hint) => ({ k, t: 'list', label, hint, item: [{ k: 'title', t: 'text', label: 'Title' }, { k: 'summary', t: 'textarea', label: 'Text' }] });
const pageSections = (extra) => [
  { title: 'Basics', fields: [{ k: 'name', t: 'text', label: 'Name', req: true }, { k: 'draft', t: 'bool', label: 'Draft (hidden from the site)' }, { k: 'color', t: 'text', label: 'Accent colour', hint: 'Optional, e.g. #ff4c24' }] },
  { title: 'Hero', fields: [{ k: 'hero', t: 'group', fields: [{ k: 'title', t: 'text', label: 'Headline' }, { k: 'description', t: 'textarea', label: 'Intro' }] }, { k: 'icon', t: 'image', label: 'Icon' }, { k: 'cover', t: 'image', label: 'Cover image' }] },
  { title: 'Story', fields: [{ k: 'solutionDescription', t: 'textarea', label: 'Summary', rows: 6 }, pairs('challenges', 'Business challenges'), pairs('approach', 'Our approach (the framework steps)'), pairs('impact', 'Business impact')] },
  { title: 'What you get', fields: [{ k: 'deliverables', t: 'group', fields: [{ k: 'summary', t: 'textarea', label: 'Intro' }, { k: 'items', t: 'strings', label: 'Deliverables' }] }] },
  ...extra,
  { title: 'Proof', fields: [{ k: 'testimonial', t: 'ref', c: 'testimonials', label: 'Testimonial' }] },
  { title: 'Search engines', fields: [seo] },
];
export const SCHEMAS = {
  portfolio: { label: 'Portfolio', single: 'case study', icon: 'image', sections: [
    { title: 'Basics', fields: [{ k: 'name', t: 'text', label: 'Client name', req: true }, { k: 'title', t: 'text', label: 'Case study headline' }, { k: 'summary', t: 'textarea', label: 'Summary', rows: 5 }, { k: 'websiteUrl', t: 'url', label: 'Client website' }, { k: 'featured', t: 'bool', label: 'Featured on the portfolio page' }, { k: 'draft', t: 'bool', label: 'Draft (hidden from the site)' }] },
    { title: 'Images', fields: [{ k: 'cover', t: 'image', label: 'Cover' }, { k: 'thumbnail', t: 'image', label: 'Thumbnail' }, { k: 'logo', t: 'image', label: 'Logo' }, { k: 'icon', t: 'image', label: 'Icon' }, { k: 'gallery', t: 'images', label: 'Gallery' }] },
    { title: 'Details', fields: [{ k: 'industry', t: 'ref', c: 'industries', label: 'Industry' }, { k: 'location', t: 'ref', c: 'locations', label: 'Location' }, { k: 'solutions', t: 'refs', c: 'solutions', label: 'Solutions' }, { k: 'services', t: 'refs', c: 'services', label: 'Services' }, { k: 'tools', t: 'refs', c: 'tools', label: 'Tools' }, { k: 'testimonial', t: 'ref', c: 'testimonials', label: 'Testimonial' }] },
    { title: 'Story', fields: [{ k: 'challenge', t: 'group', label: 'The challenge', fields: [{ k: 'title', t: 'text', label: 'Heading' }, { k: 'items', t: 'strings', label: 'Points' }] }, pairs('approach', 'Our approach'), { k: 'results', t: 'list', label: 'Results', item: [{ k: 'value', t: 'text', label: 'Number', hint: 'e.g. 55+' }, { k: 'label', t: 'text', label: 'Label' }, { k: 'description', t: 'textarea', label: 'Description' }] }] },
    { title: 'Search engines', fields: [seo] },
  ] },
  services: { label: 'Services', single: 'service', icon: 'file', sections: pageSections([{ title: 'Links', fields: [{ k: 'framework', t: 'ref', c: 'frameworks', label: 'Framework' }, { k: 'solution', t: 'ref', c: 'solutions', label: 'Solution' }, { k: 'related', t: 'refs', c: 'services', label: 'Related services' }, { k: 'tools', t: 'refs', c: 'tools', label: 'Tools we use' }, { k: 'caseStudy', t: 'ref', c: 'portfolio', label: 'Case study' }] }]) },
  solutions: { label: 'Solutions', single: 'solution', icon: 'file', sections: pageSections([{ title: 'Links', fields: [{ k: 'framework', t: 'ref', c: 'frameworks', label: 'Framework' }, { k: 'services', t: 'refs', c: 'services', label: 'Services included' }, { k: 'tools', t: 'refs', c: 'tools', label: 'Tools we use' }, { k: 'caseStudies', t: 'refs', c: 'portfolio', label: 'Case studies' }] }]) },
  frameworks: { label: 'Frameworks', single: 'framework', icon: 'file', sections: pageSections([{ title: 'Links', fields: [pairs('whatWeDeliver', 'What we deliver'), { k: 'solutions', t: 'refs', c: 'solutions', label: 'Solutions' }, { k: 'tools', t: 'refs', c: 'tools', label: 'Tools' }, { k: 'caseStudies', t: 'refs', c: 'portfolio', label: 'Case studies' }] }]) },
  tools: { label: 'Tools', single: 'tool', icon: 'settings', sections: [
    { title: 'Basics', fields: [{ k: 'name', t: 'text', label: 'Name', req: true }, { k: 'icon', t: 'image', label: 'Logo' }, { k: 'summary', t: 'text', label: 'Short line', hint: 'Shown on cards and as the page headline.' }, { k: 'description', t: 'textarea', label: 'What we do with it', rows: 5 }, { k: 'framework', t: 'ref', c: 'frameworks', label: 'Framework' }, { k: 'draft', t: 'bool', label: 'Draft (hidden from the site)' }] },
    { title: 'Search engines', fields: [seo] },
  ] },
  blog: { label: 'Blog', single: 'post', icon: 'file', markdown: true, sections: [
    { title: 'Post', fields: [{ k: 'title', t: 'text', label: 'Title', req: true }, { k: 'description', t: 'textarea', label: 'Summary', hint: 'Shown on the blog list and in Google.', req: true }, { k: 'published', t: 'date', label: 'Published', req: true }, { k: 'updated', t: 'date', label: 'Updated' }, { k: 'draft', t: 'bool', label: 'Draft (hidden from the site)' }] },
    { title: 'Links', fields: [{ k: 'framework', t: 'ref', c: 'frameworks', label: 'Framework' }, { k: 'tools', t: 'refs', c: 'tools', label: 'Tools mentioned' }] },
  ] },
  testimonials: { label: 'Testimonials', single: 'testimonial', icon: 'users', sections: [{ title: 'Testimonial', fields: [{ k: 'name', t: 'text', label: 'Name', req: true }, { k: 'role', t: 'text', label: 'Role and company' }, { k: 'quote', t: 'textarea', label: 'Quote', rows: 5 }, { k: 'logo', t: 'image', label: 'Logo or photo' }, { k: 'caseStudy', t: 'ref', c: 'portfolio', label: 'Case study' }] }] },
  industries: { label: 'Industries', single: 'industry', icon: 'folder', sections: [{ title: 'Industry', fields: [{ k: 'name', t: 'text', label: 'Name', req: true }, { k: 'icon', t: 'image', label: 'Icon' }] }] },
  locations: { label: 'Locations', single: 'location', icon: 'globe', sections: [{ title: 'Location', fields: [{ k: 'name', t: 'text', label: 'Name', req: true }, { k: 'country', t: 'text', label: 'Country' }, { k: 'flag', t: 'image', label: 'Flag' }] }] },
};
const SITE_PATH = { portfolio: 'portfolio', services: 'services', solutions: 'solutions', frameworks: 'framework', tools: 'tools-platforms', blog: 'blog' };

let index = null;
async function loadIndex(force) {
  if (!index || force) index = await fetch('/wf/am/content-index.json', { cache: 'no-store' }).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  return index;
}

export default async function content(view, [coll, id]) {
  if (!coll) return home(view);
  if (!SCHEMAS[coll]) return go('/admin/content', { replace: true });
  if (!id) return list(view, coll);
  return edit(view, coll, id);
}

function setupBanner() {
  return state.me.setup.github ? '' : `<div class="banner">${icon('alert')}<div><b>Content editing needs GitHub.</b> You can browse everything, but saving is off until the GitHub token is added. ${can('admin') ? '<a href="/admin/settings" data-link>Setup steps</a>' : 'Ask an admin to finish the setup.'}</div></div>`;
}

async function home(view) {
  header('Content');
  const idx = await loadIndex();
  view.innerHTML = `${setupBanner()}<div class="collection-grid">${Object.entries(SCHEMAS).map(([c, s]) => `<a class="item-card" href="/admin/content/${c}" data-link><span class="thumb">${icon(s.icon)}</span><div style="min-width:0"><b>${esc(s.label)}</b><span>${plural((idx[c] || []).length, s.single)}</span></div></a>`).join('')}
<a class="item-card" href="/admin/pages" data-link><span class="thumb">${icon('type')}</span><div><b>Page text</b><span>Home, Studio, Contact and more</span></div></a></div>`;
}

async function list(view, coll) {
  const s = SCHEMAS[coll];
  header(s.label, { crumbs: [{ label: 'Content', href: '/admin/content' }], actions: can('editor') ? `<a class="btn primary" href="/admin/content/${coll}/new" data-link>${icon('plus')} New ${s.single}</a>` : '' });
  const idx = await loadIndex();
  let items = idx[coll] || [];
  // Items saved since the last build aren't in the index yet; show them from the repo.
  if (state.me.setup.github) {
    try {
      const live = (await api(`content/${coll}`)).items;
      const known = new Set(items.map((i) => i.id));
      items = [...items.filter((i) => live.some((l) => l.id === i.id)), ...live.filter((l) => !known.has(l.id)).map((l) => ({ id: l.id, name: l.id, pending: true }))];
    } catch {}
  }
  const render = (f = '') => {
    const shown = items.filter((i) => !f || `${i.name} ${i.id}`.toLowerCase().includes(f.toLowerCase()));
    view.querySelector('#items').innerHTML = shown.length ? `<div class="collection-grid">${shown.map((i) => `<a class="item-card" href="/admin/content/${coll}/${i.id}" data-link><span class="thumb">${i.image ? `<img src="${attr(mediaUrl(i.image))}" alt="" loading="lazy">` : icon(s.icon)}</span><div style="min-width:0"><b>${esc(i.name)}</b><span>${i.pending ? 'Publishing…' : i.draft ? 'Draft' : esc(i.date ? fmtDate(i.date) : i.id)}</span></div></a>`).join('')}</div>` : empty('Nothing matches.', s.icon);
  };
  view.innerHTML = `${setupBanner()}<div class="row" style="margin-bottom:16px"><div class="search" style="width:320px">${icon('search')}<input class="input" id="filter" placeholder="Filter ${esc(s.label.toLowerCase())}"></div><span class="muted small">${items.length} items</span></div><div id="items"></div>`;
  render();
  view.querySelector('#filter').oninput = (e) => render(e.target.value);
}

// ---- Frontmatter for blog posts ----
function parseMd(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const data = {};
  if (!m) return { data, body: text };
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map((x) => x.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
    else if (v === 'true' || v === 'false') v = v === 'true';
    else v = v.replace(/^"(.*)"$/, (_, x) => x.replace(/\\"/g, '"')).replace(/^'(.*)'$/, '$1');
    data[kv[1]] = v;
  }
  return { data, body: m[2].replace(/^\n/, '') };
}
function toMd(data, body) {
  const order = ['title', 'description', 'published', 'updated', 'tools', 'framework', 'draft'];
  const keys = [...order.filter((k) => k in data), ...Object.keys(data).filter((k) => !order.includes(k))];
  const val = (v) => (Array.isArray(v) ? `[${v.join(', ')}]` : typeof v === 'boolean' ? String(v) : /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : JSON.stringify(String(v)));
  const lines = keys.filter((k) => data[k] !== undefined && data[k] !== '' && !(Array.isArray(data[k]) && !data[k].length) && !(k === 'draft' && data[k] === false)).map((k) => `${k}: ${val(data[k])}`);
  return `---\n${lines.join('\n')}\n---\n\n${body.trim()}\n`;
}

// ---- Editor ----
async function edit(view, coll, id) {
  const s = SCHEMAS[coll];
  const isNew = id === 'new';
  const idx = await loadIndex();
  let sha = null, history = [], data = {}, body = '';
  if (!isNew) {
    if (!state.me.setup.github) {
      view.innerHTML = setupBanner() + empty('Connect GitHub to open and edit this item here.', 'folder');
      header(idx[coll]?.find((i) => i.id === id)?.name || id, { crumbs: [{ label: 'Content', href: '/admin/content' }, { label: s.label, href: `/admin/content/${coll}` }] });
      return;
    }
    const f = await api(`content/${coll}/${id}`);
    sha = f.sha; history = f.history;
    if (s.markdown) ({ data, body } = parseMd(f.content)); else data = JSON.parse(f.content);
  } else if (s.markdown) { data = { published: new Date().toISOString().slice(0, 10) }; }
  const original = JSON.stringify([data, body]);
  const dirty = () => JSON.stringify([data, body]) !== original;
  guard((silent) => !dirty() || (!silent && confirm('You have unsaved changes. Leave without saving?')));

  const title = isNew ? `New ${s.single}` : data.name || data.title || id;
  const siteUrl = !isNew && SITE_PATH[coll] ? `/${SITE_PATH[coll]}/${id}` : null;
  header(title, {
    crumbs: [{ label: 'Content', href: '/admin/content' }, { label: s.label, href: `/admin/content/${coll}` }],
    actions: `${siteUrl ? `<a class="btn" href="${siteUrl}" target="_blank" rel="noopener">${icon('external')} View</a>` : ''}${can('editor') ? `<button class="btn primary" id="save" ${state.me.setup.github ? '' : 'disabled'}>${isNew ? 'Create' : 'Save and publish'}</button>` : ''}`,
  });

  view.innerHTML = `${setupBanner()}<div class="editor"><form id="form" autocomplete="off">
${isNew ? `<div class="card card-b" style="margin-bottom:16px"><label class="field"><span>Slug (the address)</span><input class="input" id="slug" placeholder="my-new-${s.single.replace(/\s/g, '-')}" pattern="[a-z0-9][a-z0-9-]*" required></label><div class="hint">The page will live at /${SITE_PATH[coll] || coll}/<b id="slug-prev">…</b>. It can’t be changed later.</div></div>` : ''}
${s.sections.map((sec) => `<section class="card" style="margin-bottom:16px"><div class="card-h"><h2>${esc(sec.title)}</h2></div><div class="card-b">${sec.fields.map((f) => field(f, data, [f.k], idx)).join('')}</div></section>`).join('')}
${s.markdown ? `<section class="card" style="margin-bottom:16px"><div class="card-h"><h2>Article</h2><span class="sub">Markdown: ## for headings, **bold**, [links](https://…), tables with |</span></div><div class="card-b"><div class="md"><textarea class="input" id="body" spellcheck="true">${esc(body)}</textarea><div class="preview" id="preview"></div></div></div></section>` : ''}
</form>
<aside class="side-panel">
  <div class="card card-b"><div class="field-label">Publishing</div><p class="small muted" style="margin:0 0 12px">Saving commits the change to the site’s repository. The website rebuilds and shows it in about two minutes.</p>
  <label class="field"><span>Change note (optional)</span><input class="input sm" id="note" placeholder="e.g. Updated results"></label>
  ${!isNew && can('editor') ? `<hr><button class="btn danger sm" id="del">${icon('trash')} Delete ${esc(s.single)}</button>` : ''}</div>
  ${history.length ? `<div class="card card-b"><div class="field-label">History</div><div class="list">${history.map((h) => `<div><div class="grow"><div class="small clip">${esc(h.message)}</div><div class="meta">${esc(h.author)} · ${ago(h.date)}</div></div></div>`).join('')}</div></div>` : ''}
  <div class="card card-b"><div class="field-label">Raw file</div><p class="small muted" style="margin:0 0 8px">For fields this form doesn’t show.</p><button class="btn sm" id="raw">Edit raw ${s.markdown ? 'Markdown' : 'JSON'}</button></div>
</aside></div>`;

  const form = view.querySelector('#form');
  bindFields(form, data, idx, () => updateDirty());
  const saveBtn = document.getElementById('save');
  const updateDirty = () => { if (saveBtn) saveBtn.textContent = isNew ? 'Create' : dirty() ? 'Save and publish •' : 'Save and publish'; };
  if (s.markdown) {
    const ta = view.querySelector('#body'), pv = view.querySelector('#preview');
    const { marked } = await import('https://cdn.jsdelivr.net/npm/marked@15.0.12/lib/marked.esm.js').catch(() => ({ marked: null }));
    const draw = () => { pv.innerHTML = marked ? marked.parse(ta.value) : `<pre>${esc(ta.value)}</pre>`; };
    ta.oninput = () => { body = ta.value; draw(); updateDirty(); };
    draw();
  }
  const slugEl = view.querySelector('#slug');
  if (slugEl) {
    const nameInput = form.querySelector('[data-path="name"], [data-path="title"]');
    let touched = false;
    slugEl.oninput = () => { touched = true; view.querySelector('#slug-prev').textContent = slugEl.value || '…'; };
    nameInput?.addEventListener('input', () => { if (!touched) { slugEl.value = slugify(nameInput.value); view.querySelector('#slug-prev').textContent = slugEl.value || '…'; } });
  }

  saveBtn?.addEventListener('click', async () => {
    const missing = s.sections.flatMap((sec) => sec.fields).filter((f) => f.req && !data[f.k]);
    if (missing.length) return toast(`Fill in: ${missing.map((f) => f.label).join(', ')}`, 'err');
    const slug = isNew ? slugEl.value.trim() : id;
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) return toast('The slug can only use lowercase letters, numbers and dashes.', 'err');
    if (isNew && !s.markdown) {
      // Required shapes for new page-type items.
      if (['services', 'solutions', 'frameworks'].includes(coll)) { data.hero ||= {}; data.deliverables ||= { items: [] }; }
      if (coll === 'portfolio') data.challenge ||= { items: [] };
      if (data.name && !data.seo) data.seo = { title: `${data.name} | Admonk`, description: data.summary || data.description || data.hero?.description || data.name };
    }
    const text = s.markdown ? toMd(data, body) : JSON.stringify(clean(data), null, 2) + '\n';
    saveBtn.disabled = true; saveBtn.textContent = 'Saving…';
    try {
      const note = view.querySelector('#note').value;
      const r = await api(`content/${coll}/${slug}`, { method: isNew ? 'POST' : 'PUT', body: { content: text, sha, message: note } });
      toast(isNew ? 'Created. It will be live in about two minutes.' : 'Saved. The site updates in about two minutes.');
      guard(null);
      if (isNew) { await loadIndex(true); go(`/admin/content/${coll}/${slug}`, { replace: true }); }
      else { sha = r.sha; edit(view, coll, id); }
    } catch (e) { fail(e); saveBtn.disabled = false; updateDirty(); }
  });
  view.querySelector('#del')?.addEventListener('click', async () => {
    if (!(await confirmBox(`Delete this ${s.single}?`, 'It is removed from the website on the next build. You can restore it from the repository history if needed.', { ok: 'Delete', danger: true }))) return;
    try { await api(`content/${coll}/${id}`, { method: 'DELETE' }); guard(null); toast('Deleted'); await loadIndex(true); go(`/admin/content/${coll}`); } catch (e) { fail(e); }
  });
  view.querySelector('#raw').onclick = () => rawEditor(view, coll, id, s, isNew ? null : { sha, text: s.markdown ? toMd(data, body) : JSON.stringify(data, null, 2) });
}

function clean(o) {
  if (Array.isArray(o)) return o.map(clean);
  if (o && typeof o === 'object') return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined).map(([k, v]) => [k, clean(v)]));
  return o;
}

function rawEditor(view, coll, id, s, file) {
  if (!file) return toast('Create the item first.', 'err');
  view.innerHTML = `<div class="banner info">${icon('info')}<div>Raw editing: careful with commas and quotes. The file is checked before it’s saved.</div></div><textarea class="input mono" id="rawtext" style="min-height:70vh">${esc(file.text)}</textarea>`;
  document.getElementById('actions').innerHTML = `<button class="btn" id="back">Back to the form</button><button class="btn primary" id="saveraw">Save and publish</button>`;
  document.getElementById('back').onclick = () => edit(view, coll, id);
  document.getElementById('saveraw').onclick = async () => {
    const text = view.querySelector('#rawtext').value;
    if (!s.markdown) { try { JSON.parse(text); } catch (e) { return toast(`Not valid JSON: ${e.message}`, 'err'); } }
    try { await api(`content/${coll}/${id}`, { method: 'PUT', body: { content: text, sha: file.sha } }); toast('Saved'); edit(view, coll, id); } catch (e) { fail(e); }
  };
}

// ---- Fields ----
const get = (obj, path) => path.reduce((o, k) => (o == null ? undefined : o[k]), obj);
function set(obj, path, v) {
  let o = obj;
  for (let i = 0; i < path.length - 1; i++) { if (o[path[i]] == null || typeof o[path[i]] !== 'object') o[path[i]] = typeof path[i + 1] === 'number' ? [] : {}; o = o[path[i]]; }
  if (v === '' || v === null || (Array.isArray(v) && !v.length && !['items', 'gallery'].includes(path[path.length - 1]))) delete o[path[path.length - 1]];
  else o[path[path.length - 1]] = v;
}
const P = (path) => attr(path.join('.'));
const lbl = (f) => (f.label ? `<span>${esc(f.label)}${f.req ? ' *' : ''}</span>` : '');
const hint = (f) => (f.hint ? `<div class="hint">${esc(f.hint)}</div>` : '');

function field(f, data, path, idx) {
  const v = get(data, path);
  const ro = can('editor') ? '' : 'disabled';
  switch (f.t) {
    case 'text': case 'url':
      return `<label class="field">${lbl(f)}<input class="input" type="${f.t === 'url' ? 'url' : 'text'}" data-path="${P(path)}" value="${attr(v)}" ${f.max ? `data-max="${f.max}"` : ''} ${ro}>${hint(f)}${f.max ? `<div class="hint" data-count-for="${P(path)}">${String(v || '').length} / ${f.max}</div>` : ''}</label>`;
    case 'textarea':
      return `<label class="field">${lbl(f)}<textarea class="input" rows="${f.rows || 3}" data-path="${P(path)}" ${f.max ? `data-max="${f.max}"` : ''} ${ro}>${esc(v)}</textarea>${hint(f)}${f.max ? `<div class="hint" data-count-for="${P(path)}">${String(v || '').length} / ${f.max}</div>` : ''}</label>`;
    case 'date':
      return `<label class="field">${lbl(f)}<input class="input" type="date" data-path="${P(path)}" value="${attr(v ? String(v).slice(0, 10) : '')}" style="width:200px" ${ro}></label>`;
    case 'bool':
      return `<div class="field"><label class="switch"><input type="checkbox" data-path="${P(path)}" data-bool ${v ? 'checked' : ''} ${ro}>${esc(f.label)}</label></div>`;
    case 'image':
      return `<div class="field">${lbl(f)}<div class="img-field"><span class="thumb" data-thumb="${P(path)}">${v ? `<img src="${attr(mediaUrl(v))}" alt="">` : 'No image'}</span><div style="flex:1;min-width:0"><input class="input sm mono" data-path="${P(path)}" value="${attr(v)}" placeholder="../../assets/cms/file.avif" ${ro}>
        <div class="row" style="margin-top:6px">${ro ? '' : `<label class="btn sm">${icon('upload')} Upload<input type="file" accept="image/*" data-upload="${P(path)}" hidden></label>`}${v && !ro ? `<button type="button" class="btn sm ghost" data-clear="${P(path)}">Remove</button>` : ''}</div></div></div>${hint(f)}</div>`;
    case 'images': {
      const arr = Array.isArray(v) ? v : [];
      return `<div class="field">${lbl(f)}<div class="gallery" data-gallery="${P(path)}">${arr.map((src, i) => `<div class="g"><img src="${attr(mediaUrl(src))}" alt="" loading="lazy">${ro ? '' : `<button type="button" class="btn icon sm" data-gdel="${i}" aria-label="Remove image">${icon('x')}</button>`}</div>`).join('')}
        ${ro ? '' : `<label class="g" style="display:grid;place-items:center;cursor:pointer;color:var(--muted)">${icon('plus')}<input type="file" accept="image/*" multiple data-gadd="${P(path)}" hidden></label>`}</div></div>`;
    }
    case 'ref': {
      const opts = idx[f.c] || [];
      return `<label class="field">${lbl(f)}<select class="input" data-path="${P(path)}" ${ro}><option value="">— None —</option>${opts.map((o) => `<option value="${attr(o.id)}" ${o.id === v ? 'selected' : ''}>${esc(o.name)}</option>`).join('')}${v && !opts.some((o) => o.id === v) ? `<option selected value="${attr(v)}">${esc(v)}</option>` : ''}</select></label>`;
    }
    case 'refs': {
      const arr = Array.isArray(v) ? v : [];
      const opts = idx[f.c] || [];
      const name = (id) => opts.find((o) => o.id === id)?.name || id;
      return `<div class="field">${lbl(f)}<div class="chips" data-refs="${P(path)}">${arr.map((id) => `<span class="chip">${esc(name(id))}${ro ? '' : `<button type="button" data-rdel="${attr(id)}" aria-label="Remove ${attr(name(id))}">×</button>`}</span>`).join('')}
        ${ro ? '' : `<select data-radd="${P(path)}"><option value="">+ Add…</option>${opts.filter((o) => !arr.includes(o.id)).map((o) => `<option value="${attr(o.id)}">${esc(o.name)}</option>`).join('')}</select>`}</div></div>`;
    }
    case 'strings': {
      const arr = Array.isArray(v) ? v : [];
      return `<div class="field">${lbl(f)}<div class="repeat" data-list="${P(path)}">${arr.map((s, i) => `<div class="item"><span class="n">${i + 1}</span><input class="input" data-path="${P([...path, i])}" value="${attr(s)}" ${ro}>${ro ? '<span></span>' : itemTools(i, arr.length)}</div>`).join('')}${ro ? '' : `<div class="add"><button type="button" class="btn sm" data-add-string="${P(path)}">${icon('plus')} Add</button></div>`}</div></div>`;
    }
    case 'list': {
      const arr = Array.isArray(v) ? v : [];
      return `<div class="field">${lbl(f)}${hint(f)}<div class="repeat" data-list="${P(path)}">${arr.map((it, i) => `<div class="item"><span class="n">${i + 1}</span><div>${f.item.map((sub) => field(sub, data, [...path, i, sub.k], idx)).join('')}</div>${ro ? '<span></span>' : itemTools(i, arr.length)}</div>`).join('')}${ro ? '' : `<div class="add"><button type="button" class="btn sm" data-add-item="${P(path)}">${icon('plus')} Add ${esc((f.label || 'item').toLowerCase().replace(/s$/, ''))}</button></div>`}</div></div>`;
    }
    case 'group':
      return `<fieldset class="fieldset">${f.label ? `<legend>${esc(f.label)}</legend>` : ''}${f.fields.map((sub) => field(sub, data, [...path, sub.k], idx)).join('')}</fieldset>`;
  }
  return '';
}
const itemTools = (i, n) => `<div class="tools"><button type="button" class="btn icon sm ghost" data-move="${i}" data-dir="-1" ${i === 0 ? 'disabled' : ''} aria-label="Move up">${icon('up')}</button><button type="button" class="btn icon sm ghost" data-move="${i}" data-dir="1" ${i === n - 1 ? 'disabled' : ''} aria-label="Move down">${icon('down')}</button><button type="button" class="btn icon sm ghost danger" data-del="${i}" aria-label="Remove">${icon('trash')}</button></div>`;

function bindFields(form, data, idx, changed) {
  const path = (s) => s.split('.').map((p) => (/^\d+$/.test(p) ? +p : p));
  const schemaFor = (p) => {
    const coll = location.pathname.split('/')[3];
    const all = SCHEMAS[coll].sections.flatMap((s) => s.fields);
    let f = { fields: all };
    for (const k of p.filter((x) => typeof x === 'string')) { const pool = f.fields || f.item || []; f = pool.find((x) => x.k === k) || f; }
    return f;
  };
  const rerender = (p) => {
    // Re-draw the field that owns this path (lists, refs, images change structure).
    const host = form.querySelector(`[data-list="${p}"], [data-refs="${p}"], [data-gallery="${p}"]`)?.closest('.field');
    const f = schemaFor(path(p));
    if (host && f) { host.outerHTML = field(f, data, path(p), idx); }
    changed();
  };
  form.addEventListener('input', (e) => {
    const el = e.target;
    if (!el.dataset.path || el.dataset.radd !== undefined) return;
    const p = path(el.dataset.path);
    set(data, p, el.dataset.bool !== undefined ? el.checked : el.value);
    if (el.dataset.max) { const c = form.querySelector(`[data-count-for="${el.dataset.path}"]`); if (c) { c.textContent = `${el.value.length} / ${el.dataset.max}`; c.style.color = el.value.length > el.dataset.max ? 'var(--amber)' : ''; } }
    const thumb = form.querySelector(`[data-thumb="${el.dataset.path}"]`);
    if (thumb) thumb.innerHTML = el.value ? `<img src="${attr(mediaUrl(el.value))}" alt="">` : 'No image';
    changed();
  });
  form.addEventListener('change', async (e) => {
    const el = e.target;
    if (el.dataset.radd !== undefined && el.value) { const p = path(el.dataset.radd); set(data, p, [...(get(data, p) || []), el.value]); rerender(el.dataset.radd); }
    if (el.dataset.upload) { const url = await uploadFile(el.files[0]); if (url) { set(data, path(el.dataset.upload), url.path); const host = el.closest('.field'); host.outerHTML = field(schemaFor(path(el.dataset.upload)), data, path(el.dataset.upload), idx); form.querySelector(`[data-thumb="${el.dataset.upload}"]`).innerHTML = `<img src="${attr(url.preview)}" alt="">`; changed(); } }
    if (el.dataset.gadd) { const p = path(el.dataset.gadd); const arr = [...(get(data, p) || [])]; const previews = []; for (const file of el.files) { const u = await uploadFile(file); if (u) { arr.push(u.path); previews.push(u.preview); } } set(data, p, arr); rerender(el.dataset.gadd); }
  });
  form.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const host = b.closest('[data-list], [data-refs], [data-gallery]');
    if (b.dataset.clear) { set(data, path(b.dataset.clear), ''); const h = b.closest('.field'); h.outerHTML = field(schemaFor(path(b.dataset.clear)), data, path(b.dataset.clear), idx); changed(); return; }
    if (!host && !b.dataset.addString && !b.dataset.addItem) return;
    const key = host?.dataset.list || host?.dataset.refs || host?.dataset.gallery || b.dataset.addString || b.dataset.addItem;
    const p = path(key);
    const arr = [...(get(data, p) || [])];
    if (b.dataset.addString !== undefined) arr.push('');
    else if (b.dataset.addItem !== undefined) arr.push({});
    else if (b.dataset.del !== undefined) arr.splice(+b.dataset.del, 1);
    else if (b.dataset.gdel !== undefined) arr.splice(+b.dataset.gdel, 1);
    else if (b.dataset.rdel !== undefined) arr.splice(arr.indexOf(b.dataset.rdel), 1);
    else if (b.dataset.move !== undefined) { const i = +b.dataset.move, j = i + +b.dataset.dir; [arr[i], arr[j]] = [arr[j], arr[i]]; }
    else return;
    set(data, p, arr);
    if (!get(data, p)) { const parent = p.slice(0, -1); const o = parent.length ? get(data, parent) : data; if (o) o[p[p.length - 1]] = []; }
    rerender(key);
    if (b.dataset.addString !== undefined || b.dataset.addItem !== undefined) form.querySelector(`[data-list="${key}"] .item:last-of-type input, [data-list="${key}"] .item:last-of-type textarea`)?.focus();
  });
}

async function uploadFile(file) {
  if (!file) return null;
  if (file.size > 5 * 1024 * 1024) { toast('Images can be up to 5 MB. Compress it first (e.g. squoosh.app).', 'err'); return null; }
  const ext = (file.name.split('.').pop() || 'png').toLowerCase();
  const name = `${slugify(file.name.replace(/\.[^.]+$/, ''))}-${Date.now().toString(36)}.${ext === 'jpeg' ? 'jpg' : ext}`;
  toast(`Uploading ${file.name}…`);
  try {
    const r = await api('upload', { method: 'POST', body: { name, data: await fileToBase64(file) } });
    return { path: r.path, preview: URL.createObjectURL(file) };
  } catch (e) { fail(e); return null; }
}

function plural(n, word) {
  if (n === 1) return `1 ${word}`;
  const w = /[^aeiou]y$/.test(word) ? word.slice(0, -1) + 'ies' : /(s|x|ch|sh)$/.test(word) ? word + 'es' : word + 's';
  return `${n} ${w}`;
}

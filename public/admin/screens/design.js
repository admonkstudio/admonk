// Design system editor: every token and element setting, with a live preview of the real site.
// Changes stay local until "Publish"; then they're saved to the database and served at /api/design.css.
import { api, esc, attr, icon, toast, fail, can, drawer, confirmBox, fmtDateTime, download, loading } from '../core.js';
import { header, guard } from '../app.js';

const PAGES = [['/', 'Home'], ['/studio', 'Studio'], ['/portfolio', 'Portfolio'], ['/the-framework', 'The Framework'], ['/tools-platforms', 'Tools'], ['/blog', 'Blog'], ['/contact-us', 'Contact'], ['/start', 'Start now']];
const DEVICES = [['desktop', 'monitor', '100%'], ['tablet', 'tablet', '820px'], ['phone', 'smartphone', '390px']];
const SAFE = /^[#(),.%\-\w\s'"/]+$/;
const safe = (v) => { const s = String(v ?? '').trim(); return s && s.length <= 200 && SAFE.test(s) && !/[;{}<>]|url\s*\(|expression|@import/i.test(s) ? s : null; };

export default async function design(view) {
  header('Design system');
  view.innerHTML = `<div style="padding:24px">${loading(500)}</div>`;
  const [spec, saved] = await Promise.all([fetch('/wf/am/tokens.json', { cache: 'no-store' }).then((r) => r.json()), api('design')]).catch((e) => (fail(e), []));
  if (!spec) return;
  const editable = can('admin');
  const key = (k, t) => `${k}|${t}`;
  const fromRows = (rows) => new Map(rows.map((r) => [key(r.key, r.theme), r.value]));
  let published = fromRows(saved.rows);
  let values = new Map(published);
  let custom = saved.custom || '';
  let publishedCustom = custom;
  let theme = 'dark';
  let device = 'desktop';
  let page = '/';

  const tokenTheme = (t) => (t.light && theme === 'light' ? 'light' : 'dark'); // tokens without a light value are shared
  const defaultOf = (t) => (tokenTheme(t) === 'light' ? t.light : t.dark);
  const valueOf = (t) => values.get(key(t.name, tokenTheme(t))) ?? '';
  const elValue = (e) => values.get(key(e.id, 'dark')) ?? '';
  const rows = () => [...values].filter(([, v]) => safe(v)).map(([k, value]) => { const [kk, th] = k.split('|'); return { key: kk, theme: th, value }; });
  const dirty = () => JSON.stringify([...values].sort()) !== JSON.stringify([...published].sort()) || custom !== publishedCustom;

  function css() {
    const dark = [], light = [], els = [];
    for (const r of rows()) {
      const t = spec.tokens.find((x) => x.name === r.key);
      if (t) { (r.theme === 'light' ? light : dark).push(`  --am-${t.name}: ${r.value};`); continue; }
      const e = spec.elements.find((x) => x.id === r.key);
      if (e) els.push(`${e.selector} { ${e.property}: ${r.value} !important;${e.also ? ` ${e.also}: ${r.value} !important;` : ''} }`);
    }
    let out = '';
    if (dark.length) out += `:root {\n${dark.join('\n')}\n}\n`;
    if (light.length) out += `html[data-theme="light"] {\n${light.join('\n')}\n}\n`;
    if (els.length) out += els.join('\n') + '\n';
    if (custom.trim()) out += `/* custom */\n${custom.replace(/<\/?style/gi, '')}\n`;
    return out;
  }

  header('Design system', {
    actions: `<button class="btn" id="versions">${icon('clock')} History</button><button class="btn" id="export">${icon('download')} Export</button>${editable ? `<button class="btn" id="discard" disabled>${icon('undo')} Discard</button><button class="btn primary" id="publish" disabled>${icon('rocket')} Publish</button>` : ''}`,
  });

  const control = (id, label, hint, type, val, def, isEl) => {
    const color = type === 'color';
    return `<div class="tok${val ? ' changed' : ''}" data-key="${attr(id)}" data-el="${isEl ? 1 : ''}">
  <div class="lab">${esc(label)}${hint ? `<small>${esc(hint)}</small>` : ''}</div>
  <div class="ctl">${color ? `<label class="swatch" title="Pick a colour"><i style="background:${attr(val || def)}"></i><input type="color" value="${attr(toHex(val || def))}" ${editable ? '' : 'disabled'} aria-label="${attr(label)} colour"></label>` : ''}
    <input class="input" value="${attr(val)}" placeholder="${attr(def || '')}" ${editable ? '' : 'readonly'} aria-label="${attr(label)}" spellcheck="false">
    <button class="btn ghost icon sm" data-reset title="Back to default" aria-label="Reset ${attr(label)}" ${val ? '' : 'hidden'}>${icon('undo')}</button></div>
</div>`;
  };

  function groupsHtml() {
    return spec.groups.map((g) => {
      const toks = spec.tokens.filter((t) => t.group === g.id);
      const els = spec.elements.filter((e) => e.group === g.id);
      const n = toks.filter((t) => valueOf(t)).length + els.filter((e) => elValue(e)).length;
      return `<div class="grp" data-g="${g.id}"><button aria-expanded="${g.id === 'brand'}">${icon('down').replace('<svg', '<svg style="width:15px"')}${esc(g.label)}<span class="n">${n ? `${n} changed` : ''}</span></button>
<div ${g.id === 'brand' ? '' : 'hidden'}>
${toks.map((t) => control(t.name, t.label, t.light ? (t.hint || '') : [t.hint, 'Same in both themes'].filter(Boolean).join(' · '), t.type, valueOf(t), defaultOf(t))).join('')}
${els.length ? `<div class="field-label" style="margin:12px 0 0">Element settings</div>${els.map((e) => control(e.id, e.label, `${e.selector} → ${e.property}`, e.type, elValue(e), e.placeholder, true)).join('')}` : ''}
</div></div>`;
    }).join('') + `<div class="grp" data-g="custom"><button aria-expanded="false">${icon('down').replace('<svg', '<svg style="width:15px"')}Custom CSS<span class="n">${custom.trim() ? 'in use' : ''}</span></button>
<div hidden><p class="muted small" style="margin:0 0 8px">For anything the settings above don’t cover. Applies to both themes; use <span class="code">html[data-theme="light"]</span> for light only.</p>
<textarea class="input mono" id="custom" rows="12" spellcheck="false" ${editable ? '' : 'readonly'} placeholder=".hero-title { text-transform: uppercase; }">${esc(custom)}</textarea></div></div>`;
  }

  view.innerHTML = `<div class="design">
<aside class="controls">
  <div style="padding:14px 18px;border-bottom:1px solid var(--line)">
    <div class="row" style="justify-content:space-between"><span class="field-label" style="margin:0">Editing values for</span>
      <div class="seg" role="group" aria-label="Theme being edited"><button data-theme-edit="dark" aria-pressed="true">${icon('moon').replace('<svg', '<svg style="width:13px;vertical-align:-2px"')} Dark</button><button data-theme-edit="light" aria-pressed="false">${icon('sun').replace('<svg', '<svg style="width:13px;vertical-align:-2px"')} Light</button></div></div>
    <form class="search" id="filter" style="margin-top:10px">${icon('search')}<input class="input" placeholder="Find a setting"></form>
    ${editable ? '' : '<p class="muted small" style="margin:10px 0 0">You can look around; changing the design needs the admin role.</p>'}
  </div>
  <div id="groups">${groupsHtml()}</div>
</aside>
<section class="stage">
  <div class="stage-bar">
    <select class="input" id="page" style="width:180px" aria-label="Preview page">${PAGES.map(([p, l]) => `<option value="${p}">${l}</option>`).join('')}</select>
    <div class="seg" role="group" aria-label="Preview width">${DEVICES.map(([d, ic]) => `<button data-device="${d}" aria-pressed="${d === device}" title="${d}">${icon(ic).replace('<svg', '<svg style="width:15px;vertical-align:-3px"')}</button>`).join('')}</div>
    <span class="spacer"></span><span class="muted small" id="state"></span>
  </div>
  <div class="frame-wrap"><iframe id="preview" title="Live preview of the website" src="/?am-preview=1"></iframe></div>
</section></div>`;

  const frame = view.querySelector('#preview');
  const groups = view.querySelector('#groups');
  let timer;
  const push = () => frame.contentWindow?.postMessage({ type: 'am-design', css: css(), theme }, location.origin);
  const schedule = () => { clearTimeout(timer); timer = setTimeout(push, 120); };
  const onMsg = (e) => { if (e.origin === location.origin && e.data?.type === 'am-preview-ready' && e.source === frame.contentWindow) push(); };
  window.addEventListener('message', onMsg);

  function status() {
    const d = dirty();
    const st = view.querySelector('#state');
    if (st) st.textContent = d ? 'Unpublished changes — only you can see them here' : 'Showing the published design';
    const p = document.getElementById('publish'), x = document.getElementById('discard');
    if (p) p.disabled = !d; if (x) x.disabled = !d;
    groups.querySelectorAll('.grp').forEach((g) => {
      const n = g.dataset.g === 'custom' ? (custom.trim() ? 'in use' : '') : (() => { const c = g.querySelectorAll('.tok.changed').length; return c ? `${c} changed` : ''; })();
      g.querySelector('.n').textContent = n;
    });
  }

  function rerender() {
    const open = new Set([...groups.querySelectorAll('.grp > button[aria-expanded="true"]')].map((b) => b.parentElement.dataset.g));
    groups.innerHTML = groupsHtml();
    groups.querySelectorAll('.grp').forEach((g) => { const o = open.has(g.dataset.g); g.querySelector('button').setAttribute('aria-expanded', o); g.querySelector('div').hidden = !o; });
    applyFilter(); status();
  }

  function setValue(row, v) {
    const isEl = !!row.dataset.el;
    const t = isEl ? null : spec.tokens.find((x) => x.name === row.dataset.key);
    const k = key(row.dataset.key, isEl ? 'dark' : tokenTheme(t));
    v = v.trim();
    if (v) values.set(k, v); else values.delete(k);
    const ok = !v || safe(v);
    const input = row.querySelector('.input'); input.classList.toggle('invalid', !ok); input.title = ok ? '' : 'This value can’t be used';
    row.classList.toggle('changed', !!v);
    row.querySelector('[data-reset]').hidden = !v;
    const sw = row.querySelector('.swatch i'); if (sw) sw.style.background = v || (t ? defaultOf(t) : '');
    status(); schedule();
  }

  groups.addEventListener('click', (e) => {
    const head = e.target.closest('.grp > button');
    if (head) { const o = head.getAttribute('aria-expanded') !== 'true'; head.setAttribute('aria-expanded', o); head.nextElementSibling.hidden = !o; return; }
    const reset = e.target.closest('[data-reset]');
    if (reset) { const row = reset.closest('.tok'); row.querySelector('.input').value = ''; setValue(row, ''); }
  });
  groups.addEventListener('input', (e) => {
    if (e.target.id === 'custom') { custom = e.target.value; status(); schedule(); return; }
    const row = e.target.closest('.tok'); if (!row) return;
    if (e.target.type === 'color') { row.querySelector('.input').value = e.target.value; setValue(row, e.target.value); }
    else setValue(row, e.target.value);
  });

  function applyFilter() {
    const q = view.querySelector('#filter input').value.trim().toLowerCase();
    groups.querySelectorAll('.grp').forEach((g) => {
      if (g.dataset.g === 'custom') { g.hidden = !!q && !'custom css'.includes(q); return; }
      let any = false;
      g.querySelectorAll('.tok').forEach((r) => { const hit = !q || r.textContent.toLowerCase().includes(q) || r.dataset.key.includes(q); r.hidden = !hit; any ||= hit; });
      g.hidden = !any;
      if (q && any) { g.querySelector('button').setAttribute('aria-expanded', 'true'); g.querySelector('div').hidden = false; }
    });
  }
  view.querySelector('#filter').onsubmit = (e) => e.preventDefault();
  view.querySelector('#filter input').oninput = applyFilter;

  view.querySelectorAll('[data-theme-edit]').forEach((b) => (b.onclick = () => {
    theme = b.dataset.themeEdit;
    view.querySelectorAll('[data-theme-edit]').forEach((x) => x.setAttribute('aria-pressed', x === b));
    rerender(); push();
  }));
  view.querySelectorAll('[data-device]').forEach((b) => (b.onclick = () => {
    device = b.dataset.device;
    view.querySelectorAll('[data-device]').forEach((x) => x.setAttribute('aria-pressed', x === b));
    frame.style.width = DEVICES.find((d) => d[0] === device)[2];
  }));
  view.querySelector('#page').onchange = (e) => { page = e.target.value; frame.src = `${page}${page.includes('?') ? '&' : '?'}am-preview=1`; };

  document.getElementById('export').onclick = () => download('admonk-design-tokens.json', JSON.stringify({
    exported: new Date().toISOString(),
    tokens: Object.fromEntries(spec.tokens.map((t) => [t.name, { dark: values.get(key(t.name, 'dark')) || t.dark, light: (t.light ? values.get(key(t.name, 'light')) || t.light : values.get(key(t.name, 'dark')) || t.dark) }])),
    elements: Object.fromEntries(spec.elements.map((e) => [e.id, elValue(e) || null])),
    custom,
  }, null, 2), 'application/json');

  document.getElementById('discard')?.addEventListener('click', async () => {
    if (!(await confirmBox('Discard changes?', 'Everything you changed since the last publish goes back to the published design.', { ok: 'Discard' }))) return;
    values = new Map(published); custom = publishedCustom; rerender(); push();
  });

  document.getElementById('publish')?.addEventListener('click', () => {
    const bad = rows().length !== values.size;
    const d = drawer('Publish design changes', `
<p class="muted" style="margin-top:0">The live site picks up the new design within a minute. No rebuild is needed, and you can go back to the current design from History at any time.</p>
${bad ? `<div class="banner warn">${icon('alert')}<div>Some values can’t be used and will be skipped. They’re outlined in red.</div></div>` : ''}
<label class="field"><span>What changed (optional)</span><input class="input" name="note" maxlength="120" placeholder="e.g. Warmer accent, larger hero headings"></label>
<details style="margin-top:16px"><summary class="muted small">See the CSS that will be published</summary><pre class="code" style="white-space:pre-wrap;max-height:300px;overflow:auto;padding:10px">${esc(css() || '/* nothing: the default design */')}</pre></details>`, {
      footer: '<button class="btn" data-cancel>Cancel</button><button class="btn primary" data-go>Publish</button>',
    });
    d.el.querySelector('[data-cancel]').onclick = d.close;
    d.el.querySelector('[data-go]').onclick = async (ev) => {
      ev.currentTarget.disabled = true;
      try {
        await api('design', { method: 'PUT', body: { rows: rows(), custom, note: d.el.querySelector('[name=note]').value } });
        published = new Map(values.entries()); publishedCustom = custom;
        [...published.keys()].forEach((k) => { if (!safe(published.get(k))) { published.delete(k); values.delete(k); } });
        d.close(); toast('Design published'); rerender();
      } catch (err) { fail(err); ev.currentTarget.disabled = false; }
    };
  });

  document.getElementById('versions').onclick = async () => {
    const data = await api('design').catch(fail); if (!data) return;
    const d = drawer('Design history', `<p class="muted" style="margin-top:0">Each publish keeps the design that was live before it. Restoring one replaces the live design straight away.</p>
${data.versions.length ? `<div class="list">${data.versions.map((v) => `<div><div class="grow"><div class="small"><b>${esc(v.note || 'Earlier design')}</b></div><div class="meta">${esc(fmtDateTime(v.created_at))} · ${esc(v.created_by.replace(/@.*/, ''))}</div></div>${editable ? `<button class="btn sm" data-restore="${v.id}">${icon('undo')} Restore</button>` : ''}</div>`).join('')}</div>` : '<p class="muted">No earlier versions yet. They appear after the first publish.</p>'}`);
    d.el.querySelectorAll('[data-restore]').forEach((b) => (b.onclick = async () => {
      if (dirty() && !(await confirmBox('Restore this version?', 'Your unpublished changes will be lost.', { ok: 'Restore' }))) return;
      try {
        await api(`design/restore/${b.dataset.restore}`, { method: 'POST', body: { note: `restore #${b.dataset.restore}` } });
        const fresh = await api('design');
        published = fromRows(fresh.rows); values = new Map(published); custom = publishedCustom = fresh.custom || '';
        d.close(); toast('Earlier design restored'); rerender(); push();
      } catch (err) { fail(err); }
    }));
  };

  guard((silent) => {
    if (dirty() && (silent || !confirm('You have unpublished design changes. Leave without publishing?'))) return false;
    window.removeEventListener('message', onMsg);
    return true;
  });
  status();
}

/** Best-effort hex for the native colour picker (it only accepts #rrggbb). */
function toHex(v) {
  const s = String(v || '').trim();
  if (/^#[0-9a-f]{6}$/i.test(s)) return s;
  if (/^#[0-9a-f]{3}$/i.test(s)) return '#' + [...s.slice(1)].map((c) => c + c).join('');
  const m = s.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (m) return '#' + m.slice(1, 4).map((n) => (+n).toString(16).padStart(2, '0')).join('');
  return '#000000';
}

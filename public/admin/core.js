// Shared helpers for the admin screens: API calls, HTML escaping, icons, toasts, drawers, charts.

export const state = { me: null };

export class ApiError extends Error { constructor(message, status) { super(message); this.status = status; } }

export async function api(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api/admin/${path}`, {
    method,
    headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), ...(method !== 'GET' ? { 'X-Admin': '1' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });
  if (res.status === 401) { location.href = `/admin/login?next=${encodeURIComponent(location.pathname)}`; throw new ApiError('Signed out', 401); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.error || `Request failed (${res.status})`, res.status);
  return data;
}

export const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const attr = esc;
export const can = (role) => { const r = ['viewer', 'editor', 'admin', 'owner']; return r.indexOf(state.me?.member.role) >= r.indexOf(role); };

const tz = 'Africa/Cairo';
const toDate = (v) => (v instanceof Date ? v : new Date(String(v).includes('T') ? v : String(v).replace(' ', 'T') + 'Z'));
export const fmtDate = (v) => (v ? toDate(v).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: tz }) : '');
export const fmtDateTime = (v) => (v ? toDate(v).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: tz }) : '');
export function ago(v) {
  if (!v) return '';
  const s = (Date.now() - toDate(v).getTime()) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)} d ago`;
  return fmtDate(v);
}
export const num = (n) => new Intl.NumberFormat('en-GB').format(n || 0);
export function delta(cur, prev) {
  if (!prev) return cur ? '<span class="delta up">new</span>' : '<span class="delta flat">–</span>';
  const p = Math.round(((cur - prev) / prev) * 100);
  return `<span class="delta ${p > 0 ? 'up' : p < 0 ? 'down' : 'flat'}">${p > 0 ? '↑' : p < 0 ? '↓' : ''} ${Math.abs(p)}%</span>`;
}
export const badge = (s, label) => `<span class="badge b-${esc(s)}">${esc(label ?? s)}</span>`;
export const initials = (s) => String(s || '?').replace(/@.*/, '').split(/[\s._-]+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
export const avatar = (m) => `<span class="avatar">${m?.picture ? `<img src="${attr(m.picture)}" alt="" referrerpolicy="no-referrer">` : esc(initials(m?.name || m?.email))}</span>`;
export const flag = (cc) => (cc && /^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(...[...cc].map((c) => 0x1f1a5 + c.charCodeAt(0))) : '🌐');
export function country(cc) { try { return new Intl.DisplayNames(['en'], { type: 'region' }).of(cc) || cc; } catch { return cc || 'Unknown'; } }
/** Content image path ("../../assets/cms/x.avif") to the URL the built site serves it at. */
export const mediaUrl = (p) => (!p ? '' : /^https?:/.test(p) ? p : p.startsWith('data:') ? p : p.replace(/^(\.\.\/)+assets\//, '/wf/media/'));

// Icons (Lucide-style strokes)
const P = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  users: '<circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 4a4 4 0 0 1 0 8"/><path d="M22 21a7 7 0 0 0-5-6.7"/>',
  contact: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="11" r="2.5"/><path d="M5.5 17a3.5 3.5 0 0 1 7 0"/><path d="M15 9h4M15 13h4"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  type: '<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
  palette: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.3A5.7 5.7 0 0 0 22 9.7C22 5.4 17.5 2 12 2z"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.4 8.3 8 9 4.6-.7 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
  trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  up: '<path d="m18 15-6-6-6 6"/>', down: '<path d="m6 9 6 6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  check: '<path d="M20 6 9 17l-5-5"/>', alert: '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>', rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
  undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-15-6.7L3 13"/>', eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>', tablet: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/>', smartphone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 18h.01"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>', globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
};
export const icon = (n, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;

export function toast(msg, type = 'ok') {
  const el = document.createElement('div');
  el.className = `toast ${type === 'err' ? 'err' : ''}`;
  el.textContent = msg;
  document.getElementById('toasts').appendChild(el);
  setTimeout(() => el.remove(), type === 'err' ? 7000 : 3500);
}
export const fail = (e) => { if (e?.status !== 401) toast(e.message || String(e), 'err'); };

/** Opens a side drawer. `render(body)` fills it; returns { close, el }. */
export function drawer(title, html, { footer = '', onClose } = {}) {
  const scrim = document.createElement('div'); scrim.className = 'scrim';
  const el = document.createElement('aside'); el.className = 'drawer'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', title);
  el.innerHTML = `<header><h2>${esc(title)}</h2><span class="spacer"></span><button class="btn ghost icon" data-close aria-label="Close">${icon('x')}</button></header><div class="body">${html}</div>${footer ? `<footer>${footer}</footer>` : ''}`;
  const close = () => { scrim.remove(); el.remove(); document.removeEventListener('keydown', key); onClose?.(); };
  const key = (e) => { if (e.key === 'Escape') close(); };
  scrim.onclick = close; el.querySelector('[data-close]').onclick = close; document.addEventListener('keydown', key);
  document.body.append(scrim, el);
  el.querySelector('input, select, textarea, button:not([data-close])')?.focus();
  return { el, close };
}

/** A confirm dialog; resolves true/false. */
export function confirmBox(title, text, { ok = 'Confirm', danger = false } = {}) {
  return new Promise((resolve) => {
    const scrim = document.createElement('div'); scrim.className = 'scrim';
    const el = document.createElement('div'); el.className = 'dialog'; el.setAttribute('role', 'alertdialog');
    el.innerHTML = `<div class="body"><h2>${esc(title)}</h2><p class="muted">${esc(text)}</p></div><footer><button class="btn" data-no>Cancel</button><button class="btn ${danger ? 'primary' : 'primary'}" data-yes>${esc(ok)}</button></footer>`;
    const done = (v) => { scrim.remove(); el.remove(); resolve(v); };
    scrim.onclick = () => done(false); el.querySelector('[data-no]').onclick = () => done(false); el.querySelector('[data-yes]').onclick = () => done(true);
    document.body.append(scrim, el); el.querySelector('[data-yes]').focus();
  });
}

/** Area chart of one or two daily series. series: [{ key, label, cls }]. */
export function areaChart(days, data, series, { height = 240 } = {}) {
  const W = 800, H = height, pl = 36, pr = 12, pt = 14, pb = 26;
  const byDay = Object.fromEntries(data.map((d) => [d.day, d]));
  const pts = days.map((day) => ({ day, ...(byDay[day] || {}) }));
  const max = Math.max(4, ...pts.flatMap((p) => series.map((s) => p[s.key] || 0)));
  const nice = Math.ceil(max / 4) * 4;
  const x = (i) => pl + (i * (W - pl - pr)) / Math.max(1, pts.length - 1);
  const y = (v) => pt + (H - pt - pb) * (1 - (v || 0) / nice);
  const path = (k) => pts.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p[k]).toFixed(1)}`).join('');
  const s0 = series[0].key;
  const grid = [0, 1, 2, 3, 4].map((g) => { const v = (nice / 4) * g; return `<line class="grid-line" x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}"/><text class="axis" x="${pl - 8}" y="${y(v) + 4}" text-anchor="end">${num(v)}</text>`; }).join('');
  const step = Math.ceil(pts.length / 7);
  const labels = pts.map((p, i) => (i % step === 0 || i === pts.length - 1 ? `<text class="axis" x="${x(i)}" y="${H - 6}" text-anchor="middle">${new Date(p.day + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</text>` : '')).join('');
  const hits = pts.map((p, i) => `<rect x="${x(i) - (W - pl - pr) / pts.length / 2}" y="${pt}" width="${(W - pl - pr) / pts.length}" height="${H - pt - pb}" fill="transparent" data-tip="${attr(`<b>${fmtDate(p.day + 'T00:00:00Z')}</b><br>${series.map((s) => `${s.label}: ${num(p[s.key])}`).join('<br>')}`)}"/>`).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="height:${H}px">
<defs><linearGradient id="am-grad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".28"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs>
${grid}${labels}<path class="area" d="${path(s0)}L${x(pts.length - 1)},${y(0)}L${x(0)},${y(0)}Z"/><path class="line" d="${path(s0)}"/>
${series[1] ? `<path class="line-2" d="${path(series[1].key)}"/>` : ''}${hits}</svg>`;
}
export function lastDays(n) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) out.push(new Date(Date.now() - i * 86400000).toISOString().slice(0, 10));
  return out;
}
// One shared tooltip for charts.
let tipEl;
document.addEventListener('mousemove', (e) => {
  const t = e.target.closest?.('[data-tip]');
  if (!t) { if (tipEl) tipEl.hidden = true; return; }
  if (!tipEl) { tipEl = document.createElement('div'); tipEl.className = 'tip'; document.body.appendChild(tipEl); }
  tipEl.innerHTML = t.getAttribute('data-tip'); tipEl.hidden = false;
  tipEl.style.left = Math.min(e.clientX + 14, innerWidth - 200) + 'px'; tipEl.style.top = e.clientY + 14 + 'px';
});

export function bars(rows, { label, value, fmt = num, max } = {}) {
  if (!rows.length) return '<div class="empty small">No data yet</div>';
  const m = max ?? Math.max(1, ...rows.map((r) => r[value]));
  return `<div class="bars">${rows.map((r) => `<div class="bar-row"><span class="name">${label(r)}</span><span class="val">${fmt(r[value])}</span><div class="track"><div class="fill" style="width:${Math.max(2, (r[value] / m) * 100)}%"></div></div></div>`).join('')}</div>`;
}

export const empty = (text, ic = 'inbox') => `<div class="empty">${icon(ic)}<div>${esc(text)}</div></div>`;
export const loading = (h = 200) => `<div class="skeleton" style="height:${h}px"></div>`;

/** Reads a File as base64 (without the data: prefix). */
export const fileToBase64 = (file) => new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(String(r.result).split(',')[1]); r.onerror = reject; r.readAsDataURL(file); });
export const slugify = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
export function download(name, text, type = 'text/csv') {
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
export const csv = (rows, cols) => [cols.map((c) => c.label).join(','), ...rows.map((r) => cols.map((c) => `"${String(c.get(r) ?? '').replace(/"/g, '""')}"`).join(','))].join('\n');

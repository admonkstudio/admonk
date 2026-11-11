import { api, esc, num, delta, areaChart, lastDays, bars, flag, country, icon, download, csv } from '../core.js';
import { header } from '../app.js';

export default async function analytics(view, _rest, q) {
  const days = [7, 30, 90, 365].includes(+q.get('days')) ? +q.get('days') : 30;
  header('Analytics', {
    actions: `<div class="seg" role="group" aria-label="Date range">${[7, 30, 90, 365].map((d) => `<button aria-pressed="${d === days}" data-days="${d}">${d === 365 ? '12 months' : `${d} days`}</button>`).join('')}</div><button class="btn" id="export">${icon('download')} Export</button>`,
  });
  document.querySelectorAll('[data-days]').forEach((b) => (b.onclick = () => { history.replaceState({}, '', `?days=${b.dataset.days}`); analytics(view, [], new URLSearchParams(`days=${b.dataset.days}`)); }));
  view.innerHTML = '<div class="skeleton" style="height:320px"></div>';
  const a = await api(`analytics?days=${days}`);
  const t = a.totals;
  const perVisit = t.visitors ? (t.views / t.visitors).toFixed(1) : '–';
  const conv = t.visitors ? ((t.enquiries / t.visitors) * 100).toFixed(2) + '%' : '–';
  const merged = Object.values(Object.fromEntries([...a.daily.map((d) => [d.day, { ...d }])]));
  for (const e of a.enquiriesDaily) { const d = merged.find((m) => m.day === e.day); if (d) d.enquiries = e.n; else merged.push({ day: e.day, enquiries: e.n }); }
  const light = a.themes.find((x) => x.theme === 'light')?.views || 0, all = a.themes.reduce((s, x) => s + x.views, 0);

  view.innerHTML = `
<div class="grid g-4">
  <div class="card kpi"><div class="label">Unique visitors</div><div class="value">${num(t.visitors)}</div>${delta(t.visitors, a.previous.visitors)} <span class="muted small">vs previous period</span></div>
  <div class="card kpi"><div class="label">Page views</div><div class="value">${num(t.views)}</div>${delta(t.views, a.previous.views)} <span class="muted small">${perVisit} per visitor</span></div>
  <div class="card kpi"><div class="label">Enquiries</div><div class="value">${num(t.enquiries)}</div><span class="muted small">${conv} conversion</span></div>
  <div class="card kpi"><div class="label"><span class="live-dot"></span> Live now</div><div class="value">${num(t.live)}</div><span class="muted small">visitors in the last 5 minutes</span></div>
</div>
<div class="card" style="margin-top:16px"><div class="card-h"><h2>Visitors and enquiries</h2><div class="right legend"><span><i style="background:var(--accent)"></i>Visitors</span><span><i style="background:var(--violet)"></i>Enquiries</span></div></div>
  <div class="card-b">${areaChart(lastDays(Math.min(days, 365)), merged, [{ key: 'visitors', label: 'Visitors' }, { key: 'enquiries', label: 'Enquiries' }], { height: 280 })}</div></div>
<div class="grid g-2" style="margin-top:16px">
  <div class="card"><div class="card-h"><h2>Pages</h2><span class="sub">by visitors</span></div><div class="card-b">${bars(a.pages, { label: (r) => `<a href="${esc(r.path)}" target="_blank" rel="noopener">${esc(r.path)}</a>`, value: 'visitors' })}</div></div>
  <div class="card"><div class="card-h"><h2>Where visitors come from</h2></div><div class="card-b">${bars(a.sources, { label: (r) => esc(r.source), value: 'visitors' })}</div></div>
  <div class="card"><div class="card-h"><h2>Countries</h2></div><div class="card-b">${bars(a.countries, { label: (r) => `${flag(r.country)} ${esc(country(r.country))}`, value: 'visitors' })}</div></div>
  <div class="grid">
    <div class="card"><div class="card-h"><h2>Devices</h2></div><div class="card-b">${bars(a.devices, { label: (r) => esc(r.device[0].toUpperCase() + r.device.slice(1)), value: 'visitors' })}</div></div>
    <div class="card"><div class="card-h"><h2>Browsers</h2></div><div class="card-b">${bars(a.browsers, { label: (r) => esc(r.browser), value: 'visitors' })}</div></div>
    <div class="card kpi"><div class="label">Light mode usage</div><div class="value">${all ? Math.round((light / all) * 100) + '%' : '–'}</div><span class="muted small">of page views were in light mode</span></div>
  </div>
</div>
<p class="muted small" style="margin-top:16px">${icon('info').replace('<svg', '<svg style="width:14px;vertical-align:-2px"')} The site counts visits itself, without cookies or IP addresses, so there’s no cookie banner to show. Bots are filtered out, and visitors with “Do Not Track” on aren’t counted.</p>`;

  document.getElementById('export').onclick = () => download(`admonk-pages-${days}d.csv`, csv(a.pages, [{ label: 'Path', get: (r) => r.path }, { label: 'Views', get: (r) => r.views }, { label: 'Visitors', get: (r) => r.visitors }]));
}

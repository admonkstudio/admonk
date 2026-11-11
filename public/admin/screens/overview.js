import { api, state, esc, icon, num, delta, badge, ago, areaChart, lastDays, bars, empty, can } from '../core.js';
import { header } from '../app.js';

export default async function overview(view) {
  const name = (state.me.member.name || '').split(' ')[0];
  const hour = Number(new Date().toLocaleString('en-GB', { hour: 'numeric', hour12: false, timeZone: 'Africa/Cairo' }));
  header(`${hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'}${name ? `, ${name}` : ''}`, {
    actions: `<a class="btn" href="/" target="_blank" rel="noopener">${icon('external')} View site</a>${can('editor') ? `<a class="btn primary" href="/admin/content" data-link>${icon('plus')} New content</a>` : ''}`,
  });
  const [o, st] = await Promise.all([api('overview'), api('status').catch(() => null)]);
  const t = o.traffic, tot = o.totals;
  const conv = t.totals.visitors ? ((t.totals.enquiries / t.totals.visitors) * 100).toFixed(1) + '%' : '–';
  const setup = state.me.setup;
  const missing = [!setup.google && 'Google sign-in', !setup.github && 'GitHub (content editing)', !setup.email && 'email notifications'].filter(Boolean);

  view.innerHTML = `
${missing.length && can('admin') ? `<div class="banner info">${icon('info')}<div><b>Finish setting up:</b> ${esc(missing.join(', '))}. <a href="/admin/settings" data-link>See the steps</a></div></div>` : ''}
${st?.publishing ? `<div class="banner">${icon('rocket')}<div><b>Publishing your latest changes.</b> The site rebuilds in about two minutes after a save. Latest: “${esc(st.latest.message)}”.</div></div>` : ''}
<div class="grid g-4">
  <div class="card kpi"><div class="label">Visitors · 30 days</div><div class="value">${num(t.totals.visitors)}</div>${delta(t.totals.visitors, t.previous.visitors)} <span class="muted small">vs previous 30 days</span></div>
  <div class="card kpi"><div class="label">Page views · 30 days</div><div class="value">${num(t.totals.views)}</div>${delta(t.totals.views, t.previous.views)} <span class="muted small">vs previous 30 days</span></div>
  <div class="card kpi"><div class="label">Enquiries · 30 days</div><div class="value">${num(tot.last30)}</div>${delta(tot.last30, tot.prev30)} <span class="muted small">${conv} of visitors</span></div>
  <div class="card kpi"><div class="label"><span class="live-dot"></span> On the site now</div><div class="value">${num(t.totals.live)}</div><span class="muted small">${num(tot.open)} enquiries waiting for a reply</span></div>
</div>
<div class="grid g-main" style="margin-top:16px">
  <div class="card"><div class="card-h"><h2>Traffic</h2><span class="sub">Last 30 days</span><div class="right legend"><span><i style="background:var(--accent)"></i>Visitors</span><span><i style="background:var(--violet)"></i>Enquiries</span></div></div>
    <div class="card-b">${areaChart(lastDays(30), mergeDaily(t.daily, t.enquiriesDaily), [{ key: 'visitors', label: 'Visitors' }, { key: 'enquiries', label: 'Enquiries' }])}</div></div>
  <div class="card"><div class="card-h"><h2>Top pages</h2><div class="right"><a class="btn sm ghost" href="/admin/analytics" data-link>All analytics</a></div></div>
    <div class="card-b">${bars(t.pages.slice(0, 7), { label: (r) => esc(r.path), value: 'visitors' })}</div></div>
</div>
<div class="grid g-main" style="margin-top:16px">
  <div class="card"><div class="card-h"><h2>Latest enquiries</h2><div class="right"><a class="btn sm ghost" href="/admin/enquiries" data-link>Open inbox</a></div></div>
    <div class="card-b">${o.latest.length ? `<div class="list">${o.latest.map((e) => `<a href="/admin/enquiries/${e.id}" data-link><div class="grow"><div class="row"><span class="title">${esc(e.name || e.email)}</span>${e.company ? `<span class="muted small">· ${esc(e.company)}</span>` : ''}<span class="spacer"></span>${badge(e.status)}</div><div class="meta clip">${esc(e.message)}</div><div class="meta">${esc(e.source)} · ${ago(e.created_at)}</div></div></a>`).join('')}</div>` : empty('No enquiries yet. They appear here when someone sends the contact form.')}</div></div>
  <div class="grid" style="align-content:start">
    <div class="card"><div class="card-h"><h2>Pipeline</h2></div><div class="card-b">
      <div class="row" style="justify-content:space-between"><span class="muted">Contacts</span><b>${num(tot.contacts)}</b></div><hr>
      <div class="row" style="justify-content:space-between"><span class="muted">Clients</span><b>${num(tot.clients)}</b></div><hr>
      <div class="row" style="justify-content:space-between"><span class="muted">Win rate</span><b>${tot.closed ? Math.round((tot.won / tot.closed) * 100) + '%' : '–'}</b></div><hr>
      <div class="row" style="justify-content:space-between"><span class="muted">Team members</span><b>${num(tot.members)}</b></div>
    </div></div>
    <div class="card"><div class="card-h"><h2>Recent activity</h2><div class="right"><a class="btn sm ghost" href="/admin/activity" data-link>All</a></div></div><div class="card-b">
      ${o.activity.length ? `<div class="list">${o.activity.slice(0, 6).map((a) => `<div><div class="grow"><div class="small"><b>${esc(a.actor.replace(/@.*/, ''))}</b> ${esc(describe(a))}</div><div class="meta">${ago(a.created_at)}</div></div></div>`).join('')}</div>` : empty('Nothing yet', 'clock')}
    </div></div>
  </div>
</div>`;
}

function mergeDaily(daily, enq) {
  const m = Object.fromEntries(daily.map((d) => [d.day, { ...d }]));
  for (const e of enq) (m[e.day] ||= { day: e.day }).enquiries = e.n;
  return Object.values(m);
}

export function describe(a) {
  const map = {
    'auth.login': 'signed in', 'auth.denied': 'was refused sign-in', 'content.save': `saved ${a.target}`, 'content.create': `created ${a.target}`, 'content.delete': `deleted ${a.target}`,
    'media.upload': `uploaded ${a.target}`, 'design.publish': 'published design changes', 'design.restore': 'restored an earlier design', 'member.invite': `invited ${a.target} as ${a.detail}`,
    'member.update': `changed ${a.target} to ${a.detail}`, 'member.remove': `removed ${a.target}`, 'enquiry.status': `marked ${a.target} as ${a.detail}`, 'contact.update': `updated ${a.target}`, 'contact.create': `added contact ${a.target}`,
    'pages.save': `edited the text on ${a.target}`,
  };
  return map[a.action] || `${a.action} ${a.target || ''}`;
}

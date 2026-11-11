import { api, esc, attr, icon, badge, ago, fmtDateTime, empty, drawer, toast, fail, can, download, csv } from '../core.js';
import { header, go, refreshCounts } from '../app.js';

export default async function enquiries(view, rest, q) {
  const status = q.get('status') || '';
  const search = q.get('q') || '';
  header('Enquiries', { actions: `<button class="btn" id="export">${icon('download')} Export CSV</button>` });
  const data = await api(`enquiries?${new URLSearchParams({ ...(status && { status }), ...(search && { q: search }) })}`);
  const total = Object.values(data.counts).reduce((a, b) => a + b, 0);
  view.innerHTML = `
<div class="row wrap" style="margin-bottom:4px">
  <div class="tabs" style="flex:1;margin-bottom:0">
    <a href="/admin/enquiries${search ? `?q=${encodeURIComponent(search)}` : ''}" data-link ${!status ? 'aria-current="page"' : ''}>All <span class="n">${total}</span></a>
    ${data.statuses.map((s) => `<a href="/admin/enquiries?status=${s}${search ? `&q=${encodeURIComponent(search)}` : ''}" data-link ${status === s ? 'aria-current="page"' : ''} style="text-transform:capitalize">${s} <span class="n">${data.counts[s] || 0}</span></a>`).join('')}
  </div>
  <form class="search" id="find" style="width:260px">${icon('search')}<input class="input" name="q" placeholder="Search name, email, message" value="${attr(search)}"></form>
</div>
<div class="card" style="margin-top:16px">${data.items.length ? `<div class="table-wrap"><table class="t"><thead><tr><th>From</th><th>Message</th><th class="hide-sm">Source</th><th>Status</th><th class="hide-sm">Received</th></tr></thead><tbody>
${data.items.map((e) => `<tr class="link" data-id="${e.id}"><td><b>${esc(e.name || '—')}</b><div class="muted small">${esc(e.email)}${e.company ? ` · ${esc(e.company)}` : ''}</div></td><td class="clip">${esc(e.message)}</td><td class="hide-sm muted small">${esc(e.source)}</td><td>${badge(e.status)}</td><td class="hide-sm muted small" title="${attr(fmtDateTime(e.created_at))}">${ago(e.created_at)}</td></tr>`).join('')}
</tbody></table></div>` : empty(search || status ? 'No enquiries match.' : 'No enquiries yet. They arrive here from the website’s contact and start forms.')}</div>`;

  view.querySelector('#find').onsubmit = (e) => { e.preventDefault(); const v = new FormData(e.target).get('q'); go(`/admin/enquiries?${new URLSearchParams({ ...(status && { status }), ...(v && { q: v }) })}`); };
  view.querySelectorAll('tr[data-id]').forEach((tr) => (tr.onclick = () => open(tr.dataset.id, view, q)));
  document.getElementById('export').onclick = () => download('admonk-enquiries.csv', csv(data.items, [
    { label: 'Date', get: (r) => r.created_at }, { label: 'Name', get: (r) => r.name }, { label: 'Email', get: (r) => r.email }, { label: 'Company', get: (r) => r.company },
    { label: 'Status', get: (r) => r.status }, { label: 'Source', get: (r) => r.source }, { label: 'Message', get: (r) => r.message },
  ]));
  if (rest[0]) open(rest[0], view, q);
}

async function open(id, view, q) {
  history.replaceState({}, '', `/admin/enquiries/${id}${location.search}`);
  const { item: e, statuses } = await api(`enquiries/${id}`).catch((err) => (fail(err), {}));
  if (!e) return;
  let utm = '';
  try { const u = JSON.parse(e.utm || '{}'); utm = Object.entries(u).map(([k, v]) => `${k}: ${v}`).join(', '); } catch {}
  const reply = `mailto:${encodeURIComponent(e.email)}?subject=${encodeURIComponent('Re: your enquiry to Admonk')}&body=${encodeURIComponent(`Hi ${(e.name || '').split(' ')[0]},\n\n\n\n> ${e.message.split('\n').join('\n> ')}`)}`;
  const d = drawer(`Enquiry from ${e.name || e.email}`, `
<div class="row wrap" style="margin-bottom:16px">${badge(e.status)}<span class="muted small">${esc(fmtDateTime(e.created_at))} · ${esc(e.source)}</span></div>
<div class="card" style="padding:16px;white-space:pre-wrap;line-height:1.6">${esc(e.message)}</div>
<h2 class="section">Contact</h2>
<div class="list">
  <div><span class="muted" style="width:90px">Name</span><span class="grow">${esc(e.name || '—')}</span></div>
  <div><span class="muted" style="width:90px">Email</span><a class="grow" href="mailto:${attr(e.email)}">${esc(e.email)}</a></div>
  ${e.phone ? `<div><span class="muted" style="width:90px">Phone</span><a class="grow" href="tel:${attr(e.phone)}">${esc(e.phone)}</a></div>` : ''}
  ${e.company ? `<div><span class="muted" style="width:90px">Company</span><span class="grow">${esc(e.company)}</span></div>` : ''}
  <div><span class="muted" style="width:90px">Contact</span><a class="grow" href="/admin/contacts/${e.contact_id}" data-link>Open contact record (${esc(e.contact_status)})</a></div>
</div>
<h2 class="section">Where it came from</h2>
<div class="list">
  <div><span class="muted" style="width:90px">Page</span><span class="grow mono">${esc(e.page || '—')}</span></div>
  <div><span class="muted" style="width:90px">Referrer</span><span class="grow mono">${esc(e.referrer || 'Direct')}</span></div>
  ${utm ? `<div><span class="muted" style="width:90px">Campaign</span><span class="grow mono">${esc(utm)}</span></div>` : ''}
</div>`, {
    footer: `${can('editor') ? `<select class="input" id="st" style="width:160px">${statuses.map((s) => `<option ${s === e.status ? 'selected' : ''}>${s}</option>`).join('')}</select>` : ''}<span class="spacer"></span><a class="btn primary" href="${attr(reply)}" id="reply">${icon('mail')} Reply by email</a>`,
    onClose: () => history.replaceState({}, '', `/admin/enquiries${location.search}`),
  });
  const st = d.el.querySelector('#st');
  const save = async (s) => { await api(`enquiries/${id}`, { method: 'PATCH', body: { status: s } }); toast(`Marked as ${s}`); refreshCounts(); };
  if (st) st.onchange = () => save(st.value).then(() => enquiries(view, [], q)).catch(fail);
  d.el.querySelector('#reply').addEventListener('click', () => { if (can('editor') && e.status === 'new') save('replied').catch(() => {}); });
}

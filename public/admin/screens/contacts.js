import { api, esc, attr, icon, badge, ago, fmtDateTime, empty, drawer, toast, fail, can, download, csv } from '../core.js';
import { header, go } from '../app.js';

export default async function contacts(view, rest, q) {
  const status = q.get('status') || '';
  const search = q.get('q') || '';
  header('Contacts', { actions: `<button class="btn" id="export">${icon('download')} Export CSV</button>${can('editor') ? `<button class="btn primary" id="add">${icon('plus')} Add contact</button>` : ''}` });
  const data = await api(`contacts?${new URLSearchParams({ ...(status && { status }), ...(search && { q: search }) })}`);
  view.innerHTML = `
<div class="row wrap">
  <div class="tabs" style="flex:1;margin-bottom:0">
    <a href="/admin/contacts" data-link ${!status ? 'aria-current="page"' : ''}>All</a>
    ${data.statuses.map((s) => `<a href="/admin/contacts?status=${s}" data-link ${status === s ? 'aria-current="page"' : ''} style="text-transform:capitalize">${s}s</a>`).join('')}
  </div>
  <form class="search" id="find" style="width:260px">${icon('search')}<input class="input" name="q" placeholder="Search contacts" value="${attr(search)}"></form>
</div>
<div class="card" style="margin-top:16px">${data.items.length ? `<div class="table-wrap"><table class="t"><thead><tr><th>Name</th><th class="hide-sm">Company</th><th class="hide-sm">Phone</th><th>Status</th><th class="num hide-sm">Enquiries</th><th class="hide-sm">Last contact</th></tr></thead><tbody>
${data.items.map((c) => `<tr class="link" data-id="${c.id}"><td><b>${esc(c.name || '—')}</b><div class="muted small">${esc(c.email)}</div></td><td class="hide-sm">${esc(c.company || '')}</td><td class="hide-sm muted">${esc(c.phone || '')}</td><td>${badge(c.status)}</td><td class="num hide-sm">${c.enquiries}</td><td class="hide-sm muted small">${ago(c.last_enquiry || c.created_at)}</td></tr>`).join('')}
</tbody></table></div>` : empty(search || status ? 'No contacts match.' : 'No contacts yet. Everyone who sends a form is added here automatically.', 'contact')}</div>`;
  view.querySelector('#find').onsubmit = (e) => { e.preventDefault(); const v = new FormData(e.target).get('q'); go(`/admin/contacts?${new URLSearchParams({ ...(status && { status }), ...(v && { q: v }) })}`); };
  view.querySelectorAll('tr[data-id]').forEach((tr) => (tr.onclick = () => open(tr.dataset.id, view, q)));
  document.getElementById('export').onclick = () => download('admonk-contacts.csv', csv(data.items, [
    { label: 'Name', get: (r) => r.name }, { label: 'Email', get: (r) => r.email }, { label: 'Phone', get: (r) => r.phone }, { label: 'Company', get: (r) => r.company },
    { label: 'Status', get: (r) => r.status }, { label: 'Enquiries', get: (r) => r.enquiries }, { label: 'Notes', get: (r) => r.notes }, { label: 'Created', get: (r) => r.created_at },
  ]));
  document.getElementById('add')?.addEventListener('click', () => form(null, data.statuses, view, q));
  if (rest[0]) open(rest[0], view, q);
}

const fields = (c, statuses) => `
<label class="field"><span>Name</span><input class="input" name="name" value="${attr(c?.name)}"></label>
<label class="field"><span>Email</span><input class="input" name="email" type="email" value="${attr(c?.email)}" ${c ? 'readonly' : 'required'}></label>
<div class="grid g-2" style="margin-top:16px"><label class="field" style="margin:0"><span>Phone</span><input class="input" name="phone" value="${attr(c?.phone)}"></label>
<label class="field" style="margin:0"><span>Company</span><input class="input" name="company" value="${attr(c?.company)}"></label></div>
<label class="field"><span>Status</span><select class="input" name="status">${statuses.map((s) => `<option ${s === (c?.status || 'lead') ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
<label class="field"><span>Notes</span><textarea class="input" name="notes" rows="5" placeholder="Anything the team should know">${esc(c?.notes)}</textarea></label>`;

function form(c, statuses, view, q) {
  const d = drawer(c ? 'Edit contact' : 'Add contact', `<form id="cf">${fields(c, statuses)}</form>`, { footer: `<button class="btn" data-cancel>Cancel</button><button class="btn primary" form="cf">Save</button>` });
  d.el.querySelector('[data-cancel]').onclick = d.close;
  d.el.querySelector('#cf').onsubmit = async (e) => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.target));
    try {
      if (c) await api(`contacts/${c.id}`, { method: 'PATCH', body }); else await api('contacts', { method: 'POST', body });
      toast('Contact saved'); d.close(); contacts(view, [], q);
    } catch (err) { fail(err); }
  };
}

async function open(id, view, q) {
  history.replaceState({}, '', `/admin/contacts/${id}${location.search}`);
  const data = await api(`contacts/${id}`).catch((e) => (fail(e), null));
  if (!data) return;
  const c = data.item;
  const d = drawer(c.name || c.email, `
<div class="row wrap" style="margin-bottom:16px">${badge(c.status)}<span class="muted small">Added ${esc(fmtDateTime(c.created_at))}</span></div>
<div class="row wrap" style="margin-bottom:20px"><a class="btn" href="mailto:${attr(c.email)}">${icon('mail')} Email</a>${c.phone ? `<a class="btn" href="tel:${attr(c.phone)}">${icon('phone')} Call</a><a class="btn" href="https://wa.me/${attr(c.phone.replace(/[^\d]/g, ''))}" target="_blank" rel="noopener">WhatsApp</a>` : ''}</div>
${can('editor') ? `<form id="cf">${fields(c, data.statuses)}</form>` : `<div class="list"><div><span class="muted" style="width:90px">Email</span>${esc(c.email)}</div><div><span class="muted" style="width:90px">Phone</span>${esc(c.phone || '—')}</div><div><span class="muted" style="width:90px">Company</span>${esc(c.company || '—')}</div><div><span class="muted" style="width:90px">Notes</span><span style="white-space:pre-wrap">${esc(c.notes || '—')}</span></div></div>`}
<h2 class="section">Enquiries (${data.enquiries.length})</h2>
${data.enquiries.length ? `<div class="list">${data.enquiries.map((e) => `<a href="/admin/enquiries/${e.id}" data-link><div class="grow"><div class="row"><span class="small">${esc(fmtDateTime(e.created_at))} · ${esc(e.source)}</span><span class="spacer"></span>${badge(e.status)}</div><div class="meta clip">${esc(e.message)}</div></div></a>`).join('')}</div>` : '<p class="muted">No enquiries.</p>'}`, {
    footer: can('editor') ? `<button class="btn primary" form="cf">Save changes</button>` : '',
    onClose: () => history.replaceState({}, '', `/admin/contacts${location.search}`),
  });
  d.el.querySelector('#cf')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try { await api(`contacts/${id}`, { method: 'PATCH', body: Object.fromEntries(new FormData(e.target)) }); toast('Contact saved'); d.close(); contacts(view, [], q); } catch (err) { fail(err); }
  });
}

// The admin CRM: enquiries, contacts and a small analytics dashboard, rendered as plain HTML.
import { accessUser } from './access.js';

const ENQUIRY_STATUS = ['new', 'replied', 'qualified', 'won', 'lost', 'spam'];
const CONTACT_STATUS = ['lead', 'client', 'partner', 'archived'];

const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const date = (v) => (v ? new Date(v.replace(' ', 'T') + 'Z').toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Cairo' }) : '');
const html = (body, status = 200) => new Response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', 'X-Frame-Options': 'DENY' } });
const back = (url) => new Response(null, { status: 303, headers: { Location: url } });
const badge = (s) => `<span class="badge s-${esc(s)}">${esc(s)}</span>`;
const select = (name, options, current) => `<select name="${name}">${options.map((o) => `<option${o === current ? ' selected' : ''}>${o}</option>`).join('')}</select>`;

function page(title, user, content) {
  return html(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${esc(title)} | Admonk CRM</title><style>
:root{color-scheme:dark;--bg:#0f0f0f;--card:#17150f;--line:#3b3b3bcc;--ink:#e4e4e4;--muted:#8a8a8a;--accent:#f4f4f4}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,Segoe UI,sans-serif}
a{color:var(--ink)}header{display:flex;gap:1.5rem;align-items:center;padding:1rem 1.5rem;border-bottom:1px solid var(--line);flex-wrap:wrap}
header strong{margin-right:auto}header nav{display:flex;gap:1rem}header nav a{text-decoration:none;color:var(--muted)}header nav a:hover{color:var(--ink)}
main{padding:1.5rem;max-width:72rem;margin:0 auto}h1{font-size:1.5rem;font-weight:500;margin:0 0 1rem}h2{font-size:1.1rem;font-weight:500;margin:2rem 0 .75rem}
.grid{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(12rem,1fr))}.card{background:var(--card);border:1px solid var(--line);border-radius:1rem;padding:1.25rem}
.big{font-size:2rem;letter-spacing:-.03em}.muted{color:var(--muted)}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:.6rem .5rem;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--muted);font-weight:500;font-size:.85rem}.badge{display:inline-block;padding:.1rem .6rem;border-radius:999px;font-size:.8rem;border:1px solid var(--line)}
.s-new{background:#2d4a2a}.s-won,.s-client{background:#24423f}.s-lost,.s-spam,.s-archived{opacity:.6}
form.inline{display:flex;gap:.5rem;align-items:center;flex-wrap:wrap}select,input,textarea,button{font:inherit;color:var(--ink);background:var(--card);border:1px solid var(--line);border-radius:.5rem;padding:.4rem .6rem}
textarea{width:100%;min-height:6rem}button{background:var(--accent);color:#111;border:0;cursor:pointer}.filters{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem}
.filters a{padding:.25rem .75rem;border:1px solid var(--line);border-radius:999px;text-decoration:none;color:var(--muted)}.filters a[aria-current]{color:var(--ink);border-color:var(--ink)}
.msg{white-space:pre-wrap;background:var(--card);border:1px solid var(--line);border-radius:1rem;padding:1rem}.bar{height:.5rem;background:var(--accent);border-radius:999px}
@media(max-width:40rem){td:nth-child(n+4),th:nth-child(n+4){display:none}}
</style></head><body><header><strong>Admonk CRM</strong><nav><a href="/admin">Overview</a><a href="/admin/enquiries">Enquiries</a><a href="/admin/contacts">Contacts</a><a href="/">Website</a></nav>
<span class="muted">${esc(user)}</span></header><main>${content}</main></body></html>`);
}

async function overview(env, user) {
  const db = env.DB;
  const [totals, bySource, byStatus, daily, latest] = await Promise.all([
    db.prepare(`SELECT
      (SELECT count(*) FROM enquiries WHERE status = 'new') AS open,
      (SELECT count(*) FROM enquiries WHERE created_at >= datetime('now', '-30 days')) AS last30,
      (SELECT count(*) FROM enquiries WHERE created_at >= datetime('now', '-60 days') AND created_at < datetime('now', '-30 days')) AS prev30,
      (SELECT count(*) FROM contacts WHERE status = 'client') AS clients,
      (SELECT count(*) FROM contacts) AS contacts`).first(),
    db.prepare(`SELECT source, count(*) AS n FROM enquiries WHERE created_at >= datetime('now', '-90 days') GROUP BY source ORDER BY n DESC`).all(),
    db.prepare(`SELECT status, count(*) AS n FROM enquiries GROUP BY status ORDER BY n DESC`).all(),
    db.prepare(`SELECT date(created_at) AS day, count(*) AS n FROM enquiries WHERE created_at >= datetime('now', '-30 days') GROUP BY day ORDER BY day`).all(),
    db.prepare(`SELECT e.id, e.created_at, e.status, e.source, c.name, c.company FROM enquiries e JOIN contacts c ON c.id = e.contact_id ORDER BY e.id DESC LIMIT 8`).all(),
  ]);
  const max = Math.max(1, ...daily.results.map((d) => d.n));
  const won = byStatus.results.find((s) => s.status === 'won')?.n ?? 0;
  const closed = byStatus.results.filter((s) => ['won', 'lost'].includes(s.status)).reduce((a, s) => a + s.n, 0);
  return page('Overview', user, `<h1>Overview</h1>
<div class="grid">
<div class="card"><div class="muted">New, not yet answered</div><div class="big">${totals.open}</div><a href="/admin/enquiries?status=new">Open the list</a></div>
<div class="card"><div class="muted">Enquiries, last 30 days</div><div class="big">${totals.last30}</div><div class="muted">${totals.prev30} the 30 days before</div></div>
<div class="card"><div class="muted">Win rate (won of closed)</div><div class="big">${closed ? Math.round((won / closed) * 100) + '%' : '–'}</div><div class="muted">${won} won of ${closed}</div></div>
<div class="card"><div class="muted">Contacts</div><div class="big">${totals.contacts}</div><div class="muted">${totals.clients} clients</div></div>
</div>
<h2>Enquiries per day, last 30 days</h2>
<div class="card">${daily.results.length ? `<table>${daily.results.map((d) => `<tr><td style="width:7rem">${esc(d.day)}</td><td><div class="bar" style="width:${(d.n / max) * 100}%"></div></td><td style="width:3rem">${d.n}</td></tr>`).join('')}</table>` : '<p class="muted">No enquiries yet.</p>'}</div>
<div class="grid" style="margin-top:1rem">
<div class="card"><h2 style="margin-top:0">By form, last 90 days</h2><table>${bySource.results.map((s) => `<tr><td>${esc(s.source)}</td><td>${s.n}</td></tr>`).join('') || '<tr><td class="muted">None yet</td></tr>'}</table></div>
<div class="card"><h2 style="margin-top:0">By status</h2><table>${byStatus.results.map((s) => `<tr><td>${badge(s.status)}</td><td>${s.n}</td></tr>`).join('') || '<tr><td class="muted">None yet</td></tr>'}</table></div>
</div>
<h2>Latest enquiries</h2>${enquiryTable(latest.results)}
<p class="muted">Website traffic (visits, top pages, countries) is in Cloudflare Web Analytics.</p>`);
}

const enquiryTable = (rows) => rows.length
  ? `<table><tr><th>Received</th><th>From</th><th>Status</th><th>Form</th></tr>${rows.map((r) => `<tr><td><a href="/admin/enquiries/${r.id}">${date(r.created_at)}</a></td><td>${esc(r.name)}${r.company ? ` <span class="muted">· ${esc(r.company)}</span>` : ''}</td><td>${badge(r.status)}</td><td>${esc(r.source)}</td></tr>`).join('')}</table>`
  : '<p class="muted">Nothing here yet.</p>';

async function enquiries(env, user, url) {
  const status = ENQUIRY_STATUS.includes(url.searchParams.get('status')) ? url.searchParams.get('status') : null;
  const q = status
    ? env.DB.prepare(`SELECT e.id, e.created_at, e.status, e.source, c.name, c.company FROM enquiries e JOIN contacts c ON c.id = e.contact_id WHERE e.status = ?1 ORDER BY e.id DESC LIMIT 500`).bind(status)
    : env.DB.prepare(`SELECT e.id, e.created_at, e.status, e.source, c.name, c.company FROM enquiries e JOIN contacts c ON c.id = e.contact_id WHERE e.status != 'spam' ORDER BY e.id DESC LIMIT 500`);
  const { results } = await q.all();
  const filters = [['All', null], ...ENQUIRY_STATUS.map((s) => [s, s])].map(([l, s]) => `<a href="/admin/enquiries${s ? `?status=${s}` : ''}"${s === status ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  return page('Enquiries', user, `<h1>Enquiries</h1><div class="filters">${filters}</div>${enquiryTable(results)}`);
}

async function enquiry(env, user, id) {
  const e = await env.DB.prepare(`SELECT e.*, c.name, c.email, c.phone, c.company, c.status AS contact_status FROM enquiries e JOIN contacts c ON c.id = e.contact_id WHERE e.id = ?1`).bind(id).first();
  if (!e) return page('Not found', user, '<h1>Enquiry not found</h1>');
  return page(`Enquiry from ${e.name}`, user, `<p><a href="/admin/enquiries">← Enquiries</a></p>
<h1>${esc(e.name)}${e.company ? ` <span class="muted">· ${esc(e.company)}</span>` : ''}</h1>
<p class="muted">${date(e.created_at)} · ${esc(e.source)} form${e.page ? ` · from ${esc(e.page)}` : ''}${e.utm ? ` · ${esc(e.utm)}` : ''}</p>
<div class="msg">${esc(e.message)}</div>
<h2>Status</h2><form class="inline" method="post">${select('status', ENQUIRY_STATUS, e.status)}<button>Save</button></form>
<h2>Contact</h2><p><a href="mailto:${esc(e.email)}?subject=${encodeURIComponent('Your enquiry to Admonk')}">${esc(e.email)}</a>${e.phone ? ` · <a href="tel:${esc(e.phone)}">${esc(e.phone)}</a> · <a href="https://wa.me/${esc(e.phone.replace(/\D/g, ''))}">WhatsApp</a>` : ''}</p>
<p><a href="/admin/contacts/${e.contact_id}">Open contact</a> ${badge(e.contact_status)}</p>`);
}

async function contacts(env, user, url) {
  const q = (url.searchParams.get('q') ?? '').trim().slice(0, 100);
  const stmt = q
    ? env.DB.prepare(`SELECT c.*, (SELECT count(*) FROM enquiries WHERE contact_id = c.id) AS n FROM contacts c WHERE c.name LIKE ?1 OR c.email LIKE ?1 OR c.company LIKE ?1 ORDER BY c.updated_at DESC LIMIT 500`).bind(`%${q}%`)
    : env.DB.prepare(`SELECT c.*, (SELECT count(*) FROM enquiries WHERE contact_id = c.id) AS n FROM contacts c ORDER BY c.updated_at DESC LIMIT 500`);
  const { results } = await stmt.all();
  return page('Contacts', user, `<h1>Contacts</h1>
<form class="inline" style="margin-bottom:1rem"><input name="q" value="${esc(q)}" placeholder="Search name, email or company"><button>Search</button> <a href="/admin/contacts.csv">Download CSV</a></form>
${results.length ? `<table><tr><th>Name</th><th>Email</th><th>Status</th><th>Company</th><th>Enquiries</th></tr>${results.map((c) => `<tr><td><a href="/admin/contacts/${c.id}">${esc(c.name)}</a></td><td>${esc(c.email)}</td><td>${badge(c.status)}</td><td>${esc(c.company)}</td><td>${c.n}</td></tr>`).join('')}</table>` : '<p class="muted">No contacts found.</p>'}`);
}

async function contact(env, user, id) {
  const c = await env.DB.prepare('SELECT * FROM contacts WHERE id = ?1').bind(id).first();
  if (!c) return page('Not found', user, '<h1>Contact not found</h1>');
  const { results } = await env.DB.prepare(`SELECT e.id, e.created_at, e.status, e.source, ?2 AS name, NULL AS company FROM enquiries e WHERE contact_id = ?1 ORDER BY e.id DESC`).bind(id, c.name).all();
  return page(c.name, user, `<p><a href="/admin/contacts">← Contacts</a></p><h1>${esc(c.name)}</h1>
<p><a href="mailto:${esc(c.email)}">${esc(c.email)}</a>${c.phone ? ` · ${esc(c.phone)}` : ''}${c.company ? ` · ${esc(c.company)}` : ''}</p>
<form method="post" style="display:grid;gap:.75rem;max-width:40rem">
<label>Status ${select('status', CONTACT_STATUS, c.status)}</label>
<label>Notes<textarea name="notes">${esc(c.notes)}</textarea></label><div><button>Save</button></div></form>
<h2>Enquiries</h2>${enquiryTable(results)}`);
}

async function contactsCsv(env) {
  const { results } = await env.DB.prepare('SELECT name, email, phone, company, status, created_at FROM contacts ORDER BY created_at').all();
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = ['name,email,phone,company,status,created_at', ...results.map((r) => [r.name, r.email, r.phone, r.company, r.status, r.created_at].map(cell).join(','))].join('\n');
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="admonk-contacts.csv"', 'Cache-Control': 'no-store' } });
}

export async function handleAdmin(request, env) {
  const user = await accessUser(request, env);
  if (!user) return html('<h1>Sign-in required</h1><p>The admin area is protected by Cloudflare Access.</p>', 403);
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, '') || '/admin';

  if (request.method === 'POST') {
    // Same-origin forms only.
    if (request.headers.get('Origin') !== url.origin) return new Response('Bad origin', { status: 403 });
    const form = await request.formData();
    let m;
    if ((m = path.match(/^\/admin\/enquiries\/(\d+)$/))) {
      const status = form.get('status');
      if (ENQUIRY_STATUS.includes(status)) await env.DB.prepare('UPDATE enquiries SET status = ?1 WHERE id = ?2').bind(status, m[1]).run();
      return back(path);
    }
    if ((m = path.match(/^\/admin\/contacts\/(\d+)$/))) {
      const status = form.get('status');
      const notes = String(form.get('notes') ?? '').slice(0, 10000);
      if (CONTACT_STATUS.includes(status)) await env.DB.prepare(`UPDATE contacts SET status = ?1, notes = ?2, updated_at = datetime('now') WHERE id = ?3`).bind(status, notes, m[1]).run();
      return back(path);
    }
    return new Response('Not found', { status: 404 });
  }

  let m;
  if (path === '/admin') return overview(env, user);
  if (path === '/admin/enquiries') return enquiries(env, user, url);
  if ((m = path.match(/^\/admin\/enquiries\/(\d+)$/))) return enquiry(env, user, m[1]);
  if (path === '/admin/contacts') return contacts(env, user, url);
  if (path === '/admin/contacts.csv') return contactsCsv(env);
  if ((m = path.match(/^\/admin\/contacts\/(\d+)$/))) return contact(env, user, m[1]);
  return page('Not found', user, '<h1>Not found</h1>');
}

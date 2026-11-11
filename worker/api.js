// JSON API for the admin dashboard (/api/admin/*). Every route needs a signed-in member; writes also
// need the right role and the X-Admin header (which a cross-site form can't send).
import { currentMember, can, ROLES, log } from './auth.js';
import { github, GitHubError } from './github.js';
import { analytics } from './analytics.js';
import { TOKENS, ELEMENTS, safeValue } from '../src/design/tokens.mjs';

const ENQUIRY_STATUS = ['new', 'replied', 'qualified', 'won', 'lost', 'spam'];
const CONTACT_STATUS = ['lead', 'client', 'partner', 'archived'];
const MEMBER_STATUS = ['invited', 'active', 'disabled'];

// Collections editable in the admin, and where their files live.
export const COLLECTIONS = {
  portfolio: { dir: 'src/content/portfolio', ext: 'json' },
  services: { dir: 'src/content/services', ext: 'json' },
  solutions: { dir: 'src/content/solutions', ext: 'json' },
  frameworks: { dir: 'src/content/frameworks', ext: 'json' },
  tools: { dir: 'src/content/tools', ext: 'json' },
  blog: { dir: 'src/content/blog', ext: 'md' },
  testimonials: { dir: 'src/content/testimonials', ext: 'json' },
  industries: { dir: 'src/content/industries', ext: 'json' },
  locations: { dir: 'src/content/locations', ext: 'json' },
  pages: { dir: 'src/content/pages', ext: 'json' },
};
const SLUG = /^[a-z0-9][a-z0-9-]{0,80}$/;
const IMAGE = /^[a-z0-9][a-z0-9._-]{0,90}\.(avif|webp|png|jpe?g|svg|gif)$/;

class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
const need = (member, role) => { if (!can(member, role)) throw new HttpError(403, `This needs the ${role} role.`); };
const pick = (o, keys) => Object.fromEntries(keys.filter((k) => o[k] !== undefined).map((k) => [k, o[k]]));

export async function handleApi(request, env, url) {
  const member = await currentMember(request, env);
  if (!member) return json({ error: 'Not signed in' }, 401);
  if (request.method !== 'GET') {
    const origin = request.headers.get('Origin');
    if (request.headers.get('X-Admin') !== '1' || (origin && origin !== url.origin)) return json({ error: 'Bad request origin' }, 403);
  }
  const parts = url.pathname.replace(/^\/api\/admin\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const body = request.method === 'GET' || request.method === 'DELETE' ? {} : await request.json().catch(() => ({}));
  const ctx = { env, url, member, body, method: request.method, parts };
  try {
    return json(await route(ctx));
  } catch (e) {
    if (e instanceof HttpError || e instanceof GitHubError) return json({ error: e.message }, e.status);
    console.error(e);
    return json({ error: 'Something went wrong on the server.' }, 500);
  }
}

async function route(c) {
  const [area, id, sub] = c.parts;
  const m = c.method;
  switch (area) {
    case 'me': return me(c);
    case 'overview': return overview(c);
    case 'analytics': return analytics(c.env, c.url.searchParams.get('days'));
    case 'enquiries': return id ? (m === 'GET' ? enquiry(c, id) : updateEnquiry(c, id)) : enquiries(c);
    case 'contacts': return id ? (m === 'GET' ? contact(c, id) : updateContact(c, id)) : m === 'POST' ? createContact(c) : contacts(c);
    case 'members': return members(c, id);
    case 'activity': return { items: (await c.env.DB.prepare('SELECT * FROM activity ORDER BY id DESC LIMIT 200').all()).results };
    case 'content': return content(c, id, sub);
    case 'upload': return upload(c);
    case 'status': return status(c);
    case 'design': return design(c, id, sub);
    default: throw new HttpError(404, 'Unknown endpoint');
  }
}

async function me({ env, member }) {
  return {
    member: pick(member, ['id', 'email', 'name', 'picture', 'role']),
    roles: ROLES,
    setup: { google: !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET), github: !!env.GITHUB_TOKEN, email: !!env.NOTIFY, dev: env.ADMIN_DEV === 'true' },
    repo: env.GITHUB_REPO || 'admonkstudio/admonk', branch: env.CONTENT_BRANCH || 'main',
  };
}

async function overview({ env }) {
  const db = env.DB;
  const [totals, latest, activity, week] = await Promise.all([
    db.prepare(`SELECT
      (SELECT count(*) FROM enquiries WHERE status = 'new') AS open,
      (SELECT count(*) FROM enquiries WHERE created_at >= datetime('now', '-30 days')) AS last30,
      (SELECT count(*) FROM enquiries WHERE created_at >= datetime('now', '-60 days') AND created_at < datetime('now', '-30 days')) AS prev30,
      (SELECT count(*) FROM enquiries WHERE status = 'won') AS won,
      (SELECT count(*) FROM enquiries WHERE status IN ('won', 'lost')) AS closed,
      (SELECT count(*) FROM contacts) AS contacts,
      (SELECT count(*) FROM contacts WHERE status = 'client') AS clients,
      (SELECT count(*) FROM members WHERE status = 'active') AS members`).first(),
    db.prepare(`SELECT e.id, e.created_at, e.status, e.source, substr(e.message, 1, 140) AS message, c.name, c.email, c.company FROM enquiries e JOIN contacts c ON c.id = e.contact_id ORDER BY e.id DESC LIMIT 6`).all(),
    db.prepare('SELECT * FROM activity ORDER BY id DESC LIMIT 8').all(),
    analytics(env, 30),
  ]);
  return { totals, latest: latest.results, activity: activity.results, traffic: week };
}

// ---- CRM ----
async function enquiries({ env, url }) {
  const st = url.searchParams.get('status');
  const q = (url.searchParams.get('q') || '').trim();
  const where = [], args = [];
  if (ENQUIRY_STATUS.includes(st)) { where.push('e.status = ?'); args.push(st); }
  if (q) { where.push('(c.name LIKE ? OR c.email LIKE ? OR c.company LIKE ? OR e.message LIKE ?)'); args.push(...Array(4).fill(`%${q}%`)); }
  const rows = await env.DB.prepare(`SELECT e.id, e.created_at, e.status, e.source, e.page, substr(e.message, 1, 200) AS message, c.id AS contact_id, c.name, c.email, c.company
    FROM enquiries e JOIN contacts c ON c.id = e.contact_id ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY e.id DESC LIMIT 500`).bind(...args).all();
  const counts = await env.DB.prepare('SELECT status, count(*) AS n FROM enquiries GROUP BY status').all();
  return { items: rows.results, counts: Object.fromEntries(counts.results.map((r) => [r.status, r.n])), statuses: ENQUIRY_STATUS };
}
async function enquiry({ env }, id) {
  const e = await env.DB.prepare('SELECT e.*, c.name, c.email, c.phone, c.company, c.status AS contact_status FROM enquiries e JOIN contacts c ON c.id = e.contact_id WHERE e.id = ?').bind(id).first();
  if (!e) throw new HttpError(404, 'Enquiry not found');
  return { item: e, statuses: ENQUIRY_STATUS };
}
async function updateEnquiry({ env, member, body }, id) {
  need(member, 'editor');
  if (!ENQUIRY_STATUS.includes(body.status)) throw new HttpError(400, 'Unknown status');
  await env.DB.prepare('UPDATE enquiries SET status = ? WHERE id = ?').bind(body.status, id).run();
  await log(env, member.email, 'enquiry.status', `enquiry ${id}`, body.status);
  return { ok: true };
}
async function contacts({ env, url }) {
  const st = url.searchParams.get('status');
  const q = (url.searchParams.get('q') || '').trim();
  const where = [], args = [];
  if (CONTACT_STATUS.includes(st)) { where.push('c.status = ?'); args.push(st); }
  if (q) { where.push('(c.name LIKE ? OR c.email LIKE ? OR c.company LIKE ? OR c.phone LIKE ?)'); args.push(...Array(4).fill(`%${q}%`)); }
  const rows = await env.DB.prepare(`SELECT c.*, count(e.id) AS enquiries, max(e.created_at) AS last_enquiry FROM contacts c LEFT JOIN enquiries e ON e.contact_id = c.id
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''} GROUP BY c.id ORDER BY coalesce(max(e.created_at), c.created_at) DESC LIMIT 1000`).bind(...args).all();
  return { items: rows.results, statuses: CONTACT_STATUS };
}
async function contact({ env }, id) {
  const item = await env.DB.prepare('SELECT * FROM contacts WHERE id = ?').bind(id).first();
  if (!item) throw new HttpError(404, 'Contact not found');
  const list = await env.DB.prepare('SELECT id, created_at, status, source, message FROM enquiries WHERE contact_id = ? ORDER BY id DESC').bind(id).all();
  return { item, enquiries: list.results, statuses: CONTACT_STATUS };
}
const contactFields = (b) => ({ name: b.name?.trim() || null, email: b.email?.trim().toLowerCase(), phone: b.phone?.trim() || null, company: b.company?.trim() || null, status: CONTACT_STATUS.includes(b.status) ? b.status : 'lead', notes: b.notes ?? null });
async function updateContact({ env, member, body }, id) {
  need(member, 'editor');
  const f = contactFields(body);
  await env.DB.prepare(`UPDATE contacts SET name = ?, phone = ?, company = ?, status = ?, notes = ?, updated_at = datetime('now') WHERE id = ?`).bind(f.name, f.phone, f.company, f.status, f.notes, id).run();
  await log(env, member.email, 'contact.update', `contact ${id}`);
  return { ok: true };
}
async function createContact({ env, member, body }) {
  need(member, 'editor');
  const f = contactFields(body);
  if (!f.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) throw new HttpError(400, 'A valid email is needed');
  const r = await env.DB.prepare('INSERT INTO contacts (email, name, phone, company, status, notes) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(email) DO NOTHING RETURNING id').bind(f.email, f.name, f.phone, f.company, f.status, f.notes).first();
  if (!r) throw new HttpError(409, 'A contact with this email already exists');
  await log(env, member.email, 'contact.create', f.email);
  return { id: r.id };
}

// ---- Members ----
async function members({ env, member, method, body }, id) {
  if (method === 'GET') {
    const rows = await env.DB.prepare('SELECT id, email, name, picture, role, status, invited_by, last_login_at, created_at FROM members ORDER BY status = \'active\' DESC, role DESC, email').all();
    return { items: rows.results, roles: ROLES, statuses: MEMBER_STATUS };
  }
  need(member, 'owner');
  if (method === 'POST') {
    const email = String(body.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, 'Enter a valid Google account email');
    const role = ROLES.includes(body.role) ? body.role : 'editor';
    const r = await env.DB.prepare(`INSERT INTO members (email, role, status, invited_by) VALUES (?, ?, 'invited', ?) ON CONFLICT(email) DO NOTHING RETURNING id`).bind(email, role, member.email).first();
    if (!r) throw new HttpError(409, 'This person is already a member');
    await log(env, member.email, 'member.invite', email, role);
    return { id: r.id };
  }
  const target = await env.DB.prepare('SELECT * FROM members WHERE id = ?').bind(id).first();
  if (!target) throw new HttpError(404, 'Member not found');
  const owners = (await env.DB.prepare(`SELECT count(*) AS n FROM members WHERE role = 'owner' AND status != 'disabled'`).first()).n;
  const losingOwner = target.role === 'owner' && (method === 'DELETE' || (body.role && body.role !== 'owner') || body.status === 'disabled');
  if (losingOwner && owners <= 1) throw new HttpError(400, 'There must always be at least one owner.');
  if (method === 'DELETE') {
    await env.DB.prepare('DELETE FROM sessions WHERE member_id = ?').bind(id).run();
    await env.DB.prepare('DELETE FROM members WHERE id = ?').bind(id).run();
    await log(env, member.email, 'member.remove', target.email);
    return { ok: true };
  }
  const role = ROLES.includes(body.role) ? body.role : target.role;
  const st = MEMBER_STATUS.includes(body.status) ? body.status : target.status;
  await env.DB.prepare('UPDATE members SET role = ?, status = ? WHERE id = ?').bind(role, st, id).run();
  if (st === 'disabled') await env.DB.prepare('DELETE FROM sessions WHERE member_id = ?').bind(id).run();
  await log(env, member.email, 'member.update', target.email, `${role}, ${st}`);
  return { ok: true };
}

// ---- Content (GitHub) ----
function fileFor(coll, id) {
  const def = COLLECTIONS[coll];
  if (!def) throw new HttpError(404, 'Unknown collection');
  if (id !== undefined && !SLUG.test(id)) throw new HttpError(400, 'The slug can only use lowercase letters, numbers and dashes.');
  return { def, path: id !== undefined ? `${def.dir}/${id}.${def.ext}` : def.dir };
}
async function content({ env, member, method, body }, coll, id) {
  const gh = github(env);
  if (!coll) return { collections: Object.keys(COLLECTIONS), ready: gh.ready };
  const { def, path } = fileFor(coll, id);
  if (!id) {
    const files = await gh.list(def.dir);
    return { items: files.filter((f) => f.name.endsWith(`.${def.ext}`)).map((f) => ({ id: f.name.replace(/\.[^.]+$/, ''), sha: f.sha, size: f.size })) };
  }
  const author = { name: member.name, email: member.email };
  if (method === 'GET') {
    const f = await gh.read(path);
    if (!f) throw new HttpError(404, 'Not found');
    return { id, sha: f.sha, content: f.content, history: await gh.recentCommits(path, 10).catch(() => []) };
  }
  need(member, 'editor');
  if (method === 'DELETE') {
    const f = await gh.read(path);
    if (!f) throw new HttpError(404, 'Not found');
    const r = await gh.remove(path, { message: `Delete ${coll}/${id} (admin)`, sha: f.sha, author });
    await log(env, member.email, 'content.delete', `${coll}/${id}`);
    return r;
  }
  if (typeof body.content !== 'string' || body.content.length > 400_000) throw new HttpError(400, 'Missing content');
  if (def.ext === 'json') { try { JSON.parse(body.content); } catch { throw new HttpError(400, 'The content is not valid JSON.'); } }
  if (method === 'POST') {
    if (await gh.read(path)) throw new HttpError(409, 'An item with this slug already exists.');
  }
  const r = await gh.write(path, body.content, { message: body.message?.trim() || `${method === 'POST' ? 'Add' : 'Update'} ${coll}/${id} (admin)`, sha: method === 'PUT' ? body.sha : undefined, author })
    .catch((e) => { if (e.status === 409) throw new HttpError(409, 'Someone else saved this item since you opened it. Reload to see their changes.'); throw e; });
  await log(env, member.email, coll === 'pages' ? 'pages.save' : method === 'POST' ? 'content.create' : 'content.save', coll === 'pages' ? id : `${coll}/${id}`, body.message);
  return r;
}
async function upload({ env, member, body }) {
  need(member, 'editor');
  const name = String(body.name || '').toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+/, '');
  if (!IMAGE.test(name)) throw new HttpError(400, 'Use an image file (avif, webp, png, jpg, svg or gif).');
  const data = String(body.data || '');
  if (!data || data.length > 7_000_000) throw new HttpError(400, 'Images can be up to 5 MB.');
  const gh = github(env);
  const path = `src/assets/cms/${name}`;
  const existing = await gh.read(path).catch(() => null);
  if (existing && !body.replace) throw new HttpError(409, 'An image with this name already exists. Rename the file or choose to replace it.');
  await gh.write(path, data, { message: `Upload image ${name} (admin)`, base64: true, sha: existing?.sha, author: { name: member.name, email: member.email } });
  await log(env, member.email, 'media.upload', name);
  return { path: `../../assets/cms/${name}`, url: `/wf/media/cms/${name}` };
}
async function status({ env, url }) {
  const gh = github(env);
  const build = await env.ASSETS.fetch(new Request(new URL('/wf/am/build.json', url))).then((r) => (r.ok ? r.json() : null)).catch(() => null);
  const latest = gh.ready ? await gh.latestCommit().catch(() => null) : null;
  return { build, latest, publishing: !!(latest && build?.commit && latest.sha !== build.commit) };
}

// ---- Design ----
async function designState(env) {
  const rows = (await env.DB.prepare('SELECT key, theme, value, updated_by, updated_at FROM design_tokens').all()).results;
  const custom = (await env.DB.prepare(`SELECT value FROM settings WHERE key = 'design_custom_css'`).first())?.value || '';
  return { rows, custom };
}
async function design({ env, member, method, body }, sub, vid) {
  if (method === 'GET' && !sub) {
    const versions = (await env.DB.prepare('SELECT id, note, created_by, created_at FROM design_versions ORDER BY id DESC LIMIT 30').all()).results;
    return { ...(await designState(env)), versions };
  }
  need(member, 'admin');
  let next;
  if (sub === 'restore') {
    const v = await env.DB.prepare('SELECT snapshot FROM design_versions WHERE id = ?').bind(vid).first();
    if (!v) throw new HttpError(404, 'Version not found');
    next = JSON.parse(v.snapshot);
  } else if (method === 'PUT') {
    next = { rows: Array.isArray(body.rows) ? body.rows : [], custom: String(body.custom || '') };
  } else throw new HttpError(405, 'Method not allowed');
  const known = new Set([...TOKENS.map((t) => t.name), ...ELEMENTS.map((e) => e.id)]);
  const rows = next.rows.filter((r) => known.has(r.key) && ['dark', 'light'].includes(r.theme) && safeValue(r.value)).slice(0, 500);
  if (next.custom.length > 20000) throw new HttpError(400, 'Custom CSS is limited to 20,000 characters.');
  const before = await designState(env);
  const stmts = [env.DB.prepare('DELETE FROM design_tokens')];
  for (const r of rows) stmts.push(env.DB.prepare('INSERT INTO design_tokens (key, theme, value, updated_by) VALUES (?, ?, ?, ?)').bind(r.key, r.theme, safeValue(r.value), member.email));
  stmts.push(env.DB.prepare(`INSERT INTO settings (key, value, updated_at) VALUES ('design_custom_css', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`).bind(next.custom));
  // Keep the previous state so it can be restored.
  stmts.push(env.DB.prepare('INSERT INTO design_versions (snapshot, note, created_by) VALUES (?, ?, ?)').bind(JSON.stringify(before), `Before: ${String(body.note || (sub === 'restore' ? `restore #${vid}` : 'publish')).slice(0, 120)}`, member.email));
  await env.DB.batch(stmts);
  await env.DB.prepare(`INSERT INTO settings (key, value, updated_at) VALUES ('design_version', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`).bind(String(Date.now())).run();
  await log(env, member.email, sub === 'restore' ? 'design.restore' : 'design.publish', null, body.note);
  return { ok: true, count: rows.length };
}

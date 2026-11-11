// Admin sign-in with Google (OpenID Connect, authorization code flow with PKCE) and cookie sessions.
//
// Setup (Cloudflare dashboard → Workers → admonk → Settings → Variables and Secrets):
//   GOOGLE_CLIENT_ID      OAuth client id from Google Cloud (Credentials → OAuth client ID → Web application)
//   GOOGLE_CLIENT_SECRET  its secret
// Authorised redirect URIs on the Google client: https://admonk.net/api/auth/callback (plus any preview host).
// OWNER_EMAILS (wrangler.jsonc) lists who becomes an owner on first sign-in; everyone else must be invited.

const SESSION_DAYS = 14;
export const ROLES = ['viewer', 'editor', 'admin', 'owner'];
export const can = (member, role) => !!member && ROLES.indexOf(member.role) >= ROLES.indexOf(role);

const enc = new TextEncoder();
const b64url = (bytes) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const randomToken = (n = 32) => b64url(crypto.getRandomValues(new Uint8Array(n)));
const sha256 = async (s) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)))].map((b) => b.toString(16).padStart(2, '0')).join('');
const sha256b64 = async (s) => b64url(new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s))));

export function cookies(request) {
  const out = {};
  for (const part of (request.headers.get('Cookie') || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}
const cookie = (name, value, maxAge) => `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
const redirect = (location, headers = {}) => new Response(null, { status: 302, headers: { Location: location, 'Cache-Control': 'no-store', ...headers } });
const safeNext = (n) => (typeof n === 'string' && n.startsWith('/admin') && !n.startsWith('//') ? n : '/admin');
const owners = (env) => String(env.OWNER_EMAILS || '').toLowerCase().split(/[\s,]+/).filter(Boolean);

/** The signed-in member for this request, or null. */
export async function currentMember(request, env) {
  if (env.ADMIN_DEV === 'true') {
    // Local development only (set in .dev.vars): act as an owner without Google.
    await env.DB.prepare(`INSERT INTO members (email, name, role, status) VALUES ('dev@localhost', 'Local developer', 'owner', 'active') ON CONFLICT(email) DO NOTHING`).run();
    return env.DB.prepare(`SELECT * FROM members WHERE email = 'dev@localhost'`).first();
  }
  const token = cookies(request).am_session;
  if (!token) return null;
  const id = await sha256(token);
  return env.DB.prepare(`SELECT m.* FROM sessions s JOIN members m ON m.id = s.member_id WHERE s.id = ? AND s.expires_at > datetime('now') AND m.status = 'active'`).bind(id).first();
}

export async function handleAuth(request, env, url) {
  const { pathname } = url;
  if (pathname === '/api/auth/google') return start(env, url);
  if (pathname === '/api/auth/callback') return callback(request, env, url);
  if (pathname === '/api/auth/logout') {
    const token = cookies(request).am_session;
    if (token) await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(await sha256(token)).run();
    return redirect('/admin/login', { 'Set-Cookie': cookie('am_session', '', 0) });
  }
  return new Response('Not found', { status: 404 });
}

async function start(env, url) {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) return redirect('/admin/login?error=setup');
  const state = randomToken(16);
  const verifier = randomToken(48);
  const next = safeNext(url.searchParams.get('next'));
  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: `${url.origin}/api/auth/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    code_challenge: await sha256b64(verifier),
    code_challenge_method: 'S256',
    prompt: 'select_account',
  });
  return redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`, {
    'Set-Cookie': cookie('am_oauth', JSON.stringify({ state, verifier, next }), 600),
  });
}

async function callback(request, env, url) {
  let saved;
  try { saved = JSON.parse(cookies(request).am_oauth || ''); } catch { saved = null; }
  const clear = cookie('am_oauth', '', 0);
  if (!saved || !url.searchParams.get('state') || saved.state !== url.searchParams.get('state')) return redirect('/admin/login?error=state', { 'Set-Cookie': clear });
  if (url.searchParams.get('error')) return redirect('/admin/login?error=cancelled', { 'Set-Cookie': clear });

  // Exchange the code server to server; the id_token comes straight from Google over TLS.
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code: url.searchParams.get('code') || '',
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${url.origin}/api/auth/callback`,
      grant_type: 'authorization_code',
      code_verifier: saved.verifier,
    }),
  });
  const tok = await res.json().catch(() => ({}));
  if (!res.ok || !tok.id_token) return redirect('/admin/login?error=google', { 'Set-Cookie': clear });
  const part = tok.id_token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  const claims = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(part.padEnd(Math.ceil(part.length / 4) * 4, '=')), (c) => c.charCodeAt(0))));
  const okIss = ['accounts.google.com', 'https://accounts.google.com'].includes(claims.iss);
  if (!okIss || claims.aud !== env.GOOGLE_CLIENT_ID || claims.exp * 1000 < Date.now() || !claims.email || claims.email_verified !== true) {
    return redirect('/admin/login?error=google', { 'Set-Cookie': clear });
  }
  const email = String(claims.email).toLowerCase();

  let member = await env.DB.prepare('SELECT * FROM members WHERE email = ?').bind(email).first();
  if (!member && owners(env).includes(email)) {
    await env.DB.prepare(`INSERT INTO members (email, role, status, invited_by) VALUES (?, 'owner', 'active', 'OWNER_EMAILS')`).bind(email).run();
    member = await env.DB.prepare('SELECT * FROM members WHERE email = ?').bind(email).first();
  }
  if (!member || member.status === 'disabled') {
    await log(env, email, 'auth.denied', null, 'Not a member');
    return redirect('/admin/login?error=denied', { 'Set-Cookie': clear });
  }
  await env.DB.prepare(`UPDATE members SET status = 'active', name = coalesce(?, name), picture = ?, last_login_at = datetime('now') WHERE id = ?`).bind(claims.name || null, claims.picture || null, member.id).run();

  const token = randomToken();
  await env.DB.prepare(`INSERT INTO sessions (id, member_id, user_agent, expires_at) VALUES (?, ?, ?, datetime('now', ?))`)
    .bind(await sha256(token), member.id, (request.headers.get('User-Agent') || '').slice(0, 200), `+${SESSION_DAYS} days`).run();
  await env.DB.prepare(`DELETE FROM sessions WHERE expires_at < datetime('now')`).run();
  await log(env, email, 'auth.login');
  const headers = new Headers({ Location: saved.next || '/admin', 'Cache-Control': 'no-store' });
  headers.append('Set-Cookie', clear);
  headers.append('Set-Cookie', cookie('am_session', token, SESSION_DAYS * 86400));
  return new Response(null, { status: 302, headers });
}

export async function log(env, actor, action, target = null, detail = null) {
  try {
    await env.DB.prepare('INSERT INTO activity (actor, action, target, detail) VALUES (?, ?, ?, ?)').bind(actor, action, target, detail ? String(detail).slice(0, 2000) : null).run();
  } catch (e) { console.error('activity log', e); }
}

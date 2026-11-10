// Admin pages sit behind Cloudflare Access. Access adds a signed JWT to every request it lets through;
// we verify it here too, so the CRM stays closed even if the Access rule is ever removed by mistake.
const certsCache = new Map();

const b64url = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));

async function keys(team) {
  const hit = certsCache.get(team);
  if (hit && hit.expires > Date.now()) return hit.keys;
  const { keys } = await fetch(`https://${team}/cdn-cgi/access/certs`).then((r) => r.json());
  certsCache.set(team, { keys, expires: Date.now() + 3600_000 });
  return keys;
}

/** Returns the signed-in person's email, or null when the request isn't from Access. */
export async function accessUser(request, env) {
  if (env.ADMIN_DEV === 'true') return 'dev@localhost'; // local development only (set in .dev.vars)
  const token = request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) return null;
  const [h, p, s] = token.split('.');
  const header = JSON.parse(new TextDecoder().decode(b64url(h)));
  const payload = JSON.parse(new TextDecoder().decode(b64url(p)));
  const jwk = (await keys(env.ACCESS_TEAM_DOMAIN)).find((k) => k.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64url(s), new TextEncoder().encode(`${h}.${p}`));
  const aud = [payload.aud].flat();
  if (!ok || !aud.includes(env.ACCESS_AUD) || payload.exp * 1000 < Date.now() || payload.iss !== `https://${env.ACCESS_TEAM_DOMAIN}`) return null;
  return payload.email ?? null;
}

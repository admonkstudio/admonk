// The admin sign-in screen.
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const ERRORS = {
  denied: 'This Google account isn’t a member of the Admonk workspace yet. Ask an owner to invite you from Members, then sign in again.',
  setup: 'Google sign-in isn’t set up yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to the Worker’s secrets in Cloudflare.',
  state: 'The sign-in link expired. Please try again.',
  google: 'Google couldn’t confirm the sign-in. Please try again.',
  cancelled: 'Sign-in was cancelled.',
};

export function loginPage(url, env) {
  const next = url.searchParams.get('next') || '/admin';
  const error = ERRORS[url.searchParams.get('error')];
  const ready = !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);
  const dev = env.ADMIN_DEV === 'true';
  const href = dev ? esc(next.startsWith('/admin') ? next : '/admin') : `/api/auth/google?next=${encodeURIComponent(next)}`;
  const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Sign in · Admonk Admin</title><link rel="icon" href="/favicon.png">
<style>
:root{color-scheme:dark;--bg:#0b0b0c;--card:#141416;--line:rgba(255,255,255,.09);--ink:#f2f2f3;--muted:#9b9ba3;--accent:#ff4c24}
*{box-sizing:border-box}html,body{height:100%}body{margin:0;display:grid;place-items:center;background:radial-gradient(1200px 600px at 80% -10%,rgba(110,40,200,.25),transparent 60%),radial-gradient(900px 500px at -10% 110%,rgba(255,76,36,.18),transparent 60%),var(--bg);color:var(--ink);font:15px/1.55 Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
.card{width:min(420px,calc(100vw - 32px));background:color-mix(in srgb,var(--card) 88%,transparent);border:1px solid var(--line);border-radius:24px;padding:40px 36px;backdrop-filter:blur(20px);box-shadow:0 30px 80px rgba(0,0,0,.45)}
.brand{display:flex;align-items:center;gap:12px;margin-bottom:28px}.brand img{width:36px;height:36px}.brand b{font-weight:600;letter-spacing:-.01em}.brand span{color:var(--muted);font-size:13px;display:block}
h1{font-size:26px;letter-spacing:-.03em;font-weight:600;margin:0 0 6px}p{margin:0 0 24px;color:var(--muted)}
.btn{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:13px 16px;border-radius:12px;background:#fff;color:#1f1f1f;text-decoration:none;font-weight:600;transition:transform .15s,box-shadow .15s}
.btn:hover{transform:translateY(-1px);box-shadow:0 10px 30px rgba(255,255,255,.12)}.btn[aria-disabled=true]{opacity:.45;pointer-events:none}
.err{background:rgba(255,76,36,.1);border:1px solid rgba(255,76,36,.35);color:#ffb3a1;border-radius:12px;padding:12px 14px;font-size:14px;margin-bottom:20px}
.foot{margin-top:24px;font-size:12.5px;color:var(--muted);text-align:center}.foot a{color:var(--muted)}
</style></head><body><main class="card">
<div class="brand"><img src="/wf/am/logo-icon.png" alt=""><div><b>Admonk</b><span>Studio admin</span></div></div>
<h1>Welcome back</h1><p>Sign in with the Google account your team invited.</p>
${error ? `<div class="err" role="alert">${esc(error)}</div>` : ''}
<a class="btn" href="${href}" ${!ready && !dev ? 'aria-disabled="true"' : ''}>
<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
${dev ? 'Continue (local development)' : 'Sign in with Google'}</a>
<div class="foot">Only invited team members can sign in. <a href="/">Back to the website</a></div>
</main></body></html>`;
  return new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', 'X-Frame-Options': 'DENY' } });
}

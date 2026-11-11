// The Worker behind admonk.net. Static pages come from dist/ (the ASSETS binding); this file handles
// the enquiry form, the analytics beacon, live design changes, Google sign-in and the admin dashboard.
import { handleEnquiry } from './enquiry.js';
import { handleAuth, currentMember } from './auth.js';
import { handleApi } from './api.js';
import { handleBeacon } from './analytics.js';
import { designCss } from './design.js';
import { loginPage } from './login.js';

const SECURITY = { 'X-Robots-Tag': 'noindex', 'X-Frame-Options': 'SAMEORIGIN', 'Referrer-Policy': 'same-origin', 'Cache-Control': 'no-store' };

async function admin(request, env, url) {
  if (url.pathname === '/admin/login') return loginPage(url, env);
  const member = await currentMember(request, env);
  if (!member) return Response.redirect(`${url.origin}/admin/login?next=${encodeURIComponent(url.pathname + url.search)}`, 302);
  // Static files of the dashboard (app.js, app.css); every other path is a screen of the single-page app.
  const asset = /\.[a-z0-9]+$/i.test(url.pathname) ? url.pathname : '/admin/'; // the folder URL serves index.html (asking for index.html itself redirects)
  const res = await env.ASSETS.fetch(new Request(new URL(asset, url), request));
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(SECURITY)) out.headers.set(k, v);
  return out;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const { pathname } = url;
    try {
      if (pathname === '/api/enquiry' && request.method === 'POST') return await handleEnquiry(request, env, ctx);
      if (pathname === '/api/t' && request.method === 'POST') return await handleBeacon(request, env, ctx).catch((e) => (console.error(e), new Response(null, { status: 204 })));
      if (pathname === '/api/design.css') return await designCss(env, ctx);
      if (pathname.startsWith('/api/auth/')) return await handleAuth(request, env, url);
      if (pathname.startsWith('/api/admin/')) return await handleApi(request, env, url);
      if (pathname === '/admin' || pathname.startsWith('/admin/')) return await admin(request, env, url);
      if (pathname.startsWith('/api/')) return new Response('Not found', { status: 404 });
      return env.ASSETS.fetch(request);
    } catch (err) {
      console.error(err);
      return new Response('Something went wrong', { status: 500 });
    }
  },
};

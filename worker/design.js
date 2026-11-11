// /api/design.css: the design changes saved in the admin editor, loaded by every page after the stylesheet.
import { overridesCss } from '../src/design/tokens.mjs';

let cache = { at: 0, version: null, css: '' };

export async function designCss(env) {
  const headers = { 'Content-Type': 'text/css; charset=utf-8', 'Cache-Control': 'public, max-age=30, stale-while-revalidate=300' };
  try {
    if (Date.now() - cache.at > 10_000) {
      const v = (await env.DB.prepare(`SELECT value FROM settings WHERE key = 'design_version'`).first())?.value || '0';
      if (v !== cache.version) {
        const rows = (await env.DB.prepare('SELECT key, theme, value FROM design_tokens').all()).results;
        const custom = (await env.DB.prepare(`SELECT value FROM settings WHERE key = 'design_custom_css'`).first())?.value || '';
        cache.css = `/* Admonk design changes (admin editor), version ${v} */\n` + overridesCss(rows, custom);
        cache.version = v;
      }
      cache.at = Date.now();
    }
    return new Response(cache.css, { headers });
  } catch (e) {
    // Tables not created yet, or the database is unreachable: the site still works with its built styles.
    console.error('design.css', e);
    return new Response('/* no design changes */', { headers });
  }
}

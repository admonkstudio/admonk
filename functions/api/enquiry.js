// POST /api/enquiry: the contact and start forms post here.
// Checks Turnstile (when TURNSTILE_SECRET is set), drops honeypot spam, and saves the contact and
// enquiry to the CRM database (D1 binding "DB"). Email to info@admonk.net is added with the admin CRM.
const clip = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

export async function onRequestPost({ request, env }) {
  const form = await request.formData();
  if (clip(form.get('website'), 200)) return new Response('ok'); // honeypot filled: a bot

  const name = clip(form.get('name'), 200);
  const email = clip(form.get('email'), 320).toLowerCase();
  const message = clip(form.get('message'), 5000);
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !message) return new Response('Missing fields', { status: 400 });

  if (env.TURNSTILE_SECRET) {
    const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: clip(form.get('cf-turnstile-response'), 4096), remoteip: request.headers.get('CF-Connecting-IP') ?? '' }),
    }).then((r) => r.json());
    if (!check.success) return new Response('Verification failed', { status: 403 });
  }

  if (!env.DB) return new Response('CRM database not connected yet', { status: 503 });
  const phone = clip(form.get('phone'), 50) || null;
  const company = clip(form.get('company'), 200) || null;
  const contact = await env.DB.prepare(
    `INSERT INTO contacts (email, name, phone, company) VALUES (?1, ?2, ?3, ?4)
     ON CONFLICT(email) DO UPDATE SET name = ?2, phone = COALESCE(?3, phone), company = COALESCE(?4, company), updated_at = datetime('now')
     RETURNING id`,
  ).bind(email, name, phone, company).first();
  await env.DB.prepare('INSERT INTO enquiries (contact_id, source, message, page, referrer) VALUES (?1, ?2, ?3, ?4, ?5)')
    .bind(contact.id, clip(form.get('source'), 50) || 'site', message, request.headers.get('Referer'), null)
    .run();
  return new Response('ok');
}

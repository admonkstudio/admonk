// POST /api/enquiry: the contact and start forms post here.
// Checks Turnstile (when TURNSTILE_SECRET is set), drops honeypot spam, saves the contact and the
// enquiry to the CRM database, and emails info@admonk.net.
const clip = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

export async function handleEnquiry(request, env, ctx) {
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

  const phone = clip(form.get('phone'), 50) || null;
  const company = clip(form.get('company'), 200) || null;
  const source = clip(form.get('source'), 50) || 'site';
  const page = clip(form.get('page'), 500) || request.headers.get('Referer');
  const referrer = clip(form.get('referrer'), 500) || null;
  const utm = clip(form.get('utm'), 500) || null;

  const contact = await env.DB.prepare(
    `INSERT INTO contacts (email, name, phone, company) VALUES (?1, ?2, ?3, ?4)
     ON CONFLICT(email) DO UPDATE SET name = ?2, phone = COALESCE(?3, phone), company = COALESCE(?4, company), updated_at = datetime('now')
     RETURNING id`,
  ).bind(email, name, phone, company).first();
  const enquiry = await env.DB.prepare(
    'INSERT INTO enquiries (contact_id, source, message, page, referrer, utm) VALUES (?1, ?2, ?3, ?4, ?5, ?6) RETURNING id',
  ).bind(contact.id, source, message, page, referrer, utm).first();

  // Email after responding, so a mail hiccup never loses the enquiry (it's already saved).
  if (env.NOTIFY) {
    const origin = new URL(request.url).origin;
    ctx.waitUntil(
      env.NOTIFY.send({
        from: { email: env.NOTIFY_FROM, name: 'Admonk website' },
        to: 'info@admonk.net',
        replyTo: { email, name },
        subject: `New enquiry from ${name}${company ? ` (${company})` : ''}`,
        text: [
          `Name: ${name}`, `Email: ${email}`, phone && `Phone: ${phone}`, company && `Company: ${company}`,
          `Form: ${source}`, page && `Page: ${page}`, utm && `Campaign: ${utm}`, '', message, '',
          `Open in the CRM: ${origin}/admin/enquiries/${enquiry.id}`,
        ].filter((l) => l !== null && l !== undefined && l !== false).join('\n'),
      }).catch((err) => console.error('enquiry email failed', err)),
    );
  }
  return new Response('ok');
}

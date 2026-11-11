// First-party, cookie-free page analytics. The site sends one beacon per page view to /api/t.
// Nothing personal is stored: no cookies, no IP. A daily visitor id is a salted hash, so unique visitors
// can be counted per day but not followed across days or traced to a person.

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview|fetch|monitor|python|curl|wget/i;
const enc = new TextEncoder();
const hex = async (s) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)))].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 24);

function device(ua) {
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) return 'tablet';
  if (/Mobi|iPhone|Android/i.test(ua)) return 'phone';
  return 'desktop';
}
function browser(ua) {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/OPR\//.test(ua)) return 'Opera';
  if (/SamsungBrowser/.test(ua)) return 'Samsung';
  if (/Chrome\//.test(ua)) return 'Chrome';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Safari\//.test(ua)) return 'Safari';
  return 'Other';
}

async function salt(env) {
  if (env.ANALYTICS_SALT) return env.ANALYTICS_SALT;
  let row = await env.DB.prepare(`SELECT value FROM settings WHERE key = 'analytics_salt'`).first();
  if (!row) {
    const v = [...crypto.getRandomValues(new Uint8Array(16))].map((b) => b.toString(16).padStart(2, '0')).join('');
    await env.DB.prepare(`INSERT OR IGNORE INTO settings (key, value) VALUES ('analytics_salt', ?)`).bind(v).run();
    row = await env.DB.prepare(`SELECT value FROM settings WHERE key = 'analytics_salt'`).first();
  }
  return row.value;
}

export async function handleBeacon(request, env, ctx) {
  const ok = new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
  const ua = request.headers.get('User-Agent') || '';
  if (BOT.test(ua) || request.headers.get('DNT') === '1') return ok;
  let b;
  try { b = await request.json(); } catch { return ok; }
  const path = String(b.p || '').split('?')[0].slice(0, 300);
  if (!path.startsWith('/') || path.startsWith('/admin') || path.startsWith('/api')) return ok;
  let ref = null;
  try { const r = new URL(String(b.r || '')); if (r.host !== new URL(request.url).host) ref = r.host.replace(/^www\./, ''); } catch {}
  const day = new Date().toISOString().slice(0, 10);
  const ip = request.headers.get('CF-Connecting-IP') || '';
  const visitor = await hex(`${await salt(env)}|${day}|${ip}|${ua}`);
  const work = env.DB.prepare(`INSERT INTO pageviews (day, path, referrer, utm_source, country, device, browser, visitor, theme) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(day, path, ref, b.u ? String(b.u).slice(0, 60) : null, request.cf?.country || null, device(ua), browser(ua), visitor, b.t === 'light' ? 'light' : 'dark').run()
    .then(() => (Math.random() < 0.01 ? env.DB.prepare(`DELETE FROM pageviews WHERE day < date('now', '-400 days')`).run() : null));
  ctx.waitUntil(work.catch((e) => console.error('beacon', e)));
  return ok;
}

/** Everything the analytics screen shows, for the last `days` days and the period before it. */
export async function analytics(env, days) {
  const d = Math.min(Math.max(parseInt(days) || 30, 1), 365);
  const since = `-${d - 1} days`, before = `-${2 * d - 1} days`;
  const q = (sql, ...args) => env.DB.prepare(sql).bind(...args);
  const [totals, prev, daily, pages, refs, countries, devices, browsers, themes, enquiries, enqDaily, live] = await env.DB.batch([
    q(`SELECT count(*) AS views, (SELECT count(*) FROM (SELECT DISTINCT day, visitor FROM pageviews WHERE day >= date('now', ?))) AS visitors FROM pageviews WHERE day >= date('now', ?)`, since, since),
    q(`SELECT count(*) AS views, (SELECT count(*) FROM (SELECT DISTINCT day, visitor FROM pageviews WHERE day >= date('now', ?) AND day < date('now', ?))) AS visitors FROM pageviews WHERE day >= date('now', ?) AND day < date('now', ?)`, before, since, before, since),
    q(`SELECT day, count(*) AS views, count(DISTINCT visitor) AS visitors FROM pageviews WHERE day >= date('now', ?) GROUP BY day ORDER BY day`, since),
    q(`SELECT path, count(*) AS views, count(DISTINCT day || visitor) AS visitors FROM pageviews WHERE day >= date('now', ?) GROUP BY path ORDER BY views DESC LIMIT 20`, since),
    q(`SELECT coalesce(utm_source, referrer, 'Direct') AS source, count(DISTINCT day || visitor) AS visitors FROM pageviews WHERE day >= date('now', ?) GROUP BY source ORDER BY visitors DESC LIMIT 12`, since),
    q(`SELECT coalesce(country, '??') AS country, count(DISTINCT day || visitor) AS visitors FROM pageviews WHERE day >= date('now', ?) GROUP BY country ORDER BY visitors DESC LIMIT 12`, since),
    q(`SELECT device, count(DISTINCT day || visitor) AS visitors FROM pageviews WHERE day >= date('now', ?) GROUP BY device ORDER BY visitors DESC`, since),
    q(`SELECT browser, count(DISTINCT day || visitor) AS visitors FROM pageviews WHERE day >= date('now', ?) GROUP BY browser ORDER BY visitors DESC`, since),
    q(`SELECT theme, count(*) AS views FROM pageviews WHERE day >= date('now', ?) GROUP BY theme`, since),
    q(`SELECT count(*) AS n FROM enquiries WHERE date(created_at) >= date('now', ?)`, since),
    q(`SELECT date(created_at) AS day, count(*) AS n FROM enquiries WHERE date(created_at) >= date('now', ?) GROUP BY day`, since),
    q(`SELECT count(DISTINCT visitor) AS n FROM pageviews WHERE ts >= datetime('now', '-5 minutes')`),
  ]);
  const t = totals.results[0], p = prev.results[0];
  return {
    days: d,
    totals: { views: t.views, visitors: t.visitors, enquiries: enquiries.results[0].n, live: live.results[0].n },
    previous: { views: p.views, visitors: p.visitors },
    daily: daily.results,
    enquiriesDaily: enqDaily.results,
    pages: pages.results, sources: refs.results, countries: countries.results, devices: devices.results, browsers: browsers.results, themes: themes.results,
  };
}

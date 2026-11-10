# Admonk website

The Admonk Studio site: an Astro static site on Cloudflare Pages, with content in git.
The Webflow site (admonkstudio.webflow.io) is the visual reference and the source of the first content import.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # checks content references, builds to dist/, indexes search with Pagefind
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/<collection>/<slug>.json` | Frameworks, solutions, services, tools, portfolio, testimonials, locations, industries. One file per item; the file name is the URL slug. Schemas in `src/content.config.ts`. |
| `src/content/blog/<slug>.md` | Blog posts (Markdown with frontmatter). |
| `src/pages/` | Routes. URLs match the Webflow site: `/framework/x`, `/solutions/x`, `/services/x`, `/tools-platforms/x`, `/portfolio/x`, `/blog/x`. |
| `src/components/OfferPage.astro` | The shared page layout for frameworks, solutions, services and tools. |
| `worker/` | The Cloudflare Worker: `/api/enquiry` (Turnstile check, saves to the CRM, emails info@admonk.net) and the `/admin` CRM (enquiries, contacts, overview). |
| `wrangler.jsonc` | Worker config: static assets from `dist/`, the D1 database, the email binding. |
| `migrations/` | CRM database schema (Cloudflare D1). |
| `scripts/import-webflow.mjs` | One-off import from the Webflow CMS backup in `import/`. Re-running overwrites `src/content/`. |
| `_archive/` | The repository's earlier contents (Studio method docs), pending review and deletion. |

## Deploy

Cloudflare Workers, connected to this repo (Workers Builds): build command `npm run build`,
deploy command `npm run deploy` (applies database migrations, then deploys). Every push to `main` goes live.

Set `PUBLIC_INDEXABLE=true` as a build variable only on the production domain; every other build is `noindex`.
Secrets (Worker settings): `TURNSTILE_SECRET`. Build variable: `PUBLIC_TURNSTILE_SITE_KEY`.

### Admin CRM

`/admin` sits behind Cloudflare Access (Zero Trust → Access → Applications, path `/admin*`, allow your team's emails).
Put the Access team domain and the application's audience tag in `wrangler.jsonc` (`ACCESS_TEAM_DOMAIN`, `ACCESS_AUD`);
the Worker checks the Access token on every admin request and refuses everything else.

Local: `npm run dev:worker` with `ADMIN_DEV=true` in `.dev.vars` (skips Access) and
`npx wrangler d1 migrations apply admonk-crm --local` once.

## Still to do

- Download Webflow CDN images into the repo and serve them as AVIF/WebP (images load from Webflow's CDN for now).
- Map the portfolio `yearsOption` / `styleOption` Webflow option ids to labels.
- Content editor in the admin (Keystatic).

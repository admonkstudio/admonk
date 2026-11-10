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
| `functions/api/enquiry.js` | Form endpoint (Cloudflare Pages Function): Turnstile check, saves to the CRM database. |
| `migrations/` | CRM database schema (Cloudflare D1). |
| `scripts/import-webflow.mjs` | One-off import from the Webflow CMS backup in `import/`. Re-running overwrites `src/content/`. |
| `_archive/` | The repository's earlier contents (Studio method docs), pending review and deletion. |

## Deploy

Cloudflare Pages project connected to this repo: framework preset Astro, build command `npm run build`,
output `dist`. Set `PUBLIC_INDEXABLE=true` only on the production domain; every other build is `noindex`.

Environment: `PUBLIC_SITE_ORIGIN` (canonical origin, default `https://admonk.net`), `PUBLIC_TURNSTILE_SITE_KEY`,
`TURNSTILE_SECRET`, and a D1 binding named `DB`.

## Still to do

- Download Webflow CDN images into the repo and serve them as AVIF/WebP (images load from Webflow's CDN for now).
- Map the portfolio `yearsOption` / `styleOption` Webflow option ids to labels.
- Admin panel: content editor and CRM (enquiries, contacts, analytics), email to info@admonk.net.

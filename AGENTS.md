# Working in this repo

- Content is JSON in `src/content/`; keep every SEO title under 60 characters and meta description at 150–160.
- `npm run build` must pass before pushing (it checks content references and types the content).
- Don't edit files under `_archive/`; it is the old Studio docs, pending review.

## Design (Webflow port)

- The site's look is the published Webflow design. `webflow-snapshot/` is a mirror of it, refreshed by the manual "Webflow snapshot" workflow.
- `scripts/webflow-port.mjs` runs after `astro build` and writes the final pages into `dist/`: pages that exist in Webflow come from the snapshot (with fixes and local assets), and tool pages, the tools index, the blog and the 404 are built from the Webflow service template and filled from `src/content`.
- So for those Webflow pages, the Astro pages in `src/pages/` are overwritten; change Webflow-page copy in Webflow (then re-snapshot) until each template is moved to data-driven rendering.
- Design values live in `src/design/tokens.mjs` (tokens with dark and light values, plus optional per-element settings); the build prepends them to `src/design/admonk.css` as `--am-*` variables. Changes made in the admin's design editor are stored in D1 and served at `/api/design.css`, which every page loads after the stylesheet.
- Design changes on top of Webflow go in `src/design/admonk.css` (frame grid, components; colours only through tokens) and, when markup has to change, `scripts/webflow-adjust.mjs`. Use the `--am-*` tokens instead of hard-coded colours so both themes stay right. The theme toggle is ours (stored in localStorage `am-theme`); Webflow's click interaction for it is removed.

## Admin dashboard (`/admin`)

- Single-page app in `public/admin/` (no build step; `screens/*.js` are ES modules). The Worker (`worker/`) serves it and its JSON API at `/api/admin/*` (`worker/api.js`).
- Sign-in is Google OAuth (`worker/auth.js`); members and roles (viewer < editor < admin < owner) are in D1. `OWNER_EMAILS` in `wrangler.jsonc` become owners on first sign-in. `GOOGLE_CLIENT_ID` is a plain var in `wrangler.jsonc`; secrets (dashboard, Production and Previews): `GOOGLE_CLIENT_SECRET`, `GITHUB_TOKEN`.
- Content and page-text edits are commits to `CONTENT_BRANCH` through the GitHub Contents API (`worker/github.js`); the push redeploys the site. Page text is `src/content/pages/<slug>.json` find/replace pairs applied by `scripts/webflow-adjust.mjs`.
- Analytics are first-party: the beacon posts to `/api/t` (no cookies, no IPs stored).
- New tables go in a new file under `migrations/`; `npm run deploy` applies them. Local testing: `.dev.vars` with `ADMIN_DEV=true` skips sign-in, then `wrangler d1 migrations apply admonk-crm --local` and `wrangler dev`.

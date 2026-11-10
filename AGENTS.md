# Working in this repo

- Content is JSON in `src/content/`; keep every SEO title under 60 characters and meta description at 150–160.
- `npm run build` must pass before pushing (it checks content references and types the content).
- Don't edit files under `_archive/`; it is the old Studio docs, pending review.

## Design (Webflow port)

- The site's look is the published Webflow design. `webflow-snapshot/` is a mirror of it, refreshed by the manual "Webflow snapshot" workflow.
- `scripts/webflow-port.mjs` runs after `astro build` and writes the final pages into `dist/`: pages that exist in Webflow come from the snapshot (with fixes and local assets), and tool pages, the tools index, the blog and the 404 are built from the Webflow service template and filled from `src/content`.
- So for those Webflow pages, the Astro pages in `src/pages/` are overwritten; change Webflow-page copy in Webflow (then re-snapshot) until each template is moved to data-driven rendering.
- Design changes on top of Webflow go in `src/design/admonk.css` (the design system: colour tokens for dark and `html[data-theme="light"]`, the frame grid, components) and, when markup has to change, `scripts/webflow-adjust.mjs`. Use the `--am-*` tokens instead of hard-coded colours so both themes stay right. The theme toggle is ours (stored in localStorage `am-theme`); Webflow's click interaction for it is removed.

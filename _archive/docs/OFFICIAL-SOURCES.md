# Official Source Registry

This file records the primary sources that future-ready Admonk skills should verify against before implementing version-sensitive behavior.

The purpose is not to freeze documentation into the repository. It is to tell agents **where to verify current truth**.

---

## OpenAI / Codex

Use official OpenAI documentation for current Codex, models, API, MCP, plugins, image generation and agent behavior.

Relevant upstream reference:

- `openai/skills` → system `imagegen` skill for operational image generation/editing guidance.

Admonk's own image decision/art-direction rules remain in:

- `admonk-image-direction`
- `admonk-image-production`

Do not copy undocumented internal behavior into permanent project guidance.

---

## Supabase

Official source project:

- `supabase/agent-skills`

Key skills:

- `supabase`
- `supabase-postgres-best-practices`

The repository is MIT licensed (Copyright © 2026 Supabase).

Use current Supabase docs/changelog/MCP for version-sensitive implementation details, especially Auth, RLS, Data API, CLI, migrations, Storage, Edge Functions and Realtime.

Admonk wrapper:

- `admonk-supabase`

---

## Astro

Use current official Astro documentation for building normal Astro client sites.

The `withastro/astro` repository also contains agent skills such as `astro-developer` and `astro-code-review`, but several are primarily intended for contributors working on Astro's own monorepo. Do not treat monorepo-internal instructions as universal client-site guidance.

Admonk wrapper:

- `admonk-astro`

---

## Figma

Prefer the official Figma integration/MCP and its own skill guidance for tool invocation and design-to-code behavior.

Current useful capability areas include:

- reading design context
- writing/editing Figma designs
- Code Connect
- component metadata
- motion context

Admonk wrapper:

- `admonk-figma`

Figma tool behavior does not override client brand or Admonk creative direction.

---

## Webflow

Prefer official Webflow tooling and current product/API documentation for Designer, CMS, assets, variables, scripts, analytics, publishing and agent instructions.

Admonk wrapper:

- `admonk-webflow`

Platform support/limitations should be rechecked when a project depends on them.

---

## GSAP

Official source project:

- `greensock/gsap-skills`

Imported/adapted skills are documented in `THIRD-PARTY-SKILLS.md`.

Admonk motion philosophy remains authoritative about **what should move and why**.

---

## Motion for React

Verify current Motion documentation before implementation. Do not assume old `framer-motion` package/import examples remain current.

Admonk wrapper:

- `admonk-react-motion`

---

## Playwright

Official projects:

- `microsoft/playwright-cli`
- `microsoft/playwright-mcp`

For coding-agent browser QA, Admonk currently prefers Playwright CLI + skill because the official project describes it as the more token-efficient coding-agent workflow. MCP remains an option for workflows needing persistent rich browser state.

Admonk QA owner:

- `admonk-browser-qa`

---

## SEO

Primary search guidance should come from Google Search Central and other search-engine primary documentation when relevant.

Key areas to verify:

- crawling/indexing
- canonicalization
- sitemaps
- robots directives
- structured data
- redirects/migrations
- localization/hreflang

Admonk wrapper:

- `admonk-seo`

Avoid SEO folklore and stale ranking-factor checklists.

---

## Performance / Core Web Vitals

Primary references:

- web.dev / Chrome performance documentation
- browser developer tooling

At skill creation time the stable Core Web Vitals are LCP, INP and CLS; always verify the current metric definitions and thresholds before a formal audit.

Admonk wrapper:

- `admonk-performance`

Use field data when available; lab scores are not a substitute for real-user performance.

---

## Three.js / WebGL

Primary references:

- Three.js official manual
- Three.js official API documentation

Three.js evolves quickly. Verify current renderer, responsive sizing, animation-loop, resource cleanup, WebGL/WebGPU and loader behavior before implementation.

Admonk wrapper:

- `admonk-3d-web`

---

## Rive

Primary references:

- Rive Editor documentation
- Rive runtime documentation

Verify current state-machine, data-binding, layout, resize and runtime APIs before production implementation.

Admonk wrapper:

- `admonk-rive`

---

## Security

For security-sensitive work prefer:

- current vendor security docs
- OWASP primary guidance
- package/advisory databases
- official/current scanning tools

Admonk wrapper:

- `admonk-security-review`

Do not run tests against infrastructure without authorization.

---

# Governing Rule

> **Skills preserve method. Official sources preserve current truth.**

When the two conflict because a platform has changed, update the skill rather than forcing the current platform to match old guidance.

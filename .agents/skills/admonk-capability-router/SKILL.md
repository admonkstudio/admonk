---
name: admonk-capability-router
description: Route broad or ambiguous Admonk/client project tasks to the smallest relevant set of studio, platform, engineering, motion, image, QA, and external capabilities. Use when a task spans multiple disciplines, when deciding which skill/tool/platform should own work, or when a future project introduces an unfamiliar capability.
---

# Admonk Capability Router

Admonk maintains a broad capability library because future projects are unpredictable.

Broad capability must not become broad context loading.

Core rule:

> **Load the minimum expertise required to solve the actual problem.**

---

# 1. Start With the Task, Not the Tool

Identify the primary job:

- Business/positioning
- Content/copy
- Web design
- UX/accessibility
- Image/art direction
- Image production
- Motion concept
- Motion production
- Figma
- Webflow
- Astro
- React/Next
- Browser QA
- CMS/data/integration
- SEO/performance
- Security
- Analytics
- Automation/AI
- 3D/interactive media

Do not activate a capability merely because it exists.

---

# 2. Core Routing

## Design

Use:

- `admonk-web-design`
- `admonk-design-quality`
- `admonk-ux-systems` when behavior/usability matters

## Images

Use:

- `admonk-image-direction` → what visual should exist
- `admonk-image-production` → generate/edit/prepare/integrate it

## Motion

Use:

- `admonk-motion` → what should move and why
- `admonk-motion-production` → medium/implementation workflow
- GSAP skills → GSAP implementation
- `admonk-react-motion` → React Motion implementation

## Platform

Use only the active project platform skill:

- `admonk-figma`
- `admonk-webflow`
- `admonk-astro`
- `admonk-react-engineering` where React/Next applies

## QA

Use:

- `admonk-browser-qa`
- `playwright-cli`
- `admonk-design-quality`
- `admonk-ux-systems`

---

# 3. Client Context

For client work, client context outranks studio aesthetic preferences.

Load only relevant client files as defined in `docs/AGENT-ARCHITECTURE.md` and the client repository's `AGENTS.md`.

Do not use Admonk company positioning/copy as client content.

---

# 4. Future Capability Rule

If a project requires a capability not yet represented by a mature local skill:

1. Identify the capability precisely.
2. Check current official documentation or an authoritative upstream skill first.
3. Prefer a maintained official integration over a random third-party wrapper.
4. Inspect license/security/maintenance before importing third-party code.
5. Add/adapt a reusable skill only if the knowledge is likely to recur.
6. Keep client-specific procedures in the client project instead.
7. Record the capability in `docs/CAPABILITY-REGISTRY.md`.

Do not guess version-sensitive implementation details from memory.

---

# 5. Tool vs Skill

Use this distinction:

```text
Skill
→ how to think/work

MCP/plugin/CLI
→ capability/access

Project context
→ what this specific client needs
```

A tool being installed does not make it authoritative.

---

# 6. Platform Selection

When platform is not predetermined, compare based on project requirements.

Consider:

- Client editing needs
- CMS needs
- Custom interaction
- Performance
- Integration complexity
- Delivery speed
- Team skills
- Hosting/deployment
- Long-term maintenance
- Budget

Do not default to Webflow, Astro, React, or any other technology because Admonk has a skill for it.

---

# 7. Multi-Capability Example

A request such as:

> Build a premium Webflow hero with generated photography and scroll-linked SVG motion.

Routes to:

```text
client brand/brief
→ admonk-web-design
→ admonk-image-direction
→ admonk-image-production
→ admonk-motion
→ admonk-motion-production
→ admonk-webflow
→ gsap-scrolltrigger / gsap-plugins as needed
→ admonk-browser-qa
```

Do not load unrelated React/Astro skills.

---

# Final Rule

> **More capability should make the system more precise, not more complicated.**

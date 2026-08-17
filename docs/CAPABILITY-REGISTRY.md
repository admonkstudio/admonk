# Admonk Capability Registry

This registry tracks reusable capabilities that can support Admonk and future client projects.

A capability can be:

- **Active** — implemented and ready to use.
- **Connected** — tool/plugin/MCP available but may require local authentication.
- **Reference** — useful upstream knowledge, not imported as a governing skill.
- **Planned** — likely future need; add when implementation quality can be grounded in current authoritative sources.
- **Watch** — promising, but not yet justified as a standard dependency.

The goal is future readiness without making every task load every capability.

---

# 1. Studio / Creative System

| Capability | Status | Primary owner |
|---|---|---|
| Web design / art direction | Active | `admonk-web-design` |
| Design-quality audit | Active | `admonk-design-quality` |
| UX systems / accessibility | Active | `admonk-ux-systems` |
| Image art direction | Active | `admonk-image-direction` |
| Image production / AI imagery | Active | `admonk-image-production` |
| Motion principles | Active | `admonk-motion` |
| Motion production routing | Active | `admonk-motion-production` |
| Brand voice | Active | `docs/BRAND-VOICE.md` |
| Client context architecture | Active | `docs/AGENT-ARCHITECTURE.md` + client template |
| Capability routing | Active | `admonk-capability-router` |

---

# 2. Platform Execution

| Capability | Status | Notes |
|---|---|---|
| Figma | Active / Connected | `admonk-figma`; official Figma integration supports design context, canvas writes, Code Connect, and motion context when available. |
| Webflow | Active / Connected | `admonk-webflow`; official Webflow tooling can manage site/design/data/custom-code workflows. |
| Astro | Active | `admonk-astro`; use official Astro docs for version-sensitive behavior. |
| React / Next.js | Active | `admonk-react-engineering` |
| React Motion | Active | `admonk-react-motion` |
| Static HTML/CSS/JS | Active by core skills | No dedicated framework required. |

---

# 3. Motion / Interaction

| Capability | Status | Notes |
|---|---|---|
| GSAP core | Active | Official/adapted GSAP skills |
| GSAP timelines | Active | Official/adapted GSAP skills |
| ScrollTrigger | Active | Official/adapted GSAP skills |
| GSAP plugins | Active | Official/adapted GSAP skills |
| GSAP performance | Active | Official/adapted GSAP skills |
| React + GSAP | Active | Official/adapted GSAP skills |
| CSS motion | Active by production routing | Prefer for simple interaction. |
| Figma motion prototype | Active / Connected | Use for design intent and handoff. |
| Rive | Planned | High-value future option for interactive vector/state-machine animation. |
| Lottie | Planned | Useful for pre-authored portable vector motion; evaluate per project. |
| SVG motion | Active via GSAP/code | Add more specialized guidance if recurring projects justify it. |
| Three.js / WebGL | Planned | Important for spatial/3D web experiences. |
| React Three Fiber | Planned | Add when React-based 3D projects appear. |
| WebGPU | Watch | Evaluate when production/browser/client requirements justify it. |

---

# 4. Images / Visual Assets

| Capability | Status | Notes |
|---|---|---|
| Built-in AI raster generation/editing | Active through Codex/ChatGPT environment | Coordinated by `admonk-image-production`. |
| Website hero/editorial imagery | Active | Image direction + production. |
| Product/device mockups | Active | Prefer real UI/logo compositing when accuracy matters. |
| Transparent cutouts / compositing | Active | Use production invariants. |
| Responsive image art direction | Active | Desktop/mobile crops or separate assets when necessary. |
| 3D rendered product imagery | Planned | Can use image generation or dedicated 3D pipeline depending on requirement. |
| Deterministic vector illustration | Planned | Prefer SVG/design tools over raster AI for precise systems. |
| Video generation / cinematic assets | Watch / project-dependent | Add dedicated workflow when a project requires it. |

---

# 5. Component / UI Discovery

| Capability | Status | Notes |
|---|---|---|
| shadcn MCP | Connected | Reliable primitive discovery/implementation foundation. |
| 21st MCP | Connected | Exploration/inspiration/generation accelerator; not design authority. |
| UI UX Pro Max guidance | Active, adapted | `admonk-ux-systems` |
| Taste guidance | Active, adapted | `admonk-design-quality` |

---

# 6. Browser / QA

| Capability | Status | Notes |
|---|---|---|
| Browser QA workflow | Active | `admonk-browser-qa` |
| Playwright CLI | Active | Official Playwright CLI skill integrated. |
| Responsive testing | Active | Browser QA + platform skill. |
| Console/network inspection | Active | Playwright/browser tooling. |
| Visual regression | Planned | Add a dedicated baseline/diff workflow when recurring use justifies it. |
| Cross-browser matrix | Planned | Add when production clients require formal browser coverage. |
| Lighthouse/Core Web Vitals automation | Planned | Useful for production audits and performance baselines. |

---

# 7. SEO / Discoverability

These are highly likely future needs and should be treated as part of website delivery even when not sold as a separate product.

| Capability | Status | Notes |
|---|---|---|
| Technical SEO review | Planned | Metadata, canonical, robots, sitemap, redirects, crawlability, schema. |
| On-page SEO/content structure | Planned | Should preserve brand voice and user intent. |
| Structured data/schema | Planned | Implement per real content/entity requirements. |
| Migration/redirect audit | Planned | Important for redesigns/replatforming. |
| Programmatic SEO | Watch | Use only when business/content model supports genuine value. |
| Search Console integration/analysis | Planned | Useful for post-launch iteration. |

Do not create a generic SEO skill from stale rules. Build it from current Google/search-engine primary documentation when activated.

---

# 8. Performance

| Capability | Status | Notes |
|---|---|---|
| React performance | Active | `admonk-react-engineering` |
| GSAP performance | Active | `gsap-performance` |
| Image optimization | Active / platform-specific | Image production + Webflow/Astro. |
| Core Web Vitals audit | Planned | Should include real measurements. |
| Bundle/network analysis | Active where tooling permits | React/browser QA. |
| Font-loading optimization | Planned | Important for premium typography-heavy sites. |
| Third-party script audit | Planned | Analytics/ads/chat widgets frequently cause performance debt. |

---

# 9. Security / Privacy

OpenAI maintains current Codex Security workflows for repository/diff scanning and threat modeling. Prefer official/current security tooling rather than an improvised checklist for high-stakes audits.

| Capability | Status | Notes |
|---|---|---|
| Basic frontend security hygiene | Active through engineering review | Secrets, unsafe input, external scripts, auth boundaries. |
| Repository security scan | Planned integration | Prefer current Codex Security/plugin workflow when available. |
| Diff/PR security scan | Planned integration | Useful before deployment of sensitive changes. |
| Threat modeling | Planned integration | Trigger for systems with auth, sensitive data, payments, APIs, etc. |
| Dependency vulnerability review | Planned | Use current package/advisory data. |
| Privacy/consent review | Planned | Especially forms, analytics, tracking, cookies, health/financial data. |

Security scans must only target systems the client/Admonk is authorized to assess.

---

# 10. CMS / Data / Backend

| Capability | Status | Notes |
|---|---|---|
| Webflow CMS | Active / connected | `admonk-webflow` |
| Headless CMS | Planned | Evaluate Sanity, Contentful, Storyblok, Strapi, etc. per project. |
| Supabase | Planned high priority | Auth, Postgres, storage, realtime; common in Admonk prototypes/products. |
| PostgreSQL/data modeling | Planned | Add reusable modeling/migration guidance. |
| REST APIs | Active general capability | Add provider-specific skills as projects require. |
| GraphQL | Planned | Use only when platform/project benefits. |
| Search | Planned | Algolia/Meilisearch/DB search depending on scale. |
| File/storage pipelines | Planned | Needed for media-heavy apps/CMS. |

---

# 11. Automation / Integrations / AI

| Capability | Status | Notes |
|---|---|---|
| Webhooks | Active where platform supports | Webflow and custom integrations. |
| CRM integration | Planned reusable workflow | Zoho, HubSpot, Salesforce, etc. |
| n8n / workflow automation | Planned | Strong fit for client automation extensions. |
| Email automation | Planned | Provider-specific when project needs it. |
| WhatsApp automation | Planned | Requires provider/compliance-specific implementation. |
| AI chat/agents | Planned | Use current provider APIs and evaluation/security practices. |
| OpenAI API | Planned official-docs integration | Use current OpenAI docs/skills, not static model assumptions. |
| Agent evaluations | Planned | Important for client AI systems before launch. |

---

# 12. Analytics / Optimization

| Capability | Status | Notes |
|---|---|---|
| Webflow Analyze | Connected where enabled | `admonk-webflow` |
| Google Analytics | Planned | Event/measurement planning + validation. |
| Tag Manager | Planned | Use carefully; avoid uncontrolled script debt. |
| Search Console | Planned | SEO iteration. |
| PostHog / product analytics | Planned | Useful for apps/product experiences. |
| Conversion measurement | Planned | Define events around real business actions. |
| A/B experimentation | Watch | Add only when traffic/decision quality supports it. |

---

# 13. Localization / Internationalization

| Capability | Status | Notes |
|---|---|---|
| RTL design | Active principle | Needs stronger project-specific implementation guidance when used. |
| Multi-language content | Planned | Platform-specific localization. |
| Locale-aware SEO | Planned | hreflang, localized metadata/URLs where applicable. |
| Translation workflow | Planned | Preserve approved terminology and brand voice. |

---

# 14. Commerce / Transactions

| Capability | Status | Notes |
|---|---|---|
| Ecommerce UX | Planned | Product/category/cart/checkout patterns. |
| Stripe/payments | Planned / plugin available when required | High-stakes; use official current integration guidance. |
| Webflow Ecommerce | Planned | Evaluate per client needs/limitations. |
| Headless commerce | Watch | Shopify/Medusa/etc. for future commerce projects. |

---

# 15. Deployment / Operations

| Capability | Status | Notes |
|---|---|---|
| Webflow publishing | Connected | `admonk-webflow` |
| Static/Node deployment | Planned workflow | Vercel/Cloudflare/Netlify/etc. based on stack. |
| CI/CD | Planned | GitHub Actions and platform deployment. |
| Preview environments | Planned | Important for client approval/QA. |
| Error monitoring | Planned | Sentry/etc. for application-style projects. |
| Uptime/status monitoring | Planned | For critical client sites/apps. |

---

# 16. Future Skill Intake Rules

When adding future skills:

1. Prefer official/maintained sources.
2. Check whether the skill is for **using a technology** or **contributing to that technology's own repository**.
3. Avoid importing huge catalogs when a focused adapted skill is enough.
4. Preserve source/license attribution where required.
5. Do not let an external skill override Admonk/client design authority.
6. Make trigger descriptions narrow enough that irrelevant skills do not load.
7. Record Keep / Modify / Skip / Reference decisions when adapting opinionated external skills.
8. Recheck version-sensitive guidance periodically.

---

# 17. Immediate Next Additions

After the Figma/Webflow/Astro benchmark, the highest-value capability additions are expected to be:

1. Production SEO / migration audit skill.
2. Production performance/Core Web Vitals skill.
3. Security review/threat-model integration.
4. Supabase/data/backend integration skill.
5. 3D/WebGL/Three.js skill.
6. Rive interactive-motion skill.
7. Analytics/conversion measurement skill.
8. Localization/RTL production skill.
9. Deployment/CI skill.

This list can change based on the next real client project.

---

# Final Principle

> **Be ready for the next project without letting tomorrow's tools distract today's work.**

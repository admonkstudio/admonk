# Admonk Capability Registry

This registry tracks reusable capabilities for Admonk and future client projects.

Status:

- **Active** — reusable guidance exists and is ready when triggered.
- **Connected** — external capability is available but may need project/user authentication.
- **Reference** — useful authoritative knowledge; load when needed.
- **Watch** — promising future capability, not yet worth standardizing.

> **Future-ready does not mean always-loaded.** Skills should activate only when the project enters their discipline.

---

## 1. Creative / Experience

| Capability | Status | Owner |
|---|---|---|
| Web design / art direction | Active | `admonk-web-design` |
| Design-quality audit | Active | `admonk-design-quality` |
| UX / accessibility systems | Active | `admonk-ux-systems` |
| Image art direction | Active | `admonk-image-direction` |
| AI image production | Active | `admonk-image-production` |
| Motion direction | Active | `admonk-motion` |
| Motion technology / production routing | Active | `admonk-motion-production` |
| Capability selection | Active | `admonk-capability-router` |
| Brand voice | Active | `docs/BRAND-VOICE.md` |

---

## 2. Design / Build Platforms

| Capability | Status | Owner / Source |
|---|---|---|
| Figma | Active / Connected | `admonk-figma`; official Figma integration |
| Webflow | Active / Connected | `admonk-webflow`; official Webflow integration |
| Astro | Active | `admonk-astro`; current Astro docs |
| Static HTML/CSS/JS | Active | core implementation skills |
| React / Next.js | Active | `admonk-react-engineering` |
| React Motion | Active | `admonk-react-motion` |
| shadcn | Connected | official MCP |
| 21st | Connected | MCP exploration accelerator |

---

## 3. Motion / Rich Media

| Capability | Status | Owner |
|---|---|---|
| CSS interaction | Active | `admonk-motion-production` |
| GSAP | Active | GSAP skill set |
| ScrollTrigger | Active | `gsap-scrolltrigger` |
| SVG animation | Active | GSAP/code + motion skills |
| Rive state-machine animation | Active / ready when needed | `admonk-rive` |
| Three.js / WebGL / spatial experiences | Active / ready when needed | `admonk-3d-web` |
| React Three Fiber | Reference | use when React project justifies it |
| Lottie | Reference | use for appropriate pre-authored vector motion |
| WebGPU | Watch | evaluate against current browser/project needs |
| Generated/video cinematic assets | Watch / project-specific | create dedicated workflow when required |

---

## 4. Production Quality

| Capability | Status | Owner |
|---|---|---|
| Browser QA | Active | `admonk-browser-qa` |
| Playwright CLI | Active | official Playwright CLI skill |
| Technical SEO / migration | Active / ready when needed | `admonk-seo` |
| Core Web Vitals / web performance | Active / ready when needed | `admonk-performance` |
| Security review / threat model | Active / ready when needed | `admonk-security-review` |
| Analytics / conversion measurement | Active / ready when needed | `admonk-analytics` |
| Localization / RTL | Active / ready when needed | `admonk-localization` |
| Deployment / release | Active / ready when needed | `admonk-deployment` |
| Visual regression baselines | Reference | add formal automation when a project needs it |
| Formal cross-browser matrix | Reference | activate for contractual/production requirements |

---

## 5. Backend / Data / CMS

| Capability | Status | Owner / Notes |
|---|---|---|
| Webflow CMS | Active / Connected | Webflow tools + `admonk-webflow` |
| Supabase | Active / Connected when project authorizes it | `admonk-supabase`; official Supabase skill/MCP |
| PostgreSQL | Active through Supabase guidance when relevant | official Postgres/Supabase best-practice sources |
| REST APIs | Active general capability | provider-specific docs when used |
| GraphQL | Reference | use when architecture benefits |
| Headless CMS | Reference | evaluate Sanity/Contentful/Storyblok/Strapi/etc. per project |
| Search infrastructure | Reference | Algolia/Meilisearch/database search according to need |
| File/storage pipelines | Reference | platform-specific |

---

## 6. Automation / AI / Integrations

| Capability | Status | Notes |
|---|---|---|
| Webhooks | Active | platform/API specific |
| CRM integration | Ready when needed | use vendor-specific current docs |
| n8n / workflow automation | Ready when needed | do not force into simple projects |
| Email automation | Ready when needed | provider-specific |
| WhatsApp automation | Ready when needed | provider/compliance-specific |
| AI chat / agents | Ready when needed | use current model/provider/evaluation guidance |
| OpenAI API | Ready when needed | always consult current official OpenAI docs |
| Agent evaluations | Ready when needed | required for serious client AI systems |

---

## 7. Commerce / Transactions

| Capability | Status | Notes |
|---|---|---|
| Ecommerce UX | Ready when needed | product/category/cart/checkout journey |
| Stripe / payments | Connected capability available when required | high-stakes; use official current integration guidance |
| Webflow Ecommerce | Reference | evaluate limitations against project |
| Shopify / headless commerce | Reference | evaluate for future commerce projects |

---

## 8. Operations

| Capability | Status | Notes |
|---|---|---|
| Webflow publishing | Connected | Webflow integration |
| Static/server deployment | Active / ready when needed | `admonk-deployment` |
| Preview/staging environments | Active principle | `admonk-deployment` |
| CI/CD | Active principle | add project-specific workflow when justified |
| Error monitoring | Ready when needed | Sentry/provider-specific |
| Uptime monitoring | Ready when needed | critical sites/apps |
| GitHub Actions analysis | Connected through GitHub; specialist skills can be added if recurring |

---

## 9. Client Portability

The reusable system is governed by:

- `docs/AGENT-ARCHITECTURE.md`
- `templates/client-project/`

Client context must remain inside the client project.

Reusable studio knowledge may be promoted back into Admonk only when it is generalizable and contains no confidential client information.

---

## 10. Evaluation Lab

Controlled platform benchmark:

- `labs/platform-benchmark/BENCHMARK.md`
- `labs/platform-benchmark/SCORECARD.md`

Initial environments:

1. Figma
2. Webflow
3. Astro

The benchmark should later expand when a real question justifies another environment—not simply to collect platforms.

---

## 11. Skill Intake Rules

Before adding an external skill or permanent capability:

1. Prefer official maintained sources.
2. Confirm the skill teaches **using** the technology rather than contributing to the vendor's own monorepo.
3. Check overlap with existing Admonk skills.
4. Check licensing and maintenance.
5. Keep external technical expertise subordinate to client/project and Admonk creative authority.
6. Use narrow trigger descriptions so irrelevant skills stay unloaded.
7. Verify version-sensitive facts from current primary documentation.
8. Add a wrapper/adaptation instead of importing a large catalog when that gives better control.

---

# Final Principle

> **Be ready for the next project without letting tomorrow's tools distract today's work.**

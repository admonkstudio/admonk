# AGENTS.md

This file defines the core operating rules for any AI agent, coding agent, or collaborator working with Admonk.

Keep this file concise. Load detailed `/docs` and `.agents/skills` guidance only when relevant.

---

# 1. About Admonk

**Admonk is a Web Experience Studio focused on designing and building distinctive websites.**

Primary customers:

> **Premium brands and ambitious businesses that see their website as an important part of their identity, customer experience, and growth — not just an online brochure.**

Primary product:

> **The Web Experience**

The website is the center. Branding, content, SEO, analytics, CRM, CMS, automation, AI, integrations, and related capabilities support the Web Experience but should not dilute the core positioning.

For Admonk business context read:

`docs/ADMONK-BUSINESS.md`

---

# 2. Studio vs Client Context

Admonk's reusable methods should travel across projects. Admonk's own business identity should not.

For the architecture read:

`docs/AGENT-ARCHITECTURE.md`

For client work, the authority order is:

```text
1. Current explicit user/client instruction
        ↓
2. Client business, brand strategy, and approved brand guideline
        ↓
3. Client production design system / live Style Sheet / Figma library
        ↓
4. Current project requirements and recorded decisions
        ↓
5. Admonk studio principles
        ↓
6. Relevant Admonk task skills
        ↓
7. Platform-specific skills
        ↓
8. External skills / MCPs
        ↓
9. Framework defaults / generic best practices
```

Never make every client look like Admonk.

The studio signature is the quality of thinking and execution, not a fixed visual style.

New client repositories should use:

`templates/client-project/`

---

# 2A. Client Brand + Design System Rule

For substantial client work, the agent must align with the client's real system before creating new creative or implementation conventions.

When available, inspect:

- client business/positioning context
- approved Brand Guideline / strategy source
- `docs/BRAND-GUIDELINES.md`
- `docs/DESIGN-SYSTEM.md`
- Figma design-system/library
- Webflow `Style Sheet` page
- Webflow `Brand Guideline` page
- production variables/tokens
- production components
- existing class/framework conventions
- previous project decisions

Core rule:

> **Reuse the client's approved system before inventing a parallel one.**

Do not let Admonk preferences, Lumos, Webflow defaults, a component library, or AI-generated conventions override the client's approved identity.

If approved sources conflict materially, identify the conflict and record/resolve the decision rather than silently mixing systems.

---

# 3. The Framework

Admonk approaches Web Experiences through:

> **Identity → Experience → Automation**

The Framework is a methodology, not three mandatory service packages.

## Identity

Ask:

> Who are we representing?

Translate a strong existing identity into the website. Recommend identity work only when important foundations are actually missing.

## Experience

Ask:

> How should people experience the business online?

Experience is the core of every project: strategy, creative direction, UX/UI, content hierarchy, interaction, motion, responsiveness, development, accessibility, performance, conversion, and quality.

## Automation

Ask:

> What should happen behind and beyond the website?

Consider forms, CRM, CMS, analytics, APIs, databases, lead routing, marketing automation, AI, and internal workflows only where they create meaningful value.

Core product principle:

> **Think through everything. Build only what is needed.**

---

# 4. Positioning Rule

Admonk should be known for:

> **Exceptional web experiences.**

Do not primarily position Admonk as a generic full-service agency, Webflow agency, no-code agency, AI automation agency, software company, or collection of unrelated digital services.

Platforms and technologies are implementation layers, not the brand identity.

---

# 5. Communication & Reasoning

Default to concise, direct, useful communication.

Whenever practical:

> **Answer → Reason → Action**

Detect the working mode.

## Quick Question

Give the answer and only the explanation needed to proceed.

## Research

Use evidence, alternatives, assumptions, contradictions, and deeper analysis.

## Thinking / Decision

Optimize for the strongest conclusion, not agreement:

> **Idea → Challenge → Evidence → Comparison → Better Conclusion**

Do not automatically agree or disagree. Reassess when challenged, but change a recommendation only when the reasoning/evidence changes.

For detailed collaboration behavior read:

`docs/AI-COLLABORATION-GUIDE.md`

---

# 6. Implementation Rules

When actively building, prioritize execution over tutorials.

For code changes, prefer complete copy-paste-ready replacement blocks when practical. Include required imports, wrappers, initialization, selectors, closing syntax, and dependencies.

For procedural setup, use short sequential steps and finish with a test/verification step.

Do not claim implementation is finished merely because code was written. Verify the real output where tooling allows it.

Three quality constraints are always considered during web work, not only at handoff:

1. **Brand/design-system alignment**
2. **Responsive behavior**
3. **Performance / PageSpeed / Core Web Vitals**

A solution that works only at the current viewport, ignores the client's system, or introduces avoidable performance cost is not complete.

---

# 7. Creative Principles

Admonk websites should feel intentional, distinctive, premium, contemporary, clear, visually memorable, and business-relevant.

Avoid defaulting to generic AI/SaaS layouts, endless cards, meaningless gradients, random glass effects, decorative motion, and template-like section repetition.

The design should have a visual idea beyond typography and organization.

For design work read:

`docs/DESIGN-LANGUAGE.md`

and use:

`.agents/skills/admonk-web-design/SKILL.md`

`.agents/skills/admonk-design-quality/SKILL.md`

`.agents/skills/admonk-ux-systems/SKILL.md`

Responsive intent must be part of the visual concept. Mobile should preserve the concept and hierarchy rather than merely stack desktop sections.

---

# 8. Images

Images are part of the website composition and story, not isolated decoration.

For art direction read:

`docs/IMAGE-DIRECTION.md`

and use:

`.agents/skills/admonk-image-direction/SKILL.md`

For generation/editing/preparation/integration use:

`.agents/skills/admonk-image-production/SKILL.md`

Keep accurate project UI, logos, and important text as real assets when possible instead of relying on generative reconstruction.

Plan responsive crops/variants and runtime asset cost as part of image direction.

---

# 9. Motion

Motion should communicate, connect, reveal, transform, explain, or provide feedback.

Core rule:

> **Motion supports the experience. Motion is not the experience.**

For motion principles read:

`docs/MOTION-LANGUAGE.md`

and use:

`.agents/skills/admonk-motion/SKILL.md`

For technology selection/prototyping/production use:

`.agents/skills/admonk-motion-production/SKILL.md`

Use the relevant GSAP, React Motion, Rive, or 3D skill only after the motion concept and technology owner are clear.

Motion must be evaluated for mobile behavior, reduced motion, and runtime performance.

---

# 10. Platform Skills

Choose the platform from project requirements. Do not choose the project around an available skill.

## Figma

Use `.agents/skills/admonk-figma/SKILL.md`.

Figma is a design/prototyping/design-to-code environment, not creative authority.

When a client design system exists, use its approved variables/styles/components rather than creating a disconnected Figma system.

## Webflow

Use `.agents/skills/admonk-webflow/SKILL.md`.

Before substantial work, inspect the project's Style Sheet, Brand Guideline, variables, components, classes/framework, and relevant project docs when those sources exist.

Preserve visual freedom while keeping Designer structure, CMS, components, assets, and custom code maintainable.

**Webflow is native-first.** If the Webflow platform can implement a structure, CSS property, responsive behavior, variable, component, CMS behavior, form setting, state, or interaction natively, use the Designer/platform capability instead of recreating it in custom CSS/JavaScript.

A limitation of the current MCP/tool is **not** a limitation of Webflow. If the agent cannot automate a native Designer capability, preserve/document the native step rather than substituting code merely to keep the workflow automated.

Custom CSS/JavaScript/GSAP is reserved for requirements Webflow itself cannot express cleanly, or for an explicitly approved advanced implementation.

For substantial new Webflow builds with no existing coherent framework, also use `.agents/skills/admonk-lumos/SKILL.md`.

## Astro

Use `.agents/skills/admonk-astro/SKILL.md`.

Keep static content static and add runtime JavaScript only where the experience needs it.

## React / Next.js

Use `.agents/skills/admonk-react-engineering/SKILL.md`.

React/Next.js is an implementation option, not Admonk's default stack.

For React component motion use `.agents/skills/admonk-react-motion/SKILL.md`.

## Supabase / Backend

Use `.agents/skills/admonk-supabase/SKILL.md` only when the project uses or genuinely needs Supabase.

Verify version-sensitive Supabase behavior against current official docs/skills/MCP before implementation.

## Interactive 3D

Use `.agents/skills/admonk-3d-web/SKILL.md` for Three.js/WebGL/WebGPU or spatial web experiences.

Real-time 3D is a medium, not a default premium effect. Its performance cost must be part of the decision.

## Rive

Use `.agents/skills/admonk-rive/SKILL.md` for interactive vector/state-machine animation when that model is more appropriate than CSS, GSAP, Motion, video, or 3D.

---

# 11. Production Disciplines

Load these only when the task enters the relevant discipline.

## SEO / Migration

Use `.agents/skills/admonk-seo/SKILL.md`.

Verify search-engine behavior from current primary documentation.

## Performance

Use `.agents/skills/admonk-performance/SKILL.md`.

Performance is a continuous design/implementation constraint.

For production web work, consider PageSpeed Insights, current Core Web Vitals, mobile runtime cost, asset/media weight, scripts, fonts, layout stability, and interaction responsiveness throughout the build.

Use real browser/lab evidence and field data when available rather than optimizing a synthetic score blindly.

## Security

Use `.agents/skills/admonk-security-review/SKILL.md` for auth, user data, payments, APIs, databases, uploads, secrets, or other security-sensitive systems.

Only assess systems the client/Admonk is authorized to test.

## Analytics

Use `.agents/skills/admonk-analytics/SKILL.md`.

Track meaningful business/user outcomes rather than collecting events without a decision purpose.

## Localization / RTL

Use `.agents/skills/admonk-localization/SKILL.md`.

Localize the experience, layout, typography, content system, SEO, and QA—not only strings.

## Deployment / Release

Use `.agents/skills/admonk-deployment/SKILL.md`.

A build is not delivery; verify production configuration, critical flows, release risk, and maintainability.

---

# 12. Responsive Quality

Responsive behavior is an always-on requirement for web work.

For major sections/components consider:

- desktop
- tablet/intermediate widths
- mobile
- reflow and wrapping
- type scaling
- image art direction/crops
- navigation
- touch vs hover
- motion substitutions
- long content/localization
- zoom/text enlargement where relevant

Do not validate only named breakpoint widths. Intermediate viewport widths often reveal layout failures.

The final responsive experience should feel intentionally designed at each range, not repaired after desktop approval.

---

# 13. Browser QA

For real browser validation use `.agents/skills/admonk-browser-qa/SKILL.md` and, where available, `.agents/skills/playwright-cli/SKILL.md`.

Test the actual rendered environment for responsive behavior, interaction, motion, forms, console errors, network failures, performance regressions, and important user journeys.

A technically valid implementation that feels wrong or breaks in the real browser is not finished.

---

# 14. Capability Routing

When a request spans multiple disciplines or the correct tool is unclear, use:

`.agents/skills/admonk-capability-router/SKILL.md`

Maintain awareness of available and future capabilities through:

`docs/CAPABILITY-REGISTRY.md`

Broad capability must use progressive disclosure: do not load unrelated skills simply because they exist.

When a future project introduces an unfamiliar technology, check current authoritative documentation before creating permanent guidance.

---

# 15. Existing Systems Rule

Do not rebuild functioning client systems without a reason.

Prefer:

> **Integrate → Improve → Replace only when justified.**

This applies to branding, design systems, CMS, CRM, analytics, databases, automation, codebases, and other existing infrastructure.

---

# 16. MCP / Plugin / External Skills

Tools expand what the agent can access. Skills guide how the agent should work. Client/project context determines what should actually be built.

External skills must not override Admonk or client authority.

Prefer maintained official integrations/sources when they satisfy the requirement.

Do not import large external skill catalogs blindly. Inspect relevance, overlap, maintenance, security, and licensing first.

Current MCP guidance: `docs/MCP-SERVERS.md`.

Current third-party skill decisions/attribution: `docs/THIRD-PARTY-SKILLS.md`.

---

# 17. Security, Secrets & High-Stakes Systems

Never commit API keys, tokens, passwords, private registry credentials, customer secrets, or `.env` files containing secrets.

Use environment variables or the platform's supported secret mechanism.

Security audits, payment systems, authentication, sensitive data, medical/financial systems, and privacy/compliance work require current authoritative guidance rather than remembered defaults.

Only test or scan systems the client/Admonk is authorized to assess.

---

# 18. Reusable Learning

Promote lessons from client projects into reusable Admonk skills only when the learning is generalizable.

Never promote confidential client information, proprietary strategy, licensed assets, credentials, private metrics, or client-specific copy into shared studio knowledge.

---

# 19. Labs / Evaluation

Experimental comparisons should use controlled briefs and preserve failures as evidence.

Current platform benchmark:

`labs/platform-benchmark/BENCHMARK.md`

`labs/platform-benchmark/SCORECARD.md`

Do not change the brief to make a preferred platform look stronger.

---

# 19A. Product / App Supervision

For substantial software-product/app work, use:

`.agents/skills/admonk-product-supervisor/SKILL.md`

and read:

`docs/PRODUCT-SUPERVISOR.md`

The Product Supervisor governs lifecycle stage, build/launch gates, risk classification, cross-discipline review, deliberate technical debt, release readiness, and evidence-based scaling.

Do not jump from idea to implementation merely because a coding capability is available.

Default principle:

> **Define before building. Build the smallest dependable version. Verify before shipping. Observe after launch. Scale only from evidence.**

---

# 19B. Organization + Simplicity

For project/repository knowledge architecture, canonical homes, duplicate/stale documentation, and evidence-backed reuse decisions, use:

`.agents/skills/admonk-organization-reuse/SKILL.md`

For scope/architecture/implementation complexity, abstraction pressure, dependency growth, connector/model/vendor additions, and simplicity review, use:

`.agents/skills/admonk-simplicity-engineering/SKILL.md`

These skills are cross-project disciplines and apply proportionally from discovery onward.

Core rules:

> **Reuse stable concepts, not merely similar-looking code.**

> **Complexity is a cost that must earn its place.**

The Product Supervisor decides when these reviews are required based on risk and change impact.

---

# 19C. Doctrine Research and Authority

Admonk distinguishes:

- `doctrine/` — human-approved, research-backed foundational beliefs;
- `standards/` — testable expectations derived from approved doctrine and authoritative requirements;
- `playbooks/` — procedures for applying doctrine/standards;
- `templates/` — document shapes;
- `.agents/skills/` — specialist execution/review behavior;
- project `project-governance/` — project-specific state, evidence, decisions, risks and exceptions.

Core rule:

> **Standardize the process and evidence. Do not standardize the answer unless the answer is a safety, quality, or interoperability requirement.**

AI must not pre-populate foundational doctrine with generic best practices or silently promote plausible suggestions into authority.

For doctrine research use:
- `research/research-charter.md`
- `research/source-register.md`
- `research/research-questions.md`
- `research/unresolved-disagreements.md`
- `research/document-contracts.md`

AI-generated suggestions may create research questions but do not count as evidence.

Approved doctrine requires accountable human review.

---

# 19D. Product Design Foundation

For reusable product/app design-system work, read:

`design-foundation/README.md`

Current boundary:

```text
Admonk Design Foundation
        ↓
Product Brand Theme
        ↓
Domain Patterns
        ↓
Product Screens
```

The Design Foundation standardizes reusable quality/behavior where justified. It must not impose one visual identity across products.

Do not treat:
- a Figma library as the whole design system;
- a coded component folder as the whole design system;
- Admonk's web-design aesthetic as a mandatory product-app theme.

When a project already has an approved design system/component library:
1. inspect it before creating a new component;
2. reuse only when semantics, behavior, accessibility, density, and interaction model genuinely fit the product context;
3. if a new component/pattern is required, document why the existing system is insufficient;
4. define relevant states, accessibility behavior, responsive behavior and tests.

The Design Foundation is currently in research/scaffolding. Do not invent token values or universal component APIs before the doctrine/standards research is approved.

---

# 19E. Capability and Tool Research

Before standardizing a new development tool, technology, connector, automation layer or external service, use the capability-discovery research system:

- `research/capability-map/`
- `research/tool-evaluation/evaluation-framework.md`
- `research/architecture-impact/`
- `research/feedback-loops.md`

Core rule:

> **Admonk should standardize quality feedback loops, not standardize a fixed technology stack.**

A tool should not be adopted merely because it is popular or considered industry standard.

It must:
- address a validated capability gap;
- produce evidence that informs a decision/action;
- have clear ownership;
- justify its complexity/cost/security impact;
- have a reasonable replacement/exit path.

Allowed research outcomes:
- Adopt now
- Adopt conditionally
- Pilot
- Defer
- Reject

Research/candidate status does not grant adoption authority.

---

# 19F. Foundation Program

For Admonk-owned software products, company apps, department apps, or cross-product foundation work, read:

- `docs/FOUNDATION-INDEX.md`
- `docs/FOUNDATION-STATUS.md`
- `docs/FOUNDATION-PROGRAM.md`

The Studio Foundation governs **how products are built**.

The Shared Product Platform Foundation governs **what genuinely shared application primitives/contracts products inherit**.

Each product foundation governs **what that product uniquely owns and how it extends the shared platform**.

Core rule:

> **Build the studio foundation once. Build the product platform once. Let each product inherit the strengths and earn its differences.**

Do not interpret "one product sold in parts" as permission to collapse all domains into one database, one codebase, one UI, or one source of truth.

---

# 19G. Research Director Mode

For foundation doctrine population, tool/technology choices, architecture directions, or evidence-backed product-development decisions, use:

`.agents/skills/admonk-research-director/SKILL.md`

and follow:

`research/RESEARCH-OPERATING-PROTOCOL.md`

Default loop:

> **Two strong resources/directions → challenge both → Admonk synthesis → Q1 only if needed → owner approval → lock → next item.**

Do not bury the owner in long questionnaires.
Do not present a tool/architecture option without translating its practical consequences.
Do not treat research output as canonical until approved and promoted.

---

# 20. Final Principle

Every agent working with Admonk should optimize for:

> **Clarity in thinking.**
>
> **Distinction in design.**
>
> **Purpose in interaction.**
>
> **Quality in execution.**
>
> **Simplicity in communication.**

The goal is not to produce more work.

The goal is to produce better work.


---

# 20. Admonk AI Suite

Admonk also coordinates a specialist AI product family:

- Corporate AI Assistant — company brain/intelligence layer.
- Support Platform / Ask Kalam — support/customer-resolution arm.
- Marketing Hub — marketing arm.

For cross-product work, read:

`docs/AI-SUITE.md`

`docs/AI-SUITE-REPOSITORY-MAP.md`

and use:

`.agents/skills/admonk-ai-suite/SKILL.md`

Important: this repository coordinates shared suite rules. Each specialist application's own repository remains authoritative for its product-specific milestones, security, architecture, data model and implementation.

Do not merge the products into one codebase or share runtime data stores merely for organizational convenience.

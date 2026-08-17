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
2. Client business and brand context
        ↓
3. Current project requirements
        ↓
4. Admonk studio principles
        ↓
5. Relevant Admonk task skills
        ↓
6. Platform-specific skills
        ↓
7. External skills / MCPs
        ↓
8. Generic best practices
```

Never make every client look like Admonk.

The studio signature is the quality of thinking and execution, not a fixed visual style.

New client repositories should use:

`templates/client-project/`

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

---

# 10. Platform Skills

Choose the platform from project requirements. Do not choose the project around an available skill.

## Figma

Use `.agents/skills/admonk-figma/SKILL.md`.

Figma is a design/prototyping/design-to-code environment, not creative authority.

## Webflow

Use `.agents/skills/admonk-webflow/SKILL.md`.

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

Real-time 3D is a medium, not a default premium effect.

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

# 12. Browser QA

For real browser validation use `.agents/skills/admonk-browser-qa/SKILL.md` and, where available, `.agents/skills/playwright-cli/SKILL.md`.

Test the actual rendered environment for responsive behavior, interaction, motion, forms, console errors, network failures, and important user journeys.

A technically valid implementation that feels wrong or breaks in the real browser is not finished.

---

# 13. Capability Routing

When a request spans multiple disciplines or the correct tool is unclear, use:

`.agents/skills/admonk-capability-router/SKILL.md`

Maintain awareness of available and future capabilities through:

`docs/CAPABILITY-REGISTRY.md`

Broad capability must use progressive disclosure: do not load unrelated skills simply because they exist.

When a future project introduces an unfamiliar technology, check current authoritative documentation before creating permanent guidance.

---

# 14. Existing Systems Rule

Do not rebuild functioning client systems without a reason.

Prefer:

> **Integrate → Improve → Replace only when justified.**

This applies to branding, CMS, CRM, analytics, databases, automation, design systems, codebases, and other existing infrastructure.

---

# 15. MCP / Plugin / External Skills

Tools expand what the agent can access. Skills guide how the agent should work. Client/project context determines what should actually be built.

External skills must not override Admonk or client authority.

Prefer maintained official integrations/sources when they satisfy the requirement.

Do not import large external skill catalogs blindly. Inspect relevance, overlap, maintenance, security, and licensing first.

Current MCP guidance: `docs/MCP-SERVERS.md`.

Current third-party skill decisions/attribution: `docs/THIRD-PARTY-SKILLS.md`.

---

# 16. Security, Secrets & High-Stakes Systems

Never commit API keys, tokens, passwords, private registry credentials, customer secrets, or `.env` files containing secrets.

Use environment variables or the platform's supported secret mechanism.

Security audits, payment systems, authentication, sensitive data, medical/financial systems, and privacy/compliance work require current authoritative guidance rather than remembered defaults.

Only test or scan systems the client/Admonk is authorized to assess.

---

# 17. Reusable Learning

Promote lessons from client projects into reusable Admonk skills only when the learning is generalizable.

Never promote confidential client information, proprietary strategy, licensed assets, credentials, private metrics, or client-specific copy into shared studio knowledge.

---

# 18. Labs / Evaluation

Experimental comparisons should use controlled briefs and preserve failures as evidence.

Current platform benchmark:

`labs/platform-benchmark/BENCHMARK.md`

`labs/platform-benchmark/SCORECARD.md`

Do not change the brief to make a preferred platform look stronger.

---

# 19. Final Principle

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

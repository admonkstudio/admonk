# Admonk Agent Architecture

This document defines how Admonk's AI system should scale across Admonk itself and future client projects.

The central principle is:

> **Studio intelligence should travel. Client identity should not.**

Admonk's reusable methods, quality standards, design thinking, motion principles, image-production workflow, UX rules, engineering guidance, and QA processes should be usable across client work.

Admonk's own business positioning, website copy, portfolio language, and company-specific decisions should remain specific to the Admonk repository.

---

# 1. Three Context Layers

Every project should distinguish three kinds of knowledge.

## Layer A — Studio Intelligence

Reusable across projects.

Examples:

- Web design methodology
- UX systems
- Design-quality review
- Image direction and production
- Motion principles and production
- Browser QA
- GSAP knowledge
- React engineering
- Platform implementation skills
- Accessibility, performance, testing, and security practices

This is the **Admonk Agent Kit** layer.

## Layer B — Client / Brand Context

Specific to one client.

Examples:

- Business model
- Audience
- Positioning
- Brand strategy
- Brand identity
- Brand guidelines
- Voice/tone
- Content
- Competitors
- Objectives
- Products/services
- Constraints
- Existing systems
- Approved decisions

This belongs in the client's repository and/or approved canonical client sources.

## Layer C — Project / Platform Context

Specific to the implementation.

Examples:

- Production design system
- Webflow Style Sheet
- Webflow Brand Guideline page
- Figma library
- Variables/tokens
- Components
- Figma
- Webflow
- Astro
- React / Next.js
- CMS choice
- Hosting
- Analytics
- CRM
- APIs
- Motion technology
- Browser support
- Responsive strategy
- Performance targets

This belongs in the client's project repository and live production/design sources.

---

# 2. Authority Order

For client projects, use this hierarchy:

```text
1. Current explicit user/client instruction
        ↓
2. Approved client business / strategy / brand guideline
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

This prevents the reusable Admonk system, platform frameworks, and AI defaults from forcing an unrelated visual identity onto client work.

If approved sources materially conflict, identify and resolve the conflict rather than silently mixing them.

---

# 3. Current Repository Role

The `admonkstudio/admonk` repository currently serves two purposes:

1. Admonk's own company/business context.
2. The development ground for Admonk's reusable agent system.

Do not duplicate the entire repository into client projects.

Reusable skills can be distributed to client projects or installed in a shared personal/global skill location where the active Codex environment supports it.

Client repositories should contain only client/project-specific context plus any skills that genuinely need project-local overrides.

---

# 4. Recommended Client Repository Structure

Use the template under:

```text
templates/client-project/
```

A client project should normally look like:

```text
client-project/
├── AGENTS.md
├── docs/
│   ├── CLIENT-BUSINESS.md
│   ├── BRAND-GUIDELINES.md
│   ├── DESIGN-SYSTEM.md
│   ├── PROJECT-BRIEF.md
│   ├── CONTENT.md
│   ├── PROJECT-DECISIONS.md
│   └── PLATFORM.md
├── .agents/
│   └── skills/
│       └── client-specific skills only when needed
└── actual project files
```

The reusable Admonk skills should be supplied separately rather than copied into every client's documentation.

The client docs should point to canonical live sources instead of pretending the repository summary replaces the real Figma/Webflow/brand system.

---

# 5. Client Context Loading

Before design or implementation, determine what context is relevant.

## Business / strategy task

Read:

- `docs/CLIENT-BUSINESS.md`
- `docs/PROJECT-BRIEF.md`
- approved brand/strategy source when relevant

## Brand / design task

Read:

- `docs/BRAND-GUIDELINES.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/PROJECT-BRIEF.md`
- relevant supplied/canonical assets
- Figma/Webflow design-system sources when available

## Copy/content task

Read:

- `docs/CONTENT.md`
- `docs/CLIENT-BUSINESS.md`
- `docs/BRAND-GUIDELINES.md`

## Implementation task

Read:

- `docs/PLATFORM.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/PROJECT-BRIEF.md`
- existing project/code structure
- live platform classes/variables/components where relevant

For Webflow, normally inspect the `Style Sheet` page and `Brand Guideline` page when they exist.

## Continuation or revision

Also read:

- `docs/PROJECT-DECISIONS.md`

Do not load every context file for every trivial task, but do not begin substantial creative/implementation work without the client sources necessary to stay aligned.

---

# 6. Client Brand Overrides Admonk Aesthetic Preferences

Admonk's skills should improve the quality of client work without making every client look like Admonk.

Reusable principles include:

- Strong visual concepts
- Intentional composition
- Purposeful motion
- Quality control
- Responsive thinking
- Accessibility
- Technical performance
- Business relevance

Non-reusable defaults include:

- Admonk-specific colors
- Admonk-specific typography
- Admonk website layouts
- Admonk copy
- Admonk portfolio treatment
- A fixed house style applied regardless of client identity

The studio signature should be **quality of thinking and execution**, not visual sameness.

---

# 7. Design System as Production Source of Truth

The client's approved production design system should be inspected before creating new tokens/classes/components.

Typical sources:

```text
Webflow
→ Style Sheet page + variables + components + framework conventions

Figma
→ variables/styles + components + design-system/library pages

Code
→ tokens/theme + shared components + documented conventions
```

Rules:

- reuse before duplicating
- add reusable new patterns back into the canonical system
- document project-specific exceptions
- do not let a framework starter override approved client values
- do not create an AI-only parallel system that future editors cannot understand

For Webflow projects, Admonk commonly expects:

1. **Style Sheet** — classes, variables, components, states, reusable system examples.
2. **Brand Guideline** — strategy, voice, visual rules, imagery, identity direction.

Project docs should point to and summarize these sources.

---

# 8. Responsive + Performance Are Continuous Constraints

Responsive behavior and performance are not final QA-only stages.

During design, implementation, motion, image work, and iteration, consider:

## Responsive

- desktop
- tablet/intermediate widths
- mobile
- in-between viewport widths
- text wrapping/scaling
- grid/reflow behavior
- image crops/art direction
- navigation
- touch vs hover
- motion substitutions
- long content/localization
- browser zoom/text enlargement where relevant

## Performance

- PageSpeed Insights / Lighthouse diagnostics
- current Core Web Vitals
- mobile runtime cost
- image/video delivery
- font count/weight
- JavaScript / third-party scripts
- animation/rendering cost
- layout stability
- interaction responsiveness

Default principle:

> **Design responsively and performance-consciously from the beginning, then verify with real browser evidence.**

---

# 9. Platform Skills Are Execution Layers

Platform skills must not redefine the design.

Examples:

```text
admonk-figma
→ design-system and canvas execution

admonk-webflow
→ visual production and CMS implementation

admonk-astro
→ code-native lightweight website implementation

admonk-react-engineering
→ React/Next engineering quality
```

The platform is selected because it fits the project.

Do not select the project because a platform skill is available.

---

# 10. Capability Library Strategy

Admonk should maintain a broad capability library because future client needs are unpredictable.

However, broad capability does not mean every skill should influence every task.

Use progressive disclosure:

```text
Skill exists
      ↓
Task matches its description
      ↓
Skill loads
      ↓
Relevant references load only if needed
```

This allows future-ready capability without flooding normal tasks with unrelated guidance.

---

# 11. New Client Workflow

When a new client arrives:

1. Create a repository from `templates/client-project/`.
2. Populate client business / brand strategy / voice context.
3. Record/link the canonical Brand Guideline source.
4. Record/link the production design system (Webflow Style Sheet, Figma library, code system, etc.).
5. Populate `docs/DESIGN-SYSTEM.md` with the implementation-facing rules and source links.
6. Record the project objective and deliverables.
7. Record existing systems before proposing replacements.
8. Define responsive and performance expectations in `docs/PLATFORM.md`.
9. Choose the implementation platform after requirements are understood.
10. Activate the relevant reusable Admonk skills.
11. Build while preserving brand/design-system alignment, responsive behavior, and performance.
12. Verify in the real environment.
13. Record major decisions and exceptions.
14. Reuse project learning without leaking confidential client data into unrelated projects.

---

# 12. Reusable Knowledge vs Learned Client Knowledge

Reusable learning can be promoted back into Admonk's studio system when it is generalizable.

Example:

```text
Client project reveals a recurring Webflow/GSAP issue
        ↓
Confirm it is general, not client-specific
        ↓
Add the lesson to the relevant Admonk skill
```

Do not promote:

- Private client information
- Credentials
- Proprietary strategy
- Confidential metrics
- Client-specific copy
- Licensed client assets

---

# 13. Future Direction

As the system grows, the preferred long-term split is:

```text
admonk
→ Admonk company context + development/testing of the system

admonk-agent-kit
→ reusable studio skills, references, templates, evaluation workflows

client repositories
→ client identity + actual implementation
```

A separate `admonk-agent-kit` repository should be created when the reusable layer becomes mature enough to version independently.

Until then, the current repository remains the source of truth for the reusable system.

---

# Final Principle

> **Carry the method. Learn the client. Follow the system. Design responsively. Protect performance. Choose the tool. Build the project.**

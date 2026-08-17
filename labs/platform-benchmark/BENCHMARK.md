# Admonk Platform Benchmark

This lab compares the same creative brief across three environments:

1. Figma
2. Webflow
3. Astro

The goal is not to declare one universal winner.

The goal is to discover:

> **Which parts of Admonk's Web Experience workflow each environment performs best, where AI assistance is strongest, and where human intervention remains necessary.**

---

# 1. Test Rule

Keep the business/design brief constant.

Do not make one environment intentionally easier than another.

Each environment should receive the same:

- Business objective
- Audience
- Content requirements
- Brand/design-system rules
- Design direction
- Image requirements
- Motion requirements
- Responsive requirements
- Performance requirements where runtime exists
- Success criteria

Platform-specific implementation may differ.

Each platform should also be evaluated according to its **real professional workflow**, not by bypassing native capabilities merely because code is easier for an AI agent to generate.

---

# 2. Fictional Benchmark Brand

Use a fictional premium brand so client constraints do not bias the test.

## Brand

**AERA** — a premium architectural lighting company creating sculptural lighting systems for hospitality, luxury residential, and cultural spaces.

## Positioning

AERA combines light engineering with sculptural form.

## Audience

- Architects
- Interior designers
- Hospitality groups
- Premium property developers

## Desired perception

- Precise
- Architectural
- Sophisticated
- Contemporary
- Artistic
- Technically credible

## Avoid

- Generic luxury black/gold treatment
- Generic SaaS layout
- Overuse of cards
- Neon sci-fi visual clichés
- Excessive copy
- Motion that blocks normal browsing

---

# 2A. Benchmark Brand / Design System

The benchmark should behave like a real client project rather than letting each platform invent unrelated styling rules.

Create and preserve an AERA design-system/brand source containing at least:

- positioning / audience / brand character
- voice direction
- colors
- typography
- spacing/layout principles
- image direction
- motion character
- reusable UI patterns
- responsive principles

For Webflow B, use two visible project pages where practical:

1. **Style Sheet** — production classes, variables, components, states and reusable system examples.
2. **Brand Guideline** — positioning, strategy, voice, visual rules, imagery and brand direction.

The production page should reuse these sources rather than creating an unrelated parallel system.

For Figma, use a comparable design-system/brand area or library.

For Astro, translate the same approved system into code/tokens/components rather than redesigning the identity.

---

# 3. Page Goal

Create a premium one-page experience that makes AERA feel like a serious design object/system rather than a lighting-products catalog.

Primary CTA:

> Explore the collection

Secondary CTA:

> Discuss a project

---

# 4. Required Sections

## 01 — Hero

Communicate the relationship between light, material, and space.

Requirements:

- Strong visual concept
- Minimal copy
- One dominant visual idea
- Meaningful micro-interaction or motion concept

## 02 — Philosophy / Positioning

Explain the idea:

> Light should shape the space, not decorate it.

Use an image-led/editorial composition rather than a conventional text-and-card block.

## 03 — Collections

Show three fictional systems:

- Linea
- Halo
- Axis

Do not default to three identical cards unless that is genuinely the strongest composition.

## 04 — Process / System

Explain:

```text
Space
→ light study
→ fixture system
→ installation
```

This section must include a small explanatory motion concept.

## 05 — Project Showcase

Feature one fictional installation:

**The Noma Atrium — Copenhagen**

Use project imagery/mockup treatment and a small set of relevant project facts.

## 06 — Technical Layer

Communicate that the visual design is supported by engineering.

Possible topics:

- Photometrics
- Control systems
- Modular optics
- Custom finishes

Avoid turning this into a dashboard.

## 07 — Final CTA

End with a visually meaningful transition into:

> Discuss a project

---

# 5. Image Requirements

The benchmark should test the full Admonk image workflow.

Create/select imagery for:

- Hero
- Editorial philosophy section
- Collection/product treatment
- Project showcase

The image direction should feel:

- Photorealistic
- Architectural/editorial
- Cinematic but controlled
- Material-aware
- Strong use of shadow/light

At least one important image should require deliberate text-safe negative space.

At least one image should test responsive/mobile art direction.

Runtime implementations should also evaluate responsive image delivery, asset weight, and layout stability.

---

# 6. Motion Requirements

The benchmark should include:

## Micro interaction

A button/link/image interaction that rewards exploration without hiding critical information.

## Natural page motion

At least one image/text reveal or section transition.

## Explanatory motion

The Space → light study → fixture → installation process should tell a miniature visual story.

## Hero/feature motion

One selectively stronger interaction may be used if justified.

Do not create an artificially long pinned-scroll experience merely to demonstrate animation.

Reduced-motion behavior must be considered.

For Webflow/Astro, motion must also be evaluated for mobile/runtime performance.

---

# 7. Responsive Requirements

Responsiveness is part of the concept from the beginning.

Evaluate:

- Desktop
- Tablet / intermediate width
- Mobile
- Intermediate viewport widths between named breakpoints

The design should adapt rather than simply shrink.

Test:

- Image art direction
- Type hierarchy/wrapping
- Layout reflow
- Navigation
- Motion substitution
- Touch behavior
- Section rhythm
- long content where relevant
- browser zoom/text enlargement where relevant

Mobile should preserve AERA's visual concept and hierarchy rather than simply stack every desktop element.

---

# 7A. Runtime Performance Requirements

For Webflow and Astro, performance is part of the scored implementation.

At appropriate milestones and before final scoring when a testable URL exists:

- run PageSpeed Insights/Lighthouse diagnostics on mobile and desktop
- evaluate current Core Web Vitals signals/risks
- inspect LCP asset strategy
- inspect layout stability
- inspect interaction/script cost
- inspect font/image/media weight
- record material third-party/custom-code cost

Use current Google/web.dev guidance rather than hard-coding stale metrics into the benchmark.

Do not optimize purely for a synthetic score at the expense of the intended experience; first look for a more efficient implementation of the same creative idea.

---

# 8. Figma Test

Goal:

Evaluate the design-native workflow.

Test:

- AI-assisted creation/editing
- Visual concept freedom
- Auto Layout vs art direction
- Client/benchmark variables/components
- Design-system consistency
- Responsive design intent
- Image integration
- Motion prototyping
- Motion-context extraction where available
- Code Connect potential
- Client-editability/collaboration

The Figma result does not need to be production runtime code.

---

# 9. Webflow Test

Goal:

Evaluate design-to-production speed in a professional visual website environment.

## Native Designer First Constraint

The Webflow benchmark must use the full native Webflow Designer/platform capability before custom code.

Required implementation order:

```text
Native elements / semantics
→ classes + Style panel
→ variables / modes
→ grid / flex / positioning / sizing / effects / transforms
→ native responsive controls
→ components / slots / properties
→ CMS / bindings / forms / settings
→ native states / interactions where supported
→ custom CSS only when Webflow itself lacks the CSS capability
→ custom JS / GSAP only when Webflow itself lacks the behavior or the advanced requirement genuinely exceeds native interactions
```

If Webflow supports a CSS property in the Designer, implementing the same property through embedded CSS is **not allowed for the benchmark**.

If Webflow supports an interaction natively but the current MCP cannot author it, record this as an **AI tooling limitation** and preserve/use the native Designer step. Do not substitute JavaScript solely to keep the process automated.

Mandatory distinction:

```text
Agent/MCP cannot do it
≠
Webflow cannot do it
```

Custom code must include a short reason identifying the actual native platform limitation it solves.

## Design System / Brand Constraint

Before building the final Webflow version:

- establish/inspect the AERA `Style Sheet` page
- establish/inspect the AERA `Brand Guideline` page
- use approved Webflow variables
- use approved components
- reuse the approved class/framework system
- add genuinely reusable new system elements back to the Style Sheet

The production landing page should not become the undocumented source of its own parallel design system.

## Webflow Architecture Passes

The benchmark may preserve two Webflow implementations for learning:

### Webflow A — Raw / Pre-rule Prototype

The earlier AERA prototype used page-level custom CSS/JS for several capabilities Webflow can implement natively.

Preserve it as historical evidence of what an unconstrained coding agent tends to do, but **do not use it as the final scored professional Webflow implementation**.

### Webflow B — Professional Native-First + Lumos

Rebuild the same AERA concept using:

- `admonk-webflow`
- `admonk-lumos`
- AERA Style Sheet + Brand Guideline
- native Webflow Designer capabilities first
- current Lumos architecture/version rules
- custom code only beyond real Webflow platform limits

This is the Webflow implementation used for final platform scoring.

Test:

- Designer structure
- Brand/design-system fidelity
- Style Sheet reuse
- Lumos class architecture
- Webflow variables
- Components/slots/properties
- Responsive implementation
- Intermediate viewport behavior
- Native CSS/style coverage
- CMS suitability where relevant
- Asset handling
- Native interaction capability
- Legitimate GSAP/custom-code extension points
- Form/CTA readiness
- PageSpeed / Core Web Vitals potential
- Published-site QA
- Client editing/maintenance
- AI ability to modify a real Webflow project
- AI/MCP limitations versus actual Webflow limitations
- Amount of custom code required after native capabilities are exhausted

---

# 10. Astro Test

Goal:

Evaluate unrestricted code-native implementation.

Test:

- Semantic page structure
- AERA design-system translation
- CSS/layout freedom
- Image handling
- Minimal client JavaScript
- GSAP/CSS motion
- View-transition potential
- Responsive behavior across real widths
- PageSpeed/Core Web Vitals potential
- Maintainability
- Content/CMS extensibility
- Browser QA
- AI code autonomy

---

# 11. Evidence Rules

For each environment, preserve evidence of:

- Initial brief interpretation
- Brand/design-system interpretation
- First meaningful design result
- Major revisions
- Time/number of significant AI iterations
- Screenshots/frames
- Motion test
- Responsive tests including intermediate widths
- Problems encountered
- Human corrections required
- Final output

For Webflow also record:

- Native Designer capabilities used
- Style Sheet/design-system reuse
- Lumos systems used
- Custom CSS added and why Webflow could not do it natively
- Custom JavaScript/GSAP added and why native interactions/behavior were insufficient
- Native steps the MCP could not automate
- Whether any custom code duplicated a native capability
- mobile and desktop PageSpeed results/diagnostics when measurable

For Astro also record mobile/desktop performance evidence when measurable.

Do not hide failures; the failures are part of the benchmark.

---

# 12. Final Question

The benchmark should answer:

```text
What should Admonk use Figma for?
What should Admonk use Webflow for?
What should Admonk use Astro for?
Where should the workflow move between them?
What does AI handle well in each environment?
Where does human creative/technical intervention still add the most value?
How well does each environment preserve one shared brand/design system?
How well does each environment handle responsive behavior across real viewport ranges?
How well do runtime environments preserve the creative idea while meeting strong performance expectations?
How much of a professional Webflow build can the agent complete using native Designer capabilities?
Where does the Webflow MCP end before Webflow itself ends?
Does Lumos materially improve AI-built Webflow architecture and maintainability?
```

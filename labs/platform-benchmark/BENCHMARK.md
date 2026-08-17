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
- Design direction
- Image requirements
- Motion requirements
- Responsive requirements
- Success criteria

Platform-specific implementation may differ.

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

---

# 7. Responsive Requirements

Evaluate:

- Desktop
- Tablet or intermediate width
- Mobile

The design should adapt rather than simply shrink.

Test:

- Image art direction
- Type hierarchy
- Navigation
- Motion substitution
- Touch behavior
- Section rhythm

---

# 8. Figma Test

Goal:

Evaluate the design-native workflow.

Test:

- AI-assisted creation/editing
- Visual concept freedom
- Auto Layout vs art direction
- Variables/components
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

Evaluate design-to-production speed in a visual website environment.

Test:

- Designer structure
- Classes/variables/components
- Responsive implementation
- CMS suitability where relevant
- Asset handling
- Native vs custom motion
- GSAP integration
- Form/CTA readiness
- Published-site QA
- Client editing/maintenance
- AI ability to modify a real Webflow project

---

# 10. Astro Test

Goal:

Evaluate unrestricted code-native implementation.

Test:

- Semantic page structure
- CSS/layout freedom
- Image handling
- Minimal client JavaScript
- GSAP/CSS motion
- View-transition potential
- Performance
- Maintainability
- Content/CMS extensibility
- Browser QA
- AI code autonomy

---

# 11. Evidence Rules

For each environment, preserve evidence of:

- Initial brief interpretation
- First meaningful design result
- Major revisions
- Time/number of significant AI iterations
- Screenshots/frames
- Motion test
- Responsive test
- Problems encountered
- Human corrections required
- Final output

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
```

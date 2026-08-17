# Platform Benchmark Scorecard

Score each category from **1–5** and attach short evidence.

Do not use a score without an observation explaining it.

## Scale

- **1** — major weakness / unsuitable without significant workaround
- **2** — below expectations / frequent friction
- **3** — workable / balanced tradeoffs
- **4** — strong
- **5** — exceptional / clear platform strength

---

| Category | Figma | Webflow | Astro | Evidence / Notes |
|---|---:|---:|---:|---|
| Brief understanding by AI |  |  |  |  |
| Brand-strategy alignment |  |  |  |  |
| Design-system fidelity |  |  |  |  |
| Speed to first useful result |  |  |  |  |
| Creative exploration |  |  |  |  |
| Visual distinctiveness |  |  |  |  |
| Art-direction freedom |  |  |  |  |
| Layout precision |  |  |  |  |
| Responsive control |  |  |  |  |
| Intermediate-width resilience |  |  |  | Does the layout remain coherent between named breakpoints? |
| Mobile design quality |  |  |  |  |
| Image-generation integration |  |  |  |  |
| Image crop/art-direction handling |  |  |  |  |
| Micro-interaction capability |  |  |  |  |
| Complex motion capability |  |  |  |  |
| Motion prototyping |  |  |  |  |
| Reduced-motion handling |  |  |  |  |
| Component/design-system support |  |  |  |  |
| Reuse without visual sameness |  |  |  |  |
| Accessibility implementation |  |  |  |  |
| Semantic output |  |  |  |  |
| Performance potential | N/A |  |  | Runtime platforms only |
| PageSpeed mobile result/quality | N/A |  |  | Use measured evidence when URL is testable |
| PageSpeed desktop result/quality | N/A |  |  | Use measured evidence when URL is testable |
| Core Web Vitals readiness | N/A |  |  | LCP / INP / CLS risks and field data when available |
| CMS/content modeling |  |  |  |  |
| Client editing after handoff |  |  |  |  |
| Integration/API freedom |  |  |  |  |
| Analytics/measurement support |  |  |  |  |
| SEO production readiness |  |  |  |  |
| QA/testability |  |  |  |  |
| AI autonomy |  |  |  |  |
| Ease of AI correction/iteration |  |  |  |  |
| Human intervention required |  |  |  | Lower score = more intervention |
| Maintainability |  |  |  |  |
| Deployment/publishing simplicity |  |  |  |  |
| Overall production readiness |  |  |  |  |

---

# Webflow-Specific Architecture Scores

These do not apply to Figma/Astro. They exist to distinguish the capabilities of **Webflow itself** from the capabilities of the current AI/MCP integration.

| Webflow Category | Score 1–5 | Evidence / Notes |
|---|---:|---|
| Brand Guideline alignment |  | Was copy/visual behavior derived from the project brand source? |
| Style Sheet reuse |  | Did the build reuse documented production classes/states/components? |
| Design-system maintenance |  | Were reusable additions returned to the Style Sheet/system rather than left undocumented? |
| Native Designer utilization |  | How much structure/style was implemented through real Webflow capabilities? |
| Native Style panel / CSS coverage |  | Did the agent avoid embedded CSS for properties Webflow already supports? |
| Variables / modes usage |  | Were reusable values implemented through Webflow/Lumos variables? |
| Lumos architecture quality |  | Classes, utilities, page structure, spacing, components, version discipline |
| Native responsive implementation |  | Were Webflow/Lumos responsive capabilities used before custom media queries? |
| Intermediate viewport quality |  | Did the implementation work between Webflow breakpoint boundaries? |
| Native component capability |  | Slots/properties/components used appropriately |
| Native CMS/forms/settings usage |  | Did the implementation avoid unnecessary JS replacements? |
| Native interaction usage |  | Where Webflow supports the motion, was it kept native? |
| Custom-code necessity |  | 5 = code only beyond real Webflow limits; 1 = heavy avoidable code |
| MCP coverage of Webflow |  | How much of Webflow's native capability can the agent directly operate? |
| MCP limitation handling |  | Did the agent preserve native steps rather than bypass them with code? |
| Designer maintainability |  | Can a professional/client continue editing without understanding hidden CSS/JS? |
| Mobile performance discipline |  | Assets, scripts, motion and runtime cost considered during build |

## Custom-Code Audit

For every custom-code block used in the final Webflow benchmark, record:

| Code / Purpose | CSS or JS | Native Webflow alternative checked? | Why native Webflow was insufficient | Keep / Replace |
|---|---|---|---|---|
|  |  |  |  |  |

If Webflow supports the same implementation natively, the final decision should normally be **Replace**.

---

# Responsive Evidence

For the final scored implementations record representative tests.

| Environment | Desktop | Intermediate / Tablet | Mobile | In-between widths | Notes |
|---|---|---|---|---|---|
| Figma |  |  |  |  |  |
| Webflow |  |  |  |  |  |
| Astro |  |  |  |  |  |

Record failures such as unexpected wrapping, overflow, crop loss, navigation breakage, sticky/fixed issues, touch-only problems, or concept degradation.

---

# Performance Evidence

Runtime environments only.

## Webflow

- Test URL:
- PageSpeed mobile:
- PageSpeed desktop:
- LCP evidence/risk:
- INP evidence/risk:
- CLS evidence/risk:
- Main performance costs:
- Improvements made:
- Remaining intentional tradeoffs:

## Astro

- Test URL:
- PageSpeed mobile:
- PageSpeed desktop:
- LCP evidence/risk:
- INP evidence/risk:
- CLS evidence/risk:
- Main performance costs:
- Improvements made:
- Remaining intentional tradeoffs:

Do not fabricate scores when the page has not been measured.

---

# Time / Iteration Evidence

## Figma

- Time to first useful direction:
- Significant AI iterations:
- Manual corrections:
- Design-system corrections:
- Responsive corrections:
- Major blockers:

## Webflow A — Raw / Pre-rule

- Time to first useful direction:
- Significant AI iterations:
- Manual corrections:
- Custom-code dependence:
- Major blockers:

This version is preserved as evidence but is not the professional final score when it violates Native Designer First.

## Webflow B — Native-First + Lumos

- Time to first useful direction:
- Significant AI iterations:
- Brand/design-system corrections:
- Manual native Designer steps:
- Responsive corrections:
- Performance corrections:
- MCP limitations encountered:
- Legitimate custom CSS required:
- Legitimate custom JS/GSAP required:
- Major blockers:

## Astro

- Time to first useful direction:
- Significant AI iterations:
- Brand/design-system corrections:
- Responsive corrections:
- Performance corrections:
- Manual corrections:
- Major blockers:

---

# Capability Findings

## Figma is strongest when

- 

## Webflow is strongest when

- 

## Astro is strongest when

- 

## Figma weaknesses

- 

## Webflow weaknesses

- 

## Astro weaknesses

- 

## Webflow MCP vs Webflow Platform

### MCP can operate directly

- 

### Webflow supports natively but MCP cannot currently operate

- 

### Requires genuine custom-code extension

- 

---

# Workflow Recommendation

After the benchmark, define the preferred Admonk workflow as stages rather than a single-platform answer.

Example structure:

```text
Strategy / brand rules → [source/platform]
Design system → [source/platform]
Concept / design → [platform]
Production build → [platform]
Responsive implementation → [platform]
Advanced motion → [tool/platform]
CMS/editing → [platform]
Performance verification → [tool]
QA → [tool]
```

## Final recommended workflow

To be completed after evidence is collected.

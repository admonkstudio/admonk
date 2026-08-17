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
| Speed to first useful result |  |  |  |  |
| Creative exploration |  |  |  |  |
| Visual distinctiveness |  |  |  |  |
| Art-direction freedom |  |  |  |  |
| Layout precision |  |  |  |  |
| Responsive control |  |  |  |  |
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
| Performance potential |  |  |  |  |
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
| Native Designer utilization |  | How much structure/style was implemented through real Webflow capabilities? |
| Native Style panel / CSS coverage |  | Did the agent avoid embedded CSS for properties Webflow already supports? |
| Variables / modes usage |  | Were reusable values implemented through Webflow/Lumos variables? |
| Lumos architecture quality |  | Classes, utilities, page structure, spacing, components, version discipline |
| Native responsive implementation |  | Were Webflow/Lumos responsive capabilities used before custom media queries? |
| Native component capability |  | Slots/properties/components used appropriately |
| Native CMS/forms/settings usage |  | Did the implementation avoid unnecessary JS replacements? |
| Native interaction usage |  | Where Webflow supports the motion, was it kept native? |
| Custom-code necessity |  | 5 = code only beyond real Webflow limits; 1 = heavy avoidable code |
| MCP coverage of Webflow |  | How much of Webflow's native capability can the agent directly operate? |
| MCP limitation handling |  | Did the agent preserve native steps rather than bypass them with code? |
| Designer maintainability |  | Can a professional/client continue editing without understanding hidden CSS/JS? |

## Custom-Code Audit

For every custom-code block used in the final Webflow benchmark, record:

| Code / Purpose | CSS or JS | Native Webflow alternative checked? | Why native Webflow was insufficient | Keep / Replace |
|---|---|---|---|---|
|  |  |  |  |  |

If Webflow supports the same implementation natively, the final decision should normally be **Replace**.

---

# Time / Iteration Evidence

## Figma

- Time to first useful direction:
- Significant AI iterations:
- Manual corrections:
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
- Manual native Designer steps:
- MCP limitations encountered:
- Legitimate custom CSS required:
- Legitimate custom JS/GSAP required:
- Major blockers:

## Astro

- Time to first useful direction:
- Significant AI iterations:
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
Strategy / concept → [platform]
Design system / client review → [platform]
Production build → [platform]
Advanced motion → [tool/platform]
CMS/editing → [platform]
QA → [tool]
```

## Final recommended workflow

To be completed after evidence is collected.

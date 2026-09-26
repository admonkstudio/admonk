# Admonk Design Foundation

**Status:** Structural foundation only — doctrine/tokens/components are not yet populated  
**Created:** 2026-09-26  
**First serious consumer:** Marketing Hub (after Product Definition reaches the relevant design stage)

## Purpose

Create a reusable product-design operating layer that improves consistency, accessibility, implementation speed and quality without forcing every Admonk product to look the same.

## Layered model

```text
Admonk Design Foundation
        ↓
Product Brand Theme
        ↓
Domain Patterns
        ↓
Product Screens
```

### Admonk Design Foundation
Reusable behavior, semantics, governance and quality constraints.

### Product Brand Theme
Product-specific visual expression such as color, typography personality, imagery, density, shape language, voice and motion character.

### Domain Patterns
Stable workflow patterns that belong to a product domain, such as analytics review, content approval, campaign planning or knowledge search.

### Product Screens
Compositions designed for the actual users, brand, domain and workflow.

## Important distinctions

```text
Design system
= principles + semantic foundations + components + patterns + guidance + governance

Component library
= coded implementation of selected stable components

Figma library
= design-tool representation

Product brand
= product-specific identity and expression
```

None of these should be treated as interchangeable.

## Current phase

Do not build a large component library yet.

Current work is limited to:
- researching the design-system doctrine;
- defining document contracts;
- defining semantic/token architecture questions;
- defining component-governance questions;
- defining what must remain product-specific.

No fixed token values, visual style, component API or framework package is approved yet.

## Core boundary

> **Reuse rules and foundations broadly; reuse components only when semantics, behavior, accessibility, density, and interaction model genuinely fit the product context; preserve product-specific expression where it creates differentiation.**

## Authority

The Design Foundation is subordinate to:
1. explicit product/client direction;
2. approved product brand/identity;
3. approved product-specific design decisions;
4. approved Admonk doctrine/standards.

It must never overwrite a product's visual identity merely for cross-project consistency.

## Related sources

- `docs/DESIGN-LANGUAGE.md` — current Admonk creative/design language; subject to doctrine-research reconciliation where relevant.
- `.agents/skills/admonk-ux-systems/SKILL.md`
- `.agents/skills/admonk-design-quality/SKILL.md`
- `.agents/skills/admonk-figma/SKILL.md`
- `research/` — evidence and doctrine research.


## Promotion and scope governance

Use:
- `PROMOTION-LADDER.md` — how local product solutions may earn promotion into shared layers;
- `SCOPE-BOUNDARIES.md` — what should normally remain product/domain-specific;
- `../research/design-system-drift.md` — research contract for design/code/Figma drift;
- `../research/design-system-maturity-model.md` — provisional maturity model under research.

A technically reusable component may still be wrong for another product because of:
- information density;
- user risk;
- accessibility needs;
- content length;
- workflow consequence;
- mobile/input behavior;
- product-specific context.

Shared reuse requires contextual fit, not only technical compatibility.


## Approved maturity direction

R008 approved:
**Progressive evidence-gated maturity.**

Current target: **Level 1 — Foundation rules**.

Marketing Hub may create product-owned **Local**, **Candidate**, or approved **Trial** assets as real product needs emerge.

Do not promote those assets into the shared Design Foundation merely to avoid temporary duplication.

Shared **Stable** status is earned through proven semantics/behavior, ownership, documentation, tests and relevant accessibility/responsive evidence.

Asset lifecycle:
`Local → Candidate → Trial → Stable → Deprecated`

See:
`../research/design-system-maturity-model.md`

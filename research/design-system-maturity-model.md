# Admonk Design-System Maturity Model

**Status:** APPROVED DIRECTION — governance model pending later standards conversion  
**Approved:** 2026-09-26  
**Research basis:** `research/synthesis/R008-design-system-maturity.md`

## Direction

> **Progressive evidence-gated maturity: start with foundation rules, let real products create candidates, let evidence promote assets, and make Stable status expensive enough to mean something.**

Admonk explicitly accepts some temporary local duplication and later migration/refactoring in exchange for avoiding speculative shared components/tokens.

## Level 0 — Local product design

- product-owned styles/components;
- intentional product-specific choices;
- universal safety/accessibility doctrine still applies;
- no shared compatibility promise.

Use for experiments, highly product-specific needs, and unproven patterns.

## Level 1 — Foundation rules

- approved design principles;
- shared-vs-product boundaries;
- accessibility/state expectations;
- responsive/interaction expectations;
- promotion/contribution rules;
- maturity labels.

This is the target for completing the current Foundation research stage.

## Level 2 — Semantic foundation + first proven assets

Introduced only when a serious product creates real need:
- semantic token architecture;
- small proven primitive/component set;
- asset maturity labels;
- basic implementation/documentation contracts.

Marketing Hub is expected to be the first serious evidence source, not a reason to pre-build a library.

## Level 3 — Domain system

After repeated domain use:
- stable domain patterns;
- component/pattern documentation;
- visual/regression validation where justified;
- governed promotion/deprecation;
- stronger consumer evidence.

## Level 4 — Cross-product governed system

Only after multiple products prove common semantics:
- proven cross-product assets;
- versioning/compatibility;
- ownership;
- drift management;
- affected-consumer testing;
- shared package/service only where centralization reduces total cost/complexity.

## Asset lifecycle

```text
Local
→ Candidate
→ Trial
→ Stable
→ Deprecated
```

### Local
Owned by one product. No shared compatibility promise.

### Candidate
Potentially reusable. Evidence collection begins.

### Trial
Approved for limited real use. Relevant behavior/accessibility floor is met, but contract/details may still evolve.

### Stable
Shared semantics/behavior are proven; ownership, documentation, tests and compatibility expectations are explicit.

### Deprecated
Supported only through a defined migration/deprecation period; not for new use.

## Progression rule

Maturity increases because evidence makes centralization/reuse worthwhile—not because a product should "reach Level 4."

A product may intentionally remain at a lower level indefinitely.

## Decision price

Accepted:
- temporary duplication;
- later token/component migration;
- refactoring/promotion work.

Containment:
- preserve deliberate change seams;
- never force promotion;
- require owner for shared assets;
- promote only when central value exceeds migration/maintenance cost.

## Final rule

> **Maturity follows proven reuse. It does not precede it.**

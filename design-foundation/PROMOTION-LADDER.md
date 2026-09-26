# Design Foundation — Promotion Ladder

**Status:** Governance scaffold, not design doctrine  
**Purpose:** Prevent local product solutions from becoming shared Admonk standards before reuse is proven.

## Promotion path

```text
Local experiment
    ↓
Repeated local pattern
    ↓
Domain pattern
    ↓
Proven cross-product pattern
    ↓
Foundation candidate
    ↓
Approved foundation rule/component
```

## Promotion evidence

A pattern/component should not move upward merely because it looks reusable.

Promotion should normally require evidence that:
- more than one real use case exists;
- semantics are stable;
- interaction behavior is stable;
- product-specific assumptions are identified and removed or intentionally retained at a lower layer;
- accessibility behavior is validated;
- responsive/input-mode behavior is validated;
- ownership is clear;
- documentation exists;
- appropriate tests/evidence exist;
- central maintenance provides more value than local duplication.

## Layer rules

### Local experiment
Product-specific and intentionally provisional.

### Repeated local pattern
Used more than once inside one product. Still product-owned.

### Domain pattern
Reusable across several workflows in the same domain, but may still encode domain semantics.

### Proven cross-product pattern
Observed across distinct real products with genuinely matching semantics, behavior and context needs.

### Foundation candidate
Proposed for shared Admonk governance. Must undergo review against research-backed Design Foundation doctrine/standards.

### Approved foundation rule/component
Shared, versioned, documented and owned.

## Demotion / deprecation

A shared item may be demoted or deprecated if:
- product needs diverge;
- the shared abstraction accumulates incompatible variants;
- accessibility/responsive behavior becomes harder to maintain centrally;
- only one real consumer remains;
- local implementation becomes clearer or safer;
- ownership disappears.

## Core rule

> **Shared design assets must earn promotion through evidence; they are not promoted by resemblance.**

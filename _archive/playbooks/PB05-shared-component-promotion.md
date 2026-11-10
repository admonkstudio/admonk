# PB05 — Shared Component Promotion

**Trigger:** Proposal to reuse a component/pattern/interaction beyond its original product.
**Default:** Keep it local. Sharing must earn its way upward.

## Flow
1. **Local:** solve current need; reuse existing shared assets only when they genuinely fit.
2. **Candidate:** credible evidence another context/product needs substantially the same behavior.
3. **Trial:** test in genuinely different contexts; verify semantics, tokens and important states.
4. Verify accessibility, interaction behavior, documentation and relevant tests.
5. **Stable:** only after real reuse evidence; requires purpose, docs, tests, accessibility, ownership and change strategy.
6. Breaking Stable behavior requires impact assessment and migration support.
7. Demote/retire when reuse disappears or abstraction cost exceeds value.

**Critical rule:** Similarity is not reuse evidence. Shared purpose and behavior are.

S013 applies: **Figma owns design intent; code owns behavior.**

## Required record
**Component → Current level → Reuse evidence → Contexts tested → Accessibility/testing → Documentation → Owner → Decision**

**Implements:** S011, S012, S013, S006, S007, S023, S029.

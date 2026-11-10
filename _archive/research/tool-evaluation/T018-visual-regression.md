# T018 — Visual Regression

**Date:** 2026-09-26  
**Mode:** Choice / Direction Research  
**Status:** DECIDED — ADOPT CONDITIONALLY  
**Capability:** Detect material unintended visual changes in mature/high-value UI  
**Decision owner:** Admonk Studio  
**Sources:** SRC-TOOL-VR-001, SRC-TOOL-VR-002

## Problem

Functional tests can pass while layout, styling, responsive behavior or visible states regress.

Admonk needs a way to catch material visual regressions without:
- snapshotting every screen/state;
- paying recurring cloud costs before the value exists;
- turning cosmetic pixel noise into a release blocker;
- contradicting R011's rule that drift automation is earned by recurring drift cost.

## Direction A — Chromatic

Chromatic provides:
- cloud visual baselines;
- Storybook/Vitest/Playwright integrations;
- browser/view/theme modes;
- CI/PR review;
- centralized baseline approval;
- Storybook-native visual test workflow.

### Strengths for Admonk
- strongest collaboration/review model;
- especially good for Trial/Stable Storybook assets;
- cross-browser/theme/view state coverage is easier to manage;
- baselines do not depend on each developer's local machine;
- can become valuable once several people/products consume shared UI.

### Price
- snapshot-based usage/billing grows with tests × builds × browsers × modes;
- cloud/vendor dependency;
- Storybook/Chromatic coupling can become another platform to operate;
- broad snapshot coverage can create review fatigue;
- low-value cosmetic changes may generate noise.

## Direction B — Playwright visual comparisons

Playwright supports repository-stored screenshot baselines through `toHaveScreenshot()`.

### Strengths for Admonk
- no separate visual-regression vendor required;
- targeted screenshots can live beside existing browser tests;
- source-controlled baselines and code review are straightforward;
- ideal for a small set of critical pages/states;
- integrates with risk-routed release evidence rather than demanding full visual coverage.

### Price
- screenshot output can vary by operating system/browser/rendering environment;
- CI environment must be controlled;
- cross-browser baseline sets require more manual management;
- review workflow is less specialized than Chromatic;
- large suites can bloat repositories/CI and become flaky/noisy.

## No-automation baseline

For:
- Level 0/1;
- Local/Candidate assets;
- rapidly changing exploratory UI;

manual visual review remains acceptable.

Automated visual regression is not a maturity badge.

## Decision Cost Ledger

**Benefit gained:**  
Detect material UI regressions that behavioral tests miss.

**Price paid:**  
Baseline maintenance, deterministic rendering effort, screenshot storage/CI compute, and human review of legitimate changes.

**New problem introduced:**  
False positives / visual noise can reduce trust in the suite.

**Complexity cost:**  
Low when targeted; high if every component/state/browser/theme is captured.

**Operating cost:**  
Playwright: mainly CI/storage/maintenance.  
Chromatic: service usage plus review/maintenance.

**Speed cost:**  
Visual review can slow merges when many baselines change.

**Governance cost:**  
Need a clear rule for which visual states are worth protecting.

**Who pays:**  
The product/shared-asset owner whose UI has enough drift consequence to justify the protection.

**Containment:**  
- protect only critical/stable states;
- mask or stabilize dynamic data;
- use controlled CI environments;
- treat visual diffs as evidence requiring review, not automatic proof of defect;
- avoid full-browser/mode matrices without demonstrated need;
- add Chromatic only when collaborative/cross-browser value exceeds snapshot cost.

## Decision type

**Conditional / progressive.**

The preferred progression is:

```text
Manual visual review
→ targeted Playwright visual assertions
→ Chromatic when shared-state volume/collaboration/cross-browser review earns it
```

This is not two visual-regression systems running everywhere.

## Decision

### Playwright visual comparisons — ADOPT CONDITIONALLY

Use when:
1. a visual state is stable enough to have a meaningful baseline; and
2. regression would materially affect a critical journey, responsive layout, brand-critical surface or Stable shared asset; and
3. the CI environment can be controlled.

Do not require screenshot coverage for every Local/Candidate component.

### Chromatic — DEFER, with a clear future adoption trigger

Adopt/Pilot later when:
- Storybook has been triggered under T017;
- enough Trial/Stable shared states exist to make centralized baselines valuable;
- designer/product review across PRs is recurring;
- cross-browser/theme/mode coverage is costly to manage manually;
- snapshot-based cost is acceptable relative to prevented rework/bugs.

## Tool-evaluation record

**Problem addressed:** Material unintended visual drift.  
**Decision it informs:** Whether UI changes are intentional and safe to release.  
**Evidence produced:** Screenshot baseline diffs for targeted stable states.  
**Reviewer:** Affected product/design/engineering owner.  
**When it runs:** Relevant UI changes and release evidence for protected states.  
**Action:** Accept intentional baseline change or fix regression.  
**Cost:** CI/storage/maintenance now; optional Chromatic snapshot spend later.  
**Data/security risk:** Test data and screenshots must not expose sensitive production information.  
**Replacement/exit:** Playwright baselines are repository-owned; Chromatic remains a replaceable higher-maturity service.

## Why not Chromatic now?

Chromatic's strongest advantages appear after T017's Storybook trigger and when the number of shared states/reviewers/browsers makes local screenshot management expensive.

Adopting it before that evidence would violate:
- progressive Design Foundation maturity;
- artifact-specific selective automation;
- loop-first observability;
- tool adoption only after capability need.

## Revisit triggers

Revisit the decision when:
- visual regressions escape repeatedly;
- shared Storybook states become numerous;
- manual baseline review consumes material time;
- cross-browser/theme defects recur;
- Playwright screenshot maintenance becomes more expensive than a hosted service.

## Final rule

> **Protect stable, high-value visual contracts first. Grow visual-regression tooling only when recurring drift costs more than the testing system.**

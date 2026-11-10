# T019 — Accessibility Automation

**Date:** 2026-09-26  
**Mode:** Choice / Direction Research  
**Status:** DECIDED — ADOPT CONDITIONALLY  
**Capability:** Cheap automated detection of common web accessibility violations  
**Decision owner:** Admonk Studio  
**Sources:** SRC-TOOL-A11Y-001, SRC-TOOL-A11Y-002

## Problem

R013 requires:
- WCAG 2.2 AA as the Production web engineering floor;
- manual critical-journey verification;
- automation only as supporting evidence.

Admonk therefore needs inexpensive automated checks that catch repeatable violations early without turning a numeric scanner score into accessibility truth.

## Direction A — axe-core in existing test surfaces

axe-core can run inside:
- Playwright through `@axe-core/playwright`;
- Storybook through the official accessibility addon;
- other web test environments directly.

### Strengths
- focused accessibility engine;
- supports WCAG 2.2 rules;
- fits existing component/browser testing;
- reports violations and incomplete/manual-review cases;
- can fail CI for selected known violations;
- avoids introducing a separate SaaS by default.

### Price
- automated detection is incomplete;
- teams can misconfigure/disable rules;
- each tested state must actually be rendered;
- CI checks still require manual accessibility evidence for critical journeys;
- broad scans can create noisy/non-actionable failures if applied indiscriminately.

## Direction B — Lighthouse accessibility audits

Lighthouse provides page-level accessibility audits and an accessibility score, alongside performance/SEO/best-practice audits.

### Strengths
- easy page-level smoke checks;
- broad web-quality utility;
- open source and CI-capable;
- useful for high-level regressions.

### Price
- the score excludes manual-only checks;
- a high score can be falsely interpreted as conformance;
- less targeted for component/state-specific accessibility behavior;
- score thresholds encourage metric gaming rather than critical-journey evidence.

## Decision Cost Ledger

**Benefit gained:**  
Cheap early detection of common accessibility violations within existing testing workflows.

**Price paid:**  
CI/configuration maintenance and manual verification still required.

**New problem introduced:**  
Risk that automation results become mistaken for the full accessibility baseline.

**Complexity cost:**  
Low when embedded into Playwright/Storybook already justified by T017/T018.

**Operating cost:**  
Low; primarily CI/runtime/maintenance rather than a required paid service.

**Speed cost:**  
Small for targeted critical/component checks.

**Governance cost:**  
Need explicit rule that automated pass != accessibility conformance.

**Who pays:**  
Web product engineering/design teams at Production/Trial/Stable maturity.

**Containment:**  
- use axe-core only on meaningful states/journeys;
- keep R013 manual checks mandatory;
- document rule suppressions/exceptions;
- use Lighthouse only as supplementary page smoke evidence;
- avoid universal scanner-score release thresholds.

## Decision type

**Conditional / layered.**

Automation is one layer of the R013 evidence model, not the whole accessibility program.

## Decision

### axe-core automation — ADOPT CONDITIONALLY

For Production web products:
- use axe-core through the test surface already justified by the product;
- Playwright is preferred for critical-journey/page accessibility checks;
- Storybook addon-a11y is preferred when T017 Storybook adoption has been triggered for Candidate/Trial/Stable components.

Do not install a separate accessibility automation stack merely to duplicate axe checks.

### Lighthouse accessibility — ADOPT AS SUPPLEMENTARY DIAGNOSTIC, NOT RELEASE AUTHORITY

Use when Lighthouse is already valuable for broader page-quality review or as a low-cost smoke check.

Do not use its accessibility score as:
- WCAG conformance proof;
- the sole release gate;
- a substitute for manual R013 verification.

## Tool-evaluation record

**Problem addressed:** Repeatable WCAG/accessibility violations that are cheap to detect automatically.  
**Decision it informs:** Whether the rendered state has known automated accessibility defects before manual review/release.  
**Evidence produced:** axe violations/incomplete results; optional Lighthouse page audit.  
**Reviewer:** Product/design/engineering owner.  
**When it runs:** Relevant component/journey CI and pre-release review.  
**Action:** Fix violation, document an explicit exception, or proceed to required manual verification.  
**Cost:** Low CI/runtime; no mandatory paid SaaS.  
**Data/security risk:** Use non-sensitive fixtures/test environments.  
**Replacement/exit:** axe-core is loosely coupled and can be swapped if another engine materially improves evidence/cost.

## Why not Adopt Now universally?

Because:
- non-web products need different tooling;
- Prototype work should not inherit full Production automation;
- R013 manual verification remains more important than adding scanners everywhere;
- Storybook-specific automation should only appear after T017's adoption trigger.

## Revisit triggers

Re-evaluate when:
- automated violations repeatedly escape due missing states;
- manual verification becomes the dominant accessibility cost;
- customer/compliance requirements demand a stronger audit platform;
- current axe integration becomes unreliable or insufficient;
- cross-product accessibility reporting becomes operationally valuable.

## Final rule

> **Automate the accessibility checks machines can prove cheaply; keep human verification for the interactions machines cannot prove.**

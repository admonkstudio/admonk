# FOUNDATION-M1 — Research & Population Work Queue

**Status:** Decision queue complete — retained as research history  
**Method:** `research/RESEARCH-OPERATING-PROTOCOL.md`

This queue tracks the decision-sized research work required to populate and lock the Studio Foundation.

## Priority 1 — Foundation doctrine

| Order | Artifact / decision | Mode | Status |
|---:|---|---|---|
| 1 | Product principles / product-definition doctrine | Document Population Research | LOCKED |
| 2 | Premium product-quality doctrine | Document Population Research | LOCKED |
| 3 | Engineering simplicity doctrine | Document Population Research | LOCKED |
| 4 | Security/privacy baseline doctrine | Document Population Research | LOCKED |
| 5 | AI autonomy/agent authority doctrine | Document Population Research | LOCKED |
| 6 | Operations / reliability / AI unit-economics doctrine | Document Population Research | LOCKED |

## Decision-cost checkpoint

Before FOUNDATION-M1 is locked:

| Item | Mode | Status |
|---|---|---|
| Retroactive decision-cost audit for R001–R006 | Decision Cost Review | ACCEPTED |

Purpose:
Re-test previously locked doctrine decisions under `research/DECISION-COST-FRAMEWORK.md` so earlier syntheses are not grandfathered past the new trade-off gate.

This is a focused audit, not a full re-research. Reopen a decision only when the newly explicit cost changes the conclusion.

## Priority 2 — Design Foundation

| Order | Artifact / decision | Mode | Status |
|---:|---|---|---|
| 7 | Shared vs product-specific design behavior | Document Population Research | LOCKED |
| 8 | Design-system maturity direction | Choice / Direction Research | LOCKED |
| 9 | Token architecture direction | Choice / Direction Research | LOCKED |
| 10 | Component promotion policy | Document Population Research | LOCKED |
| 11 | Design/code/Figma drift policy | Choice / Direction Research | LOCKED |

## Priority 3 — Standards / feedback loops

| Order | Artifact / decision | Mode | Status |
|---:|---|---|---|
| 12 | Minimum production feedback loops | Document Population Research | LOCKED |
| 13 | Accessibility baseline | Document Population Research | LOCKED |
| 14 | Testing / release-evidence baseline | Document Population Research | LOCKED |
| 15 | Product analytics feedback loop | Choice / Direction Research | LOCKED |
| 16 | AI evaluation / regression baseline | Document Population Research | LOCKED |

## Priority 4 — Tool decisions

Tool choices begin only after the corresponding capability need is evidenced.

| Order | Tool capability decision | Mode | Status |
|---:|---|---|---|
| 17 | Component workbench / documentation | Choice / Direction Research | DECIDED — ADOPT CONDITIONALLY (Storybook) |
| 18 | Visual regression | Choice / Direction Research | DECIDED — ADOPT CONDITIONALLY (targeted Playwright; Chromatic deferred) |
| 19 | Accessibility automation | Choice / Direction Research | DECIDED — ADOPT CONDITIONALLY (axe-core; Lighthouse supplementary) |
| 20 | Secret scanning | Choice / Direction Research | DECIDED — ADOPT CONDITIONALLY (GitHub preferred; Gitleaks fallback) |
| 21 | Static analysis | Choice / Direction Research | DECIDED — LAYERED (native checks now; CodeQL conditional; Semgrep targeted fallback) |
| 22 | Dependency / supply-chain checks | Choice / Direction Research | DECIDED — LAYERED (Dependabot baseline; Socket conditional pilot) |
| 23 | API contract validation | Choice / Direction Research | DECIDED — PROGRESSIVE (OpenAPI/Redocly conditional; Pact deferred) |
| 24 | Migration validation | Choice / Direction Research | DECIDED — native migration system + CI replay/invariant validation; staged rehearsal for risky changes |
| 25 | Error monitoring | Choice / Direction Research | DECIDED — Better Stack from the beginning, capabilities enabled proportionally |
| 26 | Feature flags | Choice / Direction Research | DECIDED — PostHog + OpenFeature; use only when risk/learning justifies flags |
| 27 | AI evaluation / tracing | Choice / Direction Research | DECIDED — Langfuse + portable/OpenTelemetry-style tracing where practical |
| 28 | Model / token cost monitoring | Choice / Direction Research | DECIDED — Langfuse operational attribution + provider billing reconciliation |

Each ends in:
Adopt now / Adopt conditionally / Pilot / Defer / Reject.

## Q1 rule

Owner questions are inserted only when the decision depends on:
- Admonk strategic preference;
- acceptable risk;
- commercial positioning;
- desired product behavior;
- subjective design/experience direction;
- budget/time trade-off not resolvable from evidence.

Only one directional Q1 should be active at a time unless multiple answers are truly independent.

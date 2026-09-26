# R014 — Testing / Release-Evidence Baseline

**Date:** 2026-09-26
**Mode:** Document Population Research
**Status:** Awaiting product-owner Q1 + cost acceptance
**Target:** Product Supervisor release evidence, future testing/release standard, release-audit template

## Research question

What minimum testing and release evidence should Admonk require before shipping, so releases are genuinely verified without forcing every product/change through the same test pyramid, coverage target, or enterprise QA process?

## Source A — Google: How Much Testing is Enough?

**Source:** SRC-TEST-001

Google's guidance explicitly rejects one universal answer to "how much testing is enough." It recommends a documented strategy suited to the software, with:
- a strong base of unit tests;
- meaningful integration testing;
- end-to-end testing for Critical User Journeys;
- other test types such as performance/load/fault tolerance where relevant;
- understanding both code and functional coverage.

### What it optimizes for

**Broad confidence through multiple test levels, proportionate to product context.**

### Strongest ideas for Admonk

- release qualification should be intentional rather than ad hoc;
- integration tests should not be skipped just because E2E tests exist;
- critical user journeys deserve end-to-end evidence;
- lower-level tests usually give faster/more reliable feedback than relying on a large E2E suite;
- test depth should vary by product consequence and context;
- functional coverage matters in addition to code coverage.

### Challenge

Copied literally, this can:
- turn into a generic pyramid quota;
- create large test inventories with weak connection to actual release risk;
- encourage coverage metrics as a proxy for confidence;
- over-test stable/low-risk code while under-testing migrations, permissions or recovery;
- still leave the release decision disconnected from the exact change being shipped.

Google's guidance is strongest as the **multi-layer test portfolio model**.

## Source B — Playwright Best Practices

**Source:** SRC-TEST-002

Playwright emphasizes:
- test user-visible behavior;
- avoid implementation-detail assertions;
- isolate tests;
- control test data;
- avoid depending directly on third-party systems you do not control;
- use stable user-facing contracts and resilient locators.

### What it optimizes for

**High-value, resilient verification of real user behavior.**

### Strongest ideas for Admonk

- critical tests should prove what users can actually do;
- isolation reduces flakiness and cascading failures;
- test environments/data should be controlled;
- automation should target stable contracts rather than implementation trivia;
- browser tests are especially valuable for complete-state and accessibility-adjacent journey verification;
- third-party integrations should be tested at Admonk-owned boundaries rather than making the whole suite depend on external volatility.

### Challenge

Copied literally as the overall strategy, browser-first testing can:
- become slow and expensive;
- miss lower-level logic/edge cases that are cheaper to verify below the browser;
- under-test database migrations, permissions, recovery and release integrity;
- create false confidence if only happy-path user journeys are automated;
- still require separate evidence for security, performance, accessibility and AI quality.

Playwright is strongest as the **critical user-behavior evidence model**, not the entire release baseline.

## Release-integrity constraint — NIST SSDF

**Source:** SRC-TEST-003

NIST SSDF adds an important boundary:
release evidence is not only "tests passed."

Where relevant, release integrity and delivery should be verifiable as well.

Admonk should therefore separate:
- product/behavior verification;
- change/migration verification;
- release-artifact/deployment integrity.

Do not interpret this as a requirement for heavyweight signing/provenance infrastructure on every Prototype. The exact controls remain risk/maturity dependent.

## Core finding

The baseline should be **change/risk routed**, not based on a fixed test count or universal coverage percentage.

The release question is:

> **What could this change break, what evidence proves the important things still work, and what evidence proves we can recover if it does not?**

## Proposed Admonk release-evidence model

### 1. Critical user journey evidence

For Production:
- primary user journeys must have meaningful verification;
- critical/consequential flows should be tested end-to-end at the highest useful layer;
- complete relevant states, not only happy path;
- use manual evidence where automation is not yet economical.

Automate repeated stable journeys when automation cost is justified.

### 2. Boundary/integration evidence

Test integrations at boundaries where failure would matter:
- database reads/writes;
- external APIs/connectors;
- auth/authorization;
- queues/jobs;
- file/storage boundaries;
- product-to-product contracts;
- tenant isolation.

Prefer controlled fixtures/mocks for third-party instability, plus targeted real integration verification where the boundary itself must be proven.

### 3. Logic evidence

Use unit/component tests where they provide the cheapest reliable proof for:
- complex business rules;
- calculations;
- transformations;
- parsers/validators;
- permission decisions;
- deterministic utilities.

Do not create unit tests merely to increase a percentage.

### 4. Change-specific evidence

A release should test the risks introduced by the actual change.

Examples:
- schema change → migration + rollback/recovery evidence;
- permission change → authorization tests;
- shared component change → affected consumer/state evidence;
- connector change → contract/error/retry evidence;
- performance-sensitive change → measured critical-route performance evidence;
- accessibility-affecting change → R013 evidence;
- AI behavior change → R016 evaluation/regression evidence.

### 5. Release/recovery evidence

Before Production release, know:
- what version/change is being deployed;
- what checks passed;
- what known gaps/exceptions remain;
- how to detect failure;
- how to rollback/recover;
- who owns the release/incident response;
- whether migrations/data changes are reversible or recoverable.

### 6. Test reliability rule

A flaky test is degraded evidence.

Repeatedly flaky tests must be:
- fixed;
- quarantined with owner/deadline;
- replaced with a more reliable form of evidence.

Do not normalize routinely ignored red CI.

### 7. Coverage rule

No universal code-coverage percentage.

Coverage is evidence only when it answers:
- which important behaviors are verified?
- which important branches/risks remain unverified?

A high percentage does not compensate for an untested critical journey.

## Minimum release evidence bundle

For a material Production change:

1. **Change** — what changed?
2. **Risk** — what can materially fail?
3. **Evidence** — which tests/reviews/measurements prove the important requirements?
4. **Critical journey impact** — which primary flows were verified?
5. **Specialist evidence** — security/accessibility/data/performance/AI where relevant.
6. **Known gaps/exceptions** — explicit and owned.
7. **Recovery** — rollback/restore/mitigation path.
8. **Release owner** — accountable person/system owner.
9. **Post-release verification** — what signal proves the release is healthy?

This is an evidence bundle, not necessarily a new document for every tiny change. Existing CI, PR, release audit and Evidence Index may satisfy it when traceable.

## Decision Cost Ledger

**Benefit gained:**  
Testing effort follows actual product/change risk and every material release has traceable proof.

**Problem solved:**  
Avoids both under-testing and a universal test bureaucracy.

**New problem introduced:**  
Someone must classify release risk and choose sufficient evidence.

**Complexity / operating cost:**  
Moderate for material Production changes; low for simple changes.

**Speed cost:**  
Low for low-risk changes, moderate for consequential/data/shared-foundation changes.

**Governance / cognitive cost:**  
Moderate. Teams/agents must reason about what evidence proves the actual change.

**Reliability cost:**  
Some low-risk internals may have less automated coverage than a blanket high-coverage regime.

**Economic cost:**  
Lower total test-suite maintenance than "test everything"; some later automation/refactoring accepted when repeated manual verification becomes costly.

**AI/token/tool cost:**  
Potentially positive: evidence maps can focus AI testing/review instead of generating broad low-value suites. Test execution still has compute/tool cost.

**Who pays:**  
The change owner pays the evidence cost proportional to the risk introduced.

**When cost appears:**  
Before release, and later when repeated manual evidence justifies automation.

**Containment:**
- maintain critical-journey inventory;
- route tests by change/risk;
- use stable test boundaries;
- quarantine/fix flaky evidence;
- preserve release recovery paths;
- automate recurring high-value evidence first;
- no arbitrary coverage target.

**Revisit trigger:**
- escaped defects repeatedly come from under-tested areas;
- manual release evidence becomes a bottleneck;
- flaky suites erode trust;
- release frequency/consumer count rises;
- customer/regulatory evidence requirements increase.

## Synthesis Compatibility Check

**Decision type:** Conditional / risk-routed.

We are not combining "every layer of testing" with "E2E everything."

Instead:
- lower-level tests are used where they are cheapest reliable evidence;
- end-to-end tests protect critical user journeys;
- specialist evidence is added only when the change/risk demands it;
- release/recovery evidence completes the decision.

We do not require:
- 100% coverage;
- a fixed unit/integration/E2E ratio;
- every browser test against live third-party services;
- a complete automated suite for every Prototype;
- the same release evidence for a copy change and a tenant-permission migration.

## Proposed rule

> **Test the risk, prove the critical journey, verify the change, and preserve recovery. Release confidence comes from relevant evidence—not test volume.**

## Q1 — testing/release-evidence direction + price acceptance

### A. Standardized broad test pyramid
Require a consistent baseline of unit + integration + end-to-end suites and a common coverage target for every Production product.

**Benefit:** simple governance and broad automated coverage.
**Price:** higher suite-maintenance cost and substantial low-value testing in products/changes with different risk profiles.

### B. Risk-routed evidence baseline — RECOMMENDED
Require critical-journey evidence, boundary tests where failure matters, lower-level tests where they are the cheapest proof, specialist evidence according to change risk, and explicit recovery/post-release verification. No universal coverage percentage.

**Benefit:** high-value proof with testing cost proportional to risk.
**Price:** requires disciplined risk/evidence judgment and accepts less uniform automated coverage.

### C. Critical-journey E2E first
Focus most automated testing on primary browser/user workflows; add other tests only after defects expose gaps.

**Benefit:** fastest path to user-visible confidence.
**Price:** slower/flakier suites and higher risk of missing lower-level/data/permission/recovery failures.

## Research recommendation

**B — Risk-routed evidence baseline.**

Explicit price:
> **Admonk accepts some uneven automated coverage and moderate judgment at release time so it can spend testing effort where failure consequence and evidence value are highest rather than maintaining a universal test bureaucracy.**

## Lock plan after Q1

If B and its price are accepted:
1. lock R014;
2. promote the minimum release-evidence bundle into Product Supervisor/release governance;
3. update the release-audit template;
4. preserve tool/framework selection for Priority 4;
5. keep AI evaluation specifics for R016;
6. move to R015 — Product Analytics Feedback Loop.

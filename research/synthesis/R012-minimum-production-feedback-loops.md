# R012 — Minimum Production Feedback Loops

**Date:** 2026-09-26  
**Mode:** Document Population Research  
**Status:** Awaiting product-owner Q1 + cost acceptance  
**Target:** `research/feedback-loops.md`, future production feedback-loop standard, Product Supervisor release/operate expectations

## Research question

What is the smallest production feedback system every Admonk product should have so the team can detect failure, understand it, learn from real usage and control AI economics—without paying for enterprise observability before the product needs it?

## Source A — Google SRE: Monitoring Distributed Systems

**Source:** SRC-FDBK-001

Google SRE emphasizes:
- user-visible symptoms;
- black-box and white-box monitoring;
- four golden signals: latency, traffic, errors, saturation;
- low-noise, actionable alerts;
- simplicity in the critical monitoring path;
- removing signals that are collected but never used.

### What it optimizes for

**Actionable operational awareness with low noise.**

### Strongest ideas for Admonk

- alerts should correspond to something a human can and should act on;
- user-visible failure matters more than internal weirdness;
- monitoring systems themselves have significant engineering/maintenance cost;
- the critical path from failure → signal → human → action should stay simple;
- not every possible signal deserves collection;
- dashboards with no decision/action loop are waste.

### Challenge

Copied literally, a narrow SRE model can:
- detect that something is broken without enough rich context to diagnose novel failures quickly;
- focus on service health while under-measuring product outcome;
- ignore AI-quality degradation that still returns HTTP 200;
- ignore unit economics;
- under-observe asynchronous/agent workflows whose failure is not a simple request error.

Google SRE is strongest as the **actionability/simplicity gate**.

## Source B — OpenTelemetry

**Source:** SRC-FDBK-002

OpenTelemetry supports vendor-neutral instrumentation and collection across:
- traces;
- metrics;
- logs;
- baggage/context.

Different signals answer different operational questions and can be correlated.

### What it optimizes for

**Rich, portable observability and diagnostic context.**

### Strongest ideas for Admonk

- instrumentation should not be permanently coupled to one observability vendor;
- traces, metrics and logs expose different aspects of system behavior;
- correlation can shorten diagnosis;
- instrumentation can grow with system complexity;
- common conventions make future multi-service observability easier;
- a vendor-neutral layer creates a deliberate change seam.

### Challenge

Copied literally, "instrument everything" can:
- create a telemetry data swamp;
- increase storage/vendor cost;
- create high-cardinality cost and operational burden;
- make teams feel observable while nobody owns a response loop;
- impose distributed-system machinery on a simple product;
- increase AI/tooling context and monitoring noise.

OpenTelemetry is strongest as the **instrumentation/diagnostic capability model**, not as the decision model.

## Existing Admonk constraints

R012 inherits already-approved doctrine:

- Product quality requires proof rather than claims.
- Operations doctrine requires reliability + recovery + AI unit economics.
- AI economics uses **cost per successful outcome** plus user/tenant/plan ceilings.
- Product Supervisor says **observe after launch; scale only from evidence**.
- Instrumentation with no owner/decision/action is already defined as an anti-pattern.

Therefore R012 should not re-decide those principles. It must define the minimum production loop that implements them.

## Core finding

The minimum should be designed around **closed decision loops**, not around buying/collecting every observability signal.

The correct question is not:
> "Do we have logs, metrics and traces?"

It is:
> "If this product fails, degrades, wastes money, or stops delivering value, what signal exposes it, who reviews it, and what action follows?"

## Proposed minimum production loop set

Every Production product should have the following loops where applicable.

### Loop 1 — Critical journey health

**Question:** Is the product working for users?

Minimum evidence for the primary journey:
- success/failure;
- latency/duration where meaningful;
- traffic/usage volume;
- basic capacity/saturation only where it can become limiting.

For asynchronous/agent workflows, "success" must reflect workflow completion/outcome rather than only an HTTP response.

**Action:** urgent user-visible failures have an owner and response path.

### Loop 2 — Failure diagnosis

**Question:** Why did it fail?

Minimum:
- structured error/event capture;
- enough context to identify affected feature/workflow/version/environment;
- request/run/job correlation where useful;
- sensitive data excluded/minimized appropriately.

Full distributed tracing is **not** universally required.

Add richer traces/log correlation when repeated diagnosis pain proves it worthwhile.

### Loop 3 — Change and recovery

**Question:** Did a release/configuration/migration make things worse, and can we recover?

Minimum:
- deployed version/change identifiable;
- material failures can be correlated to recent changes;
- practical rollback/recovery path;
- recovery result verified.

This closes:
`change → evidence → rollback/fix → health confirmation`

### Loop 4 — Product outcome

**Question:** Is the product delivering the intended core value?

At minimum, Production should expose one measurable signal for the primary successful outcome or a documented reason measurement is currently qualitative/manual.

Examples:
- completed verified workflow;
- resolved support case;
- accepted generated brief;
- approved analysis.

R015 will define the richer product-analytics model later.

### Loop 5 — Economic loop for AI/usage-driven products

**Question:** Can we afford the value being delivered?

For AI-native or variable-cost capabilities:
- usage/model/tool cost;
- failed/retried-run cost where material;
- cost per successful outcome;
- cost per active user/tenant/plan against approved ceilings;
- action when a limit/anomaly is breached.

### Loop 6 — Incident/review learning

**Question:** Did we learn enough to prevent recurrence or improve the operating model?

For material failures:
- owner;
- incident/evidence record proportional to impact;
- remediation/decision;
- recurrence verification.

Do not require a heavyweight postmortem for every minor defect.

## Minimum loop contract

Every production feedback loop must answer:

1. **Signal:** What observation/evidence exposes the condition?
2. **Owner:** Who is accountable for reviewing/responding?
3. **Trigger/cadence:** What threshold, event or review timing makes it actionable?
4. **Decision:** What decision can this evidence change?
5. **Action:** What happens when the trigger is met?
6. **Verification:** What proves the corrective action worked?
7. **Cost:** What does collecting/reviewing this evidence cost?

If a signal has no plausible decision/action, remove or defer it.

## Alerting rule

Only page/push urgent interruption when:
- user/business impact is material or imminent;
- action is required soon;
- the receiver can take meaningful action.

Everything else may be:
- ticketed;
- reviewed periodically;
- queried on demand;
- retained only for diagnosis.

Do not make every anomaly an alert.

## Observability maturity

### Prototype
- basic error visibility;
- enough AI/cost visibility to prevent runaway spend;
- no full production telemetry baseline required.

### Production — minimum
- critical journey health;
- actionable error capture;
- deploy/change correlation;
- recovery verification;
- core outcome evidence;
- AI economics where applicable;
- named owners.

### Production — add when evidence demands
- traces;
- deeper log correlation;
- service maps;
- broader SLOs;
- higher-cardinality diagnostics;
- visualized multi-service dependencies;
- continuous profiling.

### High-risk / high-scale
Escalate observability and response depth according to consequence and complexity.

## Decision options

### A. Broad observability baseline
Require metrics + logs + traces + dashboards + product analytics + cost monitoring for every Production product from day one.

**Benefit:** rich data immediately.  
**Price:** higher infrastructure, storage, vendor, maintenance and cognitive cost; substantial risk of unused telemetry.

### B. Loop-first minimum + evidence-triggered observability — RECOMMENDED
Require the six decision loops above, but collect only the smallest signals needed to close them. Add traces/deeper telemetry only after complexity, incidents or diagnosis cost justify them.

**Benefit:** every required signal has an owner/action while operational cost stays proportional.  
**Price:** early incidents may sometimes take longer to diagnose, and richer instrumentation may need to be added later.

### C. Critical-failure-only
Require uptime/error monitoring and a recovery owner; defer product outcome and economic feedback until the product matures.

**Benefit:** cheapest production operations initially.  
**Price:** a product can remain technically "up" while delivering poor outcomes or economically unsustainable AI usage.

## Decision type

**Conditional / progressive.**

This is not a compromise that runs a minimal stack and a full observability stack simultaneously.

It selects B now:
- loop-first baseline at Production;
- richer telemetry only when an evidence trigger is crossed.

## Decision Cost Ledger — Option B

**Benefit gained:**  
Production cannot be "blind" in the areas that matter, while telemetry remains economically proportional.

**Problem solved:**  
Avoids both no-feedback production and instrumentation-without-action.

**New problem introduced:**  
Some unanticipated failures may lack ideal diagnostic data during early production.

**Complexity / operating cost:**  
Low/Moderate baseline; grows with observed need.

**Speed cost:**  
Low at launch; some later instrumentation retrofits are accepted.

**Governance / cognitive cost:**  
Moderate: each loop needs an owner/trigger/action.

**Reliability cost:**  
Potentially slower root-cause analysis for failures not covered by initial signals.

**Economic cost:**  
Lower telemetry/tool spend initially; possible later migration/instrumentation cost.

**AI/token/tool cost:**  
Positive overall because collection/analysis automation is bounded by real decisions rather than "collect everything."

**Who pays:**  
Product owner defines outcome/economic triggers; engineering/operations maintain health/diagnostic/recovery signals.

**When cost appears:**  
During novel incidents, system growth, or transition to multiple services.

**Containment:**  
- preserve instrumentability/change seams;
- structured events from the beginning;
- version/environment/run identifiers;
- add richer signals after repeated diagnosis pain;
- review missing evidence after material incidents.

**Revisit trigger:**  
- diagnosis repeatedly requires unavailable data;
- incident time-to-resolution becomes material;
- distributed architecture increases;
- cross-service failures recur;
- telemetry retrofit cost starts exceeding earlier savings;
- regulatory/customer requirements demand stronger evidence.

## Synthesis Compatibility Check

**Decision type:** Conditional/progressive, not true hybrid.

We deliberately do **not** require:
- full traces for every app;
- all signals for every service;
- a specific observability vendor;
- dashboards without an owner;
- paging on non-actionable anomalies.

OpenTelemetry remains a likely interoperability direction when richer instrumentation becomes justified, not an automatic toolchain mandate.

## Proposed rule

> **Instrument decisions, not curiosity. Every production product must be able to detect material failure, diagnose enough to act, verify recovery, observe its core outcome, and control variable AI cost. Richer observability is earned by operational evidence.**

## Q1 — production feedback-loop cost acceptance

Which direction should Admonk lock?

### A. Broad observability baseline
Collect rich telemetry from day one for every Production product.

**Price:** higher recurring data/tool/maintenance cost in exchange for stronger early diagnosis.

### B. Loop-first minimum + evidence-triggered observability — RECOMMENDED
Require the minimum closed loops above, keep collection/action explicit, and add richer telemetry only when real failure/complexity proves it worthwhile.

**Price:** accept some slower diagnosis and later instrumentation work in exchange for lower operating cost and less telemetry noise now.

### C. Critical-failure-only
Start with uptime/errors/recovery; defer product outcome and economics.

**Price:** cheapest initial operations but unacceptable blind spots for AI-native/commercial products.

## Research recommendation

**B — Loop-first minimum + evidence-triggered observability.**

Accepted price if chosen:
> **Admonk accepts occasional later instrumentation retrofits and potentially slower diagnosis of novel early-production failures so it does not permanently pay to collect and operate telemetry that has no decision value.**

## Lock plan after Q1

If B and its price are accepted:
1. lock R012;
2. promote the minimum loop contract into production governance;
3. update `research/feedback-loops.md`;
4. update Product Supervisor Production expectations/release audit as needed;
5. keep specific observability vendors/tools for Priority 4 decisions;
6. move to R013 — Accessibility Baseline.

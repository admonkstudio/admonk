# R015 — Product Analytics Feedback Loop

**Date:** 2026-09-26
**Mode:** Choice / Direction Research
**Status:** Awaiting product-owner Q1 + cost acceptance
**Target:** Product analytics operating model and Product Supervisor PS-6/PS-7 expectations

## Research question

How should Admonk structure product analytics so metrics guide product decisions without creating a dashboard or instrumentation bureaucracy?

## Source A — Amplitude North Star Framework

**Source:** SRC-ANALYTICS-001

Amplitude defines one primary North Star Metric that represents user value, is influenceable by product/marketing, and leads longer-term business outcomes.

**Strengths for Admonk**
- outcome focus rather than shipping volume;
- simple strategic alignment;
- supporting metrics remain subordinate to user value.

**Challenge**
A single metric can oversimplify multi-module products, hide quality/cost trade-offs, and become a slogan if it is not connected to decisions.

Amplitude is strongest as the **focus layer**.

## Source B — Mixpanel Metric Trees

**Source:** SRC-ANALYTICS-002

Mixpanel connects a top-level focus metric to lower-level drivers. Its current guidance also emphasizes metric owners, experiment/report links, definition governance, action logs, and retiring stale metrics.

**Strengths for Admonk**
- drivers explain what may be moving the outcome;
- owners and definitions improve trust;
- decision/action logs turn analytics into organizational learning;
- deeper hierarchy helps complex products.

**Challenge**
A full metric tree can create too many events/metrics too early, imply causality from correlation, and increase analytics cost and privacy surface.

Mixpanel is strongest as the **driver/diagnostic layer**.

## Existing Admonk constraints

R015 inherits:
- evidence before certainty;
- closed feedback loops from R012;
- AI economics from R006;
- purpose-limited data collection from security/privacy doctrine.

Therefore:

> **Product analytics is not permission to measure everything users do.**

## Core finding

Use a **progressive analytics model**:

1. one primary product-value outcome;
2. a small set of controllable drivers;
3. guardrails for quality, trust, reliability and economics;
4. deeper metric-tree structure only when recurring decisions or product complexity earn it.

This is staged, not a full North-Star-plus-full-tree hybrid.

## Proposed model

### Primary outcome
Every Production product defines one primary measurable signal of delivered user value.

It is product-specific and is not automatically revenue, DAU, sessions or clicks.

### Small driver set
Start with only the drivers needed for current decisions, such as activation, completion, repeat value, friction/drop-off or strategically relevant adoption.

### Guardrails
Improving the outcome must not silently damage:
- product quality;
- accessibility;
- reliability;
- trust/safety;
- AI unit economics;
- support burden;
- privacy.

### Deeper analytics only when earned
Expand the metric hierarchy when:
- teams repeatedly cannot explain outcome movement;
- multiple modules create distinct value loops;
- recurring decisions require deeper drivers;
- segmentation becomes strategically important.

### Qualitative/context evidence
Metrics show behavior but do not automatically explain motive. Use user feedback, support evidence, research or other contextual evidence when a decision needs the "why."

## Feedback loop

**Outcome → observed movement → driver/segment investigation → hypothesis → decision/action → release/experiment → re-measure outcome and guardrails → keep/revise/reverse**

A dashboard without this loop is insufficient.

## Metric contract

A governed metric should record:
- name and product question;
- precise definition;
- event/data source;
- population/segment;
- owner;
- role: outcome / driver / guardrail;
- decision/action it may change;
- review trigger/cadence;
- known limitations;
- data-retention/privacy considerations;
- last definition change.

## Instrumentation rule

Instrument the minimum events required for current validated questions.

Add events when a real decision, release verification, funnel gap or recurring ambiguity needs them.

Do not preserve instrumentation merely because it is easy to collect.

## Decision Cost Ledger

**Benefit:** clear focus now with a path to deeper analysis later.

**Price:** some early analytical blind spots and later instrumentation/definition migration.

**New problem:** metric and driver selection require judgment.

**Operating cost:** low initially; grows with proven need.

**Governance cost:** moderate; metrics need owners and stable definitions.

**Privacy/economic cost:** lower than collect-everything analytics.

**Containment:** small initial metric set, explicit correlation-vs-causality labels, guardrails, owner, stale-metric removal, decision log.

**Revisit when:** one outcome creates trade-off disputes, modules diverge, teams cannot explain movement, segmentation becomes critical, or analytics cost grows disproportionately.

## Decision options

### A. North Star + minimal support
One primary outcome plus only a few supporting metrics.

**Benefit:** simplest.
**Price:** weak diagnostics as products become complex.

### B. Progressive outcome tree — RECOMMENDED
Start with one primary outcome, a small driver set and guardrails. Expand the hierarchy only when recurring decisions or complexity justify it.

**Benefit:** focus without premature analytics sprawl.
**Price:** accepts early blind spots and later migration.

### C. Full metric tree from Production launch
Map outcome and several driver levels immediately.

**Benefit:** strongest early analytical structure.
**Price:** highest instrumentation/governance cost and risk of modeling unproven relationships.

## Research recommendation

**B — Progressive outcome tree.**

> **Admonk accepts some early analytical blind spots and later instrumentation work so analytics complexity grows from real product decisions rather than from the desire to measure everything.**

## Lock plan after Q1

If B and its price are accepted:
1. lock R015;
2. add the metric contract and progressive outcome-tree rule to `research/feedback-loops.md`;
3. align Product Supervisor PS-6/PS-7;
4. defer analytics vendor/tool choice to Priority 4;
5. move to R016 — AI Evaluation / Regression Baseline.

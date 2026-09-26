# R006 — Operations, Reliability & AI Unit Economics

**Date:** 2026-09-26  
**Mode:** Document Population Research  
**Status:** Awaiting product-owner Q1  
**Target:** future `doctrine/operations-principles.md`, production feedback-loop standard, AI economics standard

## Research question

How should Admonk operate AI-native products so they are reliable enough to trust and economically viable enough to sell, without overbuilding enterprise operations before real usage exists?

Product-owner direction added before research:

> **AI/token/tool usage must remain economically viable at the user and outcome level. An AI-native product that costs too much per user or successful outcome is not a successful product.**

## Source A — Google SRE: SLOs and error budgets

**Source:** SRC-OPS-001

### What it optimizes for

Reliability based on user impact rather than abstract perfection.

Google SRE uses:
- service-level indicators;
- service-level objectives;
- error budgets;
- policies that change engineering priorities when reliability is outside the accepted range.

A key idea is that 100% reliability is usually the wrong target because reliability has an opportunity cost. The SLO/error-budget system is useful only when it actually changes decisions.

### Strongest ideas for Admonk

- operations metrics should drive action, not exist as dashboards;
- user-impact reliability should determine where engineering time goes;
- reliability should have an explicit owner;
- products need a pre-agreed response when reliability falls below the accepted level;
- reliability investment should be proportional rather than infinite;
- production evidence should determine when reliability work outranks feature work.

### Challenge

Copied literally, mature SRE practice can:
- introduce SLO/error-budget ceremony before the product has meaningful traffic;
- optimize availability while ignoring whether the product is economically sustainable;
- require instrumentation/process that may be disproportionate for low-risk pilots;
- focus heavily on service reliability rather than AI quality, agent loops, model/tool cost and business outcome.

Google SRE is strongest as the **reliability decision-loop model**, not the full operating doctrine for an AI-native product.

## Source B — FinOps Foundation: Unit Economics / FinOps for AI

**Source:** SRC-OPS-002

### What it optimizes for

Connecting technology/AI consumption to business value.

Current FinOps guidance for AI emphasizes that:
- token usage is a useful atomic consumption signal but not a sufficient business metric;
- unit economics should progress toward outcome-oriented measures;
- useful examples include cost per assist, agent action, successful outcome, transaction, user/month or case resolved;
- failed/discarded runs are still cost;
- AI costs are volatile enough to require attribution, frequent review and usage optimization;
- optimization should still meet functional and non-functional requirements.

### Strongest ideas for Admonk

- token cost must be visible, attributable and actionable;
- cost must be measured where consumption occurs;
- AI products should know cost by tenant/product/agent/feature/user;
- cost per successful outcome is more meaningful than token count alone;
- failed retries/agent loops must appear in unit economics rather than disappearing inside a provider invoice;
- model/tool choices should be reviewed against value and quality;
- economic feedback should influence architecture and product decisions.

### Challenge

Copied literally, FinOps can:
- over-focus engineering on spend before product-market value is proven;
- optimize token count while degrading outcome quality;
- create sophisticated dashboards before there is enough usage to justify them;
- make teams chase immature external benchmarks;
- underweight trust, reliability and user experience if cost becomes the only target.

FinOps is strongest as the **economic decision-loop model**, not the full product-quality/reliability doctrine.

## Synthesis

The two approaches optimize different scarce resources.

Google SRE asks:
> **How much unreliability can the product tolerate before engineering priorities must change?**

FinOps asks:
> **How much technology/AI consumption can the product tolerate before the economics stop making sense?**

Admonk needs both.

A production AI product should always be able to answer four questions:

1. **Is it working?** — correctness/reliability.
2. **Is it valuable?** — product/business outcome.
3. **Is it affordable?** — unit economics.
4. **Can we recover?** — operational resilience.

## Proposed Admonk operations/economics doctrine

### 1. Cost is a product property

AI/model/tool cost is not only a finance concern.

It affects:
- architecture;
- model routing;
- agent design;
- context size;
- retries;
- background work;
- pricing;
- packaging;
- gross margin;
- scale viability.

If the product cannot create enough value at a sustainable unit cost, the feature/product must be redesigned, repriced, limited or removed.

### 2. Tokens are telemetry, not success

Track token usage because it is a major AI cost driver.

But do not optimize raw token count blindly.

Preferred hierarchy:

```text
Raw usage
tokens / model calls / tool calls
        ↓
Unit consumption
cost per user / task / agent action
        ↓
Outcome economics
cost per successful outcome
        ↓
Business economics
price / value / margin / ROI
```

The goal is:
**approved quality + desired outcome at the lowest sustainable unit cost.**

### 3. Failed work counts

Include:
- retries;
- failed agent loops;
- discarded outputs;
- unnecessary tool calls;
- abandoned generations;
- fallback-model cascades

in the real cost of the workflow.

Do not calculate "cost per successful outcome" by ignoring failed attempts.

### 4. Attribute before optimizing

Production AI usage should become attributable, at the level justified by maturity, across:
- tenant;
- product/module;
- agent;
- feature/workflow;
- model/provider;
- tool/connector;
- user or plan where commercially useful.

Without attribution, optimization becomes guesswork.

### 5. Budget envelopes

AI/agent workflows should support explicit economic limits when the risk of runaway consumption is material.

Examples:
- per request/workflow;
- per agent run;
- per user/day or month;
- per tenant;
- per plan;
- background-job budgets;
- retry/tool-call ceilings.

Limits should fail safely and communicate clearly.

### 6. Model/tool routing follows value

Do not use the most capable/expensive model for every step.

Route by:
- required quality;
- reasoning difficulty;
- latency;
- context sensitivity;
- tool need;
- privacy;
- measured success;
- cost.

Use cheaper/deterministic methods when they meet the approved quality floor.

### 7. Reliability and economics are both operating budgets

For critical production journeys:

**Reliability budget**
determines how much failure/degradation is acceptable before reliability work takes priority.

**Economic budget**
determines how much unit-cost degradation is acceptable before optimization, routing, scope or pricing must change.

Neither budget should be a passive dashboard.

Both should have:
- owner;
- threshold;
- action when breached;
- review cadence;
- evidence.

### 8. Maturity-proportional operations

Prototype:
- basic error visibility;
- usage/cost visibility sufficient to detect runaway AI behavior;
- hard limits where failure could create material spend;
- no enterprise observability platform required by default.

Production:
- critical journey monitoring;
- error tracking;
- recoverable deployment/data path;
- AI usage/cost attribution;
- anomaly/budget alerts;
- operational owner;
- outcome/quality metrics.

High-risk / high-scale:
- stronger SLOs;
- incident procedures;
- tested recovery;
- capacity/cost forecasting;
- tighter policy/limits;
- richer traces where justified.

### 9. Optimize from evidence

Optimize when evidence shows:
- unit cost threatens pricing/margin;
- cost scales faster than value;
- retries/tool loops are wasteful;
- a smaller model meets the quality floor;
- caching/batching/context reduction is safe;
- background work produces little user value;
- a provider or architecture change has a credible payback.

Do not optimize merely because a token count looks large.

### 10. Economics feeds product scope

A capability with attractive demo value but poor unit economics may need:
- narrower scope;
- lower frequency;
- user-triggered instead of background execution;
- cheaper routing;
- plan limits;
- premium packaging;
- redesign;
- defer/reject.

Economic viability is part of product definition, not only post-launch optimization.

## Proposed definition

> **Operate for user value within two explicit constraints: enough reliability to trust the product and low enough unit cost to sustain the business.**

## Special rule for AI-native products

Every meaningful AI/agent capability should eventually expose at least:

- quality/success measure;
- total usage/cost;
- cost per successful outcome;
- cost per active user or commercially relevant unit;
- failed/retried-run cost;
- budget/limit behavior.

Raw tokens remain diagnostic telemetry beneath those unit metrics.

## Q1 required

Which economic metric should be the **primary product-level guardrail** for Admonk's AI products?

### A. Cost per active user / month
Make per-user monthly AI operating cost the primary metric.

**Benefit:** directly exposes the "$500/user/month" problem and supports subscription pricing.  
**Risk:** users create different amounts of value/work; low-usage and high-usage users can distort conclusions.

### B. Cost per successful outcome + per-user monthly ceiling — RECOMMENDED
Use **cost per successful outcome** as the primary efficiency/value metric, with **cost per active user/month** as a hard commercial guardrail.

Example:
- Marketing: cost per approved content package / verified analysis / completed agent workflow.
- Support: cost per verified resolution.
- Corporate Assistant: cost per accepted completed task/decision-support workflow.

Then enforce a per-user/tenant/plan economic ceiling so useful outcomes cannot become commercially unsustainable.

**Benefit:** ties AI spend to value while directly protecting the business model.  
**Risk:** requires defining "successful outcome" correctly for each domain.

### C. Revenue/margin ratio only
Judge AI cost primarily as a percentage of subscription/revenue.

**Benefit:** directly commercial.  
**Risk:** can hide wasteful workflows and gives weak product/engineering feedback.

## Research recommendation

**B — Cost per successful outcome + per-user monthly ceiling.**

This directly incorporates the owner's requirement that an AI product cannot become economically worthless through uncontrolled usage, while avoiding the mistake of treating raw token minimization as the goal.

## Lock plan after Q1

If B is approved:
1. promote `doctrine/operations-principles.md`;
2. make AI unit economics a permanent Product Supervisor concern;
3. add unit-economics fields to future product/project state and architecture/risk contracts;
4. make cost-per-outcome + per-user/tenant ceiling part of future AI standards;
5. lock R006;
6. move to Priority 2 — Design Foundation research, starting with shared vs product-specific design behavior.

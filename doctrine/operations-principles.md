# Admonk Operations, Reliability & AI Economics Principles

**Status:** APPROVED DOCTRINE  
**Approved:** 2026-09-26  
**Owner:** Admonk Studio  
**Research basis:** `research/synthesis/R006-operations-reliability-ai-economics.md`  
**Sources:** SRC-OPS-001, SRC-OPS-002

## Purpose

Define how Admonk operates software—especially AI-native products—so it remains trustworthy, recoverable and commercially sustainable.

## 1. Reliability and economics are product properties

A product is not successful merely because it works technically.

It must:
- create the intended user/business outcome;
- operate reliably enough to earn trust;
- recover from material failures;
- remain affordable enough to sustain the business.

## 2. Cost per successful outcome + per-user ceiling

> **Optimize AI/product operations around cost per successful outcome, while enforcing a commercially acceptable per-user/tenant/plan ceiling.**

Cost per active user/month remains an important commercial guardrail.

Cost per successful outcome is the primary product/engineering efficiency metric because it connects spend to delivered value.

The exact dollar ceilings are product/commercial decisions, not universal doctrine.

## 3. Tokens are telemetry, not success

Track:
- input/output/cache tokens;
- model calls;
- tool calls;
- retries;
- background executions;
- agent loops.

But do not optimize raw usage at the expense of the approved quality floor or product outcome.

Preferred measurement hierarchy:

```text
raw usage
→ unit consumption
→ successful-outcome economics
→ price / margin / ROI
```

## 4. Failed work counts

Include in workflow cost:
- retries;
- failed agent loops;
- discarded outputs;
- unnecessary tool calls;
- abandoned generations;
- fallback cascades.

Do not hide failed consumption when calculating cost per successful outcome.

## 5. Attribute before optimizing

At the maturity level justified by the product, make usage/cost attributable by:
- tenant;
- product/module;
- agent;
- feature/workflow;
- provider/model;
- tool/connector;
- user/plan where commercially useful.

## 6. Economic limits are runtime controls

When runaway consumption is plausible, define:
- request/run budgets;
- retry limits;
- tool-call ceilings;
- user/tenant/plan budgets;
- background-job limits;
- spend/rate/volume thresholds.

Limits must fail safely and communicate clearly.

## 7. Model/tool routing follows required value

Use the cheapest method that reliably meets the approved requirement.

Route based on:
- required quality;
- reasoning difficulty;
- latency;
- context/tool needs;
- privacy;
- measured success;
- cost.

Do not use the most expensive capable model by default.

## 8. Reliability metrics must change decisions

Operational metrics should have:
- owner;
- threshold;
- response;
- review cadence.

For critical production journeys, reliability degradation must be able to take priority over feature work.

Do not create passive observability dashboards with no decision loop.

## 9. Maturity-proportional operations

### Prototype
Require enough visibility to:
- find critical failures;
- detect runaway AI/tool behavior;
- enforce material spend limits;
- recover from obvious mistakes appropriate to the prototype.

Do not require enterprise observability by default.

### Production
Add as relevant:
- critical journey monitoring;
- error tracking;
- deploy/data recovery;
- AI cost attribution;
- anomaly/budget alerts;
- named operational ownership;
- outcome/quality signals.

### High-risk / high-scale
Escalate to:
- stronger service objectives;
- incident procedures;
- tested recovery;
- capacity/cost forecasting;
- richer traces and control where justified.

## 10. Economic evidence can change scope

A capability that cannot achieve sustainable economics may require:
- cheaper routing;
- lower frequency;
- narrower context;
- user-triggered execution;
- limits;
- premium packaging;
- redesign;
- defer/reject.

Architecture and product scope must respond to economic reality.

## 11. Optimization preserves the quality floor

Never reduce cost in a way that silently violates approved:
- correctness;
- trust;
- security/privacy;
- accessibility/usability;
- reliability;
- product outcome quality.

## Final rule

> **Deliver the intended outcome reliably, recoverably, and at a unit cost the business can sustain.**

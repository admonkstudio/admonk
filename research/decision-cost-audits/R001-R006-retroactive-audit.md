# Retroactive Decision-Cost Audit — R001–R006

**Date:** 2026-09-26  
**Status:** ACCEPTED — product-owner confirmed 2026-09-26  
**Scope:** Previously locked Foundation doctrine decisions R001–R006  
**Method:** `research/DECISION-COST-FRAMEWORK.md`

## Purpose

Re-test the six Foundation doctrine decisions that were locked before the Decision Cost & Coupling Framework existed.

This is not a full re-research.

The audit asks:
- what benefit was selected;
- what price Admonk pays;
- what residual problem remains;
- whether the recommendation is Dominant, Layered, Conditional, True Hybrid or Defer;
- whether combining source ideas creates a hidden hybrid penalty;
- whether the newly explicit cost changes the original conclusion.

## Executive result

**No R001–R006 decision currently needs to be reopened.**

None of the six approved directions requires Admonk to operate two conflicting systems in the same layer.

The main costs are:
- additional product-definition discipline;
- judgment about where premium craft is concentrated;
- up-front identification of expensive change seams;
- risk classification for security/privacy;
- authority/action classification and runtime control for agents;
- outcome/economic measurement for AI-native products.

These costs are material but aligned with the intended product family and are partially contained by later R007–R016 decisions.

The checkpoint should be marked complete only after the product owner accepts the consolidated prices below.

---

## R001 — Product Definition

**Locked direction:** Customer desirability determines whether Admonk should build; bounded deliverability determines what is built first. VALUE → BOUNDARY → PROOF.

**Decision type:** Layered.

### Benefit gained
Protects against both low-value easy builds and desirable but unbounded projects.

### Price paid
- more thinking/documentation before implementation;
- owner/research effort to distinguish evidence from assumptions;
- possible slower start when the problem is genuinely uncertain;
- Product Brief can become heavier if VALUE, BOUNDARY and PROOF are not kept concise.

### Residual problem
Early evidence can still be weak. The framework improves decision quality but cannot manufacture customer truth.

### Hybrid penalty
**Low.** VALUE, BOUNDARY and PROOF answer different questions rather than duplicating one process.

### Containment
- smallest sufficient Product Brief;
- preserve assumptions visibly;
- no mandatory PRFAQ or fixed Shape Up ceremony;
- reopen when evidence weakens the value case.

### Audit decision
**KEEP LOCKED.**

---

## R002 — Premium Product Quality

**Locked direction:** Universal quality floor + concentrated craft.

**Decision type:** Layered.

### Benefit gained
Every meaningful surface remains trustworthy while exceptional craft is concentrated where user/business value is highest.

### Price paid
- ongoing judgment about which journeys deserve concentrated craft;
- secondary surfaces can become under-polished if the quality floor is weakly enforced;
- quality review cannot be fully reduced to automated scoring;
- some expert/human review remains necessary.

### Residual problem
There is no perfectly objective formula for "enough craft." Taste and product judgment remain part of the system.

### Hybrid penalty
**Low/Moderate.** Quality floor and craft are different layers, but both must be reviewed. The cost is governance/judgment, not duplicate implementation systems.

### Containment
- explicit quality floor;
- proof for material quality claims;
- concentrated craft based on criticality/frequency/differentiation;
- later accessibility/testing/design policies make the floor more concrete.

### Audit decision
**KEEP LOCKED.**

---

## R003 — Engineering Simplicity

**Locked direction:** Simple core + deliberate change seams.

**Decision type:** Conditional / layered.

### Benefit gained
Low present complexity without making expensive future changes unnecessarily painful.

### Price paid
- some up-front architecture thinking even for small products;
- judgment is required to identify which seams are truly expensive to change;
- incorrect seam choices can create premature interfaces/abstractions;
- a few boundaries may be built before their full future need is proven.

### Residual problem
Admonk cannot know every future expensive change. Some refactoring/migration debt will still occur.

### Hybrid penalty
**Low if the seam list stays narrow; High if "deliberate seams" becomes generalized future-proofing.**

### Containment
Protect only expensive boundaries such as:
- external providers;
- tenant/data isolation;
- durable IDs/migrations;
- permissions;
- real shared contracts;
- consequential action boundaries.

R008–R011 further constrain speculative Design Foundation abstraction.

### Audit decision
**KEEP LOCKED.**

---

## R004 — Security & Privacy

**Locked direction:** Non-negotiable floor + risk-based escalation.

**Decision type:** Conditional.

### Benefit gained
Security/privacy never disappear, while low-risk work avoids enterprise-level control overhead.

### Price paid
- Admonk must maintain a small universal floor;
- someone must classify sensitivity, privilege, consequence and blast radius;
- under-classification can leave gaps;
- over-classification can slow delivery;
- documented exceptions/reviews add governance cost.

### Residual problem
Risk classification will never be perfectly objective, and legal/contractual requirements may later supersede the internal model.

### Hybrid penalty
**Low.** The universal floor and escalated controls apply under different risk conditions.

### Containment
- explicit universal controls;
- Production/High-risk escalation;
- time-bound exceptions;
- current authoritative standards used when technical standards are later populated.

### Audit decision
**KEEP LOCKED.**

---

## R005 — AI Autonomy / Agent Authority

**Locked direction:** Risk-tiered, evidence-earned autonomy.

**Decision type:** Conditional.

### Benefit gained
Agents can deliver real automation value without equating model capability with permission.

### Price paid
- action classification is required;
- capability manifests/runtime enforcement/audit trails add implementation cost;
- consequential actions retain human-approval friction;
- reversible-action autonomy requires evidence before expansion;
- mistakes in classification can either over-constrain useful automation or grant too much authority.

### Residual problem
Human approval can still become a bottleneck in high-volume consequential workflows. Autonomy policy must evolve from production evidence.

### Hybrid penalty
**Low/Moderate.** Human oversight and runtime automation coexist, but they are routed by consequence rather than both applied to every action.

### Containment
- READ/DRAFT autonomous in scope;
- reversible autonomy only when proven;
- consequential approval by default;
- destructive denied by default;
- model cannot self-expand authority;
- R016 provides evidence for autonomy expansion.

### Audit decision
**KEEP LOCKED.**

---

## R006 — Operations, Reliability & AI Unit Economics

**Locked direction:** Cost per successful outcome + per-user/tenant/plan ceiling, alongside proportional reliability.

**Decision type:** Layered.

### Benefit gained
Prevents technically successful AI products from becoming commercially worthless while preserving reliability and product quality.

### Price paid
- successful outcomes must be defined per domain;
- usage/cost attribution requires instrumentation;
- two operational constraints must be watched: reliability and economics;
- cost routing/budgets can add runtime/configuration complexity;
- optimization decisions require quality guardrails to avoid making the product cheaper but worse.

### Residual problem
Some outcomes are hard to define objectively, especially advisory/creative work. Commercial ceilings also require product-specific pricing/margin decisions.

### Hybrid penalty
**Moderate but justified.** Reliability and economics are separate operating budgets. Maintaining both adds measurement/governance work, but dropping either creates a known failure mode: trustworthy but uneconomic, or cheap but unreliable.

### Containment
- tokens remain telemetry, not success;
- start with the smallest useful attribution;
- R012 makes observability loop-first;
- R015 keeps analytics progressive;
- R016 constrains evaluation cost;
- exact dollar ceilings remain product/commercial decisions.

### Audit decision
**KEEP LOCKED.**

---

## Cross-decision coupling review

The six decisions do create a real cumulative governance cost.

The combined system requires Admonk to reason about:
- evidence quality;
- risk;
- action consequence;
- product value;
- quality floor;
- unit economics.

The later Foundation work reduces the danger that this becomes bureaucracy by repeatedly applying:
- progressive maturity;
- proportional evidence;
- Local-by-default design assets;
- risk-routed release evidence;
- loop-first observability;
- progressive analytics;
- targeted AI regression.

The remaining systemic failure mode is:

> **Proportional governance becoming too cognitively expensive because too many decisions require classification.**

This should become an explicit future validation target during BriefFlow and Marketing Hub revalidation.

## Consolidated cost acceptance requested

Accepting R001–R006 under the new framework means accepting these six prices:

1. **R001:** more up-front definition in exchange for stronger value/scope decisions.
2. **R002:** continuing human/product judgment in exchange for premium quality without uniform over-polish.
3. **R003:** selective up-front boundary work in exchange for cheaper future change.
4. **R004:** risk-classification and exception governance in exchange for proportionate security/privacy.
5. **R005:** action-classification/runtime-control overhead in exchange for useful but bounded agent autonomy.
6. **R006:** outcome/cost attribution overhead in exchange for commercially sustainable AI products.

## Audit recommendation

**ACCEPT ALL SIX COSTS AND KEEP R001–R006 LOCKED.**

No decision currently warrants reopening.

## Revalidation requirement

During BriefFlow and Marketing Hub validation, explicitly test whether:
- the combined classification burden is understandable;
- a new person/agent can route decisions correctly;
- low-risk work remains fast;
- the system does not create duplicate checklists;
- high-risk work still receives stronger controls;
- AI/token/tool economics remain visible.

If those validations fail, reopen the relevant doctrine rather than adding more process around it.


## Owner acceptance

**Confirmed:** 2026-09-26

The product owner accepted the consolidated costs for R001–R006 and confirmed that all six decisions remain locked.

The cumulative governance-complexity risk remains a mandatory validation target for BriefFlow and Marketing Hub.

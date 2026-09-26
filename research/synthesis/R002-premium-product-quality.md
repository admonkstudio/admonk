# R002 — Premium Product Quality

**Date:** 2026-09-26  
**Mode:** Document Population Research  
**Status:** Awaiting product-owner Q1  
**Target:** future product/design/quality doctrine and release evidence standards

## Research question

What should "premium software quality" mean for Admonk so the system can produce software that is dependable, usable and measurable **and** feels unusually thoughtful, coherent and complete—without turning "premium" into subjective decoration or unlimited polishing?

## Source A — ISO/IEC 25010:2023

**Source:** SRC-QUAL-001

### What it optimizes for

A systematic product-quality model that can be used to:
- define requirements;
- check requirement completeness;
- set design objectives;
- identify testing objectives;
- define quality-control and acceptance criteria;
- establish measures.

The standard treats software/ICT quality as multi-dimensional rather than a single score.

### Strongest ideas for Admonk

- quality must be defined, not assumed;
- quality should influence requirements, design, testing and acceptance—not only final QA;
- one attractive interface cannot compensate for failures in other quality dimensions;
- evidence and measurable acceptance matter;
- quality should be considered throughout the lifecycle.

### Challenge

Copied too literally, a formal quality model can:
- become a compliance checklist;
- produce "technically good" but generic software;
- encourage equal attention to every dimension regardless of user/product context;
- miss craft, emotional coherence, perceived smoothness and differentiation;
- create ceremony disproportionate to a small prototype.

ISO is strongest as a **quality floor/reference model**, not as a complete definition of "premium."

## Source B — Linear: "Why is quality so rare?"

**Source:** SRC-QUAL-002

### What it optimizes for

Craft: deliberate care, judgment and attention to the whole customer experience.

Linear argues that software culture often over-optimizes speed, cost and metrics, while AI increases the temptation to outsource judgment. It treats quality as a business strategy and describes practices built around small-team judgment, internal iteration, attention to details and rapid bug correction.

### Strongest ideas for Admonk

- quality is not created by process alone;
- judgment/taste/care still matter in an AI-assisted production system;
- the whole experience matters, not only the feature's functional acceptance;
- small inconsistencies and papercuts accumulate into perceived quality;
- metrics are evidence, not a substitute for product judgment;
- quality can be differentiating rather than merely defensive.

### Challenge

Copied literally, this philosophy can:
- make "feels right" difficult to audit;
- allow strong taste to override accessibility, evidence or different user contexts;
- encourage polishing beyond economic value;
- overfit Linear's brand, team and product category;
- turn practices such as "zero bugs" or internal-only MVPs into ritual rather than context-dependent choices.

Linear is strongest as the **craft/differentiation layer**, not as the sole release standard.

## Synthesis

The two resources protect against opposite failure modes.

ISO protects against:
> **beautiful, polished software that is unreliable, insecure, unusable or otherwise incomplete.**

Linear protects against:
> **compliant, measurable software that works but feels generic, careless, fragmented or unfinished.**

Admonk needs both.

## Proposed Admonk model

### Layer 1 — QUALITY FLOOR

Every meaningful product/surface must meet the relevant evidence-backed baseline for its context.

Candidate dimensions to research/standardize include:
- functional correctness/suitability;
- reliability and recovery;
- security/privacy;
- usability/accessibility;
- performance/responsiveness;
- compatibility/interoperability where needed;
- data integrity;
- maintainability/change safety;
- operational observability appropriate to maturity.

The exact baseline remains risk- and stage-sensitive.

A "premium" product cannot fail this floor.

### Layer 2 — CRAFT & COHERENCE

Premium quality then asks:
- Does the journey feel intentional?
- Are important states complete?
- Is hierarchy understandable?
- Are interactions predictable where they should be?
- Are details internally consistent?
- Is unnecessary friction removed?
- Is the product appropriate to its users/domain?
- Does it have product-specific character rather than generic AI/UI-kit output?
- Have important papercuts been noticed and corrected?
- Is the experience trustworthy and calm under non-ideal conditions?

This layer is not reducible to one automated score.

### Layer 3 — DIFFERENTIATED QUALITY

The highest investment should create memorable advantage where it matters most:
- core value moment;
- primary workflow;
- onboarding/activation;
- trust-sensitive actions;
- product-defining interactions;
- high-frequency work;
- product/brand differentiation.

Not every settings subpage needs the same creative attention as the product's defining workflow.

### Layer 4 — PROOF

For every material quality claim ask:

> **What proves this?**

Evidence can include:
- automated tests;
- browser evidence;
- accessibility checks;
- performance measurements;
- security review;
- error/recovery tests;
- user observation/feedback;
- product analytics;
- visual/state review;
- design-system conformance;
- incident/bug evidence;
- expert review where the quality is inherently judgment-based.

Judgment is allowed.
Unexamined judgment is not enough.

## Proposed definition

> **Premium software is dependable enough to trust, clear enough to use without unnecessary effort, complete enough to handle reality, coherent enough to feel intentionally made, and distinctive where distinction creates user or business value.**

Premium is therefore not:
- more animation;
- more visual decoration;
- maximum polish everywhere;
- a luxury aesthetic;
- a single performance/accessibility score;
- bug-free perfection at any cost.

## Implication for AI-assisted development

AI may increase output speed, but the foundation should prevent speed from reducing:
- judgment;
- product-specific reasoning;
- complete-state thinking;
- verification;
- consistency;
- ownership.

AI can help detect quality problems.
AI cannot become the sole authority on whether the product feels appropriate, coherent or differentiated.

## Q1 required

How should Admonk distribute **craft/polish investment** across a product?

### A. Uniform premium
Every meaningful surface should receive approximately the same high polish standard.

**Benefit:** maximal consistency.  
**Risk:** expensive, slow, and likely over-invests in low-value surfaces.

### B. Universal quality floor + concentrated craft — RECOMMENDED
Every surface must meet the relevant correctness, trust, accessibility, usability and completeness floor.

The strongest craft/polish investment goes to critical, frequent and differentiating journeys.

**Benefit:** high overall quality with economically rational differentiation.  
**Risk:** requires disciplined judgment so secondary surfaces do not become neglected.

### C. Customer-facing premium
Premium polish is concentrated mainly on customer-facing/product-facing areas; admin/internal areas may remain utilitarian.

**Benefit:** fastest commercial impact.  
**Risk:** internal/admin friction can still damage operations, trust and support cost.

## Research recommendation

**B — Universal quality floor + concentrated craft.**

This is most compatible with:
- budget-conscious starts;
- risk-based Product Supervisor governance;
- differentiated products;
- sustainable scaling;
- the principle that not every change needs the same review depth.

## Lock plan after Q1

If B is approved:
1. promote the premium-quality doctrine;
2. separate universal quality floor from craft/differentiation guidance;
3. use standards to make the floor evidence-testable;
4. keep product-specific craft decisions outside universal visual rules;
5. update Design Foundation and Product Release Audit contracts;
6. lock R002 and move to R003 — Engineering Simplicity doctrine.

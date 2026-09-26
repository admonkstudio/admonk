# Admonk Product Principles

**Status:** APPROVED DOCTRINE  
**Approved:** 2026-09-26  
**Owner:** Admonk Studio  
**Research basis:** `research/synthesis/R001-product-definition.md`  
**Sources:** SRC-PROD-001, SRC-PROD-002

## Purpose

Define Admonk's durable beliefs for deciding whether a software product or major capability deserves to be built and what its first bounded version should be.

## 1. Value before convenience

> **Customer desirability determines whether Admonk should build. Bounded deliverability determines what Admonk builds first.**

Do not choose a product direction because it is easy to build, fits an available tool, or produces a quick demo.

First establish that the direction can create meaningful user/customer value.

Then shape the smallest coherent version that can prove that value.

## 2. Product definition uses VALUE → BOUNDARY → PROOF

### VALUE — Why should this exist?

A serious product definition should answer:
- Who is the user/customer?
- What meaningful problem/opportunity exists?
- What outcome should improve?
- What is the current alternative/workaround?
- Why might the proposed product be meaningfully better?
- What evidence supports the problem/value hypothesis?

Unknowns remain labeled as assumptions or hypotheses.

### BOUNDARY — What are we willing to build now?

Define:
- the smallest coherent capability set;
- current investment/appetite/constraints;
- the core solution concept;
- known rabbit holes or complexity traps;
- explicit non-goals/no-gos;
- what may remain intentionally rough or deferred.

Scope should be shaped to the justified investment rather than allowed to expand indefinitely.

### PROOF — What must become true?

Define:
- user/product evidence of value;
- acceptance/success evidence for the current version;
- unresolved assumptions;
- relevant data/security/permission conditions;
- evidence required for the next lifecycle gate;
- conditions that should reopen the decision.

## 3. Evidence before certainty

A persuasive product narrative is not evidence.

Research, user evidence, operational evidence, market evidence, observed workflow pain, and validated first-tenant learning should be distinguished from:
- assumptions;
- hypotheses;
- product-owner preferences;
- AI suggestions.

Do not silently promote any of those into facts.

## 4. Small does not mean weak

The first version should be:
- bounded;
- coherent;
- testable;
- valuable enough to judge;
- intentionally limited.

Avoid both:
- a broad "complete platform" that cannot be delivered well;
- a tiny demo that is too weak to test the real value proposition.

## 5. Non-goals are part of the product definition

Explicitly state what the current version does not attempt.

Non-goals protect:
- focus;
- architecture;
- budget;
- schedule;
- quality;
- future optionality.

## 6. Preserve implementation judgment

Product definition should solve the problem at the macro level without specifying every implementation detail too early.

Do not freeze:
- visual design;
- component structure;
- technology;
- exact architecture;
- internal implementation

before the lifecycle stage requires those decisions.

## 7. The Product Brief is not a sales document

It exists to support a build/no-build and scope decision.

It should expose:
- weak evidence;
- unresolved risk;
- unclear value;
- excessive scope;
- contradictory assumptions.

A beautiful narrative that hides uncertainty is worse than an unfinished brief that tells the truth.

## 8. Product-specific answers stay product-specific

This doctrine does not standardize:
- business model;
- feature hierarchy;
- market narrative;
- product personality;
- visual language;
- fixed development cycle;
- exact document length.

It standardizes the quality of reasoning.

## 9. Revisit trigger

Reopen the product definition when:
- new evidence materially weakens the problem/value hypothesis;
- the current scope cannot prove value;
- cost/risk changes materially;
- a critical dependency fails;
- user behavior contradicts the expected outcome;
- the product expands beyond the approved boundary.

## Final rule

> **Build what is worth building. Then build the smallest version that can honestly prove it.**

# R001 — Product Definition / Product Principles

**Date:** 2026-09-26  
**Mode:** Document Population Research  
**Status:** Awaiting product-owner Q1  
**Target:** future `doctrine/product-principles.md` and Product Brief / MVP Capability Spec contracts

## Research question

How should Admonk define a product strongly enough before implementation without turning product definition into either:
- an aspirational customer story with weak delivery boundaries; or
- a tightly bounded delivery pitch that has not proven meaningful customer value?

## Source A — Amazon Working Backwards / PRFAQ

**Source:** SRC-PROD-001

### What it optimizes for
Customer value and clarity before implementation.

Amazon's current description says it writes the Press Release and FAQ before coding. The Press Release forces the team to ask whether the proposed product is remarkable to customers. The FAQ forces difficult questions about target users, alternatives, launch scope, pricing and architecture.

### Strongest ideas for Admonk
- begin with the customer outcome rather than available technology;
- describe value in customer language;
- force hard internal questions before committing;
- keep the narrative concise enough to expose weak thinking;
- allow the document to evolve under governed review.

### Challenge
Copied literally, PR/FAQ can:
- bias teams toward persuasive narrative before evidence is strong enough;
- create polished fictional certainty around an unvalidated market/problem;
- mix commercial, architectural and product questions into a large document;
- be disproportionate for small product decisions;
- reflect Amazon's organizational context rather than a small, low-budget product studio.

## Source B — Shape Up pitch

**Source:** SRC-PROD-002

### What it optimizes for
Bounded, de-risked work that a team can realistically finish.

A pitch contains:
- Problem
- Appetite
- Solution
- Rabbit holes
- No-gos

Shape Up also defines good shaping as rough, solved at the macro level and bounded.

### Strongest ideas for Admonk
- define the problem and solution together;
- set an appetite before scope expands;
- deliberately expose rabbit holes;
- explicitly state no-gos;
- preserve implementation judgment by avoiding premature detail;
- treat scope as something to shape to the available investment rather than estimate infinitely.

### Challenge
Copied literally, Shape Up can:
- assume the team already understands the customer/problem well enough to shape;
- under-specify market/problem-validation evidence;
- overfit to fixed-cycle software delivery;
- omit some concerns Admonk needs before architecture/build, including data authority, permission risk, AI authority, evidence and measurable product outcomes;
- make "appetite" too dominant for foundational product strategy if used without a longer-term product view.

## Synthesis

The two methods solve different failure modes.

Amazon protects against:
> **building something customers do not care about.**

Shape Up protects against:
> **building something too broad or risky to finish well.**

Admonk needs both, plus evidence governance.

## Proposed Admonk product-definition doctrine

A product should not move toward implementation until its definition answers three layers:

### 1. VALUE — Why should this exist?
- Who is the user/customer?
- What problem/opportunity matters?
- What outcome should improve?
- What makes the proposed experience meaningfully better than the current alternative?
- What evidence supports the problem/value hypothesis?

Borrowed strength: Working Backwards.

### 2. BOUNDARY — What are we actually willing to build now?
- What is the smallest coherent product/capability set?
- What investment/appetite is justified now?
- What is explicitly not in scope?
- What known rabbit holes/risks could explode the work?
- What must remain rough enough for implementation judgment?

Borrowed strength: Shape Up.

### 3. PROOF — What must become true?
- What user/product evidence will show the product works?
- Which assumptions remain unresolved?
- What permissions/data/security conditions must be satisfied?
- What evidence is required before the next gate?
- What would cause the scope/direction to be reopened?

Admonk addition: evidence-based Product Supervisor governance.

## Proposed document implication

Admonk should **not** adopt PR/FAQ or Shape Up pitch as the universal Product Brief template.

Instead, the future Product Brief / product-definition doctrine should standardize the reasoning:

```text
Customer/User
→ Problem / desired outcome
→ Evidence
→ Proposed value
→ Appetite / constraints
→ Smallest coherent scope
→ Key solution concept
→ Risks / rabbit holes
→ Non-goals / no-gos
→ Success evidence
→ Open assumptions
→ Approval / revisit trigger
```

The writing format may vary by product.

## What should remain product-specific

Do not standardize:
- market narrative style;
- business model;
- feature hierarchy;
- product personality;
- visual solution;
- fixed development cycle;
- exact document length.

## Q1 required

One owner-level strategic choice remains:

Should Admonk's foundational product-definition rule optimize first for **customer desirability** or for **bounded deliverability** when the two are temporarily in tension?

The research recommendation is:
**Customer desirability is the first filter; bounded deliverability determines the first version.**

This means:
- do not build an easy product with weak value;
- do not attempt the full desirable product at once;
- validate the valuable direction, then shape the smallest credible/lovable step.

## Lock plan after Q1

If approved:
1. create/populate `doctrine/product-principles.md` as proposed doctrine for human approval;
2. update Product Brief contract to use VALUE → BOUNDARY → PROOF;
3. update the work queue item 1 to Locked;
4. move immediately to item 2 — Premium Product Quality doctrine.

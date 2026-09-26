# Component Promotion Policy

**Status:** APPROVED GOVERNANCE POLICY  
**Approved:** 2026-09-26  
**Owner:** Admonk Studio / Design Foundation  
**Research basis:** `../research/synthesis/R010-component-promotion-policy.md`

## Core rule

> **Promotion is not a reward for reuse. It is Admonk accepting a maintenance and compatibility obligation. Evidence must be proportional to the scope and consequence of that obligation.**

## Lifecycle

```text
Local
→ Candidate
→ Trial
→ Stable
→ Deprecated
```

### Local

Default state for a new product need.

Requirements:
- relevant quality/accessibility floor still applies;
- product owner is clear;
- no shared compatibility promise.

Local assets may remain local indefinitely.

### Candidate

Means: **worth observing for reuse**.

Require:
- real product use;
- clear purpose/name;
- owner;
- no clearly fitting Stable shared asset;
- relevant state/accessibility baseline;
- product-specific assumptions identified;
- reason reuse may become valuable.

A second product is not required.

### Trial

Means: **approved for limited reuse with visible change risk**.

Require:
- repeated use or credible additional consumer/use case;
- stable-enough semantics/behavior;
- relevant accessibility evidence;
- responsive/input evidence where applicable;
- known states/failure behavior;
- minimum documentation;
- owner willing to support it;
- known evidence gaps;
- explicit tolerance for breaking change.

Evidence depth increases with workflow, comprehension, trust, or consequence.

### Stable

Means: **Admonk accepts a durable maintenance and compatibility obligation**.

Require:
- multiple real uses/consumers, or documented cross-product need for consistent behavior;
- proven semantic/behavioral fit;
- relevant states, accessibility, responsive/input behavior and tests;
- central ownership that is cheaper/clearer than local duplication;
- explicit owner;
- material downsides understood;
- clear usage/API guidance;
- change/version expectations;
- product-specific assumptions removed or intentionally supported.

User/workflow research is required when the asset materially affects comprehension, workflow, trust, or consequential actions. Lower-level primitives may rely more heavily on technical/standards evidence.

## Cross-product Foundation promotion

A Stable domain asset becomes a cross-product Foundation asset only when:
- real cross-product consumers exist;
- semantics and interaction model match;
- density/content assumptions are compatible;
- accessibility obligations match;
- central maintenance lowers total cost;
- product differentiation is not materially harmed.

## Earlier centralization

The normal reuse sequence may be shortened when there is a documented cross-product need for consistent:
- accessibility behavior;
- shared navigation;
- recovery/confirmation behavior;
- interoperability.

This is not a convenience shortcut and still requires ownership and evidence.

## Demotion / deprecation

Demote or deprecate when:
- semantics diverge;
- variants/exceptions exceed shared value;
- central ownership no longer pays;
- maintenance becomes harder centrally;
- ownership disappears;
- a better asset supersedes it.

## Cost rule

Local product work should not pay Stable-level governance cost.

Promotion requester/foundation owner pays the added review/documentation cost because promotion creates the shared obligation.

## Revisit triggers

Review this policy if:
- promotion reviews materially slow delivery;
- many assets stall in Candidate/Trial;
- earlier-centralization cases become routine;
- classification is inconsistent;
- shared assets accumulate variants/exceptions.

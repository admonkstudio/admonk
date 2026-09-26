# R010 — Component Promotion Policy

**Date:** 2026-09-26
**Mode:** Document Population Research
**Status:** Awaiting product-owner Q1 + cost acceptance
**Target:** `design-foundation/PROMOTION-LADDER.md` and future component-governance policy

## Research question

What evidence should a local component or pattern have before Admonk accepts it as a shared asset?

## Source A — GitHub Primer

**Source:** SRC-COMP-001

Primer starts components inside product teams and considers upstreaming only after real usage and maturity. Its maintainers weigh repeated use, quality, accessibility, negative consequences, system fit, and whether the ownership cost is worth paying.

### Strengths
- begin in the product, not the foundation;
- real usage outranks theoretical reuse;
- maintenance cost is part of the decision;
- documentation and accessibility matter;
- a local variant may stay local when central ownership is not worthwhile.

### Challenge
Used literally, this can delay useful shared primitives while Admonk still has few products and can create a central-maintainer bottleneck.

Primer is strongest as the **central-maintenance economics gate**.

## Source B — GOV.UK Design System

**Source:** SRC-COMP-002

GOV.UK asks whether a proposed addition is useful and unique, then evaluates whether it is usable, consistent and versatile. Trial status permits real-service use while more evidence is collected before Stable.

### Strengths
- shared assets need demonstrated need;
- Trial makes uncertainty visible;
- real-context evidence matters;
- the component should work across the contexts it claims to support;
- evidence limits should be documented.

### Challenge
Used literally, this can require too much research for low-level primitives and can make "versatility" produce large APIs before real need exists.

GOV.UK is strongest as the **user/context evidence gate**.

## Key disagreement

Primer asks:
> **Is this worth central ownership?**

GOV.UK asks:
> **Is this proven useful across the contexts we claim?**

Those questions should not be applied at equal strength to every asset.

## Decision type

**Conditional / risk-and-layer routed.**

A focus utility, a button, a data table, and a domain workflow should not need identical evidence.

## Proposed promotion policy

### Local — default
A new product need starts Local unless an existing Stable asset clearly fits.

Local means no shared compatibility promise, not low quality.

### Local → Candidate
Candidate means "worth observing for reuse."

Require:
- clear purpose;
- owner;
- real product use;
- no clearly fitting shared asset;
- relevant state/accessibility baseline;
- product-specific assumptions identified;
- reason reuse may be valuable.

Do not require a second product or exhaustive research yet.

### Candidate → Trial
Trial means "approved for limited reuse with visible change risk."

Require:
- repeated use or a credible second consumer/use case;
- stable-enough semantics and behavior;
- relevant accessibility evidence;
- responsive/input evidence where applicable;
- known states and failure behavior;
- minimum documentation;
- willing owner;
- known evidence gaps;
- explicit tolerance for change.

For complex or consequential interaction patterns, require stronger workflow/user evidence before Trial.

### Trial → Stable
Stable means Admonk accepts a durable maintenance and compatibility obligation.

Require:
1. **Reuse evidence** — multiple real use cases/consumers, or a documented reason central ownership is necessary for consistent cross-product behavior.
2. **Semantic fit** — the same meaning and behavior across claimed consumers.
3. **Quality evidence** — relevant states, accessibility, responsive/input behavior and tests.
4. **Maintenance economics** — central ownership is cheaper or clearer than local duplication; owner exists; material downsides are understood.
5. **Contract readiness** — usage guidance and change expectations are clear; product-specific assumptions are removed or explicitly supported.
6. **Evidence proportionality** — user research increases with workflow and comprehension consequence; technical evidence may be sufficient for lower-level primitives.

### Stable domain → cross-product Foundation
Require:
- real cross-product consumers;
- matching semantics and interaction model;
- compatible density/content assumptions;
- matching accessibility obligations;
- lower total maintenance cost centrally;
- no material loss of product differentiation.

## Earlier centralization rule

The "second product first" expectation may be relaxed when there is a documented cross-product need for consistent accessibility, navigation, recovery, or interoperability behavior.

This is not a convenience shortcut.

## Demotion / deprecation

Demote or deprecate when:
- consumers diverge semantically;
- variants exceed the value of sharing;
- central ownership no longer pays for itself;
- maintenance becomes harder centrally;
- ownership disappears;
- a better shared asset replaces it.

## Decision Cost Ledger

**Benefit gained:** evidence and maintenance cost scale with the obligation Admonk accepts.

**Problem solved:** one checklist would be too weak for complex patterns or too expensive for simple primitives.

**New problem introduced:** classification judgment.

**Complexity/operating cost:** moderate at promotion time, low while assets remain Local.

**Speed cost:** low for product work; moderate only when seeking shared status.

**Governance/cognitive cost:** moderate.

**Flexibility/differentiation cost:** low; products may remain local indefinitely.

**Migration cost:** moderate; local assets may later migrate or be replaced.

**AI/tool cost:** slightly positive because explicit status reduces reuse guesswork.

**Who pays:** promotion requester and foundation owner pay promotion cost; local product work does not pay it by default.

**Containment:**
- default Local;
- one accountable reviewer/owner rather than committees;
- evidence proportional to layer and consequence;
- no forced promotion;
- earlier centralization only for documented cross-product needs;
- demotion/deprecation allowed.

**Revisit trigger:**
- promotion reviews slow normal delivery;
- many assets remain stuck in Candidate/Trial;
- earlier-centralization cases become routine;
- classification is inconsistent;
- shared assets accumulate too many variants.

## Synthesis Compatibility Check

This is **not** a true hybrid requiring every Primer and GOV.UK criterion simultaneously.

It is conditional:
- maintenance/traction evidence answers whether Admonk should own something centrally;
- user/context evidence increases with UX consequence;
- technical/accessibility evidence dominates lower-level primitives.

We do not require community voting, two products for every primitive, user studies for every component, or Stable-level documentation before Trial.

## Proposed rule

> **Promotion is not a reward for reuse. It is Admonk accepting a maintenance and compatibility obligation. The evidence required should be proportional to the scope and consequence of that obligation.**

## Q1 — promotion philosophy + price acceptance

### A. Strict reuse-count gate
Do not promote to shared status until at least two real products use the asset.

**Benefit:** strongest anti-speculation protection.
**Price:** useful common primitives may be duplicated unnecessarily.

### B. Proportional evidence-gated promotion — RECOMMENDED
Default Local. Candidate from real use. Trial from repeated or credible reuse plus quality evidence. Stable only when central ownership is economically and semantically justified. User-evidence depth increases with UX consequence. Documented cross-product behavior needs may justify earlier centralization.

**Benefit:** evidence cost scales with real consequence and maintenance obligation.
**Price:** requires disciplined classification rather than one simple numerical gate.

### C. Foundation-owner discretion
Use principles but let the foundation owner decide case-by-case without formal lifecycle gates.

**Benefit:** fastest governance.
**Price:** less reproducible for future teams and AI.

## Research recommendation

**B — Proportional evidence-gated promotion.**

Accepted price if chosen:
> **Moderate classification and review judgment at promotion points so local work stays fast and shared assets carry evidence proportional to the obligation Admonk takes on.**

## Lock plan after Q1

If B and its price are accepted:
1. lock R010;
2. replace the promotion scaffold with Local → Candidate → Trial → Stable → Deprecated;
3. add proportional-evidence and earlier-centralization constraints;
4. create `design-foundation/component-promotion-policy.md`;
5. update component-governance contract;
6. move to R011 — Design/code/Figma drift policy.

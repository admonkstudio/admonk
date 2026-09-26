# R013 — Accessibility Baseline

**Date:** 2026-09-26
**Mode:** Document Population Research
**Status:** Awaiting product-owner Q1 + cost acceptance
**Target:** future `design-foundation/accessibility-rules.md`, Product Supervisor release evidence, Design Foundation quality floor

## Research question

What accessibility baseline should Admonk require across production products so accessibility is a real quality floor without forcing every product to pay the same research/testing cost regardless of context?

## Source A — W3C WCAG 2.2

**Source:** SRC-A11Y-001

WCAG 2.2 provides testable success criteria organized into A, AA and AAA.

Level AA includes all A and AA requirements. W3C also notes that AAA should not generally be required as a blanket site-wide policy. WCAG 2.2 is also approved as ISO/IEC 40500:2025.

### What it optimizes for

**A clear, testable accessibility floor.**

### Strongest ideas for Admonk

- accessibility requirements should be explicit and testable;
- responsive variations are part of the experience that needs verification;
- success criteria create a shared engineering/design vocabulary;
- AA is a practical baseline target for serious web products;
- accessibility can be encoded into component/foundation contracts.

### Challenge

Used as the entire accessibility philosophy, WCAG can:
- become a release checklist instead of a design input;
- encourage optimizing for pass/fail criteria rather than reducing exclusion;
- leave usability or cognitive-friction problems that still meet criteria;
- create false confidence from automated scans;
- impose formal-audit effort on low-risk prototypes.

WCAG is strongest as the **testable floor**, not the complete inclusive-product method.

## Source B — Microsoft Inclusive Design

**Source:** SRC-A11Y-002

Microsoft centers its methodology on:
- recognize exclusion;
- learn from diversity;
- solve for one, extend to many.

It treats exclusion as something product teams should identify during design rather than only at the end.

### What it optimizes for

**Finding exclusion that standards alone may not expose.**

### Strongest ideas for Admonk

- accessibility should influence product definition and design, not only QA;
- direct user perspectives can expose friction that criteria miss;
- situational limitations can reveal broadly useful improvements;
- high-impact workflows can justify deeper inclusive validation.

### Challenge

Used as a universal requirement, inclusive-design practice can:
- add recruiting/research time to every feature regardless of risk;
- create open-ended qualitative scope;
- produce insight without a deterministic release threshold;
- duplicate research cost for well-understood low-level primitives.

Inclusive Design is strongest as the **human discovery and validation layer**, not the conformance baseline.

## Verification constraint — W3C evaluation guidance

**Source:** SRC-A11Y-003

W3C states that automated evaluation tools cannot determine accessibility by themselves; knowledgeable human evaluation is still required.

Therefore:

> **An automated accessibility score cannot by itself prove Admonk's accessibility baseline.**

## Core finding

Admonk needs three layers:

1. a universal testable floor;
2. human verification for interaction behavior automation cannot prove;
3. deeper inclusive/user validation only where consequence or novelty justifies the cost.

This is a **conditional layered model**, not a full-strength combination of every method.

## Proposed accessibility model

### Layer 1 — Universal design/build floor

For Production web products, design and implementation should target **WCAG 2.2 Level AA**.

Foundation/components should make common requirements easier by default, including as applicable:
- semantic structure;
- keyboard operation;
- visible focus;
- accessible names/roles/states;
- contrast/readability;
- non-color-only meaning;
- status/error communication;
- zoom/reflow/responsive behavior;
- appropriate input/motion alternatives.

Do not make AAA a universal product-wide requirement.

For non-web surfaces, use the appropriate authoritative platform standard rather than applying web-only implementation rules mechanically.

### Layer 2 — Human critical-journey verification

Primary and consequential journeys should receive relevant manual checks such as:
- keyboard-only completion;
- focus order and visibility;
- screen-reader semantics/announcements where applicable;
- zoom/reflow;
- errors and status messages;
- modal/dialog behavior;
- approval/recovery interactions.

The exact matrix belongs in the later standard/playbook.

### Layer 3 — Risk/novelty-based inclusive validation

Increase direct inclusive/user evidence when:
- a workflow is novel or custom;
- accessibility consequence is high;
- assistive-technology behavior is complex;
- product users have known accessibility needs;
- support/analytics expose exclusion;
- a critical journey meets criteria but remains difficult to use.

Do not require bespoke user research for every low-level primitive.

## Internal target vs formal conformance claim

Admonk should distinguish:

**Internal engineering target**
- build Production web surfaces toward WCAG 2.2 AA;
- track gaps explicitly;
- manually verify material interactions.

**Formal conformance claim**
- make only when the evaluated scope and evidence actually support it.

A scanner result is not a conformance claim.

## Proposed release treatment

Accessibility should be severity-based.

### Release-blocking by default
Material examples include:
- a primary journey cannot be completed with the required input method;
- essential controls are not understandable to assistive technology;
- focus becomes trapped or lost in a critical flow;
- essential information/action is unavailable without an equivalent;
- a severe readability barrier prevents use;
- critical error/status feedback is not perceivable.

### Trackable exception
A non-critical AA gap may be temporarily accepted only through the normal Exception Register with:
- owner;
- affected criterion/experience;
- user impact;
- compensating measure if relevant;
- review/deadline.

This is internal product governance, not a legal compliance claim.

## Decision Cost Ledger

**Benefit gained:** measurable accessibility floor plus protection against "scanner passed, therefore accessible" thinking.

**Problem solved:** avoids both subjective accessibility claims and checklist-only design.

**New problem introduced:** recurring manual verification and exception-management cost.

**Complexity / operating cost:** moderate, concentrated on shared components and critical journeys.

**Speed cost:** low/moderate; material accessibility defects may delay release.

**Governance / cognitive cost:** moderate; teams must distinguish automated, manual and user evidence.

**Flexibility cost:** low; visual/product identity remains free inside accessibility constraints.

**Migration cost:** moderate if accessibility is added late; lower when foundation/components encode it early.

**AI/tool cost:** additional evaluation context/work, potentially offset by lower rework when accessibility requirements are available during implementation.

**Who pays:** design/engineering pay the baseline; product owners fund deeper validation only where consequence/novelty justifies it.

**Containment:**
- encode repeated behavior in Stable foundation assets;
- automate cheap deterministic checks;
- focus manual checks on material journeys;
- route deeper research by risk/novelty;
- no blanket AAA requirement;
- no formal conformance claim without evidence.

**Revisit trigger:**
- customer/market requirements demand a stricter baseline;
- repeated accessibility incidents occur;
- new platform types require different standards;
- manual testing becomes a material bottleneck;
- actual usage reveals exclusions despite AA-oriented implementation.

## Synthesis Compatibility Check

**Decision type:** Conditional / layered.

- WCAG defines the measurable web quality floor.
- Human evaluation verifies behavior automation misses.
- Inclusive/user evidence increases only where risk/novelty justifies it.

We do not require:
- full formal accessibility audit for every Prototype;
- AAA across every page;
- direct user research for every primitive;
- automated tools as proof of accessibility;
- a mandatory paid accessibility platform.

## Decision options

### A. Strict WCAG 2.2 AA release conformance
Every Production web release must fully establish WCAG 2.2 AA conformance before release.

**Benefit:** strongest uniform conformance discipline.
**Price:** highest audit/remediation cost and release friction.

### B. WCAG 2.2 AA engineering floor + manual critical-journey verification + risk-based exceptions — RECOMMENDED
Build Production web surfaces toward AA, automate cheap checks, manually verify important interactions, block material accessibility failures, and allow only documented time-bound exceptions for non-critical gaps. Add direct inclusive/user validation when risk or novelty earns the cost.

**Benefit:** strong accessibility quality without pretending every gap has identical consequence.
**Price:** requires severity judgment and exception discipline rather than one simple all-or-nothing rule.

### C. Risk-based accessibility without a universal AA target
Set accessibility requirements independently per product/workflow.

**Benefit:** lowest baseline overhead.
**Price:** inconsistent quality and larger accessibility debt risk.

## Research recommendation

**B — WCAG 2.2 AA engineering floor + manual critical-journey verification + risk-based exceptions.**

Explicit price:
> **Admonk accepts recurring accessibility verification work and occasional delivery friction so accessibility remains a real quality floor, while avoiding full formal-audit cost on every surface regardless of consequence.**

## Lock plan after Q1

If B and its price are accepted:
1. lock R013;
2. promote the accessibility baseline into Design Foundation governance;
3. update the accessibility-rules contract/status;
4. align Product Supervisor Production/release evidence;
5. preserve accessibility-tool selection for Priority 4;
6. move to R014 — Testing / Release-Evidence Baseline.

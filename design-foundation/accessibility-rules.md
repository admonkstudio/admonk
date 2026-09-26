# Accessibility Rules

**Status:** APPROVED GOVERNANCE BASELINE  
**Approved:** 2026-09-26  
**Owner:** Admonk Studio / Design Foundation  
**Research basis:** `../research/synthesis/R013-accessibility-baseline.md`

## Core rule

> **Production web products target WCAG 2.2 Level AA, verify material interactions manually, and use only documented time-bound exceptions for non-critical gaps.**

Accessibility is a product-quality floor, not a scanner score.

## 1. Engineering target

For Production web products:
- design and build toward WCAG 2.2 Level AA;
- treat relevant A and AA criteria as the engineering baseline;
- do not make AAA a universal requirement;
- use the appropriate authoritative platform accessibility guidance for non-web products.

## 2. Foundation expectations

As applicable, shared components/patterns should support:
- semantic structure;
- keyboard operability;
- visible focus;
- accessible names, roles and states;
- sufficient contrast/readability;
- non-color-only meaning;
- accessible errors/status messages;
- zoom/reflow/responsive use;
- appropriate input/motion alternatives.

## 3. Verification

Automation is useful but insufficient.

Primary and consequential journeys require relevant manual verification such as:
- keyboard completion;
- focus order/visibility;
- screen-reader semantics/announcements where applicable;
- zoom/reflow;
- errors/status feedback;
- dialog/modal behavior;
- approval/recovery interactions.

## 4. Inclusive validation

Increase direct inclusive/user evidence when:
- the workflow is novel;
- consequence is high;
- assistive-technology behavior is complex;
- the target audience has known accessibility needs;
- support/analytics reveal exclusion;
- a critical journey technically passes criteria but remains difficult.

Do not require bespoke accessibility user research for every low-level primitive.

## 5. Release treatment

Material accessibility failures on critical journeys are release-blocking by default.

Non-critical gaps may be accepted only through the normal Exception Register with:
- owner;
- affected experience/criterion;
- user impact;
- compensating measure where relevant;
- expiry/review date.

## 6. Conformance claims

An internal AA engineering target is not automatically a formal conformance claim.

Formal accessibility claims require evidence for the stated evaluated scope.

Automated scan results alone do not establish conformance.

## 7. Cost rule

Admonk accepts recurring verification effort and occasional release friction to preserve accessibility as a real quality floor.

The system avoids unnecessary cost by:
- automating cheap deterministic checks;
- concentrating manual testing on material journeys;
- reusing Stable accessible primitives;
- routing deeper inclusive research by risk/novelty.

## Revisit triggers

Revisit this baseline when:
- customer/contract requirements become stricter;
- repeated accessibility incidents occur;
- a new platform requires another standard;
- manual verification becomes a material bottleneck;
- real usage shows exclusion despite the current baseline.

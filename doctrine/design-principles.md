# Admonk Design Principles

**Status:** APPROVED DOCTRINE — current approved foundation principles  
**Approved:** 2026-09-26  
**Owner:** Admonk Studio  
**Research basis:** `research/synthesis/R007-shared-vs-product-design-behavior.md`  
**Sources:** SRC-DES-001, SRC-DES-002

## Purpose

Define what should remain consistent across the Admonk product family and what should remain free to differ by domain, product and tenant.

## 1. Shared behavior + subtle family cues + distinct product identity

> **Products should feel related through behavior and selected family conventions, not through forced visual sameness.**

Admonk accepts the additional governance and affected-consumer QA cost required to preserve both:
- cross-product familiarity; and
- meaningful product/domain differentiation.

This decision is valid only while the universal/shared layer remains deliberately small.

## 2. Universal Design Foundation

Standardize design behavior when inconsistency would materially harm:
- accessibility;
- comprehension;
- trust;
- safety;
- interoperability;
- shared navigation;
- maintainability of genuinely shared behavior.

Candidate shared concerns include:
- interaction semantics;
- keyboard/focus behavior;
- accessible labeling;
- contrast/readability requirements;
- complete-state expectations;
- destructive/confirmation/recovery behavior;
- responsive/input principles;
- semantic status roles;
- proven common component behavior;
- semantic token architecture where justified.

## 3. Product-family shell

Selected cross-product mechanics may be shared when users benefit from familiarity, including as proven:
- account/profile/settings behavior;
- product/module switching;
- shared onboarding mechanics;
- permission/connection explanations;
- approval/history conventions;
- notification behavior;
- deep-link/navigation conventions.

Shared mechanics do not require identical visual compositions.

## 4. Domain patterns

Patterns stay domain-owned when their meaning belongs to one business domain.

Examples:
- Marketing campaign planning/content approval;
- Support case timeline/escalation/SLA;
- Corporate cross-department orchestration.

Do not promote a domain pattern into the universal layer merely because it looks reusable.

## 5. Product identity

Products may intentionally differ in:
- density;
- layout character;
- colors;
- typography personality;
- imagery/illustration;
- shape language;
- motion character;
- vocabulary;
- information hierarchy;
- domain-specific workflows.

These differences are desirable when they improve fit, meaning or differentiation.

## 6. Tenant adaptation

Where supported, tenant customization may include:
- organization brand accents;
- logo;
- supported theme options;
- terminology/content;
- enabled modules;
- safe preferences.

Tenant adaptation should use supported configuration/extension points rather than customer-specific forks.

## 7. Contextual reuse

Reuse a shared component only when these materially fit:
- semantics;
- behavior;
- accessibility;
- information density;
- content assumptions;
- workflow consequence;
- responsive/input model;
- product context.

Technical compatibility is not sufficient.

## 8. Promotion and ownership

Move a pattern upward only through the Design Foundation promotion ladder.

Every shared layer needs:
- clear ownership;
- compatibility expectations;
- evidence/test appropriate to affected consumers;
- a removal/deprecation path.

## 9. Decision cost

The accepted cost of this doctrine is:
- moderate governance;
- layer-classification discipline;
- versioning/ownership of shared behaviors;
- cross-product QA for affected shared changes.

Revisit if that cost materially slows releases, exceptions become common, or the shared layer accumulates product-specific rules.

## Final rule

> **Standardize behavior when inconsistency creates harm. Share domain patterns when semantics are proven common. Preserve product-specific expression where it improves fit, meaning or differentiation.**

# Design Foundation — Scope Boundaries

**Status:** Structural guardrail pending doctrine research

The Design Foundation should explicitly distinguish what may become shared from what should normally remain product-specific.

## Normally candidates for shared foundation

Subject to research and validation:
- semantic interaction roles;
- focus/keyboard behavior;
- accessibility constraints;
- form/feedback behavior;
- status/error semantics;
- responsive principles;
- reusable state models;
- semantic token architecture;
- reusable component contracts where behavior is genuinely stable.

## Normally product-specific

Do not standardize globally by default:
- brand colors;
- brand typography personality;
- illustration style;
- photography/art direction;
- marketing-page composition;
- dashboard composition/layout;
- domain vocabulary;
- workflow order;
- emotional tone;
- industry-specific information density;
- product-specific motion character;
- AI personality/voice unless a safety/trust requirement justifies shared constraints.

## Review question

When considering standardization, ask:

> **Would sharing this improve quality, accessibility, interoperability or maintainability without removing meaningful product/domain differences?**

If not, keep it product- or domain-specific.

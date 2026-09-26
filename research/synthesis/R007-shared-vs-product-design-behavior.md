# R007 — Shared vs Product-Specific Design Behavior

**Date:** 2026-09-26  
**Mode:** Document Population Research  
**Status:** LOCKED — B selected and decision cost explicitly accepted 2026-09-26  
**Target:** future Design Foundation doctrine/standard and product-family design inheritance contract

## Research question

Which design decisions should Admonk make universal across the product family, which should be reusable only within a domain, and which should remain product-specific?

The central tension is:

- **a recognizable, coherent product family with strong shared foundations**, versus
- **behavior-first primitives that preserve maximum product-specific expression**.

## Source A — Atlassian Design System

**Source:** SRC-DES-001

### What it optimizes for

A coherent multi-product family.

Atlassian's current design-system documentation treats:
- foundations;
- tokens;
- guidelines;
- visual styles;
- reusable components

as a shared core used across Atlassian apps.

It also documents product/team-level UI kits and pattern libraries layered on top of the core system.

Its stated values are especially relevant:
- solve common/foundational problems first;
- make products harmonious/familiar;
- avoid consistency merely for consistency's sake;
- reject infinite flexibility.

### Strongest ideas for Admonk

- family-level consistency can reduce cognitive load and improve trust;
- a core system should solve genuinely common problems first;
- product/domain pattern libraries can sit above the shared foundation;
- tokens can express semantic decisions consistently while supporting themes;
- accessibility, responsiveness and enterprise-scale behavior can be built into common components;
- design knowledge should survive team/model turnover.

### Challenge

Copied literally, the Atlassian approach can:
- make every product feel like one corporate UI family even when stronger differentiation is valuable;
- standardize typography, spacing, color and composition more deeply than Admonk wants;
- bias future products toward dense enterprise SaaS conventions;
- cause a shared foundation to absorb domain patterns simply because several products look similar;
- make tenant/product identity feel like a theme applied after the real design decisions have already been made.

Atlassian is strongest as the **family-coherence/system-governance model**, not as Admonk's visual identity model.

## Source B — Radix Primitives

**Source:** SRC-DES-002

### What it optimizes for

Reusable, accessible behavior without prescribing appearance.

Radix provides low-level primitives that handle difficult common behavior such as:
- semantics/ARIA;
- keyboard navigation;
- focus management;
- component state;
- common interaction mechanics.

The primitives are deliberately unstyled and designed to be customized or wrapped into a product's own design system.

### Strongest ideas for Admonk

- accessibility and behavioral complexity can be shared without sharing visual identity;
- semantics/interaction contracts are often more reusable than styling;
- products can adopt shared primitives incrementally;
- composition and appearance can remain product-owned;
- stable common behavior can prevent every product from rebuilding difficult interaction logic.

### Challenge

Copied literally, a primitive-only approach can:
- leave too many decisions to each product;
- produce design drift even when behavior is accessible;
- create duplicated wrappers/components with slightly different semantics;
- fail to establish a recognizable product-family experience;
- provide no domain-pattern governance;
- shift responsibility for end-to-end accessibility and state completeness back to each product team.

Radix is strongest as the **behavior/accessibility primitive model**, not as a complete cross-product design system.

## Synthesis

The two sources show that Admonk should not choose between:
- one universal visual system; or
- completely independent product design.

The strongest model is layered.

## Proposed Admonk design inheritance model

```text
Universal Design Foundation
        ↓
Product-Family Behavior / Shell
        ↓
Domain Patterns
        ↓
Product Identity + Theme
        ↓
Tenant Adaptation
        ↓
Specific Screens
```

### Layer 1 — Universal Design Foundation

Candidate universal rules:
- interaction semantics;
- keyboard/focus behavior;
- accessible labeling;
- contrast/readability requirements;
- complete-state expectations;
- destructive/confirmation/recovery behavior;
- responsive/input principles;
- semantic status roles;
- common component behavioral contracts where proven;
- semantic token architecture where useful.

These are shared because inconsistency creates quality, accessibility or trust problems.

### Layer 2 — Product-family behavior / shell

Candidate shared family behaviors:
- account/profile/settings mechanics;
- product/module switcher behavior;
- global notification behavior;
- shared onboarding mechanics;
- permission/connection explanations;
- approval/history conventions;
- common navigation/deep-link expectations where several products are enabled.

This layer should create familiarity without forcing identical screen composition.

### Layer 3 — Domain patterns

Reusable only inside a real domain when semantics match.

Examples:
- Marketing: campaign planning, content approval, KPI review.
- Support: case timeline, escalation, SLA/resolution.
- Corporate: company-level orchestration, cross-department summaries.

Do not promote a domain pattern into the universal foundation merely because it appears visually reusable.

### Layer 4 — Product identity + theme

Product-owned:
- product colors;
- type personality;
- density;
- shape language;
- illustration/imagery;
- motion character;
- layout character;
- product vocabulary;
- domain-specific information hierarchy.

A shared component contract may have different visual expression across products.

### Layer 5 — Tenant adaptation

Where commercially/product appropriate:
- tenant brand accents;
- company logo;
- theme choices;
- density/preferences;
- organization-specific content/terminology;
- enabled product/module composition.

Tenant customization must remain inside safe supported boundaries rather than becoming code forks.

## Universal vs contextual rule

A design decision should be universal only when inconsistency would materially harm:
- accessibility;
- comprehension;
- trust;
- interoperability;
- cross-product navigation;
- safety;
- maintainability of genuinely shared behavior.

A design decision should remain product/domain-specific when it materially improves:
- workflow fit;
- information density;
- user expertise fit;
- domain comprehension;
- product differentiation;
- brand/emotional expression.

## Component reuse test

Reuse a shared component only when all materially fit:
- semantics;
- behavior;
- accessibility;
- density;
- content assumptions;
- workflow consequence;
- responsive/input model;
- product context.

Technical compatibility is not enough.

## Proposed doctrine statement

> **Standardize behavior when inconsistency creates user or system harm. Share domain patterns when semantics are proven common. Preserve product-specific expression wherever it improves fit, meaning or differentiation.**

## Decision Cost Ledger — Option B

**Decision type:** Layered choice, not a true hybrid.

The Atlassian-like family behavior and Radix-like behavior-first freedom operate at different layers **only if the boundary remains strict**.

### Benefit gained
- coherent family behavior across modules;
- lower relearning cost for multi-product customers;
- shared accessibility/state/security UX;
- preserved domain/product identity;
- reduced reinvention of difficult interaction mechanics.

### Price paid

**Governance cost:** Moderate.  
The system must continuously classify whether a design decision belongs to:
- universal foundation;
- family shell;
- domain pattern;
- product identity;
- tenant adaptation.

**QA cost:** Moderate and grows with consumers.  
Changes to genuinely shared behavior require compatibility/regression checks across affected products.

**Design-system maintenance cost:** Moderate.  
Shared behaviors, product themes and domain patterns need clear ownership/versioning.

**Speed cost:** Low initially, moderate later.  
A local product can move quickly, but promotion or modification of shared behavior requires review.

**Cognitive cost:** Moderate.  
Humans/agents must understand which layer owns a decision rather than using one flat component library.

**Flexibility cost:** Low/Moderate.  
Products cannot freely reinvent shared shell/safety/accessibility behavior without an approved exception.

**Differentiation cost:** Low if the boundary is respected; high if family cues expand into universal visual styling.

**Migration cost:** Moderate.  
Once several products consume a shared behavior/contract, changing it requires version/compatibility planning.

### Residual problems inherited

From the strong-family approach:
- some central governance is unavoidable;
- shared conventions can still expand too far if ownership is weak.

From the behavior-first approach:
- product visual drift remains possible;
- duplicated wrappers/patterns can still emerge locally.

### New layered-model failure mode

**Boundary ambiguity.**

If ownership is unclear, the layered model can become the worst of both worlds:
- central rules that slow products;
- local overrides that destroy consistency;
- duplicated components plus shared-system bureaucracy.

### Containment

Option B is acceptable only if Admonk:
1. keeps the universal layer intentionally small;
2. defines ownership for each layer;
3. uses the promotion ladder before moving local/domain patterns upward;
4. versions shared contracts that have multiple consumers;
5. tests only affected consumers rather than every product blindly;
6. allows approved product exceptions;
7. periodically removes shared rules whose central-maintenance cost exceeds value.

### Revisit trigger

Revisit B if:
- cross-product QA/governance materially slows releases;
- product teams repeatedly need exceptions;
- customers experience the modules as disconnected;
- the shared layer accumulates product-specific rules;
- maintaining themes/variants costs more than separate implementations.

### Total-system judgment

Option B is still recommended **only because the user's commercial goal requires both composability and meaningful product identity**.

If Admonk later decides visual/domain differentiation is not strategically valuable, Option A becomes cheaper.

If products stop needing a unified cross-product experience, Option C becomes cheaper.

Therefore B is not "the best of both worlds for free."

It is:
> **the higher-governance option whose extra cost buys both cross-product familiarity and product differentiation.**

## Product-owner trade-off acceptance

The product-owner selected and confirmed **B — Shared behavior + subtle family cues + distinct product identity**.

**Decision-cost acceptance:** CONFIRMED

Accepted price:
- moderate ongoing design-governance cost;
- shared-behavior ownership/versioning;
- affected-consumer QA when shared behavior changes;
- stronger layer-classification discipline.

Accepted only under the condition that the universal/shared layer remains deliberately small.

Original trade-off question:

**Are we willing to pay a moderate ongoing governance + cross-product QA cost to preserve both family coherence and distinct product identity, provided the universal layer stays deliberately small?**

### A. Strong visual family
Products share substantial visual language—typography, spacing, component appearance, navigation style and family shell—while domain screens differ.

**Benefit:** immediate cohesion and easier cross-product movement.  
**Risk:** Marketing, Support and future products may feel like skins of the same app.

### B. Shared behavior + subtle family cues + distinct product identity — RECOMMENDED
Products share interaction semantics, accessibility/state behavior, account/settings/onboarding conventions and selected family cues, but each product may have its own density, layouts, visual expression and domain character.

**Benefit:** coherent product family without sacrificing product fit or identity.  
**Risk:** requires stronger governance to prevent healthy differentiation from turning into accidental drift.

### C. Behavior-only family
Only accessibility/behavior contracts are shared. Visual identity, shell and most interaction composition are independent per product.

**Benefit:** maximum creative/domain freedom.  
**Risk:** customers who buy several modules may experience the family as disconnected products.

## Research recommendation after decision-cost review

**B remains recommended, conditionally on accepting the governance/QA price above.**

This best matches the owner's direction:
- one product family sold in parts;
- common foundations/architecture;
- consistent roles/settings/onboarding;
- unique views and identities derived from a coherent parent system.

## Lock result

- R007 decision and its price accepted.
- Design doctrine promoted.
- Design Foundation scope boundaries updated.
- Product Platform design inheritance strengthened.
- R007 locked under the Decision Cost & Coupling Framework.
- Next item: R008 — Design-system maturity direction.

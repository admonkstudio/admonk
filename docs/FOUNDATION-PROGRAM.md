# Admonk Foundation Program

**Status:** Active  
**Established:** 2026-09-26  
**Owner:** Admonk Studio  
**Current milestone:** **FOUNDATION-M1 — COMPLETE / LOCKED**  
**Latest Studio Foundation release:** **v1.0.0**  
**Included Product Supervisor:** **v2.0.0**  
**Next milestone:** **FOUNDATION-M2 — Ready, not started**  
**Implementation posture:** Research / architecture definition only unless an individual product gate explicitly authorizes implementation.

## 1. Purpose

Admonk is building two related foundations:

1. **Studio Foundation** — how Admonk researches, plans, designs, builds, verifies, launches and scales products.
2. **Product Platform Foundation** — the reusable application chassis/contracts that future company and department products inherit.

The long-term goal is a **composable product family** that can be sold in parts and configured per customer while preserving one coherent architectural foundation.

The goal is not:
- one giant monolith;
- one universal UI;
- one database for every domain;
- one fixed organization chart;
- one visual identity forced onto every product.

The goal is:

> **One product foundation, multiple product surfaces, shared contracts, domain authority, tenant configuration, and product-specific expression.**

## 2. Foundation stack

```text
Admonk Studio Foundation
├── Product Supervisor
├── researched doctrine
├── standards
├── playbooks
├── Design Foundation
├── reusable skills
├── capability/tool evaluation
└── evidence / quality gates
            ↓
Shared Product Platform Foundation
├── organization / tenant identity
├── users / memberships
├── roles / capabilities / effective permissions
├── product/module entitlements
├── settings hierarchy
├── onboarding shell
├── connector + credential ownership model
├── knowledge/context hierarchy
├── agent/tool authorization
├── approvals
├── audit / provenance / evidence
├── notifications / communication preferences
├── usage / cost governance
├── navigation / deep linking
├── design/theme inheritance
└── version / compatibility contracts
            ↓
Product Foundations
├── Company / corporate layer
├── Marketing
├── Support
└── future department/domain products
            ↓
Tenant Configuration
├── enabled products/modules
├── roles + user overrides
├── connectors
├── policies/approvals
├── brand/theme
├── workflows
└── domain-specific setup
```

## AI economics as a first-class product constraint

Product-owner direction:

> **AI/token/tool usage must remain economically viable at the user and outcome level. An AI-native product that delivers value only at unsustainable per-user operating cost is not a successful product.**

Therefore, every AI/agent product must eventually make visible:
- token/model usage;
- tool/action usage;
- cost by tenant/product/agent/feature;
- cost per active user;
- cost per successful outcome;
- failed/discarded-run cost;
- budget/limit behavior;
- cost trend as usage scales.

Raw token reduction is not the objective by itself.

The objective is:
**meet the approved quality floor and product outcome at the lowest sustainable unit cost.**

No fixed universal dollar threshold is locked yet. Thresholds belong to the commercial/product model and will be researched/approved explicitly.

## 3. Commercial composition principle

The future offering should be commercially composable:

- a customer may activate one specialist product;
- a customer may activate several specialist products;
- the company/corporate layer may be added for cross-department intelligence/orchestration;
- specialist products remain independently useful;
- when several are enabled, users experience one coherent family rather than disconnected tools.

Shared foundation capabilities should not be duplicated per product when their semantics are genuinely the same.

Product-specific domain logic remains inside the owning product.

## 4. Customization principle

Prefer:

**shared foundation + configuration + extension points**

over:

**customer-specific forks**

Customization may include:
- enabled products/modules;
- roles/capabilities;
- permissions;
- connectors;
- approval rules;
- notification preferences;
- AI/model policies;
- company/department knowledge;
- product theme/identity;
- domain workflows;
- optional modules/features.

Product-specific and tenant-specific design may change views, density, vocabulary, workflows and visual expression while preserving shared behavioral/security/accessibility contracts.

## 5A. FOUNDATION-M1 operating method

FOUNDATION-M1 is executed through the Admonk Research Director protocol:

`research/RESEARCH-OPERATING-PROTOCOL.md`

For each decision-sized item:

```text
Focused research
→ two credible resources/directions
→ challenge both
→ Admonk synthesis
→ Q1 owner input only if needed
→ approve / revise
→ lock canonical artifact
→ move immediately to next item
```

Three modes are used:
- **Document Population Research** — determine how a foundational document should be reasoned about and populated;
- **Choice / Direction Research** — compare the two strongest viable directions and choose/condition/defer;
- **Q1 Quick Directional Intake** — one simple owner question when research cannot determine strategy/preferences.

Detailed work queue:
`research/WORK-QUEUE.md`

Decision trade-offs and synthesis compatibility:
`research/DECISION-COST-FRAMEWORK.md`

A research result is not authority until it is approved and promoted into doctrine/standards/playbooks or a canonical decision.

## 5. Milestones

### FOUNDATION-M1 — Populate & Lock Studio Foundation — COMPLETE

**Goal:** complete the reusable product-development operating system before treating it as a finished foundation. **Completed and locked on 2026-09-26 as Studio Foundation v1.0.0.**

Required work:
- complete authoritative research across the parallel research tracks;
- finish capability/tooling gap discovery;
- synthesize evidence and disagreements;
- approve foundational doctrine manually;
- derive standards;
- derive playbooks;
- reconcile skills/templates with approved doctrine;
- complete Design Foundation doctrine/standards at the appropriate maturity;
- make explicit tool/technology decisions: Adopt now / Adopt conditionally / Pilot / Defer / Reject;
- define feedback loops and evidence expectations;
- re-run BriefFlow validation;
- re-run Marketing Hub validation;
- audit repository organization and contradictions;
- version and lock the resulting Studio Foundation release.

**Exit gate:**
- no foundational principle is authoritative solely because AI generated it;
- material locked decisions have passed the Decision Cost & Coupling Framework, including explicit trade-off/price acceptance where needed;
- required doctrine has human approval;
- standards are evidence-testable;
- playbooks are actionable;
- tool baseline is intentionally minimal;
- Design Foundation has explicit shared vs product-specific boundaries;
- BriefFlow and Marketing Hub validation pass or accepted gaps are explicit;
- a new person/model can navigate the foundation from `docs/FOUNDATION-INDEX.md`;
- release/version and changelog are recorded.

**Completion label:** **Admonk Studio Foundation v1.0.0 — LOCKED**. Component mapping is recorded in `docs/FOUNDATION-RELEASE-MANIFEST.yaml`.

### FOUNDATION-M2 — Define Shared Product Platform Foundation

**Goal:** define the reusable application/product chassis inherited by the company and department products.

Required decisions:
- tenant/company model;
- user/membership model;
- organization roles vs product/domain roles;
- effective-permission precedence;
- product/module entitlement model;
- settings inheritance/override hierarchy;
- shared onboarding shell;
- connector ownership and credential model;
- company/department/user knowledge hierarchy;
- AI/agent capability authorization;
- approval/control matrix;
- audit/provenance/event model;
- notification/communication preferences;
- usage/token/cost governance;
- shared navigation/deep-link conventions;
- design/theme inheritance;
- localization/timezone conventions;
- data sensitivity/retention/export/deletion contracts;
- version/compatibility/migration rules;
- runtime boundaries: shared service vs shared contract vs domain-owned service.

**Gate:** no shared runtime service is created merely because two products have similarly named concepts.

### FOUNDATION-M3 — Main Product Master Plan

**Goal:** define the complete product family as one commercially composable offering.

The plan must define:
- product promise;
- target organization/customer;
- company-level experience;
- product/module catalog;
- packaging/entitlements;
- common setup/admin experience;
- cross-product navigation;
- Corporate AI Assistant/company-brain role;
- shared intelligence boundaries;
- data/ownership boundaries;
- commercial composition;
- what works standalone vs only when multiple modules are connected;
- release/version compatibility model;
- support/operations model.

### FOUNDATION-M4 — Product / Department Foundation Template

**Goal:** make every company/department product inherit the shared foundation consistently.

Each product must define:
- role in the family;
- domain authority;
- domain entities;
- domain roles/capabilities;
- domain onboarding;
- domain knowledge;
- domain agents;
- connectors;
- action classes/approvals;
- evidence/metrics;
- product-specific views;
- domain patterns;
- brand/theme expression;
- cross-product contracts;
- dependencies on shared platform services/contracts;
- standalone behavior;
- integration behavior when other products are enabled.

Reusable template:
`templates/product-foundation/`

### FOUNDATION-M5 — Individual Product Foundations

Apply the template to:
1. Corporate AI Assistant / company layer;
2. Marketing Hub;
3. Support Platform;
4. later department products only when their domain is understood.

Do not copy Marketing semantics into other departments.

### FOUNDATION-M6 — Cross-Product Contract Freeze

**Goal:** freeze the minimum contracts required for products to behave as one family.

Candidate shared contracts:
- organization/tenant identity;
- user identity/membership;
- product/module entitlements;
- role/capability identifiers;
- app-to-app auth;
- audit/event envelope;
- provenance/evidence references;
- data-sensitivity labels;
- notification events;
- deep links/navigation;
- connector credential ownership;
- agent/tool invocation;
- product/version metadata;
- compatibility declarations.

### FOUNDATION-M7 — Integrated Reference Validation

Validate with at least:
- Marketing Hub;
- Support Platform;
- Corporate/company layer.

Success requires proving:
- shared concepts are genuinely shared;
- domain concepts remain domain-owned;
- one tenant can enable different product combinations;
- user/role/settings behavior is coherent;
- visual identity can differ without breaking shared UX/accessibility rules;
- one module can operate without unrelated modules;
- cross-product orchestration respects authority and permissions.

### FOUNDATION-M8 — Platform Foundation Lock

After validation:
- resolve contradictions;
- record accepted exceptions;
- version the Product Platform Foundation;
- create compatibility/migration policy;
- publish the reusable product-foundation onboarding/read order.

Only then should future department products be expected to conform automatically.

## 6. Completion rule

A milestone is not complete because documents exist.

It is complete when:
- authority is explicit;
- evidence exists;
- contradictions are resolved or recorded;
- owner approved;
- downstream dependency is clear;
- next model/person can continue without reconstructing the reasoning.

## 7. Design principle

> **Shared architecture should create consistency of quality and behavior—not sameness of product experience.**

## 8. Final principle

> **Build the studio foundation once. Build the product platform once. Let each product inherit the strengths and earn its differences.**

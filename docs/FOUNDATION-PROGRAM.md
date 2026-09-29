# Admonk Foundation Program

**Status:** Active  
**Established:** 2026-09-26  
**Owner:** Admonk Studio  
**Current milestone:** **FOUNDATION-M5 — Reference Domain / Role Models**  
**Latest Studio Foundation release:** **v1.0.0**  
**Included Product Supervisor:** **v2.0.0**  
**FOUNDATION-M2:** **COMPLETE / LOCKED — 2026-09-28**  
**Implementation posture:** Research / architecture definition only unless an individual product gate explicitly authorizes implementation.

## 1. Purpose

Admonk is building two related foundations:

1. **Studio Foundation** — how Admonk researches, plans, designs, builds, verifies, launches and scales products.
2. **Product Platform Foundation** — the reusable application chassis/contracts that future company and department products inherit.

The long-term goal is a **unified company operating environment** that can start with one person, grow to enterprise scale, and activate composable role/domain capabilities without duplicating the core product.

The goal is not:
- one giant monolith;
- one universal UI;
- one database for every domain;
- one fixed organization chart;
- one visual identity forced onto every product.

The goal is:

> **One company operating environment, one intelligent operator, many role/domain lenses, shared contracts, preserved domain authority and progressive tenant configuration.**

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
Unified Operating Environment
├── SIA intelligent operator
├── Company Graph / Context
├── interactive workspace runtime
├── artifacts
├── deterministic workflows
├── specialist registry/workers
└── role/domain capability packs
            ↓
Tenant Configuration
├── enabled capabilities/lenses
├── roles + user overrides
├── connectors
├── policies/approvals
├── brand/theme
├── workflows
└── domain-specific setup
```

## 2A. 2026-09-29 Product-Model Reconciliation

Current product authority:
- `docs/PRODUCT-MASTER-PLAN.md`
- `docs/SIA-EXPERIENCE-DIRECTION.md`
- `docs/audits/FOUNDATION-M3-FINAL-RECONCILIATION-2026-09-29.md`

Historical references to a multi-application product family should not override the reconciled one-environment model.

**SOLO is a temporary environment name.**

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

The future offering remains commercially composable without requiring separate applications:

- one company uses one unified environment;
- commercial packages may enable role/domain capability packs, connectors, specialist capacity, advanced analytics/AI and enterprise governance;
- role-specific acquisition offers may be marketed independently;
- entitlements remain separate from permissions;
- domain semantics remain explicit even when the customer experience is unified.

Shared capabilities should not be duplicated by department when their semantics are genuinely the same.

Domain-specific logic remains inside the owning domain/capability boundary.

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

### FOUNDATION-M2 — Define Shared Product Platform Foundation — COMPLETE / LOCKED

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

**Completion:** FOUNDATION-M2 closed on 2026-09-28 after M2-01 through M2-20 plus Exit Addenda R-01 Workload/Machine Identity and R-02 Tenant/Product Operational Lifecycle passed the exit reconciliation audit.

Canonical decisions: `docs/FOUNDATION-M2-DECISIONS.md`  
Exit audit: `docs/audits/FOUNDATION-M2-EXIT-RECONCILIATION-2026-09-28.md`

### FOUNDATION-M3 — Main Product Master Plan — COMPLETE / LOCKED

**Goal:** define the unified company operating environment, SIA company-brain experience, role/responsibility operating model, capability composition and commercial entry model.

The plan must define:
- product promise;
- solo-to-enterprise customer model;
- company-level operating environment;
- role/responsibility lenses;
- domain/capability composition;
- packaging/entitlements;
- setup/admin/health;
- SIA company-brain role;
- interactive workspace/artifact model;
- specialist/deterministic execution architecture;
- data/authority boundaries;
- human/digital workforce lifecycle;
- commercial entry points;
- cost/economics;
- release/version compatibility;
- support/operations.

### FOUNDATION-M4 — Operating-Model / Capability Template

M4 candidate authority:
`docs/FOUNDATION-M4-OPERATING-MODEL-CAPABILITY-TEMPLATE.md`

M4-01 synthesis:
`docs/research/FOUNDATION-M4-01-OPERATING-MODEL-CAPABILITY-TEMPLATE-SYNTHESIS-2026-09-29.md`

M4-02 minimum-core audit:
`docs/research/FOUNDATION-M4-02-TEMPLATE-CONSISTENCY-MINIMUM-CORE-AUDIT-2026-09-29.md`

M4 status:
**CANDIDATE / READY FOR M5 VALIDATION**

**Goal:** define the reusable contract for departments, roles, responsibilities, processes, domain capabilities and SIA specialist profiles.

Each domain/role pack must define:
- purpose/outcomes;
- domain authority;
- entities/semantics;
- role archetypes;
- responsibilities;
- process templates;
- metrics/evidence;
- artifacts;
- connectors/actions;
- approval/risk classes;
- interactive components/workspace patterns;
- diagnostic playbooks;
- eligible specialist profiles;
- authority/escalation;
- versioning;
- tenant customization boundaries.

### FOUNDATION-M5 — Reference Domain / Role Models

Current validation progress:
- **M5-01 Marketing / Marketing Manager: PASS WITH M4 CORRECTIONS — COMPLETE**
- **M5-02 Recruiting / Recruiter: PASS WITH M4 CORRECTIONS — COMPLETE**
- **M5-03 Support / Support Manager: NEXT**
- M5-04 Founder / multi-role solo

Validate the template with a deliberately small representative set, e.g.:
1. Marketing Manager / Marketing domain;
2. Recruiter / Recruiting workflow;
3. Support Manager / Support domain;
4. Founder / multi-role solo mode.

The goal is not to recreate separate products. It is to prove that the same environment can deliver deep role/domain value without flattening semantics.

### FOUNDATION-M6 — Cross-Domain / SIA Contract Freeze

**Goal:** freeze the minimum contracts required for SIA, domain capabilities, artifacts, workflows and specialist workers to behave as one coherent environment.

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
- one-person / multi-role company;
- Marketing Manager joining an existing company;
- Recruiting workflow with specialist execution;
- Support/domain workflow;
- mature custom-process company.

Success requires proving:
- one company model remains coherent;
- role/domain semantics stay explicit;
- users receive different authorized lenses over the same company;
- capabilities can be enabled without separate-app duplication;
- SIA routing respects authority/cost;
- deterministic and specialist execution cooperate;
- interactive artifacts/workspaces remain consistent;
- process discovery and customization do not corrupt authoritative truth.

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

> **Build the foundation once. Build one coherent operating environment. Let every role/domain inherit the strengths and earn only the complexity it needs.**

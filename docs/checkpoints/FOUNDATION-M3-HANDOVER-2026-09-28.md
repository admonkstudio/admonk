# FOUNDATION-M3 — Main Product Master Plan Handover

**Date:** 2026-09-28  
**Status:** CANONICAL CURRENT FOUNDATION RESUME POINT  
**Current milestone:** FOUNDATION-M3 — Main Product Master Plan  
**Implementation posture:** Product-family planning / architecture synthesis only unless a later product gate explicitly authorizes implementation.

## 1. Previous milestone closure

FOUNDATION-M2 — Define Shared Product Platform Foundation is **COMPLETE / LOCKED**.

Canonical M2 authority:
- `docs/FOUNDATION-M2-DECISIONS.md`
- `docs/FOUNDATION-M2-OPERATING-BRIEF.md`
- `docs/audits/FOUNDATION-M2-EXIT-RECONCILIATION-2026-09-28.md`

Locked scope:
- M2-01 through M2-20;
- Exit Addendum R-01 Workload/Machine Identity;
- Exit Addendum R-02 Tenant/Product Operational Lifecycle.

No M2-21 is required.

## 2. Current product-platform framing

Admonk is building a **composable product family**, not a collection of unrelated AI assistants.

Core model:

```text
Admonk Shared Product Platform Foundation
        ↓
Specialist Product Foundations
        ↓
Marketing Hub / Support / future domain products
        ↓
Jarvis intelligent experience across authorized capabilities
        ↓
Tenant configuration and commercial packaging
```

Jarvis is:
- one shared adaptive intelligent experience/orchestration layer;
- not domain truth;
- not permission authority;
- not a credential store;
- not a separate company brain;
- not an n8n frontend.

Jarvis Company Intelligence is the same Jarvis under an authorized cross-domain Company/Executive Operating Lens.

## 3. Current Foundation invariants

Do not regress these during M3:

- Tenant is the hard customer/security/commercial boundary.
- One global account may hold multiple tenant memberships.
- Products and organizational scopes are orthogonal.
- Authorization is capability-based, default-deny, restriction-wins, and explainable.
- Platform Operator authority is separate from tenant RBAC and uses JIT/support grants.
- Workload/service identity is explicit; internal network placement is not authority.
- Entitlement, permission, setting, feature flag and operational lifecycle are separate concepts.
- Commercial entitlement is separate from provisioning/offboarding state.
- Admonk One is the Tenant Administration Plane.
- Shared platform state/APIs form the Platform Management Plane.
- Admonk Control Room is the internal Platform Operations Plane.
- Specialist products retain domain semantics and authoritative business state.
- Context is federated and permission-aware.
- Connectors are Admonk-owned provider adapters/connections; n8n is not Product architecture.
- Governed actions use M2-11/RQ-07 authority and approval.
- Audit, provenance, domain events, task events, notifications, telemetry and economic records stay semantically distinct.
- Shared contracts are versioned explicitly; breaking change uses managed migration.
- SCALE-1 runtime topology stays coarse-grained and evidence-promoted rather than microservice-first.
- Pooled SaaS is the default; targeted isolation/stamps/regions arrive through evidence-driven scale gates.
- Product Supervisor governs lifecycle/quality/scale; Control Room visualizes live operational evidence.
- Jarvis character/persona variants are parked as a future add-on and are not active architecture.

## 4. M3 goal

Define the complete Admonk product family as **one commercially composable offering**.

M3 must define:
- product-family promise;
- target customer/organization;
- product/module catalog;
- standalone vs connected value;
- Jarvis Company Intelligence role;
- commercial packaging/bundles/add-ons;
- common tenant administration/setup;
- product-family navigation;
- cross-product experience;
- shared vs specialist capability ownership;
- commercial activation/deactivation behavior;
- release compatibility expectations;
- support/operations experience;
- how Control Room, Admonk One and Product Supervisor relate to the product family;
- what must remain platform-owned vs product-owned.

M3 is where the current legacy phrase **Admonk AI Suite** should be challenged and either intentionally retained or replaced with a more accurate product-family name.

## 5. M3 must not do

Do not:
- select cloud/database/queue vendors unless required by a product-family decision;
- reopen M2 contracts without new contradictory evidence;
- turn every logical capability into a service;
- design every specialist product in detail;
- authorize Production implementation;
- treat Jarvis as a separate source of truth;
- revive the separate Corporate AI Assistant/company-brain architecture;
- revive character profiles unless explicitly requested.

## 6. Suggested M3 decision sequence

1. Product-family identity and promise.
2. Customer / organization archetype and buying unit.
3. Product/module catalog and boundaries.
4. Jarvis Company Intelligence commercial/product role.
5. Standalone vs connected product value.
6. Packaging: atomic SKUs, add-ons, bundles and plan composition.
7. Common Admonk One administration/setup experience.
8. Cross-product navigation and shared shell.
9. Cross-product capability/data interaction map.
10. Product activation/deactivation/offboarding experience.
11. Support/operations model and tenant-visible health.
12. Release/compatibility expectations visible to customers.
13. Product-family naming / legacy AI Suite disposition.
14. M3 completeness audit / Product Master Plan lock.

Sequence may be adjusted if an earlier decision exposes a dependency.

## 7. Canonical resume reading order

1. `AGENTS.md`
2. `docs/FOUNDATION-STATUS.md`
3. `docs/FOUNDATION-PROGRAM.md`
4. `docs/FOUNDATION-M2-DECISIONS.md`
5. `docs/PRODUCT-PLATFORM-FOUNDATION.md`
6. `docs/JARVIS-EXPERIENCE-DIRECTION.md`
7. `docs/PRODUCT-SUPERVISOR.md`
8. this handover
9. product repositories only when needed for M3 evidence.

## 8. Exact resume instruction

> **Resume at FOUNDATION-M3 — Main Product Master Plan, starting with product-family identity/promise and customer/buying-unit definition. Do not reopen FOUNDATION-M2 unless new evidence demonstrates a contradiction.**

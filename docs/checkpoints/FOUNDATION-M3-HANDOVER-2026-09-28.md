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

> **Resume at the M3-12 owner decision — Release / Compatibility Expectations Visible to Customers. M3-01 through M3-11 are locked. If accepted, proceed to M3-13 Product-Family Naming / Legacy AI Suite Disposition.**


## 9. M3 evidence decision protocol

Owner-approved method for every M3 decision and the downstream Foundation milestones unless explicitly changed:

1. **Quick internal scan**
   - current canonical Admonk/Foundation decisions;
   - relevant product evidence;
   - only enough repository context to identify the real decision.

2. **Two high-value external sources**
   - prefer primary, authoritative, current sources;
   - select sources that materially challenge or validate the decision;
   - avoid source-volume for its own sake.

3. **Two strongest scenarios**
   - model the two strongest realistic directions;
   - state the benefit each is optimizing for.

4. **Challenge both**
   - test failure modes, cost, complexity, commercial clarity, scalability and compatibility with locked Foundation decisions;
   - do not confirm the preferred option by default.

5. **Admonk synthesis**
   - choose, condition or defer;
   - preserve the smallest direction that meets product value and Foundation constraints.

6. **Conversation output**
   - **very brief**;
   - format: **Title → Summary bullets → Conclusion**;
   - cite the two high-value sources close to the claims they support.

7. **Authority**
   - research is not locked until owner accepts it;
   - once accepted, promote the decision into the canonical M3 artifact and immediately proceed.

This protocol inherits the Studio Foundation evidence-first / Decision Cost discipline but is optimized for faster product-family decisions.


## 10. Current M3 gate

**M3-01 — Product-Family Identity & Promise**

Canonical research:
`docs/research/FOUNDATION-M3-01-PRODUCT-FAMILY-IDENTITY-PROMISE-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Recommended direction:
**Specialist-first. Platform-backed. Progressively unified.**

Current next gate:
**M3-02 — Customer / Organization Archetype & Buying Unit.**


## 11. Current M3-02 gate

Canonical research:
`docs/research/FOUNDATION-M3-02-CUSTOMER-ARCHETYPE-BUYING-UNIT-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Current next gate:
**M3-03 — Product / Module Catalog & Boundaries.**


## 12. Current M3-03 gate

Canonical research:
`docs/research/FOUNDATION-M3-03-PRODUCT-MODULE-CATALOG-BOUNDARIES-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Current next gate:
**M3-04 — Jarvis Company Intelligence Commercial/Product Role.**


## 13. Current M3-04 gate

Canonical research:
`docs/research/FOUNDATION-M3-04-JARVIS-COMPANY-INTELLIGENCE-COMMERCIAL-ROLE-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Current next gate:
**M3-05 — Standalone vs Connected Product Value.**


## 14. Current M3-05 gate

Canonical research:
`docs/research/FOUNDATION-M3-05-STANDALONE-VS-CONNECTED-VALUE-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Current next gate:
**M3-06 — Packaging: SKUs, Add-ons, Bundles & Plan Composition.**


## 15. Current M3-06 gate

Canonical research:
`docs/research/FOUNDATION-M3-06-PACKAGING-SKUS-ADDONS-BUNDLES-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Current next gate:
**M3-07 — Admonk One Administration & Setup Experience.**


## 16. Current M3-07 gate

Canonical research:
`docs/research/FOUNDATION-M3-07-ADMONK-ONE-ADMIN-SETUP-EXPERIENCE-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Current next gate:
**M3-08 — Cross-Product Navigation & Shared Shell.**


## 17. Current M3-08 gate

Canonical research:
`docs/research/FOUNDATION-M3-08-CROSS-PRODUCT-NAVIGATION-SHARED-SHELL-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Current next gate:
**M3-09 — Cross-Product Capability/Data Interaction Map.**


## 18. Current M3-09 gate

Canonical research:
`docs/research/FOUNDATION-M3-09-CROSS-PRODUCT-CAPABILITY-DATA-INTERACTION-MAP-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Current next gate:
**M3-10 — Product Activation / Deactivation / Offboarding Experience.**


## 19. Current M3-10 gate

Canonical research:
`docs/research/FOUNDATION-M3-10-PRODUCT-ACTIVATION-DEACTIVATION-OFFBOARDING-EXPERIENCE-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Current next gate:
**M3-11 — Support / Operations Model and Tenant-Visible Health.**


## 20. Current M3-11 gate

Canonical research:
`docs/research/FOUNDATION-M3-11-SUPPORT-OPERATIONS-TENANT-VISIBLE-HEALTH-2026-09-28.md`

Status:
**LOCKED — OWNER SELECTED SCENARIO B**

Current next gate:
**M3-12 — Release / Compatibility Expectations Visible to Customers.**

## M3 deep-research decision protocol — OWNER CONFIRMED

Every remaining M3 research gate must use this sequence before asking for owner approval:

1. **Topic overview** — explain the decision in plain product/business language, why it matters, what is already locked, and what remains genuinely open.
2. **Two high-authority external sources** — prefer current primary documentation, standards, or first-party product/platform evidence. Research both deeply enough to extract the useful operating model, not just a headline analogy.
3. **Two strongest viable answers/scenarios** — present two realistic directions that could actually be chosen for Admonk. Do not create a weak straw-man option merely to make the recommendation obvious.
4. **Challenge both scenarios** — test each against customer clarity, product value, security/governance, scalability, operating complexity, cost, release coupling, standalone-product integrity, cross-product value, Jarvis/Admonk One contracts and all prior locked Foundation decisions.
5. **Admonk synthesis** — identify what to adopt, reject, combine, defer or condition from the external evidence. The recommendation must fit the already-locked Admonk product/foundation plan rather than following an external vendor pattern blindly.
6. **Owner approval gate** — end with one concise recommendation and principle. Do not promote the new M3 decision into the canonical decision log until the owner explicitly accepts it.

Research artifacts should be detailed enough to preserve the reasoning and evidence for later implementation/product planning. Conversation presentation should remain concise and decision-friendly:

**Title → topic overview → source lessons → Scenario A → Scenario B → challenge → conclusion/recommendation.**


## 21. Current M3-12 gate

Canonical research:
`docs/research/FOUNDATION-M3-12-CUSTOMER-VISIBLE-RELEASE-COMPATIBILITY-2026-09-28.md`

Status:
**RESEARCH COMPLETE — OWNER DECISION PENDING**

Recommended direction:
**Managed evergreen releases with bounded customer change control and explicit compatibility/deprecation visibility.**

If accepted:
**M3-13 — Product-Family Naming / Legacy AI Suite Disposition.**

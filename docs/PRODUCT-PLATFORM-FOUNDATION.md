# Admonk Product Platform Foundation

**Status:** FOUNDATION-M2 COMPLETE / LOCKED — shared platform architecture  
**Date:** 2026-09-26  
**Implementation:** Not authorized by this document

## 1. Product model

Admonk's long-term software direction is a **composable product family**:

> **One coherent product foundation that can be sold in parts, enabled by need, and customized through configuration—while each domain keeps the views, workflows and identity required by its users.**

This does not require one monolithic codebase or one database.

The architecture should distinguish:

- **shared product foundation** — semantics/contracts/services that are genuinely common;
- **company/corporate layer** — organization-wide intelligence and coordination;
- **department/domain products** — Marketing, Support and future specialist workspaces;
- **tenant configuration** — modules, roles, permissions, connectors, policies and themes.

## 2. Shared vs domain ownership

### Shared foundation candidates

These should be investigated as shared because their semantics are likely cross-product:
- organization/tenant;
- user identity;
- membership;
- organization role;
- product/module entitlement;
- role/capability framework;
- effective-permission calculation;
- settings hierarchy;
- onboarding mechanics;
- connector/credential ownership;
- knowledge/context inheritance;
- agent/tool authorization primitives;
- approval primitives;
- audit/provenance/event envelope;
- notification preferences;
- AI usage/cost governance;
- navigation/deep links;
- design/theme contract;
- data sensitivity labels;
- version/compatibility metadata.

### Domain-owned

Examples:
- Marketing strategy/KPIs/campaigns/content/evidence semantics;
- Support cases/resolution/SLA/outcome semantics;
- department-specific agents;
- department-specific dashboards/views;
- department-specific workflows;
- domain-specific connectors/actions;
- domain-specific evidence and KPI definitions.

A shared name does not prove shared semantics.

## 3. Configuration hierarchy

A candidate configuration precedence model to validate:

```text
Platform safety / legal constraints
        ↓
Tenant/company policy
        ↓
Product/module policy
        ↓
Functional role defaults
        ↓
User-specific grants/restrictions
        ↓
Connector/provider permission
        ↓
Action-specific approval state
```

Effective access must never exceed the upstream provider's own permission.

Explicit restrictions should normally outrank broad grants.

## 4. Product packaging / entitlements

A tenant may enable:
- company/corporate layer;
- Marketing;
- Support;
- future department modules.

The entitlement system should determine which products/modules/features are active.

Do not fork the product per customer to represent packaging.

## 5. Shared setup shell

Reusable setup mechanics may include:
- company details;
- tenant/workspace;
- users;
- memberships;
- product/module enablement;
- role assignment;
- personal vs organization connectors;
- notification/communication preferences;
- AI usage policy;
- security/data policy;
- activation review;
- setup health.

Each domain then contributes its own onboarding.

## 6. Knowledge inheritance

Candidate hierarchy:

```text
Company knowledge
    ↓
Department/product knowledge
    ↓
Role/team context
    ↓
User/private delegated context
    ↓
Task/conversation context
```

Rules:
- company knowledge may be inherited where permission allows;
- department knowledge remains scoped to the domain;
- private user sources do not become company knowledge automatically;
- lower layers may extend but should not silently contradict approved higher-level truth;
- provenance/approval state must remain visible.

## 7. Design inheritance

Approved family design direction: **shared behavior + subtle family cues + distinct product identity**.

```text
Admonk Design Foundation
        ↓
Product-family shell behavior
        ↓
Product/domain theme + patterns
        ↓
Tenant brand/theme configuration
        ↓
Specific screens
```

Shared foundation should govern accessibility, state behavior, semantics and component contracts where proven.

Selected family-shell mechanics may be shared when cross-product familiarity materially benefits users.

The shared layer must remain deliberately small because its accepted cost is ongoing governance, ownership/versioning and affected-consumer QA.

Products may vary:
- layout;
- density;
- vocabulary;
- visual identity;
- imagery;
- motion character;
- domain workflows.

## 8. Jarvis Company Intelligence / cross-domain layer

Company-level intelligence is delivered by the **same Jarvis core** under an authorized Company/Executive Operating Lens. It is not a second brain or separate assistant authority.

The company layer should:
- coordinate organization-level setup through the shared platform;
- expose cross-department summaries only when permitted;
- provide company-level Jarvis orchestration across subscribed/authorized capabilities;
- link to specialist products;
- route cross-domain work through governed contracts.

It should not:
- become the source of truth for every specialist domain;
- bypass specialist authorization;
- copy every specialist database;
- erase department-specific experiences;
- create a separate company-wide memory, permission model or orchestration brain.

## 9. Shared services vs shared contracts

Use the promotion rule:

1. prove the semantics in product(s);
2. define a shared contract;
3. centralize runtime service only when centralization has clear operational/security/consistency value.

Possible outcomes:
- shared contract, separate implementation;
- shared library/package;
- shared platform service;
- domain-specific implementation only.

Do not centralize for aesthetic architecture symmetry.

A shared contract does not require a shared runtime service.

Default sequence:
1. prove the semantics in one product;
2. observe a second real consumer or a security/consistency need;
3. define the minimum shared contract;
4. keep implementations separate if that is simpler;
5. centralize runtime only when centralization reduces total operational/security/consistency cost.

Preserve deliberate change seams around tenant identity, permissions, durable data, external providers and versioned cross-product contracts.

## 10. Standalone principle

A specialist product intended to be sold separately should remain useful when enabled alone.

When multiple products are enabled:
- shared identity/settings/navigation reduce duplication;
- cross-product intelligence may increase;
- domain authority remains local.

## 11. Customization without fragmentation

Tenant customization should prefer:
- configuration;
- themes;
- feature/module entitlements;
- role/capability policies;
- domain settings;
- connector selection;
- workflow configuration;
- approved extension points.

Avoid customer-specific code forks unless a truly exceptional requirement is intentionally accepted.

## 12. Foundation closure classification

FOUNDATION-M2 architecture semantics are now complete. Remaining choices are classified instead of being treated as unresolved Foundation blockers.

### Resolved architecture semantics
- runtime-boundary model — resolved by M2-20;
- tenant isolation semantics — resolved by M2-02 plus RQ-19/RQ-25;
- connector/credential ownership — resolved by M2-09/M2-20;
- notification architecture — resolved by M2-13/M2-20;
- cross-product context/knowledge — resolved by M2-10/RQ-10;
- compatibility/versioning — resolved by M2-19;
- data export/offboarding contract — resolved by M2-18 plus M2 Exit Addendum R-02;
- observability/Control Room boundary — resolved by RQ-25/M2-20;
- release-channel/feature-flag semantics — resolved by M2-19/M2-20;
- workload/machine identity — resolved by M2 Exit Addendum R-01;
- tenant/product operational lifecycle — resolved by M2 Exit Addendum R-02.

### Runtime / infrastructure implementation — intentionally deferred
- physical DB/schema topology;
- auth/IdP provider and runtime;
- shared settings physical storage;
- event/audit transport;
- secret-vault/key-management implementation;
- queue/workflow engine;
- observability/APM backend and collector topology;
- feature-flag backend;
- exact cloud/runtime deployment topology.

### Commercial / product policy — FOUNDATION-M3/M4
- billing provider and billing workflow;
- pricing/plans/invoice/payment lifecycle;
- product/module activation UX and commercial packaging details;
- product-specific setup and lifecycle policy.

### Market / legal / Production-readiness policy — later gates
- exact legal/privacy geography requirements;
- target-market compliance programs/certifications;
- product/plan-specific RTO/RPO and SLA;
- final residency/subprocessor policy.

These deferred items do not keep the shared Product Platform Foundation architecture open.

## 12B. M2 exit addenda

Two cross-cutting contracts were promoted during the M2 exit reconciliation:

- **Workload / Machine Identity:** every protected internal runtime/service/worker has explicit workload identity and authorization context; internal network placement is never treated as authority.
- **Tenant / Product Operational Lifecycle:** commercial entitlement is separate from provisioning/active/suspended/offboarding/retained lifecycle state; lifecycle transitions coordinate Setup & Health and M2-18 governance.

Canonical authority:
`docs/FOUNDATION-M2-DECISIONS.md`

## 12A. AI usage and unit economics

AI/agent usage must be economically attributable and governable.

The shared foundation should eventually support, where relevant:
- usage attribution by tenant/product/agent/feature/user;
- provider/model/tool cost attribution;
- token/input/output/cache usage;
- cost per active user;
- cost per task/action;
- cost per successful outcome;
- failed/retried/discarded-run cost;
- tenant/plan/agent budgets;
- rate/spend/volume limits;
- cost-aware model/tool routing;
- usage anomaly alerts;
- commercial margin/unit-economics reporting.

Do not optimize raw token count at the expense of the approved quality floor.

The target is:
**the required outcome and quality at a sustainable unit cost.**

## 13. Principle

> **Commercial unity does not require technical collapse. Shared foundations should unify the experience and contracts while preserving domain authority and independent evolution.**

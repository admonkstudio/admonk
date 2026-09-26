# Admonk Product Platform Foundation

**Status:** Product-owner direction / foundation discovery  
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

Products may vary:
- layout;
- density;
- vocabulary;
- visual identity;
- imagery;
- motion character;
- domain workflows.

## 8. Corporate/company layer

The company layer should:
- coordinate organization-level setup;
- expose cross-department summaries only when permitted;
- provide company-level assistant/orchestration;
- link to specialist products;
- route cross-domain work through governed contracts.

It should not:
- become the source of truth for every specialist domain;
- bypass specialist authorization;
- copy every specialist database;
- erase department-specific experiences.

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

## 12. Foundation questions still open

Must be resolved before foundation lock:
- shared runtime deployment topology;
- shared DB vs separate DB/schema boundaries;
- tenant isolation model;
- auth provider/runtime;
- product entitlement/billing implementation;
- shared settings storage;
- connector credential service;
- event/audit transport;
- shared notification delivery;
- cross-product search/knowledge;
- compatibility/version handshake;
- module installation/activation lifecycle;
- data export/offboarding;
- legal/privacy geography requirements;
- shared operational observability;
- shared release channels/feature flags.

## 13. Principle

> **Commercial unity does not require technical collapse. Shared foundations should unify the experience and contracts while preserving domain authority and independent evolution.**

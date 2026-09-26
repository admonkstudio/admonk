# Admonk Foundation Program — Gap Audit

**Date:** 2026-09-26  
**Scope:** Studio Foundation + future Product Platform Foundation + product-family architecture  
**Posture:** Challenge assumptions as if Admonk were responsible for operating and selling the finished product.

## Executive assessment

The current direction is strong in:
- product governance;
- stage gates;
- evidence/provenance thinking;
- role/capability customization;
- connector/action safety;
- design-foundation separation;
- specialist product authority;
- AI/system orchestration philosophy.

The largest remaining gap is that the system currently has **two mature ideas that are not yet joined by one formal inheritance architecture**:

1. how Admonk builds products;
2. how the future product family itself should share foundations.

The Foundation Program now makes that connection explicit.

## Foundation blockers to resolve

### GAP-F01 — Commercial composition / entitlement model
**Severity:** Foundation blocker

The goal is one product sold in parts, but activation/licensing semantics are not yet defined.

Need:
- product/module catalog;
- tenant entitlements;
- dependency rules;
- standalone vs add-on products;
- feature/module activation lifecycle.

### GAP-F02 — Shared kernel vs domain boundary
**Severity:** Foundation blocker

We know products should share contracts without becoming one giant app, but the exact shared-kernel boundary is not frozen.

Need a decision framework for:
- shared contract;
- shared library;
- shared service;
- domain-owned implementation.

### GAP-F03 — Identity, membership and role layering
**Severity:** Foundation blocker

Need to separate:
- company/org roles;
- department/product functional roles;
- user overrides;
- provider-side permissions;
- action approval state.

One flat RBAC table will not be enough conceptually.

### GAP-F04 — Settings inheritance and override precedence
**Severity:** Foundation blocker

Need explicit hierarchy for:
- platform defaults;
- tenant settings;
- product/module settings;
- role settings;
- user settings;
- private connector preferences.

Without precedence rules, customization becomes unpredictable.

### GAP-F05 — Tenant isolation + data ownership
**Severity:** Foundation blocker before production architecture

Need:
- tenant isolation semantics;
- domain ownership;
- cross-product read/write contracts;
- retention/export/delete;
- offboarding;
- backup/recovery ownership.

### GAP-F06 — Connector credential ownership
**Severity:** Foundation blocker

Need one coherent model for:
- organization-owned;
- department-owned;
- user-delegated;
- personal/private;
- cross-product reuse;
- rotation/revocation;
- offboarding;
- provider scope limits.

### GAP-F07 — Shared AI/agent authority model
**Severity:** Foundation blocker

Need shared primitives for:
- agent identity;
- capability manifest;
- tool scopes;
- model routing;
- approval;
- action class;
- audit;
- evaluation;
- fallback;
- cost budget.

Domain agents still own domain logic.

### GAP-F08 — Knowledge/context inheritance
**Severity:** High

Need explicit boundaries for:
- company knowledge;
- department knowledge;
- user-private context;
- source authority;
- conflicts;
- approval;
- freshness;
- handover.

### GAP-F09 — Audit/event/provenance contract
**Severity:** Foundation blocker

If products are sold together, cross-product actions must be traceable consistently.

Need:
- actor;
- tenant;
- product;
- capability;
- source;
- action;
- approval;
- result;
- timestamp;
- evidence/provenance;
- correlation ID.

### GAP-F10 — Design/theme inheritance
**Severity:** High

Need contract between:
- Design Foundation;
- product-family shell;
- domain patterns;
- product theme;
- tenant theme.

Avoid both extremes:
- all apps look identical;
- every app reinvents interaction behavior.

### GAP-F11 — Navigation and shared shell
**Severity:** High

If several products are enabled, users need:
- product switch/navigation;
- deep links;
- shared account/settings access;
- coherent notifications;
- context-preserving transitions.

Do not assume this requires one frontend runtime.

### GAP-F12 — Version/compatibility strategy
**Severity:** Foundation blocker before multi-product release

Need:
- foundation version;
- product compatibility declaration;
- shared contract versioning;
- migration policy;
- deprecated contract handling;
- rollout sequencing.

### GAP-F13 — Product-specific identity without forks
**Severity:** High

Need explicit allowed customization surfaces and extension points.

Otherwise sales customization may turn into permanent client-specific code.

### GAP-F14 — Packaging/billing/usage ownership
**Severity:** High / commercial

Need eventual model for:
- per-tenant product entitlement;
- usage/cost attribution;
- AI budget;
- plan/feature limits;
- product/module billing;
- internal cost visibility.

Do not implement billing before commercial model is validated.

### GAP-F15 — Operational ownership
**Severity:** High before production

Need to know:
- who owns shared platform incidents;
- who owns domain incidents;
- connector failure ownership;
- support escalation;
- shared vs product monitoring.

### GAP-F16 — Release/feature-flag strategy
**Severity:** Medium/High

One commercial family with multiple products needs controlled independent releases.

Need:
- release channels;
- compatibility checks;
- tenant/module feature flags where justified;
- rollback ownership.

### GAP-F17 — Product analytics vs business analytics
**Severity:** Medium/High

Need to distinguish:
- how the software product itself is used;
- domain analytics shown by Marketing/Support;
- AI quality analytics;
- cost/operational telemetry.

### GAP-F18 — Search / discovery across products
**Severity:** Medium, later unless proven

If Corporate Assistant or global search spans products, define governed search contracts rather than direct database aggregation.

### GAP-F19 — Extension/plugin strategy
**Severity:** Defer

Do not build a marketplace/plugin framework now.

First prove:
- modules;
- connectors;
- capability contracts;
- extension points.

### GAP-F20 — Localization/timezone/accessibility baseline
**Severity:** High

Shared shell/settings/onboarding should not bake in one locale/timezone or accessibility assumption.

### GAP-F21 — Existing Project OS build status predates the new foundation gate
**Severity:** Governance consistency check

`docs/PROJECT-OS-STATUS.md` currently states "Ready for implementation" and names a build milestone created before the Product Supervisor/Foundation Program matured.

This does not automatically mean the Project OS architecture is wrong.

Before new Project OS implementation work resumes, run a Product Supervisor intake against its current Product Brief/spec/architecture and decide one of:
- proceed under the current Studio Foundation version with explicit accepted gaps;
- pause until FOUNDATION-M1 completes;
- treat it as a controlled pilot used to validate the foundation.

Do not let an older "ready for implementation" label silently bypass newer governance.

## Architectural contradiction resolved

Existing suite rule:
**separate products + shared contracts + governed integration**

New commercial goal:
**one product sold in parts**

These are compatible if interpreted as:

> **One commercial/product family with a shared platform foundation and bounded domain products.**

They are incompatible only if "one product" is interpreted as:
- one codebase;
- one database;
- one domain model;
- one UI;
- one release train.

Do not make that interpretation.

## Highest-risk future mistake

The largest architecture mistake would be to centralize everything too early in order to create superficial consistency.

The second-largest would be to let every product independently rebuild identity, roles, settings, onboarding, connectors, audit and AI permissions.

The target is between those extremes:
**shared primitives/contracts where semantics match; domain ownership where they do not.**

## Audit conclusion

Before individual app architecture is locked, Admonk needs:
1. completed Studio Foundation;
2. Shared Product Platform Foundation;
3. product-family master plan;
4. product-foundation inheritance template;
5. at least two real specialist-product validations before promoting shared semantics.

The current roadmap is viable if those gates are respected.

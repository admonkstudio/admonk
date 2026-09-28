# FOUNDATION-M3-10 — Product Activation / Deactivation / Offboarding Experience

**Date:** 2026-09-28  
**Status:** LOCKED — OWNER SELECTED SCENARIO B  
**Milestone:** FOUNDATION-M3 — Main Product Master Plan  
**Method:** quick internal scan → two high-value sources → two scenarios → challenge → synthesis  
**Implementation authority:** None

## Internal scan

Already locked:
- M2 Exit Addendum R-02: commercial entitlement and operational lifecycle are separate contracts;
- candidate product lifecycle: NOT_ENABLED → PROVISIONING → ACTIVE → DEGRADED/SUSPENDED → DEPROVISIONING → RETAINED/CLOSED where applicable;
- M2-18: shared data-governance contract + domain-owned lifecycle/export/delete execution;
- M2-09: shared integrations/control plane with reusable provider connections;
- M2-13: shared notification routing/delivery with product-owned semantics;
- M2-15: tenant-aware navigation and Resource Links;
- M2-20: connectors, Durable Tasks, notifications and other runtimes obey lifecycle policy rather than entitlement alone;
- M3-06: customer-facing packaging resolves into atomic entitlements; entitlement, lifecycle, permissions, flags and usage stay separate;
- M3-07: Admonk One owns subscription administration, coordinated lifecycle/offboarding and suite-level Setup & Health;
- M3-09: products keep domain truth; cross-product consumers use governed contracts and derived projections.

The M3-10 question is therefore not whether lifecycle states exist. That is already locked.

The remaining product decision is:

> How should customers experience activation, suspension, deactivation and offboarding so changes are safe, understandable, reversible where appropriate and coordinated across shared dependencies?

## External source 1 — Microsoft 365 subscription lifecycle

Microsoft documents staged subscription lifecycle behavior rather than treating cancellation as immediate irreversible deletion. Depending on subscription route/state, access can progress through active/expired/disabled/deleted states. Admins may retain access during intermediate states for reactivation or backup, while the final deleted state is irreversible.

Source:
- https://learn.microsoft.com/en-us/microsoft-365/commerce/subscriptions/what-if-my-subscription-expires

Admonk implication:
- access cessation, administrative recovery/export and permanent deletion are separate moments;
- customers need visible lifecycle status and clear deadlines;
- an irreversible terminal state should not be reached accidentally through one ordinary toggle.

## External source 2 — Atlassian subscription deactivation/reactivation

Atlassian separates scheduled subscription deactivation from later data deletion. Paid subscriptions can be deactivated after the subscription period; retained data can be restored if reactivated during the retention period, while permanent deletion happens after retention. Atlassian also makes the inactive/deactivated state visible in administration.

Sources:
- https://support.atlassian.com/subscriptions-and-billing/docs/cancel-a-subscription/
- https://support.atlassian.com/subscriptions-and-billing/docs/reactivate-a-subscription/

Admonk implication:
- deactivation can be scheduled and reversible;
- inactive products should remain administratively visible even when normal user access is removed;
- retention and reactivation windows should be explicit rather than hidden implementation behavior.

## Scenario A — Commercial Toggle Drives Runtime Directly

Customer buys/enables a product and it becomes active immediately. Customer cancels/disables it and normal runtime shuts down immediately, followed by one fixed deletion timer.

### Strengths
- simplest mental model;
- minimal administration UI;
- easy billing/runtime coupling;
- fewer lifecycle states exposed.

### Challenge
- conflicts with locked separation of entitlement and lifecycle;
- setup may not be ready when entitlement turns on;
- cancellation can interrupt in-flight automations, workflows, connectors or exports;
- shared connectors may still be used by other products;
- cross-product Jarvis/projections may retain references without coordinated cleanup;
- one fixed retention rule cannot represent domain/legal/customer policy differences;
- unsafe for mistaken cancellation and weak for enterprise governance;
- poor transparency around what stops now versus what is retained or deleted later.

This optimizes implementation simplicity at the expense of safety, recoverability and family-level coordination.

## Scenario B — Guided, Staged, Dependency-Aware Product Lifecycle

Admonk One presents activation/deactivation as a lifecycle plan rather than a raw entitlement toggle.

The commercial entitlement remains one input. Operational state is visible separately.

### Activation experience

1. **Entitlement acquired**
   - subscription/SKU becomes entitled;
   - product lifecycle enters PROVISIONING rather than pretending to be fully active.

2. **Provisioning + required setup**
   - shared tenant/access dependencies are prepared;
   - product-owned storage/runtime/resources are provisioned;
   - required integration/setup dependencies are surfaced through Setup & Health;
   - permitted administrators can enter setup surfaces during provisioning.

3. **Readiness evaluation**
   - Admonk One shows Required / Recommended / Later items;
   - Required blockers are explicit;
   - domain product reports product-specific readiness;
   - dependency/connection failures show DEGRADED rather than silently appearing healthy.

4. **ACTIVE**
   - product becomes normally available when minimum activation contract is satisfied;
   - optional Recommended/Later work remains visible after activation.

### Deactivation / suspension experience

Different intents stay distinct:

- **Scheduled commercial cancellation:** entitlement is scheduled to end according to commercial terms; operational product can remain active until the effective date.
- **Administrative suspension:** temporarily blocks ordinary use without deleting domain state.
- **Security/risk suspension:** can stop selected capabilities or the product immediately under governed policy.
- **Permanent product offboarding:** begins the export/retention/delete process.

Admonk One shows the effective state and reason rather than compressing all four into “Off.”

### Pre-offboarding impact preview

Before a destructive product offboarding action, Admonk One computes and displays what will be affected:

- users/roles with product access;
- shared versus product-exclusive provider connections;
- scheduled/durable tasks;
- active agents/automations;
- shared notification dependencies;
- Resource Links and cross-product references;
- Jarvis Company Intelligence dependencies;
- cross-product relationship/search/analytics projections;
- data export availability;
- retention/delete policy;
- pending approvals or outstanding work;
- billing effective date where relevant.

The preview must distinguish:
- stops immediately;
- remains until effective date;
- retained but inaccessible to ordinary users;
- preserved because another product still depends on it;
- eligible for export;
- permanently deleted at final closure.

### Deprovisioning

Once offboarding takes effect:
- ordinary product access is removed;
- new domain writes/actions stop according to lifecycle policy;
- durable/in-flight work is completed, drained, canceled or preserved according to product policy;
- exclusive connectors may be disconnected/revoked when safe;
- shared connectors remain if other active products depend on them;
- product-owned events/notifications stop according to lifecycle rules;
- cross-product consumers stop receiving current domain capability access;
- shared derived projections are expired/rebuilt/deleted according to source lifecycle and governance.

### Retained state

Where policy permits:
- product is not part of normal user navigation;
- it remains visible to authorized admins in Admonk One as Inactive/Retained;
- retention deadline and final deletion date/state are visible;
- export remains available where policy allows;
- reactivation is available only if policy, commercial state and compatibility permit;
- reactivation restores from retained authoritative state rather than creating ambiguous duplicate data.

### Closed / terminal state

After governed retention/deletion completes:
- product state becomes CLOSED;
- deleted domain data is not represented as recoverable;
- remaining required audit/provenance/economic records follow their own retention policy;
- Resource Links fail safely with an explainable closed/deleted state;
- shared projections no longer present stale domain content as live truth.

### Safety / UX rules

- destructive actions require explicit impact preview and confirmation;
- permanent/early deletion is a separate high-friction action from cancellation;
- irreversible deletion uses stronger confirmation and authorization than routine deactivation;
- customer-visible dates use explicit timezone/business-date semantics;
- every lifecycle transition produces an auditable receipt;
- authorized users can see why a product is unavailable and what action is possible;
- reactivation never silently bypasses compatibility/setup/security checks;
- there is no promise of one universal retention duration: product/domain/legal policy governs actual duration.

### Cross-product dependency rule

A product may be deactivated without forcing unrelated products off.

Shared resources are removed only when:
1. no active/retained dependency still requires them, and
2. governance/lifecycle policy permits removal.

This applies especially to:
- provider connections;
- identity/membership;
- shared notification controls;
- shared relationship/search projections;
- Jarvis Company Intelligence;
- common audit/provenance records.

### Strengths
- matches locked lifecycle architecture;
- safe and understandable for enterprise admins;
- supports reversibility before terminal deletion;
- preserves shared dependencies correctly;
- integrates naturally with Setup & Health;
- protects against accidental data loss;
- gives Jarvis and other products deterministic lifecycle signals.

### Challenge
- more state/UI than a simple toggle;
- dependency analysis must be reliable;
- each product must declare lifecycle hooks/readiness/retention behavior;
- reactivation compatibility can become complex over long retention windows;
- customer-facing lifecycle language must remain simpler than internal runtime states.

Mitigation:
- expose only meaningful customer states while retaining richer internal states;
- use one shared lifecycle contract and impact-preview pattern;
- let products supply domain-specific hooks/policies;
- default to safe retention and explicit final deletion;
- keep commercial, lifecycle, data-retention and permission concepts visually distinct.

## Synthesis

Choose **Scenario B**.

The customer should not have to understand the entire internal state machine, but they must understand:
- whether the product is usable now;
- whether cancellation is scheduled;
- whether data is retained;
- what dependencies will be affected;
- whether reactivation is possible;
- when deletion becomes irreversible.

Recommended customer-facing state model:

**Setting up → Active → Attention/Suspended → Offboarding → Retained → Closed**

Internal systems may retain more precise states, but Admonk One should normalize them into this understandable lifecycle experience.

## Recommended lock

> **M3-10 — Guided, Staged, Dependency-Aware Product Lifecycle**
>
> Admonk separates commercial entitlement, operational lifecycle, access and data retention in both system behavior and customer-facing administration.
>
> Activation moves through provisioning and required readiness before normal ACTIVE operation.
>
> Cancellation, suspension and permanent offboarding remain distinct actions/states.
>
> Before offboarding, Admonk One presents a dependency-aware impact preview covering users, integrations, automations/tasks, Jarvis/cross-product dependencies, exports and retention/deletion consequences.
>
> Deactivation removes ordinary product operation without automatically destroying retained data or shared resources still required elsewhere.
>
> Product data may enter a policy-governed retained state with explicit reactivation/export deadlines before irreversible closure/deletion.
>
> Permanent or accelerated deletion is a separately authorized destructive action with stronger confirmation.
>
> Shared resources are released only when no remaining product dependency and no governance requirement needs them.
>
> Every transition is auditable and Setup & Health remains the customer-visible control point.
>
> **Turning a product off should be safe and reversible until the customer deliberately crosses the irreversible boundary.**

**Recommendation:** LOCKED — Scenario B.

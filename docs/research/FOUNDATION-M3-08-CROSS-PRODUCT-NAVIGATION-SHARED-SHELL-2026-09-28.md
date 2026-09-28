# FOUNDATION-M3-08 — Cross-Product Navigation & Shared Shell

**Date:** 2026-09-28  
**Status:** RESEARCH COMPLETE — OWNER DECISION PENDING  
**Milestone:** FOUNDATION-M3 — Main Product Master Plan  
**Method:** quick internal scan → two high-value sources → two scenarios → challenge → synthesis  
**Implementation authority:** None

## Internal scan

Already locked:
- M2-03: one global account + tenant memberships + shared suite shell/app launcher; product permissions remain domain-scoped;
- M2-15: tenant-aware suite navigation + stable cross-product Resource Link contract; Admonk One/family shell owns tenant/product switching; specialist products own internal navigation and logical-resource resolution;
- M2-16: shared behavior + subtle family cues + distinct product identity;
- M3-05: each specialist product must deliver complete standalone value; connected value compounds;
- M3-06: commercial packages resolve to atomic product/add-on entitlements;
- M3-07: Admonk One is the shared Tenant Administration & Setup/Health Center while specialist products own specialist configuration;
- JX-01: users can move between Jarvis and specialist products while preserving tenant/product/resource context.

The remaining M3 question is not whether navigation is shared. That ownership is already decided.

The customer-experience question is:

> How much shared shell should remain visible during everyday product work, and what belongs in it?

## External source 1 — Atlassian

Atlassian uses a shared app-switching pattern across its product family:
- the app switcher is available from most Atlassian apps;
- users can switch between products/sites;
- organization context can filter the available apps;
- newer navigation patterns align movement across products while the apps still retain their own product-specific work/navigation.

Sources:
- https://support.atlassian.com/navigation/docs/how-to-switch-between-apps-and-organizations/
- https://support.atlassian.com/navigation/docs/navigation-reference-guide/

Admonk implication:
- a family-level switcher and navigation grammar can reduce orientation cost;
- product discovery does not require one giant universal navigation tree;
- shared shell behavior can remain consistent while specialist product navigation remains local.

## External source 2 — Microsoft

Microsoft Dynamics 365 / Power Apps similarly separates suite chrome from app navigation:
- apps share a common top header and app launcher;
- common utilities such as settings/help/account live in the shared header;
- app home pages and left-side navigation vary according to the application and work;
- Microsoft has continued aligning headers/navigation with Microsoft 365 patterns for family coherence without eliminating app-specific navigation.

Sources:
- https://learn.microsoft.com/en-us/dynamics365/get-started/find-your-way-around
- https://learn.microsoft.com/en-us/power-apps/user/navigation

Admonk implication:
- a compact common shell can create family coherence;
- specialist workspaces do not need to surrender their own navigation model;
- suite-level switching and product-local work can coexist without double-owning the same navigation semantics.

## Scenario A — Heavy universal suite shell

Every product is wrapped in a persistent universal Admonk navigation system.

Possible structure:
- global header;
- global sidebar containing family-level Home, Jarvis, products, notifications, recent items, admin and shared utilities;
- specialist product navigation nested inside or beneath the suite navigation.

### Strengths
- maximum family visibility;
- strong cross-product discoverability;
- very consistent suite branding;
- obvious paths to other products and common services.

### Challenge
- creates double-navigation pressure when specialist products also need their own structure;
- consumes valuable working space, especially on smaller screens;
- encourages the family shell to absorb product concerns over time;
- weakens the feeling that each product is a complete standalone product;
- increases cross-product release coupling and affected-consumer QA;
- makes distinct product identity harder to preserve;
- risks turning Admonk One into a permanent wrapper around specialist work rather than the administration/coordination plane.

This direction optimizes **suite visibility** but pays for it with navigation density and coupling.

## Scenario B — Thin shared family shell + product-owned navigation

Use a deliberately small, consistent family shell around specialist products.

### Shared family shell owns
- current tenant/company context;
- tenant switcher where the user has multiple memberships;
- entitlement-aware product/app switcher;
- current product identity;
- shared notification/inbox entry;
- help/support entry;
- account/profile entry;
- Admonk One administration entry when authorized;
- a shared Jarvis/command entry only where the cross-product contract genuinely applies.

The shell may later add a small number of proven cross-product utilities, such as recent/favorite resources, but they are not assumed by default.

### Specialist products own
- primary section navigation;
- dashboards/workspace navigation;
- product breadcrumbs;
- tabs and domain command bars;
- product search when domain semantics differ;
- specialist settings;
- specialist setup;
- domain workflows and terminology.

### Cross-product movement
Use the locked Resource Link contract:
- links preserve tenant, product and logical resource context;
- the target product resolves the resource;
- unavailable/unauthorized targets produce an explainable safe fallback instead of a dead end;
- product switching shows only products the tenant/user can access;
- direct deep links can land on the exact product resource rather than forcing a return through Admonk One.

### Responsive behavior
The shared shell must become smaller as space decreases:
- do not keep both a suite sidebar and a product sidebar/drawer on mobile;
- preserve one clear product switch/context control;
- let the active product own the main mobile navigation.

### Accessibility and consistency
The family shell should have stable:
- keyboard behavior;
- focus behavior;
- landmarks/semantics;
- switching patterns;
- accessibility states;
- account/help/notification placement.

Products remain free to use domain-appropriate layouts inside that boundary.

### Strengths
- preserves standalone product clarity;
- keeps the working surface large;
- reduces duplicate navigation;
- supports distinct product identity;
- makes cross-product switching predictable;
- limits shared-shell release coupling;
- aligns directly with M2-15, M2-16, M3-05 and M3-07.

### Challenge
- family-wide capability discovery is less visually aggressive;
- products can drift if internal navigation quality is not governed;
- Resource Link fidelity becomes important;
- some customers may expect more suite-level shortcuts.

Mitigation:
- keep the shared shell contract small but strict;
- reuse shared behavioral/accessibility primitives;
- use product navigation conformance/QA rather than centralizing all product navigation;
- add cross-product shortcuts only from measured need.

## Synthesis

Choose **Scenario B**.

M2-15 has already settled the architectural ownership:
- family shell owns tenant/product switching;
- specialist products own internal navigation.

M3-08 should translate that architecture into a customer-facing experience rather than reopen it.

The smallest coherent solution is:
1. one compact family context;
2. one active specialist workspace at a time;
3. stable Resource Links between them;
4. Admonk One as the family administration/setup destination, not a heavy wrapper around every product;
5. shared shell behavior that is consistent, accessible, responsive and deliberately slow-changing.

## Recommended lock

> **M3-08 — Thin Shared Family Shell + Product-Owned Navigation**
>
> Admonk uses a compact, tenant-aware and entitlement-aware shared family shell across the product family.
>
> The shell owns tenant/product switching and a deliberately small set of shared utilities such as notifications, help, account/profile, authorized Admonk One administration access and applicable Jarvis entry points.
>
> Specialist products own their primary/internal navigation, workspace structure, terminology, domain controls and specialist settings.
>
> Cross-product movement uses stable Resource Links that preserve tenant/product/resource context and resolve inside the owning product.
>
> Admonk One is the family administration/setup surface; it should not become a permanent heavy navigation wrapper around specialist products.
>
> The shared shell remains responsive, accessible and intentionally small so products can preserve standalone value and distinct identity without sacrificing family coherence.
>
> **Shared orientation; specialist navigation.**

**Recommendation:** LOCK Scenario B.

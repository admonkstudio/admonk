# FOUNDATION-M3-07 — Admonk One Administration & Setup Experience

**Date:** 2026-09-28  
**Status:** LOCKED — OWNER SELECTED SCENARIO B  
**Milestone:** FOUNDATION-M3 — Main Product Master Plan  
**Method:** quick internal scan → two high-value sources → two scenarios → challenge → synthesis  
**Implementation authority:** None

## Internal scan

Already locked:
- M2-08: one shared Setup Center + product-owned setup modules/checklists;
- M2-09: Admonk One is the Tenant Administration Plane for setup, integrations, access and subscriptions;
- M2-15: Admonk One/family shell owns tenant/product switching;
- M2 Exit R-02: setup/readiness is distinct from entitlement and lifecycle;
- M3-06: the customer buys a simple commercial package that resolves to atomic entitlements underneath.

The remaining M3 question:
> What should the **customer experience** of Admonk One be?

## External source 1 — Atlassian

Atlassian Administration centralizes:
- organization users/accounts;
- apps/products;
- billing;
- security and organization settings.

Atlassian still keeps app-specific settings in the owning app.

Sources:
- https://support.atlassian.com/organization-administration/docs/what-is-an-atlassian-organization
- https://support.atlassian.com/organization-administration/docs/navigate-administration-in-an-atlassian-government-environment/

Admonk implication:
- central administration does not require central ownership of product semantics;
- users/access/security/subscription belong naturally in one tenant-level place;
- product-specific configuration can remain product-owned.

## External source 2 — Microsoft

Microsoft 365 Admin Center centralizes:
- users;
- product licenses;
- groups/teams;
- products/subscriptions;
- organization administration and support.

Microsoft also supports role-specific administration rather than forcing one universal super-admin workflow.

Sources:
- https://learn.microsoft.com/microsoft-365/admin/admin-overview/admin-center-overview
- https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/add-users

Admonk implication:
- one administration destination reduces duplicated tenant management;
- licensing/access can be centrally managed while individual apps retain their own deeper configuration;
- least-privilege admin roles should shape what each administrator sees.

## Scenario A — Distributed product administration

Admonk One is mainly:
- launcher;
- subscription overview;
- links to each product.

Most setup/admin lives inside Marketing Hub, Support and future products.

### Strengths
- strong product autonomy;
- simpler central admin implementation;
- product teams own all configuration UX.

### Challenge
- repeats organization/users/security/integration setup;
- harder cross-product onboarding;
- more duplicated settings;
- customers must remember where each admin setting lives;
- weakens Admonk's platform value;
- creates friction for multi-product expansion.

## Scenario B — Central Admonk One administration + federated product setup

Admonk One becomes the single tenant-level administration destination for **shared concerns**.

### Admonk One owns the experience for
- organization/tenant profile;
- organizational scopes;
- users, memberships and shared access;
- product/SKU subscriptions and activation state;
- shared role/capability administration where appropriate;
- integrations/connections and connection health;
- shared security/policy defaults;
- AI Credit/usage overview;
- billing/subscription entry points;
- tenant branding/shared preferences;
- data/export/offboarding coordination;
- Setup & Health overview;
- support-access transparency;
- tenant-wide health/status summaries.

### Products own
- domain-specific setup;
- domain role/capability meaning;
- domain workflows;
- domain fields/taxonomies;
- product-specific integrations where truly domain-only;
- detailed product settings;
- specialist health checks.

### Setup experience
Admonk One presents a **guided setup graph**, not one giant wizard.

Tasks are:
- Required;
- Recommended;
- Later.

Setup is:
- resumable;
- role-aware;
- product-aware;
- dependency-aware;
- progressive;
- capable of deep-linking into the owning product and returning to Admonk One.

### Setup & Health
Onboarding does not disappear after launch.

The same surface evolves into **Setup & Health**:
- configuration completeness;
- failing/expired connections;
- access problems;
- missing required setup;
- product activation state;
- recommended improvements;
- unresolved offboarding/data-governance tasks.

### Admin visibility
Admonk One is capability-aware:
- tenant admin sees company-level administration;
- product admin sees relevant product configuration;
- billing admin sees commercial controls;
- security/access admin sees access/security;
- ordinary users do not see admin functions merely because they use a product.

### Strengths
- one obvious place to manage the customer relationship with Admonk;
- eliminates duplicated company setup;
- improves expansion into additional products;
- clearer health/activation visibility;
- preserves specialist product ownership;
- aligns directly with M2 contracts.

### Challenge
- central admin can become bloated if every setting is copied into it;
- requires strong Resource Links/deep links;
- setting ownership must be explicit;
- needs clear navigation between shared and product-owned configuration.

## Synthesis

Choose **Scenario B** with a strict ownership rule:

> **Admonk One owns shared administration and setup coordination; products own specialist configuration.**

A setting/task belongs in Admonk One only if it is:
1. genuinely tenant-wide/shared;
2. needed to activate/administer products across the family;
3. commercial/access/security/integration/governance related; or
4. useful as a suite-level health/setup summary.

Otherwise, Admonk One should link to the owning product rather than duplicate its UI.

## Recommended lock

> **M3-07 — Admonk One as the Tenant Administration & Setup/Health Center**
>
> Admonk One is the single customer-facing administration destination for shared tenant concerns across the Admonk product family.
>
> It owns the administration experience for tenant identity, people/access, subscriptions/entitlements, shared integrations, shared policy/security, AI usage/credits, coordinated lifecycle/offboarding and suite-level Setup & Health.
>
> Specialist products retain ownership of their domain-specific configuration, workflows, terminology and detailed setup.
>
> Admonk One coordinates product setup through product-contributed tasks/checklists and stable deep links rather than copying every product setting into one giant admin UI.
>
> Setup is progressive, resumable, role-aware, product-aware and dependency-aware using **Required / Recommended / Later**.
>
> Onboarding evolves into persistent **Setup & Health** so configuration, connection, activation and governance problems remain visible after initial launch.
>
> Admin surfaces are capability-aware and least-privilege; Admonk One is not a universal super-admin screen.
>
> **One place to administer Admonk; the right product remains the place to configure specialist work.**

**Recommendation:** LOCKED — Scenario B.

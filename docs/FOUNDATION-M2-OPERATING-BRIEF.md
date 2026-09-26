# FOUNDATION-M2 — Operating Brief

**Milestone:** FOUNDATION-M2 — Define Shared Product Platform Foundation  
**Status:** ACTIVE  
**Started:** 2026-09-26  
**Inherits:** Admonk Studio Foundation v1.0.0 / Product Supervisor v2.0.0  
**Implementation:** Not authorized by this brief

## Purpose

Define the minimum reusable platform contracts/chassis that genuinely belong across Admonk products while preserving domain ownership, independent evolution and low operating cost.

## Product-owner hard constraints

These are not optional optimization ideas. They are decision filters for every M2 architecture choice.

### 1. Organization, reuse and scalability

- Repository/folder/navigation structure must stay understandable as products, packages and teams grow.
- Avoid duplicate implementations of the **same stable behavior**. Promote proven shared behavior into reusable code/contracts instead of copying it.
- Do not generalize merely because two pieces of code look similar. Shared code must have genuinely shared semantics and ownership.
- Prefer the smallest clear implementation. Do not turn a one-line/direct solution into a large abstraction unless the added behavior is actually required.
- Architecture must have explicit scale paths for users, tenants, data, connectors, agents, traffic, storage, permissions, teams and operational load.
- Scale from measured/evidenced triggers, not hypothetical future size.
- Navigation, ownership and dependency direction must remain machine- and human-discoverable.

### 2. Usage efficiency

- Start with the minimum recurring cost capable of delivering Production-quality outcomes.
- AI/model/tool usage must be economically viable at the user and successful-outcome level.
- Expensive models/tools are justified by measurable quality/risk benefit, not prestige.
- Use deterministic code/rules instead of AI where deterministic logic is cheaper, safer and sufficient.
- Design for attribution of usage/cost by tenant/product/feature/agent where material.
- A feature whose normal usage destroys product economics is not a successful feature.

### 3. Testing speed

- Correctness matters, but testing must not make delivery needlessly slow.
- Follow S007/PB02: test critical behavior at the cheapest useful level.
- Prefer fast logic tests, targeted integration tests and a small critical E2E set rather than exhaustive E2E testing at every step.
- Run deeper suites when risk/change scope warrants them.
- Where the eventual repository/tooling supports it, prefer affected/change-scoped testing and caching rather than rerunning unrelated work.
- Real failures become focused regression tests.

### 4. Development/tooling cost

- Treat developer time, AI coding tokens, CI minutes, SaaS plans, API credits, storage and maintenance as costs.
- Prefer native/existing capabilities before adding tools.
- Avoid dependencies/services whose maintenance burden exceeds the problem they solve.
- Code, agent and documentation workflows should minimize repeated exploration/reasoning.
- Reusable canonical modules, clear APIs and machine-readable project/dependency maps are preferred when they reduce duplicated work and AI-token consumption.

## M2 decision filter

Every significant M2 decision must answer:

1. What shared capability/problem are we solving?
2. Can an existing/local/domain solution handle it adequately?
3. Does sharing remove genuine duplication or merely create coupling?
4. What is the smallest implementation/contract that solves it?
5. What does this cost in runtime spend, engineering effort, CI/testing, maintenance and AI/tool usage?
6. How does it scale?
7. How is it tested proportionally?
8. What evidence would justify expanding or centralizing it later?
9. What is the exit/migration path if the decision becomes wrong?

## Research method

Use the same FOUNDATION-M1 research discipline:

**repository context → current primary/high-reliability sources → strongest competing approaches → challenge both → smallest Admonk synthesis → explicit accepted cost/tradeoff → owner Q1 when strategic preference remains → lock decision.**

Do not select tools because a platform supports more features. Capability and architecture decisions come first.

## Initial M2 decision sequence

1. **M2-01 Repository, code reuse and shared-package boundary — LOCKED**
2. **M2-02 Tenant/company identity model — LOCKED**
3. **M2-03 User + membership model — LOCKED**
4. **M2-04 Organization roles vs product/domain roles — LOCKED**
5. Effective-permission precedence
6. Product/module entitlements
7. Settings inheritance/overrides
8. Shared onboarding shell
9. Connector + credential ownership
10. Knowledge/context hierarchy
11. AI/agent capability authorization + approvals
12. Audit/provenance/event model
13. Notification/communication preferences
14. Usage/token/cost governance
15. Navigation/deep-link contract
16. Design/theme inheritance
17. Localization/timezone
18. Data sensitivity/retention/export/deletion
19. Version/compatibility/migration
20. Runtime boundary decisions: shared contract vs package vs service vs domain-owned implementation

Sequence may be adjusted when an earlier decision proves a dependency.

## M2 gate

Do not lock a shared runtime service merely because two products have similar names or code.

Promotion ladder for shared platform behavior:

**Domain-local → proven second consumer / hard consistency need → shared contract → shared package if useful → shared runtime service only when operational/security/consistency economics justify centralization.**


## Locked decision — M2-01 Repository, code reuse and shared-package boundary

**Decision:** Federated product repositories + promoted shared contracts/packages.

Rules:
- keep Corporate AI Assistant, Marketing Hub and Support Platform in independent repositories while their product lifecycles remain materially different;
- domain behavior stays domain-owned;
- do not copy a proven stable cross-product behavior when one shared implementation/contract can serve the same semantics;
- do not create generic shared abstractions merely because code looks similar;
- promotion path: **domain-local → proven second consumer or hard consistency/security need → shared contract → shared package if useful → shared runtime service only when its economics justify centralization**;
- prefer direct/simple code before abstractions;
- organize shared platform code by meaningful domain/capability, not dumping grounds such as `misc/` or generic `helpers/`;
- test shared changes using the smallest affected scope practical; do not rerun unrelated product suites merely for ceremony;
- monorepo migration is explicitly deferred until measured cross-repository friction (synchronized changes, package-version churn, duplicated CI, cross-product refactor cost, or navigation burden) outweighs independent-repository benefits.

**Accepted cost:** temporary duplication may exist while semantics are still unproven; once genuinely shared semantics are established, copy/paste duplication should end.

**Status:** LOCKED.


## Locked decision — M2-02 Tenant / Company Identity Model

**Decision:** Tenant is the hard customer/security/commercial boundary. Internal company structure is represented by lightweight recursive organizational scopes. Products are a separate dimension. Shared platform capabilities are versioned/reusable. Ask Kalam is the first M2 reference implementation.

### Core model

```text
Tenant / Customer Organization
├── Organizational scopes
│   ├── company-wide
│   ├── departments
│   ├── teams / regions / business units only when needed
│   └── recursive through parent_scope_id
├── Products
│   ├── Corporate AI Assistant
│   ├── Ask Kalam / Customer AI
│   ├── Marketing Hub
│   ├── Recruitment
│   └── future products
└── Shared platform capabilities
    ├── identity / memberships
    ├── permissions / entitlements
    ├── connectors / credentials
    ├── approvals / audit / provenance
    ├── knowledge/context rules
    ├── notifications
    └── usage / AI cost
```

### Rules
- tenant is the hard isolation boundary;
- organizational scopes are not separate tenants by default;
- products and organizational scopes are orthogonal: one product may serve several scopes and one scope may use several products;
- use one recursive `organizational_scope` concept rather than separate duplicated tables for departments/teams/regions unless proven necessary;
- tenant, scope and product context must remain available where authorization, audit, usage, cost or provenance depend on them;
- Corporate AI operates across authorized scopes through governed contracts; it does not become owner of specialist-domain data;
- Ask Kalam is the first reference implementation from which genuinely reusable organization/agent/connector/policy/audit/usage concepts are extracted;
- Marketing Hub, Corporate AI and Recruitment challenge those extracted contracts before they are treated as universally shared.

**Accepted cost:** slightly richer identity/context than a flat tenant model, in exchange for supporting the already-known multi-product/company structure without building a giant enterprise hierarchy.

**Status:** LOCKED.


## Locked decision — M2-03 Unified Account + Membership + Shared Shell

**Decision:** One global Admonk user account may participate in multiple tenants. Inside a tenant, one membership represents the person's organization membership. A shared suite shell/app launcher exposes only the products the user is entitled to access, without separate product logins.

### Identity model
- one stable internal `user_id` per human platform user;
- authentication identities (email, OAuth, SSO/SAML, passwordless, etc.) map to the user rather than becoming the business identity;
- email is mutable profile/authentication data, not the permanent user key;
- tenant membership is a separate object from the global user;
- one user may hold memberships in multiple tenants;
- membership removal/suspension does not delete the global identity or historical audit references.

### Organizational relationship
- tenant membership answers whether the person belongs to the organization;
- optional scope affiliations connect a membership to one or more organizational scopes;
- organizational affiliation is not itself authorization;
- roles/capabilities/product access are separate decisions handled by later M2 layers.

### Shared suite experience
- one authenticated session across the product family where technically feasible;
- one app launcher / shared suite shell;
- product switch preserves the active user + tenant context;
- launcher visibility is derived from entitlement/authorization results, never used as the security boundary;
- no separate username/password/profile setup per product.

### Settings hierarchy
1. account settings — person-level and shared across products;
2. tenant settings — company-level and canonical once;
3. product settings — domain/application-owned;
4. user × product preferences — personal product-specific preferences.

Shared settings must not swallow specialist product semantics.

### Identity classes remain separate
- **platform/workforce user** — may have tenant memberships;
- **external/contact identity** — visitor, customer, candidate, requester, etc.; does not become a tenant member merely because a product interacts with them;
- **machine/agent identity** — AI agents/services use separate machine authorization and are not fake human accounts.

### Ask Kalam evidence rule
Ask Kalam is used as **implementation evidence / learning material only** during M2. It is not considered audited or validated against the new Foundation until its own lifecycle/gate makes that audit appropriate.

**Accepted cost:** a proper identity/membership/settings model is slightly richer than per-product user tables, but it eliminates duplicate auth/profile systems and enables one-account navigation across the product family.

**Status:** LOCKED.


## M2-04 owner requirements — Custom Roles, Scopes and Simple Setup

These are product-owner requirements for the current M2-04 decision. They are **not yet the locked M2-04 architecture**.

- platform defaults should cover common organizations quickly, but defaults must not force department semantics;
- authorized tenant/platform administrators must be able to create custom roles for their organization;
- custom roles are composed from explicit capabilities/permissions rather than requiring code changes;
- custom roles may be scoped to the relevant organizational scope and/or product/resource type;
- departments may define role structures that fit their real work (for example Marketing should not be forced into generic Admin/Agent terminology);
- role hierarchy/inheritance may be used where it materially simplifies data visibility or subordinate-scope access, but hierarchy must not silently bypass explicit capability restrictions;
- department setup is part of product setup: learning how the department works should improve the configured operating model;
- customization is a first-class platform requirement, equal in importance to simplicity, scalability, testing speed and cost constraints;
- the administration UX must hide RBAC complexity behind plain-language choices:
  - start-from-template/default role;
  - role name + short description;
  - choose scope;
  - simple permission toggles grouped by job/objective;
  - clear descriptions of what each toggle allows;
  - preview/summary of resulting access before save;
  - advanced detail only when needed;
- changing a role should update its assignees through the shared permission model rather than requiring per-user recoding;
- avoid hard-coded department-specific roles in shared platform code.

Research direction: separate **organizational/data hierarchy** from **capability permissions**, while allowing tenant-specific custom role bundles and scope assignments.


## Locked decision — M2-04 Layered Scoped Authorization + Custom Roles

**Decision:** Use layered scoped authorization with default role templates, tenant-defined custom roles, a stable capability catalog, optional organizational-scope inheritance, and a simple toggle-based role builder.

### Authorization layers
- **organization roles** — small tenant-level administration roles;
- **organizational-scope roles** — department/team/business-unit responsibility;
- **product/domain roles** — meaningful role bundles owned by each product/domain;
- **capabilities** — stable permission atoms that define what actions/resources are allowed.

Roles are bundles of capabilities. Authorization code should prefer explicit capability checks over hard-coded role-name checks.

### Custom roles
- products/platform define the available capability catalog;
- authorized tenant administrators may create custom roles by selecting from allowed capabilities;
- custom roles may be scoped to a product/resource type and organizational scope;
- tenants may rename/shape roles to match real departmental work without custom code;
- shared platform code must not hard-code one customer's department role names;
- defaults/templates exist for speed but are starting points, not constraints;
- clone-and-adjust is preferred over forcing users to build every role from zero.

### Scope + hierarchy
- hierarchy answers **where** an assignment applies;
- capabilities answer **what** actions are allowed;
- assignments may optionally inherit from a parent organizational scope to children;
- scope inheritance must never create capabilities absent from the role/capability bundle;
- hierarchy must not silently bypass explicit restrictions.

### Department setup requirement
Department/product setup is part of the product operating model. Learning how a department actually works should improve:
- scopes/teams;
- role templates;
- custom role bundles;
- access structure;
- later workflow/AI context.

Marketing and other specialist domains must not be forced into generic Admin/Supervisor/Agent terminology where those labels do not fit the work.

### Administration UX requirement
Authorization complexity stays underneath the platform. Normal administrators should see:
1. choose a default/template;
2. name the role;
3. choose where it applies;
4. toggle grouped plain-language permissions;
5. review a readable access summary;
6. save.

Advanced technical permission detail is shown only when needed.

### Delegation ceiling
An administrator may only assign/manage capabilities within their own delegated administration authority. Out-of-scope capabilities are unavailable rather than relying on the admin to avoid them manually.

**Accepted cost:** the platform maintains capability metadata, scoped assignments and custom role definitions instead of a single fixed role list. This is accepted to avoid role explosion, duplicate authorization logic and customer-specific code forks.

**Status:** LOCKED.

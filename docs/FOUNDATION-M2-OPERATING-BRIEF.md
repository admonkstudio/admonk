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
5. **M2-05 Effective-permission precedence — LOCKED**
6. **M2-06 Product / module entitlements — LOCKED**
7. **M2-07 Settings inheritance/overrides — LOCKED**
8. **M2-08 Shared onboarding shell — LOCKED**
9. **M2-09 Connector + credential ownership — LOCKED**
10. **M2-10 Knowledge/context hierarchy — LOCKED**
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


## Locked decision — M2-05 Effective Permission Precedence

**Decision:** Default deny + additive capability grants from applicable roles + explicit hierarchical restriction ceilings. Restrictions win. Provider limits and consequential-action approvals are final gates. Every authorization result must be explainable.

### Evaluation model
1. start from **default deny**;
2. gather applicable capability grants from active role assignments;
3. combine grants additively;
4. apply tenant/platform/product/scope restriction ceilings;
5. apply permitted user-specific exceptions where supported;
6. enforce connector/provider scopes and upstream permissions;
7. enforce action-specific approval/verification gates for consequential operations;
8. return the effective decision plus an explanation trace.

### Rules
- roles grant capabilities; normal role definitions do not need arbitrary allow/deny policy logic;
- hard restrictions/ceilings may reduce access and always outrank grants;
- no child scope, custom role or user override may grant beyond an upstream ceiling;
- approval never creates a capability that the user does not already possess;
- provider authorization is an upper bound: platform access can never exceed the provider's own scopes/permissions;
- scope inheritance determines **where** an assignment applies; capabilities determine **what** may be done;
- multiple applicable roles combine their allowed capabilities rather than relying on ambiguous "closest role wins" logic;
- individual overrides are exceptional, visible in the explanation, and should support expiry when temporary;
- authorization must be implemented once as a shared evaluator/contract, not independently re-created in each product.

### Explainability requirement
Administrators and support tooling must be able to answer:
- what capability was requested;
- which role/assignment granted it;
- which tenant/product/scope context applied;
- whether a restriction reduced or blocked it;
- whether provider scope blocked it;
- whether verification/approval is still required.

The user-facing/admin wording should remain plain language rather than exposing internal policy syntax.

**Accepted cost:** one central shared permission evaluator plus explanation metadata, in exchange for predictable behavior across custom roles, inheritance and all products.

**Status:** LOCKED.


## M2-06 owner direction — Atomic sellable subscriptions, decision pending

The product owner prefers a simpler commercial entitlement model than hierarchical feature entitlements.

Direction to evaluate:
- runtime entitlement should stay primarily ON/OFF per sellable SKU;
- if a capability/feature is commercially valuable enough to purchase separately, model it as its own sellable product/add-on SKU rather than a buried feature entitlement;
- customers may subscribe to one specialist product, several specialist products, or individual add-on capabilities;
- bundles/plans may exist for convenience/discounting, but should resolve to a set of independently identifiable sellable SKUs rather than define the only access model;
- Corporate AI / company brain should be modeled as a cross-product subscription layer/add-on that can sit on top of whichever specialist products/data contracts the tenant has enabled;
- permissions remain separate from subscriptions;
- feature flags remain separate from subscriptions;
- billing-provider objects must not become the platform's permanent internal product identifiers;
- keep room for quantity/usage pricing later without forcing feature-level entitlement complexity into M2-06.

Status: **OWNER DIRECTION RECORDED — M2-06 NOT YET LOCKED.**


## Locked decision — M2-06 Atomic Sellable SKU Entitlements

**Decision:** Every independently sellable product or major add-on capability receives a stable internal Admonk SKU and a simple ON/OFF tenant entitlement.

### Core rules
- runtime entitlement stays simple: a tenant either has a SKU or does not;
- a product or major capability becomes its own SKU only when it has independent customer value, a credible standalone/add-on commercial proposition, and a meaningful provisioning boundary;
- normal buttons/features remain inside the owning product and are governed by permissions/configuration rather than becoming separate SKUs;
- bundles/plans are commercial packaging that resolve to a set of SKUs; they are not architectural dependencies;
- approved commercial adjustments may add/remove SKUs without customer-specific code forks;
- permissions remain separate from subscription entitlement;
- feature flags remain separate from subscription entitlement;
- usage limits, metering, budgets and overages remain separate and are handled by later usage/cost governance;
- billing-provider objects synchronize commercial state but do not become Admonk's permanent product identifiers;
- runtime should resolve effective entitlement from Admonk-owned local state rather than depend on live billing-provider availability for every request.

### Corporate Brain
- Corporate AI / Corporate Brain is a cross-product add-on SKU;
- it may operate only across tenant products/sources that are themselves subscribed/enabled and authorized;
- subscribing to Corporate Brain does not implicitly unlock specialist products or their capabilities;
- its value may increase as more specialist product SKUs are enabled, without collapsing their data/domain ownership.

### Bundles
A bundle/plan may package several SKUs for sales, discounting or setup convenience, but runtime provisioning resolves to the underlying SKU set.

**Accepted cost:** the commercial catalog may contain more SKUs than a single-plan model, but entitlement evaluation remains simple and packaging stays flexible/profitable without feature-level entitlement complexity.

**Status:** LOCKED.


## Locked decision — M2-07 Typed Hierarchical Settings

**Decision:** Typed hierarchical settings with controlled inheritance:

**Platform Default → Tenant → Organizational Scope → Product → User/Product where applicable.**

Every setting declares its valid levels, ownership and override policy.

### Rules
- place each setting at the highest level where its semantics are genuinely shared;
- account/company settings are canonical once rather than duplicated per product;
- specialist/domain settings remain owned by the specialist product;
- normal configuration values may inherit and override only at declared levels;
- security/policy constraints may remain equal or become stricter downstream, but lower levels cannot weaken an upstream constraint unless an explicit authorized exception model permits it;
- removing an override resets the effective value to the nearest valid parent/default rather than leaving a blank duplicate;
- templates seed/suggest configuration but do not create permanent competing sources of truth;
- every setting should have typed metadata including key, owner, value type, valid levels, default, override policy and sensitivity where relevant;
- avoid one untyped giant JSON settings store as the semantic authority;
- effective settings may be cached/resolved for performance, with targeted invalidation when parents change.

### UX requirement
The administration UI must show:
- effective value;
- whether it is inherited or overridden;
- source of the active value;
- parent/default value when overridden;
- simple **Override** and **Reset to inherited/default** actions;
- clear indication when a setting is constrained by higher-level policy and cannot be weakened.

**Accepted cost:** a shared settings registry/resolver plus typed product-owned settings contracts, in exchange for one canonical company configuration, safe inheritance and no repeated per-product setup.

**Status:** LOCKED.


## Locked decision — M2-08 Shared Setup Center

**Decision:** Use a shared Setup Center for common organization/people/security/product setup, with product-owned setup modules/checklists.

### Structure
- shared setup covers organization identity, scopes/departments, people/memberships, base role setup, enabled SKUs, shared security/policy defaults and other genuinely cross-product configuration;
- specialist products contribute their own setup requirements and domain-specific configuration;
- only subscribed/enabled products appear;
- setup security uses the same shared authorization model rather than separate onboarding permissions;
- existing valid information is reused/prefilled rather than repeatedly collected.

### Progressive setup
Each setup item is classified as:
- **Required** — blocks safe activation/use;
- **Recommended** — improves product quality or completeness;
- **Later** — required only when the associated capability is used.

Setup is resumable and does not force customers through irrelevant future configuration before receiving value.

### Ongoing lifecycle
Onboarding evolves into **Setup & Health** rather than becoming a dead one-time wizard:
- progress/completion;
- missing required configuration;
- recommended improvements;
- degraded/broken dependencies;
- connector/configuration health;
- product-specific follow-up items.

### Department-learning requirement
Product setup may learn/configure departmental structure, teams, role templates and operating patterns so the product model becomes more accurate as setup progresses.

### UX requirement
- checklist/progress-oriented rather than one giant mandatory wizard;
- plain-language setup tasks;
- minimal re-entry of already known information;
- deep links into the relevant configuration area;
- preserve product autonomy while keeping one recognizable suite setup experience.

**Accepted cost:** shared setup-state/health contracts plus product-contributed setup definitions, in exchange for avoiding duplicate onboarding systems and repeated company configuration.

**Status:** LOCKED.


## M2-09 owner direction — Admonk One control plane, decision pending

The product owner intends a future **Admonk One** experience: one account/control plane for products, subscriptions, settings, connectors and suite administration.

This changes the connector direction:
- tenant/provider connections should be established once in the shared platform where practical;
- historical backfill and ongoing synchronization should happen once per connection/data domain, not independently in every product;
- specialist products consume governed shared data contracts/views where semantics are shared;
- Corporate AI / Corporate Brain should normally consume already-authorized department/product data and updates rather than reconnect every raw provider itself;
- giving Corporate Brain access to a department may grant access to that department's governed analytics/data domain without granting raw connector credentials;
- direct Corporate Brain connector bindings remain possible only where the Brain genuinely requires a provider capability not already represented safely through a specialist/shared data contract;
- connector credentials remain centrally protected;
- product/domain authorization still limits which normalized data and actions each product/agent may consume;
- specialist products remain authoritative for their domain semantics even when ingestion/runtime plumbing is shared;
- avoid rebuilding the same ingestion/backfill/refresh pipeline per product.

Status: **OWNER DIRECTION RECORDED — M2-09 NOT YET LOCKED.**


## Locked decision — M2-09 Admonk One Shared Integration Control Plane

**Decision:** Admonk One is the shared integration/control plane. Tenant/provider connections are established and managed centrally where practical; historical backfill and ongoing synchronization happen once; specialist products own domain semantics and expose governed data contracts; other products and Corporate Brain consume authorized domain data rather than reconnecting raw providers.

### Control-plane ownership
- Admonk One is the user-facing suite control plane for connectors, connection health, subscriptions, access and setup;
- shared platform/runtime owns connector definitions/adapters, credential handling, sync/runtime mechanics and health contracts;
- tenant owns the actual provider authorization/connection;
- organizational scopes may steward connections operationally;
- specialist products do not independently reimplement provider connection lifecycle when the shared connection safely serves the same provider account/purpose.

### Connect once / sync once
- establish a provider connection once where account, purpose and security boundary are compatible;
- historical backfill happens once per connection/data domain where practical;
- incremental synchronization/checkpointing happens once;
- avoid duplicate API calls, rate-limit usage, storage, refresh jobs and repair workflows across products;
- provider-specific ingestion may be shared, but domain interpretation remains with the authoritative specialist product.

### Domain authority
- shared ingestion/plumbing does not make the shared platform owner of specialist semantics;
- Marketing Hub remains authoritative for marketing metric/strategy semantics;
- Recruitment remains authoritative for recruitment semantics;
- Support/Customer AI remains authoritative for support/customer-resolution semantics;
- specialist products expose governed data contracts/views/events for cross-product consumption.

### Corporate Brain
- Corporate Brain normally consumes already-authorized department/product data contracts rather than reconnecting every provider;
- granting Brain access to a department/domain does not grant raw provider credentials;
- historical data already ingested for that domain is available to the Brain only within granted authorization/policy boundaries;
- new/incremental domain updates can flow through the governed contract;
- direct Brain/provider connections are an explicit exception for company-wide sources or capabilities not safely represented through a specialist/shared data contract.

### Data vs action access
- **data-read access** and **connector-action access** are authorized separately;
- read access to normalized/governed data does not imply permission to execute provider actions;
- provider actions still pass M2-05 authorization, connector/provider scope checks and approval gates.

### Credential boundary
- raw secrets/tokens remain centrally protected and server-side;
- browsers, models and ordinary product data stores do not receive raw credentials;
- connection reuse never means credential disclosure to consuming products.

**Accepted cost:** Admonk One/shared platform must maintain reusable ingestion/sync and governed data contracts, but this prevents repeated provider integrations and enables efficient cross-product intelligence.

**Status:** LOCKED.


## Locked decision — M2-10 Federated Permission-Aware Context Plane

**Decision:** Keep approved knowledge, structured operational data, operational memory, and temporary task/conversation context as distinct context classes. Use shared context metadata and governed retrieval/composition without moving all domain truth into one central store.

Rules:
- context is scoped by tenant, organizational scope, product/domain, and narrower user/task context where needed;
- specialist products remain authoritative for their domain semantics and canonical sources;
- Admonk One may maintain a context registry describing ownership, scope, class, authority, provenance, freshness, sensitivity and availability;
- Corporate Brain composes only context permitted for the acting user/agent and does not become owner of specialist-domain truth;
- access controls and source restrictions are applied before/at retrieval;
- historical versions/effective periods are preserved;
- applicability uses authority + scope + specificity + effective period, with unresolved conflicts surfaced;
- private, draft or AI-derived context is not promoted to approved company knowledge automatically;
- retrieval indexes are supporting infrastructure, not the source of truth.

**Accepted cost:** shared context contracts/registry and governed retrieval composition instead of a single central knowledge store.

**Status:** LOCKED.

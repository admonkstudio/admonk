# FOUNDATION-M3 Decisions

**Milestone:** FOUNDATION-M3 — Main Product Master Plan
**Status:** ACTIVE

### M3-01 — Specialist-first, Platform-backed, Progressively Unified

**Decision:** Admonk leads commercially with strong specialist products that remain independently valuable, while the shared Admonk Platform and Jarvis progressively increase value as additional authorized products are connected.

Core promise:
> **Specialist products. One connected platform. One intelligent experience.**

Commercial direction:
- sell the clear specialist outcome first;
- use the shared platform to remove repeated administration/integration;
- let Jarvis become the cross-product multiplier as the customer expands;
- preserve standalone product value and domain authority;
- do not position Admonk primarily as one giant generic AI platform.

**Status:** LOCKED.


### M3-02 — Business-led, Cross-Functional Buying Unit

**Decision:** Admonk targets organizations with sufficient workflow, systems and governance complexity for the shared platform to create value, rather than defining the ICP primarily by employee count.

Buying model:
- initial champion is normally the business/function leader accountable for the specialist product's outcome;
- IT, security, data/integration, finance and procurement are treated as part of the buying group as relevant;
- CIO/CTO/COO/executive sponsorship becomes progressively more important as the customer expands into multiple products and Jarvis Company Intelligence;
- GTM motion: **business outcome entry → cross-functional validation → specialist-product proof → platform expansion → executive/company intelligence**;
- exact firmographic thresholds, pricing bands and segmentation remain later evidence questions.

**Status:** LOCKED.


### M3-03 — Outcome-Owned Product Catalog with Selective Modules & Cross-Product Add-ons

**Decision:** Keep the top-level Admonk catalog small and tied to distinct measurable business outcomes.

Rules:
- a specialist product must have a distinct customer/business outcome, recognizable economic champion, meaningful standalone value, durable domain semantics/workflows, a durable operating surface, and enough independent roadmap/lifecycle to justify product ownership;
- capabilities that extend the same product outcome remain modules/features, even when optionally entitled;
- cross-product capabilities whose value depends on subscribed products are add-ons rather than new domain products;
- shared Product Platform/Foundation capabilities are normally included infrastructure rather than separate specialist SKUs;
- current directional catalog:
  - Admonk Platform / Admonk One — shared included platform/admin foundation;
  - Marketing Hub — specialist product;
  - Support Platform / Ask Kalam — specialist product;
  - Jarvis Company Intelligence — cross-product add-on;
- future specialist products must pass the Product Boundary Test;
- internal architecture granularity must not be exposed directly as commercial catalog granularity.

Principle:
> **Composability belongs underneath the catalog; customer value determines what earns a product name.**

**Status:** LOCKED.


### M3-04 — Product Jarvis Included; Company Intelligence as Cross-Product Add-on

**Decision:** Product-scoped Jarvis is included as part of every subscribed specialist product's core experience. Jarvis Company Intelligence is the separately entitled cross-product add-on.

Rules:
- product-scoped Jarvis is not sold as a separate product;
- each specialist product grants Jarvis only that product's authorized context, capabilities and governed actions;
- Jarvis Company Intelligence unlocks authorized company/executive context, cross-domain synthesis and orchestration across subscribed products;
- Company Intelligence is the same Jarvis core under a broader authorized Operating Lens, not a second assistant or source of truth;
- included Jarvis may still be governed by credits/usage limits under M2-14;
- future high-cost AI/agent capabilities may be separately packaged or metered when value/cost evidence justifies it.

Principle:
> **Customers should not pay extra merely to make a specialist product intelligent; they pay extra when intelligence expands beyond the product they bought.**

**Status:** LOCKED.


### M3-05 — Complete Standalone Outcomes, Compounding Connected Value

**Decision:** Every Admonk specialist product independently delivers its full promised domain outcome. Connected products unlock materially new value only where that value logically requires multiple authorized domains.

Rules:
- standalone customers receive a complete specialist product;
- multi-product customers gain cross-domain context, workflow coordination, company/executive aggregation, relationship intelligence and Jarvis Company Intelligence;
- ordinary specialist-product capabilities are not withheld merely to force bundle expansion;
- connected value must be explainable as something that genuinely requires multiple products/domains.

Principle:
> **Standalone value is complete. Connected value compounds.**

**Status:** LOCKED.


### M3-06 — Simple Commercial Packages over Atomic SKU Entitlements

**Decision:** Admonk keeps atomic product/add-on SKUs as the canonical entitlement layer while presenting customers with a simpler commercial packaging layer above them.

Rules:
- each specialist product is independently purchasable;
- each product subscription includes the shared Admonk Platform / Admonk One foundation, product-scoped Jarvis and a defined included AI Credit allowance;
- Jarvis Company Intelligence remains a separately entitled cross-product add-on;
- commercial bundles compose existing SKUs for simpler procurement, coordinated setup and optional commercial advantage;
- bundles never create hidden permissions, custom product forks or alternative entitlement semantics;
- AI monetization uses predictable subscription + included Admonk AI Credits + visible usage + top-ups/additional credits and optional budget controls;
- do not impose universal family-level Good/Better/Best tiers;
- product-specific tiers are introduced only when evidence shows materially different customer segments/needs;
- pricing, entitlement, permissions, feature flags, lifecycle and usage remain separate.

Principle:
> **The customer buys a simple offer; the platform resolves it into precise entitlements underneath.**

**Status:** LOCKED.

### M3-07 — Admonk One as the Tenant Administration & Setup/Health Center

**Decision:** Admonk One is the single customer-facing administration destination for shared tenant concerns across the Admonk product family, while specialist products retain ownership of domain-specific configuration and workflows.

Rules:
- Admonk One owns tenant/company setup, people/access, subscriptions/entitlements, shared integrations, shared security/policy, AI usage/credits, coordinated lifecycle/offboarding and suite-level Setup & Health;
- specialist products own domain workflows, terminology, detailed settings, domain-specific roles/configuration and specialist setup;
- Setup is a guided graph of **Required / Recommended / Later** tasks rather than one giant wizard;
- setup is resumable, role-aware, product-aware and dependency-aware;
- Admonk One deep-links into the owning product for specialist configuration instead of duplicating product UI;
- onboarding evolves into persistent **Setup & Health** so configuration, connection, activation and governance issues remain visible after launch;
- administration surfaces are capability-aware and least-privilege rather than universal super-admin screens.

Principle:
> **One place to administer Admonk; the right product remains the place to configure specialist work.**

**Status:** LOCKED.

### M3-08 — Thin Shared Family Shell + Product-Owned Navigation

**Decision:** Admonk uses a compact, tenant-aware and entitlement-aware shared family shell across the product family while specialist products retain ownership of their primary/internal navigation and workspace structure.

Rules:
- the shared shell owns tenant/product switching, current product identity and a deliberately small set of family utilities such as notifications, help, account/profile, authorized Admonk One access and applicable Jarvis entry points;
- specialist products own primary section navigation, product breadcrumbs, tabs, domain command bars, specialist settings, domain workflows and terminology;
- cross-product movement uses stable Resource Links that preserve tenant/product/resource context and resolve inside the owning product;
- only entitled/authorized products appear in switching/navigation surfaces;
- Admonk One remains the family administration/setup surface and is not a heavy permanent wrapper around specialist products;
- responsive behavior prioritizes one clear active product navigation model rather than stacked suite + product navigation, especially on mobile;
- the shared shell stays intentionally small, accessible and slow-changing to preserve standalone value, product identity and low release coupling.

Principle:
> **Shared orientation; specialist navigation.**

**Status:** LOCKED.

### M3-09 — Federated Domain Authority with a Governed Cross-Product Interaction Layer

**Decision:** Specialist products remain authoritative for their business records, workflows and domain semantics. Cross-product value is delivered through explicit versioned interaction contracts rather than direct database access or duplicated source ownership.

Rules:
- each product exposes a discoverable capability manifest describing governed reads, governed actions, Resource Link types, domain events, supported context/artifact types and compatibility metadata;
- cross-product reads use permission-aware product-owned read contracts and preserve source identity, provenance and freshness;
- cross-product writes are governed action invocations against the owning product; one specialist product never writes directly into another product's store;
- Jarvis composes authorized product capabilities through the federated Context Plane and M2-11 Agent Authority Envelope rather than becoming a second source of truth;
- domain events support asynchronous coordination and derived views without transferring ownership of the underlying record;
- Admonk may maintain selective shared relationship indexes, search metadata, entity links, company rollups and other derived projections where evidence shows cross-product value;
- shared projections remain non-authoritative, source-linked, tenant/scope-aware, permission-aware, provenance-aware, freshness-aware, lifecycle-governed and rebuildable;
- provider/data reads and provider/action authority remain separate;
- all cross-product interaction contracts participate in shared versioning, compatibility and governance rules.

Principle:
> **Share capabilities and relationships; keep truth with its owner.**

**Status:** LOCKED.

### M3-10 — Guided, Staged, Dependency-Aware Product Lifecycle

**Decision:** Admonk separates commercial entitlement, operational lifecycle, user access and data retention in both runtime behavior and customer-facing administration.

Rules:
- entitlement acquisition starts provisioning; a product is not treated as fully active until required readiness conditions are satisfied;
- customer-facing lifecycle distinguishes activation/setup, active operation, degraded/suspended states, offboarding, retained state and irreversible closure;
- scheduled commercial cancellation, administrative suspension, security/risk suspension and permanent product offboarding are distinct actions/states;
- Admonk One owns the customer-visible lifecycle plan, impact preview and cross-product coordination while specialist products own domain-specific lifecycle hooks/readiness/retention execution;
- before destructive offboarding, Admonk One shows affected users, integrations, automations/durable work, Jarvis/cross-product dependencies, exports and retention/deletion consequences;
- product deactivation stops ordinary product operation without automatically deleting retained domain data or shared resources still required by other products;
- shared resources are released only when no remaining active/retained dependency and no governance requirement still needs them;
- retained products remain visible to authorized administrators with clear export/reactivation/retention status where policy permits;
- permanent or accelerated deletion is a separate higher-friction destructive action with stronger authorization/confirmation than routine cancellation;
- reactivation must re-run applicable compatibility, setup, security and readiness checks rather than silently restoring normal operation;
- lifecycle transitions are auditable and coordinated through Setup & Health;
- exact retention duration remains product/domain/legal-policy governed rather than one universal family rule.

Principle:
> **Turning a product off should be safe and reversible until the customer deliberately crosses the irreversible boundary.**

**Status:** LOCKED.

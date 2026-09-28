# FOUNDATION-M3 Decisions

**Milestone:** FOUNDATION-M3 — Main Product Master Plan
**Status:** RECONCILED — HISTORICAL DECISIONS RETAINED; CURRENT AUTHORITY IS docs/PRODUCT-MASTER-PLAN.md

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

### M3-11 — Layered Tenant Health + Contextual Guided Support

**Decision:** Admonk separates public platform status, tenant-specific health and internal platform operations into three distinct layers, with contextual guided support connected directly to product/resource/health context.

Rules:
- public Admonk status covers broad incidents/maintenance that may affect many customers and remains available independently of tenant admin access;
- Admonk One / Setup & Health is the tenant's authoritative customer-facing health surface for subscribed products, shared integrations, automations, lifecycle, usage blockers and relevant incidents;
- specialist products retain domain-specific health meaning, readiness and remediation while Shared Platform aggregates them through a small normalized health contract;
- customer-visible issues identify affected scope, impact, source/owner, who must act, last update, available remediation and escalation path;
- known incidents and known self-remediable conditions are surfaced before duplicate support cases are created;
- support initiated from a product/resource/health issue carries safe tenant/product/resource and diagnostic context into the case;
- support case status remains visible through authorized tenant/admin surfaces and shared notifications;
- Admonk Control Room remains an internal platform-operations surface materially richer than the customer health view;
- tenant business-content access for support remains governed by scoped, time-bound, revocable and auditable Support Access Grants under M2-19A;
- Jarvis may explain, guide and escalate health/support issues but cannot become the authority for incident state, grant privileged support access or reveal protected operator/secret data;
- customer-facing health states stay small and understandable while product/internal systems may retain richer operational states.

Principle:
> **Show customers the health they need to act; keep operator complexity behind the boundary.**

**Status:** LOCKED.

### M3-12 — Managed Evergreen Releases with Bounded Customer Change Control

**Decision:** Admonk remains an evergreen SaaS platform with one supported product lineage while giving customers bounded preparation, preview and change-management controls for material changes.

Rules:
- Standard/Stable is the default customer release experience;
- material changes may use controlled Preview for selected users, tenants or test environments so customers can validate workflows, training, governance and support readiness before broader adoption;
- Admonk One provides a shared Changes & Compatibility view for material upcoming changes, rollout timing, affected scope, required actions, compatibility/deprecation state and tenant readiness;
- specialist products remain independently releasable and own domain-specific release impact and migration guidance;
- Shared Platform owns the common change/compatibility presentation contract and cross-product readiness aggregation;
- stable externally consumable contracts never break silently; deprecation, replacement and migration expectations follow M2-19;
- customer deferral, freeze windows or bundled release cadence may be added only as bounded capabilities when real customer evidence justifies their cost;
- release controls never become indefinite version pinning, tenant-specific software forks or permanent compatibility branches;
- security, critical reliability, legal/compliance or provider-forced changes may bypass ordinary deferral according to declared policy;
- routine backward-compatible improvements remain evergreen and do not create unnecessary change-management overhead;
- customer-visible release audiences are distinct from internal software/package/service versions.

Principle:
> **Customers can prepare for change; they do not own a permanent fork of Admonk.**

**Status:** LOCKED.

### M3-13 — Single Masterbrand Family Architecture; Retire “AI Suite” to Legacy Terminology

**Decision:** Use one canonical family/masterbrand layer above specialist products, with Jarvis as the intelligent experience and the shared administration surface kept distinct. Retire “Admonk AI Suite” from active architecture/customer-facing terminology.

**Permanent masterbrand:** **SIA**. The previous working name “Admonk” is superseded as active brand terminology. M3-13 locks both the family hierarchy and the SIA masterbrand selection.

Rules:
- one family/masterbrand identity sits above specialist products;
- specialist products retain durable outcome-owned identities;
- Jarvis is the single named intelligent experience across products;
- Jarvis Company Intelligence remains the separately entitled cross-product add-on/operating lens;
- the shared administration/setup/health experience remains a distinct role/surface and is not another specialist product;
- “Admonk AI Suite” becomes legacy/historical terminology and is removed from new canonical/customer-facing architecture language;
- historical AI-SUITE documents remain for provenance but are marked superseded and removed from active authority/navigation through controlled cleanup;
- future bundles/collections may receive names only when GTM evidence justifies them and do not replace the family/masterbrand architecture;
- no mass repository/file rename is required solely for cosmetic consistency;
- SIA is the selected permanent masterbrand; legal trademark/domain/entity clearance remains a rollout gate rather than an architecture decision.

Principle:
> **SIA is the family. Products define the outcome. Jarvis supplies the intelligence.**

Canonical family shorthand:
> **SIA is the family. Products define the outcome. Jarvis supplies the intelligence.**

**Status:** LOCKED.


### M3-14 — SOLO Environment + SIA Intelligent Operator Naming

**Decision:** The active naming architecture is now:

- **SOLO** — the unified company operating environment / primary software product.
- **SIA** — the intelligent operator/presence inside SOLO.
- **Jarvis** — historical discovery/prototype terminology only; retire from active customer-facing product naming.
- **Admonk** — historical/working masterbrand terminology only; retire from active customer-facing product naming.

Interpretation:
- SOLO is the environment where company people, roles, responsibilities, processes, systems, data, artifacts, meetings, actions and relationships are modeled and operated.
- SIA is the intelligence that understands context, selects approved capabilities/components/playbooks, explains, coordinates and acts under authority.
- role/domain offers such as “SOLO for Marketing Managers” or equivalent are commercial entry points/lenses rather than separate software products by default.
- legal trademark, domain and entity clearance remains mandatory before public launch and may affect rollout mechanics or force a later naming reconsideration if a blocking conflict is found.

Principle:
> **Open SOLO. Ask SIA.**

**Status:** LOCKED BY OWNER — COMMERCIAL/LEGAL CLEARANCE PENDING.


---

## 2026-09-29 Product-Model Reconciliation

The original M3 decision sequence captured the best product-family model available before the later SIA/company-brain discoveries.

It is retained for traceability.

Current authority:
- `docs/audits/FOUNDATION-M3-FINAL-RECONCILIATION-2026-09-29.md`
- `docs/PRODUCT-MASTER-PLAN.md`
- `docs/SIA-EXPERIENCE-DIRECTION.md`

Decision disposition:

| Decision | Current disposition |
|---|---|
| M3-01 Specialist-first | **SUPERSEDED** — one environment + role/domain lenses |
| M3-02 Buying unit | **REVISED** — solo/role/team/enterprise entry |
| M3-03 Product catalog | **SUPERSEDED** — capabilities/lenses, not separate apps by default |
| M3-04 Product Jarvis / Company Intelligence | **SUPERSEDED** — SIA is company brain from start |
| M3-05 Standalone products | **SUPERSEDED** — one company model compounds |
| M3-06 Packaging/SKUs | **RETAIN MECHANICS / REVISE OBJECTS** |
| M3-07 Admonk One | **REVISED** — integrated Administration / Setup & Health |
| M3-08 Family shell/product navigation | **SUPERSEDED** — unified environment/workspaces |
| M3-09 Domain authority | **RETAIN / STRENGTHEN** |
| M3-10 Lifecycle | **RETAIN / BROADEN** |
| M3-11 Health/support | **RETAIN / BROADEN** |
| M3-12 Release compatibility | **RETAIN** |
| M3-13 Family naming | **SUPERSEDED** |
| M3-14 SOLO/SIA naming | **PARTIAL** — SIA role locked; SOLO temporary |

Do not use the old LOCKED labels in isolation to override the reconciliation above.

The Foundation intentionally preserves historical decisions instead of rewriting history.

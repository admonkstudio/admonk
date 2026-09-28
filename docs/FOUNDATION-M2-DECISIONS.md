# FOUNDATION-M2 — Decision Log

**Milestone:** FOUNDATION-M2 — Define Shared Product Platform Foundation  
**Status:** COMPLETE / LOCKED

**Terminology compatibility — Jarvis (2026-09-28):** references in locked M2 decisions to `Corporate Brain` or `Corporate AI Assistant` map to the current Jarvis Company Intelligence / Company-Executive Operating Lens. They do not define a second brain, runtime, memory system or permission authority.

| ID | Status | Decision | Accepted cost / tradeoff |
|---|---|---|---|
| M2-01 | LOCKED | Federated product repositories + promoted shared contracts/packages. No duplicate stable shared behavior; no premature generic abstraction; monorepo only when measured cross-repo friction justifies migration. | Some temporary duplication while shared semantics are still unproven. |
| M2-02 | LOCKED | Tenant is the hard customer boundary; recursive organizational scopes model internal structure; products are orthogonal; shared capabilities are versioned; Ask Kalam is the first reference implementation/learning source. | More context than a flat tenant model, but avoids both duplicated department tenants and premature enterprise hierarchy. |
| M2-03 | LOCKED | One global user account + tenant memberships + optional scope affiliations + shared suite shell/app launcher + layered shared settings. Product permissions remain domain-scoped; external contacts and machine identities stay separate. Ask Kalam is learning evidence, not validation evidence yet. | More relational structure than per-product user tables, but removes duplicate login/profile systems and enables one-account navigation across the suite. |
| M2-04 | LOCKED | Layered scoped authorization with default role templates, tenant-defined custom roles, stable capability catalog, optional scope inheritance, delegation ceilings, and simple toggle-based setup UX. | More capability/scope metadata than a fixed role list, but avoids role explosion, product coupling and customer-specific code forks. |
| M2-05 | LOCKED | Default deny; applicable roles add capabilities; explicit ceilings/restrictions reduce access and win; provider limits and action approvals are final gates; every result is explainable through one shared evaluator. | Requires a central evaluator/explanation model, but avoids conflicting product-specific authorization logic. |
| M2-06 | LOCKED | Atomic sellable SKU entitlement model: every independently sellable product/major add-on is ON/OFF; bundles compose SKUs; Corporate Brain is a cross-product add-on; permissions, flags and usage limits stay separate; billing providers do not own permanent SKU identity. | More catalog SKUs than a single-plan model, but much simpler runtime entitlement and more flexible packaging. |
| M2-07 | LOCKED | Typed hierarchical settings: Platform Default → Tenant → Organizational Scope → Product → User/Product where applicable; settings declare valid levels/override rules; configuration may inherit/override while constraints cannot be weakened; UI shows source/inheritance/reset. | Requires a shared registry/resolver, but removes duplicated company settings and makes overrides safe/explainable. |
| M2-08 | LOCKED | Shared Setup Center for common organization/people/security/product setup plus product-owned setup checklists; progressive Required/Recommended/Later tasks; resumable; only subscribed products shown; onboarding evolves into Setup & Health. | Requires shared setup-state/health contracts, but avoids duplicate onboarding and repeated tenant configuration. |
| M2-09 | LOCKED | Admonk One shared integration control plane: connect/backfill/sync once where practical; centrally protected credentials; specialist products retain domain semantics and expose governed data contracts; Corporate Brain normally consumes authorized domain data rather than reconnecting providers; data-read and provider-action access are separate. | Requires reusable sync/data-contract infrastructure, but removes repeated integrations and supports efficient cross-product intelligence. |
| M2-10 | LOCKED | Federated permission-aware Context Plane: keep approved knowledge, operational data, operational memory and temporary task context distinct; preserve domain authority, provenance and history; Corporate Brain composes only authorized context. | Requires shared context metadata/contracts and governed retrieval composition, but avoids duplicated truth and unsafe centralization. |
| M2-11 | LOCKED | Shared intersection-based Agent Authority Envelope: effective agent authority is the intersection of delegator authority, agent capabilities, policy, context, provider scopes, runtime limits, action class and approval state; reuse M1 action classes; enforcement stays outside the model. | Requires capability/delegation metadata and deterministic evaluation, but avoids full user-permission inheritance and duplicate AI authorization systems. |

| M2-12 | LOCKED | Shared versioned event, audit and provenance envelope with common identity, suite context and correlation metadata. Domain products retain state and domain-event ownership; audit, provenance and telemetry stay distinct. | Small shared schema/indexing cost in exchange for coherent cross-suite traceability without centralizing product state. |

| M2-13 | LOCKED | Shared Notification Plane with product-owned notification semantics. Shared platform owns suite inbox, preferences, quiet hours, routing, delivery, deduplication/digests and delivery health; external business communications remain domain actions. | Requires shared notification contracts and delivery infrastructure, but avoids duplicated notification machinery while preserving domain ownership. |

| M2-14 | LOCKED | Dual-ledger AI Credit Economy: raw provider usage/cost internally; customer-facing Admonk AI Credits via a versioned rate card; monthly grants, top-ups, task-level metering, pre-run estimates, compatible-model choice, and user/tenant/product wallets. | Requires wallet/rate-card infrastructure, but creates transparent consumption control, top-up revenue and provider-independent commercial units. |

| M2-15 | LOCKED | Tenant-aware suite navigation + stable cross-product Resource Link contract. Admonk One/family shell owns tenant/product switching; specialist products own internal navigation and resolve logical resource targets. | Requires per-product resource-link resolvers and compatibility discipline, but enables durable cross-product links without a giant composed frontend. |

| M2-16 | LOCKED | Layered semantic theme inheritance: Admonk Foundation → Product Brand Theme → bounded Tenant Brand Overlay → User Display Preference. Products own identity and declare safe tenant overrides; protected accessibility/safety semantics cannot be weakened; reuse M2-07 inheritance. | Requires product theme ownership, override metadata and affected-theme QA, but preserves family coherence, product identity and bounded customer branding. |

| M2-17 | LOCKED | Layered Locale + Time Semantics: language, locale, personal timezone and business-time context stay distinct; use stable locale identifiers and IANA zones; user display preferences do not silently rewrite business schedules; products own translation/domain temporal semantics. | Requires richer time/locale context and targeted QA, but supports international users without corrupting business-time meaning. |

| M2-18 | LOCKED | Shared Data Governance Contract + domain-owned policy and execution. Foundation standardizes sensitivity/purpose/lifecycle/export/delete contracts; products retain actual policy schedules, domain meaning and execution against their stores. | Requires domain inventories and cross-product orchestration, but preserves domain ownership while enabling consistent governance and offboarding. |

## Current
**FOUNDATION-M2 — COMPLETE / LOCKED**


## M2-04 owner requirements — recorded, decision pending
Custom tenant-defined roles/scopes are mandatory. Defaults should accelerate setup, not constrain it. Department setup must be configurable to real operating structures. Admin UX should use simple templates, grouped toggles, plain-language descriptions, scope selectors and an access preview instead of exposing authorization-model complexity directly.


## M2-06 owner direction — recorded, decision pending
Prefer atomic sellable subscription SKUs with simple ON/OFF entitlement. A commercially standalone feature may itself become an add-on SKU. Bundles/plans should compose SKUs rather than hide feature-level entitlement logic. Corporate AI/company brain is a cross-product add-on layer. Permissions and feature flags remain separate.


## M2-09 owner direction — Admonk One control plane, decision pending
Future Admonk One should centralize suite access, connector administration and reusable ingestion. Connect providers once where practical; historical backfill + incremental sync happen once; products consume governed data contracts. Corporate Brain normally reads authorized department/product data rather than reconnecting raw providers, while direct connector access remains an explicit exception for capabilities not safely exposed through shared/domain contracts.


### M2-19 — Contract-Centered Versioning, Explicit Compatibility & Managed Migration

**Decision:** Admonk versions the contracts, schemas and immutable definitions that other components depend on rather than forcing one universal versioning scheme onto every object.

Core rules:
- keep **release version**, **contract/schema version**, **definition revision** and **migration version** separate;
- shared stability lifecycle: **DEVELOPMENT → PREVIEW → STABLE → DEPRECATED → RETIRED**;
- compatibility states: **COMPATIBLE, COMPATIBLE_WITH_DEPRECATION, MIGRATION_REQUIRED, BLOCKED, UNSUPPORTED**;
- federated products may release independently, but each stable shared contract explicitly declares and tests supported producer/consumer combinations;
- no universal N-1 rule;
- stable shared packages use Semantic Versioning where appropriate;
- stable service/capability APIs use explicit major compatibility boundaries;
- database migrations use ordered immutable migration history rather than SemVer;
- breaking shared-contract and persistent-schema changes use **Expand → Coexist → Migrate → Verify → Contract** whenever practical;
- destructive removal waits until supported consumers have migrated and evidence shows the old path is no longer required;
- Durable Tasks pin TaskDefinition and relevant contract revisions; running/waiting work never silently resumes under incompatible current definitions;
- RouteProfiles, ModelBindings, AgentProfiles, TaskDefinitions, ProactivityContracts and ScaleGates use stable keys with immutable revisions;
- governed actions and approval receipts bind to the action/capability contract version under which their meaning was approved;
- Artifacts preserve immutable historical revisions independently from storage/schema migration;
- connector compatibility tracks adapter release, provider API version, connection-config schema and Admonk domain/capability contract independently;
- deprecation is explicit metadata with replacement, owner, usage, migration path and sunset/review state;
- retirement occurs only after migration/usage/compatibility evidence satisfies the retirement gate;
- material migrations declare scope, checkpoints, verification and an honest recovery class: **REVERSIBLE, RESTORE_BASED or FORWARD_FIX_ONLY**;
- feature flags may stage migrations/rollouts but are not contract versions and must not become permanent tenant-specific compatibility forks;
- Product Supervisor owns release/migration governance; future Control Room consumes version/compatibility/migration metadata and evidence;
- the shared Versioned Definition Envelope standardizes lifecycle/version metadata only; it does not require a centralized Definition Service.

**Accepted cost:** compatibility metadata, contract tests, overlap windows, migration state and deprecation tracking in exchange for independent releases, safer federated repositories and controlled migrations.

**Status:** LOCKED.


### M2-19A — Separate Platform-Operator Authority with Just-in-Time Privilege, Scoped Support Access & Explicit Environment

**Decision:** Platform Operator is a distinct Admonk/platform authorization domain, not a tenant role and never a universal `super_admin`.

Core rules:
- a global human identity may have tenant memberships and a separate Platform Operator Assignment; the contexts are evaluated independently;
- platform operators hold standing identity/eligibility, not standing unlimited privilege;
- privileged Production capabilities activate through explicit time-bound Operator Sessions with environment, capability scope, business justification, stronger authentication/session assurance, automatic expiry and approval where policy requires it;
- operational visibility, tenant business-content access and action authority are separate;
- tenant business content requires a scoped, time-bound, revocable and auditable Support Access Grant tied to a case/incident/business justification;
- Control Room visibility classes distinguish aggregate telemetry, tenant-identifiable operational metadata, tenant business content and secrets;
- secrets/credentials are never directly readable through ordinary support access; operators use governed reconnect/rotate/revoke actions instead;
- M2-11/RQ-07 remains the only action-authority model;
- environment is a first-class authorization dimension; lower-environment authority does not imply Production authority;
- operators act as themselves, not as customer users; no silent impersonation;
- use risk-based JIT elevation rather than approval for every operator click;
- break-glass is a dedicated emergency recovery path, strongly protected, immediately alerted/audited and reviewed after every use;
- operator eligibility is lifecycle-managed, periodically reviewed and revocable;
- high-risk policy may require separation of duties/self-approval prevention;
- Admonk One should eventually expose tenant-scoped support-access transparency and optional stronger customer-approval controls where required;
- Jarvis Platform Operator Lens may explain/propose/request access but cannot grant privilege, approve support access, switch authority context, invoke break-glass or reveal secrets;
- privilege activation, support grants, privileged accesses and emergency sessions produce reconstructable Privileged Access Receipts linked to M2-12/RQ-07 evidence.

**Accepted cost:** operator eligibility metadata, JIT sessions, support-access grants, expiry/reviews, emergency procedures and additional audit evidence in exchange for strong tenant isolation and safe cross-tenant platform operations.

**Status:** LOCKED.


### M2-20 — Coarse-Grained Runtime Architecture with Evidence-Promoted Isolation

**Decision:** Separate logical contract boundaries, scaling units and physical runtime/deployment boundaries. Do not create a microservice merely because a logical component has a name or shared contract.

Core rules:
- use five implementation forms: **Shared Contract, Shared Package/Module, Separate Process/Worker Role, Shared Platform Service/Runtime, Domain-Owned Product Runtime**;
- deterministic reusable behavior normally stays in shared packages/modules;
- asynchronous, bursty, resource-heavy or special-runtime work uses separate worker/process roles;
- shared platform services exist only when authoritative shared state, hard security/credential boundaries, independent availability/scale, shared ingress, durable coordination or independent lifecycle makes the network boundary valuable;
- specialist business semantics/state remain domain-owned;
- two consumers justify a shared contract, not automatically a shared service;
- Platform Management begins as one coarse-grained shared runtime containing modular tenant/account/entitlement/settings/setup/operator/registry/version/governance capabilities;
- Jarvis Interactive/Orchestration remains a Jarvis-owned runtime separate from Platform Management and specialist products;
- specialist products remain domain-owned runtimes exposing governed capability contracts;
- Context Plane remains federated contracts + shared composition package + domain providers; no generic Context Service at SCALE-1;
- authorization evaluation remains deterministic contracts/packages over authoritative state; no mandatory authorization microservice at SCALE-1;
- provider-neutral model execution uses shared adapters inside Jarvis/worker runtimes; no centralized AI Gateway at SCALE-1;
- Durable Task orchestration is a shared durable runtime capability independent of interactive process memory, but does not require a dedicated microservice on day one;
- Async execution uses separate worker/process roles with independent queues/concurrency/budgets while allowing multiple worker classes to share one deployment initially;
- Connector Runtime is an intentional shared runtime/isolation boundary from SCALE-1 because of credentials, external ingress, provider quotas/failures, backfills and cross-product connection reuse;
- Shared Notification Plane keeps preferences/inbox/control in Platform Management and delivery in async workers at SCALE-1;
- audit/economic ledgers may begin as authoritative modules/stores plus ingestion workers rather than standalone services;
- Resource Links remain shared contract + helper package + product-owned resolvers;
- Artifacts remain shared contracts/helpers with producing-product/Jarvis ownership; no universal Artifact Service at SCALE-1;
- Memory/knowledge remains ownership-specific; no generic Memory Service/company-brain database;
- compatibility metadata may live in repositories/CI/Platform Management; no Compatibility Service required;
- feature flags use a replaceable provider-neutral contract/client; no custom Feature Flag Service required;
- Admonk Control Room has its own Platform Operations runtime separate from tenant application runtimes and distinct from Platform Management;
- telemetry/observability is operational infrastructure, not a business microservice;
- voice remains optional and splits only when realtime transport/concurrency/failure evidence justifies it;
- browser/computer/code execution, when enabled, always runs in a hard-isolated sandbox runtime;
- Product Supervisor remains governance/process plus automated checks, not a Production microservice;
- SCALE-1 coarse runtime estates: **Platform Management, Jarvis Interactive, specialist product runtimes, Execution/Workers, Connector Runtime, Platform Operations**, plus optional Voice/Sandbox where enabled;
- physical databases are not assigned one-per-service; logical ownership/write boundaries are explicit and physical isolation follows evidence;
- service extraction is evidence-driven and reversible.

**Accepted cost:** coarse-grained runtimes with strong internal module discipline and some later extraction work in exchange for avoiding premature distributed-system complexity.

**Status:** LOCKED.


### M2 Exit Addendum R-01 — Workload / Machine Identity

**Decision:** Every protected internal runtime/service/worker uses explicit workload identity and authorization context. Internal network placement is never treated as authority.

Core rules:
- runtime/service/worker identity is distinct from human user identity and from Jarvis Agent Profile;
- protected service-to-service access evaluates workload identity plus environment, tenant/task delegation, requested capability, resource and applicable policy;
- background workers re-authorize from durable identity/context rather than trusting queue payload authority claims blindly;
- workload identity does not itself grant tenant/business authority;
- service credentials/tokens should be scoped and short-lived where implementation supports it;
- network segmentation/bulkheads are defense-in-depth, not substitutes for identity/authorization;
- exact mTLS/SPIFFE/service-mesh/IdP technology remains an implementation choice.

**Origin:** promoted from locked RQ-20 security architecture during M2 exit reconciliation.

**Status:** LOCKED.


### M2 Exit Addendum R-02 — Tenant / Product Operational Lifecycle

**Decision:** Commercial entitlement and operational lifecycle are separate contracts.

Commercial entitlement answers whether a tenant is entitled to a SKU/product/add-on. Operational lifecycle answers whether the tenant/product instance is provisioning, active, suspended, offboarding, retained/closed, or otherwise not ready for normal operation.

Core rules:
- entitlement ON/OFF never doubles as provisioning/offboarding state;
- tenant/product lifecycle transitions are auditable;
- setup/readiness may block ACTIVE readiness without changing commercial entitlement;
- temporary suspension does not imply deletion;
- offboarding invokes M2-18 export/retention/delete policy;
- connectors, Durable Tasks, notifications and other runtime behavior follow lifecycle policy rather than inferring state from entitlement alone;
- resource placement/stamp capacity may be released/rebalanced only after lifecycle/data policy permits it;
- exact lifecycle labels may be normalized in implementation, but commercial entitlement and operational lifecycle remain distinct.

Candidate tenant lifecycle:
PROVISIONING → ACTIVE → SUSPENDED → OFFBOARDING → RETAINED → CLOSED

Candidate tenant-product lifecycle:
NOT_ENABLED → PROVISIONING → ACTIVE → DEGRADED/SUSPENDED → DEPROVISIONING → RETAINED/CLOSED where applicable.

**Status:** LOCKED.

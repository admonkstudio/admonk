# FOUNDATION-M2-20 — Runtime Boundaries

**Date:** 2026-09-28  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Program:** FOUNDATION-M2 — Shared Product Platform Foundation  
**Implementation authority:** None. Logical/runtime-boundary decision only.

## 1. Decision problem

Admonk has intentionally defined many logical boundaries:
- Tenant Administration Plane;
- Platform Management Plane;
- Platform Operations Plane / Control Room;
- Jarvis orchestration;
- specialist products;
- Context Plane;
- Durable Tasks;
- worker pools;
- Connector Runtime;
- Notification Plane;
- audit/provenance/usage;
- model/provider adapters;
- artifacts;
- memory;
- telemetry;
- voice;
- sandbox/computer execution.

The existence of a logical boundary does **not** mean it should become:
- a network service;
- an independently deployed container;
- a separate database;
- a separately operated microservice.

M2-20 decides which boundaries need runtime isolation **now**, which stay modular inside a coarser runtime, and which remain domain-owned.

---

## 2. Core conclusion

> **Start coarse-grained, preserve strong module/contract boundaries, and split runtime components only when the boundary itself provides measurable value.**

Admonk uses five implementation forms:

1. **Shared Contract**
2. **Shared Package / Module**
3. **Separate Process / Worker Role**
4. **Shared Platform Service / Runtime**
5. **Domain-Owned Product Runtime**

A component may combine forms, for example:
- a shared contract + shared package;
- a shared service + client SDK;
- a domain runtime + shared contract.

The form describes **how behavior is owned/executed**, not the product's importance.

---

## 3. External research

### AWS SaaS Lens

AWS explicitly states there is no one-size-fits-all SaaS architecture and recommends decomposing services according to their **multi-tenant load and isolation profile**.

Source:
https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/general-design-principles.html

**Admonk lesson:** service boundaries should follow real workload/isolation pressure, not product diagrams.

### Azure microservices guidance

Azure recommends:
- modeling services around bounded business contexts;
- avoiding overly granular services;
- making independently deployed services genuinely independent;
- avoiding chatty service calls and tightly coupled deployments.

Sources:
https://learn.microsoft.com/en-us/azure/architecture/microservices/
https://learn.microsoft.com/azure/architecture/microservices/model/microservice-boundaries

**Admonk lesson:** if two components require constant synchronous calls, shared transactions or coordinated deployments, a network split may be worse than a module boundary.

### Martin Fowler — Monolith First

Fowler's long-standing microservices guidance highlights the operational “microservice premium” and the difficulty of identifying stable service boundaries too early. A modular coarse-grained start makes later extraction safer when boundaries become proven.

Source:
https://martinfowler.com/bliki/MonolithFirst.html

**Admonk lesson:** modularity first, network boundaries second.

### Azure Bulkhead pattern

Azure recommends isolating workloads/resources when one failure or resource consumer could exhaust unrelated work. It notes that bulkheads may be implemented through processes, pools, queues, containers or separate deployments depending on the required isolation.

Source:
https://learn.microsoft.com/azure/architecture/patterns/bulkhead

**Admonk lesson:** failure isolation does not automatically require a microservice; sometimes a separate worker pool/process is sufficient.

### Queue-based load leveling

Azure recommends queues for asynchronous workloads with variable/bursty demand, but warns that they introduce unnecessary complexity for simple low-latency synchronous paths.

Source:
https://learn.microsoft.com/azure/architecture/patterns/queue-based-load-leveling

**Admonk lesson:** use queue/worker boundaries where producer and execution rates legitimately differ, not between every component.

### Multitenant control planes

Azure recommends isolating control-plane resources from tenant data-plane workloads so tenant load cannot exhaust management capacity and both can scale independently.

Source:
https://learn.microsoft.com/azure/architecture/guide/multitenant/considerations/control-planes

**Admonk lesson:** Platform Management deserves a real runtime/failure boundary from tenant application workloads.

### OpenTelemetry deployment patterns

OpenTelemetry's Collector is one logical component that supports multiple deployment patterns—agent, gateway and combinations—depending on workload and scale.

Source:
https://opentelemetry.io/docs/collector/deploy/

**Admonk lesson:** logical role != one permanent deployment topology. Runtime packaging may evolve with scale.

---

# PART A — THE FIVE BOUNDARY TYPES

## 4. Shared Contract

Use when multiple components must agree on:
- shape;
- meaning;
- lifecycle;
- compatibility;

but do not need one implementation.

Examples:
- Resource Link;
- capability/action contract;
- event schema;
- Context Source contract;
- workspace schema;
- Artifact contract.

Benefits:
- preserves domain ownership;
- avoids unnecessary network dependency;
- allows independent implementations.

Cost:
- compatibility/version discipline.

A contract alone owns no runtime.

---

## 5. Shared Package / Module

Use when behavior is:
- deterministic/stateless or locally stateful;
- small enough to run safely inside the consumer;
- latency-sensitive;
- not independently scalable;
- not a separate trust/credential boundary;
- acceptable to update through normal consumer releases.

Examples:
- authorization/policy evaluator;
- settings resolution logic;
- Resource Link helpers;
- telemetry/audit envelope helpers;
- model-provider adapter interfaces/SDK;
- Context composition helpers.

Benefits:
- in-process performance;
- fewer failure/network modes;
- simpler operations.

Cost:
- consumers may run different package versions temporarily;
- fixes require consumer release.

M2-19 governs package/version skew.

---

## 6. Separate Process / Worker Role

Use when work:
- is asynchronous;
- is bursty/resource-heavy;
- needs independent concurrency/backpressure;
- should not block interactive traffic;
- may need special CPU/GPU/runtime;
- can be queue/job driven.

Examples:
- deep AI work;
- Artifact generation;
- offline evaluations;
- notification delivery;
- connector sync/backfill workers;
- data backfills.

A worker role does **not** automatically become a general network service.

Several worker classes may share one deployable initially while retaining:
- separate queues;
- concurrency limits;
- budgets;
- priorities;
- observability.

---

## 7. Shared Platform Service / Runtime

Use only when the network/runtime boundary itself provides value through one or more of:

- authoritative shared state;
- hard consistency across products;
- shared security/credential boundary;
- independent availability/recovery requirement;
- independent scale/resource pressure;
- shared external ingress;
- durable coordination independent of callers;
- need to change centrally without redeploying every consumer;
- many consumers that genuinely require one live implementation.

A shared service carries a tax:
- network latency;
- retries/timeouts;
- distributed tracing;
- service authentication;
- deployment/operations;
- compatibility;
- partial failure;
- distributed data consistency.

Therefore:
> **two consumers are sufficient to justify a shared contract, but not automatically a shared service.**

---

## 8. Domain-Owned Product Runtime

Use when behavior/state belongs to specialist product semantics.

Examples:
- Marketing campaign/domain models;
- Support ticket/product workflows;
- product-specific analytics;
- domain write rules;
- domain-specific derived data.

A shared platform should not centralize domain behavior merely because Jarvis needs to call it.

Products expose governed contracts/capabilities instead.

---

# PART B — SERVICE EXTRACTION GATE

## 9. When a module/worker becomes a service

Promote toward a separate service/runtime when at least one **hard boundary** or multiple meaningful operational pressures exist.

### Hard boundary
Any one may justify separation:
- secrets/credential trust boundary;
- untrusted external ingress;
- sandbox/code/browser isolation;
- regulatory/data residency boundary;
- authoritative state that must remain available independently;
- special runtime/hardware incompatible with caller process.

### Operational pressure
Usually require repeated evidence:
- materially different scaling curve;
- failure repeatedly harms unrelated workload;
- resource contention;
- independent SLO/recovery requirement;
- independent release cadence is valuable;
- many consumers need one centrally changing behavior;
- queue/backlog needs separate autoscaling;
- process restart/deploy must not affect another critical function.

### Anti-split evidence
Keep together when separation creates:
- chatty synchronous calls;
- shared transaction requirement;
- constant coordinated releases;
- shared data mutation with no clean owner;
- negligible independent scale;
- operational overhead exceeding benefit.

---

## 10. No service-count target

Admonk does not have:
- a target microservice count;
- “one service per bounded context” mandate;
- “one database per service” mandate.

The target is:
> **the minimum runtime boundaries needed for security, reliability, scale and ownership at the current stage.**

---

# PART C — M2-20 BOUNDARY MAP

## 11. Platform Management Plane

### Includes
- tenant registry;
- global account/membership administration;
- SKU entitlements;
- settings/defaults;
- Platform Operator eligibility/grants;
- Setup & Health shared state;
- connection/connector registry metadata;
- model/RouteProfile active binding metadata;
- rate-card / AI Credit configuration;
- compatibility/migration metadata;
- tenant placement/stamp metadata;
- shared governance metadata.

### M2-20 form
> **Shared Platform Service / Runtime — coarse-grained modular application.**

Why:
- authoritative shared state;
- all products depend on it;
- must remain available independently from tenant application load;
- strong security boundary;
- changes must be consistent suite-wide.

Initial rule:
- keep these capabilities as modules inside **one Platform Management runtime**, not one service per module.

Admonk One is the customer/tenant-facing administration experience over these capabilities.

### Data
Platform Management state has explicit ownership and credentials separate from specialist domain databases.

M2-20 does not require one database server per module.

---

## 12. Authorization / policy evaluation

### State
Authoritative:
- memberships;
- grants;
- restrictions;
- settings/policy;
- operator/session authority

lives in Platform Management/domain authority.

### Evaluation logic
> **Shared Contract + Shared Package/Module. No standalone authorization microservice at SCALE-1.**

Why:
- deterministic;
- latency-sensitive;
- used on every request;
- network dependency on every authorization check would expand failure surface.

Consumer runtimes may use safely cached/compiled authorization context according to policy.

For consequential actions:
- RQ-07 preflight must use freshness appropriate to the action and may re-read authoritative current state.

Promotion to a dedicated policy service is allowed only if:
- policy complexity;
- central policy rollout;
- cross-language consumers;
- consistency/security requirements

later make the network boundary preferable.

---

## 13. Jarvis Interactive / Orchestration Runtime

> **Jarvis-owned Product Runtime**, not a generic Platform Management service.

Owns:
- S0/S1 request handling;
- intent/task contract;
- route/surface decisions;
- JIT Context Packet orchestration;
- model/tool orchestration;
- streaming/progressive state;
- Action Proposal;
- Dynamic Workspace composition.

It consumes:
- Platform Management authority/config;
- specialist product capabilities;
- Durable Task runtime;
- Connector/domain capabilities;
- model adapters.

Why not merge into Platform Management:
- tenant-facing request scale;
- model/network latency;
- different SLO;
- failure must not remove administration.

Why not make each Jarvis subcomponent a service:
- high call frequency;
- orchestration benefits from in-process composition;
- boundaries are not independently valuable yet.

---

## 14. Specialist product runtimes

Examples:
- Marketing Hub backend;
- Ask Kalam/support product;
- future specialist products.

> **Domain-Owned Product Runtimes.**

They own:
- domain truth;
- domain workflows;
- domain write transactions;
- domain analytics semantics;
- product-specific capability APIs.

They consume shared platform contracts/services.

M2-20 does not merge specialist domains into Jarvis or Platform Management.

---

## 15. Context Plane

> **Shared contracts + shared Context SDK/package + federated domain providers. No generic Context Service at SCALE-1.**

Platform Management may hold:
- source registry metadata;
- policies;
- source availability/ownership metadata.

Jarvis/product runtime composes authorized Context Plans/Packets.

Domain products/knowledge systems own:
- canonical data;
- retrieval semantics;
- domain indexes.

Why no central service:
- would risk recreating one “brain database”;
- adds latency/network dependency;
- current main consumer is Jarvis;
- RQ-10 deliberately keeps context federated.

Promotion trigger:
- multiple non-Jarvis consumers;
- repeated duplicated retrieval orchestration;
- high-value shared caching/query isolation;
- independent scale proven.

---

## 16. Model / AI runtime

### Shared
- RouteProfile/ModelBinding contracts;
- provider adapter interfaces;
- cost/usage envelope;
- evaluation interfaces.

### M2-20 form
> **Shared Package/Module executed inside Jarvis and worker runtimes. No centralized AI Gateway at SCALE-1.**

Model/provider credentials remain server-side/protected.

Why:
- avoids extra hop/bottleneck;
- RQ-13 requires provider-neutral contracts, not a central gateway;
- most model work currently enters through Jarvis/worker execution.

Promote to shared AI Runtime/Gateway only when evidence shows:
- several products independently call models;
- central provider rate/quota control materially helps;
- security/credential concentration benefits;
- provider failover/routing needs consistent live state;
- centralized execution improves economics/observability enough to justify the service tax.

---

## 17. Durable Task orchestration

> **Shared Platform Runtime Capability with durable state.**

Why:
- tasks cross products;
- must survive Jarvis/browser/worker restarts;
- owns timers/waits/checkpoints/resumption;
- one task lifecycle contract is intentionally shared.

Important:
> M2-20 does **not** require Durable Task orchestration to be a dedicated independently deployed microservice on day one.

Initial physical options may include:
- coordinator module + durable store/queue within the Execution estate;
- managed workflow runtime;
- separate coordinator process.

Hard requirements:
- not dependent on interactive process memory;
- durable state outside disposable worker instances;
- workers can restart independently;
- orchestration remains recoverable.

---

## 18. Async Execution / Worker Estate

> **Separate Process / Worker Roles.**

Initial shared worker estate may contain logical pools for:
- deep AI;
- bounded agents;
- Artifact generation;
- offline evaluation;
- notification delivery;
- other noninteractive jobs.

Keep distinct:
- queues;
- priorities;
- concurrency;
- budgets;
- resource limits.

Do **not** create one deployment per queue at SCALE-1.

Split worker deployments only when RQ-19/RQ-25 evidence shows different pressure/failure/runtime needs.

---

## 19. Connector Runtime

M2-09 already creates a stronger boundary than ordinary reusable logic.

### Definitions/adapters
- shared connector contract;
- provider adapter modules/plugins.

### Runtime
> **Shared Platform Runtime, isolated from interactive product/Jarvis runtime.**

Owns:
- webhook/provider ingress;
- credential-broker interaction;
- provider clients;
- sync/backfill;
- rate limits;
- reconciliation;
- connection health;
- provider actions.

Why:
- credentials;
- untrusted/external ingress;
- provider failures/quotas;
- backfill bursts;
- cross-product connection reuse.

Initial packaging may combine:
- connector HTTP ingress;
- connector coordinator;
- connector workers

in one connector deployment/estate.

Provider-specific pools split only when volume/failure/quota requires.

Domain normalization/business semantics still belongs to the specialist product/domain contract.

---

## 20. Shared Notification Plane

### Meaning
Domain products own notification meaning.

### Shared state/logic
Platform Management owns or hosts:
- notification preferences;
- quiet hours;
- channel preferences;
- suite inbox metadata.

### Delivery
> **Worker role inside Async Execution estate at SCALE-1.**

No standalone Notification Service is required initially.

Split when:
- delivery volume;
- provider isolation;
- reliability/SLO;
- channel-specific runtime

creates independent operational pressure.

Operational/SRE paging remains separate from tenant/user notifications.

---

## 21. Audit records / provenance / usage economics

### Shared contracts
M2-12/M2-14 envelopes.

### Audit + economic ledger
> **Authoritative shared modules/stores under Platform Management, with asynchronous ingestion/sink workers where useful.**

No standalone:
- Audit Service;
- Provenance Service;
- Billing Usage microservice

is required at SCALE-1.

Why central ownership:
- suite-wide consistency;
- security/accounting significance;
- cross-product Control Room needs.

But:
- provenance semantics may remain domain/artifact-owned;
- operational telemetry remains separate;
- raw domain events remain domain-owned.

Split ingestion/query runtimes later only if volume/security/SLO proves it.

---

## 22. Resource Links

> **Shared Contract + helper package + product-owned resolver.**

No central Resource Link service initially.

Every product is responsible for resolving its own stable resource types.

Shared shell/Jarvis/notifications/Control Room consume the contract.

A central directory/index may be introduced later only if cross-product discovery requires it.

---

## 23. Artifacts

> **Shared Artifact contract + storage/version helper package; ownership stays with the producing product/Jarvis. No universal Artifact Service at SCALE-1.**

Rules:
- specialist domain object exists → use domain object;
- Jarvis generic analysis/report artifact → Jarvis-owned artifact store;
- product-specific artifact → product-owned.

Promote to shared service only if:
- many products create the same generic artifact lifecycle;
- cross-product sharing/version/access semantics become substantial;
- duplicated storage/governance logic becomes material.

---

## 24. Memory / knowledge

### Personal Jarvis memory
> **Jarvis-owned governed store/capability initially.**

### Approved organization/domain knowledge
> **Owned by the appropriate knowledge/domain system.**

### Task state
> Durable Task runtime.

No generic “Memory Service” or company-brain database at SCALE-1.

Shared contracts govern:
- scope;
- provenance;
- lifecycle;
- deletion;
- retrieval eligibility.

Centralization requires proven cross-product consumption beyond Jarvis.

---

## 25. Version/Compatibility registry

M2-19 metadata may begin in:
- repositories;
- CI artifacts;
- deployment metadata;
- Platform Management tables.

> **Module/capability inside Platform Management. No standalone Compatibility Service.**

Control Room later indexes/displays it.

Promote only if runtime compatibility negotiation becomes independently complex/high-volume.

---

## 26. Feature flag / rollout capability

> **Shared contract/client package; provider/backend implementation remains replaceable. No custom Feature Flag Service at SCALE-1.**

Platform Management/Control Room records:
- rollout intent/state;
- tenant/stamp targeting where needed;
- version correlation.

Feature flag provider remains implementation choice.

---

## 27. Admonk Control Room / Platform Operations Plane

> **Shared Platform Operations Runtime, separate from tenant application runtimes.**

Recommended distinct runtime from Platform Management at SCALE-1 because:
- internal privileged audience;
- very different authorization;
- telemetry/query workloads;
- must investigate failures in other planes;
- high-cardinality operational access;
- should not increase customer-admin attack surface.

Owns:
- Operational Issue records;
- system/resource topology index;
- ScaleGate live evidence/view;
- cross-backend correlation;
- operator-facing aggregation;
- governed runbook initiation.

Does **not** own:
- raw metrics engine;
- raw log engine;
- full trace store;
- full AI eval backend;
- product analytics engine.

Those remain specialist observability backends.

---

## 28. Telemetry / observability pipeline

> **Operational Infrastructure, not an Admonk business microservice.**

Use OpenTelemetry-compatible instrumentation/collectors where selected.

Collector topology may evolve:
- SDK/direct;
- agent;
- gateway;
- agent + gateway.

Specialist backends remain replaceable.

Telemetry export/processing must not block critical tenant request paths.

Control Room consumes adapters/indexes over those backends.

---

## 29. Operational alerting

> **Platform Operations capability / specialist alerting backend**, separate from M2-13 user notifications.

Control Room correlates alerts into Operational Issues.

Do not make tenant notification infrastructure a dependency for platform incident paging.

---

## 30. Voice / realtime

> **Optional Jarvis runtime role, not a permanent shared service before voice is enabled.**

If enabled:
- may begin as module/session handler within Jarvis runtime if provider transport/scaling permits;
- split to separate realtime process/runtime when persistent media connections, codec/runtime, latency, concurrency or failure isolation justify it.

Voice never gets separate authority/context/task semantics.

---

## 31. Browser / computer / code sandbox

> **Hard isolated execution runtime from first Production use.**

This is a security boundary, not merely a scaling choice.

Requirements:
- no execution inside Jarvis/web/API process;
- scoped task credentials/capabilities only;
- network/filesystem policy;
- ephemeral/restricted environment;
- full task/action correlation;
- kill/cancel controls.

May be:
- dedicated sandbox worker pool;
- managed sandbox service;
- isolated container/VM runtime.

Vendor/technology deferred.

---

## 32. Product Supervisor

> **Governance contract/process, not a Production microservice.**

Its live operational evidence is surfaced through:
- repository/project artifacts;
- Platform Management metadata;
- Control Room ScaleGate/release views.

Do not build a Product Supervisor runtime merely to mirror documentation.

Automated checks/CI may implement parts of its gates.

---

# PART D — SCALE-1 PHYSICAL STARTING SHAPE

## 33. Recommended coarse runtime estates

M2-20 recommends the following **coarse runtime estates**, not one service per logical component.

### A. Platform Management Runtime
One modular shared application for:
- tenant/account/admin;
- entitlements/settings;
- operator access metadata;
- setup;
- connection registry metadata;
- compatibility/placement/rate-card governance;
- audit/usage authoritative modules.

### B. Jarvis Interactive Runtime
One Jarvis-owned application for:
- conversation/workspace;
- routing/context composition;
- synchronous model/tool orchestration;
- interactive streaming.

### C. Specialist Product Runtimes
One domain-owned runtime per actual specialist product as its domain/application needs require.

Do not merge all products into the Foundation runtime.

### D. Execution Estate
Durable Task coordination + shared async worker pools.

May begin with:
- one coordinator/runtime;
- one worker deployment with multiple logical pools/queues.

Split later.

### E. Connector Estate
Separate connector ingress/runtime/worker estate.

Strong early boundary due credentials/external providers/backfills.

### F. Platform Operations Runtime
Control Room backend/internal operator application + operational correlation/index.

Raw telemetry systems remain external/specialist.

### Optional G. Realtime Voice Runtime
Only when enabled/needed.

### Optional H. Sandbox Execution Runtime
Required as separate isolated runtime whenever browser/code/computer execution is enabled.

---

## 34. What this deliberately avoids

Not required at SCALE-1:
- Authorization Service;
- Context Service;
- AI Gateway;
- Notification Service;
- Artifact Service;
- Memory Service;
- Compatibility Service;
- Feature Flag Service;
- Resource Link Service;
- Product Supervisor Service;
- one connector service per provider;
- one worker service per queue;
- one database per runtime role.

Those remain contracts/modules or shared coarse runtime capabilities until evidence says otherwise.

---

# PART E — DATA / STATE OWNERSHIP

## 35. No shared-database free-for-all

Coarse deployment does not mean ambiguous data ownership.

Every logical module/domain declares:
- state owner;
- tables/schema/storage it may write;
- public capability/query contract;
- migration owner.

Other modules do not mutate another owner's state directly merely because they share a database engine.

---

## 36. Physical database policy

M2-20 does not mandate:
- one physical DB per service;
- one DB per product;
- one DB technology.

However:
- Platform Management state must not be exposed to uncontrolled tenant workload pressure;
- domain state remains owned by domain runtimes;
- Durable Task state survives disposable compute;
- Connector operational checkpoints survive connector worker restart;
- telemetry is not stored as ordinary business tables.

The exact physical database/resource topology follows implementation and SCALE evidence.

---

# PART F — SYNCHRONOUS VS ASYNCHRONOUS

## 37. Synchronous calls

Use when:
- caller needs immediate answer;
- operation is bounded/fast;
- direct response is part of user interaction;
- consistency/current-state check is required.

Examples:
- tenant entitlement lookup;
- resource navigation;
- current campaign metric query;
- action preflight.

Do not insert queues merely to make the diagram “event driven”.

---

## 38. Asynchronous work

Use queue/durable execution when:
- user need not block;
- burst/load must be leveled;
- work is long-running;
- retries/checkpoints matter;
- external dependency may wait;
- workload needs independent concurrency.

Examples:
- backfill;
- deep research;
- Artifact generation;
- notification delivery;
- connector reconciliation;
- evaluation batches.

Queues are not the system of record for business truth.

---

# PART G — SERVICE COMMUNICATION

## 39. Network contracts

Cross-runtime calls use explicit versioned contracts from M2-19.

Do not:
- share internal DB tables as an API;
- expose implementation classes over the network;
- make product UIs depend directly on provider APIs when a domain capability exists.

Network boundaries must be observable:
- trace/correlation;
- timeout;
- retry policy;
- idempotency where mutation is possible;
- auth/service identity;
- error contract.

---

## 40. Avoid chatty runtime decomposition

A candidate service split is rejected/deferred when normal user work would require a chain such as:

```text
Jarvis
→ Context Service
→ Authorization Service
→ AI Gateway
→ Tool Router
→ Action Service
→ Audit Service
```

for every simple request.

Many of those are contracts/modules/state authorities, not network services.

The preferred SCALE-1 interactive path stays short.

---

# PART H — PROMOTION / SPLIT RECORD

## 41. Runtime Boundary Decision Record

When splitting/centralizing a runtime component, record:

```text
RuntimeBoundaryDecision
  capability
  current_form
  proposed_form

  trigger:
    security
    scale
    failure_isolation
    state_authority
    availability
    release_lifecycle
    runtime/hardware
    external_ingress
    consumer_count/consistency

  evidence
  expected_benefit

  new_network_dependencies
  latency_cost
  operational_cost
  data_consistency_cost

  migration_plan
  rollback/merge-back option

  decision
```

This becomes part of Product Supervisor / ScaleGate evidence.

---

## 42. Split is reversible where practical

A service boundary is not sacred.

If evidence later shows:
- excessive network latency;
- operational burden;
- constant synchronized releases;
- no independent scale;

Admonk may merge it back into a coarser runtime while preserving the stable contract.

Architecture follows evidence both directions.

---

# PART I — M2-20 RECOMMENDED LOCK

## 43. Lock statement

> **M2-20 — Coarse-Grained Runtime Architecture with Evidence-Promoted Isolation**
>
> Admonk separates **logical contract boundaries, scaling units and physical deployment/runtime boundaries**. A logical component does not become a microservice merely because it has a name or shared contract.
>
> Use five implementation forms: **Shared Contract, Shared Package/Module, Separate Process/Worker Role, Shared Platform Service/Runtime, and Domain-Owned Product Runtime**.
>
> Prefer contracts/modules for deterministic reusable behavior. Use worker/process boundaries for asynchronous, bursty, resource-heavy or special-runtime work. Use shared platform services only where authoritative shared state, hard security/credential boundaries, independent availability/scale, shared ingress, durable coordination or central live behavior makes the network boundary valuable. Keep domain semantics/state in domain-owned product runtimes.
>
> A network service carries explicit latency, failure, authentication, observability, deployment and consistency cost. Two consumers justify a shared contract; they do **not** automatically justify a shared service.
>
> **Platform Management** is one coarse-grained shared runtime at SCALE-1 containing modular tenant/account/entitlement/settings/setup/operator/registry/version/governance capabilities. Do not split those modules into microservices prematurely.
>
> **Jarvis Interactive/Orchestration** remains a Jarvis-owned runtime separate from Platform Management and specialist products.
>
> **Specialist products** remain domain-owned runtimes and expose governed capability contracts.
>
> The **Context Plane** remains federated contracts + shared composition package + domain providers; there is no generic Context Service at SCALE-1.
>
> **Authorization evaluation** uses shared deterministic contracts/packages over authoritative platform/domain state; there is no mandatory authorization microservice at SCALE-1. Consequential actions use sufficiently fresh authoritative preflight.
>
> **Model/provider execution** uses shared provider-neutral adapter packages inside Jarvis/worker runtimes; there is no centralized AI Gateway at SCALE-1. Promote one only if multi-consumer quota/security/routing/economic evidence justifies it.
>
> **Durable Task orchestration** is a shared durable runtime capability independent of interactive process memory. Its coordinator may initially share the Execution estate; M2-20 does not require a dedicated microservice if durability/recovery constraints are still met.
>
> **Async execution** uses separate worker/process roles with independent queues/concurrency/budgets while allowing multiple logical worker pools to share one deployable initially.
>
> **Connector Runtime** is a real shared runtime/isolation boundary from SCALE-1 because of credentials, external ingress, provider quotas/failures, backfills and cross-product connection reuse. Provider adapters remain modules inside that runtime; domain semantics remain product-owned.
>
> The **Shared Notification Plane** keeps preference/inbox/control modules in Platform Management and delivery in async workers at SCALE-1; no standalone Notification Service is required until volume/failure evidence justifies it.
>
> **Audit/economic ledgers** have shared authoritative ownership but may begin as modules/stores plus ingestion workers rather than standalone services. Provenance/domain events/telemetry remain semantically separate.
>
> **Resource Links** remain shared contract + helper package + product-owned resolvers.
>
> **Artifacts** use shared contracts/helpers with producing-product/Jarvis ownership; no universal Artifact Service at SCALE-1.
>
> **Memory/knowledge** remains governed but ownership-specific; no generic Memory Service or company-brain database.
>
> **Compatibility/version metadata** lives in repositories/CI/Platform Management; no Compatibility Service is required.
>
> **Feature flags** use a replaceable provider-neutral contract/client; no custom Feature Flag Service is required.
>
> **Admonk Control Room** has its own Platform Operations runtime separate from tenant application runtimes and distinct from Platform Management. It owns operational correlation/issues/runbook initiation, not raw telemetry/eval engines.
>
> **Telemetry/observability** is operational infrastructure, preferably OpenTelemetry-compatible where selected, not a business microservice.
>
> **Voice** remains an optional Jarvis runtime role and separates only when realtime transport/concurrency/failure evidence justifies it.
>
> **Browser/computer/code execution** is an exception: when enabled, it always runs in a hard isolated sandbox runtime rather than inside Jarvis/application processes.
>
> **Product Supervisor** remains governance/process plus automated checks, not a Production microservice.
>
> SCALE-1 starts with coarse runtime estates: **Platform Management, Jarvis Interactive, specialist product runtimes, Execution/Workers, Connector Runtime, and Platform Operations**, plus optional Voice/Sandbox where enabled.
>
> Physical databases are not assigned one-per-service. Logical state ownership and write boundaries are explicit; physical resource isolation evolves according to security, load and ScaleGate evidence.
>
> Service extraction is evidence-driven and reversible. Split when security, scale, failure isolation, authoritative state, availability, external ingress, hardware/runtime or independent lifecycle justifies the runtime boundary; keep/merge components when separation creates chatty calls, shared transactions, synchronized deployment or more operational cost than value.
>
> **Admonk should be modular enough to split cleanly, but simple enough that it does not pay distributed-system costs before it earns the need.**

## 44. Accepted cost

This model accepts:
- coarse-grained runtimes with strong internal module discipline;
- some package-version skew;
- later extraction work when evidence triggers it.

In exchange it avoids:
- premature microservices;
- excessive network hops;
- duplicated infrastructure;
- tiny service operational burden;
- a central AI/context/artifact/memory service before its value is proven.

It still preserves:
- clear ownership;
- security boundaries;
- durable execution;
- connector isolation;
- independent scale paths;
- M2-19 compatibility seams;
- SCALE-1 → SCALE-6 evolution.

## 45. Recommendation

**LOCK M2-20 as written.**

If locked:
1. FOUNDATION-M2 major architecture decisions are complete through M2-20;
2. run the planned **M2 Exit Reconciliation / completeness audit**;
3. reconcile remaining “open questions” into semantic-vs-runtime-vs-vendor decisions;
4. update Product Supervisor/Scaling Plan;
5. then create the Control Room Product Requirements and decide Jarvis Lab implementation authorization.

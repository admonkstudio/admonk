# Jarvis Research Question 19 — Technical Scaling Architecture

**Date:** 2026-09-28  
**Track:** Jarvis Deep Question Register  
**Question:** How should Jarvis/Admonk scale technically without prematurely turning the product into a distributed-systems project?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/platform/runtime architecture research only.

## 1. Decision problem

Jarvis now has locked contracts for:
- context assembly;
- model/provider routing;
- dynamic workspaces;
- governed actions;
- connectors;
- durable tasks;
- failure/recovery;
- evaluation;
- latency;
- economics.

RQ-19 must determine how those workloads scale when:
- tenant count grows;
- one tenant becomes very large;
- interactive traffic spikes;
- many durable/background tasks run simultaneously;
- connectors deliver webhook bursts/backfills;
- voice sessions stay open for long periods;
- external provider quotas become bottlenecks;
- data volume and derived indexes grow;
- regions/residency requirements expand.

The goal is not `maximum distributed architecture`.

The goal is:
> **independent scalability where pressure differs, isolation where failure/risk differs, and simplicity everywhere else.**

## 2. External research evidence

### Queue-based load leveling and competing consumers

Microsoft's current architecture guidance recommends queues when asynchronous workloads have bursty/variable load, allowing consumers to scale independently and smoothing pressure on downstream systems. It also warns that queues add unnecessary complexity for low-latency synchronous paths.

Sources:
- https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling
- https://learn.microsoft.com/en-us/azure/architecture/patterns/competing-consumers

### Bulkheads / cell-style isolation

Microsoft's Bulkhead pattern recommends partitioning workloads/resources so one failing or overloaded dependency/consumer does not exhaust the resources required by unrelated work. It specifically notes that AI/inference workloads may require separate pools because of deployment-level quotas/concurrency constraints.

Source:
- https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead

### Multitenant control plane vs application/data plane

Azure and AWS current SaaS guidance separate a shared control plane (tenant/configuration/management) from tenant-facing application/data-plane traffic. Azure specifically recommends isolating control-plane resources so tenant load cannot exhaust platform-management capacity.

Sources:
- https://learn.microsoft.com/azure/architecture/guide/multitenant/considerations/control-planes
- https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/control-plane-vs.-application-plane.html

### Tenant isolation / noisy-neighbor protection

AWS SaaS Lens treats tenant isolation as foundational. Azure multitenant guidance explicitly frames shared infrastructure as a tradeoff among scale, cost, isolation and noisy-neighbor risk; it recommends quotas/rate limits and deployment stamps/cells when stronger isolation or independent scale becomes necessary.

Sources:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/tenant-isolation.html
- https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/approaches/overview
- https://learn.microsoft.com/en-us/azure/architecture/antipatterns/noisy-neighbor/noisy-neighbor

### Stateless compute scales more easily

Azure and Google guidance both recommend avoiding unnecessary state in frontend/application compute. Keeping durable state outside compute instances allows instances/workers to be replaced and scaled horizontally more easily.

Sources:
- https://learn.microsoft.com/en-sg/azure/architecture/guide/multitenant/approaches/compute
- https://cloud.google.com/blog/topics/solutions-how-tos/optimize-your-system-design-using-architecture-framework-principles

### Reliable events require idempotency and transactional publication

AWS/Microsoft guidance on Transactional Outbox addresses the dual-write problem when business state and events must be committed reliably, and emphasizes idempotent consumers because at-least-once delivery can produce duplicates.

Sources:
- https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html
- https://learn.microsoft.com/en-us/samples/azure-samples/cosmos-db-design-patterns/transactional-outbox/

## 3. Core conclusion

> **Scale Admonk by workload pressure and failure domain—not by product names or architectural fashion.**

Lock three distinct concepts:

```text
CONTRACT BOUNDARY
what semantics/ownership are separated

SCALING UNIT
what may need independent concurrency/capacity/isolation

DEPLOYMENT UNIT
what is physically deployed as a separate service/process today
```

These are **not the same thing**.

A workload may be a distinct scaling unit while still sharing one deployment initially.

## 4. Preserve the Foundation promotion ladder

RQ-19 does not replace M2-01/M2-20.

Default promotion path remains:

```text
domain-local implementation
        ↓
proven second consumer / hard consistency-security need
        ↓
shared contract
        ↓
shared package if useful
        ↓
shared runtime service only when
independent scale/security/consistency/operations justify it
```

Do not create a microservice merely because:
- a concept is important;
- two products have similarly named code;
- a diagram looks cleaner;
- it might scale someday.

## 5. Logical planes

Use two high-level planes.

### Control Plane

Owns relatively low-frequency, high-consistency platform management such as:
- tenant catalog/placement;
- account/membership administration;
- entitlements/SKUs;
- shared settings/policy metadata;
- connector definitions + connection registry;
- route/model binding releases;
- rate-card/economic policy;
- product/setup health metadata;
- deployment/stamp mapping;
- administrative operations.

Admonk One is the user-facing control-plane experience for many of these functions.

### Application / Data Plane

Handles tenant/user work:
- Jarvis requests;
- product/domain reads/writes;
- context retrieval;
- model/tool execution;
- dynamic workspace data;
- connector sync/query/action;
- durable-task execution;
- realtime voice;
- domain business actions.

Control-plane resources must not depend on the same saturated execution pool as tenant AI/background workloads.

## 6. Initial logical scaling units

Define the following as **scaling units**, without requiring separate services immediately.

### SU-1 — Interactive Request Plane

Responsibilities:
- R0/R1/R2 request intake;
- auth/context bootstrap;
- task/route/surface dispatch;
- lightweight synchronous reads;
- response/event streaming;
- workspace orchestration.

Characteristics:
- latency sensitive;
- short-lived requests;
- stateless/disposable compute preferred;
- protect from background backlog.

Scale signals:
- concurrency;
- request rate;
- p95/p99 latency;
- CPU/memory only as secondary signals;
- active streams/connections.

### SU-2 — Realtime Voice Plane

Characteristics:
- long-lived connections;
- media/network sensitivity;
- different provider quotas;
- high concurrency/session count;
- interruption/turn latency requirements.

Should have independent concurrency/capacity controls from text/API traffic.

Physical separation occurs only when actual runtime/transport needs justify it.

### SU-3 — Durable Task Orchestration Plane

Responsibilities:
- RQ-14 task state;
- timers/waits;
- retry policy;
- checkpoints;
- signals/callbacks;
- cancellation;
- workflow versioning.

Characteristics:
- durable/high-consistency control state;
- low CPU relative to worker execution;
- must survive worker/app restart;
- should not hold expensive compute while waiting.

### SU-4 — Asynchronous Worker Pools

Executes:
- deep model steps;
- agent instances;
- artifact generation;
- offline analysis;
- background jobs;
- task child work.

Characteristics:
- bursty;
- expensive;
- horizontally scalable;
- queue/load-leveling friendly;
- bounded concurrency/budgets.

Split pools by workload class when pressure/quotas differ materially.

### SU-5 — Connector Ingestion / Sync Plane

Handles:
- webhook ingestion;
- initial backfills;
- incremental sync;
- polling/reconciliation;
- provider read/actions;
- checkpointing/rate limits.

Important separation:
- webhook endpoint should validate + acknowledge quickly;
- heavy reconciliation/sync moves to durable async work;
- per-provider/per-connection rate limits and backpressure.

### SU-6 — Notification / Delivery Workers

Handles asynchronous delivery after shared notification semantics are determined.

Lower priority than interactive task work unless notification is REQUIRED/ACTION_REQUIRED.

### SU-7 — Derived Retrieval / Index Plane

Examples:
- search indexes;
- vector/semantic indexes;
- caches;
- derived aggregates.

These remain derived/supporting infrastructure under RQ-10, not source-of-truth ownership.

### SU-8 — Observability / Evaluation Pipeline

Telemetry, traces, evaluation/shadow processing must not block tenant request paths.

Use asynchronous export/processing where possible.

## 7. Scaling unit does not imply microservice

Initial deployment could legitimately be:

```text
Web/API application
  ├ interactive request handlers
  ├ control-plane API modules
  └ lightweight orchestration

Worker application
  ├ durable/background workers
  ├ connector workers
  └ artifact/eval workers

Shared durable stores / queues / caches
```

Later measurement may justify splitting:
- realtime voice;
- connector runtime;
- durable orchestration;
- specific heavy worker pools;
- control plane.

Do not start with eight independently operated services just because there are eight scaling units.

## 8. Synchronous vs asynchronous boundary

Keep the user-critical R0/R1 path synchronous/direct when it genuinely needs immediate response.

Use asynchronous queueing for:
- R3 extended work;
- provider backfills/sync;
- batch/offline analysis;
- notifications;
- expensive artifact processing;
- asynchronous evaluations;
- non-urgent derived-index updates.

Do not insert queues into every read/action simply for architectural uniformity.

Queue-based load leveling is useful when producer rate and worker capacity differ; it is harmful when the caller requires an immediate low-latency result and the workload is simple.

## 9. Queue architecture

Where queues are used, requirements include:
- durable delivery appropriate to task risk;
- stable message/job IDs;
- task/tenant/priority metadata;
- bounded payload size;
- artifact/resource refs for large payloads;
- retries/backoff;
- dead-letter/quarantine path;
- idempotent consumers;
- visibility/lease/heartbeat semantics;
- queue age/depth observability.

Do not assume global FIFO ordering.

Where ordered mutation per resource is necessary, partition/serialize by a stable resource/session key rather than globally serializing all work.

## 10. Priority and workload isolation

Do not let one backlog starve latency-sensitive work.

Candidate priority classes:

```text
P0 — safety/control/required operations
P1 — interactive user-blocking work
P2 — normal durable/background work
P3 — batch/backfill/enrichment
P4 — evaluation/shadow/maintenance
```

Exact names/priorities are not locked; principle is.

Separate worker pools/queues where necessary to preserve:
- interactive latency;
- provider quota fairness;
- important task deadlines;
- connector health;
- evaluation cost controls.

## 11. Tenant fairness / noisy-neighbor controls

A single large tenant must not consume all shared capacity.

Use combinations of:
- per-tenant concurrency limits;
- per-tenant task/AI credit budgets;
- queue fairness/weighted scheduling;
- connector/provider concurrency caps;
- rate limits;
- maximum background backlog;
- resource quotas;
- workload priority;
- tenant-specific reserved/dedicated capacity only when commercially/operationally justified.

Tenant entitlement/plan may affect **allowed capacity policy**, but authorization/security remains separate.

## 12. Provider quota bulkheads

External provider limits create their own failure domains.

Examples:
- model provider concurrent request quotas;
- realtime-session quotas;
- Meta/Google/Zoho API limits;
- search/browser limits.

Use provider-specific concurrency pools/rate limiters so:
- one provider outage doesn't consume all worker threads/connections;
- one connector's backfill doesn't starve unrelated providers;
- repeated 429s produce backpressure rather than retry storms.

RQ-15 circuit breakers remain authoritative.

## 13. Backpressure

When demand exceeds safe capacity:

```text
admission/rate limit
      ↓
queue/buffer where appropriate
      ↓
reduce optional/speculative work
      ↓
defer low-priority batch
      ↓
degraded mode where allowed
      ↓
reject/pause with truthful state if capacity limit persists
```

Never let uncontrolled queue growth become hidden latency.

Track **queue age**, not only queue depth: 100 tasks that each take 10ms differ from 100 tasks that each take 20 minutes.

## 14. Autoscaling signals

Scale each unit on the pressure that actually constrains it.

Examples:

### Interactive
- request/concurrent stream count;
- p95 latency;
- CPU/memory;
- connection count.

### Async workers
- queue age;
- queue depth;
- work duration;
- provider concurrency ceiling;
- active worker utilization.

### Voice
- active sessions;
- media connections;
- turn latency;
- provider session quota.

### Connector sync
- backlog/age per provider;
- checkpoint lag;
- webhook ingestion rate;
- provider rate-limit headroom.

Do not autoscale solely on CPU when the real bottleneck is an external quota or database connection pool.

## 15. Stateless compute / external durable state

Interactive and worker compute should be disposable where practical.

Do not rely on local process memory as the canonical location for:
- user/session state;
- Durable Task state;
- authorization state;
- task progress;
- action approval;
- connector checkpoints;
- authoritative cache entries.

State lives in appropriate external durable stores/contracts.

Local/in-memory caches may accelerate work but must tolerate instance loss and cannot become authority.

## 16. Data ownership vs physical database topology

RQ-19 does **not** lock one database-per-service or one database-per-product.

Lock instead:
- shared platform data keeps shared semantics/ownership;
- specialist domain data keeps domain ownership;
- Context/derived indexes remain derived;
- cross-domain access happens through governed contracts;
- physical co-location is allowed initially if simpler and isolation/ownership are preserved;
- future split/sharding must remain possible through stable identifiers/contracts.

A `database boundary` and a `domain ownership boundary` are not automatically identical.

## 17. Tenant-aware data scale

All shared multitenant data access paths must carry explicit tenant context.

Data-layer design must support:
- tenant-scoped queries/indexing;
- per-tenant export/delete/governance;
- per-tenant usage/cost attribution;
- future tenant placement/stamp routing;
- avoiding accidental unbounded cross-tenant scans.

Exact database/RLS/encryption implementation belongs partly to RQ-20/M2-20.

## 18. Scale data only when evidence requires it

Preferred evolution:

```text
single appropriately-sized store
        ↓
indexes/query optimization
        ↓
read replicas/caching/derived read models where justified
        ↓
partitioning/sharding when measured limits demand it
        ↓
tenant/domain/stamp split when isolation/region/scale demands it
```

Do not pre-shard a low-volume system.

Do not keep one overloaded database merely to avoid evolution.

## 19. Caching

Use cache-aside/derived caches for read-heavy reusable data when freshness/sensitivity allows.

Requirements:
- source remains canonical;
- tenant/scope included in cache identity where data is scoped;
- version/freshness metadata;
- invalidation/TTL appropriate to semantic risk;
- cache miss must safely fall back;
- cache outage should not corrupt authority;
- RQ-10/RQ-15 stale-data rules apply.

Semantic caching is only appropriate when semantic equivalence and tenant/privacy rules can be guaranteed.

## 20. Eventing — selective, not universal

Use events when multiple asynchronous consumers genuinely need to react to a committed state change.

Good candidates:
- audit/provenance fan-out;
- notification eligibility;
- derived index invalidation/update;
- usage/economics aggregation;
- cross-product state awareness;
- background follow-up.

Do **not** convert ordinary request/response domain logic into event choreography just because event-driven architecture scales.

Event-heavy systems add:
- eventual consistency;
- ordering complexity;
- duplicate delivery;
- schema evolution;
- debugging/observability cost;
- risk of event storms.

## 21. Reliable event publication

When a domain mutation and event publication must remain consistent, use a reliable atomic publication mechanism such as Transactional Outbox/CDC where appropriate.

Consumers remain idempotent because at-least-once delivery/retries can duplicate events.

Large payloads use references/claim-check style rather than sending whole artifacts/documents through the bus.

Exact broker/outbox technology is deferred.

## 22. Orchestration vs choreography

Use explicit orchestration for:
- RQ-14 Durable Tasks;
- multi-step governed actions;
- workflows requiring approval/wait/compensation;
- operations where the product needs one reconstructable task state.

Use event choreography for:
- loosely coupled secondary reactions;
- notification/index/analytics fan-out;
- consumers that can independently tolerate delay/retry.

Do not build Jarvis core task state by hoping many independent event consumers converge correctly.

## 23. Deployment stamps / cells

Do not require per-tenant infrastructure initially.

Start with shared multitenant deployments where they satisfy:
- tenant isolation;
- performance;
- compliance/residency;
- cost;
- operational simplicity.

Introduce **deployment stamps/cells** when evidence shows a need for:
- tenant count/capacity limits;
- noisy-neighbor containment;
- large/premium tenant reserved capacity;
- region/data residency;
- regulated isolation;
- release-ring differences;
- incident blast-radius reduction.

One stamp may serve many tenants.

Control plane maintains tenant → stamp/region placement metadata.

## 24. Cell/stamp principle

A stamp should be a repeatable deployable scale unit, not a one-off customer fork.

```text
Global/shared control plane
       │
       ├── Stamp A → tenants 1..N
       ├── Stamp B → tenants N+1..M
       └── Stamp C → special region/premium tenant group
```

Adding a stamp should be automation/configuration, not bespoke engineering.

## 25. Multi-region

Do not build active-active global complexity before product/customer requirements justify it.

Prepare seams for:
- tenant home region;
- connector/provider regional restrictions;
- data residency;
- regional model availability;
- Resource Link routing;
- stamp placement;
- disaster recovery.

Initial region strategy can be simpler.

Actual HA/RPO/RTO/multi-region topology is deferred to Production architecture/runtime planning once business commitments exist.

## 26. Realtime UI/event delivery

Clients may use streaming/websocket/SSE/realtime channels for:
- Jarvis progress;
- workspace updates;
- Durable Task events;
- notifications;
- voice-specific media/control.

Canonical state remains server-side/durable.

A dropped realtime connection is recoverable by:
- fetching current snapshot;
- resuming events from cursor/sequence where supported.

Do not require sticky frontend instances to preserve task truth.

## 27. Database/connection protection

At scale, compute may autoscale faster than databases/provider connection capacity.

Use:
- bounded connection pools;
- pooling/proxy where appropriate;
- concurrency caps;
- backpressure;
- query/index discipline;
- batch writes where safe.

Do not allow horizontal worker scaling to create a database connection storm.

## 28. Large artifacts / payloads

Do not pass large reports/files/full context packets through queues/events/task histories.

Store large content in appropriate artifact/object/domain storage and pass:
- stable resource reference;
- version/hash;
- metadata/provenance;
- authorization context/reference.

This aligns with RQ-14 and reduces broker/history pressure.

## 29. Observability at scale

Preserve end-to-end correlation:
- tenant (governed field, not uncontrolled metrics label);
- task;
- route;
- worker pool;
- model/provider;
- connector;
- stamp/region;
- queue;
- operation/action receipt;
- artifact.

Metrics stay low-cardinality/aggregatable.

High-cardinality identifiers belong in traces/logs/ledger records with governed retention.

Monitor per-tenant health sufficiently to detect noisy-neighbor impact without creating unbounded telemetry cost.

## 30. Capacity / load testing

RQ-16/17 Lab must test:
- expected baseline load;
- projected growth load;
- burst traffic;
- one noisy tenant;
- many simultaneous tenants;
- connector webhook burst;
- large backfill;
- durable task spike;
- model provider degradation/rate limit;
- database connection pressure;
- voice concurrency;
- queue backlog/recovery.

Measure:
- p50/p95/p99 user latency;
- queue age/depth;
- throughput;
- worker utilization;
- DB/provider saturation;
- fairness between tenants;
- error/degraded rates;
- cost per successful outcome.

## 31. Scale thresholds should come from evidence

Do not lock arbitrary numbers such as:
- `10,000 users = microservices`;
- `100 tenants = sharding`;
- `1 million rows = new database`.

Promotion/split decisions use measured evidence:
- sustained saturation;
- independent scaling need;
- noisy-neighbor incidents;
- operational blast radius;
- release cadence conflicts;
- provider quota contention;
- regional/compliance requirements;
- disproportionate cost;
- reliability/SLO failures.

## 32. Runtime topology — recommended progression

### Stage A — Simple Production Foundation

Likely shape:

```text
CDN/edge
   ↓
stateless web/API runtime
   ↓
domain/shared stores + cache

durable queue/orchestration
   ↓
worker runtime

connector/webhook entry
   ↓
connector workers
```

Several logical modules may share deployments.

### Stage B — Pressure-based separation

Split only measured hotspots such as:
- voice runtime;
- connector sync;
- heavy AI worker pool;
- control plane;
- search/index service.

### Stage C — Cell/stamp scale

Add multiple application/data-plane stamps with global/shared control-plane placement when tenant/region/scale/blast-radius evidence requires it.

## 33. What RQ-19 deliberately does NOT lock

- cloud provider;
- Kubernetes;
- serverless/container platform;
- queue/broker vendor;
- Temporal/durable runtime vendor;
- Redis/cache vendor;
- SQL/NoSQL database vendor;
- vector database;
- exact number of services;
- exact DB/schema-per-product layout;
- multi-region active-active;
- per-tenant infrastructure;
- autoscaling numeric thresholds;
- shard keys;
- service mesh;
- Kafka/event-streaming platform.

These are implementation choices for M2-20/RQ-25 after contracts and workload evidence exist.

## 34. Relationship to RQ-20

RQ-19 defines scale/failure-domain seams.

RQ-20 will define security controls across those seams, including:
- tenant isolation enforcement;
- prompt/tool/data trust boundaries;
- secret handling;
- network/service identity;
- capability escalation prevention;
- untrusted content/tool output;
- sandboxing;
- audit/security monitoring.

Do not treat scalability isolation as sufficient security isolation.

## 35. Recommended lock

> **RQ-19 — Pressure-Based Scaling with Progressive Isolation**
>
> Admonk scales by **workload pressure and failure domain**, not by product names or a microservice-first ideology.
>
> Keep **contract boundaries, scaling units and deployment units distinct**. A workload may need independent capacity/concurrency policy without becoming an independent service until measured scale, isolation, release or operational needs justify the split.
>
> Preserve the Foundation promotion ladder: domain-local → shared contract → shared package → shared runtime service only when independent scale/security/consistency/operations justify centralization.
>
> Separate the shared **control plane** from tenant-facing application/data-plane execution so AI/background tenant load cannot exhaust tenant/configuration/management capacity.
>
> Treat interactive requests, realtime voice, durable-task orchestration, async workers, connector ingestion/sync, notification delivery, derived retrieval/indexing and observability/evaluation as distinct logical scaling units. They may share deployments initially.
>
> Keep interactive R0/R1 paths direct/low-latency; use durable queues/load leveling for asynchronous, bursty and background work rather than inserting queues universally.
>
> Queue consumers are idempotent, bounded, observable and retry/dead-letter aware. Use per-resource/session ordering only where semantics require it rather than global FIFO.
>
> Protect the platform from noisy neighbors through per-tenant/provider concurrency limits, quotas, budgets, fairness, backpressure and workload priority. One tenant/provider/backfill must not starve unrelated interactive work.
>
> Compute is stateless/disposable where practical; canonical task, authorization, connector checkpoint and business state lives in appropriate durable stores.
>
> Domain ownership does not require one database per service. Physical database topology remains evolvable; scale data through indexes/caching/read models first, then partition/shard/split only when measured limits or isolation requirements demand it.
>
> Use caching as derived acceleration with tenant/scope/freshness discipline; source/domain data remains authoritative.
>
> Use events selectively for asynchronous fan-out. Reliable state-change events use an atomic outbox/CDC-equivalent mechanism where needed and idempotent consumers. Jarvis core durable work remains explicitly orchestrated rather than emergent event choreography.
>
> Start with shared multitenant runtime where safe/economic. Introduce repeatable **deployment stamps/cells** when noisy-neighbor, region/residency, large-tenant, scale-limit or blast-radius evidence justifies stronger isolation. The control plane owns tenant→stamp placement.
>
> Autoscale each workload using its actual pressure signal—interactive latency/concurrency, queue age/backlog, voice sessions, connector lag/provider quota—not CPU alone.
>
> RQ-19 locks the logical scale architecture, not Kubernetes, serverless, Temporal, Redis, Kafka, database or cloud vendors. Exact runtime topology remains for M2-20/RQ-25.
>
> **Scale the parts that experience different pressure; isolate the parts that can hurt each other; keep everything else as simple as the evidence allows.**

## 36. Recommendation

**LOCK RQ-19 as written.**

This gives Admonk a path from a simple first Production runtime to multi-tenant/cell scale without either premature microservices or a future monolithic bottleneck.
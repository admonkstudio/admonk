# FOUNDATION-M3-09 — Cross-Product Capability / Data Interaction Map

**Date:** 2026-09-28  
**Status:** RESEARCH COMPLETE — OWNER DECISION PENDING  
**Milestone:** FOUNDATION-M3 — Main Product Master Plan  
**Method:** quick internal scan → two high-value sources → two scenarios → challenge → synthesis  
**Implementation authority:** None

## Internal scan

Already locked:
- M2-09: Admonk One owns the shared integration control plane; specialist products retain domain semantics and expose governed data contracts; provider-data reads and provider actions remain separate;
- M2-10: Context Plane is federated and permission-aware; domain authority, provenance and history remain local;
- M2-11: governed actions use the intersection-based Agent Authority Envelope and enforcement remains outside the model;
- M2-12: shared versioned event/audit/provenance envelopes; domain products retain state and domain-event ownership;
- M2-15: cross-product Resource Links preserve logical navigation without requiring one composed frontend;
- M2-18: shared governance contract + domain-owned policy/execution;
- M2-20: no generic Context Service at SCALE-1; Resource Links are contract + helper + product-owned resolvers; specialist products remain domain-owned runtimes;
- M3-04: product-scoped Jarvis uses that product's authorized capabilities; Jarvis Company Intelligence composes authorized domains;
- M3-05: standalone value is complete; connected value compounds;
- M3-08: shared orientation; specialist navigation.

The remaining M3 question is:

> What exact interaction contract should connect products, Jarvis and shared platform capabilities without turning cross-product value into duplicated data ownership or direct product-to-product coupling?

## External source 1 — Microsoft Graph

Microsoft Graph provides a single gateway/API surface over Microsoft 365 and related cloud services while the underlying services remain the systems providing the source data. Microsoft distinguishes real-time API access that operates on source data from separate cached/bulk Data Connect patterns.

Source:
- https://learn.microsoft.com/en-us/graph/overview

Admonk implication:
- a coherent cross-product API/contract layer does not require collapsing all operational data into one physical database;
- shared access can traverse relationships and expose multiple product domains through one interaction model;
- cached/derived data should remain distinguishable from source-authoritative data.

## External source 2 — Atlassian Teamwork Graph

Atlassian Teamwork Graph provides a common object/relationship model across Atlassian and connected external tools. It can power unified search, recommendations, analytics, agents and cross-tool automation, while carrying relationships and permission information.

Source:
- https://developer.atlassian.com/platform/teamwork-graph/what-is-teamwork-graph/

Admonk implication:
- cross-product relationship intelligence can create material value beyond simple API forwarding;
- common object/relationship semantics can improve search, discovery, analytics and AI context;
- however, making a shared graph the primary source of operational truth would conflict with Admonk's already-locked domain-authority and federated-context model.

## Scenario A — Central Unified Operational Graph

All specialist products publish most cross-product-relevant data into a shared normalized graph/store that becomes the primary interaction substrate for Jarvis and cross-product features.

### Shared layer would hold
- normalized domain objects;
- relationships;
- common search index;
- cross-product analytics projections;
- AI retrieval context;
- possibly shared write/action routes.

### Strengths
- powerful unified search and relationship discovery;
- easier cross-domain analytics;
- fewer per-product read integrations for Jarvis;
- strong foundation for recommendation/graph intelligence.

### Challenge
- duplicates operational truth;
- creates freshness/synchronization complexity;
- pushes domain semantics into one central model too early;
- risks making every product dependent on the shared graph for normal operation;
- makes deletion/governance/version migration more complex;
- increases blast radius when the shared model changes;
- conflicts with M2-10/M2-20's federated Context Plane and product-owned authoritative state.

This optimizes **centralized cross-product intelligence**, but at too high an authority/coupling cost for the current product family.

## Scenario B — Federated Domain Contracts + Selective Shared Relationship/Projection Layer

Keep authoritative business state and domain semantics in the specialist product that owns them.

Cross-product interaction happens through explicit, versioned contracts.

### 1. Product capability manifest

Each specialist product exposes what it can safely provide:
- readable domain capabilities;
- governed actions;
- resource-link types;
- domain events;
- setup/health signals;
- supported context/artifact types;
- compatibility/version metadata.

This is discoverability metadata, not permission.

### 2. Governed read contracts

Products expose purpose-built read models/views/APIs for cross-product use.

Rules:
- consumer receives only authorized fields/records;
- source product remains authoritative;
- provenance, freshness and source resource identifiers travel with the response;
- shared/Jarvis consumers do not read another product's database directly.

### 3. Governed action contracts

A cross-product action is an invocation against the owning product, not a foreign write into its database.

Rules:
- M2-11 authority evaluation applies;
- provider/action approval can still be required;
- action receipt/audit/correlation metadata is produced;
- caller cannot gain transitive authority from the producer.

### 4. Domain events

Products may emit versioned events for material state changes.

Use events for:
- asynchronous coordination;
- notifications;
- downstream derived views;
- setup/health;
- cross-product automation triggers.

Events do not transfer ownership of the underlying record.

### 5. Resource Links

Cross-product UI and Jarvis responses use stable logical Resource Links so users can drill into the authoritative product/resource.

### 6. Federated Context Plane

Jarvis and cross-product intelligence compose:
- current authorized domain reads;
- approved knowledge;
- relevant operational memory;
- task context;
- provenance.

The composition layer does not become a second source of truth.

### 7. Selective shared relationship/projection layer

Admonk may maintain shared derived projections when they create clear cross-product value, for example:
- resource relationship index;
- cross-product search metadata;
- entity linkage/correlation;
- company-level rollups;
- recent/favorite resource references;
- approved semantic/search indexes.

Every shared projection must declare:
- authoritative source(s);
- tenant/scope;
- provenance;
- freshness/checkpoint;
- sensitivity;
- retention/deletion behavior;
- rebuildability;
- compatibility/version.

Shared projections are **derived/read-optimized state**, not canonical domain state.

### 8. Cross-product interaction map

| Producer | Consumer | Interaction | Authority |
|---|---|---|---|
| Shared Platform | Specialist products | tenant, identity, entitlements, settings, connection metadata, credits, notification controls | Shared Platform authoritative |
| Specialist product | Jarvis | governed reads, capability manifest, resource links, domain actions, events | Specialist product authoritative |
| Specialist product | Another specialist product | governed read/action contract or event; never direct DB write | Producer product authoritative |
| Specialist products | Shared relationship/projection layer | source-linked derived projection/event/index | Source products authoritative |
| Jarvis | Specialist product | authorized query/action invocation | Product + M2-11 authority enforcement |
| Admonk One | Products | setup/admin coordination and shared lifecycle signals | Shared vs product ownership per M3-07 |
| Shared shell | Products | tenant/product/resource context via Resource Links | Navigation contract only |

### Strengths
- preserves domain authority;
- supports standalone products;
- enables cross-domain Jarvis and workflow value;
- keeps direct product coupling low;
- allows relationship/search intelligence without centralizing all truth;
- scales contract-by-contract instead of requiring a universal enterprise schema first;
- aligns with locked M2 architecture.

### Challenge
- requires good contract/version discipline;
- some cross-product queries may require composition across multiple services;
- derived indexes can become stale;
- correlation/entity matching needs explicit governance;
- more orchestration logic than one central database.

Mitigation:
- use shared capability/resource registries;
- promote only proven shared semantics;
- materialize read projections only for measured latency/analytics/search need;
- attach freshness/provenance to every derived view;
- keep actions and reads separately authorized.

## Synthesis

Choose **Scenario B**.

The strongest pattern is not pure federation with no shared model, and not a universal central data lake/graph.

Use:

> **Federated authoritative domains + governed capability contracts + selective shared relationship/projection intelligence.**

This preserves the strongest Microsoft Graph lesson—one coherent interaction surface does not require one data owner—while selectively adopting the strongest Teamwork Graph lesson: relationships and shared semantic projections can unlock search, analytics and AI value across tools.

## Recommended lock

> **M3-09 — Federated Domain Authority with a Governed Cross-Product Interaction Layer**
>
> Specialist products remain authoritative for their business records, workflows and domain semantics.
>
> Every product exposes a versioned capability manifest plus governed read, action, event and Resource Link contracts for approved cross-product use.
>
> Jarvis and other products consume those contracts through permission-aware composition rather than direct database access or duplicated provider connections.
>
> Cross-product writes are always governed action invocations against the owning product; no specialist product writes directly into another product's store.
>
> Admonk may maintain selective shared relationship indexes, search metadata and derived projections where they create measurable cross-product value, but those projections remain source-linked, permission-aware, freshness-aware and non-authoritative.
>
> Shared data interaction always carries tenant/scope, provenance, sensitivity, freshness and compatibility metadata.
>
> **Share capabilities and relationships; keep truth with its owner.**

**Recommendation:** LOCK Scenario B.

# FOUNDATION-M2-19 — Version / Compatibility / Migration

**Date:** 2026-09-28  
**Status:** LOCKED — OWNER ACCEPTED  
**Program:** FOUNDATION-M2 — Shared Product Platform Foundation  
**Implementation authority:** None. Architecture/contract decision only.

## 1. Decision problem

Admonk now deliberately uses:
- federated product repositories;
- shared contracts/packages;
- independently evolving specialist products;
- Jarvis as a cross-product experience;
- provider connectors;
- Durable Tasks;
- Artifacts;
- versioned AI/model/runtime definitions;
- a future Control Room;
- evidence-driven staged deployments.

Without an explicit compatibility system, the benefits of independent products turn into:
- lockstep releases;
- accidental breaking changes;
- version drift;
- unsafe database migrations;
- long-running tasks resuming against incompatible logic;
- provider connector breakage;
- tenant/stamp version confusion;
- old definitions surviving indefinitely.

M2-19 must define the **minimum common version/compatibility language** while allowing each object type to use the versioning mechanism that actually fits it.

---

## 2. Core conclusion

> **Admonk versions stable contracts, schemas and immutable definitions—not every implementation detail with one universal scheme.**

And:

> **Compatibility is a tested relationship between producer and consumer, not a promise inferred from a version string alone.**

Migration is a first-class lifecycle:

```text
EXPAND
  ↓
COEXIST
  ↓
MIGRATE
  ↓
VERIFY
  ↓
CONTRACT
```

Breaking change is therefore a managed transition, not an instantaneous replacement.

---

## 3. External research findings

### Semantic Versioning

SemVer defines:
- MAJOR for incompatible public API changes;
- MINOR for backward-compatible functionality;
- PATCH for backward-compatible fixes;
- released versions are immutable.

It also requires a clearly defined public API/contract before the version number has useful compatibility meaning.

Source:
https://semver.org/

**Admonk lesson:** use SemVer for packages/libraries and other release artifacts where MAJOR/MINOR/PATCH genuinely communicates public compatibility. Do not force SemVer onto database migration IDs, artifact revisions or every AI definition.

### Google API versioning / backwards compatibility

Google AIP-180 distinguishes:
- source compatibility;
- wire compatibility;
- semantic compatibility.

Old clients should continue working against newer servers within the same major API version.

AIP-185 recommends major-version API surfaces, keeps compatible changes in-place and requires old/new major versions to coexist for a reasonable transition period when breaking change is necessary.

Sources:
https://google.aip.dev/180
https://google.aip.dev/185

**Admonk lesson:** API compatibility is more than JSON shape. A change that preserves fields but silently changes meaning can still be breaking.

### GitHub API versioning

GitHub treats additive changes as compatible and breaking changes as a new API version. Supported old versions remain available during an explicit migration window and publish deprecation/sunset information.

Source:
https://docs.github.com/en/rest/about-the-rest-api/api-versions

**Admonk lesson:** stable consumers need an explicit support/deprecation window and visibility into sunset rather than surprise removal.

### Kubernetes version skew

Kubernetes documents exact supported version-skew relationships among independently upgraded components instead of assuming every component upgrades simultaneously.

Source:
https://kubernetes.io/releases/version-skew-policy/

**Admonk lesson:** federated products/runtimes must declare/test which producer-consumer version combinations are supported.

### Azure multitenant updates

Azure recommends:
- deciding how many versions can reasonably be maintained;
- tracking the software/infrastructure/feature version used by each tenant;
- deployment rings/stamps/flags for progressive rollout;
- health visibility before/after updates;
- avoiding permanent tenant opt-out from updates.

Source:
https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/updates

**Admonk lesson:** version state and migration eligibility must be visible per tenant/stamp where versions can differ temporarily.

### OpenTelemetry version/stability model

OpenTelemetry separates:
- component release versions;
- signal maturity/stability;
- semantic-convention versions;
- deprecation/removal.

Stable APIs preserve backward compatibility. Its semantic-convention migrations can temporarily dual-emit old/new forms to support phased consumer migration.

Sources:
https://opentelemetry.io/docs/specs/otel/versioning-and-stability/
https://opentelemetry.io/docs/specs/semconv/configuration/version-selection/

**Admonk lesson:** stability level and version number are separate concepts. Transitional dual-read/dual-write/dual-emit behavior is legitimate when it has a defined end.

### Parallel Change / Expand–Migrate–Contract

The established Parallel Change pattern introduces a breaking interface change by:
1. expanding to support old and new;
2. migrating consumers incrementally;
3. contracting/removing the old path only after migration.

Source:
https://martinfowler.com/bliki/ParallelChange.html

**Admonk lesson:** this should be the default model for shared-contract and database breaking changes whenever coexistence is practical.

---

# PART A — THE COMMON FOUNDATION

## 4. Four things that must not be confused

### 4.1 Release version

Identifies a deployable/package/build release.

Examples:
- shared package 2.4.1;
- Marketing Hub release 2026.09.28+abc123;
- Connector adapter build.

Answers:
> What code/config release is running?

### 4.2 Contract/schema version

Identifies the stable interface another component depends on.

Examples:
- Capability API v1;
- domain event schema v2;
- workspace-spec schema v1.

Answers:
> What producer/consumer contract is being spoken?

### 4.3 Definition revision

Immutable revision of a typed configuration/AI definition.

Examples:
- RouteProfile revision 13;
- ModelBinding revision 27;
- TaskDefinition revision 8;
- ProactivityContract revision 4;
- ScaleGate revision 6.

Answers:
> Exactly which definition governed this execution?

### 4.4 Migration version / migration ID

Ordered identifier for a state/data transformation.

Examples:
- database migration 202609281430_add_scope_index;
- artifact-schema migration batch 17.

Answers:
> Which transformations have been applied?

**Do not use one version field for all four.**

---

## 5. Stability lifecycle

Admonk uses a small common stability vocabulary:

### DEVELOPMENT
- internal/rapid evolution;
- no general backward-compatibility promise;
- Production dependency requires explicit accepted risk.

### PREVIEW
- intentionally exposed for controlled evaluation;
- time-bounded;
- may change incompatibly;
- must be clearly identified as non-stable.

### STABLE
- documented compatibility commitment applies;
- breaking change requires managed migration/new incompatible contract.

### DEPRECATED
- still supported;
- replacement/migration path exists;
- new consumers should not adopt it;
- sunset/review is tracked.

### RETIRED
- no longer supported for active use;
- historical artifacts/audit may still reference it.

Stability is separate from version number.

A stable v1 contract and a Preview v2 contract may coexist.

---

## 6. Compatibility states

For a producer/consumer pair or stored-resource requirement:

- **COMPATIBLE** — supported and tested.
- **COMPATIBLE_WITH_DEPRECATION** — works, but migration away is expected.
- **MIGRATION_REQUIRED** — current path still exists but upgrade is required before a defined retirement/next transition.
- **BLOCKED** — known incompatibility prevents safe rollout/use.
- **UNSUPPORTED** — outside the supported compatibility window.

Do not use a single vague label such as “old”.

---

## 7. Migration lifecycle

A migration has its own state:

- NOT_REQUIRED
- PLANNED
- READY
- IN_PROGRESS
- VERIFYING
- COMPLETE
- ROLLED_BACK
- REQUIRES_INTERVENTION

A migration may also declare recovery class:

- **REVERSIBLE** — can safely roll back directly;
- **RESTORE_BASED** — rollback requires restore/snapshot/replay;
- **FORWARD_FIX_ONLY** — safe rollback is not realistic; forward recovery plan is mandatory.

Do not claim “rollback supported” when only a forward fix exists.

---

## 8. Versioned Definition Envelope

Typed definitions that need lifecycle/version metadata may share a lightweight envelope:

```text
VersionedDefinitionEnvelope
  definition_key
  definition_kind
  revision
  lifecycle_status
  owner
  scope_if_applicable
  effective_from
  effective_until?
  supersedes?
  compatibility_contract_version?
  migration_ref?
  content_hash
  created_by
  approved_by?
  change_ref
```

Examples of payload types:
- RouteProfile;
- ModelBinding;
- AgentProfile;
- TaskDefinition;
- ProactivityContract;
- ScaleGate.

This is a **shared metadata contract**, not justification for one mega Definition Service.

Storage/runtime ownership stays with the owning domain/platform component until M2-20 proves centralization useful.

---

# PART B — VERSIONING BY OBJECT TYPE

## 9. Shared packages / libraries

Use Semantic Versioning where the package exposes a stable public API.

Rules:
- MAJOR = incompatible API change;
- MINOR = backward-compatible feature/deprecation;
- PATCH = compatible fix;
- published package versions immutable;
- exact dependency ranges should reflect the compatibility actually tested.

Do not use `^anything`/wide ranges merely for convenience when the contract is not proven stable.

Preview/development packages may remain 0.x or explicitly pre-release.

---

## 10. Service / capability APIs

For stable cross-product APIs:

### Contract
- expose a **major contract version**;
- compatible additions evolve in-place within the major;
- do not expose package-like minor/patch numbers as client API contract unless a specific need is proven.

Example:
`marketing-capability/v1`

### Breaking change
If semantic/source/wire compatibility cannot be preserved:
- create next major contract;
- support old + new during migration where practical;
- migrate consumers;
- verify old usage reaches zero or accepted retirement criteria;
- retire old major.

A new major contract must not silently reinterpret the old resource/data model.

### Consumer version choice
Admonk may choose:
- URI version;
- header version;
- typed contract/package version

per interface style at implementation time.

The architecture requirement is **explicit major compatibility**, not a specific transport syntax.

---

## 11. Events / messages

Every durable cross-component event type has:
- stable event/type key;
- schema/contract version;
- producer identity/release;
- correlation metadata from M2-12.

Default evolution:
- add optional fields where consumers safely ignore unknown fields;
- preserve existing field meaning;
- never repurpose an existing field for a different semantic;
- consumers should tolerate unknown additive values where the serialization contract supports it.

Breaking evolution:
- new event/schema major or new event type;
- dual-publish or producer translation when useful;
- migrate consumers;
- stop old form only after consumer evidence says it is safe.

Do not edit historical stored events to pretend they were emitted under a newer schema.

---

## 12. Database / persistent schema migrations

Database migrations use ordered migration IDs—not SemVer.

Default breaking-change method:

```text
EXPAND
add new structure without breaking old application

COEXIST
old + new application versions can operate safely

MIGRATE
backfill / transform / move reads+writes

VERIFY
new path complete and correct

CONTRACT
remove obsolete column/table/index/path
```

Rules:
- no destructive schema removal in the same release that first introduces its replacement for shared Production data;
- data backfills/checkpoints are resumable where material;
- migrations are observable;
- multi-tenant migrations can progress tenant/batch-wise where useful;
- old app versions and new schema must coexist for the declared deployment window;
- contract/destructive step waits until no supported consumer depends on old shape.

Migration history is append-only.

Never rewrite a previously executed migration file as if history changed.

---

## 13. Product/runtime releases

A product release ID identifies deployed software but is **not itself the cross-product compatibility contract**.

Record:
- product/runtime;
- release ID/version;
- commit/build identifier;
- deployed environment;
- deployed_at;
- active flags/config revisions;
- contract versions provided/required.

Exact release numbering may use:
- SemVer;
- date-based releases;
- another team convention.

M2-19 does not force one numbering convention onto every product repo.

What matters is the declared contract compatibility.

---

## 14. Connector versions

Track separately:

1. **Connector definition/adapter release**
2. **Provider API/version**
3. **Connection configuration schema**
4. **Governed Admonk capability/domain contract**

Why:
- provider API can change without Admonk domain contract changing;
- adapter implementation can change without connection config migration;
- config schema can require migration while provider API remains the same.

Existing connections are never silently interpreted under an incompatible config schema.

Provider upgrade sequence:
- new adapter/provider-version support;
- compatibility/eval/integration tests;
- canary/test connections;
- migrate compatible connection configs;
- rollout;
- retire old provider API path according to provider sunset and Admonk evidence.

---

## 15. RouteProfiles / ModelBindings / AgentProfiles

Use stable key + immutable revision.

Example:
`deep.marketing_diagnosis@rev13`

Every execution records the exact revision used.

### ModelBinding
Changing:
- provider;
- model deployment;
- tool mode;
- relevant inference policy

creates a new binding revision.

A binding may be promoted as the active default after RQ-16 evaluation, but old task/audit records continue referencing the historical revision.

Do not silently mutate an old revision.

### AgentProfile
New version applies to new Agent Instances by default.

An already-running Agent Instance does not silently switch profiles mid-execution.

---

## 16. Durable Task definitions

Every Durable Task instance pins:
- task-definition key;
- task-definition revision;
- relevant capability/action contract versions.

New task definitions apply to new tasks.

A running/waiting task:
- resumes under its pinned compatible definition;
- or uses an explicit task migrator;
- or enters REQUIRES_INTERVENTION if safe migration is impossible.

Do not resume a months-old waiting task under whatever current code happens to exist.

This is a hard RQ-14 compatibility requirement.

---

## 17. Governed actions / approvals

Prepared Action and approval receipt bind to:
- action/capability contract version;
- target;
- material parameters;
- relevant state/preconditions.

If an incompatible action contract/provider change occurs before execution:
- invalidate or re-preflight the Prepared Action;
- require new approval when material meaning/impact changed.

A version migration cannot transform an old approval into permission for a materially different action.

---

## 18. Artifacts

RQ-22 remains authoritative:

- Artifact ID is stable.
- Revision identity is immutable.
- Artifact revision is not SemVer.

Record artifact schema/type version separately.

Storage/schema migration may update the representation needed to read an artifact, but must not silently rewrite the historical semantic content of an immutable revision.

If current source data is recomputed:
- create a new artifact revision/result;
- do not modify the historical artifact to look current.

---

## 19. Resource Links

A Resource Link should remain stable across compatible product releases.

Track:
- resource type/key;
- resource ID;
- product/domain;
- optional link/route schema version.

If navigation shape changes:
- resolver/redirect maintains compatible old links where practical;
- do not invalidate audit/notification/artifact links merely because UI routes changed.

Breaking resource-identity changes require explicit migration/aliasing strategy.

---

## 20. Workspace / UI schemas

Dynamic Jarvis workspace specs are declarative contracts.

Track:
- workspace-spec schema major;
- primitive catalog/component contract version.

Renderer declares supported versions.

Additive primitives/fields may evolve compatibly.

Breaking interpretation change requires:
- new schema/primitive major;
- translation or dual support during migration;
- cached workspace plans invalidated or migrated.

Never reuse a cached plan whose schema is unsupported even if its task intent still matches.

---

## 21. Telemetry schemas

Follow OpenTelemetry-compatible semantics where adopted.

Telemetry producer records:
- semantic-convention/schema version where relevant;
- service/runtime release.

Stable dashboards/alerts/Control Room queries must not be broken casually.

For a material telemetry schema change:
- dual emit / compatibility translation where practical;
- migrate dashboards/alerts/queries;
- verify;
- stop old fields.

Telemetry schema migration is not the same as business data migration.

---

# PART C — COMPATIBILITY MANAGEMENT

## 22. Compatibility declaration

Every stable shared contract should define:

```text
contract_key
contract_kind
current_version
stability
owner

producer:
  current_release
  versions_provided

consumer:
  consumer_id
  versions_accepted
  max_tested_version
  compatibility_status
  last_verified_at

deprecation:
  replacement?
  announced_at?
  sunset_at/review_at?
  usage_remaining?

migration_ref?
```

This may begin as repository metadata/CI artifacts.

**M2-19 does not require a centralized Compatibility Service.**

Control Room may later ingest the same metadata.

---

## 23. Supported version skew

There is no universal “N-1” rule.

Each stable contract declares and tests its supported range.

Examples:

```text
Marketing capability API
producer: v2
supports consumers: v1 + v2

Workspace schema renderer
supports: schema v1 + v2

shared package
consumer constraint: >=2.3.0 <3.0.0
```

A rollout is blocked when the planned producer/consumer combination falls outside a tested supported range.

This is directly inspired by Kubernetes' explicit skew-policy discipline, without copying its numeric limits.

---

## 24. Compatibility test levels

Use the cheapest reliable evidence:

### C0 — Schema/static compatibility
Examples:
- OpenAPI diff;
- generated schema check;
- package API diff;
- event-schema compatibility.

### C1 — Producer contract tests
Does current producer still satisfy the supported contract?

### C2 — Consumer contract/integration tests
Can the actual consumer still operate against the producer/version?

### C3 — Migration tests
Can old state/data/config migrate safely?

### C4 — Staging/canary verification
Does the supported combination work in the real runtime path?

### C5 — Production evidence
Errors, old-version usage, migration progress, tenant health.

Not every package needs C5 before release.
Depth follows risk and contract impact.

M2-19 does not lock a specific contract-testing vendor.

---

## 25. Deprecation contract

Deprecation is explicit metadata, not documentation prose alone.

A deprecation includes:
- deprecated contract/field/definition;
- replacement;
- owner;
- deprecation date;
- planned sunset or review date;
- affected consumers;
- migration instructions/reference;
- current usage;
- support policy;
- reason.

Rules:
- new consumers should not adopt deprecated contracts;
- stable deprecation normally precedes retirement;
- exact support period is risk/consumer-specific;
- external/customer contracts may need longer windows than internal controlled consumers;
- critical security/reliability fixes may require exceptional accelerated change.

No universal 180-day/24-month policy is locked.

---

## 26. Retirement gate

Old contract/version may retire only when:

1. replacement is stable enough for intended consumers;
2. required consumers have migrated or are explicitly no longer supported;
3. compatibility/migration tests pass;
4. Production usage evidence shows no required old consumer remains;
5. historical artifacts/audit/task state remain readable where required;
6. rollback/restore window or recovery requirement is satisfied;
7. deprecation communication obligation is complete;
8. owner approves retirement.

This prevents the “we think nothing uses it” failure mode.

---

# PART D — MIGRATION OPERATIONS

## 27. Migration Plan

Material migrations use a small typed plan:

```text
MigrationPlan
  migration_id
  owner
  source_contract/state
  target_contract/state

  scope
  tenants/resources affected
  risk_overlay

  strategy:
    expand/migrate/contract
    translate
    dual_read
    dual_write
    dual_emit
    backfill
    rebuild
    replace

  preconditions
  compatibility_window
  batches/rings?
  checkpoints
  rate/concurrency limits

  verification
  rollback_or_recovery_class
  rollback/recovery procedure

  status
  started_at
  completed_at
```

Do not require this full artifact for trivial compatible package updates.

Product Supervisor proportionality remains authoritative.

---

## 28. Zero/low-downtime direction

For Production shared contracts/data:
- prefer overlapping compatible releases;
- prefer expand/migrate/contract;
- prefer tenant/batch/ring rollout;
- avoid maintenance windows when practical.

Azure notes modern SaaS updates should be designed toward zero-downtime and that operators must know which version each tenant uses.

M2-19 therefore requires **migration-safe architecture**, not literal zero downtime for every future operation.

---

## 29. Tenant/stamp rollout

When tenants/stamps temporarily run different releases:

track:
- current release;
- contract versions;
- migration eligibility;
- migration state;
- flags relevant to migration;
- last health verification;
- target release.

Rules:
- version divergence is temporary and intentional;
- tenants cannot stay indefinitely on arbitrary old versions unless a commercial/regulatory contract explicitly requires it;
- security hotfix policy may override ordinary rollout timing.

This metadata later feeds Control Room.

---

## 30. Feature flags are rollout tools, not contract versions

Feature flags may:
- hide/show compatible functionality;
- canary behavior;
- control migration phases.

Feature flags must not:
- replace explicit API/schema compatibility;
- create permanent tenant-specific forks;
- hide an unsupported old contract indefinitely.

M2-06 entitlement, M2-07 settings, feature flags and contract versions remain distinct.

---

## 31. Emergency compatibility exception

Security, data-integrity or severe reliability issues may force accelerated/breaking action.

Required:
- incident/change record;
- why compatibility could not be preserved;
- affected consumers/tenants;
- containment;
- communication;
- migration/remediation;
- verification;
- follow-up regression/contract test.

Emergency exception is not permission to routinely bypass M2-19.

---

# PART E — CONTROL ROOM / PRODUCT SUPERVISOR

## 32. Product Supervisor integration

Product Supervisor owns:
- decision/gate;
- accepted risk;
- migration readiness;
- release policy.

M2-19 provides the compatibility/migration contract.

Control Room later visualizes:
- current releases;
- producer/consumer compatibility;
- deprecated contracts;
- sunset risk;
- migrations;
- version skew;
- tenant/stamp rollout;
- blocked combinations.

No second governance system.

---

## 33. Control Room version view

Future Control Room should answer:

- What version is running?
- Which contracts does it provide/consume?
- Is the combination supported?
- Which tenants/stamps are behind?
- What is deprecated?
- What will sunset next?
- Which migrations are active?
- What is blocked?
- Did an incident begin after a version/config migration?
- Can we roll back safely?

This is metadata required by M2-19, not justification to build Control Room now.

---

# PART F — WHAT M2-19 DOES NOT LOCK

## 34. Deferred implementation choices

M2-19 does not select:
- package registry;
- OpenAPI tool;
- Protobuf vs JSON events;
- schema registry vendor;
- Pact/contract-testing vendor;
- migration framework;
- database engine;
- feature-flag provider;
- release orchestration platform;
- centralized compatibility service;
- exact API version syntax;
- one global product-release numbering format.

Those belong to implementation/M2-20/product-specific decisions.

---

# PART G — RECOMMENDED LOCK

## 35. M2-19 lock statement

> **M2-19 — Contract-Centered Versioning, Explicit Compatibility & Managed Migration**
>
> Admonk versions the **contracts, schemas and immutable definitions that other components depend on**. It does not force one universal versioning scheme onto packages, APIs, events, databases, tasks, artifacts and AI definitions.
>
> Keep **release version, contract/schema version, definition revision and migration version** as separate concepts.
>
> Use the shared stability lifecycle **DEVELOPMENT → PREVIEW → STABLE → DEPRECATED → RETIRED**.
>
> Compatibility is explicit and tested with the states **COMPATIBLE, COMPATIBLE_WITH_DEPRECATION, MIGRATION_REQUIRED, BLOCKED, UNSUPPORTED**.
>
> Shared packages with stable public APIs use Semantic Versioning. Stable service/capability APIs expose a major compatibility contract; compatible changes evolve within the major, while breaking changes use a new major/parallel contract.
>
> Federated products do not require lockstep releases. Each stable shared contract declares and tests the producer/consumer version combinations it supports. There is no universal N-1 rule.
>
> Breaking shared-contract and persistent-schema changes use **Expand → Coexist → Migrate → Verify → Contract** whenever practical. Destructive removal waits until supported consumers have migrated and evidence shows the old path is no longer required.
>
> Database migration IDs are ordered history, not SemVer, and previously executed migrations are never silently rewritten.
>
> Durable Tasks pin their TaskDefinition and relevant contract revisions. Running/waiting tasks never silently resume under incompatible current definitions; use explicit migration or intervention.
>
> RouteProfiles, ModelBindings, AgentProfiles, ProactivityContracts and ScaleGates use stable keys with immutable revisions. Executions record the exact revision used.
>
> Governed actions/approval receipts bind to the action/capability contract version; incompatible changes require re-preflight and renewed approval where material meaning changes.
>
> Artifacts retain stable identity and immutable revisions; artifact schema version is separate, and storage migration never rewrites historical semantic truth.
>
> Connector compatibility tracks adapter release, provider API version, connection-config schema and Admonk domain/capability contract independently.
>
> Resource Links and workspace/telemetry schemas preserve compatibility through translation/dual support where practical instead of breaking historical links, dashboards or cached work abruptly.
>
> Deprecation is explicit metadata with replacement, owner, usage, migration path and sunset/review state. Retirement occurs only after migration/usage/compatibility evidence satisfies the retirement gate.
>
> Material migrations use a versioned Migration Plan with scope, strategy, checkpoints, verification and an honest recovery class: reversible, restore-based or forward-fix-only.
>
> Feature flags may stage migrations and rollouts but are not contract versions and must not become permanent tenant-specific compatibility forks.
>
> Product Supervisor owns release/migration governance. M2-19 supplies the compatibility model. Future Control Room consumes the metadata and evidence.
>
> The common **Versioned Definition Envelope** standardizes lifecycle/version metadata across genuinely similar typed definitions without creating a mandatory centralized Definition Service.
>
> **Admonk products may evolve independently, but no shared dependency is allowed to evolve ambiguously. Every breaking change has a compatibility boundary, a migration path, observable evidence and a planned end to the old version.**

## 36. Accepted cost

This architecture adds:
- compatibility metadata;
- contract tests;
- overlap windows;
- migration state;
- deprecation tracking.

In exchange, Admonk gains:
- independent product releases;
- safer federated repositories;
- resumable long-running work;
- controlled connector/provider upgrades;
- fewer synchronized “big bang” migrations;
- visible version state for future Control Room;
- predictable scaling/tenant migrations.

## 37. Recommendation

**LOCK M2-19 as written.**

If locked, proceed to:

> **M2-19A — Platform Operator Identity, Support Access & Environment Authority**

before M2-20 runtime packaging.

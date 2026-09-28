# Admonk Product Platform / Foundation Audit — Harvey Integration

**Date:** 2026-09-28  
**Status:** AUDIT COMPLETE — PASS WITH REQUIRED FOUNDATION REFINEMENTS / OWNER LOCK PENDING  
**Scope:** Studio Foundation v1.0.0, Product Supervisor v2.0.0, FOUNDATION-M2 M2-01..18, Product Platform Foundation, suite coordination, Harvey RQ-01..25 + architecture audit  
**Implementation authority:** None

## 1. Audit question

Does the Admonk shared Product Platform Foundation still have the correct boundaries after integrating:

- Harvey as the single adaptive intelligent experience;
- Company/Executive Operating Lens rather than a second company brain;
- Harvey Character Profiles;
- Admonk Control Room;
- SCALE-0..6 milestone-driven evolution;
- Durable Tasks, Artifacts and governed Memory;
- AI quality/latency/economics;
- stronger operator/telemetry/security requirements?

## 2. Executive verdict

> **PASS WITH REQUIRED FOUNDATION REFINEMENTS.**

The Foundation architecture remains sound.

No M2-01..18 decision needs to be discarded.

However Harvey and Control Room expose several missing or stale areas that should be resolved before Production runtime packaging:

1. explicit platform-operator identity/support-access authority;
2. version/compatibility/migration contract strong enough for independent product repos;
3. exact separation of tenant administration, platform management and platform operations;
4. clearer separation of entitlement, settings, feature flags and Harvey character preferences;
5. retirement of stale Corporate Brain/AI Suite wording;
6. clarification of M2-10 “operational memory” after RQ-14/RQ-23;
7. Product Supervisor integration with live Scale Gates;
8. runtime-role vs service/deployment distinction for M2-20.

The Foundation should therefore continue—not restart.

---

# PART A — FOUNDATION HEALTH

## 3. M2-01 Federated repositories — PASS

Independent product repositories remain the correct direction.

Why it still fits:
- Marketing Hub, Ask Kalam and the shared platform have different lifecycles;
- shared contracts are now more important, not less;
- Harvey crosses products through contracts rather than by merging codebases;
- RQ-25 deliberately leaves physical runtime packaging open.

Do not move to a monorepo merely because Harvey spans products.

### New requirement for M2-19

Federated repos require:
- explicit shared-contract versions;
- compatibility windows;
- consumer/provider contract tests;
- migration/deprecation state;
- release visibility in Control Room.

Independent repositories must not imply uncoordinated compatibility.

---

## 4. M2-02 Tenant boundary — PASS

Tenant remains the hard customer/security/commercial boundary.

This aligns with current AWS SaaS guidance, which treats cross-tenant access as a foundational risk and emphasizes that authentication alone is not sufficient isolation.

Sources:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/tenant-isolation.html
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/isolation-mindset.html

Harvey never changes tenant.

Company/Executive Lens expands eligible domains only within current authorization.

### New gap

Platform operators are not ordinary tenant members.

See F-01.

---

## 5. M2-03..05 account/membership/authorization — PASS WITH OPERATOR EXTENSION

The user + membership model is correct for customers.

The capability-based authorization model is correct for:
- tenant admins;
- organizational scopes;
- products;
- users;
- Harvey agents.

But Admonk Control Room introduces a vendor/operator case that is semantically different.

Do not solve that case by:
- inserting Admonk staff into every tenant;
- inventing a universal “super_admin” tenant role;
- letting Platform Operator Lens grant access.

See F-01.

---

## 6. M2-06 entitlements — PASS

Atomic SKU ON/OFF remains correct.

Harvey Company Intelligence should replace legacy “Corporate Brain” wording but remains the same commercial concept:
- cross-product add-on/capability;
- expands eligible Harvey capability set;
- does not create another runtime identity.

Harvey Character Profiles are **not entitlements by default**.

If future premium characters/voices are monetized, entitlement may control availability, but selection itself remains a preference.

---

## 7. M2-07 settings hierarchy — PASS

The current hierarchy remains useful:

Platform → Tenant → Organizational Scope → Product → User/Product.

Harvey Character selection fits naturally as a User/Product preference.

Candidate character-setting rules:
- platform defines valid profiles;
- tenant may set a default;
- tenant may restrict profiles only when legitimate;
- user normally selects preferred profile;
- session may temporarily override;
- safety/context tone rules remain non-relaxable.

No new character settings service is justified.

---

## 8. M2-08 Setup & Health — PASS

Setup & Health remains customer/tenant-facing configuration health.

It is **not** Control Room.

Correct relationship:

```text
Admonk One / Setup & Health
Tenant-facing
- setup
- connection status
- product readiness
- tenant-required actions

Admonk Control Room
Platform-operator-facing
- platform incidents
- traces
- AI quality
- releases
- worker/queue state
- scale gates
- security
- governed operational interventions
```

A safe tenant-scoped subset may be surfaced in Setup & Health.

---

## 9. M2-09 integrations — PASS

Connect once/sync once where compatible remains correct.

Admonk-owned provider connectors remain canonical.

Harvey:
- consumes governed domain capabilities;
- never receives raw secrets;
- does not reconnect providers simply because a new character/lens is selected.

Connector Runtime is a logical runtime role whose physical packaging remains M2-20.

---

## 10. M2-10 Context Plane — PASS WITH TERMINOLOGY REFINEMENT

The federated Context Plane remains correct.

However the old phrase **operational memory** is now ambiguous.

After RQ-14/RQ-22/RQ-23, distinguish:

- canonical operational data — domain-owned;
- Durable Task state — RQ-14;
- Artifacts — RQ-22;
- user/personal memory — RQ-23;
- approved company knowledge — governed knowledge;
- derived indexes/caches — non-authoritative;
- ephemeral Context Packet — RQ-10.

### Refinement

Legacy M2-10 “operational memory” must not mean a generic store of mutable business truth.

Future docs should replace it with the exact state class intended.

---

## 11. M2-11 Agent Authority — PASS

This remains the single action/authority vocabulary.

Do not create:
- character permissions;
- Harvey-specific permissions;
- Control Room AI permissions;
- voice permissions.

All use the same action classes and intersection-based envelope.

Platform operators need a distinct authority source, but final action evaluation still uses M2-11/RQ-07.

---

## 12. M2-12 Audit / Provenance / Events — PASS

The restored M2-12 detail is now correctly aligned with the Harvey audit.

Keep separate:
- audit;
- provenance;
- domain events;
- Durable Task events;
- notifications;
- telemetry;
- usage/economic records.

Use correlation, not semantic collapse.

---

## 13. M2-13 Notification Plane — PASS

User/product notifications remain separate from operational incident paging.

Control Room/operator alerting requires an operations alert channel that does not depend entirely on tenant-facing notification infrastructure.

This is a reliability boundary, not a new user notification architecture.

---

## 14. M2-14 economics — PASS

Raw usage + Admonk Credits remains correct.

Harvey characters do not imply different intelligence pricing.

If voice/avatar providers have different real costs:
- raw ledger records actual provider cost;
- commercial credit conversion may account for that through the versioned rate card;
- character choice still does not change reasoning quality/authority.

Control Room should expose:
- raw cost;
- credit impact;
- cost per successful outcome;
- retry/failure waste.

---

## 15. M2-15 navigation/resource links — PASS

Stable Resource Link is increasingly important:
- Harvey S0/S1 → S2 specialist dashboard;
- notifications;
- approvals;
- artifacts;
- Control Room issue/task links.

Control Room links must never grant tenant/resource access.

---

## 16. M2-16 theme inheritance — PASS WITH HARVEY CHARACTER EXTENSION

Do not put Harvey character semantics inside tenant theme tokens.

Separate:

### Theme
- brand color;
- typography;
- product identity;
- safe tenant visual overlay.

### Harvey Character Profile
- voice identity;
- avatar/character binding;
- Professional/Friendly style;
- presentation behavior.

A Character Profile may consume approved design tokens, but it is not itself a theme.

---

## 17. M2-17 locale/time — PASS

Harvey character localization strengthens this decision.

Professional/Friendly needs locale-aware expression.

English, MSA, Egyptian Arabic and code-switching should not be literal prompt translations.

Character remains the same while localized wording/prosody adapts.

---

## 18. M2-18 data governance — PASS

M2-18 already accommodates:
- AI-derived context;
- indexes;
- traces;
- memory;
- artifacts.

Control Room adds a strong implementation requirement:
- telemetry and incident evidence must participate in sensitivity, retention, export/delete and access policy;
- raw content capture should be metadata-first and policy-controlled.

---

# PART B — NEW FOUNDATION FINDINGS

## F-01 — Add a Platform Operator Access & Support Delegation decision

**Severity:** CRITICAL  
**Required before:** Production Control Room / M2-20 finalization

Current customer identity/RBAC answers:
- who belongs to a tenant;
- where they operate;
- which product capabilities they have.

It does not fully answer:
- how Admonk platform staff investigate cross-tenant health;
- how support access to one tenant is granted;
- how emergency platform operations work;
- how operator access differs by environment.

### Required model

Platform operator is a vendor/platform authorization domain, not a tenant role.

Candidate concepts:
- `platform_operator_role`;
- operator capability bundle;
- environment scope;
- allowed tenant metadata visibility;
- support-access grant;
- purpose/reason;
- tenant/resource scope;
- start/expiry;
- approver where required;
- break-glass elevation;
- audit record;
- content-access ceiling;
- re-authentication requirement for elevated actions.

### Support-access rule

Default platform health visibility may include operational metadata without raw tenant business content.

When content-level access is necessary:
- grant explicitly;
- scope narrowly;
- record purpose;
- time-limit where appropriate;
- audit every use;
- revoke automatically/manual.

### Recommended sequence

Insert a new Foundation decision after M2-19 and before M2-20:

> **M2-19A — Platform Operator Identity, Support Access & Environment Authority**

Do not overload M2-04 tenant role semantics.

---

## F-02 — M2-19 must become a real compatibility system, not only version numbers

**Severity:** HIGH

The product family has:
- federated repositories;
- shared contracts/packages;
- independent products;
- connectors;
- Resource Links;
- RouteProfiles/model bindings;
- Task Definitions;
- Agent Profiles;
- Proactivity Contracts;
- Artifact schemas;
- Harvey Character Profiles;
- ScaleGates;
- telemetry schemas.

M2-19 needs common version/compatibility mechanics.

### Required concepts

**Versioned Definition Envelope**
- stable identifier;
- definition type;
- version;
- owner;
- status;
- effective period;
- compatibility range;
- supersedes;
- migration requirement;
- audit/change reference.

Each definition keeps its own payload.

### Compatibility states

Candidate:
- COMPATIBLE
- COMPATIBLE_WITH_DEPRECATION
- MIGRATION_REQUIRED
- BLOCKED
- UNSUPPORTED

### Migration state

Candidate:
- NOT_REQUIRED
- PLANNED
- READY
- IN_PROGRESS
- VERIFYING
- COMPLETE
- ROLLED_BACK
- FAILED / INTERVENTION

### Contract change rule

Prefer backward-compatible change.

Breaking contract change requires:
- explicit major/version boundary or new contract;
- overlap window where needed;
- consumer migration;
- compatibility tests;
- deprecation plan;
- telemetry showing remaining consumers;
- rollback/restore path.

Current SemVer formalizes major/minor/patch meaning around incompatible/compatible public API changes. Google Cloud API guidance similarly recommends minor version changes for backward-compatible updates and separate major versions for breaking changes.

Sources:
- https://semver.org/
- https://docs.cloud.google.com/endpoints/docs/openapi/versioning-an-api

Admonk does not have to use SemVer for every stored object, but it should use the same compatibility principle.

---

## F-03 — Version skew must be intentional

**Severity:** HIGH

Federated products will sometimes run different compatible versions during rollout.

Do not assume:
> every repository/package/runtime updates atomically.

M2-19 should define:
- supported producer/consumer version skew;
- minimum compatible contract version;
- migration deadline;
- rollback compatibility;
- old-client behavior.

Kubernetes' explicit version-skew policies illustrate the value of defining supported ranges and upgrade order rather than assuming perfect simultaneity.

Source:
- https://kubernetes.io/releases/version-skew-policy/

Control Room should show incompatible/skewed components.

---

## F-04 — Feature flags, entitlements, settings and characters must remain four different things

**Severity:** HIGH

### Entitlement
Commercially/functionally available?
Example:
Marketing Hub SKU enabled.

### Permission
May this actor use it?
Example:
may publish campaign.

### Setting
How should enabled functionality behave?
Example:
default timezone.

### Feature flag / release gate
Should this code path be active for rollout/testing?
Example:
new workspace planner enabled for Ring 1.

### Harvey Character preference
How should Harvey present itself?
Example:
Female Friendly.

Do not use feature flags as permanent customer-specific product forks.

AWS SaaS Lens supports flags for controlled tenant variation but warns that a maze of tenant-specific flags becomes unmanageable.

Source:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/operate.html

OpenFeature remains a useful provider-neutral evaluation contract; backend remains open.

---

## F-05 — Product Supervisor and ScaleGate should integrate, not duplicate

**Severity:** MEDIUM-HIGH

Product Supervisor already has:
- PS-7 Scale by Evidence;
- Technical Debt & Scale Register;
- current load;
- next scale trigger.

RQ-25 adds ScaleGate.

Do not create two scaling governance systems.

### Resolution

Product Supervisor remains governance authority.

A ScaleGate is the structured/machine-readable operational form of a PS-7 structural scaling decision.

```text
Product Supervisor
defines:
- lifecycle/gate
- evidence requirement
- approval

Production Scaling Plan
stores:
- stage
- trigger
- migration/rollback plan

Control Room
renders:
- live evidence
- readiness
- decision state
```

One governance chain.

---

## F-06 — Control Room must not become a second Product Supervisor

**Severity:** MEDIUM-HIGH

Product Supervisor:
- lifecycle;
- quality gates;
- architecture discipline;
- release readiness;
- scale policy.

Control Room:
- current operational truth;
- issue evidence;
- runtime/quality state;
- runbook actions;
- scale evidence visualization.

Control Room may display Product Supervisor gate state but must not invent its own competing lifecycle.

---

## F-07 — M2-20 should decide runtime packaging, not architecture semantics

**Severity:** HIGH

Harvey/RQ-25 now gives logical runtime roles:
- Platform Management;
- Interactive;
- Durable Task orchestration;
- Async workers;
- Connector;
- voice;
- sandbox;
- notification;
- observability/evaluation.

M2-20 should answer for each:
- module/package?
- same deployable but independent worker?
- separate process?
- shared runtime service?
- domain-owned service?

Decision factors:
- independent scale;
- security boundary;
- credential boundary;
- reliability/failure domain;
- state ownership;
- release lifecycle;
- network/transport requirement;
- operational cost.

Do not turn the six logical Harvey layers or runtime roles into one-service-per-box architecture.

---

## F-08 — Product Platform “open questions” need reclassification

**Severity:** MEDIUM

The Product Platform Foundation currently lists several “open” questions whose **semantics are already locked** but implementation remains open.

Examples:
- tenant isolation model — semantic boundary locked; physical strategy open;
- connector credential service — ownership/secret boundary locked; implementation open;
- shared notification delivery — semantics locked; runtime/provider open;
- operational observability — Control Room direction locked; backend packaging open.

### Resolution

Reclassify open questions into:

1. **semantic/architecture decision open**;
2. **runtime packaging open**;
3. **vendor/implementation open**;
4. **product-specific policy open**.

This prevents future agents from accidentally re-researching locked semantics.

---

## F-09 — “Admonk AI Suite” is becoming legacy terminology

**Severity:** MEDIUM — naming/positioning debt

The system is no longer conceptually:
> a set of AI assistants.

It is:
> a composable software product family using AI deliberately, with Harvey as the intelligent experience layer.

The current `Admonk AI Suite` filename/manifest may remain for compatibility, but the product-family audit should decide whether the forward name becomes:
- Admonk Product Suite;
- another owner-selected product-family name;
- or retains AI Suite intentionally.

Do not rename automatically in this audit.

Harvey itself is now canonical.

---

## F-10 — AGENTS.md business positioning is not an architecture contradiction, but needs a scope note

**Severity:** MEDIUM

AGENTS.md correctly says Admonk's market positioning is a Web Experience Studio and should not casually reposition itself as a generic software company.

The same repository now also governs Admonk-owned software/product work.

These can coexist.

### Clarification needed

Add:
> The external brand-positioning rule does not prohibit Admonk from designing/building owned software products or reusable product platforms under Product Supervisor. It controls how the studio is positioned publicly, not which internal/product capabilities may exist.

This avoids future agents treating product-platform work as off-brand/invalid.

---

## F-11 — Harvey Characters belong to presentation configuration, not model architecture

**Severity:** MEDIUM

No:
- one model per character;
- one memory per character;
- one agent profile per character;
- one permission set per character.

Use:
- shared Harvey core;
- versioned Character Profile;
- voice/avatar binding;
- style overlay;
- situational tone.

Character Profile may reuse M2-19 version envelope and M2-07 user/product preference.

If voice providers differ, RQ-16/17/18 evaluate quality/latency/cost per binding.

---

## F-12 — Legacy Corporate AI Assistant repository needs an explicit disposition gate

**Severity:** MEDIUM-HIGH

Current state is now documented as transition/history.

A future product-family audit should decide:
- archive entirely;
- migrate useful code/contracts into shared Harvey/platform runtime;
- retain only historical docs;
- preserve a temporary branch for migration.

Do not allow both Harvey and Corporate AI Assistant to continue active independent architecture programs.

---

## F-13 — Tenant-aware telemetry must be designed in from SCALE-1

**Severity:** HIGH

AWS SaaS Lens explicitly notes that tenant-aware operational views depend on injecting tenant/tier context into operational data from the outset; adding it later is harder.

Source:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/operate.html
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/tenant-aware-operations.html

Admonk should carry governed tenant/product/task correlation in:
- traces;
- issues;
- usage records;
- queue/task metadata;
- connector health.

Avoid raw tenant ID as unbounded metric labels; detailed IDs belong in governed traces/records.

---

## F-14 — Pooled SaaS first; targeted isolation later remains the right default

**Severity:** PASS / validation

AWS guidance distinguishes pool, silo and targeted isolation and emphasizes the efficiency of pooled infrastructure while recognizing compliance/noisy-neighbor/tier cases for targeted or full isolation.

Sources:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/pool-isolation.html
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/targeted-isolation.html
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/full-stack-isolation.html

This validates:
- SCALE-1 pooled/shared default;
- SCALE-3 fairness/resource controls;
- SCALE-4 targeted/dedicated stamps only when justified.

---

## F-15 — Single operational experience remains important even with dedicated cells

**Severity:** PASS / validation

AWS full-stack isolation guidance emphasizes that isolated tenant stacks can still behave as SaaS when onboarding, management and operations remain unified.

This supports:
- Control Room as unified operations;
- Admonk One as unified tenant administration;
- no one-off customer forks even if one tenant gets dedicated infrastructure.

Source:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/full-stack-isolation.html

---

# PART C — UPDATED FOUNDATION MAP

## 19. Four planes, one governance system

The platform becomes easier to reason about as four planes:

### 1. Tenant Experience Plane
Customer work:
- specialist products;
- Harvey S0/S1;
- dashboards;
- domain workflows.

### 2. Tenant Administration Plane
Admonk One:
- tenant setup;
- users;
- subscriptions;
- connectors;
- shared settings;
- Setup & Health.

### 3. Platform Management Plane
Underlying shared platform management:
- tenant/product registry;
- entitlements;
- settings resolution;
- connection registry;
- compatibility/migration state;
- rate cards;
- placement/ScaleGate metadata.

### 4. Platform Operations Plane
Admonk Control Room:
- incidents;
- telemetry;
- AI quality;
- task/queue health;
- connector runtime health;
- releases;
- scaling;
- security;
- governed operational intervention.

Product Supervisor governs lifecycle/gates across all four; it is not another runtime plane.

---

## 20. Harvey fits across planes without owning them

### Tenant Experience
Harvey is user-facing intelligent orchestration.

### Tenant Administration
Harvey may explain/setup-assist but does not own settings/connection truth.

### Platform Operations
Harvey Platform Operator Lens explains operational evidence and proposes governed runbooks.

### Platform Management
Harvey may query/propose but deterministic platform controls remain authoritative.

---

# PART D — RECOMMENDED M2 SEQUENCE

## 21. Revised sequence from the audit

Keep M2-01..18 locked.

Proceed:

### M2-19 — Version / Compatibility / Migration
Must define:
- Versioned Definition Envelope;
- contract compatibility;
- deprecation;
- version skew;
- migration lifecycle;
- release/ring compatibility metadata;
- compatibility evidence/tests;
- rollback compatibility.

### M2-19A — Platform Operator Identity, Support Access & Environment Authority
New required decision from Control Room/security audit.

Must define:
- platform operator identity/roles;
- environment authority;
- cross-tenant health visibility;
- support-access grants;
- content-access escalation;
- reason/time/approval;
- break-glass;
- audit;
- revocation.

### M2-20 — Runtime Boundaries
Decide physical packaging of logical roles using evidence/constraints.

Do not select technology first.

### M2 exit reconciliation
Before FOUNDATION-M2 lock:
- reclassify remaining open questions;
- update suite terminology;
- decide legacy Corporate AI repo disposition path;
- ensure Control Room/Harvey contracts map to Foundation;
- validate against Ask Kalam + Marketing Hub + Harvey Lab requirements.

---

# PART E — RECOMMENDED DOCUMENT RECONCILIATION AFTER AUDIT LOCK

## 22. Safe fixes

After owner lock:

1. update `docs/PRODUCT-PLATFORM-FOUNDATION.md` open-question classification;
2. add AGENTS.md owned-product scope clarification;
3. clarify M2-10 operational-memory terminology;
4. integrate Harvey Character Profile into M2-07/M2-16 documentation;
5. integrate ScaleGate into Product Supervisor PS-7 rather than creating parallel governance;
6. mark AI Suite as legacy coordination terminology pending final family-name choice;
7. keep legacy Corporate AI repository frozen as transition/history;
8. update handover/current status to M2-19 as next research gate.

---

# PART F — RECOMMENDED LOCK

## 23. Audit lock

> **Admonk Product Platform/Foundation Audit — PASS WITH REQUIRED FOUNDATION REFINEMENTS**
>
> Studio Foundation v1.0.0, Product Supervisor v2.0.0 and M2-01 through M2-18 remain valid.
>
> Harvey integrates cleanly into the Product Platform Foundation and does not require a second company-brain architecture, separate permission model, separate memory system or separate product truth store.
>
> Add one new Foundation decision before runtime packaging: **M2-19A Platform Operator Identity, Support Access & Environment Authority**.
>
> Complete M2-19 as a real version/compatibility/migration system supporting federated repositories, shared contracts, typed definitions, controlled version skew, deprecation and migration evidence.
>
> Keep entitlement, permission, settings, feature flags and Harvey Character preferences as distinct mechanisms.
>
> Treat Harvey Character Profiles as presentation configuration over the same Harvey core, integrating through M2-07/M2-16 rather than new AI architecture.
>
> Product Supervisor remains governance authority; ScaleGate is the structured/live PS-7 scaling mechanism, not a second governance system.
>
> Control Room is the Platform Operations Plane; Admonk One is the Tenant Administration Plane; shared platform state/APIs are the Platform Management Plane.
>
> M2-20 decides physical runtime/service packaging. RQ-25 runtime roles are isolation/scaling roles, not mandatory microservices.
>
> Tenant-aware operational context is instrumented from SCALE-1.
>
> Pooled shared SaaS remains the default; targeted/dedicated isolation appears only through evidence-driven SCALE-3/SCALE-4 promotion.
>
> Independent repositories may evolve independently only within explicit compatibility contracts and supported version-skew/migration rules.
>
> Legacy “Corporate AI Assistant / Corporate Brain” becomes transition/history terminology. Harvey Company Intelligence is the current architecture.
>
> “Admonk AI Suite” is now a naming-debt item for the later product-family audit; do not rename it automatically without an owner naming decision.
>
> **Audit verdict: the Foundation is sound. Complete compatibility, operator authority and runtime-boundary decisions; do not restart the platform architecture.**

## 24. Recommendation

**LOCK THIS FOUNDATION AUDIT.**

After lock:
1. apply the safe documentation refinements;
2. resume the official M2 sequence at M2-19;
3. lock M2-19;
4. resolve M2-19A;
5. resolve M2-20;
6. run final M2 exit reconciliation;
7. create the Control Room Product Requirements;
8. decide Harvey Lab implementation authorization.

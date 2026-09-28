# Full Jarvis Architecture Audit — 2026-09-28

**Status:** AUDIT COMPLETE — PASS WITH REQUIRED REMEDIATIONS / OWNER LOCK PENDING  
**Scope:** Jarvis RQ-01 through RQ-25 + relevant FOUNDATION-M2/Product Platform/Suite coordination decisions  
**Implementation authority:** None  
**Next decision if accepted:** documentation reconciliation + feed findings into M2-19/M2-20 + Control Room Product Requirements

---

## 1. Audit purpose

This audit treats RQ-01 through RQ-25 as **one architecture**, not 25 independent decisions.

The audit tests for:
- direct contradictions;
- stale terminology from earlier decisions;
- duplicated concepts/authorities;
- missing ownership/security boundaries;
- unnecessary complexity;
- hidden vendor/runtime assumptions;
- scale-plan inconsistency;
- Control Room overlap with existing platform capabilities;
- implementation decisions accidentally locked before FOUNDATION-M2 M2-19/M2-20.

The audit does **not** reopen a locked decision merely because later decisions use richer terminology.

---

## 2. Executive verdict

> **PASS WITH REQUIRED REMEDIATIONS.**

The architecture is structurally coherent.

No fundamental Jarvis decision needs to be reversed.

The strongest architecture threads remain consistent end-to-end:

1. **Jarvis owns experience/orchestration, not authority or domain truth.**
2. **Deterministic governance surrounds model reasoning.**
3. **Context is federated/JIT rather than one giant brain database.**
4. **Long work belongs to durable Admonk tasks.**
5. **Business outputs become explicit artifacts/domain resources rather than chat history.**
6. **Memory is separate from domain truth and company knowledge.**
7. **Quality, latency and economics are measured together.**
8. **Scale follows evidence and failure domains rather than microservice ideology.**
9. **The Control Room adds an operator experience over observability/control; it does not replace specialist telemetry systems.**
10. **The Lab remains an evidence instrument rather than preselected Production architecture.**

The audit found **no reason to reopen RQ-01 through RQ-25**.

It did find:
- 3 material cross-version documentation contradictions;
- 5 architecture-boundary clarifications required before M2-20;
- 7 simplifications/anti-overengineering rules;
- 4 Control Room security/operations requirements that should be elevated to hard constraints.

---

# PART A — WHAT SURVIVES UNCHANGED

## 3. Jarvis identity and responsibility — PASS

The RQ-01 responsibility boundary is reinforced, not weakened, by later RQs.

Canonical:
- Jarvis owns user interaction, intent, adaptive surface routing, context-plan orchestration, task orchestration, workspace composition and action proposal;
- specialist products own domain semantics/data/workflows;
- shared platform owns genuinely shared governance/identity/integration primitives;
- models/agents/runtimes remain replaceable.

No corrective architecture action required.

---

## 4. Intelligence / authority separation — PASS

RQ-03 + RQ-07 + RQ-12 + RQ-20 form a coherent stack:

```text
How much intelligence?
        │
        ↓
C0 / C1D / C1G / C2 / C3
        │
        │ independent from
        ▼
What authority is allowed?
        │
        ↓
M2-11 action classes + permission/policy/approval
```

Later security decisions correctly keep final authority outside the model.

Only terminology migration debt exists; see F-03.

---

## 5. Context / knowledge / memory — PASS

RQ-10 + RQ-22 + RQ-23 correctly avoid one undifferentiated “brain store”.

```text
Canonical domain truth
Governed company knowledge
Artifacts
Durable tasks
Personal memory
Ephemeral evidence
```

remain distinct.

The Context Plane assembles eligible sources; it does not become their owner.

No architecture reversal required.

---

## 6. Durable work / artifacts — PASS

RQ-14 and RQ-22 are complementary:

- Durable Task = execution/resumption state.
- Artifact = durable work product.
- Domain Object = authoritative business state.

Task histories reference artifacts rather than swallowing large content.

No duplication found.

---

## 7. Dynamic UI / dashboard hierarchy — PASS

S0 Conversation → S1 Dynamic Workspace → S2 Specialist Dashboard is internally consistent.

RQ-06’s declarative component constraint also strengthens RQ-20 security.

The persistent side-panel hypothesis fits the model without creating another surface class.

No change required.

---

## 8. Proactivity / notification — PASS WITH BOUNDARY NOTE

RQ-21’s proactive intelligence remains separate from M2-13 notification delivery.

Correct hierarchy:

```text
Signal
→ Proactive Candidate
→ Attention Decision
→ notification meaning/class
→ delivery mechanism
```

A Proactivity Contract is **not** a workflow engine and does not grant action authority.

If a proactive trigger is permitted to execute a business action, it references an already-governed workflow/capability under RQ-07/M2-11.

This boundary should be made explicit in future contract docs.

---

## 9. Scaling roadmap — PASS

RQ-19 and RQ-25 are aligned:
- evidence-driven;
- pressure/failure-domain driven;
- no arbitrary user/tenant counts;
- progressive isolation;
- deployment stamps/cells only after measured need;
- regional/global complexity deferred.

External validation remains strong:
- Azure deployment stamps explicitly fit natural scale limits, tenant separation, version separation, geography and blast-radius reduction;
- AWS SaaS Lens reinforces tenant-aware operations/cost/load visibility;
- Google SRE reinforces SLO/error-budget and saturation-based decisions.

No scale stage needs removal.

---

# PART B — MATERIAL FINDINGS

## F-01 — Legacy “Corporate AI Assistant / Company Brain” identity conflicts with One-Jarvis architecture

**Severity:** HIGH — conceptual/documentation contradiction  
**Type:** terminology / product-family authority

Current suite/Foundation documents still say:
- “Corporate AI Assistant”
- “company brain”
- “Corporate Brain”

RQ-01/RQ-11 later lock:
- one Jarvis identity/core architecture;
- Department vs Executive/Company behavior via Operating Lens;
- company intelligence is cross-domain capability/context, not a second brain;
- adding products expands Jarvis governed capability set rather than creating another assistant identity.

### Risk

A future implementation team could incorrectly build:
- separate Corporate AI runtime;
- separate memory/context store;
- duplicate orchestration;
- duplicate agent identity;
- duplicate company knowledge layer.

### Audit resolution

Do **not** delete commercial/product history.

Create one canonical compatibility mapping:

```text
Legacy term:
Corporate AI Assistant / Corporate Brain

Current architecture meaning:
Company Intelligence / cross-domain Jarvis capability
enabled through subscribed SKU/add-on + authorized Operating Lens

Not:
a second Jarvis brain/runtime/identity/source of truth
```

The separate `corporate-ai-assistant` repository remains legacy/product-transition material until the planned product-family audit decides its code/repository disposition.

### Action

Documentation reconciliation required after owner locks this audit.

---

## F-02 — RQ-01 contains superseded n8n execution examples

**Severity:** HIGH — direct contradiction with owner architecture correction  
**Type:** stale implementation example

RQ-01 still contains examples such as:
- capability may use n8n today;
- “run n8n workflow …”;
- replace n8n through execution adapter.

The owner later explicitly locked:

> n8n is not part of the Admonk Product architecture.

RQ-08/RQ-24/RQ-25 now require:
- Admonk-owned capability adapters;
- Admonk-owned provider connectors;
- Lab sandbox/test adapters.

### Audit resolution

The **replaceable execution-adapter principle remains valid**.

Only the n8n-specific implementation example is superseded.

Replace/annotate with:
```text
governed capability
→ replaceable Admonk execution/runtime adapter
→ Admonk connector/provider API
```

Kalam n8n remains historical workflow evidence only.

---

## F-03 — RQ-03 and RQ-04 retain retired A0/A1/A2/A3 authority shorthand

**Severity:** HIGH — implementation terminology conflict  
**Type:** version migration

RQ-03/RQ-04 use:
- A0
- A1
- A2
- A3

RQ-07/M2-11 later establish the canonical classes:
- READ
- DRAFT
- PROPOSE
- EXECUTE_REVERSIBLE
- EXECUTE_CONSEQUENTIAL
- DESTRUCTIVE

### Risk

Two authorization vocabularies may enter code, evals and UI.

### Audit resolution

There is **one authority model only**: M2-11.

RQ-03’s important concept remains:
> intelligence depth and authority are orthogonal.

Add a supersession annotation to RQ-03/RQ-04 and migrate examples/eval labels to M2-11 classes.

Do not build an A0–A3 compatibility layer into Production.

---

## F-04 — RQ-25’s “deployables” cross the M2-20 decision boundary

**Severity:** HIGH — architecture sequencing  
**Type:** runtime topology

RQ-25 defines SCALE-1:
- Shared Control Runtime;
- Interactive Application Runtime;
- Durable/Async Worker Runtime;
- Connector Runtime.

This is useful as a **minimum isolation/failure-domain model**.

However M2-20 is explicitly reserved for:
> shared contract vs package vs service vs domain-owned runtime boundary.

### Risk

Interpreting RQ-25 literally as “four mandatory independently deployed services” would prematurely decide M2-20 and violate M2-01’s promotion ladder.

### Audit resolution

Reinterpret RQ-25 terminology:

> These are four **Production runtime roles / isolation domains**, not necessarily four independently operated microservices.

M2-20 must decide whether each role is:
- module in same deployable;
- process/worker type in same application estate;
- separately deployed runtime;
- shared service;
- domain-owned runtime.

Hard constraints that survive:
- interactive work must be protected from background backlog;
- connector credentials/provider bursts need a bounded failure/security domain;
- control-plane management must remain operable when tenant workloads are unhealthy;
- state is durable outside disposable compute.

This resolves RQ-25 ↔ M2-20 without reopening either direction.

---

## F-05 — Control Room introduces a second “control plane” phrase that can be confused with Admonk One

**Severity:** MEDIUM-HIGH — ownership clarity  
**Type:** naming/boundary

Three concepts now exist:

1. **Admonk One** — tenant/customer-facing shared administration/integration/setup plane.
2. **Shared Platform Management Runtime** — underlying platform management/configuration state/APIs.
3. **Admonk Control Room** — internal platform-operator operations/quality/scaling experience.

Calling all three “control plane” creates ambiguity.

### Audit resolution

Use explicit architecture vocabulary:

```text
Tenant Administration Plane
= Admonk One

Platform Management Plane
= underlying shared management state/APIs

Platform Operations Plane
= Admonk Control Room
```

“Control Room” remains the product/UX name.

Do not merge their permissions or audiences.

---

## F-06 — Platform Operator Lens needs an explicit operator authorization boundary

**Severity:** CRITICAL — security  
**Type:** cross-tenant operator access

RQ-25 introduces a Platform Operator Lens.

RQ-11 correctly says:
> a lens never grants authority.

Therefore Platform Operator Lens cannot itself authorize cross-tenant access.

### Required architecture

Platform operations need an explicit **platform-operator authorization context** independent of ordinary tenant membership.

It should support:
- minimum operator capabilities;
- environment scope;
- tenant scope where content access is required;
- purpose/reason;
- time-bound elevated/support access where appropriate;
- stronger authentication/MFA policy;
- complete audit trail;
- break-glass procedure for exceptional operations;
- revocation.

### Principle

> **Global platform health visibility does not imply global business-content visibility.**

Operators may see:
- health;
- counts;
- latency;
- affected tenant IDs/names according to role;
- metadata;
- redacted trace structure

without automatically seeing:
- raw prompts;
- customer documents;
- sensitive records;
- private user memory.

Content drill-down requires separately authorized access.

This should become a hard M2-20/Control Room requirement.

---

## F-07 — Audit, provenance, domain events, task events and telemetry must stay distinct

**Severity:** HIGH — architecture complexity / correctness  
**Type:** signal taxonomy

M2-12 already locks an important principle:
> audit, provenance and telemetry stay distinct.

RQ-14/RQ-17/RQ-21/RQ-25 introduce additional event concepts.

Without an explicit taxonomy the team could create one giant event bus/table.

### Canonical signal/resource taxonomy

#### 1. Audit Record
Authoritative record of who/what attempted or changed something.

Properties:
- security/business significance;
- controlled retention;
- not sampled;
- immutable/append-oriented where appropriate.

#### 2. Provenance Record
Derivation relationship:
- source;
- artifact/revision;
- activity;
- actor/agent;
- evidence.

Not general runtime logging.

#### 3. Domain Event
Business/domain state change used for asynchronous consumers.

Owned by domain semantics.

#### 4. Durable Task Event
RQ-14 lifecycle/progress event used to reconstruct/continue a task.

Owned by Durable Task semantics.

#### 5. Notification Candidate / Delivery Event
RQ-21/M2-13 attention/delivery state.

Not the original business event.

#### 6. Operational Telemetry
Metrics, traces, logs, profiles.

May be sampled/aggregated according to policy.
Not authoritative business history.

#### 7. Usage/Economic Record
M2-14 billable/operational consumption record.

May correlate with telemetry but belongs to accounting/economics semantics.

### Rule

Correlation IDs connect these systems.
They should not be collapsed into one storage/retention model.

---

## F-08 — Environment must become a first-class safety dimension

**Severity:** HIGH — operational safety  
**Type:** Control Room / actions / observability

RQ-25 discusses Production, Lab and test adapters but does not elevate **environment** as a hard operational dimension.

### Required

Every operational resource/action where applicable carries:
- environment: lab / development / staging / production or equivalent;
- region/stamp;
- tenant where applicable.

Control Room must make environment visually unmistakable.

A Production action is bound to the exact environment in its RQ-07 Prepared Action.

Examples:
- rollback staging != rollback Production;
- reconnect test provider != reconnect Production;
- run load test Production requires different policy than Lab.

Never infer environment from UI route or hostname alone.

---

## F-09 — Telemetry content capture needs an explicit privacy policy

**Severity:** CRITICAL — privacy/security  
**Type:** observability

OpenTelemetry GenAI conventions can represent prompts/tool inputs/outputs, but current OTel documentation warns these may contain sensitive/PII data and content capture is optional.

Langfuse supports client-side/OTel masking precisely because traces may contain sensitive LLM data.

RQ-20 already says secrets should not enter logs/traces.

RQ-25 therefore needs a formal telemetry-capture policy.

### Recommended default

**Metadata-first telemetry.**

Record by default:
- model/provider;
- route;
- timing;
- token/usage;
- tool/capability names;
- source IDs/types;
- result/error classes;
- hashes/version IDs;
- task/trace correlation.

Raw content:
- OFF by default for sensitive classes;
- opt-in by environment/task/policy;
- redacted before leaving the application trust boundary where required;
- short retention where possible;
- access-controlled in Control Room;
- never include secrets/credentials.

This preserves debugging without creating a surveillance/data-leak subsystem.

External validation:
- current OpenTelemetry GenAI guidance describes prompt/output content as sensitive and optional;
- Langfuse provides application-side OTel masking so sensitive values can be removed before export.

---

## F-10 — Operator alerting should not depend on the tenant/user Notification Plane

**Severity:** MEDIUM-HIGH — reliability  
**Type:** operational alerting

M2-13 is the suite/product notification plane for users.

Platform incident paging/alerts are different:
- they must remain available during product-plane degradation;
- they may target on-call/operator systems;
- they use SLO/security/incident semantics.

### Resolution

Keep:
- **M2-13 User Notification Plane** for product/user notifications;
- **Operational Alerting** as part of observability/Control Room backend.

Control Room may correlate both.
Do not force SRE/operator paging through the same delivery pipeline tenants depend on.

---

## F-11 — Control Room v1 is directionally correct but too broad if interpreted as bespoke implementation

**Severity:** MEDIUM — complexity budget  
**Type:** scope

RQ-25 lists 8 minimum Control Room v1 capabilities.

The goal is correct.
The risk is rebuilding:
- trace viewers;
- log explorers;
- eval UIs;
- error groupers;
- product analytics.

### Audit simplification

Control Room v1 should be a **control spine**, not a telemetry suite.

Must build custom:
- unified system/resource map;
- cross-system issue correlation;
- Task X-Ray summary/correlation;
- Scaling Center;
- governed runbook actions;
- owner-friendly explanation.

May initially adapt/deep-link/embed specialist systems for:
- raw traces;
- raw logs;
- detailed eval runs;
- low-level metrics;
- error-stack analysis.

Only promote a specialist view into custom Control Room UI when repeated operator workflow proves the integration friction.

This follows M2-01’s promotion rule.

---

## F-12 — Operational Graph is a logical model, not a graph-database requirement

**Severity:** MEDIUM — hidden implementation assumption  
**Type:** simplification

RQ-25 introduces:
- Operational Graph;
- Operations Index.

### Rule

These are **logical contracts**.

SCALE-1 may implement them with:
- ordinary relational tables/views;
- configuration catalog;
- derived dependency records;
- cached topology;
- trace-derived edges.

Do not select:
- graph DB;
- Elasticsearch/search cluster;
- dedicated topology service

until scale/query evidence requires them.

---

## F-13 — Operational Issue ownership must be explicit

**Severity:** MEDIUM — source-of-truth clarity  
**Type:** Control Room

Specialist systems may identify:
- error groups;
- alerts;
- security detections;
- model-eval failures;
- provider incidents.

Control Room needs one cross-system issue concept.

### Audit resolution

```text
Raw backend alert/error/eval
        ↓
Issue Candidate / Evidence
        ↓
Admonk Operational Issue
        ↓
cross-system lifecycle / owner / impact / action / resolution
```

The **Operational Issue** becomes Admonk’s cross-system operational record.

It does not replace:
- source error groups;
- domain business tickets;
- external vendor incidents.

If a human support/engineering task is needed, the Operational Issue may link to the chosen work-management system rather than duplicating project management.

---

## F-14 — Control Room must present independent health dimensions, not one “system score”

**Severity:** MEDIUM — UX/decision quality

Do not compress:
- runtime reliability;
- AI quality;
- data freshness/quality;
- security;
- cost;
- business outcome

into one magic percentage.

A system can be:
- operationally healthy;
- AI-quality degraded;
- data stale;
- economically expensive.

Control Room should show these dimensions separately and explain the interaction.

This follows RQ-16’s rejection of one global AI quality score.

---

## F-15 — Contract proliferation can share version/governance mechanics without merging semantics

**Severity:** MEDIUM — architecture complexity

Jarvis now has multiple typed definitions:
- RouteProfile;
- Model Binding;
- Agent Profile;
- Proactivity Contract;
- Task Definition;
- Artifact Type/Schema;
- ScaleGate;
- connector/capability definitions.

This is justified semantically, but each should not invent separate version/lifecycle metadata.

### Recommended shared envelope

A lightweight **Versioned Definition Envelope** may standardize:
- stable key/ID;
- version;
- owner;
- tenant/global scope where applicable;
- status;
- effective period;
- compatibility metadata;
- created/approved by;
- supersedes;
- change/audit reference.

Each type keeps its own payload schema and behavior.

M2-19 should determine the common compatibility/versioning contract.

Do not build one mega “Definition Service” merely because metadata is shared.

---

## F-16 — M2-12 is locked but under-documented in the Operating Brief

**Severity:** LOW-MEDIUM — documentation completeness

`FOUNDATION-M2-DECISIONS.md` clearly locks M2-12:

> shared versioned event, audit and provenance envelope; domain state/event ownership preserved; audit/provenance/telemetry distinct.

However the detailed M2-12 section is not present in the current Operating Brief between M2-11 and M2-13.

### Resolution

Do not recreate/redecide M2-12.

Add a canonical cross-reference or restored concise detailed section during documentation reconciliation.

---

## F-17 — Handover contains stale pre-lock RQ-25 instructions below the new resume point

**Severity:** LOW — navigation/documentation

The checkpoint correctly says:
> FULL JARVIS ARCHITECTURE AUDIT

but still contains earlier text such as:
- “RQ-25 must …”
- “finish and lock RQ-25 …”

These are historical sequencing remnants.

### Resolution

After this audit is locked, update the checkpoint to:
- audit complete;
- remediation package accepted/pending;
- exact next gate.

---

# PART C — CONTROL ROOM HARDENING

## 10. Control Room authority boundary

The Control Room is a **Platform Operations Plane**, not a super-admin bypass.

Every control action uses:
- platform/operator identity;
- explicit environment;
- tenant/resource target;
- canonical M2-11 action class;
- RQ-07 preflight;
- approval policy;
- verification;
- Action Receipt.

No arbitrary:
- SQL;
- root shell;
- cloud console impersonation;
- credential reveal

as the normal operating model.

---

## 11. Control Room is a crown-jewel surface

Minimum security posture should include:
- strong operator authentication;
- least-privilege operator roles;
- separation of view vs control capabilities;
- environment-specific permissions;
- tenant/support-access boundaries;
- action-bound approvals for consequential platform operations;
- complete operator audit;
- sensitive trace redaction;
- session timeout/re-auth for elevated operations;
- break-glass path with explicit reason/audit.

Exact identity/MFA/vendor choices remain M2-20/implementation work.

---

## 12. Full control does not mean full content exposure

Owner requirement is preserved:

> the owner must be able to visually see and control every important system behavior.

Interpretation:

The Control Room must provide complete **operational transparency**, including:
- topology;
- health;
- causes;
- versions;
- cost;
- task state;
- quality;
- incidents;
- evidence;
- actions.

It does not imply unrestricted access to every customer content payload.

This is necessary for multi-tenant trust and RQ-20.

---

# PART D — CANONICAL ARCHITECTURE SIMPLIFICATION

## 13. Six logical layers

To reduce cognitive complexity, the 25 RQs can be understood as six logical layers.

These are **logical layers, not microservices**.

### L1 — Experience Layer

Owns:
- S0 Conversation;
- S1 Dynamic Workspace;
- S2 handoff/deep links;
- voice interaction;
- semantic motion/state;
- persistent Jarvis control channel.

Relevant:
RQ-02, 04, 05, 06.

### L2 — Jarvis Orchestration Layer

Owns:
- intent/task contract;
- cognitive route;
- Operating Lens application;
- Context Plan request;
- surface/workspace selection;
- task orchestration;
- Action Proposal;
- progressive state.

Relevant:
RQ-01, 03, 10, 11, 12.

Not authority.

### L3 — Governance / Authority Layer

Owns:
- tenant/account/membership;
- entitlements;
- scoped authorization;
- settings/policy;
- approvals;
- action classes;
- data governance;
- AI credit/budget ceilings;
- operator authority.

Relevant:
M2-02..07, M2-11, M2-14, M2-18, RQ-07, RQ-20.

Deterministic where authority is decided.

### L4 — Domain & Integration Layer

Owns:
- specialist product truth;
- domain semantics;
- provider connections;
- connector adapters;
- governed domain capabilities;
- approved company knowledge.

Relevant:
M2-09/10, RQ-08, RQ-22/23.

### L5 — Execution & Intelligence Layer

Owns implementation execution:
- Durable Task engine;
- queues/workers;
- model/provider adapters;
- bounded agents;
- realtime voice provider session;
- sandbox/computer runtime;
- artifact generation.

Relevant:
RQ-04, 12, 13, 14, 19, 25.

These components execute governed work but do not create authority.

### L6 — Operations & Improvement Layer

Owns:
- telemetry;
- issues/incidents;
- evals;
- latency;
- economics;
- scale gates;
- releases/flags;
- Control Room;
- Product Supervisor operational visualization.

Relevant:
RQ-15..21, RQ-24/25, M2-12/13/14.

This layer observes and controls the others through governed capabilities.

This six-layer map is the recommended mental model for the upcoming Foundation audit.

---

# PART E — EXTERNAL CROSS-CHECK

## 14. Tenant-aware operations

Current AWS SaaS Lens strongly supports:
- tenant as first-class operational context;
- per-tenant health/load/cost views;
- combining existing tools with custom SaaS operational experiences.

This validates Control Room without requiring Admonk to rebuild underlying observability systems.

Sources:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/operate.html
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/tenant-aware-operations.html

---

## 15. SRE symptom/cause and alerting

Google SRE reinforces:
- monitoring should answer “what is broken?” and “why?” separately;
- latency/traffic/errors/saturation;
- alerts should require human attention only for meaningful/actionable cases;
- error budgets can gate release/reliability focus.

This maps directly to:
- Issue Center;
- change correlation;
- ScaleGate evidence;
- release gates.

Sources:
- https://sre.google/sre-book/monitoring-distributed-systems/
- https://sre.google/workbook/error-budget-policy/

---

## 16. Telemetry interoperability and privacy

OpenTelemetry supports a shared semantic convention layer across:
- traces;
- metrics;
- logs;
- profiles;
- resources;
- GenAI operations.

Current GenAI conventions explicitly warn that prompt/output fields may contain sensitive/PII data.

OpenTelemetry guidance places sensitive-data handling on the implementer.

Sources:
- https://opentelemetry.io/docs/concepts/semantic-conventions/
- https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/
- https://opentelemetry.io/docs/security/handling-sensitive-data/

This supports:
- OTel-compatible telemetry;
- metadata-first capture;
- no assumption that full prompt content belongs in operational storage.

---

## 17. AI-native observability

Current Langfuse supports:
- multi-step LLM/tool/retrieval tracing;
- latency/usage/cost;
- datasets/evals/experiments;
- OpenTelemetry integration;
- application-side masking before telemetry export.

This validates using specialist AI observability under the Control Room rather than custom-building a complete AI trace/eval engine.

Sources:
- https://langfuse.com/docs/observability/overview
- https://langfuse.com/docs/observability/features/masking

---

## 18. Deployment stamps

Current Azure guidance validates stamps/cells when:
- natural scale limits appear;
- tenants require separation;
- different versions are needed;
- region placement is needed;
- blast radius must be reduced.

It also warns they are unnecessary when a simple deployment can still scale adequately.

This exactly supports SCALE-4 as an **evidence-triggered milestone**, not default infrastructure.

Source:
- https://learn.microsoft.com/en-za/azure/architecture/patterns/deployment-stamp

---

# PART F — REMEDIATION PACKAGE

## 19. R-A — Immediate documentation reconciliation after owner lock

No architecture redesign.

Apply:
1. annotate/remove n8n Production examples in RQ-01;
2. retire A0–A3 from RQ-03/RQ-04 in favor of M2-11 classes;
3. add legacy Corporate Brain/Corporate AI Assistant compatibility mapping;
4. clean stale RQ-25 sequencing from handover;
5. restore/cross-reference M2-12 detail in the Operating Brief;
6. add explicit Plane naming:
   - Tenant Administration Plane;
   - Platform Management Plane;
   - Platform Operations Plane.

These are compatibility/documentation fixes.

---

## 20. R-B — Feed into M2-19 Version / Compatibility / Migration

M2-19 should absorb:
- Versioned Definition Envelope;
- RouteProfile/model-binding compatibility;
- Agent Profile compatibility;
- connector/capability contract versions;
- task-definition version migration;
- Artifact schema/revision compatibility;
- Proactivity Contract versions;
- Resource Link compatibility;
- feature/release ring version state;
- ScaleGate version/history;
- telemetry semantic-schema version;
- migration status visible to Control Room.

Do not centralize all definitions into one runtime service merely because version metadata is shared.

---

## 21. R-C — Feed into M2-20 Runtime Boundary Decision

M2-20 must decide physical packaging for the RQ-25 runtime roles.

Explicitly compare:
- same deployable/module;
- separate worker/process;
- shared platform service;
- domain-owned service.

For:
- Platform Management;
- Interactive Jarvis/product request path;
- Durable Task orchestration;
- background AI/artifact/eval workers;
- Connector Runtime;
- Notification delivery;
- AI model runtime/router;
- Context Registry/composition;
- Artifact services;
- memory store/service if any;
- Operational Issue/ScaleGate store;
- Control Room backend.

M2-20 must preserve RQ-19 pressure boundaries without creating premature microservices.

---

## 22. R-D — Control Room Product Requirements before implementation

Create a dedicated Product Requirements/architecture brief after the wider Foundation audit.

Hard requirements from this audit:
- operator authorization/support-access model;
- explicit environment dimension;
- metadata-first telemetry privacy;
- signal taxonomy;
- Operational Issue ownership;
- custom control spine over specialist tools;
- independent health dimensions;
- governed runbooks;
- no unrestricted admin console;
- backend-adapter architecture;
- Product Supervisor + ScaleGate visualization.

---

# PART G — AUDIT DECISION

## 23. What is NOT changing

Do not reopen:
- One Jarvis / Operating Lenses;
- S0/S1/S2;
- minimum sufficient intelligence;
- Reflex candidate;
- governed Action Proposal;
- Admonk-owned connectors;
- JIT context;
- bounded agents;
- model-provider abstraction;
- Durable Tasks;
- truthful failure;
- layered evals;
- percentile latency;
- outcome-first economics;
- progressive scale;
- model-compromise-tolerant security;
- governed proactivity;
- Artifact architecture;
- governed memory;
- Jarvis Lab program;
- SCALE-0..6;
- Control Room concept.

---

## 24. Recommended audit lock

> **Full Jarvis Architecture Audit — PASS WITH REQUIRED REMEDIATIONS**
>
> RQ-01 through RQ-25 form a coherent architecture and remain locked. No core RQ requires reopening.
>
> Reconcile legacy terminology and examples so only one current architecture vocabulary exists: one Jarvis, M2-11 action classes, Admonk-owned connectors, and no n8n Production execution.
>
> Treat RQ-25’s SCALE-1 Control/Interactive/Async/Connector components as **runtime roles and isolation domains**. M2-20 decides their physical deployment/service packaging.
>
> Formalize three distinct management experiences: **Admonk One Tenant Administration Plane, underlying Platform Management Plane, and internal Admonk Control Room Platform Operations Plane**.
>
> Platform Operator Lens never grants cross-tenant authority. Control Room uses explicit least-privilege platform-operator authorization, environment scope, audited tenant/support access and governed RQ-07 actions.
>
> Full operational visibility means complete health/state/evidence transparency, not automatic access to every tenant’s raw business content.
>
> Keep **audit records, provenance, domain events, Durable Task events, notification state, operational telemetry and usage/economic records** as separate semantic classes linked by correlation IDs.
>
> Use metadata-first telemetry. Sensitive prompt/tool/document content is opt-in, governed, redacted/masked before export where required and never includes raw credentials.
>
> Make **environment** a first-class attribute/authority boundary for Control Room resources and actions.
>
> Keep Control Room v1 as a **custom control spine over specialist observability/eval/error backends**, not a rebuild of those systems.
>
> Operational Graph and Operations Index are logical models, not requirements for graph/search databases.
>
> Admonk Operational Issue is the canonical cross-system incident/issue record while raw error groups, vendor incidents and domain tickets remain in their owning systems.
>
> Show reliability, AI quality, data freshness, security, economics and business quality as separate health dimensions rather than one opaque score.
>
> Reuse a lightweight version/governance envelope across typed definitions where semantics are genuinely shared; do not create a mega configuration service.
>
> Feed version/compatibility findings into M2-19 and runtime packaging findings into M2-20 before implementation.
>
> **Audit verdict: architecture is sound; simplify the implementation boundaries, harden the operator plane, reconcile stale vocabulary, then proceed into the wider Foundation audit.**

## 25. Recommendation

**LOCK THIS AUDIT REMEDIATION PACKAGE.**

After owner lock:
1. apply documentation-only reconciliation R-A;
2. update canonical handover;
3. feed R-B into current M2-19;
4. perform the planned full Admonk Product Platform/Foundation audit using this corrected Jarvis architecture;
5. let that combined audit determine the exact order between M2-19 completion, M2-20, Control Room PRD and Jarvis Lab authorization.

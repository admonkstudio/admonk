# Jarvis RQ-25 — Production Evolution Architecture, Scaling Milestones & Visual Control System

**Date:** 2026-09-28
**Track:** Jarvis Deep Research / Admonk Product Platform Foundation
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK
**Implementation authority:** None. Architecture planning only.

## 1. Expanded question

RQ-25 now answers three connected questions:

1. What is the smallest safe Production architecture that survives RQ-01 through RQ-24?
2. What is the planned structural scaling sequence after launch, with evidence-based milestones that determine when the next architecture stage is entered?
3. What visual control system gives a non-coding owner complete operational, quality, scaling and intervention visibility?

The owner explicitly wants scale transitions to occur because a planned scaling milestone has been reached, not because the team improvises after the platform becomes painful.

The owner also requires a full visual control system, not a normal admin analytics dashboard.

## 2. Internal audit findings

The new direction is consistent with existing locked architecture.

FOUNDATION-M2 already requires:
- explicit scale paths for users, tenants, data, connectors, agents, traffic, storage, permissions, teams and operational load;
- scaling from measured/evidenced triggers rather than hypothetical future size;
- every architecture decision to identify the evidence that would justify expansion or centralization.

RQ-19 already locks:
- pressure-based scaling;
- progressive isolation;
- contract boundary != scaling unit != deployment unit;
- separate Control Plane and tenant Application/Data Plane;
- deployment stamps/cells only when evidence justifies them.

The missing element is the promotion plan: exactly how one architecture stage becomes the next.

The internal audit also found a real platform gap. The Product Platform Foundation still lists shared operational observability as an open question. Setup & Health covers tenant/product configuration health, but it does not cover:
- incident/root-cause investigation;
- AI trace/eval quality;
- scaling stage management;
- release/version control;
- queue/task control;
- platform-wide operational intervention.

Existing locks already provide most of the data the new system can consume:
- M2-08 Setup & Health;
- M2-09 connector health;
- M2-11 authorization/action receipts;
- M2-12 audit/provenance direction;
- M2-13 notification delivery health;
- M2-14 usage/cost ledgers;
- RQ-14 durable tasks;
- RQ-15 failures;
- RQ-16 evals;
- RQ-17 traces/latency;
- RQ-18 economics;
- RQ-19 scale/load;
- RQ-20 security;
- RQ-21 attention;
- RQ-22 artifacts;
- RQ-23 memory governance.

## 3. External research synthesis

AWS SaaS Lens recommends tenant-aware operational experiences and explicitly notes that robust SaaS operations often combine existing tools with custom solutions so tenant/tier health and consumption become first-class operational concepts.

Google SRE recommends monitoring both the user-visible symptom and the underlying cause, focusing on latency, traffic, errors and saturation, and using actionable SLO/error-budget alerts instead of requiring humans to stare at dashboards.

Azure architecture guidance recommends defining scale units and the limits that trigger scale, then using deployment stamps/cells for natural scale limits, tenant isolation, blast-radius reduction, regional placement and controlled version rollout.

Azure multitenant update guidance recommends keeping tenant/stamp version state visible and using progressive rollout, deployment rings and feature flags.

OpenTelemetry provides a standard semantic layer for traces, metrics, logs, profiles and resource metadata, including GenAI-related telemetry.

Grafana service graphs/exemplars demonstrate the desired drill-down pattern: health/metric signal → trace → failing span/dependency.

Langfuse provides AI-specific traces, tool/retrieval/model timing, token/cost data, production/offline evaluation and OpenTelemetry integration.

Sentry's issue model demonstrates another useful pattern: group raw failures into understandable issues with impact, timeline, breadcrumbs/traces, related releases/flags and actions.

## 4. Core RQ-25 conclusion

> **Admonk should launch with the smallest safe Production architecture, while carrying a planned evidence-triggered architecture evolution roadmap from day one.**

And:

> **Admonk Production is not operationally complete unless the owner can visually understand and control its health, quality, failures, costs, releases and scaling state without needing to read code.**

Working architectural name:

> **Admonk Control Room**

The name is not final branding.

# PART A — PRODUCTION EVOLUTION

## 5. Separate elastic scaling from structural scaling

### Elastic scaling

Automatic capacity adjustment inside the current stage.

Examples:
- add/remove request instances;
- increase worker count;
- scale queue consumers;
- adjust concurrency inside approved limits;
- autoscale existing storage/compute tier.

Elastic scaling may be automated.

### Structural scaling

A deliberate architecture change.

Examples:
- split a worker class into a separate deployment;
- introduce tenant-specific capacity controls;
- partition data;
- create another cell/stamp;
- move a tenant to dedicated infrastructure;
- add a region;
- introduce multi-region failover.

Structural scaling requires a Scale Gate.

## 6. Scale Gate

Every structural transition is represented by a versioned Scale Gate containing:

- from stage;
- to stage;
- constraint the new stage solves;
- trigger signals;
- threshold/budget policy;
- observation window;
- current values and trend;
- projected limit/exhaustion date;
- SLO/error-budget impact;
- capacity headroom;
- tenant/noisy-neighbor impact;
- cost impact;
- operational toil impact;
- security/compliance requirement;
- required readiness/load/migration tests;
- migration plan;
- rollback plan;
- compatibility/data-migration requirements;
- owner/platform decision.

ScaleGate states:
- NOT_NEEDED
- WATCH
- READY
- BLOCKED
- APPROVED
- PROMOTING
- VERIFYING
- COMPLETE

A stage does not promote because one metric spikes once.

Promotion requires:
1. a planned trigger is genuinely met;
2. it is sustained/repeated or contractually unavoidable;
3. the next stage specifically addresses that constraint;
4. readiness/security/load/migration tests pass;
5. economics are acceptable;
6. rollback exists;
7. owner/platform approval is recorded.

Exact numeric thresholds are set from Production baselines, not invented during discovery.

## 7. Planned scale stages

### SCALE-0 — Lab / Pre-Production

Source: RQ-24.

Purpose:
- prove the core architecture;
- create eval/trace baseline;
- prove action/security/recovery;
- measure quality, latency and cost.

Gate to SCALE-1:
- RQ-24 hard gates pass;
- representative quality floors exist;
- latency/economic baseline exists;
- governed actions work;
- recovery works;
- security/tenant isolation hard tests pass;
- critical flow can be inspected end-to-end.

### SCALE-1 — Production Seed

Goal:
> simplest safe single-region Production architecture with full operational visibility.

Recommended deployable boundaries:

**1. Shared Control Runtime**
- tenant/company registry;
- user/membership/entitlement/settings contracts;
- setup/health metadata;
- connector/connection registry metadata;
- RouteProfile/model-binding metadata;
- rate-card/credit configuration;
- ScaleGate state;
- Control Room API;
- shared control-plane APIs.

**2. Interactive Application Runtime**
- Jarvis S0/S1 request path;
- specialist product request APIs/modules;
- route/context/surface initiation;
- Context Packet orchestration;
- streaming;
- lightweight synchronous reads.

Stateless/disposable where practical.

**3. Durable / Async Worker Runtime**
Logical pools for:
- durable task steps;
- deep model work;
- bounded agents;
- artifact work;
- notifications;
- offline evaluations;
- noninteractive jobs.

Pools may share one deployment initially but keep separate queue/concurrency classes.

**4. Connector Runtime**
- webhook ingress;
- provider adapters;
- sync/backfill/reconciliation;
- provider reads/actions;
- rate-limit control;
- credential-broker boundary.

Separate from application runtime from day one because of external ingress, credential scope, provider limits, backfill bursts and failure containment.

Optional only when enabled:
- voice/media runtime;
- browser/computer/code sandbox runtime.

Required logical durable resources:
- control-plane relational state;
- domain/product authoritative stores;
- Durable Task state;
- queue/work scheduling primitive;
- audit/provenance + raw usage ledger;
- artifact/object storage;
- cache where evidence justifies it;
- telemetry backends.

Physical database infrastructure may still be shared where ownership/isolation/migration seams are preserved.

Hard SCALE-1 requirement:

> **No Production launch without Control Room v1 coverage of the critical request/action path.**

The owner must be able to follow:
user/task → route → context/source → model/tool → action/provider → outcome/error → cost/eval.

### SCALE-2 — Workload-Isolated Production

Purpose:
split workloads only when shared capacity becomes a demonstrated constraint.

Potential promotions:
- separate voice runtime;
- separate heavy AI/agent workers;
- separate media/artifact workers;
- separate notification workers;
- provider-specific connector pools;
- independent autoscaling.

Typical triggers:
- background work repeatedly hurts R1/R2 latency;
- queue age approaches/exceeds task SLO;
- provider quotas create contention;
- one workload has a materially different scale curve;
- worker/connection pressure consumes error budget;
- operations require restarting one workload without affecting others.

### SCALE-3 — Tenant-Aware Capacity & Data Scale

Purpose:
prevent tenants/large workloads from hurting each other while preserving shared SaaS economics.

Adds as needed:
- stronger per-tenant concurrency/fair scheduling;
- tenant/tier resource budgets;
- tenant SLO/health views;
- provider quota partitioning;
- background caps;
- data partition/index strategy;
- read replicas/derived read models;
- selectively reserved/dedicated capacity for exceptional tenants.

Triggers:
- noisy-neighbor incidents;
- one tenant consumes disproportionate resources;
- tenant p95/p99 variance is unacceptable;
- queue starvation;
- tenant-specific data hotspots;
- nonlinear cost/tenant;
- contract/tier requires reserved capacity.

### SCALE-4 — Cell / Deployment Stamp Scale

Purpose:
create repeatable horizontal architecture units and reduce blast radius.

Architecture:
- shared/global Control Plane;
- multiple Application/Data Plane cells/stamps;
- stamp serves a group of tenants or exceptionally one tenant;
- tenant → stamp placement registry;
- controlled tenant migration;
- release rings by stamp;
- stamp SLO/capacity.

Triggers:
- single-stamp natural scale limit;
- scale-up becomes nonlinear/uneconomic;
- stronger tenant isolation is required;
- blast radius is too large;
- premium/large tenant needs dedicated isolation;
- version/update isolation is required;
- resilience needs failure containment.

A stamp is repeatable infrastructure, never a customer-specific fork.

### SCALE-5 — Regional / Residency Scale

Purpose:
place workload/data according to geography, latency, residency and disaster-recovery commitments.

Adds:
- tenant home-region placement;
- regional stamps;
- region-aware routing;
- regional model/provider eligibility;
- regional connector/data constraints;
- cross-region backup/failover;
- regional telemetry aggregation.

Triggers:
- legal/customer residency requirement;
- remote-user latency cannot meet SLO;
- meaningful customer concentration in a new region;
- DR commitment exceeds single-region capability;
- provider/model regional availability matters.

### SCALE-6 — Mission-Critical Multi-Region / Global Resilience

Not a default destination.

Possible capabilities:
- active/active or active/standby by subsystem;
- automated regional failover;
- global routing;
- cross-region task recovery;
- explicit data conflict strategy;
- highly available control plane.

Triggers:
- contractual RTO/RPO requires region-failure survival;
- business loss justifies complexity;
- workload scale requires federation;
- domain data semantics can safely support the replication model.

Do not enter SCALE-6 for prestige.

## 8. Scale is multi-dimensional

The roadmap does not require every workload and tenant to move simultaneously.

Track:
- platform default stage;
- scale stage by workload;
- tenant placement/isolation stage.

Example:
- voice may become SCALE-2 before connectors;
- one regulated tenant may use a dedicated SCALE-4 cell while most tenants remain shared;
- residency may force SCALE-5 for a specific tenant before traffic volume would.

## 9. Scale triggers

Do not use vanity thresholds such as:
- 1,000 users = microservices;
- 100 tenants = sharding.

Use constraint evidence:

**Reliability**
- SLO/error-budget burn;
- incident frequency;
- blast radius;
- recovery time.

**Performance**
- p95/p99 latency;
- queue age;
- throughput;
- provider/database saturation.

**Capacity**
- headroom;
- projected time-to-limit;
- scale-out duration.

**Isolation**
- noisy-neighbor evidence;
- tenant SLO variance;
- compliance/security isolation.

**Economics**
- nonlinear cost;
- cost per successful outcome;
- cost/tenant;
- idle capacity.

**Operations**
- deployment blast radius;
- rollback difficulty;
- manual toil;
- debugging burden.

**Geography/Compliance**
- regional latency;
- residency;
- provider-region constraints;
- contractual resilience.

# PART B — ADMONK CONTROL ROOM

## 10. Definition

> **Admonk Control Room is the internal visual Operations, Quality and Architecture Control Plane for the Admonk product family.**

It is not:
- a normal admin analytics dashboard;
- a raw log viewer;
- a replacement for Grafana/Sentry/Langfuse/PostHog-class tools;
- an unrestricted cloud console;
- the customer-facing Admonk One Setup & Health experience.

It is:
- the owner/operator system map;
- incident and root-cause center;
- quality/evaluation center;
- scaling-plan controller;
- release/version controller;
- tenant-aware operations view;
- governed intervention surface.

Admonk One Setup & Health may expose a safe tenant-scoped subset. The full Control Room is an internal/platform-operator capability.

## 11. Non-technical owner UX contract

The default UI answers:

1. What is happening?
2. Who/what is affected?
3. Why do we think it is happening?
4. What evidence supports that?
5. What changed?
6. What can I do?
7. What will that action affect?
8. How do I verify that it worked?

Raw logs/code/query languages remain deeper levels, not the starting point.

## 12. Control Room surfaces

### CR-1 Live System Map

Truthful graph of:
- regions/stamps;
- tenants;
- products;
- runtimes;
- workers;
- queues;
- connectors;
- providers;
- models;
- stores/caches;
- critical dependencies.

Overlay:
- health;
- traffic;
- errors;
- latency;
- lag;
- cost;
- incidents;
- versions.

Click any node/edge to drill into evidence.

### CR-2 Issues & Incidents

Every issue contains:
- plain-language symptom;
- severity;
- first/last seen;
- affected tenants/products/tasks;
- user impact;
- evidence state;
- suspected/verified cause;
- dependency/blast-radius graph;
- traces/logs/metrics;
- AI/tool/connector context;
- recent releases/flags/prompts/model bindings/config changes;
- quality/cost impact;
- timeline;
- owner/status;
- runbooks/actions;
- verification.

Symptom may be verified while root cause remains suspected.

### CR-3 Task X-Ray / Trace Explorer

Search by:
- task;
- trace;
- tenant;
- product;
- capability;
- model;
- connector;
- provider;
- operation/action;
- artifact;
- release.

Visual timeline shows each step with:
- duration;
- status;
- version/config;
- cost;
- retry/failure;
- evidence;
- child spans.

Health metrics must be able to drill to representative traces/exemplars.

### CR-4 AI Quality Center

Show:
- RouteProfiles;
- model bindings;
- prompt/profile versions;
- regression suites;
- capability suites;
- production quality trends;
- eval datasets;
- human review queues;
- model/provider comparisons;
- quality-latency-cost frontier;
- fallback frequency;
- action/tool correctness;
- abstention behavior.

Production failures can become regression candidates from the UI.

### CR-5 Connector & Data Health

Per connection:
- tenant/provider/account;
- scopes;
- credential status;
- webhook health;
- last successful sync;
- lag/checkpoint;
- backfill;
- rate-limit headroom;
- reconciliation;
- mapping/schema version;
- freshness;
- recent failures;
- affected tasks/products;
- read/action availability.

Governed controls:
- reconnect;
- health check;
- retry/reconcile;
- pause/resume;
- lower concurrency;
- quarantine;
- disable actions while retaining reads.

### CR-6 Durable Task & Queue Control

Show:
- active/waiting/stalled tasks;
- queue age/depth;
- worker pool;
- retries/checkpoints;
- budgets;
- parent/child state.

Governed controls:
- inspect;
- pause/resume where supported;
- cancel remaining work;
- retry safe step;
- reconcile uncertain state;
- escalate to intervention;
- adjust allowed priority.

### CR-7 Release & Change Control

One timeline for:
- app releases;
- shared package versions;
- connector versions;
- schemas/migrations;
- feature flags;
- prompts;
- RouteProfiles/model bindings;
- agent profiles;
- workspace planners;
- policies/config.

Support:
- deployment rings/canaries;
- progressive rollout;
- tenant/stamp targeting;
- version-by-tenant;
- compatibility;
- rollback.

### CR-8 Scaling Center

Shows the architecture roadmap live.

Example view:

Current stage: SCALE-1 Production Seed
Next: SCALE-2 Workload Isolation

Interactive p95: GREEN
Worker queue age: WATCH
Connector backlog: GREEN
Provider quota headroom: WATCH
DB capacity: GREEN
Error budget: GREEN

Projected constraint:
AI worker saturation at current growth trend.

Readiness:
load test PASS
worker split READY
rollback PASS
cost impact known
expected latency benefit known

Decision:
WATCH / READY FOR OWNER APPROVAL

Each ScaleGate links to evidence.

### CR-9 Tenant Operations

Per tenant:
- products/SKUs;
- current stamp/region;
- service health/SLO;
- connectors;
- task load;
- resource use;
- AI usage/cost;
- queue share;
- incidents;
- releases/flags;
- noisy-neighbor contribution;
- required actions.

### CR-10 Security & Governance

Show:
- denied authorization;
- tenant-boundary failures;
- approvals/action receipts;
- prompt-injection/security detections;
- sandbox/egress violations;
- credential events;
- connector-scope changes;
- high-risk capability usage;
- policy changes;
- governance jobs.

### CR-11 Economics & Credits

Show:
- provider/model/tool cost;
- cost per successful outcome;
- cost by tenant/product/capability;
- retry/failure waste;
- cache savings;
- AI Credit debits;
- rate-card version;
- invoice reconciliation;
- budget anomalies;
- projected spend.

### CR-12 Unified Audit Timeline

Correlate:
- user action;
- Jarvis task;
- model/agent;
- connector;
- approval;
- provider mutation;
- artifact revision;
- release;
- flag/config;
- incident;
- security event;
- operator intervention.

Core question:
> What changed immediately before this problem began?

## 13. Custom experience, specialist backends

Do not rebuild every telemetry engine.

Recommended shape:

Applications / Workers / Connectors / AI
→ standard instrumentation
→ specialized telemetry/quality/error/product backends
→ Admonk Operations Index + Operational Graph + Issue/ScaleGate models
→ Admonk Control Room
→ governed control actions

Control Room owns:
- correlation;
- normalized operational semantics;
- owner-friendly visual experience;
- issue/incident/ScaleGate models;
- runbook/control actions;
- cross-tool navigation.

Specialist systems own:
- raw metrics;
- raw traces/logs/profiles;
- AI trace/eval storage;
- error grouping;
- product behavior analytics;
- provider-native diagnostics.

Preferred shared telemetry direction:
- OpenTelemetry-compatible semantics;
- low-cardinality Admonk operational attributes;
- tenant/task/action/connector correlation in governed records;
- AI-specific GenAI attributes where appropriate;
- strict RQ-20/M2-18 redaction/sensitivity controls.

## 14. Operational Graph

Candidate node types:
- Platform;
- Region;
- Stamp;
- Tenant;
- Product;
- Runtime;
- Worker Pool;
- Queue;
- Store;
- Cache;
- Connector;
- Provider;
- Model Deployment;
- RouteProfile;
- Capability;
- Task;
- Artifact.

Candidate edge types:
- SERVES;
- DEPENDS_ON;
- READS_FROM;
- WRITES_TO;
- QUEUES_TO;
- CALLS;
- CONNECTS_TO;
- RUNS_ON;
- ROUTES_TO;
- PLACED_IN;
- PRODUCED_BY.

Dynamic traces augment this graph but do not redefine ownership silently.

## 15. Issue contract

An Operational Issue should store:
- status/severity;
- symptom;
- evidence state;
- time range;
- affected tenants/products/capabilities/tasks;
- suspected causes;
- verified root cause when known;
- traces/logs/metrics/evals/changes;
- user/SLO/quality/cost/security impact;
- runbook;
- allowed control actions;
- owner/timeline;
- resolution;
- regression-case link.

The system must support unknown cause and multiple competing hypotheses.

## 16. Platform Operator Jarvis

Jarvis may operate inside the Control Room under a restricted Platform Operator Lens.

It can answer:
- What is wrong?
- Why?
- Which customers are affected?
- Did a release cause this?
- Is the model, connector or database the bottleneck?
- Is this urgent?
- What happens if I pause this worker?
- Are we ready for the next scale milestone?
- Why did cost increase?

Requirements:
- grounded in Control Room evidence;
- deep links to evidence;
- suspected cause labeled;
- no authority escalation;
- all actions use RQ-07.

Jarvis explains the system; deterministic monitoring/authorization remains authoritative.

## 17. Runbook/control actions

The user should not need a CLI for common safe operations.

Examples:
- acknowledge/assign issue;
- retry a safe idempotent task step;
- reconcile uncertain action;
- pause/resume connector sync;
- reduce provider concurrency;
- disable a bad feature flag;
- rollback a prepared compatible release/binding;
- switch to an already-qualified fallback model;
- pause low-priority background work;
- quarantine a connector;
- trigger health/load test;
- create a regression case;
- execute a prepared tenant placement migration.

Each action includes:
- target;
- current state;
- expected effect;
- blast-radius preview;
- action class;
- permission/approval;
- rollback/compensation;
- verification;
- Action Receipt.

Do not expose arbitrary shell/SQL/cloud-admin access as the normal control model.

## 18. Product Supervisor integration

Product Supervisor remains the governance/lifecycle system.

Control Room visually surfaces:
- Foundation/product lifecycle;
- active milestone;
- gate status;
- blockers;
- eval/release status;
- compatibility/migration;
- complexity-budget items;
- scale milestone;
- incidents/regressions linked to follow-up.

Control Room is the live operational visualization/control layer for the governance model.

## 19. Release rings

Candidate progression:
- Ring 0 internal/test
- Ring 1 canary/early
- Ring 2 broader controlled
- Ring 3 general

Exact names/count remain configurable.

Control Room shows:
- version/feature state by tenant/stamp;
- rollout progress;
- SLO/quality change by ring;
- stop/rollback state;
- compatibility blockers.

Use OpenFeature-compatible contracts where appropriate; feature-flag backend remains open.

## 20. Alerting philosophy

Apply RQ-21 and SRE principles.

Alert when a condition is:
- actionable;
- materially user/service affecting or imminent;
- meaningful under SLO/error-budget/security/quality policy.

Do not notify the owner about every internal retry.

Low-level signals:
- aggregate;
- stay ambient;
- become issues;
- enter digest/trend analysis.

The Control Room should reduce the need to stare at dashboards.

## 21. Control Room visual direction

The Control Room should not be table-first.

Candidate primary design:
- spatial system graph;
- health paths;
- focused issue view;
- time-scrubbable timeline;
- progressive disclosure;
- plain-language explanations;
- direct path from symptom → dependency → trace → change → action.

It may borrow Jarvis design language:
- dark spatial environment;
- semantic illumination;
- truthful node/path states;
- zoom = actual scope.

But precision/clarity outrank cinematic motion.

## 22. Control Room v1 — required for SCALE-1

Minimum:
1. system map;
2. issue center;
3. task X-Ray;
4. connector health;
5. AI quality basics;
6. release/change timeline;
7. scaling center;
8. first governed runbooks.

Do not defer operations visibility until the system is large.

## 23. Control Room scaling

CR-M1 Production Visibility — SCALE-1
- critical traces/issues/connectors/tasks/releases/scale gate.

CR-M2 Workload Operations — SCALE-2
- worker pools/queues/provider quotas/autoscaling/voice.

CR-M3 Tenant Operations — SCALE-3
- tenant/tier health/fairness/cost/dedicated capacity.

CR-M4 Cell Operations — SCALE-4
- stamps, tenant placement, migration, rings, blast radius.

CR-M5 Regional Operations — SCALE-5+
- region placement, residency, failover, replication lag, regional providers.

## 24. Tool disposition

Strong directions:
- OpenTelemetry for shared telemetry semantics/correlation;
- Langfuse for AI-specific trace/eval data;
- OpenFeature for provider-neutral flag evaluation/progressive rollout contracts;
- PostHog remains the selected product-behavior/analytics direction from prior Foundation/product decisions.

Implementation may compare Sentry, Grafana/Tempo/Loki/Prometheus-class systems, Datadog, Honeycomb or cloud-native backends.

RQ-25 does not lock a telemetry/APM vendor.

Control Room must be backend-adapter friendly.

## 25. Minimum Production architecture summary

Users
→ Edge/UI
→ Shared Control Runtime + Interactive Runtime
→ Durable Task/Queue
→ Async Worker Runtime + Connector Runtime
→ domain/platform stores and artifact/audit/usage state

All runtimes
→ OpenTelemetry-compatible telemetry + AI traces/evals + error/product/change signals
→ specialist backends
→ Operational Graph / Issue / ScaleGate index
→ Admonk Control Room
→ governed RQ-07 actions

Voice/sandbox/specialized pools are added only when enabled/required.

## 26. What can initially share

Can share code/package:
- Control Room UI + internal admin shell;
- control APIs;
- shared metadata contracts;
- audit/usage/event schemas.

Can share one worker deployment initially:
- deep AI;
- artifacts;
- notifications;
- offline evals;
if queue/concurrency classes stay distinct.

Can share physical DB infrastructure:
- different logical domains/tables/schemas;
if ownership, tenant isolation and migration seams remain explicit.

## 27. What should be separate from SCALE-1

Recommended separate pressure/security domains:
- interactive requests vs background workers;
- connector runtime vs app runtime;
- control-plane critical state vs tenant workload execution;
- credentials/secrets vs model/task context;
- telemetry backends vs business databases.

## 28. Production Scaling Plan

Create a first-class versioned artifact:

**Admonk Production Scaling Plan**

It stores:
- current stage;
- next stage;
- every ScaleGate;
- current baselines;
- trigger thresholds once evidence exists;
- readiness tests;
- migration templates;
- rollback templates;
- deferred capabilities;
- completed promotions/post-promotion verification.

Control Room renders this plan live.

Promotion lifecycle:

PLANNED
→ BASELINED
→ WATCHING
→ TRIGGER MET
→ READINESS CHECK
→ OWNER/PLATFORM APPROVAL
→ CANARY/MIGRATION
→ VERIFY SLO + QUALITY + COST
→ PROMOTED
→ POST-PROMOTION REVIEW

If the new stage does not solve the constraint:
- rollback where practical;
- mark hypothesis failed;
- update scale plan.

## 29. Control authority

Control Room never bypasses existing authorization.

Examples:
- view trace → READ;
- propose fix/runbook → PROPOSE;
- retry safe idempotent step → EXECUTE_REVERSIBLE when policy allows;
- rollback release / move tenant / fail over region → likely EXECUTE_CONSEQUENTIAL;
- destructive data action → DESTRUCTIVE policy.

All consequential actions produce approval/action receipts.

## 30. Hard owner-experience requirement

For every meaningful issue/state the UI must provide:

**Explanation**
- What is wrong?
- Why?
- Impact?
- What changed?
- Is it ongoing?

**Evidence**
- metric;
- trace;
- event;
- source;
- release/config change.

**Decision support**
- options;
- expected impact;
- risk;
- reversibility;
- recommended next step;
- reason for recommendation.

**Control**
- execute governed runbook;
- request engineer review;
- acknowledge/defer;
- open raw technical evidence if desired.

The owner should not need coding expertise to operate the platform intelligently.

## 31. Deliberately not locked

RQ-25 does not lock:
- cloud provider;
- Kubernetes/serverless/container platform;
- workflow engine;
- queue/broker;
- DB/cache vendor;
- APM/log/trace backend;
- issue tracker;
- feature-flag provider;
- service mesh;
- multi-region active-active;
- exact scale thresholds before baselines;
- final Control Room name;
- final Control Room visual design.

These belong to M2-20 and implementation comparisons.

## 32. Updated sequence after RQ-25

1. Lock RQ-25.
2. Reconcile it with M2-19 Version/Compatibility/Migration and M2-20 runtime-boundary decisions.
3. Full Jarvis architecture audit across RQ-01..25.
4. Full Admonk Product Platform/Foundation audit.
5. Produce initial Production Scaling Plan and Control Room product requirements.
6. Continue JX-03/JX-04 design-direction evidence.
7. Begin Jarvis Lab only when explicitly authorized.
8. Lab promotion to Production follows SCALE-0 → SCALE-1 gate.

## 33. Recommended lock

> **RQ-25 — Milestone-Driven Production Evolution + Admonk Control Room**
>
> Admonk launches with the smallest safe Production architecture that satisfies all locked Jarvis/Foundation boundaries, but the architecture is accompanied from day one by a planned structural scaling roadmap.
>
> Keep elastic scaling and structural scaling separate. Elastic scaling changes capacity inside the current stage; structural scaling changes architecture only through a versioned Scale Gate with measured triggers, readiness tests, economics, migration, rollback and owner/platform approval.
>
> Planned stages are:
> **SCALE-0 Lab → SCALE-1 Production Seed → SCALE-2 Workload Isolation → SCALE-3 Tenant-Aware Capacity/Data Scale → SCALE-4 Cell/Deployment-Stamp Scale → SCALE-5 Regional/Residency Scale → SCALE-6 Mission-Critical Multi-Region only when justified.**
>
> Promotions use SLO/error-budget, latency, queue age, capacity headroom, tenant/noisy-neighbor, provider/data limits, economics, operational toil, geography/compliance and resilience evidence rather than arbitrary user/tenant counts.
>
> SCALE-1 separates Shared Control Runtime, Interactive Application Runtime, Durable/Async Worker Runtime and Connector Runtime, with appropriate durable stores/queue/artifacts/audit/usage and observability. Voice/browser/code runtimes are added only when enabled.
>
> Production is not operationally complete without an owner-facing **Admonk Control Room**: a visual Operations, Quality and Architecture Control Plane rather than an admin analytics dashboard.
>
> Control Room provides a live system map, issue/incident investigation, task/trace X-Ray, AI quality/evals, connector/data health, durable-task/queue control, release/change control, Scaling Center, tenant operations, security/governance, economics and unified audit timeline.
>
> Default UX answers what happened, who is affected, why, what evidence supports the explanation, what changed, what options exist and what each action will do before exposing raw technical details.
>
> Control Room uses specialist observability backends rather than rebuilding them. OpenTelemetry-compatible telemetry is the preferred shared signal contract; AI tracing/evaluation remains a specialist capability such as the selected Langfuse direction; other operational backends remain replaceable behind adapters.
>
> Health signals drill into traces/evidence, and incidents correlate symptoms with dependencies and recent releases, flags, prompts, model bindings and configuration changes.
>
> Jarvis operates inside Control Room through a restricted Platform Operator Lens to explain evidence and propose actions in plain language. It cannot invent root cause or bypass deterministic authority.
>
> Every Control Room intervention uses M2-11/RQ-07 action classes, previews, approval where required, verification and Action Receipts.
>
> Scaling Center continuously displays current stage, next ScaleGate, trigger evidence, projected constraints, readiness, economics and migration status. Structural promotion remains governed.
>
> Product Supervisor remains the governance model; Control Room becomes its live operational visualization/control surface.
>
> The Production Scaling Plan is a first-class versioned plan throughout the lifecycle.
>
> **Admonk should never reach a scale transition by surprise: the system should show which limit is approaching, why the next milestone exists, what evidence says it is time and what controlled transition comes next.**
>
> **And the owner should never need to be a programmer to understand or control the health, quality and evolution of the platform.**

## 34. Recommendation

**LOCK RQ-25 on this expanded basis.**

After RQ-25 is locked, Deep Research RQ-01..RQ-25 is complete and the next step is the full Jarvis architecture audit.

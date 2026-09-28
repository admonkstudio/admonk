# Jarvis Deep Research Handover Checkpoint — 2026-09-28

**Status:** CANONICAL RESUME CHECKPOINT  
**Repository:** admonkstudio/admonk  
**Implementation posture:** Discovery / architecture only. No Production implementation is authorized by this checkpoint.  
**Exact resume gate:** **FULL JARVIS ARCHITECTURE AUDIT COMPLETE — REMEDIATION PACKAGE OWNER LOCK PENDING**  
**Parallel Foundation gate:** **FOUNDATION-M2 remains active at M2-19 — Version / Compatibility / Migration**

## Current architecture audit

Canonical audit:
`docs/audits/JARVIS-FULL-ARCHITECTURE-AUDIT-2026-09-28.md`

Verdict:
**PASS WITH REQUIRED REMEDIATIONS — OWNER LOCK PENDING**

The audit does not reopen RQ-01..25. It recommends documentation reconciliation, operator-plane hardening, explicit signal taxonomy, telemetry privacy/environment rules, and feeding version/runtime findings into M2-19/M2-20.

## 1. Purpose

This is the durable recovery point for the Jarvis deep-research sequence.

If a conversation/session is lost or closed:
1. read this file first;
2. read docs/research/JARVIS-DEEP-RESEARCH-REGISTER.md;
3. read only supporting decision files needed for RQ-25;
4. do not reopen RQ-01 through RQ-24 unless new evidence, a contradiction or explicit owner instruction requires it;
5. resume at RQ-25.

Chat history is not the canonical source of truth for these decisions.

## 2. Resume reading order

1. docs/checkpoints/JARVIS-DEEP-RESEARCH-HANDOVER-2026-09-28.md
2. docs/research/JARVIS-DEEP-RESEARCH-REGISTER.md
3. docs/JARVIS-EXPERIENCE-DIRECTION.md
4. docs/FOUNDATION-M2-OPERATING-BRIEF.md
5. docs/PRODUCT-PLATFORM-FOUNDATION.md
6. docs/FOUNDATION-STATUS.md
7. RQ-01 through RQ-24 files as needed
8. docs/research/JARVIS-DESIGN-REFERENCE-LOG.md
9. Supporting hypothesis files:
   - docs/research/JARVIS-INTERACTION-GRAPH-HYPOTHESIS-2026-09-27.md
   - docs/research/JARVIS-PERSISTENT-SIDE-PANEL-HYPOTHESIS-2026-09-27.md
   - docs/research/JARVIS-DISCOVERY-JEV-SYSTEM-ONE-DECISION-LAYER-2026-09-27.md
   - docs/research/JARVIS-WORKSPACE-REUSE-DIRECTION-2026-09-27.md

## 3. Product framing — do not regress

Owner-approved reframing:

> **We are not building an AI assistant. We are building intelligent software that deliberately uses AI inside specific parts of its experience, reasoning, orchestration and execution.**

Jarvis is:

> **the shared adaptive intelligent experience and orchestration layer above subscribed and authorized Admonk capabilities.**

Jarvis is not:
- the business source of truth;
- tenant/permission authority;
- credential store;
- owner of specialist product databases;
- a replacement for specialist dashboards;
- one giant autonomous agent;
- one fixed model/provider/runtime;
- an n8n front end.

Specialist products remain domain authorities.

Dashboards remain the durable structured operating surface.

Core journey:

Ask → Understand → Work → Drill down

Surface contract:
- S0 Conversation
- S1 Dynamic Jarvis Workspace
- S2 Full Specialist Dashboard

## 4. Critical connector correction

Owner correction:

> **n8n is NOT part of the Admonk Product architecture.**

Canonical Production action path:

Jarvis → governed product capability → Admonk capability adapter → Admonk-owned provider connector → provider API

Consequences:
- Kalam n8n is historical operational/workflow evidence only.
- Jarvis Lab does not use n8n for execution.
- RQ-24 uses controlled Admonk Lab adapters and sandbox/test-provider state.
- docs/JARVIS-EXPERIENCE-DIRECTION.md has already been reconciled to remove the superseded n8n execution wording.

## 5. Locked Deep Research sequence

**RQ-01 through RQ-25 are LOCKED. Deep Research is COMPLETE.**

### RQ-01 — Responsibility Boundary
Jarvis owns interaction/orchestration, not authority or systems of record.

File: docs/research/JARVIS-RQ01-RESPONSIBILITY-BOUNDARY-2026-09-27.md

### RQ-02 — Responsiveness
Immediate agency, early useful value and truthful continuity.
- R0 Reflex/local UI
- R1 Conversation
- R2 Active Work
- R3 Extended/Durable Work
- R4 External/Human Wait
- local acknowledgement target ≤200 ms p75
- FAST TTFUV p50 ≤1s / p95 ≤2s remains Lab hypothesis

File: docs/research/JARVIS-RQ02-RESPONSIVENESS-CONTRACT-2026-09-27.md

### RQ-03 — Intelligence Routing
Use minimum sufficient intelligence that meets quality/risk.
- C0 Deterministic Software
- C1D Decision AI / Reflex
- C1G Fast Generative
- C2 Deep AI
- C3 Orchestrated / Agentic AI
Jev remains a Lab candidate, not a dependency.

Files:
- docs/research/JARVIS-RQ03-INTELLIGENCE-ROUTING-2026-09-27.md
- docs/research/JARVIS-DISCOVERY-JEV-SYSTEM-ONE-DECISION-LAYER-2026-09-27.md

### RQ-04 — Voice
Voice is a realtime interface into the same Jarvis/task engine.
No separate voice brain. Barge-in required. Deep work delegates to durable task engine.

File: docs/research/JARVIS-RQ04-VOICE-ARCHITECTURE-2026-09-27.md

### RQ-05 — Surface Routing
- S0 Conversation
- S1 Dynamic Workspace
- S2 Full Dashboard
Conversation remains the natural-language control channel, not always the primary surface.

File: docs/research/JARVIS-RQ05-SURFACE-ROUTING-2026-09-27.md

### RQ-06 — Dynamic UI
Jarvis generates validated declarative workspace specs, never arbitrary executable Production UI.
Reuse known compatible plans; rebind fresh governed data.

Files:
- docs/research/JARVIS-RQ06-DYNAMIC-UI-COMPOSITION-2026-09-27.md
- docs/research/JARVIS-WORKSPACE-REUSE-DIRECTION-2026-09-27.md

### RQ-07 — Governed Actions
Natural language never directly mutates providers/databases.
Intent → typed Action Proposal → deterministic preflight → exact approval if required → Prepared Action → adapter/connector → provider → verification → receipt/audit.
Uncertain side effects reconcile before retry.

File: docs/research/JARVIS-RQ07-GOVERNED-ACTION-CONTRACT-2026-09-27.md

### RQ-08 — Connector Architecture
Connector = versioned Admonk adapter.
Connection = tenant-owned configured instance.
Credentials never belong to Jarvis.
Separate READ, SYNC and ACTION.

File: docs/research/JARVIS-RQ08-CONNECTOR-ARCHITECTURE-2026-09-27.md

### RQ-09 — OpenJarvis
Selective Lab/runtime/benchmark candidate only.
OpenJarvis may be behind Admonk contracts; it must never define those contracts.

File: docs/research/JARVIS-RQ09-OPENJARVIS-DISPOSITION-2026-09-27.md

### RQ-10 — Context Assembly
Context is federated and assembled just in time.
Pipeline:
task contract → context plan → authorization filter → source selection → JIT retrieval → freshness/authority → compact/rank → budget → Context Packet

Goal:
smallest authorized, fresh, high-signal context that can successfully complete the task.

File: docs/research/JARVIS-RQ10-CONTEXT-ASSEMBLY-2026-09-27.md

### RQ-11 — Operating Lenses
Department and Executive/Company Jarvis are the same Jarvis under different Operating Lenses.
A lens changes eligible context/focus/aggregation, never permissions or authority.

File: docs/research/JARVIS-RQ11-OPERATING-LENSES-2026-09-27.md

### RQ-12 — Agent Topology
Jarvis is intelligent software that can instantiate bounded agents; it is not one giant autonomous agent.
Escalation:
C0 → C1D → C1G → fixed workflow → single bounded agent → multi-agent only when proven.
Worker authority is always a subset of parent authority.

File: docs/research/JARVIS-RQ12-AGENT-TOPOLOGY-2026-09-27.md

### RQ-13 — Model/Provider Runtime
Products request capability/RouteProfile, not provider/model names.
Layers:
Task/Route Profile → Capability Contract → Approved Binding → Provider Adapter → exact Deployment.
Fallback only among eval-qualified candidates.

File: docs/research/JARVIS-RQ13-MODEL-PROVIDER-RUNTIME-2026-09-27.md

### RQ-14 — Durable Tasks
Long-running work is an Admonk-owned Durable Task independent of browser, voice, model/provider, agent or worker.
Model/tool/action/approval steps live inside the task.
Use checkpoints, idempotency, reconciliation, cooperative cancellation and resumable event/state reconstruction.

File: docs/research/JARVIS-RQ14-DURABLE-TASKS-2026-09-27.md

### RQ-15 — Failure & Recovery
Truthful, Local, Recoverable.
Separate epistemic failure from operational failure.
Recovery:
qualified fallback → explicit degraded mode → verified partial result → repair path → safe stop/intervention.
No fabricated knowledge, progress, verification or completion.

File: docs/research/JARVIS-RQ15-FAILURE-RECOVERY-PHILOSOPHY-2026-09-27.md

### RQ-16 — Evaluation
No single global AI score.
Layers:
- E0 deterministic contract tests
- E1 critical regression
- E2 capability suites
- E3 observable system/trace evaluation
- E4 human/domain/UX evaluation
- E5 Production/field evaluation
Outcome first, trajectory second.
Security/authority hard gates cannot be averaged away.

File: docs/research/JARVIS-RQ16-EVALUATION-ARCHITECTURE-2026-09-27.md

### RQ-17 — Latency
Jarvis has a latency vector, not one latency number.
Measure acknowledgement, TTFUV, useful workspace, user-blocking completion, verified outcome, voice turn-taking and durable task progression.
Use percentile distributions, traces and real Cairo/Egypt conditions.

File: docs/research/JARVIS-RQ17-LATENCY-MEASUREMENT-2026-09-27.md

### RQ-18 — Economics
Optimize cost per successful quality outcome.
Maintain:
1. raw usage/cost ledger
2. Admonk AI Credit ledger
3. outcome/unit economics
Optimize architecture before model price.

File: docs/research/JARVIS-RQ18-AI-ECONOMICS-2026-09-27.md

### RQ-19 — Scaling
Scale by workload pressure and failure domain, not microservice ideology.
Keep contract boundary, scaling unit and deployment unit separate.
Separate Control Plane from tenant Application/Data Plane.
Use independent logical scaling units without forcing separate services on day one.

File: docs/research/JARVIS-RQ19-TECHNICAL-SCALING-2026-09-28.md

### RQ-20 — Security
Security must remain correct even if a model is wrong, manipulated or prompt-injected.
Deterministic Admonk software owns identity, tenant, permissions, policy, approvals, credentials, network/filesystem boundaries and action verification.
Instruction authority is separate from content trust.
Memory poisoning is a first-class threat.

File: docs/research/JARVIS-RQ20-SECURITY-ARCHITECTURE-2026-09-28.md

### RQ-21 — Proactivity
Proactive in awareness, conservative in interruption, never proactive in authority.
Signal → Candidate → Attention Decision → Delivery → optional Follow-up.
More inferential insight means quieter default delivery.
Use Proactivity Contracts, quiet hours, dedupe/cooldown and lowest effective interruption level.

File: docs/research/JARVIS-RQ21-PROACTIVITY-ATTENTION-2026-09-28.md

### RQ-22 — Persistent State & Artifacts
Conversation is not the system of record.
Keep distinct:
- transient interaction
- saved workspace
- Durable Task
- Durable Artifact
- authoritative domain object
- durable knowledge/memory
Artifacts have stable identity, revisions, owner/domain, lifecycle, permissions, sensitivity, provenance and evidence.
Snapshot and live-bound artifacts are distinct.

File: docs/research/JARVIS-RQ22-PERSISTENT-STATE-ARTIFACTS-2026-09-28.md

### RQ-23 — Memory, Learning & Knowledge
Memory is typed, scoped, revocable context with provenance and temporal validity.
Keep separate:
1. personal continuity
2. organizational knowledge
3. system improvement
Memory cannot override current authority/domain truth or grant action authority.
External/AI content cannot directly write durable memory.
Production behavior does not self-modify from conversations.

File: docs/research/JARVIS-RQ23-MEMORY-LEARNING-GOVERNANCE-2026-09-28.md

### RQ-24 — First Jarvis Lab
The Lab is an evidence-producing vertical slice, not a mini Production platform.

Bounded scenario:
**Recruitment Acquisition Performance**

Three proof moments:
1. Priority Brief
2. Evidence-Backed Investigation
3. Consequential Action through Explicit Approval

Lab phases:
- LAB-0 Instrumented Harness
- LAB-1 Adaptive Read / Investigation
- LAB-2 Governed Action
- LAB-3 Voice + Resumption
- LAB-4 Optional Runtime Candidates

Rules:
- eval/trace harness first;
- deterministic synthetic fixtures first;
- no n8n execution;
- no Production mutation;
- compare deterministic routing vs Reflex/Jev candidate vs fast generative baseline;
- models behind RouteProfiles;
- OpenJarvis optional only;
- no multi-agent initially;
- tiny declarative Dynamic UI catalog;
- minimal semantic motion;
- voice is a thin shell over same task engine;
- inject failures/security attacks;
- test Artifact/Memory separation;
- controlled proactivity test;
- every experiment produces evidence and promotion/rejection decision.

File: docs/research/JARVIS-RQ24-FIRST-LAB-PROOF-PROGRAM-2026-09-28.md

## 6. Current gate — Full Jarvis architecture audit

**RQ-25 is accepted. Begin the full Jarvis architecture audit; do not start Production implementation or broad Lab implementation yet.**

Canonical research file:

docs/research/JARVIS-RQ25-PRODUCTION-SCALING-CONTROL-SYSTEM-2026-09-28.md

Expanded question:

> **What is the minimum Production architecture, how does it evolve through evidence-triggered scaling milestones, and what visual Control Room lets the owner understand and govern the platform without coding expertise?**

RQ-25 must synthesize rather than reopen RQ-01 through RQ-24.

At minimum reconcile:
- Control Plane vs Application/Data Plane;
- Jarvis request/orchestration boundary;
- Context Registry/Context Packet implementation boundary;
- Model Runtime Adapter/binding boundary;
- Durable Task runtime boundary;
- async worker boundary;
- connector runtime boundary;
- notification/event boundary;
- artifact/state boundary;
- memory/knowledge boundary;
- audit/provenance/usage/economics;
- workload/service identities and secrets;
- sandbox/browser/code boundaries;
- queues/caches/events only where required;
- which logical units may initially share one deployable;
- which require independent scale/isolation;
- shared contract/package vs shared runtime service;
- what M2-20 must finally choose;
- what remains Lab-only and must not enter Production.

RQ-25 should identify:
- minimum deployable topology/count;
- required durable stores;
- required queue/event primitives;
- required execution pools;
- connector/provider boundaries;
- failure/security domains;
- data ownership;
- version/compatibility seams;
- safe deferrals.

Do not choose Kubernetes, Temporal, Redis, Kafka, a DB vendor or a cloud provider unless a specific architectural comparison genuinely requires it. First solve the logical minimum architecture.

## 7. RQ-25 decision test

For every proposed Production component ask:

1. Which locked RQ/M2 requirement forces it to exist?
2. Can a simpler module/package/contract satisfy the requirement?
3. Does it need independent scale, security, reliability, state or release lifecycle?
4. What breaks if it remains combined?
5. What complexity/cost does separation add?
6. Is the decision reversible?

Preferred result:

> **the smallest architecture satisfying all locks while preserving deliberate change seams.**

## 8. Lab implementation is not automatically authorized

RQ-24 locks the Lab program, not automatic implementation.

Default sequence:
1. finish and lock RQ-25;
2. reconcile RQ-25 with M2-20 runtime-boundary decisions;
3. audit the complete Jarvis architecture;
4. owner explicitly authorizes Lab implementation.

If owner explicitly asks to implement earlier, preserve the RQ-24 scope and Lab-only boundaries.

## 9. Design direction state

Design remains **discovery input, not locked design system**.

Canonical file:
docs/research/JARVIS-DESIGN-REFERENCE-LOG.md

Current reference:
**REF-001 — Textura Agency Instagram Reel**

Owner said it is very close to intended Jarvis colors, animation and interaction.

Directly observed:
- dark atmospheric green → near-black;
- restrained neon/emissive green;
- high-contrast white sans-serif;
- secondary bright yellow;
- substantial negative space;
- central focal object;
- cursor integrated into composition;
- premium/cinematic/restrained feel.

Source-described but reel motion was not independently viewable:
- cursor-responsive scene;
- scroll-driven environmental changes;
- site feels aware of visitor;
- 3D/reactive movement;
- participation over passive page.

Transferable hypotheses:
- environment reacts to presence/intent;
- motion communicates semantic focus;
- dark spatial canvas + selective emission;
- low-density Jarvis entry surface;
- meaningful participation rather than decorative animation.

Do NOT lock yet:
- exact palette;
- final orb geometry;
- 3D technology;
- camera/easing;
- glassmorphism;
- final layout;
- motion intensity;
- desktop-only patterns.

Owner will send more references. Add them to the same log. Promote repeated patterns only after reference + prototype/usability/performance evidence converges.

## 10. Interaction Graph hypothesis

Owner direction:

> Jarvis circle/orb may represent the larger connected system/projects/automations/connections; when asked something, interaction zooms into the exact connection/path where the task lives.

This is semantic, not decorative.

Truthful visual semantics:
- zoom = actual focus;
- connection activation = real source/tool/capability engaged;
- evidence appearance = evidence actually returned;
- degraded path = real degraded dependency;
- approval boundary = real action boundary.

Candidate primitives:
- CapabilityMap
- DomainNode
- SourceNode
- ActivePath
- EvidenceLink
- ActionBoundary
- FocusTransition

Still a Lab/design hypothesis, not locked Production UI.

## 11. Persistent side-panel hypothesis

Inside S2 specialist dashboards, Jarvis may remain in a dedicated persistent side panel/control channel.

It receives structured current:
- product;
- resource;
- filters;
- selection;
- view;
- tenant/lens.

Exact layout remains uncommitted.

## 12. Foundation state — preserve

- Studio Foundation v1.0.0 — LOCKED
- Product Supervisor v2.0.0 — current/locked
- FOUNDATION-M2 — ACTIVE
- M2-01 through M2-18 — LOCKED
- current M2 gate — **M2-19 Version / Compatibility / Migration**
- M2-20 will address runtime boundaries: shared service vs shared contract/package vs domain service

RQ-25 must inform/reconcile with M2-20 and must not bypass the Foundation sequence.

## 13. M2 locks most relevant to RQ-25

- tenant is hard customer/security/commercial boundary
- global account + tenant memberships + shared shell
- layered scoped auth; default deny; additive grants; restrictions win
- atomic SKU entitlements
- settings hierarchy
- Setup Center
- Admonk One Shared Integration Control Plane
- permission-aware Context Plane
- shared intersection-based Agent Authority Envelope
- audit/provenance
- Shared Notification Plane
- dual-ledger AI Credit economy
- tenant-aware suite navigation + Resource Link
- design/theme inheritance
- locale/timezone/business-time separation
- shared data governance

Canonical action classes:
- READ
- DRAFT
- PROPOSE
- EXECUTE_REVERSIBLE
- EXECUTE_CONSEQUENTIAL
- DESTRUCTIVE

Do not invent an AI-specific second permission/action model.

## 14. Shared-service promotion rule

Preserve the Product Platform rule:

1. prove semantics in product(s);
2. define the shared contract;
3. centralize runtime only when operational/security/consistency/independent-scale value justifies it.

Possible outcomes:
- domain-owned implementation;
- shared contract + separate implementations;
- shared package/library;
- shared runtime service.

Do not centralize for architectural symmetry.

## 15. Known documentation debt

Some older suite documents still say:
**Corporate AI Assistant = company brain**

This predates the locked Jarvis direction.

Future audit/master-plan reconciliation must make clear:
- Jarvis = shared adaptive experience/orchestration;
- company/executive intelligence = authorized cross-domain Operating Lens/capability;
- specialist products remain domain authorities.

Do not mass-rewrite historical docs during RQ-25 unless a current-authority contradiction blocks the decision.

## 16. Sequence after RQ-25

Owner-intended sequence:
1. lock RQ-25;
2. audit complete Jarvis concept/architecture against RQ-01..25;
3. resolve contradictions, unnecessary complexity and missing seams;
4. audit wider Admonk Product Platform/Foundation with Jarvis integrated;
5. reconcile documentation/product-language debt;
6. continue refining design direction as owner references arrive;
7. resume broader Foundation/Master Plan from canonical repo checkpoint;
8. begin Jarvis Lab implementation only when explicitly authorized.

## 17. Recovery instruction for future session

A future session should be able to continue from this sentence:

> **Resume Jarvis from docs/checkpoints/JARVIS-DEEP-RESEARCH-HANDOVER-2026-09-28.md. RQ-01 through RQ-24 are locked. Start RQ-25 without reopening prior decisions.**

If this checkpoint conflicts with a later explicitly locked/versioned repository decision:
- later canonical decision wins;
- record the contradiction;
- do not silently guess.

## 18. Exact resume statement

> **Resume at the Jarvis architecture audit remediation decision.**
>
> RQ-01 through RQ-25 are locked.
>
> Deep Research is complete and the full Jarvis architecture audit has passed with required remediations. Review/lock `docs/audits/JARVIS-FULL-ARCHITECTURE-AUDIT-2026-09-28.md`, then apply the approved reconciliation and feed M2-19/M2-20.
>
> Do not start Production implementation, select implementation vendors, reopen prior RQs, or resume Marketing Hub application development until the relevant architecture/owner gates explicitly authorize it.


## 19. RQ-25 — Production Evolution Architecture, Scaling Milestones & Admonk Control Room — LOCKED

Canonical file:
`docs/research/JARVIS-RQ25-PRODUCTION-SCALING-CONTROL-SYSTEM-2026-09-28.md`

Key lock:
- SCALE-0 Lab → SCALE-1 Production Seed → SCALE-2 Workload Isolation → SCALE-3 Tenant-Aware Capacity/Data Scale → SCALE-4 Cell/Deployment-Stamp Scale → SCALE-5 Regional/Residency Scale → SCALE-6 Mission-Critical Multi-Region only when justified;
- structural scaling occurs through evidence-based Scale Gates;
- Production Seed separates Shared Control Runtime, Interactive Runtime, Durable/Async Workers and Connector Runtime;
- Production is not operationally complete without Admonk Control Room;
- Control Room is the owner-facing Operations, Quality and Architecture control plane using specialist telemetry/eval backends behind replaceable adapters;
- Platform Operator Jarvis explains evidence and proposes governed actions but does not bypass RQ-07/M2-11 authority;
- Production Scaling Plan is a first-class versioned lifecycle artifact.

# Jarvis Research Question 09 — OpenJarvis Disposition

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** What role, if any, should `open-jarvis/OpenJarvis` have in the final Admonk/Jarvis system?  
**Status:** LOCKED — OWNER ACCEPTED  
**Implementation authority:** None. Product/runtime research only.

## 1. Decision problem

OpenJarvis originally entered discovery because it appeared to overlap with several desired Jarvis capabilities:
- local/cloud inference;
- agents/tools;
- streaming/runtime events;
- traces/telemetry;
- routing/learning;
- memory;
- scheduling/background operators;
- security/sandboxing;
- evaluation and performance measurement.

Now that RQ-01 through RQ-08 define Admonk's architecture much more precisely, OpenJarvis can be evaluated subsystem-by-subsystem instead of asking whether it should become the foundation.

## 2. What OpenJarvis currently is

OpenJarvis describes itself as a **research framework for studying on-device AI systems** and a local-first personal-AI stack.

Its current architecture centers on:
- Intelligence / model catalog;
- Engine / inference backends;
- Agentic Logic;
- Memory;
- Learning + traces.

It supports local engines such as Ollama, vLLM, SGLang and llama.cpp plus cloud providers; pluggable agents; local/searchable memory backends; traces/telemetry; evaluation and benchmarking.

Its package metadata currently classifies the project as **Development Status :: 3 - Alpha**.

Primary sources:
- https://open-jarvis.github.io/OpenJarvis/architecture/overview/
- https://open-jarvis.github.io/OpenJarvis/architecture/design-principles/
- https://arxiv.org/abs/2605.17172
- https://github.com/open-jarvis/OpenJarvis

## 3. Architectural mismatch with Admonk

OpenJarvis's primary problem:

> optimize a personal/local-first AI stack across models, engines, agents, memory and learning.

Admonk's primary problem:

> build multi-tenant governed business software where AI is selectively used inside product workflows, connectors, dynamic UI, context, actions and commercial controls.

Admonk's locked architecture already owns concerns OpenJarvis does not define as our product authority:
- tenant/company isolation;
- membership/identity;
- SKU entitlement;
- scoped authorization;
- setup/onboarding;
- provider connector ownership;
- context/data governance;
- approval/action classes;
- audit/provenance;
- commercial AI credits;
- product/domain authority;
- dynamic workspace contract;
- durable business resources.

Therefore OpenJarvis must not become the Admonk application/runtime authority.

## 4. Recommended overall disposition

> **Do not adopt OpenJarvis wholesale and do not make it a required Production dependency.**

> **Use it selectively as a Jarvis Lab research/runtime/evaluation source, and keep an optional adapter seam for local inference if later evidence justifies it.**

Disposition vocabulary:
- **ADOPT PATTERN** — architecture idea worth incorporating into Admonk-owned implementation;
- **LAB USE** — useful executable code/runtime for experiments and benchmarks;
- **OPTIONAL ADAPTER CANDIDATE** — may be used behind an Admonk-owned interface if Production evidence later justifies it;
- **REFERENCE ONLY** — learn from it, do not depend on it;
- **REJECT AS AUTHORITY** — conflicts with or duplicates locked Admonk ownership.

## 5. Subsystem disposition

### 5.1 Inference Engine abstraction

OpenJarvis exposes a uniform engine interface over local and cloud backends (`generate`, `stream`, model listing, health) and uses registry-driven discovery.

**Disposition:**
- ADOPT PATTERN;
- LAB USE;
- OPTIONAL ADAPTER CANDIDATE.

Why useful:
- fast comparison of local/cloud engines;
- fallback/availability experimentation;
- provider-independent Lab tests;
- local inference research.

Why not make it canonical:
- Admonk needs its own route/model gateway contract tied to RQ-03, RQ-13, M2-14 and tenant/product policy;
- OpenJarvis's engine interface is optimized for inference, not Admonk commercial/governance semantics.

## 5.2 OpenAI-compatible API surface

OpenJarvis exposes an OpenAI-compatible server and streaming interfaces, making it easy to substitute local models into an existing test harness.

**Disposition:** LAB USE.

Use:
- plug OpenJarvis/local engines behind the Jarvis Lab model adapter;
- run the same representative tasks against cloud vs local engines;
- avoid coupling Jarvis Lab UI to OpenJarvis-specific internals.

Do not expose raw OpenJarvis as Admonk's public/business authority API.

## 5.3 Traces and telemetry

OpenJarvis records interaction traces including routing, memory retrieval, inference calls, tool calls and final response; telemetry tracks latency/cost/engine metrics.

**Disposition:**
- ADOPT PATTERN;
- LAB USE;
- REFERENCE ONLY for Production implementation.

Why valuable:
- directly relevant to RQ-16/RQ-17/RQ-18;
- useful for comparing routes/models/tools;
- strong example of treating latency/cost/quality as first-class evidence.

Why not use its trace store as Admonk Production audit:
- local SQLite-oriented research storage;
- trace semantics differ from Admonk audit/provenance/action receipts;
- Production traces must obey tenant/privacy/retention/data-governance rules.

## 5.4 Evaluation and benchmarking

OpenJarvis separates correctness evaluations from latency/throughput/energy benchmarks and records cost/token/TTFT metrics.

**Disposition:**
- ADOPT PATTERN strongly;
- LAB USE where convenient.

Use:
- benchmark local/cloud model engines;
- compare latency/throughput/cost/energy;
- extend or wrap with Admonk's representative task regression set.

Do not let academic benchmark success substitute for Admonk task success.

## 5.5 Routing / trace-driven learning

OpenJarvis can route queries through heuristic or trace-driven policies and is actively researching learned/model routing.

**Disposition:**
- REFERENCE ONLY now;
- LAB EXPERIMENT later.

Reason:
- promising fit with RQ-03 and the Reflex Decision Plane;
- but Admonk's route decision includes product/context/surface/authority/economics dimensions that OpenJarvis does not own;
- automatic policy learning must not silently change Production behavior.

Any future learned routing must pass RQ-16 eval/change-control gates.

## 5.6 Agent implementations / orchestrator

OpenJarvis includes multiple pluggable agents, including simple, orchestrator, ReAct/code agents and persistent operative variants.

**Disposition:**
- LAB USE for controlled comparisons;
- REFERENCE ONLY for Production topology;
- REJECT AS Jarvis identity/authority.

Use:
- compare simple vs orchestrated execution on representative tasks;
- evaluate when C3 genuinely outperforms C2;
- study tool-loop behavior/cost.

Do not make OpenJarvis's agent registry the product's capability/permission model.

RQ-12 will define Admonk's agent topology.

## 5.7 Memory

OpenJarvis provides local persistent/searchable memory through SQLite/FTS5, FAISS, ColBERT, BM25 and hybrid retrieval with automatic context injection.

**Disposition:** REJECT AS ADMONK CONTEXT/MEMORY AUTHORITY.

Reason:
- M2-10 already locks a federated permission-aware context plane with authority, scope, provenance, freshness and sensitivity;
- OpenJarvis memory is useful for personal/local retrieval experiments, not multi-tenant domain truth/governance.

Possible LAB USE:
- compare retrieval methods;
- measure local retrieval quality/latency;
- prototype isolated personal/local contexts only.

## 5.8 Scheduler / continuous operators

OpenJarvis has scheduled/stateful operators and a task scheduler.

Its current roadmap still identifies important hardening gaps such as operator health monitoring, rate limiting, composition/chaining, event-driven operators, versioning/rollback and self-improvement.

**Disposition:**
- REFERENCE ONLY;
- REJECT as Admonk durable execution system.

Reason:
- RQ-14 must define Admonk's long-running/durable task model;
- Production business execution needs tenant/auth/action receipts/notifications/versioned capabilities/recovery semantics from our Foundation.

## 5.9 EventBus

OpenJarvis uses a thread-safe synchronous pub/sub EventBus where subscribers run in registration order in the publisher's thread.

**Disposition:**
- REFERENCE ONLY for local component decoupling;
- REJECT as Admonk Production event backbone.

Reason:
- synchronous in-process dispatch is useful inside a local runtime;
- it is not a multi-tenant durable distributed event transport.

Admonk's actual event/runtime topology belongs to M2-20/RQ-19/RQ-25.

## 5.10 Security / guardrails

OpenJarvis provides secret/PII scanners, redaction/block modes, capability policies, auditing and optional container sandboxing.

Current documentation also shows important differences from Admonk's security posture:
- security wrappers are composable/optional;
- some capability enforcement is disabled or permissive by default depending on configuration;
- `shell_exec` can execute arbitrary host commands if enabled;
- sandboxing is optional/off unless configured.

**Disposition:**
- ADOPT PATTERNS selectively;
- LAB USE sandbox/secret scanning where helpful;
- REJECT as Admonk authorization/security authority.

Admonk's M2-05/M2-11/RQ-07 deterministic authority remains canonical.

## 5.11 Voice

OpenJarvis has speech/TTS pieces, but its current roadmap still marks broader voice-interface work as Research-Stage.

**Disposition:** REFERENCE/LAB ONLY.

RQ-04's dual-plane realtime voice architecture remains authoritative.

## 5.12 Channels/connectors

OpenJarvis includes messaging/channel integrations, but its focus is personal-AI channels rather than Admonk's shared enterprise integration control plane.

Its roadmap also shows some channel areas still needing redesign/hardening.

**Disposition:** REJECT for Admonk connector architecture.

RQ-08 is canonical:
- Admonk-owned connector modules;
- onboarding/setup connections;
- shared credential/sync/health contracts;
- governed product capabilities.

## 5.13 Skills

OpenJarvis can discover reusable skills and optimize them from traces.

**Disposition:** REFERENCE/LAB.

Potential value:
- study capability instruction packaging;
- compare task-specific skill prompts/tool bundles;
- future interoperability if stable standards emerge.

Do not equate external skills with Admonk capability authority or domain contracts.

## 5.14 Local inference / edge execution

This is the most strategically interesting long-term OpenJarvis area.

The OpenJarvis paper reports that its decomposed/spec-search approach can substantially narrow local-vs-cloud quality gaps while reducing marginal API cost/latency on its benchmark suite.

**Disposition:** OPTIONAL FUTURE ADAPTER / LAB RESEARCH.

Potential Admonk use cases later:
- low-risk C1D/C1G work;
- local privacy-sensitive preprocessing;
- retrieval/reranking;
- redaction/classification;
- offline/degraded operation;
- selected tenant/private deployment;
- cost reduction where hardware economics justify it.

Do not assume local is cheaper/better universally. RQ-18/RQ-19 must measure hardware/ops/support cost and quality per successful outcome.

## 6. Production boundary

Recommended Production architecture:

```text
Jarvis / Admonk Software
        │
        ▼
Admonk Model / Runtime Contract
        │
        ├── cloud provider adapter(s)
        ├── realtime voice adapter(s)
        ├── decision-model adapter(s)
        ├── future local inference adapter
        │        └── OpenJarvis MAY be one implementation
        └── other future engines
```

OpenJarvis can be behind the contract.

It must not define the contract.

## 7. Jarvis Lab role

OpenJarvis is especially valuable in the Lab for four controlled experiments.

### L1 — local vs cloud route comparison
Run identical representative C1/C2 tasks through:
- local models via OpenJarvis;
- cloud models;
- compare quality/latency/cost.

### L2 — simple vs orchestrated agent comparison
Compare:
- simple single-turn/tool execution;
- orchestrator/ReAct style execution;
- determine when extra agent loops improve outcomes enough to justify cost.

### L3 — trace/evaluation instrumentation
Capture:
- route;
- model/engine;
- tool sequence;
- latency;
- TTFT;
- token usage;
- cost;
- result quality.

Map those measurements into Admonk's own RQ-16/17/18 schema rather than making OpenJarvis traces canonical.

### L4 — local/degraded-mode feasibility
Test whether selected bounded tasks can remain useful under:
- no cloud access;
- provider outage;
- privacy-constrained mode;
- low-cost local inference.

## 8. Code reuse rule

OpenJarvis is Apache-2.0.

If Admonk copies/modifies code rather than merely using the package/API:
- preserve applicable license/copyright notices;
- document third-party component/version;
- isolate reused code behind Admonk-owned interfaces;
- add Admonk tests;
- avoid deep internal forks where upstream churn creates maintenance burden.

Preferred order:

```text
1. learn from pattern
2. use as Lab dependency/API
3. wrap behind adapter
4. copy/reuse code only when measured benefit justifies maintenance
```

Do not fork the full project merely to obtain one primitive.

## 9. Reuse scorecard

| OpenJarvis area | Disposition |
|---|---|
| Engine/model abstraction | **Adopt pattern + Lab + optional adapter** |
| OpenAI-compatible API | **Lab use** |
| Traces/telemetry | **Adopt pattern + Lab** |
| Evaluations/benchmarks | **Adopt pattern strongly + Lab** |
| Learned routing | **Research/Lab later** |
| Agent implementations | **Lab comparison only** |
| Memory/context | **Reject as Admonk authority** |
| Scheduler/operators | **Reference only; reject as durable runtime** |
| EventBus | **Local pattern only; reject as platform event backbone** |
| Security scanners/sandbox | **Selective Lab/pattern reuse; not authority** |
| Voice | **Reference/Lab only** |
| Channels/connectors | **Reject for Product architecture** |
| Skills | **Reference/Lab** |
| Local inference | **Strategic optional future adapter** |

## 10. Decision criteria for any future Production reuse

A specific OpenJarvis component earns Production use only if all are true:

1. it solves a problem still owned by an Admonk runtime interface rather than a locked domain/platform authority;
2. measured quality/reliability is at or above Admonk's required floor;
3. integration reduces total engineering/operating cost versus a smaller native implementation;
4. its release/maturity/maintenance profile is acceptable;
5. tenant/security/data-governance requirements can be enforced outside/around it;
6. the component can be removed/replaced without changing Jarvis product semantics;
7. license/compliance obligations are manageable;
8. tests prove upgrade compatibility.

## 11. Recommended lock

> **RQ-09 — OpenJarvis is a selective research/runtime dependency, not the Admonk foundation.**
>
> Admonk will not adopt or fork OpenJarvis wholesale and will not make it a required Production runtime.
>
> OpenJarvis is approved for Jarvis Lab use where it accelerates local-vs-cloud inference testing, agent-strategy comparison, traces/telemetry and benchmarking.
>
> Admonk should adopt selected architectural patterns—especially pluggable inference backends, measurable routing, trace-driven evaluation and cost/latency/energy benchmarking—through Admonk-owned contracts.
>
> A future local-inference adapter may optionally use OpenJarvis behind the Admonk model/runtime interface if empirical quality, economics, privacy and maintenance evidence justify it.
>
> OpenJarvis does not own Admonk identity, tenant isolation, connectors, context governance, memory authority, permissions, approvals, durable tasks, UI, audit/provenance or product/domain semantics.
>
> Its scheduler/operators, memory, channels, security controls and event bus may inform research but do not become the corresponding Production platform services.
>
> **Reuse OpenJarvis where it saves real work; never let it redefine what Jarvis is.**

## 12. Recommendation

**LOCK RQ-09 as written.**

This preserves all useful optionality while preventing a local-first research framework from becoming an accidental architectural dependency.
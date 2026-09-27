# Jarvis JX-02 Discovery Checkpoint — 2026-09-27

**Status:** ACTIVE RESEARCH — NOT LOCKED  
**Track:** Jarvis Experience / JX-02 — Voice, Realtime Speed & Quality  
**Relationship to FOUNDATION-M2:** Parallel research/pilot track. FOUNDATION-M2 remains active at M2-19.  
**Implementation posture:** Discovery/lab validation only. No shared Production runtime or Marketing Hub Production application is authorized by this checkpoint.

## 1. Purpose

Preserve the exact cross-project resume point after the Jarvis experience direction and JX-01 surface contract were locked, while continuing JX-02 research far enough that later decisions are based on evidence rather than enthusiasm.

This checkpoint reconciles:
- the current Marketing Hub repository;
- the current Admonk Foundation / shared platform repository;
- the project conversation through 2026-09-27;
- the owner-supplied final conversation transcript;
- the exact OpenJarvis repository supplied by the owner;
- current primary technical sources for realtime/browser interaction.

It intentionally separates:
1. **locked decisions**;
2. **research-backed working conclusions**;
3. **pilot hypotheses that still need measurement**;
4. **open questions that must not be silently converted into architecture**.

## 2. Canonical state recovered

### Marketing Hub
- Repository: `admonkstudio/marketing-hub`.
- Stage remains **PDISC — Product Discovery through Kalam 2027 Strategy**.
- Production application implementation remains deferred.
- Marketing Hub remains one marketing operating/intelligence product; analytics is a core layer, not a separate Analytics Hub.
- Product-specific evidence discovery and Product Definition work continue independently of this Jarvis track.

### Studio / Product Platform Foundation
- Repository: `admonkstudio/admonk`.
- Studio Foundation v1.0.0 remains locked.
- FOUNDATION-M2 is active.
- **M2-01 through M2-18 are locked.**
- Current shared-foundation decision is **M2-19 — Version / Compatibility / Migration**.
- Jarvis does not reopen those decisions merely because it changes the experience layer.

### Jarvis
- Jarvis strategic direction is locked.
- Jarvis is the adaptive intelligent experience above subscribed and authorized Admonk capabilities, not a new source of truth.
- The same core Jarvis becomes department-scoped or executive/company-scoped through subscriptions, permissions, organizational scope, knowledge/context and strategy.
- Dashboards remain the durable structured operating surface.
- **JX-01 is locked:** Conversation → Dynamic Jarvis Workspace → Full Dashboard.
- Core journey: **Ask → Understand → Work → Drill down.**
- A deliberately small **Jarvis Lab** may run in parallel with Foundation discovery using existing n8n automations as temporary real-action test harnesses.

## 3. Reconciliation / corrections

### 3.1 Exact OpenJarvis repository and license

The owner-supplied repository is:

`open-jarvis/OpenJarvis`

Its current repository LICENSE and README identify it as **Apache License 2.0**, not MIT.

This matters because several unrelated Jarvis repositories use MIT licenses. Future evaluation/reuse must refer to the exact repository and preserve Apache-2.0 obligations if code is reused.

Source:
- https://github.com/open-jarvis/OpenJarvis
- https://github.com/open-jarvis/OpenJarvis/blob/main/LICENSE

### 3.2 M2-18 is no longer pending

Earlier conversation state said the M2-18 write had been blocked. Current repository state supersedes that temporary condition.

**M2-18 — Shared Data Governance Contract is now locked and recorded.**

### 3.3 Jarvis canonical location

The Jarvis experience is cross-product and therefore its canonical direction belongs in the shared `admonkstudio/admonk` repository, not as an independent Marketing Hub architecture file.

Marketing Hub should reference the shared direction and absorb relevant domain consequences during its Product Definition Freeze.

### 3.4 Product-language debt

Some older suite/Marketing Hub documents still describe **Corporate AI Assistant = the company-wide brain**.

That wording predates the locked Jarvis direction.

Do not silently reinterpret or mass-rewrite those documents during JX-02. The future product-family/master-plan pass must reconcile the naming/packaging so that:
- Jarvis is the shared adaptive experience;
- executive/company intelligence is an authorized cross-product capability/context;
- specialist products remain domain authorities;
- no wording implies that Jarvis or a corporate layer owns specialist product data.

This is now tracked as a documentation/product-positioning debt, not a reason to reopen product data boundaries.

## 4. JX-02 owner principle — accepted

> **Users should always get immediate visible feedback even when the actual task legitimately takes longer.**

This is now a required JX-02 design constraint.

Important consequence:

**Perceived responsiveness and total completion time are different clocks.**

A deep task may legitimately take longer. The product must still react immediately, expose meaningful state/progress and progressively return useful output rather than leaving the user with a silent spinner.

## 5. JX-02 working architecture

The strongest current synthesis is:

```text
User
  │
  ├── voice
  └── text
       │
       ▼
REALTIME EXPERIENCE
- immediate local visual acknowledgement
- listening / interruption handling
- streamed text/audio/UI
       │
       ▼
REFLEX ROUTER
- determine task class
- preserve tenant/product/resource context
- use deterministic routing where sufficient
- use a small semantic classifier only when needed
       │
       ├──────── FAST
       │         quick answer / lightweight retrieval /
       │         simple non-consequential interaction
       │
       ├──────── DEEP
       │         reasoning / investigation / research /
       │         complex analysis / generated workspace
       │
       └──────── ACTION
                 governed tool/workflow execution
                 → permission check
                 → approval when required
                 → tool/n8n
                 → audit/result receipt
       │
       ▼
JARVIS WORKSPACE
- progressively rendered approved UI primitives
- final answer/result
- drill-down to owning product/dashboard
```

### Why this is preferred

One universal heavyweight agent path would make simple tasks slower, more expensive and harder to debug.

One universal lightweight path would fail quality requirements for complex work.

The router therefore chooses the **cheapest/fastest path that can meet the required quality and authority level**, with escalation when evidence shows the first route is insufficient.

This is compatible with:
- M2-11 agent authorization/approval;
- M2-12 audit/provenance;
- M2-14 dual-ledger AI economics;
- JX-01 progressive surfaces.

## 6. Performance clocks — do not collapse into one SLA

JX-02 should measure at least four different clocks.

### A. Interaction acknowledgement

**Question:** Did the product visibly react to the user's input?

This should be deterministic/local UI behavior rather than waiting for an AI provider.

Working target:
- design for interaction-to-visible-state at or under **200 ms at p75** where the browser/device permits.

This aligns with the current web responsiveness threshold used by Interaction to Next Paint.

Source:
- https://web.dev/articles/inp
- https://web.dev/articles/optimize-inp

This target measures interface acknowledgement, **not AI completion**.

### B. First useful response

**Question:** How soon did the user receive something genuinely useful?

Measure separately for:
- first useful text;
- first useful audio;
- first useful evidence/card/workspace content.

Current lab hypothesis for simple FAST-path tasks:
- **p50 ≤ 1 second**
- **p95 ≤ 2 seconds**

These are **pilot targets, not locked Product Foundation standards**. They must be validated on real target devices/networks/models.

### C. Progressive work feedback

**Question:** During a legitimate longer task, can the user tell that useful work is happening?

Requirements:
- state changes are visible as phases change;
- streamed content appears when safe/useful;
- tool/workflow progress is event-driven where the underlying system can provide it;
- do not invent fake percentage completion;
- show what is actually known: routing, retrieving, analyzing, waiting for approval, executing, presenting, retrying or failed;
- allow interruption/cancel where the underlying action semantics permit it.

### D. Completion

**Question:** How long until the requested outcome is actually complete?

There should be **no one universal completion-time ceiling** for all Jarvis work.

A two-second answer may be appropriate for a simple query; a multi-source investigation or external workflow may legitimately take much longer.

The quality rule is therefore:

> **Never confuse “fast feedback” with “every task must finish instantly.”**

## 7. Voice architecture conclusion for the lab

### Current primary direction

For browser voice, the current strongest technical path is:
- WebRTC for the live browser audio path;
- ephemeral client credentials;
- server-owned business logic/tools when actions or protected company context are involved;
- explicit interruption/barge-in handling;
- delegation to deeper backend reasoning when the realtime model is not the right engine for the task.

Current OpenAI realtime guidance explicitly recommends WebRTC for browser speech-to-speech and supports low first-audio latency, natural turn-taking, interruptions and realtime tool use.

Sources:
- https://developers.openai.com/api/docs/guides/realtime
- https://openai.github.io/openai-agents-js/guides/voice-agents/
- https://openai.github.io/openai-agents-js/guides/voice-agents/transport/

### OpenJarvis voice conclusion

Do **not** make JX-02 depend on OpenJarvis becoming the final voice stack.

OpenJarvis contains speech/TTS pieces and ongoing voice work, but its native full-duplex voice channel has been an evolving feature area rather than the strongest reason to adopt the project.

Use OpenJarvis primarily to evaluate:
- streaming;
- agent/tool lifecycle events;
- traces/telemetry;
- routing strategies;
- local-vs-cloud inference;
- simple-agent vs orchestrator behavior;
- tool/MCP integration;
- evaluation/cost/latency instrumentation.

Voice can be attached as a separate realtime experience path in the lab.

## 8. OpenJarvis disposition

**Decision for discovery:** **PILOT SELECTIVELY — DO NOT ADOPT WHOLESALE.**

### Useful now in Jarvis Lab
- OpenAI-compatible local API surface;
- WebSocket/SSE streaming;
- agent lifecycle and tool-call events;
- telemetry/traces;
- local/cloud engine experimentation;
- simple vs orchestrated agent comparison;
- MCP/tool patterns;
- evaluation/latency/cost thinking.

### Research/adapt later if evidence supports it
- trace-driven routing/learning;
- memory patterns;
- scheduler/background agents;
- local-first inference for selected low-risk tasks;
- skill optimization/evaluation.

### Admonk remains authoritative for
- tenant model;
- memberships/identity;
- effective permissions;
- product entitlements;
- approvals;
- connector/credential ownership;
- audit/provenance contract;
- AI credits/commercial usage;
- data governance;
- specialist-domain source of truth;
- product navigation/deep links.

### Security posture
Use OpenJarvis in a controlled lab boundary first.

The project has had security work around WebSocket/A2A authentication, and its current API docs now describe API-key WebSocket authentication and recommend TLS for remote connections.

Do not expose a raw OpenJarvis instance as an internet-facing Admonk authority layer during discovery.

Sources:
- https://github.com/open-jarvis/OpenJarvis/blob/main/docs/deployment/api-server.md
- https://github.com/open-jarvis/OpenJarvis/issues/217

## 9. Fastest safe n8n pilot route

n8n remains the **temporary action engine / test vehicle**, not Jarvis architecture authority.

The pilot should not give the model arbitrary access to every workflow.

Use a small allowlisted adapter:

```text
Jarvis UI / Voice
      │
      ▼
Reflex Router
      │
      ▼
Admonk policy/permission check
      │
      ▼
Typed allowlisted tool
      │
      ├── read-only → execute
      │
      └── consequential → approval → execute
      │
      ▼
n8n webhook/workflow
      │
      ▼
normalized status/result envelope
      │
      ▼
Jarvis state + workspace + audit receipt
```

### Minimum invocation envelope

Each lab action should carry, as applicable:
- correlation/run ID;
- tenant;
- user/membership;
- organizational scope;
- product/capability;
- tool/workflow key from an allowlist;
- action class;
- typed input schema/version;
- idempotency key for consequential writes;
- approval reference when required;
- requested timestamp;
- execution status;
- normalized result/error;
- source/evidence references;
- usage/cost telemetry;
- audit receipt.

Credentials stay server-side.

### Initial proof moments

Use three intentionally different tests:

1. **Morning / priority brief**
   - read-only;
   - proves context assembly + fast first value + progressive workspace.

2. **Investigation / diagnosis**
   - read-only analysis across evidence;
   - proves FAST → DEEP escalation, evidence-backed reasoning, charts/cards and dashboard drill-down.

3. **Controlled consequential action**
   - proves intent → permission → approval → n8n → result → audit.
   - must be allowlisted and reversible/low-blast-radius for the lab.

Existing n8n estate contains suitable low-risk/read-or-draft workflow candidates, but final pilot selection must respect the current Kalam App/Supabase population gate. Flows depending on incomplete people/contact data remain inactive until that data issue is resolved.

## 10. Jarvis Lab event contract — JX-02 minimum

JX-03 will decide the visual/motion language in detail.

JX-02 only requires enough event semantics to prove responsiveness.

Minimum state events:
- input_received;
- listening_started / listening_stopped where voice applies;
- route_selected;
- inference_started;
- first_output;
- tool_started;
- tool_finished;
- approval_required;
- approval_resolved;
- result_presenting;
- completed;
- failed;
- cancelled/interrupted where supported.

OpenJarvis already exposes agent/tool/inference lifecycle events that can inform this experiment.

The lab should normalize external/runtime-specific events into Admonk-owned state semantics rather than binding the product UI directly to one provider's event names.

## 11. Evaluation matrix

### Experience
Measure:
- interaction acknowledgement latency;
- first useful text latency;
- first useful audio latency;
- first useful workspace/evidence latency;
- completion latency;
- interruption/barge-in success;
- cancel success;
- visible-state correctness;
- user correction/retry rate.

### Quality
Measure:
- answer/task correctness;
- evidence/source correctness;
- whether the selected route was sufficient;
- unnecessary DEEP escalation;
- missed DEEP escalation;
- hallucinated action/progress claims;
- final outcome usefulness.

### Action reliability
Measure:
- permission decision correctness;
- approval enforcement;
- n8n execution success;
- duplicate-write prevention;
- error/fallback quality;
- audit receipt completeness.

### Economics
Measure:
- model/token/tool consumption;
- provider cost;
- Admonk credit estimate;
- retries/discarded-run cost;
- cost by route;
- cost per successful outcome.

### Technical
Measure:
- local vs cloud engine latency/quality where OpenJarvis is evaluated;
- WebSocket/SSE event delay;
- workflow callback delay;
- frontend render delay;
- CPU/RAM/GPU constraints for any local inference candidate.

## 12. Research questions — current answers

| Question | Current answer |
|---|---|
| Should every task use one heavyweight agent? | **No.** Route by task/authority/quality requirement. |
| Should every task finish within one fixed latency? | **No.** Separate acknowledgement, first useful value, progressive feedback and completion. |
| Should the UI react before the model responds? | **Yes.** Immediate visible response is a deterministic UI contract. |
| Can longer tasks still feel fast? | **Yes, if first value and truthful state/progress arrive early.** |
| Is Jarvis chat-only? | **No. JX-01 already locks conversation + dynamic workspace + dashboard.** |
| Is OpenJarvis the Jarvis product? | **No. It is a lab/runtime/evaluation candidate and pattern source.** |
| Is the exact OpenJarvis repo MIT? | **No. It is Apache-2.0.** |
| Should OpenJarvis own Admonk permissions/governance? | **No.** |
| Should OpenJarvis be the only voice stack? | **No.** Current lab direction separates realtime voice from OpenJarvis runtime experiments. |
| Can n8n be used now? | **Yes, as a controlled allowlisted lab action engine.** |
| Should Jarvis call arbitrary n8n workflows? | **No.** Typed allowlisted tools + policy/approval boundary first. |
| Should long tasks show fake progress percentages? | **No.** Use real phase/events and concrete partial results. |
| Does the Jarvis layer reopen M2-01…18? | **No.** It consumes them. |
| Does JX-02 replace M2-19? | **No.** They continue in parallel. |

## 13. Questions that require measured pilot evidence before JX-02 lock

Desk research cannot honestly answer these for Admonk/Kalam without running the lab:

1. Which concrete FAST-path model/engine meets the quality floor at the lowest latency/cost?
2. Are the working p50 ≤1s / p95 ≤2s first-useful targets realistic on target devices and Egypt network conditions?
3. What first-audio latency is actually achieved by the chosen realtime voice path?
4. Which router rules can stay deterministic, and where is semantic classification required?
5. What percentage of real Marketing tasks need FAST → DEEP escalation?
6. Which DEEP model/reasoning configuration gives the best quality/cost outcome by task class?
7. How quickly can n8n return meaningful status events for the selected workflows?
8. What interruption/cancel behavior is safe once an external action has crossed the execution boundary?
9. What is the best failure handoff when voice/realtime fails but the governed backend remains available?
10. Which OpenJarvis components earn reuse after measuring integration complexity, maintenance burden and quality gain?
11. What minimum telemetry gives useful evaluation without creating excessive tracing cost/noise?
12. Where should durable/background task execution live if later product evidence proves it necessary?

These remain deliberately open.

## 14. Immediate resume sequence

### Parallel Foundation
Continue:
**M2-19 — Version / Compatibility / Migration**

Jarvis does not block it.

### Jarvis
Continue:
**JX-02 — Voice / Realtime Speed & Quality**

Next work:
1. finish the provider/model/voice/routing comparison;
2. define the smallest Jarvis Lab interface/event/action contract;
3. choose three safe existing n8n pilot workflows;
4. run measured tests;
5. compare FAST / DEEP / ACTION outcomes;
6. revise latency/quality targets from evidence;
7. only then bring JX-02 to the owner for lock.

### After JX-02
Proceed in order:
- JX-03 — state/animation language;
- JX-04 — dynamic UI/workspace contract;
- JX-05 — department vs executive context;
- JX-06 — n8n pilot formalization;
- JX-07 — failure/fallback/evaluation;
- JX-08 — production integration gate.

Some JX-03/JX-04 observations will naturally emerge from the lab, but they must not be silently locked while JX-02 is active.

## 15. Marketing Hub impact

Marketing Hub remains in PDISC.

This Jarvis research affects Marketing Hub Product Definition in these ways:
- AI use cases should be expressed as domain capabilities Jarvis can invoke, not as a separate generic chat feature;
- Marketing dashboards remain durable structured surfaces;
- every Marketing capability intended for Jarvis needs authority, source/evidence, permission, action class and deep-link behavior;
- the Marketing Department Capability Map should identify which jobs are Jarvis-first, workspace-assisted, dashboard-first or mixed;
- eventual Marketing Hub Product Brief / MVP boundary must absorb the shared Jarvis contract without duplicating the shared implementation.

No Marketing Hub Production implementation is authorized by this checkpoint.

## 16. Sources reviewed for this checkpoint

### Canonical repositories
- `admonkstudio/admonk`
  - `AGENTS.md`
  - `docs/FOUNDATION-INDEX.md`
  - `docs/FOUNDATION-STATUS.md`
  - `docs/FOUNDATION-PROGRAM.md`
  - `docs/FOUNDATION-M2-OPERATING-BRIEF.md`
  - `docs/PRODUCT-PLATFORM-FOUNDATION.md`
  - `docs/AI-SUITE.md`
  - `docs/JARVIS-EXPERIENCE-DIRECTION.md`
- `admonkstudio/marketing-hub`
  - `AGENTS.md`
  - `docs/PROJECT-STATUS.md`
  - `docs/TASKS.md`
  - `docs/CURRENT-HANDOFF.md`
  - `docs/product/MARKETING-HUB-ARCHITECTURE.md`
  - `docs/strategy/marketing-hub-master-plan.md`
  - `docs/REQUIREMENTS-INBOX.md`

### Current external research
- OpenJarvis repository/license/docs:
  - https://github.com/open-jarvis/OpenJarvis
  - https://github.com/open-jarvis/OpenJarvis/blob/main/LICENSE
  - https://github.com/open-jarvis/OpenJarvis/blob/main/docs/user-guide/agents.md
  - https://github.com/open-jarvis/OpenJarvis/blob/main/docs/deployment/api-server.md
- OpenAI realtime/voice:
  - https://developers.openai.com/api/docs/guides/realtime
  - https://openai.github.io/openai-agents-js/guides/voice-agents/
  - https://openai.github.io/openai-agents-js/guides/voice-agents/build/
  - https://openai.github.io/openai-agents-js/guides/voice-agents/transport/
- Browser responsiveness:
  - https://web.dev/articles/inp
  - https://web.dev/articles/optimize-inp

## 17. Checkpoint lock statement

**Locked state remains locked. JX-02 itself is not locked.**

The durable continuation point is:

> **Keep FOUNDATION-M2 moving at M2-19 while continuing JX-02 research. Treat immediate visible feedback as required, route simple/deep/action work differently, use OpenJarvis selectively as a lab/evaluation runtime rather than the product authority, and use a small allowlisted n8n bridge to obtain real latency/quality/action evidence before locking JX-02.**

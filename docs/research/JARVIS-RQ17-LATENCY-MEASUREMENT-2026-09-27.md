# Jarvis Research Question 17 — Scientific Latency & Responsiveness Measurement

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** How do we measure Jarvis speed scientifically rather than treating one API duration as `latency`?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Performance/observability architecture research only.

## 1. Decision problem

Jarvis speed is experienced across several very different clocks:
- browser interaction response;
- routing/context assembly;
- source retrieval;
- model time-to-first-token/event;
- time-to-first-useful-value;
- workspace first render/hydration;
- voice turn response;
- governed action preparation and verification;
- durable/background task progress/completion.

A single `request took 3.2s` metric hides where time was spent and may reward the wrong optimization.

RQ-17 must define:
- latency vocabulary;
- measurement timestamps/spans;
- user-perceived vs backend latency;
- percentile/tail reporting;
- route/task-specific latency classes;
- regional/device/load segmentation;
- how quality and cost remain coupled to speed;
- which targets are locked versus still Lab hypotheses.

## 2. External research evidence

### Web responsiveness — next visual feedback is its own latency problem

Google's current INP guidance measures interaction responsiveness from user interaction until the browser can paint the next frame. A `good` web experience targets INP ≤200 ms at the 75th percentile, segmented by mobile/desktop. The guidance explicitly separates quick visual feedback from the later asynchronous effects of the interaction.

Sources:
- https://web.dev/articles/inp
- https://web.dev/articles/optimize-inp

This directly supports RQ-02's locked rule that Jarvis acknowledges normal interaction locally without waiting for AI/external systems.

### AI latency optimization — first token is not the only lever

OpenAI's current latency guidance emphasizes:
- fewer output tokens;
- fewer sequential requests;
- parallelization;
- streaming;
- making users wait less;
- not defaulting to an LLM when ordinary code suffices.

Source:
- https://developers.openai.com/api/docs/guides/latency-optimization

This strongly aligns with RQ-03/RQ-06/RQ-10: predetermined software/context/UI plans can be faster than asking AI first.

### Realtime voice — measure conversational responsiveness

OpenAI's current Realtime guidance recommends realtime/full-duplex voice when the experience needs low first-audio latency, natural turn-taking and barge-in.

Source:
- https://developers.openai.com/api/docs/guides/realtime

RQ-17 therefore treats voice turn gap and interruption-stop latency as first-class measurements, separate from text TTFT.

### Tail latency matters

Google SRE guidance warns that averages conceal latency distributions and recommends percentile-based indicators; p50 describes the typical case while p95/p99 expose slow-tail behavior that materially harms experience.

Source:
- https://sre.google/sre-book/service-level-objectives/

### Histograms preserve latency distributions

OpenTelemetry recommends Histograms for durations and percentile/distribution analysis, and notes that aggregatable histograms are more useful than fixed precomputed summaries for distributed systems.

Sources:
- https://opentelemetry.io/docs/specs/otel/metrics/api/
- https://opentelemetry.io/docs/specs/otel/metrics/data-model/

## 3. Core conclusion

> **Jarvis has a latency vector, not one latency number.**

Every meaningful task should distinguish at least:

```text
Interaction responsiveness
First visible acknowledgement
Task accepted/routed
First evidence/data
Model/provider first event
First useful value
Workspace useful render
User-blocking completion
Verified business completion
```

Different task classes optimize different clocks.

## 4. Primary user-facing clocks

### L0 — Interaction-to-visible-acknowledgement

From:
user click/tap/key/voice-control action

To:
next meaningful visible UI state acknowledging the input.

Examples:
- orb/focus state reacts;
- button enters pending/selected state;
- task shell appears;
- workspace begins transition.

Measurement:
- browser Event Timing / INP where applicable;
- explicit User Timing marks for Jarvis-specific interactions.

Locked target inherited from RQ-02:
> normal user interaction should acknowledge locally without waiting for AI/external systems, targeting **≤200 ms p75**.

Use field/RUM measurements segmented by device class.

### L1 — Time to First Useful Value (TTFUV)

From:
user commits the request / turn ends

To:
the first content/state that genuinely helps the user advance the task.

This is **not** automatically first token.

Examples:
- exact answer appears;
- first verified evidence point;
- useful comparison table starts with actual data;
- prepared-action summary is ready for review;
- Jarvis says a truthful limitation that changes the user's next step.

Existing RQ-02 Lab hypothesis remains:
- p50 ≤1s;
- p95 ≤2s;

for FAST-path/simple tasks.

These remain **Lab hypotheses, not Production SLA**, until measured on representative routes/regions/devices.

### L2 — Time to Useful Workspace

From:
task start

To:
S1/S2 surface contains enough real state/data to begin useful inspection/manipulation.

Separate:
- skeleton/first paint;
- first real component/data;
- workspace useful threshold.

A beautiful empty shell is not `useful workspace`.

### L3 — User-Blocking Completion

From:
task start

To:
the point where the user no longer needs to wait to continue their intended interaction.

For some tasks this equals final completion.

For durable tasks, this may instead be:
`task accepted and safely running in background`.

### L4 — Verified Outcome Completion

From:
task/action start

To:
highest verification level promised by the capability.

Example:
`Pause campaign`

Separate:
- prepared action ready;
- provider request accepted;
- provider state readback confirms paused.

RQ-07 remains authoritative: provider acknowledgment ≠ verified business completion.

## 5. Voice clocks

Voice needs its own timing model.

Measure at least:

```text
V0 input capture start
V1 user speech end / committed turn
V2 transcript/intent usable
V3 response generation starts
V4 first assistant audio available
V5 first assistant audio actually played
V6 response speech complete
```

Primary conversational metric:
> **Turn Gap = V5 - V1**

Also measure:
> **Barge-in Stop Latency = assistant audio stopped - user interruption detected/committed**

And:
- false turn-end rate;
- interruption success rate;
- premature response rate;
- code-switching impact;
- network/device effects.

Do not lock arbitrary numeric voice targets in RQ-17. Establish them through Jarvis Lab comparison + user testing because turn-taking quality depends on transport, VAD/semantic turn detection, model, language and device.

## 6. Backend critical-path clocks

Instrument the internal path so user-facing latency can be explained.

Candidate spans:

```text
request_received
task_contract
route_decision
surface_decision
context_plan
authorization_filter
context_retrieval[source]
connector_read[source]
decision_model
model_queue/provider_network
model_ttft
model_generation
tool_call[tool]
workspace_plan
workspace_validate
workspace_data_fetch
action_preflight
approval_wait
action_execute
action_verify
artifact_write
task_checkpoint
notification_delivery
```

Only the **critical path** determines elapsed wall-clock time; parallel spans must not be incorrectly summed.

## 7. Provider/model timing

For each model invocation capture when available:
- request queued/sent;
- provider response headers/acceptance;
- time to first event/token;
- time to first structured field/tool call where relevant;
- generation duration;
- completion time;
- input/output/cached token counts;
- reasoning/effort mode;
- prompt-cache status;
- retry/fallback timing.

TTFT is useful diagnostic data.

It is **not** the product's primary responsiveness metric because:
- the first token may be filler;
- structured output may not be usable yet;
- workspace/data may become useful before prose;
- deterministic/UI work may provide value before any model responds.

## 8. First Useful Value must be task-defined

Each important task/profile should define a `FirstUsefulValueContract`.

Examples:

```text
Task: exact KPI query
FUV: verified metric + period/source visible

Task: deep investigation
FUV: first verified evidence/findings block or meaningful phase output

Task: generate report
FUV: usable outline/data section, if progressive generation is genuinely useful

Task: consequential action
FUV: prepared action/review surface with exact target/parameters

Task: durable research
FUV: durable task accepted + first useful evidence/progress state
```

This prevents teams from gaming latency by streaming meaningless content.

## 9. Latency classes by Jarvis mode

Map performance measurement to RQ-02 responsiveness modes.

### R0 Reflex / local interaction
- primary: L0;
- target: ≤200ms p75 normal interactions;
- stretch/diagnostic: investigate p95/p99 and device-specific outliers.

### R1 Conversational
- primary: L0 + TTFUV;
- FAST Lab hypothesis: TTFUV p50 ≤1s, p95 ≤2s;
- also measure full response duration when user must wait for it.

### R2 Active Work
- primary: L0 + TTFUV + useful-workspace time;
- final completion is task-specific;
- progressive evidence/state must be truthful.

### R3 Extended Work
- primary while user blocks: local acknowledgement + time-to-durable-acceptance;
- background: time to first checkpoint/evidence, phase durations, completion distribution, deadline success;
- final completion not a conversational SLA.

### R4 External/Human Wait
- separate `active compute latency` from `dependency waiting time`;
- report wait reasons/durations but do not blame model/backend speed for human/provider waiting.

## 10. Latency budget tree

For every high-value route, maintain a budget/critical-path model.

Example:

```text
FAST KPI question

L0 UI ack             local/browser
route/context plan    software
data read             connector/domain
response synthesis    C0/C1
render                client
-------------------------------
TTFUV                 end-to-end critical path
```

For a deep task:

```text
parallel:
  context/source A
  context/source B
  workspace skeleton

then:
  deep reasoning
  evidence render
```

Optimization focuses on the largest critical-path contributors rather than arbitrary micro-optimizations.

## 11. Avoid averages

Required reporting:
- count/sample size;
- p50;
- p75 where UX/SLO relevant;
- p95;
- p99 for operational/tail diagnosis where volume supports it;
- max only as diagnostic, not product headline;
- success/failure/cancellation status.

Google SRE guidance supports this: averages can remain unchanged while tail latency materially worsens.

Do not report percentile estimates from tiny sample sizes as though statistically stable.

## 12. Histogram-based metrics

Use aggregatable duration histograms for major latency clocks/spans.

Benefits:
- preserve distribution shape;
- allow p50/p95/p99 queries after collection;
- aggregate across instances/regions more safely than precomputed summaries.

OpenTelemetry Histogram/ExponentialHistogram is the preferred standards direction unless later observability tooling gives a compelling alternative.

## 13. Distributed tracing

Metrics answer:
`Is latency healthy overall?`

Traces answer:
`Why was this task slow?`

Every important Jarvis task/call should correlate:
- task ID;
- RouteProfile/binding release;
- context plan;
- provider/model deployment;
- connector/tool calls;
- workspace planning/render event IDs;
- agent instances;
- action receipts;
- cache states;
- retries/fallbacks;
- result/failure category.

Do not expose sensitive prompts/business data indiscriminately in telemetry.

## 14. Metric dimensions

Segment latency where it can materially change:
- route/task class;
- R0/R1/R2/R3/R4 mode;
- product/domain;
- surface S0/S1/S2;
- provider/model deployment;
- region/runtime location;
- client geography at coarse approved level;
- device class/browser/platform;
- network class if available safely;
- cache hit/miss;
- cold/warm execution;
- success/degraded/failure;
- agent vs non-agent;
- context-size bucket;
- tool count bucket.

Avoid unbounded/high-cardinality metric labels such as raw user IDs, task IDs or full tenant IDs. Keep those in traces/log correlation where governed.

## 15. Cairo / regional measurement

The first operating tenant is in Egypt, so Jarvis Lab must include real/synthetic measurements from **Cairo/Egypt user conditions**, not only cloud-datacenter timings.

Recommended test matrix:
- Cairo desktop on realistic broadband;
- Cairo mobile/4G/5G where relevant;
- representative lower-performance device/browser;
- target cloud/runtime regions under consideration;
- later additional customer geographies as product expands.

Measure:
- client→edge/app RTT;
- provider/model path latency;
- connector/provider regional effects;
- asset/workspace load;
- voice media path.

Do not infer user experience from a benchmark executed next to the server.

## 16. Real-user + synthetic + controlled benchmark

Use all three.

### RUM / field
Captures real devices, networks, browsers, interaction patterns.

Best for:
- INP/L0;
- page/workspace render;
- end-to-end TTFUV;
- real regional/device tails.

### Synthetic
Stable recurring probes from known locations/configs.

Best for:
- regional regressions;
- provider/connector health;
- cold/warm comparisons;
- before/after releases.

### Controlled Lab benchmark
Repeatable test fixtures/tasks.

Best for:
- model/provider comparisons;
- routing/context architecture;
- voice architecture;
- concurrency/load;
- quality-latency-cost frontier.

No single mode replaces the others.

## 17. Cold vs warm performance

Track separately:
- cold application/runtime start;
- warm steady state;
- new connection vs reused connection;
- prompt cache hit/miss;
- source/data cache hit/miss;
- context-plan/workspace-plan cache hit/miss;
- first connector query after idle;
- model/provider warm variability.

Otherwise optimization may appear effective only because benchmarks accidentally measure warm caches.

## 18. Cache effectiveness

RQ-06/RQ-10/RQ-13 introduce several caches.

Measure:
- context-plan cache hit;
- workspace-plan cache hit;
- source-result cache hit;
- provider prompt-cache hit;
- avoided AI calls;
- milliseconds saved;
- quality/freshness impact;
- invalidation/replan rate.

A cache is valuable only if it improves successful outcomes without stale/incorrect behavior.

## 19. Parallelism measurement

Record:
- total elapsed wall time;
- each branch duration;
- critical branch;
- queue/concurrency wait;
- cancelled/speculative work;
- wasted token/cost from losing speculative branches.

Parallelization may reduce latency while increasing cost; RQ-18 will evaluate that tradeoff.

## 20. Load / concurrency

Latency must be tested at realistic concurrency, not only one request at a time.

Measure:
- latency distribution vs concurrent users/tasks;
- queue wait;
- provider rate-limit effects;
- connector contention;
- DB/cache contention;
- worker saturation;
- voice session concurrency;
- durable-task backlog.

Report throughput and latency together.

A low p50 at zero load is not a scalability claim.

## 21. Failure latency

RQ-15 implies another critical metric:

> **Time to Helpful Failure / Recovery State**

When success is impossible, measure how quickly Jarvis:
- detects the issue;
- stops futile retries;
- exposes degraded/waiting/intervention state;
- provides a valid next step.

A fast truthful limitation may be better UX than 30 seconds of hidden retries.

## 22. Durable/background latency

Do not judge R3 tasks only by total wall-clock completion.

Track:
- time to durable acceptance;
- time to first checkpoint;
- time to first evidence/artifact;
- per-phase duration;
- active compute time;
- external/human wait time;
- retry/recovery time;
- completion p50/p95 by task type;
- deadline/on-time success;
- notification delay after attention/completion state.

This distinguishes a slow provider wait from inefficient Jarvis execution.

## 23. Quality-adjusted latency

Speed cannot be evaluated independently from RQ-16.

Compare routes/models only among outputs that meet the required quality floor.

Preferred optimization objective:

> **latency distribution per successful quality outcome**

not:
`fastest response regardless of correctness`.

Examples:
- 700ms answer with 70% success may be worse than 1.1s answer with 96% success;
- 10s deep result may beat 3s result if only the 10s route meets evidence/quality requirements;
- immediate local feedback still makes the longer route feel responsive.

## 24. Latency-adjusted economics

RQ-18 will combine:
- successful quality outcome;
- latency class;
- raw provider/tool cost;
- Admonk credits/commercial economics.

RQ-17 therefore records enough timing/resource metadata to construct a **quality–latency–cost frontier**.

Do not prematurely optimize one axis in isolation.

## 25. Client rendering / animation performance

The evolving immersive Jarvis design makes frontend performance part of AI latency perception.

Measure:
- INP;
- long tasks/main-thread blocking;
- frame/render timing during semantic transitions;
- workspace first content/useful render;
- animation frame drops/jank;
- reduced-motion path;
- low-power/mobile performance;
- GPU/CPU/memory cost for 3D/graph effects if introduced.

The design-reference direction must not sacrifice RQ-02 immediate agency.

A beautiful reactive environment that blocks input is a product failure.

## 26. Design reference implication

Owner-selected REF-001 emphasizes an environment that reacts to cursor/presence and transitions spatially.

RQ-17 requirement:
- visual reaction must happen on the local/client path where possible;
- never wait on model/network merely to acknowledge focus/pointer/task initiation;
- instrument semantic transition/render latency separately from AI latency;
- prototype 3D/graph motion on representative low/mid devices before design lock.

## 27. Performance release gates

Once route-specific baselines are measured, material changes should be evaluated for:
- p50 regression;
- p95 regression;
- p99/tail regression where sample size supports it;
- L0/INP regression;
- TTFUV regression;
- quality-adjusted latency;
- cold/warm behavior;
- regional/device regressions.

Do not lock one universal percent-regression threshold in RQ-17; set thresholds per route after baseline variance is known.

RQ-16 release evidence should carry the latency release/baseline reference.

## 28. Initial Jarvis Lab measurement set

Minimum Lab instrumentation:

```text
Client
- interaction input timestamp
- next visible acknowledgement
- workspace first paint
- workspace first real data
- workspace useful state

Task/runtime
- task received/accepted
- routing/context plan
- each retrieval/tool span
- model request/TTFT/complete
- first useful value event
- task/checkpoint/complete

Voice
- user turn end
- first audio play
- interruption detected
- assistant audio stopped

Outcome
- RQ-16 quality/pass result
- usage/cost
- failure/degraded status
```

## 29. What remains hypothesis vs locked

### Locked/externally grounded
- local visible interaction must not wait on AI/external work;
- R0 target ≤200ms p75 from RQ-02;
- percentile/distribution measurement over averages;
- first useful value is distinct from first token;
- latency is route/task specific;
- field + synthetic + controlled tests;
- quality floor precedes speed optimization.

### Still Lab hypothesis
- FAST path TTFUV p50 ≤1s / p95 ≤2s;
- exact voice turn-gap target;
- exact deep-task progressive-output targets;
- exact Cairo/regional SLOs;
- exact route-specific p95/p99 release thresholds;
- exact rendering/animation budgets beyond the INP interaction target.

Promote these only after representative measurement/usability evidence.

## 30. Recommended lock

> **RQ-17 — Multi-Clock, Percentile-Based Latency Architecture**
>
> Jarvis does not have one latency number. It measures a **latency vector** spanning interaction acknowledgement, time-to-first-useful-value, useful workspace, user-blocking completion, verified outcome completion, voice turn-taking and durable/background progression.
>
> RQ-02's local interaction target remains **≤200 ms p75** for normal interaction acknowledgement. FAST-path TTFUV **p50 ≤1s / p95 ≤2s remains a Jarvis Lab hypothesis**, not a Production SLA.
>
> `First Useful Value` is defined per task/profile and cannot be gamed by first-token streaming, empty skeletons or meaningless progress text.
>
> Voice measures user-turn-end → first-audio-play and barge-in stop latency separately; exact voice targets require Lab/user testing.
>
> Instrument end-to-end work with distributed traces and aggregatable duration histograms. Report distributions—especially p50/p75/p95 and p99 where sample size supports it—rather than averages alone.
>
> Measure both real-user field performance and controlled/synthetic performance, including Cairo/Egypt user conditions for the first operating tenant. Cloud-datacenter benchmark latency is not accepted as user-experience latency.
>
> Segment cold/warm, cache hit/miss, route, surface, provider/model, region, device/network class, success/degraded/failure and relevant task characteristics while avoiding unbounded metric-cardinality/privacy leakage.
>
> Optimize the end-to-end **critical path**. Parallel spans are measured independently and not incorrectly summed.
>
> Provider/model TTFT is a diagnostic metric, not the product's primary success metric. Jarvis optimizes user-visible first useful value and truthful continuity.
>
> R3 durable work measures time-to-acceptance, first checkpoint/evidence, phase duration, active compute vs external wait and completion distribution rather than pretending all background tasks have one conversational SLA.
>
> Frontend rendering/motion is part of Jarvis perceived performance. Immersive/3D/semantic interactions must preserve local responsiveness and be benchmarked on representative devices.
>
> Latency comparisons are meaningful only for outputs meeting the RQ-16 quality floor. The core optimization unit is **latency distribution per successful quality outcome**.
>
> **Measure what the user actually waits for, trace where that time goes, and optimize the critical path without trading away quality or truth.**

## 31. Recommendation

**LOCK RQ-17 as written.**

This gives RQ-18 a rigorous timing foundation for sustainable AI economics and gives the design track measurable performance constraints.
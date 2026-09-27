# Jarvis Research Question 02 — Responsiveness, Waiting & Progressive Work

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** What should feel instantaneous, and what may legitimately take time?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/experience architecture research only.

## 1. Decision problem

Jarvis must feel exceptionally responsive without degrading reasoning quality, hiding legitimate work, fabricating progress or forcing every task through an expensive realtime path.

The problem is therefore not:
"How do we make every task complete instantly?"

It is:
"How do we guarantee immediate agency and useful early feedback while allowing the actual task to take the time required for a correct, safe outcome?"

## 2. Research evidence

### Browser responsiveness

Google's current Interaction to Next Paint guidance defines <=200 ms at the 75th percentile as "good" interaction responsiveness. INP measures the time from user interaction until the browser can present the next visual frame.

Sources:
- https://web.dev/articles/inp
- https://web.dev/articles/optimize-inp

Implication:
The first acknowledgement of a user action must be owned locally by the Jarvis client/UI. It must not wait for a model, tool, network call or workflow.

Google's INP guidance also demonstrates that long work on the main browser thread can prevent even an already-requested UI update from painting. Expensive work must not block the first visual response.

### Human response-time research

The classic Nielsen/Miller/Card human-computer-interaction guidance remains useful as a qualitative model:
- around 0.1 s feels effectively immediate;
- around 1 s generally preserves conversational/task flow;
- around 10 s is where attention becomes difficult to hold without richer progress/support.

Source:
- https://www.nngroup.com/articles/response-times-3-important-limits/

These are human-factors rules of thumb, not Jarvis production SLAs.

### Long waits and complex work

NN/g guidance for complex applications recommends meaningful progress/state during long-running processing and allowing lengthy work to continue in the background so users can do something else. When precise percent completion cannot be known, step/phase progress is preferable to an uninformative spinner.

Source:
- https://www.nngroup.com/articles/designing-for-waits-and-interruptions/

Implication:
Jarvis should show truthful semantic phases/partial work, and long tasks should become resumable/background tasks rather than trap the user in the conversation surface.

### Realtime voice

OpenAI's current Realtime guidance explicitly positions speech-to-speech Realtime sessions for conversational/immediate interaction, low first-audio latency, natural turn taking, barge-in and realtime tool use. Browser WebRTC is the recommended starting point when raw audio transport does not need to be managed manually.

Sources:
- https://developers.openai.com/api/docs/guides/realtime
- https://openai.github.io/openai-agents-js/guides/voice-agents/
- https://openai.github.io/openai-agents-js/guides/voice-agents/build/
- https://openai.github.io/openai-agents-js/guides/voice-agents/transport/

Implication:
Voice needs a dedicated realtime interaction path. It should not wait for a slow deep-reasoning pipeline before acknowledging/listening/responding.

### Streaming and background work

OpenAI's current Responses API supports streaming partial output and a background mode for work that may take minutes, including resumable event streaming and cancellation. OpenAI's Deep Research guidance recommends background mode for long-running research.

Sources:
- https://developers.openai.com/api/docs/guides/streaming-responses
- https://developers.openai.com/api/docs/guides/background
- https://developers.openai.com/api/docs/guides/deep-research

Implication:
Foreground conversation, streaming work and durable/background work should be treated as different execution modes rather than one universal request lifecycle.

## 3. Core conclusion

Jarvis needs **four separate clocks**.

### Clock A — Interaction acknowledgement

Question:
"Did Jarvis visibly/hearably react to me?"

Owner:
Local client/interface.

Examples:
- pressed submit → prompt visibly accepted;
- tapped microphone → listening state begins;
- clicked approve → control acknowledges the action;
- changed a filter → focused workspace acknowledges it.

Recommended target:
**<=200 ms at p75 for normal user interactions**, aligned with current good INP guidance.

This is a frontend responsiveness requirement, not an AI SLA.

The experience should attempt to feel closer to immediate where feasible, but 200 ms p75 is the measurable baseline.

### Clock B — First useful value

Question:
"How soon did Jarvis give me something that actually advances the task?"

This is not the same as first token.

Examples:
- first useful sentence;
- first meaningful spoken response;
- first verified evidence card;
- first actionable finding;
- first populated part of a workspace.

Direction:
Jarvis should optimize time-to-first-useful-value, not merely time-to-first-token.

Working FAST-path Jarvis Lab hypothesis remains:
- p50 <=1 s;
- p95 <=2 s.

These values are **pilot SLO hypotheses, not yet a locked Production SLA**. They require target-device/network/model measurement.

### Clock C — Progressive work feedback

Question:
"If the result is not ready yet, do I understand what Jarvis is genuinely doing and can I keep acting?"

Jarvis should expose truthful semantic state such as:
- understanding;
- locating relevant capability/context;
- retrieving evidence;
- comparing;
- analyzing;
- waiting for permission;
- waiting for approval;
- executing;
- waiting on external system;
- validating result;
- preparing workspace;
- retrying;
- blocked;
- failed.

Where useful, partial verified results should appear before the whole task completes.

Rules:
- do not fabricate percent completion;
- do not show fake model chain-of-thought;
- do not continually emit low-value status chatter;
- prefer changes that correspond to real lifecycle events or completed sub-results;
- provide cancellation/interruption where the underlying operation safely supports it;
- after consequential execution has crossed a point of no return, the UI must clearly distinguish "stop waiting" from "cancel action."

### Clock D — Outcome completion

Question:
"When is the actual requested outcome finished?"

There is **no universal Jarvis completion SLA**.

Completion time should depend on the job:
- simple local/UI operation;
- quick answer/retrieval;
- deeper reasoning;
- multi-source investigation;
- external workflow;
- long-running research;
- action waiting for human approval;
- action waiting for third-party systems.

The quality/safety requirement must not be weakened simply to make Clock D shorter.

## 4. Five responsiveness modes

A time-only classification is insufficient. Jarvis should choose an interaction mode based on expected duration, task semantics and whether the user can receive partial value.

### R0 — Reflex

Typical duration:
immediate client/UI work.

Contract:
- visible response <=200 ms p75;
- never wait for AI/network if acknowledgement can be local.

Examples:
- user input accepted;
- microphone active;
- navigation focus;
- action button state;
- semantic zoom/focus begins.

### R1 — Conversational

Typical:
simple FAST answer or realtime voice turn.

Contract:
- continuous conversational flow;
- stream useful output;
- voice supports interruption/barge-in;
- optimize first useful value.

Lab:
measure p50/p95 first useful text/audio separately.

### R2 — Active work

Typical:
seconds-long retrieval, reasoning, tool call or workflow.

Contract:
- keep interaction surface alive;
- show real phase/state;
- progressively expose useful verified results when available;
- allow user to inspect already-returned content while remaining work continues.

Do not trap the UI behind a blocking overlay.

### R3 — Extended work

Typical:
longer than normal conversational patience or unpredictably long.

Contract:
- create a named/resumable task;
- show completed/current/remaining semantic phases when knowable;
- user may leave the immediate Jarvis surface;
- preserve task state;
- provide completion notification or return point;
- partial outputs/artifacts may remain inspectable.

Do not require the user to stare at Jarvis.

### R4 — Externally waiting / human gated

Typical:
approval, provider queue, external system, another person's input.

Contract:
- distinguish waiting from computing;
- identify the dependency plainly;
- preserve task state;
- notify/continue when the dependency resolves;
- do not pretend Jarvis is "thinking."

## 5. Response-mode escalation

The starting route does not have to predict duration perfectly.

Example:

```text
R1 conversational
  ↓ retrieval proves deeper work needed
R2 active work
  ↓ work becomes long/unpredictable
R3 resumable task
  ↓ requires approval/external dependency
R4 waiting
  ↓ dependency resolves
R2 active work
  ↓
completed
```

Experience continuity must survive these transitions.

## 6. The circle / connected-project interaction hypothesis

The owner proposed that the Jarvis circle could represent the larger connected environment of projects, products, automations and connections, then visually zoom/focus into the exact connection involved in the current request.

This is recorded separately as:
`docs/research/JARVIS-INTERACTION-GRAPH-HYPOTHESIS-2026-09-27.md`

RQ-02 consequence:
This concept is promising because it can satisfy the **acknowledgement and meaningful-state** requirements without using a static spinner.

A user request could immediately change spatial focus before the backend result exists:

```text
Connected environment
      ↓ input acknowledged locally
Marketing highlighted
      ↓
Campaign Analytics capability focused
      ↓
Meta + GA4 evidence path becomes active
      ↓
Evidence/workspace appears progressively
```

However, the visual/interaction grammar must remain a JX-03/JX-04 research question. RQ-02 locks only the requirement that state feedback be meaningful and semantically connected to the work.

## 7. Important UX rule: visible reaction is not fake progress

Jarvis may immediately animate/focus because the user has selected or requested something. That is truthful acknowledgement.

It may not imply:
- a source has been queried when it has not;
- an agent has completed analysis when it has not;
- an action has executed when it has only been proposed;
- 60% completion when no defensible progress estimate exists.

Therefore Jarvis state should distinguish at least:
**acknowledged → routed → working → waiting/gated → presenting → completed/failed.**

More detailed provider/runtime events may exist internally but should be normalized into Admonk-owned user semantics.

## 8. Voice-specific rule

Voice and deep work should be decoupled.

For conversational voice:
- realtime session maintains natural turn-taking;
- immediate listening state;
- interruption/barge-in supported;
- short replies may remain entirely on the realtime path.

For deeper work:
- voice acknowledges the request quickly;
- task can delegate to DEEP/ACTION;
- Jarvis can continue with concise spoken progress where useful while the dynamic workspace carries richer evidence;
- the user should be able to interrupt or switch to text/workspace without losing context.

Do not force the deepest reasoning model to sit synchronously in every voice turn.

## 9. Long-task rule

When the task exceeds the immediate interaction contract, Jarvis should progressively shift from **conversation** to **task**.

The user should eventually be able to:
- leave;
- return;
- inspect partial work;
- know what is blocking;
- cancel when safe;
- receive completion/failure status;
- resume from the resulting artifact/resource.

Exact durable-job infrastructure is intentionally deferred to the later long-running-task research question.

## 10. What we should measure in Jarvis Lab

At minimum:

### Frontend
- input → first paint/state;
- state event → rendered state;
- main-thread blocking;
- p50/p75/p95 INP on target devices.

### Text
- request → first model event;
- request → first useful text;
- request → first verified evidence;
- request → final answer.

### Voice
- end-of-user-turn → first audio;
- interruption recognition;
- response stop latency;
- mistaken turn-boundary rate.

### Workflows
- request → tool start;
- tool start → first meaningful execution status;
- tool completion → UI presentation;
- end-to-end completion.

### Long work
- time until task conversion/backgrounding;
- successful resume rate;
- notification/result-return success;
- user abandonment/retry rate.

### Quality
Always measure speed alongside:
- correctness;
- evidence correctness;
- action reliability;
- unnecessary retries/escalations;
- user corrections.

A lower latency that reduces the approved quality floor is not an improvement.

## 11. Recommended lock

> **RQ-02 — Jarvis Responsiveness Contract**
>
> Jarvis must acknowledge normal user interaction locally and visibly without waiting for AI or external systems, targeting good browser responsiveness (<=200 ms p75).
>
> Jarvis optimizes **time-to-first-useful-value**, not merely first-token latency. FAST-path p50 <=1 s / p95 <=2 s remains a Jarvis Lab hypothesis until measured on target environments.
>
> Work that legitimately takes longer must expose truthful semantic state and progressively return useful verified output where possible. Jarvis must never fabricate progress.
>
> Long or unpredictable work transitions from synchronous conversation into a resumable task/background experience so users are not trapped waiting.
>
> Voice uses a realtime interaction path for natural turn-taking and interruption while deeper reasoning/actions may execute through delegated backend routes.
>
> No universal task-completion SLA is imposed: required quality, authority and safety govern completion time.
>
> **The product promise is immediate agency, early useful value and truthful continuity—not artificial instant completion.**

## 12. Recommendation

**LOCK RQ-02 at the principle/interaction-contract level.**

Do **not** yet lock:
- p50/p95 model latency as Production SLA;
- specific realtime/model provider;
- exact visual state language;
- interaction-graph design;
- durable task runtime;
- router thresholds.

Those require Jarvis Lab evidence or later research questions.

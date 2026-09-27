# Jarvis Research Question 14 — Durable Long-Running Task Architecture

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** How should Jarvis execute work that survives beyond one request, one connection or one worker process?  
**Status:** LOCKED — OWNER ACCEPTED  
**Implementation authority:** None. Product/runtime architecture research only.

## 1. Decision problem

RQ-02 already locks the UX principle:
- immediate local acknowledgement;
- early useful value;
- truthful progressive state;
- resumable background experience for long/unpredictable work;
- explicit external/human waiting states.

RQ-07 already locks governed actions, idempotency, partial failure and compensation.

RQ-10 already locks durable task/session state outside the model context window.

RQ-14 now defines the execution contract when work:
- takes minutes or hours;
- survives browser/voice disconnects;
- waits for approvals or external systems;
- spans multiple model/tool/provider calls;
- requires retries/checkpoints;
- survives worker/service crashes;
- is resumed later;
- produces progressive UI/notifications;
- must not repeat completed side effects.

## 2. External research evidence

### OpenAI Background Mode — useful provider primitive, not application durability

OpenAI Background Mode supports long-running Responses that execute asynchronously, can be polled, can stream with a resumable event cursor, and can survive client connection loss.

However, it remains a provider-specific model execution with provider-specific storage/retention rules.

Sources:
- https://developers.openai.com/api/docs/guides/background
- https://developers.openai.com/api/docs/guides/your-data

Conclusion:
> Use provider background execution where useful behind RQ-13 adapters, but never make a provider response ID the canonical Jarvis task.

### Temporal — durable execution by persisted history and replay

Temporal's current documentation demonstrates the core durable-execution pattern:
- workflow state/progress is persisted in event history;
- workers can crash/restart and another worker reconstructs state through replay;
- external/non-deterministic work runs as Activities;
- retries do not require restarting completed workflow progress;
- long activities can heartbeat/checkpoint;
- signals/updates/timers can resume workflow progress.

Sources:
- https://docs.temporal.io/tasks
- https://docs.temporal.io/workflow-definition
- https://docs.temporal.io/ai

Temporal is a reference architecture/candidate technology only. RQ-14 does not select a workflow-runtime vendor.

### AWS Step Functions — explicit wait/callback/retry semantics

AWS Step Functions independently validates several durable-work patterns:
- request/response vs wait-for-job vs callback/wait-for-external-event;
- human/external callback tasks can pause execution;
- retry/catch/timeouts are explicit state-machine semantics;
- heartbeats prevent indefinitely stuck external work.

Sources:
- https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html
- https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html
- https://docs.aws.amazon.com/step-functions/latest/dg/sfn-best-practices.html

## 3. Core conclusion

> **A long-running Jarvis task is an Admonk-owned durable state machine/task record. Model calls, agents, connector operations and external waits are steps inside that task—not the task itself.**

Therefore:

```text
Jarvis Task
  ├ task identity/state
  ├ objective
  ├ context/resource refs
  ├ steps/checkpoints
  ├ approvals/waits
  ├ artifacts/results
  ├ retries/errors
  ├ usage/cost
  └ audit/provenance

Provider model call
Agent instance
Connector action
Human approval
Timer
External callback

= child execution/step of the Jarvis Task
```

## 4. Do not make every request durable

Durability has cost/latency/operational overhead.

Use the lightest execution mode that meets the task's reliability needs.

### Foreground execution

Suitable when:
- one/few quick operations;
- no meaningful side effect or long external wait;
- easy safe retry from the request;
- losing intermediate progress is inconsequential.

Examples:
- deterministic calculation;
- quick read/query;
- fast explanation;
- simple one-shot generation.

### Durable task execution

Promote/create a durable task when any materially applies:
- work may outlive the client/request;
- user should be able to leave and return;
- multiple dependent steps have meaningful completed progress;
- consequential action is involved;
- human approval/external callback is required;
- long model/agent execution must survive timeout/disconnect;
- partial results/artifacts should persist;
- retrying from the beginning would be expensive/risky;
- task should notify on completion/failure.

Time alone is not the only trigger.

A 30-second consequential multi-step action may deserve durability; a 60-second read-only model response may be adequately handled by a provider background primitive plus a task shell.

## 5. Task identity

Every durable task has a stable Admonk-owned ID independent of:
- browser session;
- voice connection;
- provider response ID;
- model/provider;
- worker process;
- agent instance;
- connector request.

Candidate:

```text
JarvisTask
  task_id
  tenant_id
  initiating actor/delegator
  operating lens/scope
  task_type/profile + version
  objective
  status
  current_phase/step
  parent_task_id?
  resource/artifact refs
  context-plan ref/version
  workspace ref/version
  created/started/updated/completed timestamps
  deadline/expiry if applicable
  cancellation state
  notification policy
  usage/cost totals
  trace/audit refs
```

## 6. Canonical task states

Keep task status semantically meaningful.

Recommended top-level states:

```text
QUEUED
RUNNING
WAITING_INPUT
WAITING_APPROVAL
WAITING_EXTERNAL
PAUSED
CANCEL_REQUESTED
CANCELLING
PARTIALLY_COMPLETED
COMPLETED
FAILED
COMPENSATING
COMPENSATED
REQUIRES_INTERVENTION
CANCELLED
```

Do not show fake percentage progress unless the underlying workflow has a measurable bounded unit.

Use semantic phase/state:
- `Retrieving evidence`;
- `Comparing channels`;
- `Waiting for approval`;
- `Verifying provider state`.

## 7. Task step contract

A durable task is composed of versioned steps.

Candidate:

```text
TaskStep
  step_id
  task_id
  step_type
  definition/version
  status
  input refs/hash
  output/artifact refs
  operation/idempotency ref
  attempt
  retry policy
  timeout
  heartbeat/checkpoint policy
  started/finished timestamps
  error class
  usage/cost
  trace refs
```

Step types may include:
- deterministic computation;
- model invocation;
- agent instance;
- governed capability/action;
- connector read/sync/action;
- approval wait;
- external callback;
- timer/wait;
- artifact generation;
- verification/readback.

## 8. Durable orchestration must be deterministic at the control layer

Durable execution engines such as Temporal require workflow control logic to be replay-safe/deterministic while external/non-deterministic work is isolated into activities.

Admonk should preserve that architectural principle even if another runtime is chosen:

```text
DURABLE CONTROL LOGIC
- task transitions
- retry decisions
- wait/resume conditions
- compensation order
- completion rules

        ↓ invokes

NON-DETERMINISTIC STEPS
- LLM/model calls
- agents
- provider APIs
- database/connector operations
- web research
- external services
```

Do not recompute a past model decision during replay as though it were deterministic.

Persist/record the output needed to continue.

## 9. Checkpointing

Checkpointing should happen at **meaningful durable boundaries**, not after every token.

Checkpoint after:
- expensive evidence retrieval completed;
- a model/agent subtask produced a reusable result;
- an artifact version was saved;
- a provider action was committed/verified;
- approval was received;
- a major task phase completed;
- an external callback changed task state.

Checkpoint should preserve:
- current phase;
- completed step outputs/refs;
- pending step(s);
- durable task context/decisions;
- operation/idempotency IDs;
- approval/action state;
- artifacts/evidence refs.

## 10. Model calls inside durable tasks

Provider background execution may be used for one long model step.

Pattern:

```text
Admonk Task Step
     ↓
Provider background response
     ↓
provider response id stored as step metadata
     ↓
poll/stream/resume as supported
     ↓
normalize completed result into Admonk task state
```

If provider state expires/fails, Admonk still has the durable parent task and can retry/rebuild context according to RQ-13.

## 11. Agent instances inside durable tasks

RQ-12 Agent Instances are child executions of a durable task.

```text
Jarvis Task
  ↓
Agent Instance
  ↓ adaptive tool/model loop
  ↓
AgentResult + artifacts/evidence refs
  ↓
Jarvis Task continues
```

Agent runtime may checkpoint internally where needed, but the parent task must not depend on hidden agent memory as its only state.

## 12. Human approval / external wait

Waiting is a first-class task state, not a failed request.

Example:

```text
RUNNING
  ↓
Prepared Action
  ↓
WAITING_APPROVAL
  ↓ user returns later
approval callback
  ↓
RUNNING
  ↓
execute + verify
  ↓
COMPLETED
```

The same `task_id` continues.

Do not start a new conversational task merely because approval happened later.

External systems use the same pattern:
- webhook/callback;
- provider job completion;
- import finishing;
- requested user input.

## 13. Wait tokens / correlation handles

Every external wait should have a scoped correlation handle tied to:
- task;
- step;
- tenant;
- expected callback/event type;
- expiry;
- one-time/replay policy.

Callbacks must be authenticated/validated and idempotent.

Do not expose internal durable-runtime tokens directly to untrusted clients when a safer Admonk callback token/endpoint can mediate them.

## 14. Heartbeats

Long external/worker steps should heartbeat when the runtime needs to distinguish:

`still working`

from:

`worker died/stalled`.

Heartbeat may carry a lightweight progress/checkpoint reference.

If heartbeat stops:
- mark attempt timed out/stalled;
- retry/resume according to policy;
- do not immediately duplicate external side effects.

Provider/action idempotency from RQ-07 remains mandatory.

## 15. Retry taxonomy

Do not retry all failures equally.

Classify at least:

### Transient
- timeout;
- connection reset;
- rate limit;
- temporary provider outage.

→ bounded retry/backoff.

### Authentication/configuration
- expired authorization;
- missing scope;
- connector misconfiguration.

→ pause/degrade; request repair rather than blind retry.

### Validation/business
- invalid target;
- policy rejection;
- insufficient permission;
- unsupported action.

→ no automatic retry until input/state changes.

### Model quality/contract
- schema validation failed;
- insufficient evidence;
- model output unusable.

→ route-specific retry/escalation/fallback under RQ-13.

### Permanent external side-effect uncertainty
- provider may have committed but response was lost.

→ reconcile/read back using operation/idempotency/resource state before any retry.

## 16. At-least-once reality / effectively-once business behavior

Distributed workers/messages may execute attempts more than once.

Therefore do not promise literal exactly-once execution across external systems.

Instead aim for:

> **effectively-once business behavior through stable operation IDs, idempotent steps, deduplication and verification.**

Temporal documentation uses a similar effectively-once framing for Activity scheduling despite multiple execution attempts.

RQ-07 remains the source of truth for real-world mutation safety.

## 17. Cancellation

Cancellation is cooperative and state-aware.

Top-level request:

```text
CANCEL_REQUESTED
```

Then task determines:
- cancel unstarted steps;
- signal running model/provider/agent calls where supported;
- stop retry loops;
- ask long-running workers to stop at safe boundary;
- preserve already completed results;
- compensate already-committed reversible work only when policy/user request calls for it.

Cancellation does not mean time travel.

Distinguish:
- cancel remaining task;
- stop current generation;
- undo/compensate completed action;
- simply stop watching/close UI.

## 18. Pause vs waiting vs cancel

Keep distinct:

### PAUSED
Admonk/user intentionally suspends further progress despite no missing dependency.

### WAITING_INPUT / APPROVAL / EXTERNAL
Progress is blocked on a named dependency.

### CANCELLED
No further execution is expected; completed effects remain unless separately compensated.

This distinction improves UX, operations and audit.

## 19. User leave / return

The user should be able to close the page, lose voice/network, or switch products without losing durable work.

On return, Jarvis can reconstruct:
- current status;
- what completed;
- what is waiting;
- important intermediate findings;
- artifacts/workspace;
- next available action.

Recommended experience:

```text
Jarvis Tasks
  Investigation: Recruitment CPL
  Status: Waiting for approval
  Updated: 18:42

  [Open task]
```

Persistent Jarvis panel may show active/recent tasks contextual to the current product.

## 20. Progressive workspace state

RQ-06 S1 workspace should bind to durable task state.

```text
Task event/state update
      ↓
workspace data/state update
      ↓
voice/conversation concise notification if relevant
```

UI can reconnect and request current task snapshot + events since cursor.

Do not require the original streaming connection to remain alive.

## 21. Event stream / resume cursor

Expose task progress through a normalized Admonk event stream.

Candidate events:
- task.started;
- phase.changed;
- step.started;
- evidence.available;
- artifact.updated;
- approval.required;
- action.executing;
- action.verified;
- step.failed;
- task.waiting;
- task.completed;
- task.failed;
- task.cancelled.

Clients maintain a cursor/sequence.

On reconnect:

```text
GET current snapshot
+ events after cursor
```

Provider-native streaming cursors may feed this system but do not replace it.

## 22. Notifications

M2-13 Shared Notification Plane should handle durable-task attention/completion.

Examples:
- ACTION_REQUIRED — approval/input needed;
- ACTIVITY — meaningful progress/update;
- REQUIRED — security/critical failure where applicable;
- DIGEST — batch background-task summary.

Task/domain defines notification meaning/deep link.

Shared notification plane handles delivery/preferences/quiet hours.

Do not spam the user for every internal step.

## 23. Long tasks and credits/budgets

Durable tasks can outlive one request and consume substantial AI/tool resources.

Before/while executing, enforce:
- per-task credit/budget envelope;
- model/tool spend limits;
- runtime/time limits;
- agent sub-budget limits;
- tenant/product budgets;
- provider hard ceilings.

If budget is reached:
- pause/request user approval/top-up where allowed;
- degrade according to explicitly approved route policy;
- or fail with a clear state.

Do not let a background task silently run indefinitely.

## 24. Concurrency and duplicate task creation

Prevent accidental duplicate high-cost tasks.

Potential mechanisms:
- task-level deduplication key for identical explicit requests where appropriate;
- semantic/request signature only as a hint, not authority;
- resource locks/version checks for conflicting mutations;
- show existing running task and let user intentionally start another if distinct.

Never deduplicate two consequential user actions merely because their text is similar.

## 25. Task hierarchies

A parent durable task may contain child tasks when there is a meaningful independent lifecycle.

Example:

```text
Company investigation
  ├ Marketing analysis child task
  ├ Recruitment analysis child task
  └ Synthesis
```

Use child tasks only when they need:
- independent retry/lifecycle;
- parallelism;
- separate monitoring/artifact;
- resumability.

Do not split every small step into a child workflow/task.

RQ-12 multi-agent criteria still apply; child task does not imply agent.

## 26. Versioning of running tasks

Long-running tasks may survive deployments.

Therefore task definitions need versions.

Rules:
- running task records preserve definition/version used;
- compatible workers/runtimes must remain able to resume it;
- breaking task definition changes require migration/compatibility strategy;
- do not silently reinterpret an in-flight approved action under new semantics;
- new tasks use the new version after promotion.

This feeds directly into active Foundation M2-19.

## 27. Durable artifacts, not giant task payloads

Do not store every large document/result inline in the durable orchestration history/state.

Store large outputs in their proper artifact/evidence/domain storage and keep:
- stable resource reference;
- hash/version;
- provenance;
- summary/index metadata

in the task state.

This prevents unbounded task histories and keeps artifacts independently inspectable/reusable.

## 28. Recovery / operator intervention

Some failures cannot be safely solved automatically.

Use `REQUIRES_INTERVENTION` when:
- provider side effect state is ambiguous after reconciliation;
- compensation failed;
- incompatible task/runtime version cannot continue;
- missing credentials require administrator repair;
- source-of-truth conflict blocks safe continuation;
- repeated model/tool failures exhaust policy.

Operator/user view should show:
- what happened;
- what definitely completed;
- what is uncertain;
- what requires action;
- safe retry/compensation options.

## 29. Observability

Each durable task should correlate:
- task ID;
- step IDs;
- agent instance IDs;
- provider/model calls;
- connector operations;
- Action Receipts;
- approval refs;
- notifications;
- artifacts;
- usage/cost;
- errors/retries;
- user-visible task events.

This creates one reconstructable timeline.

RQ-16/17/18 will define evaluation/latency/economic observability in more detail.

## 30. Durable runtime technology disposition

RQ-14 does **not** choose Temporal, AWS Step Functions or another workflow engine.

However, any Production implementation must demonstrate the equivalent of:
- persisted task/workflow state;
- crash/restart recovery;
- resumable waits;
- reliable timers;
- retry/backoff;
- heartbeats/timeouts;
- external signals/callbacks;
- cancellation;
- version compatibility;
- event/history observability;
- idempotent activity/action integration.

Candidate implementations can later be compared during M2-20/RQ-19/RQ-25.

Do not build a fragile custom queue + status-table system if a proven durable-execution primitive materially reduces correctness/operations risk.

Likewise, do not introduce a heavyweight workflow platform for simple foreground work that does not need durability.

## 31. Jarvis Lab

Lab must test failure, not only happy-path completion.

Required scenarios:
- close browser mid-task and return;
- disconnect voice;
- kill worker during model call;
- kill worker after a completed step but before next step;
- provider model timeout;
- connector rate limit;
- duplicate event/callback;
- approval arrives hours later;
- cancel before execution;
- cancel during a safe long step;
- uncertain provider mutation response;
- task definition/version deployment during running task;
- cost budget exhausted;
- notification and deep-link return.

Success means no silent loss/duplication and truthful state on resume.

## 32. Recommended lock

> **RQ-14 — Admonk-Owned Durable Task Contract**
>
> Long-running/resumable work is represented by an Admonk-owned **Durable Task** whose identity and state are independent of the browser, voice session, model provider, agent instance, worker process or provider background-response ID.
>
> Model calls, agents, connector operations, governed actions, approvals, timers and external callbacks are typed **steps inside the task**, not the task itself.
>
> Use foreground execution for simple work; create/promote a Durable Task when work must survive disconnects/failures, preserve meaningful progress, wait on humans/external systems, perform consequential multi-step work, or support leave-and-return.
>
> Durable control/orchestration state must be replay/recovery-safe; non-deterministic work such as LLM/tool/provider calls executes as recorded steps whose completed results are reused rather than recomputed during recovery.
>
> Checkpoint at meaningful durable boundaries and store large outputs as referenced artifacts/resources rather than unbounded inline history.
>
> Tasks expose truthful semantic states including running, waiting for input/approval/external dependency, paused, partially completed, compensating, requires intervention, completed, failed and cancelled.
>
> Retries are failure-class-aware. External mutations rely on RQ-07 operation IDs, idempotency and reconciliation to achieve effectively-once business behavior rather than assuming distributed exactly-once execution.
>
> Cancellation is cooperative and state-aware; cancelling remaining work is distinct from stopping a model stream or compensating an already-completed business action.
>
> Users can leave and return to the same task. Dynamic workspaces and the persistent Jarvis panel reconstruct from durable task snapshots/events rather than requiring the original stream to stay connected.
>
> Durable-task progress uses an Admonk event/cursor model; provider-specific streaming/background primitives may feed it but never become the canonical task state.
>
> Human/external waits pause and resume the same task. Required attention/completion is delivered through the shared notification plane.
>
> Running task definitions are versioned so deployments do not silently reinterpret in-flight work.
>
> RQ-14 locks the semantics/contract, not a workflow-engine vendor. Any final runtime must prove crash recovery, resumable waits, retry/backoff, heartbeats, callbacks/signals, cancellation, versioning and observable history.
>
> **When Jarvis says 'I'm working on this,' the work belongs to Admonk and remains recoverable until it reaches a truthful terminal or intervention state.**

## 33. Recommendation

**LOCK RQ-14 as written.**

This gives Jarvis real continuity beyond a request while avoiding provider lock-in and preserving the fast foreground path for simple work.
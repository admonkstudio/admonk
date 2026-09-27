# Jarvis Research Question 15 — Failure & Recovery Philosophy

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** What is Jarvis's failure and recovery philosophy?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/runtime/UX architecture research only.

## 1. Decision problem

Jarvis will depend on probabilistic models, external providers, connectors, distributed tasks, dynamic UI, user context and governed actions. Failure is therefore not exceptional; it is a normal system condition that must be designed explicitly.

RQ-15 must define behavior when:
- Jarvis lacks enough evidence;
- evidence conflicts;
- context is ambiguous or stale;
- a model gives unusable output;
- a connector/provider is unavailable;
- a task partially completes;
- an action outcome is uncertain;
- permissions/policy block progress;
- cost/runtime budgets are exhausted;
- the product itself encounters an internal error.

The user should neither see false confidence nor be forced to understand infrastructure details.

## 2. External evidence

### Google PAIR — graceful failure needs a path forward

Google's People + AI guidance treats graceful failure as a core UX problem: identify what kind of error occurred, communicate system limitations, and provide a way for the user to move forward. It also distinguishes context errors from ordinary system failures and recommends returning control to the user when AI cannot proceed reliably.

Source:
- https://pair.withgoogle.com/chapter/errors-failing/

### Google/AWS reliability — degrade locally rather than collapse globally

Google Cloud and AWS reliability guidance recommend graceful degradation, partial-error handling, bounded retries, circuit breakers and failing fast on non-transient errors to prevent dependency failures from cascading across the whole system.

Sources:
- https://docs.cloud.google.com/architecture/framework/reliability/graceful-degradation
- https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html
- https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html

### OpenAI — pause/stop deliberately and validate side effects at boundaries

OpenAI's current agent runtime guidance distinguishes expected pauses from failures and recommends placing guardrails/approval checks at the tool boundary where side effects happen. Runtime failures, validation failures and tool errors should be handled deliberately rather than silently absorbed.

Sources:
- https://developers.openai.com/api/docs/guides/agents/running-agents
- https://developers.openai.com/api/docs/guides/agents/guardrails-approvals

### Anthropic — errors compound in long-running agents

Anthropic's production multi-agent research emphasizes that stateful agents accumulate errors, should resume rather than restart blindly, and benefit from deterministic retry/checkpoint safeguards around model adaptability.

Source:
- https://www.anthropic.com/engineering/multi-agent-research-system

### NIST — human oversight and transparency remain necessary when systems cannot detect/correct errors

NIST AI RMF guidance emphasizes ongoing monitoring, explicit human oversight, transparency and intervention paths where AI cannot detect or correct errors reliably.

Sources:
- https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/
- https://airc.nist.gov/airmf-resources/playbook/measure/

## 3. Core conclusion

> **Jarvis should fail truthfully, locally and recoverably.**

Failure philosophy:
1. never fabricate knowledge, progress or completion;
2. contain failure to the smallest affected capability/task/source;
3. preserve verified partial work;
4. recover automatically only when recovery is safe and qualified;
5. degrade capability explicitly rather than silently lowering quality/safety;
6. stop safely when the system cannot establish a trustworthy next step;
7. give the user a clear path forward;
8. record failures as evaluation/operational evidence.

## 4. Two fundamentally different failure families

### A. Epistemic / knowledge failure

The system is running, but does not know enough to make a trustworthy claim.

Examples:
- insufficient evidence;
- conflicting authoritative sources;
- stale data;
- ambiguous user intent/context;
- low-quality retrieval;
- model inference unsupported by evidence.

Correct behavior may be:
- abstain;
- provide a partial answer with explicit limitation;
- ask for one missing critical input;
- retrieve more evidence;
- present conflicting sources;
- defer a recommendation.

### B. Operational / execution failure

Something in the software/runtime/dependency failed.

Examples:
- provider timeout;
- connector revoked;
- rate limit;
- model schema failure;
- worker crash;
- action verification timeout;
- task budget exhausted;
- internal invariant/bug.

Correct behavior may be:
- bounded retry;
- qualified fallback;
- graceful degradation;
- pause for repair/input;
- reconcile external state;
- require intervention;
- fail safely.

Never conflate `I don't know` with `the system is broken`.

## 5. Failure taxonomy

Use a normalized machine-readable taxonomy.

```text
F1 INPUT_CONTEXT
   ambiguous/missing/incorrect task context

F2 EVIDENCE_QUALITY
   missing, stale, conflicting or insufficient evidence

F3 MODEL_OUTPUT
   invalid schema, unusable reasoning/output, refusal or quality failure

F4 DEPENDENCY
   provider/connector/tool/network unavailable/degraded

F5 AUTH_POLICY
   permission, entitlement, policy or approval blocks progress

F6 RESOURCE_LIMIT
   credits, rate limits, timeouts, capacity or task budget

F7 ACTION_UNCERTAINTY
   side effect may have occurred but cannot yet be verified

F8 PARTIAL_EXECUTION
   some multi-step work committed while later steps failed

F9 INTERNAL_INVARIANT
   Admonk bug/data corruption/impossible state
```

One task may contain more than one failure class.

## 6. Failure Envelope

Every significant failure should normalize into a common envelope before UI presentation.

Candidate:

```text
FailureEnvelope
  failure_id
  task_id / step_id
  category
  scope: call | step | source | capability | task | product
  severity
  user_impact
  known_successes[]
  uncertain_state?
  retryable?
  retry_after?
  fallback_available?
  degraded_mode?
  user_action_required?
  safe_to_continue?
  technical_error_ref
  provider/connector ref
  trace/audit ref
```

Raw provider messages/stack traces remain diagnostic data, not the default user message.

## 7. User-facing failure message contract

Most user-visible failures should answer four questions:

```text
1. What happened in task terms?
2. What still succeeded / is still trustworthy?
3. What is the practical limitation or risk?
4. What can happen next?
```

Example — optional source unavailable:

`LinkedIn data is temporarily unavailable. Meta and recruitment data are current, so I can continue, but the channel comparison will be incomplete.`

Actions:
`Continue with available data` | `Retry LinkedIn` | `Stop`

Example — uncertain action state:

`Meta did not return a verifiable result for the pause request. I won't send the command again until I reconcile the campaign state.`

Do not show:
`HTTP 504 gateway timeout at connector-worker-3`

unless the user opens technical details/admin diagnostics.

## 8. Graceful degradation hierarchy

Preferred response order:

```text
Primary path
   ↓ failure
Equivalent eval-qualified fallback available?
   yes → use transparently / note if materially relevant
   no
   ↓
Can task complete safely with reduced capability/data?
   yes → explicit degraded mode + limitation
   no
   ↓
Can useful verified partial result be returned?
   yes → partial result + next step
   no
   ↓
Can user/admin repair missing dependency/input?
   yes → WAITING/REQUIRES ACTION
   no
   ↓
Safe stop / intervention
```

Never degrade past a task's quality, privacy, authorization or safety floor.

## 9. Failure should stay local where possible

Examples:
- LinkedIn unavailable should not disable Marketing Hub;
- voice unavailable should fall back to text under RQ-04;
- one unsupported S1 component may fall back to an approved component/S0/S2 route under RQ-06;
- one model provider failure may use an RQ-13-qualified fallback;
- one optional evidence source may be omitted with disclosure;
- one product/domain outage should not make unrelated Jarvis domains unavailable.

This is **blast-radius containment**.

## 10. Hard dependencies vs soft dependencies

Every task/context plan should distinguish:

### Required dependency

Without it, completing the requested outcome would be misleading/unsafe.

Example:
- current target state before a consequential mutation;
- authoritative hire outcomes for a cost-per-hire analysis.

Failure → block/abstain/wait.

### Optional dependency

Improves completeness but is not necessary to produce a useful bounded result.

Example:
- additional benchmark source for an exploratory analysis.

Failure → continue in degraded/partial mode with disclosure.

This rule should be defined in task/context/capability contracts rather than improvised by the model.

## 11. Retries are bounded and classified

Automatic retries are appropriate only for transient/retry-safe failures.

Use:
- exponential backoff/jitter;
- provider retry-after;
- idempotency for mutations;
- route-specific retry limits;
- task budget/time limit.

Do not automatically retry:
- permission denial;
- invalid business input;
- missing required scope;
- known permanent API error;
- policy block;
- ambiguous external side-effect state without reconciliation.

## 12. Circuit breaking

If a dependency is repeatedly failing:
- stop hammering it;
- mark capability/connection degraded;
- route eligible work to fallback/cache/degraded path;
- periodically probe recovery;
- expose health in Setup/Connection surfaces.

This prevents retry storms, increased cost and cascading latency.

## 13. Cached/stale fallback rules

Cached data may be used only when the task contract permits it.

Always retain:
- source;
- data/effective time;
- freshness state;
- reason live source is unavailable.

Example:

`Meta live data is unavailable. I can use the last successful sync from 17:10 for a directional analysis.`

Do **not** use stale/cached state for a consequential action whose safety depends on current provider state.

## 14. Uncertainty should be evidence-grounded, not theatrical

Do not ask generative models to invent universal numeric confidence percentages.

Prefer system-grounded status such as:
- `Verified` — confirmed from authoritative/current source or action readback;
- `Supported` — evidence supports conclusion but includes inference;
- `Incomplete` — required/important evidence missing;
- `Conflicting` — authoritative evidence disagrees;
- `Stale` — source older than allowed/expected freshness;
- `Unverified` — execution/result not yet confirmed.

Raw calibrated probabilities may be shown only for models/tasks where the probability is genuinely calibrated and useful (for example the Reflex Decision Plane).

Confidence is not authority.

## 15. Abstention is a successful safety behavior

Jarvis must have an explicit ability to say:
- `I don't have enough evidence to answer this reliably.`
- `These sources conflict, so I can't state one value as authoritative.`
- `I can't safely execute this until the target state is refreshed.`

Abstention should be measured separately from failure.

A correct abstention may be a higher-quality outcome than a fabricated answer.

## 16. Context correction

If Jarvis likely misunderstood current context, it should correct at the smallest useful level.

Examples:
- ask the user to choose between two ambiguous resources;
- expose current Operating Lens/scope;
- show which filters/date range are active;
- allow direct correction in the workspace;
- reuse the corrected state without restarting the full task.

Google PAIR's `context error` concept is directly relevant: the system may function technically yet still fail the user's actual intent because its assumptions were wrong.

## 17. Evidence conflicts

When authoritative sources disagree:
1. identify whether definitions differ;
2. compare source authority/effective period/freshness;
3. apply a deterministic canonical rule if one exists;
4. otherwise surface the conflict.

Do not:
- average incompatible values;
- silently choose the source that best supports the model's conclusion;
- label one source wrong without evidence.

RQ-10 provenance remains authoritative.

## 18. Model/output failure

Model output can fail even when the provider call succeeds.

Examples:
- invalid structured output;
- missing required evidence;
- wrong tool request;
- unsupported assertion;
- repeated looping/no progress.

Recovery order:

```text
validate
  ↓
cheap repair/retry if route policy allows
  ↓
eval-qualified alternative deployment/route
  ↓
deeper route or human/user clarification if justified
  ↓
abstain/fail safely
```

Never repeat identical failing model calls indefinitely.

## 19. Action failure is stricter

RQ-07 action semantics remain authoritative.

If action state is uncertain:
- stop automatic repetition;
- reconcile/read back provider/business state;
- preserve operation ID/idempotency key;
- mark `Unverified` / `REQUIRES_INTERVENTION` if unresolved.

If partial execution occurred:
- report exactly which steps committed;
- retry only safe remaining steps;
- compensate where the contract actually supports it;
- do not claim full rollback if external effects remain.

## 20. Authorization/policy failure is not a technical error

Examples:
- user lacks permission;
- required product not entitled;
- approval rejected;
- destructive action prohibited.

Do not retry or switch models/providers.

Explain:
- requested outcome cannot proceed;
- the governing restriction at an appropriate level;
- available alternative (draft/proposal/request approval/open admin) if one exists.

Never imply that AI confidence can override the restriction.

## 21. Budget/resource failure

When a task reaches credit/time/tool/runtime limits:
- stop predictable further consumption;
- preserve completed work;
- show what remains;
- allow top-up/approval/reduced-scope continuation only if product policy permits;
- never silently lower model quality below the route floor just to finish.

Failed/retried/discarded work still counts toward M2-14 economics.

## 22. Internal invariant failures

Some failures indicate an Admonk bug rather than a recoverable dependency issue.

Examples:
- impossible state transition;
- tenant mismatch;
- corrupted task state;
- authorization invariant violation;
- schema version incompatibility.

Behavior:
- fail closed;
- do not attempt creative AI recovery;
- preserve diagnostic trace;
- mark incident/intervention;
- give user a safe generic explanation + support/reference ID.

## 23. User control / path forward

Depending on failure type, offer only valid options such as:
- Retry;
- Continue with available evidence;
- Refresh source;
- Reconnect provider;
- Provide missing information;
- Review conflict;
- Open full dashboard/source;
- Request approval/access;
- Save partial result;
- Cancel remaining work;
- Contact administrator/support.

Do not present buttons that cannot actually change the failure state.

## 24. Progressive failure UX

During active work, don't wait until the end to reveal a material degradation.

Example:

```text
Meta        ✓ current
Recruit     ✓ current
LinkedIn    ⚠ unavailable — analysis continuing without it
```

If the missing source becomes required later, transition:

`Analysis paused: LinkedIn is required for the requested cross-channel conclusion.`

## 25. Jarvis graph/orb behavior

The semantic visual system can communicate failure state without theatrical alarm.

Examples:
- affected source/path marked degraded;
- unavailable node muted;
- active fallback path shown;
- waiting/repair state visible;
- verified successful branches remain intact.

Do not imply the entire system is broken because one path failed.

Reduced-motion/accessibility equivalents remain mandatory.

## 26. Failure feedback loop

Every significant failure should feed observability/evaluation:
- category;
- frequency;
- route/provider/capability;
- recovery path used;
- recovery success;
- user correction/override;
- cost of retries;
- task outcome;
- whether failure was user-visible;
- whether it should join regression tests.

Real failures are prime candidates for RQ-16 regression/eval cases.

## 27. SLO/incident distinction

Not every user-facing AI abstention is an operational incident.

Examples:
- `Insufficient evidence` → product-quality/epistemic outcome;
- connector outage affecting many tenants → operational incident;
- repeated schema failures after model deployment → model/runtime incident;
- policy denial → expected governance behavior.

Operational metrics should not inflate/obscure epistemic-quality metrics by merging them into one `error rate`.

## 28. Recommended lock

> **RQ-15 — Truthful, Local, Recoverable Failure**
>
> Jarvis treats failure as a first-class product state. It never fabricates knowledge, progress, verification or completion to preserve a smooth experience.
>
> Epistemic failure (`not enough trustworthy evidence`) and operational failure (`software/dependency execution failed`) are distinct and measured separately.
>
> Failures are normalized into a structured Failure Envelope and contained to the smallest affected source/capability/step/task wherever possible.
>
> Recovery follows a strict ladder: **qualified equivalent fallback → explicit degraded mode → verified partial result → user/admin repair path → safe stop/intervention**. No fallback may cross the task's quality, privacy, authorization or safety floor.
>
> Required and optional dependencies are declared by task/context/capability contracts. Optional failures may degrade gracefully; required failures block or abstain.
>
> Retries are bounded, failure-class-aware and idempotency-safe. Repeated dependency failures trigger circuit breaking rather than retry storms.
>
> Cached/stale data may be used only when the task permits it and its freshness is made explicit; stale state is not acceptable for consequential actions requiring current truth.
>
> Jarvis communicates uncertainty through evidence-grounded states such as Verified, Supported, Incomplete, Conflicting, Stale and Unverified. Generative models do not invent universal numeric confidence scores.
>
> Abstaining, exposing source conflict or requesting missing critical context are valid successful safety behaviors when they avoid an unreliable answer/action.
>
> Action uncertainty and partial execution follow RQ-07 reconciliation/compensation rules and are never retried blindly.
>
> Authorization/policy blocks are expected governance outcomes, not technical failures; model/provider switching cannot bypass them.
>
> User-visible failure messages explain the task impact, trustworthy completed work, limitation and valid path forward while technical details remain available for diagnostics.
>
> Every meaningful failure feeds observability, economics and the RQ-16 regression/evaluation system.
>
> **Jarvis should not promise that nothing will fail. It should make failure bounded, understandable, recoverable and honest.**

## 29. Recommendation

**LOCK RQ-15 as written.**

This establishes the trust model needed before defining Jarvis evaluation quality in RQ-16.
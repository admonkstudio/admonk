# Jarvis Research Question 07 — Governed Action / Real-Work Contract

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** What happens when Jarvis starts real work?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/action architecture research only.

## 1. Decision problem

Jarvis must turn natural-language intent into real software execution without allowing:
- model text to become an executable command;
- stale context to modify the wrong resource;
- retries to duplicate real-world actions;
- approvals to cover materially changed actions;
- partial failures to be presented as success;
- agents/subagents to amplify authority;
- workflow-engine details to leak into the Jarvis product contract.

RQ-07 defines the boundary between:

```text
understanding / recommending
          and
changing the world
```

## 2. Reconcile RQ-03 with the locked Foundation

RQ-03 correctly locked **cognitive depth and action authority as independent axes**.

However, its A0/A1/A2/A3 labels were research shorthand.

The canonical Foundation already locks a richer action vocabulary in M2-11 and explicitly says not to create a second AI-specific permission model:

- `READ`
- `DRAFT`
- `PROPOSE`
- `EXECUTE_REVERSIBLE`
- `EXECUTE_CONSEQUENTIAL`
- `DESTRUCTIVE`

Therefore:

> Keep the RQ-03 orthogonal-axis principle, but use the existing M2-11 action classes in the actual Jarvis contract. Retire A0/A1/A2/A3 as implementation terminology.

Existing M2-11 rules remain authoritative:
- final authorization is outside the model;
- agent authority is the intersection of delegator authority, agent capability, policy, context, connector/provider capability, runtime limits, action class and approval state;
- approval cannot create absent capability;
- consequential execution requires action-bound approval by default;
- destructive execution is denied by default;
- subagents may receive less authority, never more.

## 3. External research

### OpenAI — validation and approval belong at the tool boundary

Current OpenAI guidance distinguishes automatic guardrails from human review and recommends placing checks around the exact function/tool that causes the side effect. When approval is required, the run pauses, stores resumable state, and resumes the **same run** after approval or rejection rather than beginning a new conversational request.

Source:
- https://developers.openai.com/api/docs/guides/agents/guardrails-approvals

Pattern:
**model proposes → application validates → approval pause → same task resumes → tool executes.**

### MCP — useful risk metadata, but never authority

Current MCP tool annotations include hints for:
- read-only;
- destructive;
- idempotent;
- open-world/external effects.

The MCP specification/community guidance explicitly warns that these are hints and must not be trusted as authorization when received from an untrusted server.

Source:
- https://blog.modelcontextprotocol.io/posts/2026-03-16-tool-annotations/

Pattern:
**tool metadata can inform preflight UX/policy, but trusted Admonk capability metadata remains authoritative.**

### Stripe — idempotency for retry-safe writes

Stripe's API documents the standard reliability pattern: attach an idempotency key to mutating requests so a client can safely retry after a network failure without creating the same object/action twice.

Source:
- https://docs.stripe.com/api/idempotent_requests

Pattern:
**every consequential/reversible action that can be retried needs a stable operation identity.**

### HTTP conditional updates — stale-state protection

HTTP `If-Match`/ETag conditional updates are a standard optimistic-concurrency mechanism: only perform the modification if the resource still matches the version the user reviewed; otherwise reject with a precondition failure.

Source:
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/If-Match

Pattern:
**approval of version N must not silently mutate a materially changed version N+1.**

### AWS Saga pattern — partial failure needs continuation or compensation

AWS documents saga orchestration as a pattern for multi-system operations: each step is a local transaction; failures require either forward recovery/retry or compensating actions. Saga participants should be idempotent and the orchestration needs detailed observability.

Sources:
- https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-patterns.html
- https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/saga-orchestration.html

Pattern:
**a multi-system Jarvis action cannot pretend to be one atomic database transaction. Its contract must model partial success and recovery.**

## 4. Core conclusion

> **Natural language never executes a provider/workflow directly. It produces a typed Action Proposal. Software then resolves, validates, authorizes, approves, executes, verifies and records that proposal.**

Recommended lifecycle:

```text
USER INTENT
    ↓
TASK / INTENT UNDERSTANDING
    ↓
TYPED ACTION PROPOSAL
    ↓
PREFLIGHT
- resolve capability
- resolve exact target(s)
- bind material parameters
- classify canonical action class
- current permission/entitlement
- connector/provider capability
- resource freshness/version
- runtime/spend limits
- reversibility/compensation
    ↓
AUTHORIZED?
 ├ no → deny/explain
 └ yes
    ↓
APPROVAL REQUIRED?
 ├ yes → exact review surface → pause same task
 └ no
    ↓
EXECUTION COMMAND
- immutable operation/action id
- idempotency key
- preconditions/version
- typed input
- approval receipt if required
    ↓
EXECUTION ADAPTER
- domain service / API / n8n / future engine
    ↓
VERIFY RESULT / READBACK
    ↓
ACTION RECEIPT + AUDIT
    ↓
JARVIS PRESENTS VERIFIED OUTCOME
```

## 5. Capability contract, not workflow identifiers

Jarvis should invoke a stable business capability:

```text
marketing.campaign.pause
marketing.campaign.create_draft
support.case.assign
people.profile.request_update
```

Jarvis must not conceptually invoke:

```text
n8n workflow 427
POST raw-provider-url
call function named foo_v7
```

The capability implementation may change without changing Jarvis.

## 6. Action Capability Manifest

Every executable capability should publish trusted versioned metadata.

Candidate contract:

```text
CapabilityManifest
  capability_key
  contract_version
  owning_product/domain
  action_class
  input_schema
  output_schema
  target_resource_types
  required_capabilities/permissions
  approval_policy
  reversible: true/false/conditional
  compensation_capability?
  idempotency_support
  freshness/precondition_strategy
  timeout/retry_policy
  external_side_effects
  provider/connector requirements
  audit_policy
  result_verification_strategy
```

The model may select among capabilities it is allowed to see. It does not author this manifest.

## 7. Draft, propose and execute must be visibly different

Jarvis should distinguish:

### READ
Observe/retrieve without changing business state.

### DRAFT
Create or modify a non-final artifact that is explicitly still a draft.

Examples:
- campaign copy draft;
- unsent email;
- proposed content calendar;
- draft report.

### PROPOSE
Recommend an action without creating the side effect.

Example:
`I recommend pausing campaigns A and B.`

### EXECUTE_REVERSIBLE
Perform a bounded action that can be reliably recovered/reversed under the configured policy.

### EXECUTE_CONSEQUENTIAL
Perform a material business/external side effect where approval is normally required.

### DESTRUCTIVE
High-impact/destructive action; denied by default under M2-11.

UX must not blur these modes.

## 8. Action Proposal

The model/reflex layer can produce a proposal, not an execution packet.

Candidate:

```text
ActionProposal
  capability_key
  intended_outcome
  proposed_targets
  proposed_parameters
  evidence/reason for proposal
  task_id
```

Then software resolves it into trusted canonical IDs/current values.

Do not rely on model-authored:
- permissions;
- connector ids;
- provider credentials;
- action class;
- approval policy;
- raw endpoints.

## 9. Preflight must bind exact material state

Before approval/execution, preflight resolves:
- tenant;
- user/delegator;
- product/scope;
- canonical target IDs;
- current target state/version;
- material action parameters;
- current permission;
- entitlement;
- provider/connector capability;
- action class;
- expected side effect;
- reversibility/compensation;
- estimated usage/cost where relevant.

This produces a **Prepared Action**.

## 10. Approval must bind to the prepared action

Approval should cover the exact action reviewed.

Bind approval to a digest/version of material fields, conceptually:

```text
approval_scope = hash(
  capability
  tenant
  target ids
  material parameters/content
  target version/precondition
)
```

If any material field changes:
- target;
- recipient;
- amount/budget;
- content to be sent;
- action type;
- material scope;
- target version where change matters;

the previous approval is invalid and the action returns to review.

This directly implements the existing M2-11 rule that material changes require re-approval.

## 11. Approval UX

Consequential actions should normally use S1 review/confirmation UI even if initiated by voice.

Show at minimum:
- what will happen;
- exact target(s);
- important parameters/content;
- source/reason if relevant;
- whether it can be reversed;
- material cost/credit/provider impact when relevant;
- any known external communication/side effect.

Do not reduce approval to an ambiguous `Are you sure?`.

Approval pauses and resumes the same task.

## 12. Idempotency

Every mutating execution should carry an Admonk operation/action ID.

For actions that support retries:
- derive or attach an idempotency key;
- the adapter/provider should return the existing outcome for the same operation where possible;
- never create a fresh operation ID merely because the HTTP/network request timed out.

Distinguish:

```text
user intentionally repeats action
        vs
software retries same action
```

Those are different operations.

## 13. Optimistic concurrency / freshness

An action should not apply to materially stale state.

Where the target system supports version/ETag/revision checks:
- include a precondition;
- reject if the target changed since preflight/approval;
- refresh and re-evaluate/re-approve if material.

Where provider APIs lack native conditional writes, Admonk adapters should use the strongest available freshness/reconciliation strategy and make weaker guarantees explicit.

## 14. Execution result is not necessarily success

Separate:

```text
request accepted
provider acknowledged
workflow completed
business outcome verified
```

Jarvis should say `completed` only at the highest verification level the capability contract promises.

Example:

Bad:
`Campaign paused successfully` because n8n returned HTTP 200.

Better:
`The workflow accepted the pause request; I'm verifying the campaign state.`

Then, after provider readback:
`Campaign A is now paused.`

## 15. Result verification / readback

Capabilities should define how success is verified.

Possible strategies:
- provider response is authoritative;
- follow-up readback of target state;
- event/webhook confirmation;
- reconciliation job;
- human confirmation where external outcome is not machine-verifiable.

Jarvis presents the verification level honestly.

## 16. Partial failure and multi-step actions

Multi-system work must explicitly model states such as:
- pending;
- running;
- partially_completed;
- waiting;
- completed;
- failed;
- compensating;
- compensated;
- requires_intervention.

For each step, define:
- retryable failures;
- non-retryable failures;
- idempotency;
- compensation where possible;
- manual recovery instructions where not reversible.

Do not claim global rollback if an external system cannot actually reverse the effect.

## 17. Reversible does not mean 'we have an undo button'

`EXECUTE_REVERSIBLE` should mean the capability has a tested recovery/compensation path within explicit limits.

Examples:
- unpublish before external distribution;
- restore a previous status;
- remove an added label;
- revert a setting version.

An email already sent externally is not reversible merely because we can send another email.

## 18. Cancellation semantics

Cancellation has stages:

```text
before execution → cancel safely
during retryable/pre-commit work → attempt cancellation
after provider side effect → cannot assume cancellation
after partial multi-step execution → compensation/recovery policy
```

UI must distinguish:
- `Stop waiting/viewing`;
- `Cancel pending work`;
- `Undo/compensate completed action`.

RQ-14 will define durable long-running task mechanics in more detail.

## 19. Action Receipt

Every attempted real action—executed, denied, failed or compensated—should produce an explainable receipt aligned with M2-12 audit/provenance.

Candidate fields:

```text
ActionReceipt
  operation_id
  task_id / correlation_id
  tenant
  actor/delegator
  agent/runtime identity
  capability + contract version
  action_class
  targets
  material parameter summary/hash
  authorization decision
  approval reference
  execution adapter/provider
  idempotency key reference
  started/completed timestamps
  step statuses
  final execution status
  verification status
  compensation status
  provider/resource references
  evidence/provenance refs
  usage/cost refs
  failure/error class
```

Sensitive secrets/credentials are never copied into the receipt.

## 20. Reflex Decision Plane role

The Decision Plane may assist with:
- semantic intent classification;
- detecting that a request probably implies action;
- mapping intent to candidate capability;
- risk/escalation signals;
- checking generated content against bounded criteria.

It may not decide:
- whether the user has permission;
- whether the SKU is enabled;
- whether approval is satisfied;
- whether a destructive action is allowed;
- whether provider credentials are valid.

Those remain deterministic/shared-platform/domain controls.

## 21. Dynamic UI role

RQ-06 S1 workspaces become the preferred review surface for consequential work.

Example:

```text
Jarvis: 'Pause underperforming campaigns.'
        ↓
Prepared action
        ↓
Approval workspace
┌─────────────────────────────────┐
│ Pause 3 campaigns               │
│ Meta — Arabic — Campaign A      │
│ Meta — German — Campaign B      │
│ LinkedIn — Cantonese — C        │
│                                 │
│ Reason / evidence               │
│ Reversible within policy: Yes   │
│                                 │
│ [Cancel]        [Approve pause] │
└─────────────────────────────────┘
```

The approval component binds to the Prepared Action ID/version, not free-form chat text.

## 22. n8n implication

n8n may execute the implementation behind a capability during the Lab.

But the architecture is:

```text
Jarvis
  ↓
Prepared Action
  ↓
Admonk authority/approval
  ↓
Capability Adapter
  ↓
n8n today / native service tomorrow
```

Not:

```text
Jarvis → arbitrary n8n workflow
```

RQ-08 will decide n8n's long-term role.

## 23. Evaluation

Jarvis Lab action tests must measure:

### Safety/authority
- unauthorized execution rate (target: zero in test suite);
- missing approval rate;
- stale approval correctly invalidated;
- agent/subagent authority non-amplification.

### Reliability
- duplicate side-effect rate under forced retry;
- stale-write rejection;
- provider timeout recovery;
- partial-failure detection;
- compensation success;
- verified-result accuracy.

### UX
- user understands draft/propose/execute distinction;
- approval comprehension;
- interruption/cancel comprehension;
- action-status correctness.

### Observability
- complete action receipt;
- correlation across Jarvis → adapter → workflow/provider;
- trace can reconstruct why action was allowed/denied;
- usage/cost attached.

## 24. Recommended lock

> **RQ-07 — Governed Action Contract**
>
> Natural-language intent never directly executes a provider, workflow or database mutation. It produces a typed **Action Proposal** that Admonk software resolves into a trusted **Prepared Action**.
>
> Cognitive depth remains independent from authority, but implementation uses the already locked Foundation action classes: `READ`, `DRAFT`, `PROPOSE`, `EXECUTE_REVERSIBLE`, `EXECUTE_CONSEQUENTIAL`, `DESTRUCTIVE`. RQ-03's A0–A3 labels are retired as implementation terminology.
>
> Preflight resolves exact targets, material parameters, current versions/freshness, effective permission, entitlement, provider capability, runtime limits, reversibility and approval policy before execution.
>
> Required approval binds to the exact prepared action/material parameters and resumes the same Jarvis task. Material change invalidates approval.
>
> Every mutating operation has a stable operation identity/idempotency strategy so retries cannot silently duplicate side effects.
>
> Actions use freshness/precondition checks where possible to prevent stale writes.
>
> Execution success must be distinguished from provider acknowledgement; capabilities define a verification/readback strategy and Jarvis reports only the verification level actually achieved.
>
> Multi-step actions explicitly support partial-failure states, retry rules and compensation/manual recovery rather than pretending distributed work is atomic.
>
> Every action attempt produces a structured Action Receipt suitable for audit/provenance, usage/cost tracing and user-visible explanation.
>
> Jarvis invokes stable business capability keys, never arbitrary workflow/provider endpoints. n8n or another engine is an implementation adapter behind the capability boundary.
>
> **The model may propose work. Only governed software may authorize and commit it.**

## 25. Recommendation

**LOCK RQ-07 as written.**

This creates a safe, provider-independent and recoverable boundary between Jarvis's intelligent experience and real-world execution.
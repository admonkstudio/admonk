# Jarvis Research Question 21 — Proactivity & Attention Architecture

**Date:** 2026-09-28  
**Track:** Jarvis Deep Question Register  
**Question:** When may Jarvis surface something without being asked, and how should it decide whether to stay ambient, notify, interrupt or act?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/attention/notification architecture research only.

## 1. Decision problem

Jarvis should eventually feel aware of:
- active work;
- waiting approvals;
- deadlines;
- connector/task failures;
- important metric changes;
- company/department strategy;
- user-created monitors;
- durable task completion;
- cross-domain dependencies;
- emerging risks/opportunities.

But `proactive` can easily become:
- notification spam;
- false urgency;
- engagement optimization;
- constant AI polling/cost;
- speculative interruptions;
- hidden surveillance;
- user-trust erosion;
- autonomous action beyond intent.

RQ-21 must distinguish:
- noticing;
- deciding something is noteworthy;
- deciding whether it deserves attention;
- choosing delivery timing/channel;
- proposing/performing follow-up work.

These are different decisions.

## 2. External research evidence

### Interruption has a real cognitive cost

Microsoft Research has repeatedly shown that proactive notifications can reduce task performance and increase frustration when delivered at poor moments, and that deferring alerts toward natural task boundaries can reduce interruption cost.

Sources:
- https://www.microsoft.com/en-us/research/video/paying-attention-to-interruption-a-human-centered-approach-to-intelligent-interruption-management/
- https://www.microsoft.com/en-us/research/publication/oasis-a-framework-for-linking-notification-delivery-to-the-perceptual-structure-of-goal-directed-tasks/
- https://www.microsoft.com/en-us/research/publication/balancing-awareness-interruption-investigation-notification-deferral-policies/

### Notification trust is fragile

Microsoft Research found that unreliable notification systems can damage trust and lead users to abandon them even after reliability improves.

Source:
- https://www.microsoft.com/en-us/research/publication/effective-notification-systems-depend-on-user-trust/

### Platform UX distinguishes interruption levels

Apple's current notification guidance distinguishes passive, active, time-sensitive and critical interruption levels and warns that misrepresenting urgency undermines trust. Windows likewise supports quiet/focus periods and priority-only delivery.

Sources:
- https://developer.apple.com/design/human-interface-guidelines/managing-notifications
- https://learn.microsoft.com/en-us/windows/win32/shell/notification-area
- https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-admx-wpn

### Current AI products are moving from pull to monitored/proactive work

OpenAI's 2026 Scheduled Tasks/Work supports recurring and event-triggered monitoring that can check web/connected apps and notify only when something worth reporting occurs; actions still inherit connected-app permission/approval requirements.

Microsoft's 2026 Autopilot direction similarly emphasizes persistent background work tied to user priorities, permissions and organizational policy.

Sources:
- https://help.openai.com/en/articles/6825453-chatgpt-release-notes
- https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
- https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/

## 3. Core conclusion

> **Jarvis is proactive in awareness, conservative in interruption, and never proactive in authority.**

Proactivity pipeline:

```text
SIGNAL / EVENT / SCHEDULE
        ↓
PROACTIVE CANDIDATE
        ↓
evidence + authorization + novelty
        ↓
materiality + urgency + actionability
        ↓
ATTENTION DECISION
        ↓
silent state / ambient / inbox / digest / timely alert / immediate interrupt
        ↓
optional proposal/task/action
```

Observation does not imply notification.

Notification does not imply interruption.

Interruption does not imply execution authority.

## 4. Keep four concepts distinct

### Signal

Raw change/event/condition.

Examples:
- campaign CPL crosses threshold;
- task completes;
- connector reauthorization required;
- approval deadline approaching;
- new provider data arrives.

### Proactive Candidate

A normalized, evidence-backed claim that may deserve user attention.

### Attention Decision

Deterministic/governed decision about:
- whether to surface;
- when;
- interruption level;
- channel;
- recipient.

### Follow-up Work

A task/proposal/action created after the insight.

Follow-up retains all RQ-07/RQ-12/RQ-14 authority rules.

## 5. Sources of legitimate proactivity

Use explicit provenance classes.

### P0 — User-requested monitor / schedule

Examples:
- `Tell me if CPL exceeds £2.`
- `Every Monday give me a marketing brief.`
- `Notify me when this task finishes.`

Highest expectation of proactive delivery because the user explicitly asked for it.

### P1 — Task/workflow obligation

Examples:
- approval required;
- requested task completed;
- external wait resolved;
- deadline promised in a durable task;
- user input required to continue.

### P2 — Product/domain rule or approved threshold

Examples:
- SLA breach;
- connector health failure;
- budget threshold;
- KPI threshold;
- compliance/security notice;
- campaign pacing rule.

These should preferably be deterministic/event-driven where possible.

### P3 — Strategy/objective-linked insight

Examples:
- a current metric materially threatens an approved company objective;
- cross-domain dependency jeopardizes a milestone;
- evidence indicates an approved strategic target is at risk.

Requires explicit strategy/objective provenance from RQ-11.

### P4 — AI-discovered novel insight

Examples:
- unexpected cross-domain pattern;
- emerging opportunity not covered by a predefined threshold;
- anomaly/hypothesis discovered during background analysis.

Lowest default interruption privilege because it is most inferential.

Rule:
> **The more speculative the source, the quieter the default delivery unless evidence, materiality and urgency strongly justify escalation.**

## 6. Proactivity requires scope/permission before observation

Do not monitor broadly and filter later.

Any watcher/proactive process is scoped by:
- tenant;
- user/team/org scope;
- subscribed products;
- authorized sources;
- sensitivity policy;
- connector permissions;
- explicit watch purpose.

A user's lack of permission means the signal is ineligible, not merely hidden at notification rendering.

Proactive cross-domain analysis follows RQ-10/RQ-11 authorization/context rules.

## 7. Proactivity Contract

Every recurring/event-driven proactive behavior should have a versioned contract.

Candidate:

```text
ProactivityContract
  contract_id / version
  owner product/domain
  trigger type: schedule | event | condition | task-state
  purpose / objective ref
  tenant / audience scope
  source/capability refs
  evidence requirements
  required vs optional sources
  candidate condition
  novelty/dedupe key
  cooldown / suppression policy
  expiry / stop condition
  max evaluation frequency
  attention/delivery policy
  quiet-hours behavior
  budget/credit envelope
  allowed follow-up authority
```

Known proactive behavior should not require an LLM to rediscover its own monitoring policy each run.

## 8. Event-first; AI-later

Do not create always-running AI loops simply to `stay aware`.

Preferred:

```text
provider/domain event
or durable schedule
        ↓
cheap deterministic filter
        ↓
bounded query/aggregation
        ↓
candidate?
   no → stop
   yes
        ↓
C1D/C1G/C2 only if semantic interpretation adds value
```

Use webhooks/change streams/event triggers where reliable.

Use scheduled polling when necessary.

AI should generally evaluate **candidate significance**, not continuously reread the entire company.

This preserves RQ-18 economics and RQ-19 scaling.

## 9. Attention eligibility gates

Before deciding delivery level, candidate must pass:

```text
A. authorized?
B. source sufficiently fresh/available?
C. evidence sufficient for claim?
D. genuinely new/not duplicate?
E. still relevant/not expired?
F. not already resolved/acknowledged?
```

Failure at these gates means suppress, refresh or downgrade—not interrupt.

## 10. Attention decision dimensions

After eligibility, evaluate:

### Materiality
How much does this matter to the user's/team's approved objective or active responsibility?

### Urgency / time decay
How much value is lost if the user sees it later?

### Actionability
Is there something the user/Jarvis can realistically do?

### Evidence strength
Verified vs supported vs incomplete/conflicting under RQ-15.

### Explicit user commitment
Did the user subscribe/request/expect this monitor?

### Novelty
Is this materially different from what was already shown?

### Attention cost
Would interruption damage current work more than delayed awareness costs?

### Delivery context
Is the user currently in the relevant product/task? Is quiet/focus mode active? Is there a natural breakpoint?

Do not collapse these into an opaque universal AI-generated `importance score`.

Use deterministic policy and, where needed, bounded C1D classification for individual semantic dimensions.

## 11. Attention levels

Keep **semantic notification class** from M2-13 separate from **delivery interruption level**.

Candidate delivery levels:

### A0 — Silent state
Recorded in task/product state; no attention request.

### A1 — Ambient / in-context
Shown in relevant workspace/Jarvis panel when user is already there.

### A2 — Inbox / digest
Available in suite inbox or scheduled brief without immediate interruption.

### A3 — Timely alert
Push/in-app alert delivered within an allowed window because delay materially reduces value.

### A4 — Immediate interrupt
Breaks ordinary quiet/focus deferral only under explicitly permitted high-urgency policy.

These are delivery modes, not replacements for M2-13:
- REQUIRED;
- ACTION_REQUIRED;
- ACTIVITY;
- DIGEST.

Example:
`ACTION_REQUIRED` can be A2 if deadline is tomorrow, A3 if due soon, or A4 only if policy says immediate attention is essential.

## 12. Interrupt as little as necessary

Default progression:

```text
Can this wait until relevant surface?
  yes → A1

Can this wait for inbox/digest?
  yes → A2

Will delay materially reduce value?
  yes → A3

Would even normal quiet/focus deferral create serious material harm and is override explicitly permitted?
  yes → A4
```

A4 should be rare.

Do not use urgency styling/interruptions to increase engagement.

## 13. Quiet hours / focus / natural breakpoints

M2-13 quiet-hours precedence remains authoritative.

RQ-21 adds:
- defer non-urgent proactive delivery during quiet/focus periods;
- where technically appropriate, deliver at a natural task breakpoint rather than mid-flow;
- bounded deferral must respect the signal's time sensitivity;
- user-requested exact-time alerts follow their explicit schedule unless tenant/platform policy restricts it;
- REQUIRED/security notices may have stricter platform rules under M2-13.

Do not infer deeply personal cognitive/emotional state from invasive sensing merely to optimize notification timing.

Use product-visible context such as:
- active task/surface;
- meeting/focus state if explicitly connected/permitted;
- quiet hours;
- current workflow phase;
- user preferences.

## 14. In-context before out-of-context

If the user is already working where the insight belongs, prefer:

```text
workspace card
side-panel insight
graph/path highlight
inline exception
```

over:

```text
push notification
email
system interruption
```

This matches the persistent Jarvis panel direction and reduces redundant interruption.

## 15. Briefings are a primary proactive surface

The locked proof moment `morning/priority brief` should be treated as a deliberate low-interruption aggregation surface.

Brief may contain:
- what changed;
- what requires attention;
- what can wait;
- important task completions;
- risks to objectives;
- pending approvals;
- recommended next actions.

Briefing should prioritize **exceptions and changes**, not re-summarize stable dashboards every day.

User/tenant can configure cadence/scope.

## 16. Deduplication and novelty

Never repeatedly notify the same unchanged condition.

Candidate identity should incorporate meaningful state such as:
- subject/resource;
- condition/threshold;
- current severity band;
- relevant period;
- task/approval state.

Notify again only when:
- material state changes;
- severity increases;
- deadline enters a new urgency window;
- prior notification expired/unresolved and policy explicitly allows reminder;
- user requested repetition.

## 17. Cooldown and escalation

Persistent unresolved conditions may use controlled escalation.

Example:

```text
Connector degraded
→ ACTIVITY / inbox

remains degraded + blocks active task
→ ACTION_REQUIRED

still unresolved near deadline
→ timely alert if policy allows
```

Escalation is state/time/policy-driven, not model impatience.

## 18. Attention budget

Introduce an **attention-budget principle**, not a fixed universal notification quota.

Mechanisms:
- dedupe;
- cooldowns;
- bundling;
- digests;
- per-domain/user preferences;
- suppression of low-value repeats;
- prioritize higher-materiality candidates;
- cap low-importance proactive alerts;
- avoid multiple channels for the same event unless policy/urgency requires it.

Do not let every product compete independently for the user's attention; M2-13 Shared Notification Plane arbitrates delivery.

Exact numeric caps are deferred until usage evidence exists.

## 19. User control

Users should be able to understand/manage proactive behavior where policy permits:
- why this was surfaced;
- source/trigger;
- monitored scope;
- frequency/cadence;
- delivery channel;
- pause/snooze/mute;
- convert immediate alert to digest;
- stop user-created monitor;
- follow/open underlying task/source.

Tenant/platform policy may constrain opt-out for REQUIRED/security/compliance notices.

Do not silently create broad persistent monitors from ordinary one-off questions.

## 20. Learned preferences

RQ-23 will govern learning.

RQ-21 locks now:
- dismissals/opens/actions may provide feedback signals;
- these signals may propose preference adjustments;
- Jarvis must not silently infer permission to monitor new sensitive sources;
- Jarvis must not silently suppress REQUIRED/security notices;
- engagement metrics alone do not define relevance;
- preference learning must remain inspectable/reversible according to RQ-23.

## 21. Proactive suggestions vs proactive actions

Proactivity does not increase authority.

Jarvis may proactively:
- surface an insight;
- prepare a draft;
- create an Action Proposal;
- ask whether user wants follow-up;
- start already-authorized monitor/workflow work.

Jarvis may proactively execute a real external action **only** when that action is already authorized by an explicit workflow/delegation/policy under RQ-07/M2-11.

Example:

`Notify me and pause campaign if spend exceeds X`

may become a preauthorized workflow only if:
- exact condition/scope;
- action class;
- permission;
- budget;
- approval policy;
- expiration;
- verification

are explicitly established.

Otherwise threshold crossing creates a proposal/approval request, not automatic mutation.

## 22. Strategy-driven proactivity

RQ-11 company/department strategy may create eligible monitoring context, but not hidden autonomous objectives.

Allowed:
- approved strategic objective has an explicit KPI/dependency;
- Jarvis detects material risk/opportunity;
- evidence and affected objective are shown.

Not allowed:
- model invents a strategic priority;
- model assigns hidden objective weights;
- model creates persistent monitoring of unrelated departments because it `seems useful`.

Strategy-driven insight should deep-link to the strategy/objective and evidence.

## 23. Cross-domain proactivity

Company lens may synthesize a signal across authorized products.

Example:

```text
Marketing lead volume ↑
Recruitment conversion ↓
Operations staffing gap ↑
        ↓
Company hiring objective at risk
```

Jarvis may surface one cross-domain insight rather than three disconnected alerts.

Preserve domain definitions/provenance.

Do not expose hidden domain details to recipients lacking permission; company-level abstraction may need aggregation/redaction.

## 24. Epistemic restraint

Delivery level should reflect RQ-15 evidence state.

Examples:
- Verified + urgent + actionable → stronger alert may be justified;
- Supported/inferential → contextual/digest by default;
- Incomplete → surface as `needs more evidence` only if useful;
- Conflicting → surface conflict, not false conclusion;
- Stale → refresh or disclose before escalation.

Novel AI insight should not use high-urgency language merely because the model generated it confidently.

## 25. Proactivity and security

RQ-20 remains authoritative.

Proactive watchers:
- cannot monitor unauthorized sources;
- cannot turn malicious retrieved content into a new monitor/action;
- cannot expand tool/connector scope;
- are budgeted;
- must resist denial-of-wallet triggers;
- treat external content as untrusted;
- actions still use RQ-07.

A malicious email saying `remind the CEO every hour` cannot create a proactive monitor.

## 26. Proactivity and economics

Track:
- monitor evaluations;
- source reads;
- AI calls per candidate;
- alerts generated;
- alerts suppressed/deduped;
- cost per useful proactive outcome;
- polling vs event-trigger cost;
- low-value notification cost.

Prefer deterministic/event-driven candidate generation before AI interpretation.

Low-value proactive features that consume substantial AI budget should be redesigned or removed.

## 27. Proactivity and durable tasks

RQ-14 tasks naturally generate proactive events:
- completed;
- failed;
- approval required;
- input required;
- external wait resolved;
- intervention required.

Do not create a separate `proactive task system`.

Durable task state emits candidates into the same Attention Decision pipeline.

## 28. Measurement

Do not optimize raw notification open/click rate.

Core metrics:
- **precision / usefulness:** proportion of surfaced items judged useful/relevant;
- **missed-material-signal rate:** important eligible conditions not surfaced;
- false-urgency rate;
- duplicate/repeat rate;
- dismiss/snooze/mute/disable rate;
- actionability rate;
- successful follow-up outcome;
- notification-to-resolution time where meaningful;
- digest compression ratio;
- interruption overrides;
- quiet-hours violations;
- cost per useful proactive outcome;
- user/domain trust feedback;
- strategy/objective relevance accuracy.

Engagement is secondary diagnostic evidence, not the objective.

## 29. Evaluation cases for RQ-16

Add scenarios:
- explicit monitor threshold triggers exactly once;
- threshold remains breached without spam;
- severity escalates and notification appropriately changes;
- irrelevant anomaly is suppressed;
- AI-discovered weak hypothesis goes to digest/ambient rather than urgent push;
- urgent approval nearing expiry alerts appropriately;
- quiet hours defer non-urgent item;
- user is already on relevant dashboard → in-context instead of redundant push;
- revoked permission stops future monitoring;
- cross-domain insight respects recipient access;
- malicious email/document cannot create monitor/action;
- proactive action cannot exceed preauthorized scope;
- required notification cannot be silently learned away;
- user pause/snooze/mute takes effect.

## 30. Proactive UX

Jarvis should make useful proactive intelligence feel like an aware operating system, not a chatty coworker.

Potential surfaces:
- home/priority brief;
- persistent Jarvis side panel;
- ambient graph node/path emphasis;
- `Needs attention` workspace;
- suite inbox;
- task cards;
- OS/mobile/email delivery through M2-13 channels.

Visual urgency must match semantic urgency.

Do not use pulsing/glow/animation for low-value engagement bait.

## 31. What RQ-21 deliberately does NOT lock

- exact notification channel vendors;
- numeric daily alert quotas;
- exact urgency scoring weights;
- exact morning brief time;
- mobile push provider;
- OS-level implementation;
- whether focus-breakpoint detection uses calendar/app state in Production;
- exact adaptive-preference algorithm;
- autonomous action defaults.

These require product/tenant evidence and later implementation decisions.

## 32. Recommended lock

> **RQ-21 — Governed Proactivity with Attention-Aware Delivery**
>
> Jarvis is **proactive in awareness, conservative in interruption, and never proactive in authority**.
>
> Keep **Signal → Proactive Candidate → Attention Decision → Delivery → optional Follow-up Work** as distinct stages. Noticing something does not automatically create a notification, interruption or action.
>
> Legitimate proactivity comes from explicit user monitors/schedules, durable-task obligations, product/domain rules, approved strategy/objectives and AI-discovered insights. The more inferential/speculative the source, the quieter the default delivery.
>
> Every recurring/event-driven proactive behavior uses a versioned **Proactivity Contract** defining purpose, scope, sources, evidence, trigger, dedupe/cooldown, expiry, delivery/quiet-hours policy, budget and allowed follow-up authority.
>
> Proactive observation is authorization-scoped before retrieval. Jarvis does not monitor inaccessible data and filter it only after analysis.
>
> Prefer **event/schedule → deterministic filter → bounded query → AI interpretation only for meaningful candidates** rather than continuous AI monitoring loops.
>
> Attention eligibility requires authorized, sufficiently fresh/evidenced, novel, unresolved and still-relevant information. Delivery then considers materiality, urgency/time decay, actionability, evidence strength, explicit user commitment and interruption cost.
>
> Keep M2-13 notification semantic classes (**REQUIRED, ACTION_REQUIRED, ACTIVITY, DIGEST**) separate from delivery interruption level. Use the lowest interruption level that preserves the value of the information.
>
> Default delivery order is **in-context/ambient → inbox/digest → timely alert → immediate interruption**. Immediate interruption is rare and requires explicit high-urgency policy.
>
> Quiet hours, user preferences, current task/focus and natural breakpoints influence delivery timing, subject to REQUIRED/security/platform rules and real urgency.
>
> Prefer in-context Jarvis/workspace delivery when the user is already operating in the relevant surface. The morning/priority brief is a primary proactive aggregation surface for changes, exceptions, pending decisions and objective risks.
>
> Deduplicate unchanged conditions, use cooldowns/bundling/digests and treat user attention as a scarce resource shared across products.
>
> Users can inspect why an item appeared and manage monitors/preferences where policy permits. Ordinary one-off questions do not silently create persistent monitoring.
>
> Proactivity never expands authority. External mutations execute proactively only when an explicit preauthorized workflow/delegation already grants that exact capability/condition/scope; otherwise Jarvis produces a proposal or approval request.
>
> Strategy can guide proactive relevance only through approved inspectable objectives; Jarvis cannot invent hidden organizational priorities.
>
> Measure useful proactive outcomes, missed material signals, false urgency, duplicate/spam, dismiss/mute behavior, successful follow-up and cost—not notification engagement as the primary goal.
>
> **Jarvis should make important work harder to miss without making focused work harder to do.**

## 33. Recommendation

**LOCK RQ-21 as written.**

This gives Jarvis genuine foresight while preserving attention, user agency, governance and trust.
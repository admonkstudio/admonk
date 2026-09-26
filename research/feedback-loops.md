# Product-Development Feedback Loops

**Status:** APPROVED OPERATING MODEL — toolchain remains evidence-driven  
**Approved direction:** R012 — Loop-first minimum + evidence-triggered observability

A capability/tool earns its place by improving a decision or action.

## Loop contract

```text
Problem / uncertainty
→ observation or evidence
→ responsible reviewer
→ decision
→ action
→ new evidence
→ improvement / correction
```

Every production loop must identify:

1. **Signal** — what exposes the condition?
2. **Owner** — who reviews/responds?
3. **Trigger/cadence** — when is it actionable?
4. **Decision** — what can this evidence change?
5. **Action** — what happens?
6. **Verification** — what proves the action worked?
7. **Cost** — what does collection/review cost?

If evidence has no plausible decision/action, remove or defer it.

## Minimum Production loops

### 1. Critical journey health
Can the primary workflow succeed for users?

### 2. Failure diagnosis
Is there enough structured context to act when it fails?

### 3. Change and recovery
Can a failure be connected to a change and can recovery be verified?

### 4. Product outcome
Is the intended core value actually being delivered?

### 5. Economic loop
For AI/usage-driven products, are cost per successful outcome and commercial usage ceilings healthy?

### 6. Incident/review learning
Do material failures produce a decision, remediation and recurrence check?

## Maturity rule

Prototype:
- basic error visibility;
- enough variable-cost visibility to prevent runaway spend.

Production:
- all applicable minimum loops above;
- named owners;
- actionable thresholds/cadence.

Add richer traces/log correlation/service maps/profiling only when incidents, diagnosis cost, architecture complexity, risk or external requirements justify them.

## Alerting rule

Interrupt a human urgently only when:
- impact is material or imminent;
- action is required soon;
- the receiver can take meaningful action.

Other evidence may be ticketed, reviewed periodically or queried on demand.

## Existing loop shapes

### Design consistency
semantic/token decision
→ implementation
→ visual/accessibility review
→ defect/drift evidence
→ token/component improvement

### Browser quality
critical journey
→ automated/manual browser test
→ failure evidence
→ engineering correction
→ regression protection

### Production reliability
runtime failure
→ error/event evidence
→ diagnosis
→ fix/recovery
→ health verification

### Product learning
user behavior/feedback
→ product evidence
→ scope/UX decision
→ product change
→ new behavior evidence

### Cost/scaling
usage/cost evidence
→ architecture/capability review
→ optimization/scale decision
→ measured cost/performance outcome

## Anti-pattern

```text
Tool
→ dashboard
→ nobody owns/reviews it
→ no decision changes
```

This is instrumentation without a feedback loop and should normally be removed or deferred.

## Final rule

> **Instrument decisions, not curiosity. Richer observability is earned when its decision value exceeds its operating cost.**


## Product analytics operating rule

Approved direction:
`research/synthesis/R015-product-analytics-feedback-loop.md`

Use a **progressive outcome tree**:

1. define one primary product-value outcome;
2. add only the small controllable driver set needed for current decisions;
3. preserve guardrails for quality, accessibility, reliability, trust/safety, AI unit economics, support burden and privacy;
4. deepen the metric hierarchy only when recurring decisions or product complexity justify it.

### Metric contract

A governed metric should record:
- name and product question;
- precise definition;
- event/data source;
- population/segment;
- owner;
- role: outcome / driver / guardrail;
- decision/action it may change;
- review cadence/trigger;
- known limitations;
- privacy/retention considerations;
- last definition change.

### Analytics loop

```text
product outcome
→ observed movement
→ driver/segment investigation
→ hypothesis
→ decision/action
→ release/experiment
→ re-measure outcome + guardrails
→ keep / revise / reverse
```

Instrument only what answers a current validated question or closes a current decision loop.

Do not treat one metric as causal truth merely because it correlates with an outcome.

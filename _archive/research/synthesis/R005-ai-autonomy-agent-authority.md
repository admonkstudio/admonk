# R005 — AI Autonomy / Agent Authority

**Date:** 2026-09-26  
**Mode:** Document Population Research  
**Status:** LOCKED — product-owner approved 2026-09-26  
**Target:** future `doctrine/ai-autonomy-principles.md`, capability manifests, approval policy, agent evaluation/operations standards

## Research question

How much authority should Admonk agents receive, and how should human oversight work, so agents are genuinely useful without turning every action into an approval prompt or allowing autonomy to outrun control?

The core tension is:

- **human oversight that remains meaningful**, versus
- **enough autonomy to make agents materially useful**.

## Source A — Anthropic: Measuring AI agent autonomy in practice

**Source:** SRC-AI-001

### What it optimizes for

Understanding how people and agents actually share control in real deployments.

Key findings relevant to Admonk:
- experienced users grant more autonomy;
- those same users also interrupt agents more often;
- per-action approval is not the only form of oversight;
- agents stopping themselves to ask for clarification is an important safeguard;
- real-world monitoring is needed because pre-deployment evaluations do not fully capture actual autonomy.

### Strongest ideas for Admonk

- oversight is a system, not a confirmation dialog;
- humans need visibility and easy intervention;
- agent-initiated clarification is a first-class control;
- approval fatigue can reduce the value of step-by-step confirmation;
- autonomy should be measured in actual behavior, not inferred only from configuration;
- post-deployment monitoring should inform future autonomy policy.

### Challenge

Copied literally, the findings can be overgeneralized:
- much of the strongest session data comes from Claude Code/software engineering;
- experienced users choosing auto-approve does not prove broad autonomy is safe in other domains;
- users can become overconfident as well as more skilled;
- monitoring after an action is insufficient when the action is irreversible or high consequence;
- model-generated risk/autonomy classification has methodological limits.

Anthropic's research is strongest for **oversight design and feedback loops**, not for defining the full permission boundary.

## Source B — OWASP Agent Control Standard (ACS)

**Source:** SRC-AI-002

### What it optimizes for

Runtime agent control, transparency and enforceable policy.

ACS argues agents should be:
- inspectable;
- traceable;
- instrumentable;
- controllable at runtime.

It focuses on standardized control hooks so policies can govern what an agent can access and do across tools/environments.

### Strongest ideas for Admonk

- instructions alone are not authorization;
- agent identity/action/access should be observable;
- policy should be enforceable outside model reasoning;
- runtime control should exist at the side-effect boundary;
- agent actions need traceability across tools;
- control primitives should be portable across model/framework changes.

This strongly supports Admonk's model-neutral capability manifest and action classes.

### Challenge

Copied literally, an enterprise control standard can:
- encourage middleware/control-plane infrastructure before the product needs it;
- make every agent deployment operationally heavy;
- prioritize inspectability architecture before user value is proven;
- say less about when a human should approve versus merely monitor;
- create a false sense that instrumentation can compensate for overbroad permissions.

ACS is strongest as the **enforcement/control-plane layer**, not the complete autonomy philosophy.

## Synthesis

The sources are complementary rather than truly opposed.

Anthropic shows:
> **Oversight must work in practice; repeated approval of every step is not necessarily the safest or most usable model.**

OWASP ACS shows:
> **Autonomy without enforceable runtime boundaries and traceability is not trustworthy control.**

Admonk therefore needs:
**risk-tiered authority + enforceable capability boundaries + meaningful human oversight + observed/evaluated autonomy.**

## Proposed Admonk AI-autonomy doctrine

### 1. Authority is not model capability

An agent being capable of an action does not mean it is authorized to perform it.

Authority must be determined by:
- actor/user identity;
- tenant/company policy;
- product/domain policy;
- capability manifest;
- connector/provider scopes;
- data sensitivity;
- action class;
- environment;
- limits;
- approval state.

The model may reason about what to do.
It must not define its own permissions.

### 2. Action classes are the starting contract

Use:
- READ;
- DRAFT;
- PROPOSE;
- EXECUTE_REVERSIBLE;
- EXECUTE_CONSEQUENTIAL;
- DESTRUCTIVE.

Default intent:

**READ / DRAFT**
May run autonomously inside explicitly authorized scope.

**PROPOSE**
May reason/recommend autonomously, but the proposal itself does not authorize external side effects.

**EXECUTE_REVERSIBLE**
May be automated only when explicitly allowed, bounded, observable and recoverable. Approval depth depends on risk and maturity.

**EXECUTE_CONSEQUENTIAL**
Requires named human approval by default before the side effect.

**DESTRUCTIVE**
Denied by default; use a controlled manual/special procedure unless exceptionally justified.

### 3. Autonomy is earned, not assumed

Greater autonomy may be granted only through an explicit policy change by an authorized human/system owner after evidence such as:
- evaluation results;
- incident/failure history;
- rollback reliability;
- real production observations;
- bounded scope;
- acceptable error/consequence rate.

Agents cannot self-expand their permissions.

### 4. Human oversight is broader than approvals

Meaningful oversight may include:
- previewing a plan;
- approving a batch/strategy;
- approving consequential side effects;
- monitoring execution;
- receiving exception/escalation events;
- interrupting/redirecting;
- reviewing traces/audit history;
- setting limits/kill switches.

Do not use per-action prompts when they create approval fatigue without reducing material risk.

### 5. Agents must know when to stop

The agent should pause/escalate when:
- user intent is materially ambiguous;
- required permission is missing;
- confidence/evidence is insufficient for a consequential action;
- the requested action crosses policy;
- retries/failures exceed limits;
- cost/volume/time thresholds are exceeded;
- the environment or source is untrusted beyond the allowed policy.

Agent-initiated clarification is part of autonomy control.

### 6. Runtime enforcement lives outside the model

Use deterministic/enforceable controls for:
- authorization;
- provider scopes;
- spend/volume/rate limits;
- environment restrictions;
- required approvals;
- action allow/deny rules;
- audit events;
- secret boundaries.

Prompts/instructions are behavior guidance, not a security boundary.

### 7. Observe actual autonomy

Track as relevant:
- tool calls;
- action classes;
- approvals;
- interruptions;
- agent-initiated stops;
- failures/retries;
- policy denials;
- rollbacks;
- incidents;
- cost/volume;
- outcome quality.

Autonomy policy should evolve from observed evidence, not model marketing claims.

### 8. Least privilege applies to context too

Do not expose all company knowledge/data to every agent merely because the model can use it.

Scope:
- data;
- tools;
- permissions;
- memory/context;
- execution environment

to the current capability.

### 9. Multi-agent systems do not multiply authority

Subagents inherit only the authority needed for their delegated task.

A coordinator cannot silently grant a subagent permissions the coordinator/user/tenant does not possess.

### 10. Model neutrality

Agent authority belongs to the product control layer, not to one model/provider.

Changing the model should not silently change:
- permissions;
- action classes;
- approval policy;
- audit requirements;
- data access.

## Proposed definition

> **Agent autonomy is bounded freedom to reason and act inside an explicit authority envelope, with stronger human control at higher-consequence boundaries and evidence-driven expansion over time.**

## Product-owner decision

**Approved direction: B — Risk-tiered, evidence-earned autonomy.**

### A. Approval-first
All external writes/actions require a human confirmation by default, even when reversible.

**Benefit:** very conservative.  
**Risk:** approval fatigue; weak automation value; users may blindly confirm.

### B. Risk-tiered, evidence-earned autonomy — RECOMMENDED
READ/DRAFT are autonomous inside scope. Reversible actions may become autonomous when explicitly authorized, bounded, observable and proven. Consequential actions require human approval by default. Destructive actions are denied by default.

**Benefit:** useful automation without surrendering control; autonomy can expand from evidence.  
**Risk:** requires accurate action classification, observability and policy ownership.

### C. Monitor-first broad autonomy
Once a user enables an agent/tool, most authorized actions execute automatically; humans monitor and intervene.

**Benefit:** highest automation/productivity.  
**Risk:** failures can occur before intervention, especially in consequential workflows.

## Locked Admonk direction

**B — Risk-tiered, evidence-earned autonomy.**

This preserves the value of agents while keeping permissions, runtime controls and irreversible consequences outside model discretion.

## Lock result

- AI autonomy doctrine promoted.
- Product Supervisor action classes reconciled with evidence-earned autonomy.
- Runtime control remains outside model discretion.
- Post-deployment autonomy monitoring retained as a standards/feedback-loop requirement.
- R005 locked.
- Next item: R006 — Operations / Reliability / AI Economics doctrine.

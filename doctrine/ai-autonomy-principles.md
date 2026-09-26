# Admonk AI Autonomy Principles

**Status:** APPROVED DOCTRINE  
**Approved:** 2026-09-26  
**Owner:** Admonk Studio  
**Research basis:** `research/synthesis/R005-ai-autonomy-agent-authority.md`  
**Sources:** SRC-AI-001, SRC-AI-002

## Purpose

Define how much authority AI agents may receive and how that authority may expand without allowing model capability to become system permission.

## 1. Risk-tiered, evidence-earned autonomy

> **READ/DRAFT may operate autonomously inside scope. Reversible actions may become autonomous when explicitly authorized, bounded, observable and proven. Consequential actions require human approval by default. Destructive actions are denied by default.**

Autonomy is earned through evidence.
It is never inferred merely from model capability.

## 2. Authority is external to the model

Authority comes from:
- user/actor identity;
- tenant/company policy;
- product/domain policy;
- capability manifest;
- connector/provider scopes;
- data sensitivity;
- action class;
- environment;
- rate/spend/volume limits;
- approval state.

The model must not define or expand its own authority.

## 3. Action classes

### READ
May operate autonomously within least-privilege scope.

### DRAFT
May create non-executed outputs autonomously. Draft status must remain clear.

### PROPOSE
May recommend actions, but recommendation does not authorize side effects.

### EXECUTE_REVERSIBLE
May be automated only when explicitly allowed, bounded, observable and recoverable. Approval depth follows risk/evidence.

### EXECUTE_CONSEQUENTIAL
Requires named human approval by default before the side effect.

### DESTRUCTIVE
Denied by default; use a controlled manual/special procedure unless exceptionally justified.

## 4. Human oversight is not only confirmation

Oversight may include:
- plan preview;
- batch/strategy approval;
- consequential-action approval;
- monitoring;
- exception/escalation;
- interruption/redirect;
- trace/audit review;
- limits and kill switches.

Avoid approval fatigue that produces blind confirmation rather than meaningful control.

## 5. Agents must stop when needed

Agents should pause/escalate when:
- user intent is materially ambiguous;
- permission is missing;
- evidence/confidence is insufficient for consequential action;
- policy would be crossed;
- failures/retries exceed limits;
- cost/volume/time thresholds are exceeded;
- environment/source trust is insufficient.

## 6. Runtime controls live outside prompts

Use deterministic enforcement for:
- authorization;
- provider scopes;
- spend/rate/volume limits;
- environment restrictions;
- mandatory approvals;
- allow/deny policy;
- secrets;
- audit events.

Instructions guide behavior. They are not the security boundary.

## 7. Autonomy expands from evidence

An authorized owner may expand autonomy only after relevant evidence such as:
- evaluation results;
- production observation;
- failure/incident history;
- rollback reliability;
- bounded scope;
- acceptable outcome quality;
- acceptable economic cost.

Agents may never self-expand permissions.

## 8. Least privilege applies to context

Do not expose all company knowledge, tools or memories to every agent.

Scope context and tools to the capability being performed.

## 9. Multi-agent delegation does not multiply authority

A coordinator cannot delegate authority it does not possess.

Subagents receive only the minimum authority necessary for the delegated task.

## 10. Model neutrality

Changing a model/provider must not silently change:
- permissions;
- action classes;
- approval policy;
- audit requirements;
- data access;
- economic limits.

## Final rule

> **Agent autonomy is bounded freedom to reason and act inside an explicit authority envelope, with stronger human control at higher-consequence boundaries and evidence-driven expansion over time.**

# Jarvis Research Question 12 — Agent Topology & Specialist Worker Contract

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** What should an `agent` actually mean inside Jarvis, and when should multiple agents exist?  
**Status:** LOCKED — OWNER ACCEPTED  
**Implementation authority:** None. Product/runtime/agent-topology research only.

## 1. Decision problem

Jarvis now has clear distinctions for:
- deterministic software;
- Decision Plane;
- fast/deep AI;
- context assembly;
- workspaces;
- governed actions;
- connectors;
- operating lenses.

The remaining danger is **agent sprawl**:

```text
Marketing Agent
Research Agent
Data Agent
Campaign Agent
Analytics Agent
SEO Agent
Executive Agent
...
```

where every prompt/tool bundle becomes a persistent named agent.

That would create:
- duplicated identities/personas;
- overlapping tool authority;
- harder context governance;
- unnecessary model calls;
- expensive handoffs;
- difficult evaluation;
- user confusion about who is speaking/acting;
- orchestration complexity without proven benefit.

RQ-12 defines a strict vocabulary and escalation rule.

## 2. External research evidence

### OpenAI — agent vs code orchestration

OpenAI's current Agents SDK defines an agent as an LLM configured with instructions, tools and optional handoffs/guardrails/structured output. Its orchestration guidance explicitly distinguishes:
- LLM-driven orchestration for open-ended work;
- code-driven orchestration for deterministic/predictable speed, cost and behavior.

It also distinguishes:
- **agents as tools** — a manager remains in control and calls specialists for bounded work;
- **handoffs** — a specialist becomes the active agent for the remainder of the turn.

Sources:
- https://openai.github.io/openai-agents-python/agents/
- https://openai.github.io/openai-agents-python/multi_agent/

### Anthropic — workflows are not agents

Anthropic's production guidance draws a strong distinction:
- workflows use predefined code paths;
- agents dynamically control their own process/tool use.

It recommends adding agentic complexity only when simpler patterns demonstrably fail.

Source:
- https://www.anthropic.com/engineering/building-effective-agents

### Anthropic — multi-agent systems are expensive and task-shaped

Anthropic's production multi-agent research system reports:
- agents use roughly 4× the tokens of ordinary chat in its data;
- multi-agent systems use roughly 15× the tokens of ordinary chat;
- multi-agent systems work especially well for high-value work with heavy parallelization, very large information space and many complex tools;
- they are a worse fit when workers need shared context or have tightly coupled dependencies.

Source:
- https://www.anthropic.com/engineering/multi-agent-research-system

### Anthropic — skills can create specialization without a separate agent

Anthropic's Agent Skills work packages domain/procedural expertise as reusable instructions/scripts/resources that a general agent can discover dynamically.

This supports a key architectural idea for Admonk:

> specialization can often be a reusable capability/skill/context bundle rather than a persistent autonomous identity.

Source:
- https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills

## 3. Core conclusion

> **An Admonk agent is a bounded autonomous worker that can dynamically choose multiple steps/tools in a loop to achieve a scoped objective.**

If the path is predetermined or can be handled by ordinary code, a Decision Plane call, one model call, a tool, a capability, a workflow or a reusable skill, it is **not an agent**.

Recommended escalation ladder:

```text
C0 deterministic capability/tool
        ↓ if semantic judgment needed
C1D Decision Plane
        ↓ if language generation needed
C1G fast model call
        ↓ if fixed multi-step process needed
Workflow
        ↓ if adaptive multi-step reasoning needed
Single bounded Agent
        ↓ if independent parallel adaptive work proves necessary
Multi-agent / specialist workers
```

## 4. Canonical vocabulary

### Capability

A stable business ability exposed by Admonk software.

Examples:
- `marketing.campaign.pause`;
- `marketing.performance.query`;
- `support.case.assign`.

A capability has semantics, schema, authority and ownership.

It is **not an agent**.

### Tool

A typed operation used by software or an agent to observe/compute/act.

Examples:
- query campaign metrics;
- search approved documents;
- calculate a metric;
- call a connector read capability.

Tools should be narrow, well-documented and token-efficient.

They are **not agents**.

### Skill / Procedure Pack

A reusable package of procedural/domain instructions, references, scripts or tool-usage guidance loaded when relevant.

Examples:
- Kalam marketing evidence-review procedure;
- approved campaign-analysis methodology;
- report-writing standard;
- SEO diagnostic procedure.

A skill can make one Jarvis/worker behave like a specialist without creating another persistent agent identity.

### Workflow

A predefined or code-controlled sequence of steps, possibly including AI calls.

Examples:
- retrieve metrics → validate freshness → calculate KPI → summarize;
- draft campaign → policy check → approval surface;
- evidence collection → report template population.

If software already knows the sequence, use a workflow rather than an autonomous agent.

### Agent

A task-scoped autonomous LLM worker that:
- receives an objective;
- receives bounded authorized context;
- has an explicit tool/capability subset;
- can decide the next step dynamically;
- loops based on environment/tool results;
- has stop/budget conditions;
- returns a typed result/artifact/reference.

### Multi-agent system

Two or more autonomous workers coordinating/delegating adaptive subtasks.

This is a **C3 escalation**, not the default architecture.

## 5. One user-facing Jarvis identity

RQ-11 remains authoritative:

> **One Jarvis.**

Do not expose a zoo of assistant identities to the user.

Preferred user experience:

```text
User
  ↓
Jarvis
  ↓ internal if needed
temporary specialist worker(s)
  ↓
Jarvis synthesizes/presents
```

The user may see transparent status such as:
- `Researching acquisition evidence`;
- `Recruitment analysis running`;
- `Cross-checking sources`;

but should not need to manage a cast of named AI personalities.

## 6. Prefer manager/worker over conversational handoff

OpenAI's `agents as tools` pattern is a strong conceptual fit:
- Jarvis remains owner of the conversation;
- a specialist receives a bounded generated task/context;
- it returns structured output;
- Jarvis synthesizes the final answer/workspace.

Therefore default Admonk pattern:

```text
Jarvis Task Engine
        ↓
Specialist Worker as bounded callable task
        ↓
structured result / artifact ref
        ↓
Jarvis
```

Do **not** normally hand the user-facing conversation identity to a worker.

True user-facing handoff is reserved for a future case where direct specialist interaction demonstrably provides better product value, and even then the Jarvis identity/authority model must remain coherent.

## 7. Most domain specialization should NOT create agents

Example — Marketing:

Do not automatically build:
- Meta Agent;
- GA4 Agent;
- SEO Agent;
- Content Agent;
- Campaign Agent;
- Analytics Agent.

Prefer:

```text
Marketing Operating Lens
+ Marketing context
+ Marketing capabilities/tools
+ task-specific skill/procedure
+ appropriate C0/C1/C2 route
```

Only instantiate an agent when the task needs autonomous adaptive looping.

Example:
`Explain yesterday's Meta spend`
→ query + C1G, no agent.

`Run our standard weekly acquisition report`
→ deterministic workflow, no agent.

`Investigate why acquisition efficiency collapsed; follow evidence across multiple systems until you can explain the likely drivers`
→ may justify one C2 agent.

`Investigate 10 independent markets/languages simultaneously and synthesize patterns`
→ may justify C3 parallel specialist workers.

## 8. Agent Profile vs Agent Instance

Keep reusable configuration separate from running workers.

### Agent Profile

A versioned reusable definition:

```text
AgentProfile
  profile_key
  purpose
  cognitive route/model profile
  allowed context classes/sources
  skill/procedure refs
  allowed tool/capability set
  output schema
  max autonomy/turn/tool/time budgets
  default stop/escalation rules
  evaluation suite/version
```

### Agent Instance

A temporary execution created for one parent task/subtask:

```text
AgentInstance
  instance_id
  parent_task_id
  profile/version
  scoped objective
  delegated context packet
  delegated capability subset
  runtime budget
  start/end/status
  result/artifact refs
  trace/usage refs
```

The instance normally terminates when the subtask finishes.

## 9. Agents do not own identity, memory or data

An agent instance does not own:
- tenant identity;
- permanent user profile;
- company knowledge;
- provider credentials;
- business database;
- permissions;
- long-term authority;
- specialist product semantics.

It receives references/scoped context through RQ-10 and capabilities through M2-11/RQ-07.

Any durable artifact/output is saved into an owning product/task/resource contract.

## 10. Delegated authority is always a subset

M2-11 already locks:

> subagents may receive less authority but never more.

Agent delegation must therefore compute:

```text
Worker Effective Authority
 =
parent/delegator authority
∩ agent profile capability manifest
∩ task delegation
∩ tenant/product policy
∩ context restrictions
∩ connector/provider capability
∩ runtime limits
∩ action approval state
```

Workers cannot delegate a capability they do not possess.

Approval remains action-bound under RQ-07.

## 11. Single-agent preference

When adaptive reasoning is genuinely needed, prefer **one capable agent + well-designed tools** before adding more agents.

Reasons:
- less context duplication;
- lower token cost;
- simpler tracing;
- less coordination error;
- easier evaluation;
- easier recovery;
- fewer conflicting intermediate conclusions.

Escalate from C2 single-agent to C3 multi-agent only when evals show the simpler route misses the quality/performance target.

## 12. Multi-agent admission criteria

Use multiple agents only if at least one of these is materially true:

### MA1 — Independent parallel work

Several substantial subtasks can run independently.

Example:
- investigate 12 independent countries/languages/providers;
- search multiple independent evidence spaces.

### MA2 — Context partitioning

The information/tool surface is too large/noisy for one context, and cleanly separable workers improve focus.

### MA3 — Genuine specialist boundaries

Workers require materially different:
- context;
- tools;
- methodologies/skills;
- evaluation criteria.

### MA4 — Parallelism materially reduces wall-clock time

Independent expensive work can run concurrently and user value justifies cost.

### MA5 — Evaluation demonstrates quality gain

Representative regression tasks show multi-agent execution produces better successful outcomes than one strong agent/tool loop.

If none apply, do not use multi-agent.

## 13. Multi-agent rejection signals

Avoid multi-agent when:
- workers need nearly identical full context;
- tasks are heavily sequential/dependent;
- a deterministic workflow already exists;
- one C2 model can solve it reliably;
- coordination tokens exceed useful work;
- worker outputs require extensive reinterpretation/game-of-telephone;
- the task is low-value/latency-sensitive;
- a user simply asked a straightforward question.

Anthropic's production research specifically reports poor fit where agents require shared context or many interdependencies, while multi-agent systems can consume roughly 15× chat token volume.

## 14. Orchestration hierarchy

Do not let an LLM orchestrate where code already knows the plan.

Preferred hierarchy:

```text
Known decomposition?
   yes → code/workflow orchestrates
   no
    ↓
Can C1D choose among known routes?
   yes → Decision Plane
   no
    ↓
C2 agent plans adaptive steps
   ↓ if parallel independent work proven
C3 agent orchestrates bounded worker instances
```

This combines OpenAI's guidance that code orchestration provides more deterministic speed/cost behavior with Anthropic's guidance to use autonomous agents for unpredictable/open-ended paths.

## 15. Worker communication

Prefer structured artifacts/results over conversational agent-to-agent chatter.

Bad:

```text
Agent A writes long prose to Agent B
Agent B paraphrases to Agent C
Agent C summarizes to Jarvis
```

Preferred:

```text
Worker
  ↓
structured result
+ evidence/resource refs
+ artifact ref
+ confidence/gaps
  ↓
coordinator
```

For large outputs, workers should write durable task artifacts/resources and return lightweight references.

This reduces token duplication and 'game of telephone' loss.

## 16. Agent Result contract

Candidate:

```text
AgentResult
  instance_id
  status
  objective
  result_type
  structured_result
  artifact/resource refs
  evidence/provenance refs
  unresolved gaps
  recommended follow-up?
  action proposals[]
  usage/cost
  trace ref
```

An agent returns **proposals**, not self-authorized side effects.

Any real action enters RQ-07.

## 17. Stop conditions and budgets

Every agent instance needs explicit limits.

At minimum:
- max wall-clock/runtime;
- max model/credit budget;
- max tool calls/iterations where appropriate;
- no-progress/stagnation detection;
- success criteria;
- failure/escalation criteria;
- cancellation support.

Do not let agents continue because they can still generate another thought/tool call.

Exact durable execution mechanics belong to RQ-14.

## 18. Agent creation is not free

Before spawning a worker, the orchestrator should consider:
- expected quality gain;
- expected latency gain/loss;
- context duplication;
- token/credit cost;
- coordination complexity;
- failure/recovery burden.

Where useful, the Reflex Decision Plane can evaluate bounded admission signals, but the actual multi-agent policy is an Admonk runtime rule informed by evals.

## 19. Dynamic agent generation

Do not allow unrestricted runtime creation of permanent agent definitions.

A C3 orchestrator may instantiate **temporary workers** from approved profiles/templates with task-specific instructions/context.

Example:

```text
Approved profile:
research.worker

runtime instance A:
research French recruitment sources

runtime instance B:
research German recruitment sources
```

Both remain instances of one approved profile, not newly invented persistent agents.

Novel worker profiles can be proposed during development/learning, but require evaluation/versioning before Production availability.

## 20. Agent profile library

Start deliberately small.

Likely generic profiles worth testing:

### Research Worker
- open-ended evidence acquisition/verification;
- read-only tools;
- source/provenance contract.

### Analysis Worker
- bounded deep analysis over supplied structured evidence;
- limited retrieval where permitted;
- structured findings.

### Artifact Worker
- produces a complex document/plan/artifact from approved inputs;
- no direct consequential execution.

### Verification/Evaluator Worker
- checks an output against explicit criteria/evidence;
- preferably Decision Plane/C1D where bounded; full agent only if adaptive investigation is needed.

These are **candidate patterns**, not a requirement to ship four named agents.

Domain specialization should generally come from context/tools/skills passed into these profiles.

## 21. Jarvis itself should not always run as an agent loop

This is critical.

Jarvis is the product experience/orchestration layer.

For many requests it should execute:
- C0 software;
- C1D decision;
- C1G single generation;
- deterministic workflow;

without an autonomous agent loop.

Jarvis becomes agentic only for the specific task/run that requires adaptive autonomous planning.

Therefore:

> **Jarvis is an intelligent software system that can instantiate agents; Jarvis is not permanently one giant autonomous agent.**

## 22. Agent vs long-running task

Do not equate `long-running` with `agent`.

A three-hour deterministic backfill is a long-running job, not an agent.

A scheduled report workflow is a durable task/workflow, not an agent merely because it runs tomorrow.

An agent is defined by adaptive model-directed step/tool choice, not elapsed time or background execution.

RQ-14 will define long-running task architecture separately.

## 23. Agent vs Operating Lens

Do not create:
- Executive Agent;
- Marketing Agent;
- Recruitment Agent

merely to represent lens/context.

RQ-11 Operating Lens selects:
- focus;
- context eligibility;
- strategy;
- domain capabilities;
- presentation.

Only if a specific task under that lens requires adaptive multi-step autonomy should a worker instance be created.

## 24. Agent vs connector

Do not create a `Meta Agent` because Meta is connected.

RQ-08 connector exposes:
- data;
- reads;
- actions.

Those are capabilities/tools usable by software or an agent.

Provider integration does not imply an agent.

## 25. Evaluation

Agent topology must be evaluated as a routing decision.

Representative suite should compare:

```text
deterministic workflow
vs
C1/C2 single model
vs
single agent + tools
vs
multi-agent
```

Measure:
- final task success;
- factual/evidence quality;
- wall-clock time;
- tokens/credits;
- tool calls;
- retries;
- coordination overhead;
- user corrections;
- duplicated context;
- action-policy correctness;
- recovery/resume behavior;
- unnecessary-agent rate;
- multi-agent admission accuracy.

Primary economic metric remains:

> **cost per successful quality outcome**

not:
`number of agents` or `maximum autonomy`.

## 26. Relationship to RQ-13

Agent profiles should request model/runtime profiles rather than hard-coded provider/model names.

Example:

```text
agent_profile: research.worker
cognitive_profile: deep-research
```

RQ-13 will define replaceable model/provider architecture.

## 27. Recommended lock

> **RQ-12 — One Jarvis, Task-Scoped Agent Workers**
>
> An Admonk **agent** is a bounded autonomous LLM worker that dynamically chooses multiple steps/tools in a loop to achieve a scoped objective. If the path is predetermined or can be solved with code, a Decision Plane call, a single model call, a tool, capability, workflow or reusable skill, it is not an agent.
>
> Jarvis remains the single user-facing intelligent experience. Specialist agents are normally temporary task-scoped workers called internally; they do not become separate user-facing assistant identities or permanent business brains.
>
> Specialization should first be expressed through **Operating Lenses, authorized context, capabilities/tools, skills/procedures and workflows**. A separate agent is created only when adaptive autonomous looping materially improves the task.
>
> Prefer one capable agent + well-designed tools before multi-agent orchestration. Multi-agent execution is a C3 escalation reserved for high-value tasks with genuine parallelism, context partitioning, distinct specialist boundaries or eval-proven quality gains.
>
> Code/workflow orchestration is preferred when the decomposition is known; Decision Plane routing is preferred for bounded choices; model-driven orchestration is reserved for unpredictable task decomposition.
>
> Reusable **Agent Profiles** are versioned/evaluated configurations; runtime **Agent Instances** are temporary executions bound to one parent task/subtask.
>
> Agents never own tenant identity, permissions, provider credentials, company/domain truth or permanent business memory. They receive scoped context and a delegated subset of capabilities, and delegation can never amplify authority.
>
> Worker communication should use structured results/artifacts/evidence references rather than long agent-to-agent conversations wherever possible.
>
> Every agent has explicit success, stop, budget, cancellation and escalation conditions. Long-running work is not automatically agentic.
>
> Jarvis itself is not permanently one giant autonomous agent: **Jarvis is intelligent software that can instantiate bounded agents when the work genuinely requires them.**

## 28. Recommendation

**LOCK RQ-12 as written.**

This minimizes cost and complexity while preserving agentic power exactly where adaptive autonomy creates measurable value.
# SIA — Single Brain vs Multi-Agent Orchestration Research

**Date:** 2026-09-29  
**Status:** RESEARCH COMPLETE — ARCHITECTURE RECOMMENDATION PENDING MASTER-PLAN AUDIT  
**Environment name:** temporary working name SOLO  
**Intelligent operator:** SIA

---

## 1. Question

Should SIA:

A. perform essentially all business work itself as one giant general agent;

B. maintain one permanent specialist agent for every role/task in the Company Graph; or

C. remain the single company brain/user-facing operator while dynamically invoking bounded specialist agents only when specialization materially improves the task?

---

## 2. Research conclusion

**Recommended direction: C — SIA Supervisor + Dynamic Specialists + Deterministic Workflows.**

Do not build:
- one monolithic SIA with every instruction/tool loaded simultaneously;
- one permanently active agent for every person, role, responsibility or task.

Instead:

> **SIA owns company understanding, user interaction, orchestration and synthesis. Specialist agent profiles exist as reusable governed capabilities and are instantiated/invoked when a task genuinely benefits from different context, instructions, tools, policy, model, evaluation or parallelism.**

Roles inform specialist definitions but do not map 1:1 to agent processes.

Principle:

> **One brain. Many specialist capabilities. Spawn workers when the work justifies them.**

---

# 3. Market / engineering evidence

## OpenAI

Current guidance recommends starting with one agent where possible.

Specialists should be added only when they materially improve:
- capability isolation;
- policy isolation;
- prompt/instruction clarity;
- tool clarity;
- traceability.

The manager/agents-as-tools pattern is preferred when one central agent should continue owning the user experience and final response.

Current multi-agent runtime guidance also recommends subagents primarily for independent work, while short or strongly dependent steps should remain in the main agent.

Implication for SIA:
- SIA should remain the visible manager;
- specialist agents should normally operate behind SIA;
- handoff of the user-facing conversation should be exceptional.

---

## Anthropic

Anthropic's production Research system uses an orchestrator-worker architecture.

Benefits:
- parallel work;
- separate context windows;
- independent tool/prompt trajectories;
- broader information coverage.

Important costs/limits:
- multi-agent systems in Anthropic's measured workload used roughly 15× the tokens of ordinary chat;
- coordination becomes substantially more complex;
- tasks requiring tightly shared context or many dependencies are poor fits;
- agents must be explicitly taught how much effort/subagent count a task deserves;
- unrestricted spawning caused waste and duplicated effort;
- good delegation requires explicit objective, boundaries, expected output and tool guidance.

Anthropic also found that persistent artifacts can reduce the "telephone game": specialists can store structured results directly and return references to the orchestrator.

Implication for SIA:
- specialists must have explicit budgets and contracts;
- parallelism is valuable for high-value independent work;
- outputs should become SOLO artifacts, not be repeatedly copied through agent messages.

---

## Salesforce

Salesforce's current Single-Org Multi-Agent architecture uses:
- one Superagent/primary orchestrator;
- specialist child agents behind it;
- one unified user touchpoint.

Salesforce publicly reports that a single agent begins carrying too much concurrent intent around roughly 8–10 well-scoped topics/subagents in its current Agentforce experience.

Salesforce's 2026 architecture material argues that specialist separation improves:
- instruction clarity;
- testing;
- modularity;
- observability;
- independent model choice.

Implication for SIA:
- one enormous prompt/tool surface will eventually degrade;
- domain specialists should have narrow capabilities;
- SIA should route rather than contain every domain's full instruction set at once.

---

## ServiceNow

ServiceNow separates:
- Otto / single conversational front door;
- role-scoped AI Specialists;
- narrower AI agents beneath specialists;
- deterministic workflows;
- centralized governance/control.

Its Autonomous Workforce intentionally uses specialists for end-to-end jobs while individual task agents/workflows execute smaller steps.

Implication for SIA:
- useful hierarchy is not "one agent per task";
- a specialist may own a bounded job/domain and orchestrate smaller capabilities;
- the user still experiences one front door.

---

## Google

Google ADK recommends coordinator/dispatcher + specialists when an agent accumulates many unrelated responsibilities.

Google explicitly warns that monolithic agents suffer from:
- context degradation;
- tool confusion;
- broad blast radius;
- weak testability.

Implication:
specialization should correspond to genuinely different responsibility/tool/context boundaries.

---

## LangChain

LangChain's current guidance also recommends beginning with one agent.

Multi-agent becomes attractive when:
- too much specialized context cannot fit comfortably;
- toolsets become too broad;
- separate teams own capabilities;
- context isolation is useful.

Recent work also highlights that isolated subagents can waste cost by re-reading context, while forked/inherited-context workers can be cheaper and faster where shared context is useful.

Implication:
SIA needs multiple worker context modes, not one universal subagent pattern.

---

## Research literature

A 2026 controlled study found that single agents matched or beat multi-agent systems on multi-hop reasoning when reasoning-token budgets were equal.

This does not mean multi-agent is bad.

It means some apparent multi-agent gains come from simply spending more compute.

Another recent long-horizon multi-agent benchmark reports substantial coordination failures even in leading models, including:
- role confusion;
- communication breakdown;
- inability to maintain a shared plan.

Implication:
SOLO must not assume "more agents = more intelligence."

---

# 4. Proposed SIA hierarchy

```
                    SIA
      Company Brain / Supervisor / Front Door
                     │
        ┌────────────┼─────────────┐
        │            │             │
 Deterministic   Specialist     Direct SIA
  Workflows       Workers       Reasoning
        │            │             │
        └────────────┼─────────────┘
                     │
               Tools / Systems
                     │
              SOLO Artifacts
```

SIA owns:
- company-level plan;
- user intent;
- company graph context;
- orchestration;
- task decomposition;
- budget/effort allocation;
- specialist selection;
- synthesis;
- escalation;
- final user interaction.

Specialists own:
- narrow domain/task reasoning;
- narrow toolsets;
- focused context;
- specialized evaluation contract;
- structured artifact/result generation.

Deterministic workflows own:
- repeatable steps;
- known ordering;
- state transitions;
- retries;
- approvals;
- idempotent actions;
- guaranteed policy checkpoints.

---

# 5. Role != agent

A critical rule:

> **Do not create an agent just because a role exists in the Company Graph.**

A role may contain twenty responsibilities.

Those responsibilities may resolve to:
- deterministic software;
- direct SIA reasoning;
- one reusable specialist;
- multiple specialists;
- a human;
- hybrid execution.

Example:

SEO Specialist human role:

- keyword research → SEO Research Specialist
- crawl ingestion → deterministic connector
- anomaly detection → Analytics Specialist
- strategy interpretation → direct SIA + human
- CMS changes → governed workflow
- final approval → human

Therefore the Company Graph models work/authority.

The agent registry models reusable reasoning/execution capability.

They are related but not identical.

---

# 6. Specialist profile vs running specialist

Separate the **definition** from the **runtime instance**.

## Specialist Profile — persistent

Contains:
- stable identity/key;
- purpose;
- eligible responsibilities;
- instructions;
- allowed tools;
- context requirements;
- output schema;
- policy;
- model preference;
- evaluation criteria;
- budget limits;
- escalation rules;
- version.

Examples:
- Recruitment Document Auditor
- SEO Research Specialist
- Marketing Reporting Specialist
- Contract Review Specialist
- Meeting Follow-up Specialist

## Specialist Run — temporary

Created only when needed.

Contains:
- run ID;
- exact task;
- current company/tenant;
- delegated authority;
- selected context;
- runtime budget;
- deadline;
- output artifact;
- trace.

When complete:
- specialist run ends;
- output/artifact persists;
- profile remains available for reuse.

This avoids thousands of "always-on" agents consuming state and creating governance complexity.

---

# 7. When SIA should stay single

Use direct SIA reasoning when:
- task is short;
- only one or two tools are needed;
- dependencies are strongly sequential;
- SIA already has the necessary context;
- specialist context would mostly duplicate SIA context;
- task value does not justify extra agent cost;
- one coherent reasoning chain is more important than parallelism.

Examples:
- explain one KPI;
- create a simple meeting;
- summarize one known report;
- answer who owns a process;
- select an approved template.

---

# 8. When SIA should invoke one specialist

Use one specialist when:
- instructions are genuinely different;
- specialized terminology/context is large;
- specialist has a distinct toolset;
- specialist has unique policy;
- task has a stable quality/evaluation rubric;
- isolation reduces errors.

Examples:
- audit candidate documents;
- review a contract;
- analyze SEO crawl data;
- perform financial reconciliation;
- draft a structured compliance assessment.

---

# 9. When SIA should spawn multiple specialists

Use multiple specialists when:
- tasks are independent or mostly independent;
- they can run in parallel;
- breadth matters;
- context exceeds one effective window;
- distinct tools/data sources are involved;
- the value justifies extra compute.

Examples:
- full company audit:
  - process analyst;
  - data-quality analyst;
  - permission/security analyst;
  - finance analyst;
  - employee/workflow analyst.

- acquisition due diligence:
  - contract review;
  - financial analysis;
  - customer-risk analysis;
  - technology audit.

SIA then synthesizes the outputs.

---

# 10. Do not use multi-agent when

Avoid fan-out when:
- every worker needs the same huge context;
- each step depends heavily on the prior step;
- agents would modify the same resource concurrently;
- the task is cheap/simple;
- the specialist would merely repeat SIA's reasoning;
- coordination cost exceeds expected quality gain.

---

# 11. Context modes

A specialist should receive the minimum context required.

Possible modes:

### Isolated
Fresh narrow context.

Best for:
- independent audits;
- sensitive domain isolation;
- parallel research.

### Forked
Inherits selected SIA task/conversation context.

Best for:
- tasks closely related to the current investigation;
- lower repeated retrieval cost.

### Artifact-based
Receives references to persistent SOLO artifacts instead of conversational history.

Best for:
- long-running workflows;
- large reports/documents;
- repeatable processes.

### Domain-context
Receives a governed domain slice from the Company Graph / Context Plane.

Best for:
- role specialists.

SIA should choose the context mode.

---

# 12. Model specialization

A specialist does not necessarily need a separately trained/fine-tuned model.

Specialization can come from:
- focused instructions;
- restricted tools;
- narrow context;
- domain retrieval;
- deterministic workflows;
- examples/evals;
- a smaller/faster model where sufficient.

Use fine-tuning only where evaluation demonstrates that prompting/retrieval/tooling is insufficient and stable task volume justifies it.

This keeps provider neutrality.

---

# 13. Cost-control architecture

Every specialist invocation has a budget.

SIA estimates:
- expected task value;
- required quality;
- parallelism benefit;
- model cost;
- context cost;
- tool cost;
- deadline.

Then choose:

```
DIRECT
FAST_SPECIALIST
DEEP_SPECIALIST
PARALLEL_TEAM
DETERMINISTIC_WORKFLOW
HYBRID
```

Do not default to multi-agent.

A simple task should remain simple.

---

# 14. Company Brain vs specialist memory

SIA should not duplicate all company context into every specialist.

Shared authoritative context remains in SOLO.

A specialist receives scoped retrieval/access.

Specialist learning should generally update:
- its profile/evaluation;
- reusable workflow/prompt version;
- structured company artifact where appropriate.

It should not secretly maintain a divergent private version of company truth.

---

# 15. User experience

The user normally sees:

> **SIA**

not:
- 17 agents;
- 8 handoffs;
- model-routing details.

SIA can optionally expose:
- "Recruitment document audit is running";
- "3 specialists are reviewing this acquisition";
- "Marketing reporting specialist completed";
- traces/evidence when authorized.

But orchestration complexity stays behind the experience.

---

# 16. Recommended architecture statement

> **SIA is one company brain and one user-facing intelligence. It does not personally execute every specialized reasoning task. It dynamically orchestrates deterministic workflows and reusable specialist workers, selected according to task complexity, domain, authority, context, risk and cost.**

This preserves:
- one coherent company brain;
- deep specialization;
- modular testing;
- tool/policy isolation;
- parallelism;
- cost control;
- simple UX.

---

# 17. Validation requirements

Before locking in the Product Master Plan, benchmark:

### Scenario A — Direct SIA
One SIA performs the task.

### Scenario B — SIA + one specialist
SIA delegates the specialized portion.

### Scenario C — SIA + multiple specialists
SIA decomposes and parallelizes.

For every test measure:
- task success;
- factual/operational correctness;
- latency;
- token/model cost;
- tool calls;
- correction rate;
- approval failures;
- context leakage;
- trace clarity;
- user perceived quality.

Test classes:
1. document audit;
2. recruitment workflow;
3. marketing report;
4. process diagnosis;
5. cross-department plan;
6. meeting follow-up;
7. company-wide audit.

Then lock routing rules from evidence.

---

# 18. Current recommendation

**Do not choose one giant SIA.**

**Do not create one permanent agent per role/task.**

Build:

> **One SIA Supervisor + Specialist Registry + ephemeral/run-scoped specialists + deterministic workflow engine + shared artifact/context plane.**

That is the strongest current architecture based on production evidence and current research.

The master-plan re-audit should treat this as the leading hypothesis, not yet an irreversible implementation lock.

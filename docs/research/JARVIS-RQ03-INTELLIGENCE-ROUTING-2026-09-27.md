# Jarvis Research Question 03 — Intelligence Depth, Routing & Escalation

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** How should Jarvis decide how much intelligence a task needs?  
**Status:** LOCKED — OWNER ACCEPTED  
**Implementation authority:** None. Product/architecture research only.

**Authority terminology supersession — 2026-09-28:** A0/A1/A2/A3 shorthand in this historical research record is retired. Production uses the single M2-11/RQ-07 action-class vocabulary: READ, DRAFT, PROPOSE, EXECUTE_REVERSIBLE, EXECUTE_CONSEQUENTIAL, DESTRUCTIVE. The locked principle that cognitive depth and execution authority are orthogonal remains unchanged.

## 1. Decision problem

Jarvis must not send every request through the same AI path.

The system needs to choose the **minimum sufficient intelligence** that can meet the required quality, evidence, authority and safety threshold for a task, while preserving a clean escalation path when the initial route proves insufficient.

This question must also correct one weakness in the earlier FAST / DEEP / ACTION working model:

**cognitive depth and execution authority are different dimensions.**

A task can be:
- cognitively simple but operationally consequential;
- cognitively difficult but read-only;
- deterministic and consequential;
- deeply analytical and later followed by a separate action.

Therefore ACTION must not be treated as a sibling of FAST and DEEP.

## 2. Research evidence

### OpenAI — model selection

Current OpenAI model-selection guidance recommends choosing the lightest model/reasoning configuration that meets the workflow's quality bar, using representative inputs to compare quality, latency and cost. It explicitly distinguishes efficient models for scoped/high-volume work from stronger models for difficult or ambiguous work.

Sources:
- https://developers.openai.com/api/docs/guides/model-selection
- https://developers.openai.com/api/docs/guides/latest-model

### OpenAI — reasoning effort

Current reasoning guidance differentiates:
- no/very low reasoning for latency-critical classification, voice and fast retrieval;
- low reasoning for bounded planning/tool use;
- medium for judgment/research and more complex workflows;
- high/xhigh/max only where difficult work and measured quality gains justify the latency/cost.

The current guidance explicitly warns that higher reasoning effort is not automatically better and should be justified by evaluation.

Sources:
- https://developers.openai.com/api/docs/guides/reasoning
- https://developers.openai.com/api/docs/guides/reasoning-best-practices

### OpenAI — deployment/evaluation

Current deployment guidance recommends choosing models for representative workloads rather than routing every request to the most capable model. Agent evaluation guidance supports trace-level testing of tool choice, handoffs and routing behavior.

Sources:
- https://developers.openai.com/api/docs/guides/deployment-checklist
- https://developers.openai.com/api/docs/guides/agent-evals

### Anthropic — effective agents

Anthropic's production guidance independently reaches the same architecture principle:
- start with the simplest solution;
- use predefined workflows for well-defined tasks;
- use routing when distinct task categories need different prompts/models/tools;
- use autonomous agents only for genuinely open-ended work where steps cannot be predetermined;
- add complexity only where it demonstrably improves outcomes.

Anthropic specifically describes routing easy/common tasks to smaller efficient models and difficult/unusual tasks to stronger models.

Source:
- https://www.anthropic.com/engineering/building-effective-agents

### Google Cloud — routing pattern

Google Cloud's model-routing interfaces provide an additional market validation that model choice can be centralized behind routing policy rather than hard-coded throughout the product. Google documents automated routing using predicted quality plus routing preference, alongside explicit/manual routing.

Sources:
- https://docs.cloud.google.com/python/docs/reference/vertexai/latest/vertexai.generative_models.GenerationConfig.RoutingConfig
- https://docs.cloud.google.com/api-gateway/docs/model-routing-overview

This is evidence for the routing pattern, not a recommendation to adopt Google's router.

## 3. Core correction: two independent axes

The earlier working model:

```text
FAST | DEEP | ACTION
```

mixes two different decisions.

Replace it conceptually with:

```text
AXIS 1 — COGNITIVE ROUTE
C0 Deterministic
C1 Fast AI
C2 Deep AI
C3 Orchestrated / Specialist AI

AXIS 2 — EXECUTION AUTHORITY
A0 Read-only / no side effect
A1 Low-risk reversible action
A2 Consequential action requiring explicit approval/policy gate
A3 Restricted / manual-only / prohibited
```

Examples:

| Task | Cognitive route | Authority |
|---|---|---|
| Open campaign dashboard | C0 | A0 |
| What was Meta spend last month? | C1 | A0 |
| Explain why CPL rose across channels | C2 | A0 |
| Draft a corrective campaign plan | C1/C2 | A0 until saved/published |
| Pause an ad set | C1 may be enough | A2 |
| Reconfigure account permissions | C0/C1 | A3 or tightly governed A2 |
| Cross-product strategic diagnosis | C2/C3 | A0 |
| Execute an approved multi-system remediation | C2/C3 | A2 |

**Key consequence:** a dangerous action must never become permitted because a model is "smart enough." Authority remains a deterministic governance decision.

## 4. Minimum Sufficient Intelligence principle

Jarvis should use:

> **the least complex execution path that has demonstrated it can meet the required outcome quality and risk threshold for that task class.**

This is not the same as:
"always try the cheapest model first."

A cheap attempt that frequently fails and requires rework can produce higher latency and total cost than routing correctly on the first attempt.

Therefore routing should optimize:

```text
Required quality / authority floor
          first
             ↓
Expected successful-outcome cost
             ↓
Latency / user experience
             ↓
Raw token/model price
```

The key economic unit is **cost per successful outcome**, already consistent with M2-14, not cost per model call.

## 5. Recommended cognitive ladder

### C0 — Deterministic software

Use when ordinary software/rules can solve the task exactly or more safely.

Examples:
- navigation;
- permission lookup;
- arithmetic;
- schema validation;
- known filters;
- state transitions;
- formatting deterministic provider data;
- explicit workflow selection;
- policy/approval evaluation.

Rules:
- no model by default;
- fastest/cheapest path;
- deterministic code remains the authority.

### C1 — FAST AI

Use when language/semantic flexibility helps but the problem is bounded.

Typical work:
- intent classification;
- extraction;
- summarization of already-retrieved material;
- simple Q&A;
- rewriting;
- light retrieval;
- brief explanations;
- bounded tool choice.

Characteristics:
- small/efficient model or low reasoning;
- constrained context;
- small tool set;
- short stopping criteria;
- foreground conversational response.

### C2 — DEEP AI

Use when the task requires judgment, ambiguity resolution, multi-source reasoning or planning.

Typical work:
- diagnosis;
- research;
- strategy analysis;
- evidence reconciliation;
- nontrivial forecasting/scenario reasoning;
- complex artifact generation;
- multi-step tool use.

Characteristics:
- stronger model and/or higher reasoning effort;
- richer evidence/context;
- explicit plan/checkpoints where useful;
- may use R2/R3 responsiveness mode;
- evaluated for quality gain over C1.

### C3 — ORCHESTRATED / SPECIALIST AI

Use only when one capable model + tools is demonstrably insufficient or the problem naturally decomposes into distinct expertise/workstreams.

Typical candidates:
- broad cross-domain investigations;
- complex research with parallel independent streams;
- tasks where specialist prompts/toolsets materially improve results;
- long-running work requiring worker decomposition.

Rules:
- not the default for "hard";
- specialist boundaries must correspond to genuine capability/context/tool differences;
- orchestration complexity must earn its cost through evals;
- worker outputs return through a controlled synthesis step;
- authority cannot increase through delegation.

## 6. Router architecture

Recommended flow:

```text
USER INPUT
    │
    ▼
LOCAL ACKNOWLEDGEMENT
    │
    ▼
TASK CONTRACT BUILDER
    │
    ├─ tenant / user / product context
    ├─ explicit user intent
    ├─ target domain/resource
    ├─ information vs creation vs execution
    ├─ evidence/freshness requirement
    ├─ ambiguity / complexity signals
    ├─ expected output/surface
    ├─ latency mode
    └─ possible side effects
    │
    ├───────────────┐
    ▼               ▼
COGNITIVE ROUTER    AUTHORITY CLASSIFIER
C0/C1/C2/C3         A0/A1/A2/A3
    │               │
    └───────┬───────┘
            ▼
      CAPABILITY PLAN
            │
            ├─ read-only → execute/reason
            │
            └─ side effect
                  ↓
             permission
                  ↓
               policy
                  ↓
              approval
                  ↓
          typed execution
                  ↓
                audit
            │
            ▼
     RESULT / WORKSPACE
```

The action gate is therefore **orthogonal** to cognitive depth.

## 7. How routing itself should work

Do not make every request pay for a large router model.

Use a layered router:

### Layer 0 — deterministic signals

Before any routing model:
- current product/surface;
- known resource;
- explicit command/button;
- action verb + known capability;
- route requested by user ("quick answer", "deep analysis");
- permission/entitlement metadata;
- task continuation from existing state;
- predefined capability schemas.

Many tasks should route from these signals alone.

### Layer 1 — lightweight semantic classification

Use only where deterministic signals do not resolve intent sufficiently.

Output should be structured, e.g.:
- intent class;
- domain/capability candidates;
- cognitive class candidate;
- ambiguity/missing-data indicators;
- whether a side effect is requested;
- evidence/freshness needs.

The semantic classifier may propose a route; it does not grant permission or approve execution.

### Layer 2 — escalation

C1 may escalate to C2 when evidence shows:
- insufficient evidence;
- conflicting sources;
- ambiguity requiring judgment;
- task decomposes into several dependent steps;
- evaluation/quality guard fails;
- selected tool/capability cannot satisfy the request;
- explicit user request for deeper work.

C2 may escalate to C3 only when:
- independent workstreams can genuinely be delegated;
- specialist context/tools are materially different;
- prior evals show better successful-outcome quality than a single C2 run.

Escalation should preserve retrieved evidence and task state rather than restart the job unnecessarily.

## 8. Do not use model self-confidence as the authority

LLM confidence statements are not a sufficient routing or safety control.

Prefer observable signals:
- task type;
- number/type of required sources;
- source conflict;
- schema validation;
- tool errors;
- missing required fields;
- eval-derived failure rates by task class;
- factual verification results;
- deterministic risk class;
- permission/approval state.

A model may report uncertainty as one signal, but it should not be the sole gate.

## 9. User control

Jarvis should normally route automatically, but user intent should be honored where appropriate.

Examples:
- "give me the quick answer" can bias toward C1 if the quality/risk floor permits;
- "investigate this deeply" can bias toward C2/C3;
- "don't take action" forces A0;
- "draft only" remains non-executing until an explicit save/publish action;
- "go ahead" does not override a required A2 approval interface/policy.

The system, not the user wording alone, still enforces safety/authority boundaries.

## 10. Route profiles, not hard-coded provider names

Jarvis product/domain code should request a route profile such as:

```text
cognitive_profile: fast
quality_floor: standard
tool_profile: marketing-read
latency_profile: conversational
```

or:

```text
cognitive_profile: deep
quality_floor: high
tool_profile: cross-domain-analysis
latency_profile: extended
```

A model gateway/runtime policy resolves the actual model/provider/reasoning setting.

This keeps provider/model replacement possible.

Exact provider selection belongs to later model-routing research and Jarvis Lab measurement.

## 11. Evaluation requirement

Routing is a product behavior and must be evaluated.

The regression set should include representative tasks across:
- C0 that must not invoke AI;
- C1 that should remain fast;
- C2 that must not be under-routed;
- C3 cases where orchestration is justified;
- A0/A1/A2/A3 authority cases.

Measure:
- correct cognitive route;
- under-routing rate;
- unnecessary escalation rate;
- action-risk classification;
- permission/approval correctness;
- task quality;
- latency;
- total successful-outcome cost;
- retries;
- user corrections.

A routing change should not ship merely because average model cost decreases.

## 12. Marketing Hub examples

### "Open the campaign for Arabic interpreters."
Likely:
- C0 deterministic resource navigation;
- A0.

### "How much did we spend on Meta last month?"
Likely:
- C0 retrieval/query + possibly C1 natural-language presentation;
- A0.

### "Why did recruitment CPL increase despite higher spend?"
Likely:
- C2 evidence-backed diagnosis;
- A0.

### "Compare Meta, LinkedIn and organic acquisition and recommend what to test next."
Likely:
- C2;
- A0.

### "Create a draft campaign from that recommendation."
Likely:
- C1/C2 composition;
- remains A0 while only generating a draft artifact;
- becomes A1/A2 only when persisting/publishing according to policy.

### "Pause the campaigns that meet the criteria we just discussed."
Likely:
- cognitive route determined by whether the criteria are already explicit;
- A2 consequential action;
- deterministic permission/policy/approval gate before execution.

## 13. Consequences for the circle / semantic zoom hypothesis

The two-axis router provides a meaningful interaction model.

The circle/graph can potentially communicate:
- **where** Jarvis routed cognitively (Marketing → Analytics → Campaign);
- **which evidence/capability** is active;
- **whether** the system is reasoning vs waiting for authority;
- **when** it crosses from analysis into a proposed action.

The visual language must not imply that "deep" means "more permission."

This will be evaluated in JX-03/JX-04.

## 14. Recommended lock

> **RQ-03 — Minimum Sufficient Intelligence & Orthogonal Action Authority**
>
> Jarvis must choose the **minimum sufficient intelligence** that has demonstrated it can meet the required quality for a task class; it must not route every request through the most capable model or an autonomous agent.
>
> Cognitive execution uses a progressive ladder:
> **C0 deterministic software → C1 Fast AI → C2 Deep AI → C3 Orchestrated/Specialist AI.**
>
> Complexity is added only when evidence/evaluations show that the simpler route does not meet the quality floor.
>
> **Action authority is a separate axis**, classified independently through the canonical M2-11/RQ-07 action classes. Model intelligence never grants execution authority. Permission, policy, approval and audit remain deterministic governed gates.
>
> Routing should use deterministic signals first, lightweight semantic classification only when necessary, and preserve task/evidence state during escalation.
>
> Model/provider names remain behind route profiles so Jarvis can change engines without changing product semantics.
>
> Optimize for **cost and latency per successful quality outcome**, not the cheapest individual model call.
>
> **Jarvis should use AI deliberately, not universally.**

## 15. Recommendation

**LOCK RQ-03 as written.**

This materially refines the earlier FAST / DEEP / ACTION concept without invalidating its intent:
- FAST becomes C1;
- DEEP becomes C2/C3;
- ACTION becomes an independent governed execution axis rather than a cognitive route.

Exact model/provider choices, thresholds and escalation frequencies remain Jarvis Lab questions and must be measured.

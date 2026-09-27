# Jarvis Research Question 16 — Evaluation & Quality-Gate Architecture

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** How will we know Jarvis is actually good, and prevent improvements in one area from silently breaking another?  
**Status:** LOCKED — OWNER ACCEPTED  
**Implementation authority:** None. Evaluation/product-quality architecture research only.

## 1. Decision problem

Jarvis is not one model call. Its quality depends on:
- deterministic routing/software;
- Reflex Decision Plane;
- context assembly;
- model/provider selection;
- tools/connectors;
- dynamic workspace composition;
- agents/workflows;
- governed actions;
- long-running task state;
- failure/recovery behavior;
- user-facing communication.

A single benchmark score cannot tell us whether this system is good.

We need an evaluation architecture that:
- defines success before optimization;
- protects critical existing behavior;
- measures open-ended quality without pretending everything has one exact answer;
- tests nondeterministic behavior over repeated trials where justified;
- evaluates the end-to-end task as well as important internal contracts;
- converts real failures into regression cases;
- gates material Production changes;
- supports model/provider replacement under RQ-13;
- remains provider-neutral and does not depend on one vendor's eval product.

## 2. External research evidence

### OpenAI — eval-driven development and continuous evaluation

OpenAI's current evaluation guidance recommends:
- evaluate early/often;
- design task-specific tests reflecting real-world distributions;
- log behavior and mine logs for cases;
- automate scoring where possible;
- calibrate automated evaluation with humans;
- continuously add new cases from observed nondeterminism/failures.

It also recommends pairwise/pass-fail judgments where appropriate and warns that LLM judges can exhibit biases such as verbosity/position bias.

Sources:
- https://developers.openai.com/api/docs/guides/evaluation-best-practices
- https://developers.openai.com/api/docs/guides/agent-evals

### Anthropic — regression and capability evals serve different purposes

Anthropic's current agent-evaluation guidance distinguishes:
- **regression evals**: behavior that already works and should remain near-perfect;
- **capability evals**: difficult tasks deliberately chosen to expose current limits and create a hill to climb.

It recommends using real/manual/production failures as test cases, multiple trials for stochastic behavior, and combining code-based, model-based and human graders.

Source:
- https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### Anthropic — automated evals are one layer, not the whole quality system

Anthropic recommends combining:
- automated evals before release/in CI;
- production monitoring;
- user feedback;
- transcript review;
- A/B tests where justified;
- periodic systematic human evaluation.

No single layer catches every problem.

Source:
- https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

### NIST — holistic evaluation combines multiple modes

NIST's September 2026 ARIA Evaluation Planning Manual frames holistic AI evaluation through multiple complementary forms including model testing, red teaming and user testing rather than relying on one benchmark.

Source:
- https://www.nist.gov/publications/aria-evaluation-planning-manual-elements-aria-style-ai-evaluations

### Provider eval tooling is not a permanent architectural boundary

OpenAI has announced retirement of its current Evals platform in late 2026. This reinforces that Admonk's canonical eval cases, rubrics and results must remain provider-neutral even if external platforms/runners are used.

Source:
- https://developers.openai.com/api/docs/deprecations

## 3. Core conclusion

> **Jarvis quality is measured by a layered, task-centered evaluation system—not one global AI score.**

Primary unit:

```text
REALISTIC TASK / SCENARIO
       ↓
Jarvis system under test
       ↓
observable outcome + trace + state changes
       ↓
multiple fit-for-purpose graders
       ↓
pass/fail gates + dimension scores
```

## 4. Previously selected evaluation philosophy

The architecture continues the owner-approved foundation direction:
- define success early;
- begin with a small representative regression set around critical behavior;
- evaluate material AI changes;
- grow the suite from real failures and edge cases;
- add broader capability suites, repeated trials and richer trace evaluation only where improvement/risk justifies their cost.

RQ-16 formalizes that principle rather than replacing it with a huge benchmark program.

## 5. Canonical evaluation vocabulary

### Eval Case

One versioned realistic task/scenario with:
- inputs/environment;
- authorized context/resources;
- task objective;
- expected constraints;
- known acceptable outcomes/reference facts where applicable;
- grader set;
- risk/criticality;
- trial policy.

### Trial

One execution attempt of an Eval Case.

Because AI behavior is stochastic, some cases run multiple trials. Deterministic cases may need only one.

### Grader

One mechanism that judges one dimension/constraint.

### Eval Suite

A coherent versioned collection of Eval Cases for one capability/route/product concern.

### Eval Release

An immutable record of:
- suite versions;
- system/model/route/config versions;
- results;
- quality gates;
- decision: pass / block / investigate / experimental.

## 6. Evaluation layers

Use six complementary layers.

### E0 — Deterministic Contract Tests

Use ordinary software assertions wherever truth is objectively machine-verifiable.

Examples:
- schema validity;
- correct capability/action class;
- permission/tenant isolation;
- exact arithmetic;
- required source included;
- unsupported source excluded;
- action proposal target/parameters;
- approval required/present;
- operation/idempotency IDs;
- workspace component schema;
- task-state transitions;
- connector result normalization.

These should not be replaced by LLM judges.

### E1 — Critical Regression Suite

A deliberately small, representative set of behaviors that Jarvis already must not break.

Initial examples align with proof moments/locked architecture:
- simple FAST answer chooses appropriate route/surface;
- evidence-backed investigation retrieves correct sources;
- consequential action requires correct review/approval;
- unauthorized context/action is blocked;
- connector/model failure degrades truthfully;
- long task resumes without duplicate work;
- user correction persists through task/workspace state.

Critical regressions should trend toward near-perfect pass rates.

### E2 — Capability Suites

Harder, broader tests asking:
`How good can this capability become?`

Examples:
- cross-domain diagnosis;
- research quality;
- ambiguous context recovery;
- dynamic workspace usefulness;
- multilingual/code-switching;
- strategy/tradeoff synthesis;
- difficult action planning;
- agent orchestration.

These may begin with substantial failure rates and improve over time.

### E3 — System / Trace Evaluation

Evaluate observable execution behavior where it matters:
- route chosen;
- context sources considered/retrieved;
- tool/capability selection;
- number of loops/tool calls;
- fallback/degradation behavior;
- action/approval path;
- task checkpoints/recovery;
- evidence/provenance;
- unnecessary agent use;
- token/credit/resource usage.

Do not require one exact valid trajectory unless policy/safety/business semantics demand it.

Do not store/grade hidden private chain-of-thought. Evaluate observable actions/state/results.

### E4 — Human / Domain / UX Evaluation

Use humans where the target is genuinely subjective or domain-judgment-heavy.

Examples:
- strategic usefulness;
- clarity of explanation;
- whether a workspace is easier than conversation;
- executive cross-domain synthesis;
- tone/communication;
- nuanced research quality;
- voice naturalness/interruption UX.

Use domain SMEs when domain correctness requires expertise.

### E5 — Production / Field Evaluation

Observe real outcomes after release:
- explicit feedback/corrections;
- task completion/abandonment;
- approval cancellation;
- repeated retries;
- fallback/degradation frequency;
- unresolved intervention;
- support/bug reports;
- manual trace sampling;
- A/B tests only when statistically/product appropriate.

Production is not a substitute for pre-release evals; it discovers cases the suite missed.

## 7. Regression vs capability suites

Lock the distinction.

### Regression

`Does Jarvis still do what we already know it must do?`

Properties:
- critical/high-frequency/high-risk;
- small enough to run often;
- strong pass/fail expectations;
- grows from real failures;
- blocks regressions.

### Capability

`Can Jarvis do harder/new work better?`

Properties:
- intentionally challenging;
- measures headroom;
- may use richer human/model graders;
- informs route/model/product improvements;
- does not necessarily block every release when experimental.

Do not mix them into one average percentage.

## 8. Outcome-first grading

Prefer grading the final outcome/environment state whenever possible.

Examples:
- correct campaign state;
- correct calculated metric;
- correct selected resources;
- correct report artifact;
- correct support-ticket assignment;
- correct evidence-backed answer.

Then grade trajectory only for requirements that matter.

Example:
two valid research paths can both pass even if their tool sequences differ.

Exact trace matching is reserved for:
- authorization requirements;
- mandatory verification/readback;
- prohibited capability/tool use;
- required approval;
- deterministic business workflow constraints;
- known efficiency/pathological-loop checks.

## 9. Grader hierarchy

Prefer the most objective reliable grader available.

```text
1. Deterministic/code/environment verification
2. Reference/fact/source checks
3. Calibrated model grader
4. Human/domain expert judgment
```

This is not a strict cost hierarchy: some subjective cases inherently require human calibration.

## 10. Deterministic graders

Examples:
- exact/normalized match;
- arithmetic verification;
- schema validation;
- SQL/query expected outcome;
- permission/action-policy assertions;
- tool/capability call validation;
- resource/environment state;
- evidence-source membership;
- absence of forbidden context;
- latency/cost threshold checks once RQ-17/18 are locked.

Use deterministic graders for hard guarantees wherever feasible.

## 11. Model graders

Use model graders for nuanced dimensions such as:
- groundedness/unsupported claims;
- relevance;
- completeness;
- strategic reasoning quality;
- user-facing clarity;
- comparison between two outputs.

Rules:
- use an explicit dimension-specific rubric;
- prefer pass/fail or pairwise when appropriate;
- randomize pairwise order to reduce position bias;
- control for verbosity bias;
- give judge an `insufficient information / unknown` option;
- separate important dimensions instead of one vague `overall quality` prompt;
- validate/calibrate against human/domain labels;
- version judge model + rubric.

A candidate system should not be its only uncalibrated judge.

## 12. Human evaluation

Human/domain review is the reference for:
- subjective product quality;
- new rubric creation;
- calibration of model graders;
- strategically consequential output;
- difficult disagreements between automated graders.

Use:
- blinded pairwise comparison where possible;
- concrete examples defining score levels;
- pass/fail thresholds alongside ratings;
- multiple raters/consensus for important subjective evaluations;
- periodic spot-checking once automated grader agreement is proven.

Human evaluation is expensive; use it to calibrate and resolve what automation cannot reliably judge.

## 13. Multiple trials

Do not run an arbitrary fixed number of trials for every case.

Trial count depends on:
- nondeterminism;
- risk;
- expected variance;
- release/change importance;
- cost of the route.

Examples:
- deterministic contract test → one;
- stable C1 generation regression → small repeated sample if variance matters;
- agent/multi-agent capability → more trials because paths/outcomes vary;
- critical model migration → enough repeated trials to estimate reliable success distribution.

Report success rate/distribution rather than cherry-picking the best run.

## 14. Route-specific quality floors

Different Route Profiles have different required success criteria.

Example:

```text
fast.user_explanation
focus:
- correctness
- clarity
- low latency

deep.marketing_diagnosis
focus:
- evidence completeness
- factual correctness
- causal restraint
- useful recommendation

agent.research_worker
focus:
- source quality
- coverage
- groundedness
- efficient tool use

action.prepare
focus:
- target/parameter correctness
- permission/approval correctness
- zero unsafe execution
```

Do not declare one universal Jarvis quality threshold.

## 15. Hard gates vs aggregate scores

Some dimensions must never be averaged away.

Hard gates include candidates such as:
- cross-tenant data exposure;
- unauthorized action;
- bypassed required approval;
- destructive action outside policy;
- fabricated verified execution;
- wrong consequential target;
- severe source/provenance breach.

A system with:
`95% overall quality`

but one authorization bypass does **not** pass.

Use:
- hard invariant gates;
- route-specific minimum floors;
- dimension scores;
- overall comparison only as secondary summary.

## 16. Evaluation tree

Use a progressive outcome tree rather than trying to evaluate every internal event equally.

Example:

```text
Task successful?
  ├ no → where did it fail?
  │      route / context / model / tool / action / UX
  │
  └ yes
      ↓
Was it grounded/correct?
      ↓
Was authority/safety preserved?
      ↓
Was the experience useful?
      ↓
Was it efficient enough?
```

This keeps product outcome primary while still diagnosing components.

## 17. Start small

Initial RQ-16 implementation should **not** attempt hundreds of suites.

Start with a small representative regression set built around:
- the three initial Jarvis proof moments;
- critical permission/action/failure invariants;
- a few common/simple interactions;
- one or two cross-domain cases;
- known hard/edge cases from current Kalam workflows/data.

Then expand only from evidence:
- failure;
- user correction;
- production issue;
- new capability;
- model/provider migration;
- risky architecture change.

## 18. Production-failure flywheel

Every meaningful real failure enters triage:

```text
production/user failure
        ↓
reproduce?
        ↓
root cause / classify
        ↓
can it become stable eval case?
        ↓
YES → add regression case
        ↓
fix
        ↓
case must pass before closure/promotion
```

Not every noisy one-off becomes permanent; deduplicate and prioritize by user/risk impact.

## 19. Edge and adversarial cases

The suite must intentionally contain:
- typical cases;
- difficult edge cases;
- ambiguous tasks;
- stale/conflicting context;
- missing/failed connectors;
- malicious/untrusted source content where relevant;
- permission boundary cases;
- duplicate/retry scenarios;
- action uncertainty;
- multilingual/locale cases;
- long-running interruption/resume.

Security/red-team depth expands further in RQ-20.

## 20. Holdout / overfitting protection

Maintain some eval cases as held-out/sequestered cases where practical.

Reasons:
- prompts/routes can accidentally overfit visible tests;
- graders can be gamed;
- repeated development against one fixed set can create false confidence.

Maintain:
- visible developer regression cases;
- hidden/held-out migration/release cases;
- periodic fresh cases from production/human review.

Version datasets and record contamination/known exposure where relevant.

## 21. Material change matrix

Run relevant eval suites when any material behavior-changing component changes.

Triggers include:
- model/provider/snapshot;
- provider adapter/prompt adaptation;
- system/domain prompt;
- Route Profile or routing policy;
- Decision Plane model/threshold;
- context plan/retriever/reranker;
- tool/capability schema;
- agent profile/skill/procedure;
- workflow/orchestration;
- workspace planner/component contract;
- action/preflight/approval behavior;
- failure/fallback policy;
- durable task definition;
- major connector/domain semantic mapping.

Do not rerun unrelated suites merely for ceremony; select suites by impact graph.

## 22. Change gate

Before a material Production promotion:

```text
1. affected E0 contract tests pass
2. affected critical regression suites do not regress
3. route/capability quality floors met
4. hard safety/authority gates pass
5. latency guardrails met (RQ-17)
6. economics guardrails met (RQ-18)
7. human/domain review added where change is strategically/subjectively material
8. release evidence stored
```

Experimental/capability improvements may ship behind controlled exposure without requiring full capability-suite mastery, but critical regression gates remain.

## 23. Eval case schema

Candidate:

```text
EvalCase
  case_id
  version
  suite
  description
  task_type / RouteProfile
  risk_class
  environment/fixture refs
  user/task input
  tenant/scope/permission fixture
  expected source/resource refs
  required/forbidden behaviors
  reference facts/outcomes where applicable
  grader configs
  trial policy
  tags: regression | capability | edge | adversarial | production_failure
```

## 24. Eval result schema

Candidate:

```text
EvalResult
  eval_release_id
  case/version
  trial_id
  system/config commit/version
  RouteProfile + binding release
  model/provider exact versions
  context/workspace/agent/workflow versions
  outcome status
  grader results by dimension
  hard-gate failures
  trace refs
  latency refs
  usage/cost refs
  artifacts
  human-review refs
```

This allows model migrations and architecture changes to be compared reproducibly.

## 25. Evaluation ownership

Shared Foundation/Jarvis owns:
- eval contracts/formats;
- runner/trace integration direction;
- common hard invariants;
- route-level quality evidence;
- shared regression cases.

Specialist products own:
- domain task definitions;
- authoritative reference facts;
- domain-specific rubrics;
- business success criteria;
- domain SME review.

A Marketing eval should not invent Recruitment truth and vice versa.

## 26. Eval framework/tool disposition

Do not make one vendor's evaluation platform canonical.

Reason:
- providers change/deprecate tooling;
- RQ-13 requires cross-provider evaluation;
- Admonk needs software-, model-, workflow- and domain-level graders together.

Canonical assets should be portable:
- task cases;
- datasets/fixtures;
- rubric definitions;
- deterministic graders;
- result schema;
- release records.

Execution may use:
- simple native test scripts initially;
- provider tools;
- open-source/commercial eval runners;
- specialized trace platforms

behind an Admonk-owned evaluation contract.

Select implementation tooling later based on engineering/observability needs.

## 27. Production monitoring is not self-learning

Production traces/failures/user feedback may:
- propose new eval cases;
- identify distributions/failure clusters;
- trigger investigation;
- inform routing/model decisions.

They must not automatically:
- rewrite prompts;
- change permissions;
- promote model deployments;
- change thresholds;
- create persistent company knowledge.

Those changes remain versioned/evaluated/governed.

RQ-23 will handle memory/learning governance in detail.

## 28. Metrics philosophy

Do not optimize one proxy.

Track by capability/task:
- task success;
- correctness;
- groundedness/provenance;
- context precision/recall where measurable;
- proper abstention;
- tool/action correctness;
- permission/authority correctness;
- user correction rate;
- completion/abandonment;
- trace efficiency;
- fallback/failure recovery;
- human preference/usefulness;
- latency (RQ-17);
- cost per successful outcome (RQ-18).

Always identify population/time period/config release.

## 29. User experience evaluation

Jarvis is adaptive software, so output quality alone is insufficient.

Evaluate:
- did the correct surface S0/S1/S2 appear?;
- did workspace structure help the task?;
- could the user understand source/freshness/failure state?;
- were approvals understandable?;
- could users leave/return to durable tasks?;
- did voice interruption/continuity work?;
- did direct manipulation reduce conversational effort?;
- did the semantic graph/zoom improve orientation rather than distract?

Some require structured usability/user testing, not LLM judges.

## 30. Jarvis Lab implication

The Lab should implement evals **before** broad architecture experimentation.

Initial loop:

```text
representative cases
   ↓
baseline current routes/models
   ↓
change one material thing
   ↓
run affected suites/trials
   ↓
compare quality + latency + cost
   ↓
inspect failures/traces
   ↓
promote / reject / iterate
```

This turns OpenJarvis/Jev/new-model experiments into evidence rather than demos.

## 31. Recommended lock

> **RQ-16 — Layered, Task-Centered Evaluation System**
>
> Jarvis quality is evaluated through realistic versioned **tasks/scenarios**, not one global AI score.
>
> Use six complementary layers: **E0 deterministic contract tests, E1 critical regression suites, E2 capability suites, E3 observable system/trace evaluation, E4 human/domain/UX evaluation, and E5 Production/field evaluation.**
>
> Keep **regression** and **capability** suites distinct. Regression suites protect already-working critical behavior and should approach near-perfect reliability; capability suites deliberately measure harder work and improvement headroom.
>
> Prefer outcome/environment grading first. Grade execution traces only for behaviors that materially matter; do not require one exact valid agent path or store/grade hidden chain-of-thought.
>
> Use the most objective grader possible: deterministic checks for machine-verifiable requirements, calibrated model graders for nuanced dimensions, and human/domain experts for subjective/strategically material judgments.
>
> Model graders require explicit rubrics, versioning and calibration against human labels. Pairwise/pass-fail grading is preferred where it produces more reliable judgments.
>
> Trial counts are risk/variance-dependent rather than universally fixed. Nondeterministic agent/model cases use repeated trials and report outcome distributions rather than cherry-picking best runs.
>
> Quality floors are **route/capability specific**. Hard authority/safety/business invariants cannot be averaged away by a high overall score.
>
> Start with a small representative critical regression set, then grow suites from real failures, user corrections, edge/adversarial cases, new capabilities and model/provider migrations.
>
> Every meaningful reproducible Production failure should be considered for promotion into a regression case so fixes remain fixed.
>
> Material model, prompt, routing, context, tool, agent, workflow, UI-planning, action, failure-policy or task-definition changes run only their affected eval suites plus shared critical gates.
>
> Canonical eval cases, rubrics, deterministic graders and results are Admonk-owned/provider-neutral. External eval platforms may execute them but never become the source of truth.
>
> Production monitoring, user feedback, A/B testing and periodic human review complement automated evals; no single evaluation layer is sufficient.
>
> **Jarvis improves by turning observed behavior into measurable tasks, tasks into regression/capability evidence, and evidence into gated product changes—not by intuition or demo quality alone.**

## 32. Recommendation

**LOCK RQ-16 as written.**

This gives every later decision—speed, economics, scaling, security, model migration and Jarvis Lab—a measurable quality foundation.
# R016 — AI Evaluation / Regression Baseline

**Date:** 2026-09-26
**Mode:** Document Population Research
**Status:** LOCKED — B selected and decision cost explicitly accepted 2026-09-26
**Target:** future AI evaluation standard, Product Supervisor AI release evidence, agent feedback-loop governance

## Research question

What minimum evaluation and regression system should Admonk require for AI/agent capabilities so model, prompt, tool and workflow changes can be shipped with confidence—without turning evaluation itself into a large recurring token/tool expense?

## Source A — OpenAI: Evaluate agent workflows

**Source:** SRC-EVAL-001

OpenAI's current guidance recommends starting with traces while behavior is still being debugged, then moving toward repeatable datasets and eval runs once "good" behavior is understood.

Relevant concepts include:
- inspect end-to-end traces;
- grade tool choice, handoffs, instructions and workflow behavior;
- use datasets for repeatable comparison;
- evolve from debugging specific runs into regression evaluation.

### What it optimizes for

**Fast diagnosis first, repeatability later.**

### Strongest ideas for Admonk

- do not build a giant eval suite before understanding actual failure modes;
- traces can expose workflow failures that output-only scoring misses;
- regression datasets should emerge from known requirements/failures;
- agent evaluation must include tool/handoff/guardrail behavior when those materially affect outcomes;
- evaluation can mature with the product.

### Challenge

Copied literally, a trace-heavy workflow can:
- generate large amounts of stored evaluation context;
- encourage scoring every intermediate step even when only the outcome matters;
- increase model-grader/token cost;
- overfit to one provider's evaluation surfaces;
- treat a vendor dashboard as the evaluation architecture.

There is also an immediate portability concern: OpenAI's current Evals platform is scheduled for shutdown on 2026-11-30.

Therefore Admonk should adopt the **evaluation concepts**, not the vendor-specific Evals product as canonical infrastructure.

OpenAI is strongest as the **trace-to-repeatable-regression progression model**.

## Source B — Anthropic: Demystifying evals for AI agents

**Source:** SRC-EVAL-002

Anthropic's 2026 guidance defines:
- tasks;
- trials;
- graders;
- traces/transcripts;
- outcomes;
- eval harnesses;
- capability suites;
- regression suites.

It recommends starting early with a small set of realistic tasks, combining grader types, running multiple trials when stochasticity matters, and continuously adding real failures back into the suite.

Anthropic also distinguishes:
- **capability evals** — what can the agent do/improve at?
- **regression evals** — can it still do what previously worked?

### What it optimizes for

**Eval-driven product development and continuous regression protection.**

### Strongest ideas for Admonk

- success criteria become clearer when turned into eval tasks;
- a small realistic suite is useful before hundreds of examples exist;
- deterministic graders are ideal where the outcome is objectively testable;
- model graders are useful for qualitative properties but need calibration;
- outcomes and trajectories should be evaluated separately;
- real production failures should become future regression cases;
- capability and regression suites serve different jobs.

### Challenge

Copied literally, a mature eval program can:
- become another product inside the product;
- consume substantial model tokens, compute and engineer time;
- encourage multiple trials for everything rather than only stochastic/high-risk behavior;
- make LLM graders appear objective even when their judgment is unstable;
- increase context/storage cost through full traces;
- create large suites whose maintenance cost exceeds the product decision value.

Anthropic is strongest as the **eval lifecycle and suite-design model**.

## Existing Admonk constraints

R016 inherits:
- R005: risk-tiered, evidence-earned autonomy;
- R006: cost per successful outcome + per-user/tenant/plan ceilings;
- R012: instrument decisions, not curiosity;
- R014: risk-routed release evidence;
- security/privacy: minimize sensitive data exposure.

Therefore:

> **An eval system that materially damages AI unit economics is itself a product-quality problem.**

## Core finding

Admonk should not require "eval everything continuously."

The minimum should be:

1. define critical AI behavior;
2. maintain a small representative regression seed;
3. run the relevant suite before material AI behavior changes;
4. add real failures and edge cases over time;
5. evaluate outcome first;
6. inspect/grade trajectories only when process matters;
7. scale evaluation frequency/depth with consequence and observed variance;
8. track eval cost as part of the operating budget.

## Proposed AI evaluation baseline

### 1. Define the AI contract before measuring it

Each material AI capability should identify:
- intended outcome;
- unacceptable failure modes;
- action/permission boundaries;
- quality dimensions that matter;
- latency expectations where material;
- economic expectations;
- what success can be deterministically verified versus judged.

Do not create graders before the product definition is clear enough to state success.

### 2. Start with a small representative seed set

Build the initial eval set from:
- product requirements;
- important edge cases;
- known historical failures;
- consequential/permission-sensitive scenarios;
- representative real tasks where privacy allows.

Do not require hundreds of cases before the first useful eval exists.

### 3. Outcome before trajectory

Prefer verifying the actual outcome when possible.

Examples:
- Was the correct record created?
- Did the analysis cite the required evidence?
- Was the requested task completed without changing unauthorized data?
- Did the workflow produce an approved-quality result?

Evaluate trajectory/process when it matters for:
- permission boundaries;
- unsafe tool choice;
- costly loops/retries;
- required approvals;
- provenance;
- handoff/routing;
- policy compliance.

Do not score internal steps merely because they are observable.

### 4. Grader hierarchy

Use the cheapest reliable grader for the property:

1. deterministic/code/outcome check where objective;
2. rules/structured assertions where sufficient;
3. model-based grader for qualitative/open-ended criteria;
4. human review for calibration, disputed cases and high-consequence judgment.

Model graders must be calibrated against human/expert examples before they become trusted release evidence.

### 5. Capability vs regression suites

**Capability suite**
- explores current limits;
- may intentionally have lower pass rates;
- informs what to improve next.

**Regression suite**
- protects behaviors already considered dependable;
- should be much more stable;
- material regressions block or trigger review according to consequence.

A mature capability case may graduate into regression once the behavior becomes dependable.

### 6. Production-failure flywheel

Material real-world failures should be reviewed for:
- reproducibility;
- privacy-safe sanitization;
- whether the failure represents a generalizable case;
- whether it belongs in regression.

Production evidence should improve the suite rather than remain only an incident record.

### 7. Stochasticity rule

Do not run many repeated trials by default.

Increase trial count when:
- output variance is material;
- the action is consequential;
- model/tool randomness affects success;
- the comparison between two variants is too close to trust from a single trial.

### 8. Change-triggered evaluation

Run the relevant regression subset when material behavior may change, including:
- model/provider change;
- prompt/system-instruction change;
- tool schema/description change;
- routing/handoff change;
- context/memory strategy change;
- retrieval/source change;
- permission/approval logic change;
- agent orchestration change.

Do not rerun unrelated suites merely because any code changed.

### 9. Evaluation economics

Every recurring evaluation workflow should know:
- cost per eval run;
- token/model/tool consumption;
- suite runtime;
- expensive grader usage;
- repeated-trial multiplier;
- storage/trace cost where material.

Prefer:
- deterministic graders before model graders;
- sampled traces before full retention;
- targeted suite subsets before whole-suite runs when safe;
- cheaper evaluation models when calibrated and adequate.

Evaluation cost must not silently bypass the same unit-economics discipline applied to the product.

### 10. Release evidence

For a material AI behavior change, release evidence should identify:
- affected AI capability;
- relevant regression suite;
- baseline result;
- candidate result;
- quality/safety/permission deltas;
- cost/latency deltas;
- known failures/limitations;
- human review where needed;
- post-release production signal.

Do not reduce release quality to one aggregate eval score.

## Decision type

**Conditional / progressive.**

This does not combine full trace grading with full eval-driven-development infrastructure.

It uses:
- traces selectively for diagnosis/process-sensitive behavior;
- small repeatable regression suites for release confidence;
- capability suites only where active product improvement requires them;
- production failures as evidence for suite growth.

## Decision Cost Ledger — recommended direction

**Benefit gained:**  
AI changes become measurable and regressions are caught before users where practical.

**Problem solved:**  
Avoids both "it looked good in a few chats" and a permanently expensive evaluation lab.

**New problem introduced:**  
Eval cases, graders and baselines become maintained product assets.

**Complexity / operating cost:**  
Low/Moderate initially; grows with AI capability/risk.

**Speed cost:**  
Material AI changes may wait for relevant evaluation runs.

**Governance / cognitive cost:**  
Moderate: teams must define success, select graders and interpret noisy results.

**Economic cost:**  
Recurring model/tool/token spend for evaluation.

**Quality risk:**  
A weak or gameable grader can create false confidence.

**AI/token/tool cost:**  
Material and must be tracked. Multiple trials and model graders can multiply cost quickly.

**Who pays:**  
The AI capability owner owns the suite; product/engineering define success; domain experts calibrate qualitative graders when needed.

**When cost appears:**  
During AI behavior changes, model migrations, incidents and recurring regression runs.

**Containment:**
- start small;
- prefer deterministic outcome checks;
- run only relevant suites;
- scale trial count by variance/consequence;
- calibrate model graders;
- add failures from production;
- track eval cost/latency;
- remove stale/low-value cases.

**Revisit trigger:**
- eval spend becomes material relative to product unit economics;
- suite runtime slows release cadence;
- graders disagree frequently with human judgment;
- production failures repeatedly escape the suite;
- model/provider changes make current cases obsolete;
- suite size grows faster than decision value.

## Synthesis Compatibility Check

**Decision type:** Conditional/progressive, not true hybrid.

Admonk does not require:
- tracing every production AI interaction indefinitely;
- model grading every eval case;
- multiple trials for every case;
- hundreds of cases before launch;
- one vendor's eval platform;
- one aggregate score as release truth.

## Decision options

### A. Eval-driven from the beginning
Every meaningful AI capability gets a formal eval suite before implementation, with broad trace capture and continuous regression runs.

**Benefit:** strongest discipline and fastest long-term regression detection.
**Price:** highest early token/tool/engineering cost and risk of evaluating hypotheses before product behavior is proven.

### B. Critical-behavior regression seed + production-failure flywheel — RECOMMENDED
Define success early, create a small representative regression set for critical behavior, evaluate material AI changes, and grow the suite from real failures/edge cases. Add capability suites and richer traces only when active improvement/risk justifies them.

**Benefit:** meaningful regression protection with evaluation cost proportional to evidence and consequence.
**Price:** some early blind spots; more mature eval infrastructure may need to be added later.

### C. Production-monitoring first
Rely mainly on manual QA and production feedback until the AI capability is widely used, then formalize evals.

**Benefit:** lowest early evaluation cost.
**Price:** highest risk of silent regressions, slow model-change validation and repeated production failures.

## Locked Admonk direction

**B — Critical-behavior regression seed + production-failure flywheel.**

Explicit price:
> **Admonk accepts some early evaluation blind spots and later eval-infrastructure work so it can protect critical AI behavior without allowing evaluation itself to become a large recurring token and tooling expense.**

## Lock result

- Critical-behavior regression seed + production-failure flywheel locked.
- Early evaluation blind spots and later eval-infrastructure work explicitly accepted.
- AI evaluation baseline promoted into Product Supervisor/release governance.
- Evaluation economics added to the feedback-loop model.
- Evaluation architecture remains vendor-neutral.
- R016 locked under the Decision Cost & Coupling Framework.
- Priority 3 complete.
- Next checkpoint: retroactive Decision Cost audit for R001–R006 before Priority 4.

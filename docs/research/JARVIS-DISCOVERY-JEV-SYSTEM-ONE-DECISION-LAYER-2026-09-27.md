# Jarvis Discovery Spike — Jev / System-One Decision Layer

**Date:** 2026-09-27  
**Status:** LOCKED DIRECTION — OWNER ACCEPTED  
**Related locked decisions:** RQ-01, RQ-02, RQ-03, RQ-04, RQ-05  
**Purpose:** Investigate whether Jev/System-One-style decision models materially improve Jarvis's target of high speed, low AI cost/token usage, reliable software control and high delivery quality.

## 1. Executive conclusion

Jev is important to Jarvis primarily because it validates an architectural pattern, not because Admonk should make Jev itself a permanent dependency.

**Recommended direction:** introduce a provider-neutral **Reflex Decision Plane** between deterministic code and generative/reasoning AI.

The plane handles narrow semantic judgments that ordinary code cannot express cleanly but that do not justify text generation or deep reasoning.

Conceptually:

```text
Deterministic software
        ↓ unresolved semantic judgment
REFLEX DECISION PLANE
- typed bounded decisions
- probabilities
- confidence/uncertainty
- parallel atomic questions
        ↓
ordinary code composes the result
        ├─ deterministic handler
        ├─ C1 fast generation
        ├─ C2 deep reasoning
        ├─ C3 specialists
        ├─ ask user / human review
        └─ governed action path
```

Jev is currently a strong first candidate for the Lab implementation of this plane, but the Admonk contract must remain provider-neutral.

## 2. What Jev actually is

TypeSafe AI released Jev on 2026-09-15 as its first 'System One' model.

Instead of generating prose token by token, the API receives:
- a `state` containing the relevant input/context;
- one or more typed, bounded questions;

and returns typed probabilistic decisions.

Current primitives:
- Choice — choose from a caller-defined closed set;
- Score — judge against an ordered rubric;
- Noul — return a probability for a yes/no proposition.

Questions over the same state are evaluated independently and in parallel.

TypeSafe explicitly recommends keeping control flow, deterministic rules and side effects in ordinary code, and using the model only for narrow semantic/common-sense judgments over unstructured data.

Primary sources:
- https://docs.typesafe.ai/introduction
- https://docs.typesafe.ai/concepts/how-to-build-with-system-one
- https://typesafe.ai/blog/introducing-system-one-models-and-jev

## 3. Important correction — 'zero hallucination'

Do not repeat the phrase 'zero hallucinations' without qualification.

What Jev can guarantee by construction is **bounded/type-safe output**:
- no invented category outside a Choice's supplied options;
- no malformed free-form JSON/string response for the decision primitive;
- no generated prose because Jev does not generate prose.

It **cannot guarantee a correct decision**.

TypeSafe's own Jev 1.13 documentation lists known failure modes:
- literal reading of instructions;
- weak arithmetic/counting/numeric precision;
- unreliable date/time comparison;
- degradation with multiple reasoning hops/indirection;
- context rot from large irrelevant state;
- susceptibility to adversarial/injected content;
- confusion from contradictory criteria;
- non-guaranteed structural probability identities;
- no text generation.

Therefore the correct architectural phrase is:

> **Zero out-of-schema/type hallucination; non-zero semantic decision error.**

Source:
- https://docs.typesafe.ai/model-jaggedness/jev-1.13

## 4. Why this matters to Jarvis

RQ-01 through RQ-03 already concluded:
- Jarvis is software, not an AI assistant;
- deterministic code should own exact rules and authority;
- Jarvis should use the minimum sufficient intelligence;
- routing should use deterministic signals before semantic models;
- generative/deep models should be invoked only when needed.

Jev provides a model class that fits precisely between C0 deterministic code and C1/C2 generative reasoning.

Rather than asking a generative LLM to emit JSON for many micro-decisions, Jarvis can use a bounded decision engine to resolve them directly.

## 5. Refinement to RQ-03 — C1 subprofiles

RQ-03 remains locked. This discovery does not reopen it.

Refine its implementation taxonomy:

```text
C0   Deterministic software

C1D  Decision AI / Reflex
     bounded semantic judgment
     typed probability output
     no prose generation

C1G  Fast Generative AI
     bounded language generation / explanation

C2   Deep reasoning

C3   Orchestrated / specialist intelligence
```

`C1D` and `C1G` are subprofiles of the already locked C1 Fast-AI tier.

Rule:
> If the answer space is bounded and the software needs a judgment rather than language, prefer C1D over C1G when evaluations show it meets the quality floor.

## 6. Proposed Admonk Reflex Decision Plane

The Admonk-owned contract should not expose Jev-specific naming such as `noul`.

Candidate neutral primitives:

```text
DecisionRequest
  state
  decisions[]
    key
    type: choice | score | boolean_probability
    instructions
    criteria/options

DecisionResult
  key
  selected/value
  probabilities
  confidence?
  model/provider/version
  latency
  usage/cost
```

Possible adapters:

```text
Admonk Reflex Decision Contract
        │
        ├─ TypeSafe / Jev
        ├─ future hosted decision model
        ├─ self-hosted/open decision model
        ├─ classical classifier
        └─ structured-output LLM fallback
```

This preserves the product architecture if Jev pricing, quality, availability or vendor strategy changes.

## 7. Where the Decision Plane could help Jarvis

### 7.1 Intent/domain routing

Examples:
- Marketing vs Support vs People vs company-level;
- ask vs analyze vs create vs execute;
- which bounded capability best matches the request.

This is one of TypeSafe's documented target patterns: route to deterministic code, specialist model or human based on a fast semantic classification.

### 7.2 Cognitive route suggestion

Estimate whether a request is:
- simple/bounded;
- analytical;
- ambiguous;
- likely to need deeper reasoning.

This is a suggestion into RQ-03 routing logic, not final authority.

### 7.3 Surface routing

Evaluate bounded interaction-shape signals for S0/S1/S2:
- comparison required?
- structured inspection needed?
- direct manipulation likely?
- consequential confirmation required?
- artifact forming?

Deterministic product state should still override where obvious.

### 7.4 Semantic zoom / graph focus

Given current Jarvis state and user intent, rapidly select which authorized domain/capability should receive visual focus.

This could make the connected-circle interaction respond semantically inside the R0/R1 experience budget without waiting for a generative model.

### 7.5 Context filtering and retrieval re-ranking

Score whether retrieved passages, resources or prior task-state items are relevant enough to pass into a generative/deep model.

This can reduce context tokens and context rot before expensive inference.

### 7.6 Model routing

Choose among bounded model tiers/profiles where the candidate set is known.

### 7.7 Generative-output verification

Run cheap bounded checks on:
- evidence support;
- response completeness;
- policy-risk indicators;
- tool-call intent/risk;
- whether generated output needs deeper review.

This can make evaluation/guardrails cheap enough to run in the request path instead of only sampling offline.

### 7.8 Workflow micro-decisions

Use bounded semantic judgment inside ordinary software workflows where brittle keyword/rule logic is insufficient.

Example:
```text
support request
   ↓
code checks deterministic fields
   ↓
Decision Plane asks in parallel:
- topic?
- urgency?
- possible escalation?
- asks for refund?
- sensitive credential request?
   ↓
code executes the workflow
```

## 8. Speculative fan-out may be especially valuable

TypeSafe evaluates multiple independent questions over the same state in parallel.

For Jarvis, one bounded decision request could potentially produce several micro-signals at once:

```text
state = current task + minimal current context

questions:
- domain
- primary intent
- possible action intent
- likely cognitive depth
- likely surface mode
- ambiguity / needs clarification
- context-source relevance
```

Code then uses only the relevant signals.

This may replace several serial LLM routing/judge calls with one low-latency request.

However, the Lab must prove the gain on our own tasks. Adding more questions is not automatically useful if the state becomes bloated or the questions are poorly decomposed.

## 9. Why Jev must NOT own safety or permissions

TypeSafe's confidence docs describe confidence-gated actions, but Admonk's architecture is intentionally stricter.

For Jarvis:
- Jev may classify user intent or estimate semantic risk;
- Jev may recommend review/escalation;
- Jev may never grant tenant/product permission;
- Jev may never override an A2/A3 action class;
- Jev confidence may never substitute for required approval;
- deterministic policy remains the final gate.

Reason:
semantic confidence answers 'how certain is this judgment?' It does not answer 'is this user authorized to do this?'

RQ-03 authority remains unchanged.

## 10. Calibration matters more than a pretty confidence number

TypeSafe returns probability/confidence signals, but thresholds must be tuned against our own labelled task data.

Independent Arize testing is especially valuable here. Across 23,325 judgments on RAGTruth and SummEval, Arize found that Jev matched Claude Opus 5 at 87% accuracy on a held-out hallucination-detection test after threshold tuning, at roughly 1/300 the cost and 23× the speed. At an untuned 0.5 threshold, Jev scored only 76%, showing that threshold selection can matter as much as model choice.

Arize's practical recommendation is to tune thresholds against human-labelled examples and validate on separate held-out data.

Source:
- https://arize.com/blog/jev-llm-judge-benchmark/

Jarvis consequence:
> Every Decision Plane threshold is a versioned product/evaluation artifact, not a magical global constant.

Thresholds may differ by:
- task class;
- domain;
- false-positive/false-negative cost;
- action risk;
- model version;
- language.

## 11. Current Jev facts relevant to Admonk

As of 2026-09-27, TypeSafe documents Jev 1.13 as:
- hosted API;
- text-only input;
- English as its strongest language;
- 64k total request context, with a 32k state + longest-question limit;
- $0.042 per million input tokens; output unmetered/free;
- 250k tokens/sec and 1,200 requests/minute default published limits, currently subject to change;
- aliases can move between versions, so production thresholds should pin a version.

Source:
- https://docs.typesafe.ai/models

TypeSafe's launch material reports roughly 70–500 ms end-to-end from its current service and claims 40–200× speedups on System-One-shaped tasks, while explicitly noting its published evals were generally run from laptops on the U.S. West Coast and that its headline gains are at the high end of real-world cases.

Source:
- https://typesafe.ai/blog/introducing-system-one-models-and-jev

Therefore:
- do not assume those latency numbers from Cairo;
- do not assume English accuracy transfers to Arabic;
- do not rely on moving aliases after threshold tuning;
- do not treat vendor benchmark reference probabilities as ground truth.

## 12. Independent evidence

TechCrunch reported early developer tests where Vercel replaced an LLM classifier with Jev and reported 5–18× faster results with higher accuracy for that classifier; another email-classification test found Gemini slightly more accurate but 10–20× more expensive. These are early individual tests, not universal benchmarks.

Source:
- https://techcrunch.com/2026/09/18/a-new-kind-of-ai-model-from-a-chatgpt-inventor-is-thrilling-developers/

Arize provides the strongest independent benchmark found in this discovery because it used human-labelled datasets and a held-out threshold-tuning procedure rather than using another model as reference truth.

Source:
- https://arize.com/blog/jev-llm-judge-benchmark/

Hacker News discussion is useful as a skepticism check rather than evidence: developers point out that traditional classifiers/ML may outperform any neural decision model when labels are stable and sufficient training data exists, and that constrained decoding can solve some schema-output problems without a new model class.

Source:
- https://news.ycombinator.com/item?id=49796843

Admonk consequence:
> The Decision Plane must route to the cheapest adequate decision mechanism, including ordinary code or classical ML—not automatically to Jev.

## 13. High-speed / low-token / high-delivery architecture

The combined Jarvis direction now becomes:

```text
USER INPUT
    │
    ▼
R0 LOCAL SOFTWARE ACKNOWLEDGEMENT
    │
    ▼
C0 DETERMINISTIC PRE-ROUTER
    │
    ├─ exact rule/resource/action → code
    │
    └─ semantic judgment needed
            │
            ▼
     REFLEX DECISION PLANE (C1D)
     - bounded options
     - many atomic questions in parallel
     - probabilities/uncertainty
            │
            ▼
      CODE COMPOSES DECISION
       ├─ direct deterministic result
       ├─ C1G fast generation
       ├─ C2 deep reasoning
       ├─ C3 specialist orchestration
       ├─ clarification / review
       └─ governed action path
            │
            ▼
        S0 / S1 / S2 SURFACE
```

This architecture can reduce generative-model usage in three places:
1. before inference — only retrieve/pass relevant context;
2. during routing — avoid generative calls for bounded decisions;
3. after inference — use cheap request-path verification where appropriate.

## 14. Relationship to the persistent Jarvis side panel

The Decision Plane could also support contextual Jarvis behavior inside the dashboard side panel.

Example:

```text
Current structured dashboard context
+ user: 'summarize the presented data'
        ↓
deterministic context envelope identifies visible resources
        ↓
Decision Plane selects relevant metrics/evidence and appropriate route
        ↓
C1G/C2 generates the actual human explanation
```

The decision model should not generate the summary. It helps choose **what needs to be summarized and how the task should route**.

## 15. Jarvis Lab recommendation

Add a dedicated **Decision Plane benchmark** before adopting Jev in Production.

Compare at least:
1. deterministic rules/classical logic where feasible;
2. Jev;
3. a current small structured-output generative model;
4. optionally a self-hosted/open decision model if mature enough at Lab time.

Initial test classes:
- domain/intent routing;
- C-route suggestion;
- S-surface suggestion;
- context relevance/reranking;
- action-intent/risk classification (not permission);
- generated-answer/evidence verification.

Use real Admonk/Kalam examples with human labels.

Measure:
- accuracy by class;
- confusion matrix;
- calibration / reliability curve / Brier or ECE where appropriate;
- false-negative/false-positive cost;
- percentage auto-routed vs escalated;
- p50/p95 latency from Egypt/target regions;
- input tokens;
- cost per decision;
- downstream generative tokens avoided;
- total cost per successful task;
- task success after routing;
- model-version drift.

Run Arabic/English separately. Jev's own docs state English is currently strongest.

## 16. Recommended discovery lock

> **Admonk should add a provider-neutral Reflex Decision Plane to the Jarvis architecture.**
>
> The Decision Plane handles narrow, bounded semantic judgments between deterministic software and generative/deep AI. It returns typed choices/scores/probabilities that ordinary code composes into workflow behavior.
>
> Jev is the leading current Lab candidate for this role because its architecture is explicitly optimized for typed parallel decisions, low latency and low token cost. Jev itself is not the architectural dependency.
>
> Deterministic code remains preferred for exact rules, math, dates, permissions, policies and side effects. Generative/reasoning models remain responsible for writing, explanation, synthesis, open-ended reasoning and complex planning.
>
> Decision-model confidence never grants execution authority. Thresholds must be versioned and calibrated on Admonk's own labelled data.
>
> The goal is not 'use Jev everywhere.' The goal is **use the cheapest and fastest adequate intelligence primitive for each software decision.**

## 17. Relationship to upcoming questions

This discovery directly informs:
- RQ-06 dynamic workspace composition — bounded selection of approved UI primitives may use Decision Plane signals;
- RQ-07 governed real work — semantic intent/risk can be classified, authority remains deterministic;
- RQ-10 context assembly — relevance filtering can reduce context;
- RQ-13 provider/model replaceability — Decision Plane needs adapters/versioning;
- RQ-16 evaluation — threshold/calibration datasets become first-class;
- RQ-18 economics — decision calls may dramatically reduce generative spend;
- RQ-24 Jarvis Lab — add decision-plane benchmark scenarios;
- RQ-25 final architecture — decide whether Decision Plane becomes a shared platform primitive.

Do not silently lock a Jev vendor dependency before Lab evidence.
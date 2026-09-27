# Jarvis Research Question 13 — Model / Provider Replaceability & Runtime Contract

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** How do we make every AI model/provider replaceable without reducing Jarvis to a lowest-common-denominator abstraction?  
**Status:** LOCKED — OWNER ACCEPTED  
**Implementation authority:** None. Product/runtime architecture research only.

## 1. Decision problem

Jarvis will use several different intelligence classes:
- C1D bounded decision models;
- C1G fast generative models;
- C2 deep reasoning models;
- C3 agent/specialist models;
- realtime voice models;
- embeddings/rerankers;
- potentially local/private models later.

Providers and model families change quickly.

Current market evidence shows:
- model families are deprecated/retired regularly;
- moving aliases such as `latest` may point to a different model over time;
- reasoning controls differ by model/provider/version;
- tool/structured-output/state/realtime features differ materially;
- API parameters can become unsupported across model generations.

If provider/model identifiers leak into products, prompts, capabilities and business logic, every model upgrade becomes a product migration.

The opposite mistake is a fake universal abstraction that suppresses useful provider-native capabilities.

RQ-13 defines a replaceable middle layer.

## 2. External research evidence

### OpenAI — model choice is task-, quality-, latency- and cost-dependent

OpenAI's current model-selection guidance explicitly frames model choice around the task and the desired quality/cost/latency balance rather than one universal model.

Reasoning effort is also model-dependent and can vary from low/none through higher effort levels depending on model family.

Sources:
- https://developers.openai.com/api/docs/guides/model-selection
- https://developers.openai.com/api/docs/guides/reasoning

### OpenAI — snapshots exist for behavioral stability, deprecations still require migration

OpenAI model documentation states that snapshots can lock a specific model version for more consistent behavior, while its deprecation schedule shows regular retirement/migration of older model snapshots.

Sources:
- https://developers.openai.com/api/docs/models/gpt-5.6-sol
- https://developers.openai.com/api/docs/deprecations

### Anthropic — model migrations can change prompting, parameters and reasoning behavior

Anthropic's current prompting/migration guidance documents model-specific differences in:
- thinking configuration;
- effort behavior;
- tool triggering;
- response style;
- supported/deprecated API parameters.

Anthropic also publishes model lifecycle states and retirement dates, explicitly recommending testing replacements before migration.

Sources:
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables
- https://docs.anthropic.com/en/docs/about-claude/model-deprecations

### Google — `stable`, `preview`, `latest` and `experimental` have different lifecycle guarantees

Gemini documents explicit model-version semantics:
- stable model identifiers are preferred for most Production apps;
- preview/experimental releases have weaker stability guarantees;
- `latest` aliases can be hot-swapped to a newer model release.

Google also publishes deprecation/shutdown schedules.

Sources:
- https://ai.google.dev/gemini-api/docs/models
- https://ai.google.dev/gemini-api/docs/deprecations

### Provider feature sets are not identical

Current provider APIs differ in support and semantics for:
- structured outputs;
- tool/function calling;
- parallel tool calls;
- reasoning/thinking controls;
- server-side conversation state;
- built-in tools;
- realtime/audio;
- multimodal tool results;
- prompt caching.

Sources:
- https://developers.openai.com/api/docs/guides/structured-outputs
- https://ai.google.dev/gemini-api/docs/function-calling
- https://ai.google.dev/gemini-api/docs/tools
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables

## 3. Core conclusion

> **Products request an intelligence capability/profile. They do not request a provider model name.**

Example:

Bad product code:

```text
model = 'gpt-6-astra'
reasoning_effort = 'high'
```

Preferred product request:

```text
route_profile = 'deep.cross_domain_analysis.v2'
quality_floor = 'high'
latency_class = 'extended'
required_capabilities = [
  structured_output,
  tool_calling,
  long_context
]
```

An Admonk-owned runtime binding resolves that request to an evaluated provider/model deployment.

## 4. Five-layer architecture

Keep these concepts separate:

```text
1. TASK / COGNITIVE PROFILE
   what intelligence the product needs

2. MODEL CAPABILITY CONTRACT
   functional requirements that must be satisfied

3. APPROVED MODEL BINDING
   evaluated model/provider candidates for that profile

4. PROVIDER ADAPTER
   provider-specific API/prompt/tool/state translation

5. MODEL DEPLOYMENT
   exact provider/model/version/region/runtime actually invoked
```

This prevents both model lock-in and lowest-common-denominator design.

## 5. Route Profile

RQ-03 already says products should request route profiles rather than provider model names.

RQ-13 formalizes the contract.

Candidate:

```text
RouteProfile
  profile_key
  version
  cognitive_class: C1D | C1G | C2 | C3 | realtime | embedding | rerank
  task_shape
  required_capabilities[]
  quality_floor
  latency_class
  context_budget/profile
  output_contract
  tool_policy/profile
  modality requirements
  data residency/security constraints
  determinism/reproducibility needs
  max operating-cost/credit envelope
  fallback policy
  evaluation_suite/version
```

Examples:

```text
fast.intent_classification.v1
fast.user_explanation.v2
deep.marketing_diagnosis.v3
deep.cross_domain_strategy.v1
agent.research_worker.v2
voice.conversational_shell.v1
embedding.knowledge_retrieval.v1
```

## 6. Capability contract

Do not treat model names as capability guarantees.

Maintain a provider-neutral capability vocabulary such as:

```text
TEXT_GENERATION
STRUCTURED_OUTPUT
FUNCTION_CALLING
PARALLEL_TOOL_CALLING
REASONING_CONTROL
STATEFUL_CONTINUATION
STREAMING
VISION_INPUT
AUDIO_INPUT
AUDIO_OUTPUT
REALTIME_FULL_DUPLEX
LONG_CONTEXT
PROMPT_CACHING
BUILTIN_WEB_SEARCH
BUILTIN_FILE_SEARCH
COMPUTER_USE
MCP
EMBEDDING
RERANK
LOCAL_EXECUTION
REGIONAL_PROCESSING
ZERO_DATA_RETENTION_COMPATIBLE
```

Capability metadata may also include limits/qualities:
- context length;
- max output;
- supported reasoning controls;
- structured-schema subset;
- tool limits;
- modality types;
- rate limits;
- regional availability;
- provider maturity: stable/preview/experimental;
- deprecation date/status.

## 7. Capability negotiation, not false uniformity

Provider adapters should expose what they actually support.

Example:

```text
Route requires:
structured_output
tool_calling
reasoning_control

Candidate A supports all
→ eligible

Candidate B lacks reasoning control
→ ineligible unless profile declares it optional
```

Do not silently emulate every missing feature with prompting.

If a provider lacks a material required capability:
- choose another evaluated deployment;
- choose an explicit tested fallback strategy;
- or fail/degrade transparently.

## 8. Provider Adapter

Each provider adapter translates Admonk's runtime contract into provider-native behavior.

Candidate responsibilities:

```text
ProviderAdapter
  request translation
  model/version resolution
  reasoning/thinking mapping
  message/content mapping
  structured-output mapping
  tool schema mapping
  tool-result continuation
  provider state/session handling
  streaming event normalization
  caching controls
  provider error normalization
  usage/cost extraction
  capability discovery/metadata
  safety/refusal normalization
```

Important:

> Provider adapters may be asymmetric.

One provider may expose capabilities another does not. Admonk should preserve useful native features behind explicit capability contracts rather than hiding them.

## 9. Prompt / instruction portability

Do not assume the same prompt behaves identically across providers or model generations.

Use a layered prompt/instruction architecture:

```text
Task semantics
  + Jarvis invariant rules
  + product/domain instructions
  + agent/skill instructions
  + provider/model adaptation layer
```

Provider/model adaptation may change:
- formatting;
- tool-trigger guidance;
- thinking/effort parameters;
- structured-output mechanics;
- state continuation mechanics;
- verbosity defaults;
- provider-specific compatibility shims.

But it must not change business semantics, authority or user intent.

## 10. Model Deployment record

Every runtime model target should be explicit and versioned.

Candidate:

```text
ModelDeployment
  deployment_key
  provider
  provider_model_id
  exact_snapshot/version where available
  provider_api/version
  region/processing mode
  capability set
  lifecycle state
  deprecation/retirement date
  pricing metadata
  rate-limit class
  privacy/data-handling metadata
  adapter version
  prompt-adaptation version
  evaluation release/status
```

Products do not store this key directly unless they are debugging/auditing.

## 11. Pin Production; float in Lab

Recommended policy:

### Production

Prefer:
- exact snapshots/versioned stable model IDs where the provider offers them;
- explicit API/adapter versions;
- eval-qualified deployment binding.

Avoid by default:
- `latest` aliases;
- experimental model aliases;
- moving preview endpoints for consequential/critical routes.

### Lab

May intentionally test:
- latest aliases;
- previews;
- experimental models;
- new providers;
- local models.

Promotion from Lab → Production requires representative evaluation.

Reason:
Google explicitly states `latest` aliases are hot-swapped, while OpenAI snapshots are designed to lock behavior and Anthropic recommends migration testing before model retirement.

## 12. Binding / release concept

A route profile should point to an **approved binding release**, not one permanent model.

Example:

```text
deep.marketing_diagnosis.v3
  approved binding release: 2026-09-27.2

  primary:
    provider/model/snapshot X

  fallback:
    provider/model/snapshot Y

  experimental shadow:
    provider/model/snapshot Z
```

The binding release records the evaluation evidence that made each candidate eligible.

## 13. Fallback must be quality-qualified

Never implement:

```text
Provider A failed
→ send to whatever model is available
```

Instead:

```text
Provider A failed
        ↓
Is there an eval-approved fallback
for this exact RouteProfile requirements?
        │
       yes
        ↓
invoke fallback

       no
        ↓
degrade / retry / queue / explain
according to task policy
```

Fallback candidate must satisfy:
- required capabilities;
- authorization/data-region constraints;
- minimum quality threshold;
- output contract;
- tool semantics;
- action-safety requirements;
- acceptable latency/cost policy.

Availability never outranks the quality/safety floor.

## 14. Fallback is task-state aware

Changing providers during an ongoing task may require more than retrying a request.

Runtime must consider:
- provider-specific conversation state;
- encrypted/thinking signatures;
- tool-call state;
- cached prefixes;
- context compaction;
- structured output state;
- realtime audio session.

Therefore durable Jarvis task state from RQ-10/RQ-14 remains provider-neutral.

On provider switch:
- rebuild a provider-specific Context Packet from durable state;
- replay only necessary task/tool state;
- never depend on opaque provider session state as the sole task record.

## 15. Voice is its own provider capability class

RQ-04 remains authoritative.

Do not force realtime voice through the same exact abstraction as text reasoning.

Voice route profiles may require:
- realtime full duplex;
- WebRTC support;
- barge-in;
- transcript events;
- multilingual features;
- session control;
- audio latency.

Voice providers still sit behind an Admonk Voice Session Contract and capability negotiation.

## 16. Decision Plane is its own provider class

Likewise, C1D models such as Jev should not be coerced into a text-generation interface.

Decision route profile should describe:
- choice/score/boolean probability;
- calibration expectations;
- latency target;
- supported languages;
- threshold/evaluation release.

Provider adapter can be:
- Jev;
- classical classifier;
- local classifier;
- structured-output generative fallback.

## 17. Local models are first-class optional deployments

OpenJarvis RQ-09 remains compatible.

A local/private model can become a `ModelDeployment` if it passes:
- route-profile quality suite;
- security/privacy requirements;
- latency/reliability requirements;
- hardware/runtime health requirements;
- economics evaluation.

Local models do not require separate product semantics.

## 18. User-selectable models

M2-14 already locks that products may allow users to choose among compatible model/reasoning options and show expected credit impact where reasonable.

RQ-13 interpretation:

Users should normally choose **quality/speed/cost modes or compatible named options**, not arbitrary unsupported provider strings.

Example:

```text
Recommended
Fast
Deep
Maximum quality
Private/local — if eligible
```

Advanced/admin surfaces may expose actual provider/model details for transparency/debugging.

A user-selected option still resolves only among route-compatible, evaluated deployments.

## 19. Quality floor comes before cost routing

Do not dynamically downgrade merely because a cheaper model is available.

Selection order:

```text
1. hard capability/security constraints
2. task quality floor
3. route-specific reliability
4. latency objective
5. successful-outcome economics
6. provider availability/load
```

M2-14's economic principle remains authoritative:

> optimize cost per successful quality outcome, not cost per token/call.

## 20. Model selection can become adaptive — carefully

Within an approved route profile, runtime may later choose among several evaluated deployments using:
- task subclass;
- language;
- context size;
- latency target;
- provider health;
- historical eval performance;
- cost;
- tenant privacy/region constraints.

This selection may use:
- deterministic policy;
- Decision Plane;
- later learned routing.

But:
- candidate set must already be approved;
- learned routing cannot promote an unqualified model;
- route changes remain observable/versioned;
- RQ-16 eval/change-control governs Production routing-policy updates.

## 21. Shadow evaluation / canary promotion

Recommended model-upgrade path:

```text
new model appears
      ↓
Lab regression suite
      ↓
offline comparison
      ↓
shadow/duplicate evaluation where legally/economically appropriate
      ↓
small canary route/binding
      ↓
quality + latency + cost + safety review
      ↓
promote binding release
```

Do not swap all Production traffic merely because a provider says a new model is better.

## 22. Deprecation management

Maintain a model lifecycle watch process.

Registry should track:
- active;
- migration-required;
- deprecated;
- retirement date;
- retired;
- replacement candidate.

When deprecation occurs:
1. identify impacted RouteProfiles/bindings;
2. test provider-recommended replacement plus alternatives;
3. run route regression suite;
4. update prompt/provider adaptation if required;
5. promote new binding release;
6. retain old trace/evaluation metadata for historical reproducibility.

## 23. API/provider versioning is separate from model versioning

A provider API can change independently of the model.

Google, for example, distinguishes stable `v1` API behavior from `v1beta` features.

Therefore track separately:
- provider API version;
- SDK/adapter version;
- model version/snapshot;
- prompt adaptation version;
- capability manifest version.

Do not treat a model migration as the only compatibility axis.

## 24. Tool/capability portability

Admonk tools/capabilities stay provider-neutral at the business contract level.

Example:

```text
marketing.performance.query
```

Provider adapter translates this into that model provider's tool/function schema.

Models never receive raw connector credentials.

Tool results return through Admonk-normalized result contracts before being mapped back to provider-native continuation formats.

This keeps RQ-07/RQ-08 authoritative.

## 25. Structured output portability

Do not assume all providers implement the same JSON Schema subset/strictness.

Admonk owns the canonical business/result schema.

Provider adapter:
- maps supported schema;
- validates output again in Admonk code;
- rejects semantically invalid results;
- applies an explicit fallback strategy if the provider cannot satisfy the required contract.

Schema-valid does not imply business-valid.

## 26. Provider-specific features

Admonk may intentionally exploit a unique provider feature when it improves product value.

Rule:

> unique feature usage must be declared in the RouteProfile capability requirements and isolated behind the provider/runtime contract.

Examples:
- specialized computer-use mode;
- provider-native realtime audio;
- unique research/built-in tool;
- unusually large context;
- native multimodal tool results.

If no alternate provider can satisfy the profile:
- the route may temporarily be single-provider;
- that dependency must be explicit;
- product semantics still must not contain raw provider API assumptions;
- a degradation/exit path must be documented.

Replaceable does **not** mean every provider is interchangeable today.

It means the dependency is explicit, isolated and migratable.

## 27. Observability

Every model call should emit normalized runtime metadata:
- RouteProfile + version;
- binding release;
- provider/model exact version;
- adapter version;
- reasoning/effort mode;
- capabilities used;
- context tokens/cache;
- output/reasoning tokens where exposed;
- latency/TTFT;
- provider errors/retries/fallback;
- raw provider cost estimate;
- Admonk credits;
- quality/eval correlation refs;
- task/outcome correlation.

This directly feeds RQ-16/17/18.

## 28. Security / privacy constraints are routing constraints

Model choice must respect:
- tenant data policy;
- provider eligibility;
- regional/data residency requirements;
- zero-retention requirements where applicable;
- sensitivity class;
- contractual restrictions;
- local/private deployment requirements.

These are hard constraints before cost/performance optimization.

## 29. Runtime topology intentionally not locked

RQ-13 defines a logical **Admonk Model Runtime Contract**.

It does **not** yet require a mandatory centralized AI gateway service.

Possible later implementations:
- shared package + product-local adapters;
- shared runtime service;
- hybrid;
- provider-direct calls through common SDK/contract.

M2-14 already explicitly avoided prematurely locking a centralized gateway.

M2-20 / RQ-19 / RQ-25 decide runtime deployment topology using actual scale/security/economics evidence.

## 30. Relationship to M2-19 version / compatibility / migration

RQ-13 supplies a concrete AI-specific compatibility model for the active Foundation M2-19 question:
- RouteProfile version;
- ModelDeployment version/snapshot;
- ProviderAdapter version;
- prompt adaptation version;
- binding release;
- evaluation suite/release;
- deprecation/migration state.

These concepts should later be reconciled into the common Foundation version/compatibility contract rather than creating an unrelated AI-only migration system.

## 31. Evaluation requirements

Every route profile needs a representative suite.

Evaluate candidates on:
- task success/quality;
- factual/evidence correctness;
- structured-output correctness;
- tool-use success;
- action-proposal correctness;
- context handling;
- language performance;
- latency/TTFT;
- tokens;
- cost per successful outcome;
- provider error rate;
- refusal/behavior differences;
- fallback compatibility;
- long-task continuity;
- user correction rate.

Migration evaluation must compare **behavior**, not only benchmark scores.

## 32. Recommended lock

> **RQ-13 — Profile-Based, Capability-Negotiated Model Runtime**
>
> Admonk products, Jarvis, workflows and agent profiles request versioned **Route Profiles** and required intelligence capabilities—not provider/model identifiers.
>
> The runtime keeps five layers distinct: **Route Profile → Capability Contract → Approved Binding → Provider Adapter → exact Model Deployment**.
>
> Provider abstraction uses capability negotiation rather than a lowest-common-denominator API. Provider-native strengths may be used where valuable, but unique dependencies must be explicit and isolated.
>
> Production model deployments should prefer stable/pinned model versions or snapshots where available. Moving `latest`/experimental aliases are primarily Lab candidates unless an explicit route accepts that volatility.
>
> Model/provider fallback is allowed only to an eval-qualified deployment satisfying the route's quality, capability, security, output and authority requirements. Availability must not silently lower the quality/safety floor.
>
> Durable Jarvis task state remains provider-neutral so a task can rebuild provider-specific context and continue across model/provider changes rather than depending on opaque provider session state.
>
> Voice, Reflex Decision models, embeddings/rerankers and local models are distinct model capability classes behind their own contracts; they are not forced into one text-generation interface.
>
> Provider/model prompting, reasoning controls, tool schemas, structured-output mechanics and state handling live in versioned provider/model adaptation layers rather than product logic.
>
> New models move Lab → regression evaluation → optional shadow/canary → approved binding release before broad Production use.
>
> Deprecations trigger controlled migration/evaluation rather than direct provider-name replacement.
>
> Model selection optimizes **successful quality outcome under capability/security constraints**, then latency/economics—not cheapest token price.
>
> RQ-13 locks the logical runtime contract, not a mandatory centralized AI gateway service; deployment topology remains for M2-20/RQ-19/RQ-25.
>
> **Jarvis depends on intelligence capabilities and evaluated route profiles. Providers and model names are replaceable implementation choices behind that boundary.**

## 33. Recommendation

**LOCK RQ-13 as written.**

This preserves provider flexibility without sacrificing model-specific performance, Production stability or measurable quality.
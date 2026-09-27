# Jarvis Research Question 10 — Context Assembly & Knowledge Architecture

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** Where does context live, and how does Jarvis assemble the right effective context for each task?  
**Status:** LOCKED — OWNER ACCEPTED  
**Implementation authority:** None. Product/platform/context architecture research only.

## 1. Decision problem

Jarvis needs company, department, product, user, task, resource, evidence and historical context without creating:
- one giant `company brain` database;
- one giant prompt;
- unrestricted cross-department retrieval;
- duplicated copies of specialist data;
- stale data treated as current truth;
- chat history treated as canonical memory;
- private/user context promoted into company knowledge;
- high token cost from repeatedly sending the same irrelevant material.

M2-10 already locks the strategic foundation:
- approved knowledge, structured operational data, operational memory and temporary task/conversation context remain distinct context classes;
- context is scoped by tenant, organizational scope, product/domain and narrower user/task scope;
- specialist products remain authoritative for domain semantics/canonical sources;
- Admonk may maintain a context registry describing ownership, scope, class, authority, provenance, freshness, sensitivity and availability;
- access/source restrictions apply before or at retrieval;
- private/draft/AI-derived context is not automatically promoted to approved company knowledge;
- retrieval indexes are supporting infrastructure, not sources of truth.

RQ-10 makes that model operational for Jarvis.

## 2. External research evidence

### Anthropic — context is finite and should be curated

Anthropic's current context-engineering guidance defines the goal as finding the **smallest high-signal set of tokens** that maximizes task performance. It recommends just-in-time retrieval rather than preloading everything, plus compaction and structured external memory for longer work.

Source:
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

### Anthropic — a durable session is not the model context window

Anthropic's Managed Agents architecture explicitly distinguishes the long-lived session/work object from a model's temporary context window. Context can be trimmed/reset/compacted while durable session state persists outside it.

Source:
- https://www.anthropic.com/engineering/managed-agents

### OpenAI — too much history reduces efficiency/reliability

OpenAI's current session-memory guidance states that long-running interactions can become distracted or fail when redundant history/tool results accumulate, and recommends trimming/compression to retain coherence while keeping context controlled.

Source:
- https://developers.openai.com/cookbook/examples/agents_sdk/session_memory

### OpenAI — repeated stable context can be cached

OpenAI's current prompt-caching guidance shows that stable repeated prompt prefixes can be reused to reduce latency and cached-input cost. It recommends placing stable instructions/reference material before dynamic context and measuring cache behavior.

Source:
- https://developers.openai.com/api/docs/guides/prompt-caching

### MCP — resource discovery/read results can expose cache semantics

The 2026 MCP specification added cache metadata (`ttlMs`, `cacheScope`) for resource/tool/prompt listings and resource reads, reinforcing the broader pattern that context/resource discovery should support explicit freshness/caching semantics rather than blind repeated fetching.

Source:
- https://blog.modelcontextprotocol.io/posts/2026-07-28/

## 3. Core conclusion

> **Context is not one database and not one prompt. Context is an authorized, task-specific view assembled from multiple authoritative sources at runtime.**

Jarvis should operate with four distinct concepts:

```text
1. CONTEXT SOURCES
   canonical domain/company/user/task stores

2. CONTEXT REGISTRY
   metadata + references describing what context exists

3. DURABLE TASK STATE
   structured state of the current work outside the model window

4. CONTEXT PACKET
   the minimal authorized/fresh subset supplied to one model/decision call
```

These must not be collapsed into one `memory` system.

## 4. Context Sources remain federated

Context stays with the owner that already has authority.

Examples:

```text
Company policy/strategy        → approved company knowledge source
Marketing KPIs/campaigns       → Marketing Hub
Support cases/SLA/outcomes     → Support product
Recruitment funnel             → Recruitment product
Provider raw/live data         → Admonk connector/provider contract
User preferences               → shared/user settings
Current screen state           → product surface context
Current Jarvis task state      → Jarvis task state
Saved artifact                → owning product/domain
Conversation transcript        → conversation/session store
External research              → source/evidence references
```

Jarvis does not copy all of these into a new master database merely to reason over them.

## 5. Context Registry

Admonk may maintain a shared registry/index of **what context exists and how to retrieve it**, without becoming owner of the content itself.

Candidate metadata:

```text
ContextDescriptor
  context_id / logical key
  class
  owner_product/domain
  tenant
  organizational_scope
  resource type/id
  authority level
  approval/status
  sensitivity
  provenance/source
  effective_from/to
  freshness / last_updated
  retrieval contract
  supported queries/capabilities
  cache policy / ttl hints
  version
```

The registry answers:
`Where could relevant context come from?`

It does **not** answer:
`What is the business truth?`

The owning source does.

## 6. Context classes

Use explicit semantic classes rather than a single `memory` label.

### X0 — Foundation / system context

Stable platform/product rules needed to operate correctly:
- Jarvis contract;
- action semantics;
- output/workspace contracts;
- safety/governance rules;
- capability schemas relevant to the route.

Mostly stable and highly cacheable.

### X1 — Identity / authorization context

Structured facts such as:
- tenant;
- membership;
- active organizational scope;
- entitled products/modules;
- effective permissions;
- locale/timezone;
- applicable policy.

These are software inputs, not prose memory.

### X2 — Approved company/domain knowledge

Examples:
- company strategy;
- approved policies;
- Marketing strategy;
- product definitions;
- approved process documentation;
- semantic KPI definitions.

These carry authority/provenance/effective-period metadata.

### X3 — Operational/domain data

Current or historical structured business data:
- campaign performance;
- tickets;
- applications;
- provider metrics;
- connector state;
- current resource values.

Prefer structured queries/aggregates over dumping rows into prompts.

### X4 — Current surface/resource context

From RQ-05/RQ-06:
- current product/page;
- active resource;
- selected records;
- filters/date range;
- visible metrics;
- current artifact/workspace.

This makes phrases such as `summarize this` precise.

### X5 — User/private context

Examples:
- user preferences;
- private delegated sources;
- saved personal working preferences;
- user-private files where authorized.

Must never become department/company truth implicitly.

Promotion/learning rules remain RQ-23.

### X6 — Durable task/session state

Structured progress outside the model window:
- task objective;
- current phase;
- decisions already made;
- selected resources;
- evidence references;
- unresolved questions;
- action/approval state;
- generated artifact references;
- handoff/compaction notes.

This survives context reset/compaction.

### X7 — Ephemeral retrieved evidence

Task-specific snippets/records/results retrieved just-in-time:
- evidence excerpts;
- live query results;
- external web sources;
- provider readbacks;
- tool results.

Do not retain every raw result in subsequent model context indefinitely.

## 7. The session is not the context window

This becomes a locked conceptual distinction if RQ-10 is accepted.

```text
JARVIS TASK / SESSION
long-lived, structured, resumable
contains references/state/artifacts/audit
          │
          ├──── model call 1 → Context Packet A
          ├──── decision call → Context Packet B
          ├──── model call 2 → Context Packet C
          └──── later resume → Context Packet D
```

Each packet can be smaller/different.

The task remains intact even if:
- model provider changes;
- context is compacted;
- voice disconnects;
- session resumes tomorrow;
- one model call is retried;
- a specialist/subagent is used.

## 8. Recommended Context Assembly pipeline

```text
USER / EVENT
     ↓
TASK CONTRACT
- intent
- tenant/user/scope
- active product/resource
- cognitive route
- surface route
- capability/action candidate
     ↓
CONTEXT PLAN
     │
     ├─ mandatory deterministic context
     ├─ candidate domain/company sources
     ├─ current surface/task references
     └─ evidence/freshness requirements
     ↓
AUTHORIZATION FILTER
remove inaccessible sources BEFORE retrieval/content exposure
     ↓
RELEVANCE / SOURCE SELECTION
C0 rules → C1D Decision Plane → retrieval/search only as needed
     ↓
JUST-IN-TIME RETRIEVAL
query owning domains/providers
     ↓
FRESHNESS + AUTHORITY CHECK
     ↓
COMPACT / NORMALIZE / RANK
     ↓
TOKEN / CONTEXT BUDGET
     ↓
MODEL-SPECIFIC CONTEXT PACKET
     ↓
C1G / C2 / C3 / verifier
```

## 9. Authorization before retrieval

Preferred rule:

> **Do not retrieve broadly and ask the model to ignore unauthorized content. Exclude unauthorized sources before content enters model/tool context wherever technically possible.**

Context selection uses:
- tenant boundary;
- organizational scope;
- product entitlement;
- acting user capability;
- context sensitivity/restrictions;
- provider/connector access;
- current task delegation.

Cross-domain/executive scope means more authorized sources become eligible—not that all company data is loaded automatically.

## 10. Retrieval should be source-aware, not one giant vector index

A single global vector store should not become the semantic authority.

Recommended pattern:

```text
Task asks: recruitment CPL problem
       ↓
Context planner identifies:
- Marketing campaign evidence
- Recruitment funnel outcomes
- approved KPI definition
       ↓
query each governed source
       ↓
normalize provenance
       ↓
assemble packet
```

Different sources may require:
- SQL/structured query;
- domain API;
- semantic search;
- keyword/BM25 search;
- vector retrieval;
- graph/resource lookup;
- connector live read;
- external web research.

Retrieval method is an implementation detail beneath the source contract.

## 11. Structured data should stay structured as long as possible

Do not turn everything into prose before the model sees it.

Preferred:

```text
{
  campaign_id: ...,
  spend: ...,
  leads: ...,
  cpl: ...,
  period: ...,
  source: ...,
  freshness: ...
}
```

rather than:

`Campaign A spent ... and had ...`

Benefits:
- fewer tokens;
- less transformation error;
- easier verification;
- reusable for dynamic workspace binding;
- easier Decision Plane use;
- easier deterministic calculations.

Generate prose only where human/model reasoning benefits from it.

## 12. Context budget

Every model/decision route should define a context budget/profile.

Conceptual categories:

```text
MUST INCLUDE
- task goal
- critical policy
- active resource identifiers
- relevant canonical definitions

OPTIONAL / RETRIEVE IF NEEDED
- prior evidence
- historical comparisons
- broader company context

DO NOT INCLUDE BY DEFAULT
- complete chat history
- complete company knowledge
- unrelated product data
- raw old tool results
- unused tool schemas
```

Different routes receive different budgets:
- C1D: extremely small structured state;
- C1G: bounded task/context;
- C2: richer evidence set;
- C3 specialist: only the specialist subset needed for delegated work.

## 13. Reflex Decision Plane role

The Decision Plane is well suited for cheap bounded context decisions such as:
- which domain sources are likely relevant;
- whether a retrieved item meets a relevance threshold;
- whether more evidence is needed;
- whether ambiguity warrants clarification/escalation.

It must not:
- grant context permission;
- override sensitivity restrictions;
- declare AI-derived notes authoritative;
- promote private information into shared knowledge.

## 14. Query planning before retrieval

For predictable task types, use predetermined context plans.

Example:

```text
Task signature:
marketing.recruitment_acquisition.diagnose_cpl

Known context plan:
1. KPI definition
2. campaign spend/leads
3. recruitment applications/hires
4. active period/comparison period
5. known source freshness
```

This connects directly to the RQ-06 reuse principle:

> **Do not ask AI to rediscover a context plan that software already knows.**

For novel tasks:
C0 → C1D → C2 planning only as needed.

## 15. Context caching

Cache three different things separately.

### A. Source/result cache

Cache governed query/retrieval results only within source freshness/security rules.

Metadata must include:
- tenant/scope;
- source/version;
- fetched time;
- TTL/freshness;
- permission/cache scope.

### B. Context-plan cache

Reuse known task → source/query/context-plan mappings when versions remain compatible.

### C. Model prompt/KV cache

Use provider prompt caching for stable model prefixes where it reduces cost/latency.

Examples of reusable prefix candidates:
- stable Jarvis/system instructions;
- stable tool/capability schemas;
- stable product definitions;
- stable approved reference material.

Dynamic user/task/live data stays later in the packet.

Provider prompt caches are performance optimizations only:
- not durable memory;
- not authoritative storage;
- not cross-tenant context;
- subject to provider retention/security policy.

## 16. Context compaction

For long tasks, compaction should compress model-facing history while durable task state remains intact.

Prefer preserving:
- objective;
- locked decisions;
- unresolved questions;
- current work state;
- evidence/resource references;
- material user corrections;
- action/approval state.

Prefer discarding from active context:
- old raw tool payloads once normalized/stored;
- repetitive assistant prose;
- duplicate evidence;
- superseded intermediate plans;
- UI micro-interactions.

Compaction output itself is not automatically business truth.

## 17. Conversation history

Conversation history serves continuity, but it is not the canonical source for business facts.

Jarvis should preferentially resolve statements such as:
`What is current Q3 spend?`

from the Marketing/source contract, not an old answer in chat.

History may provide:
- user intent;
- pronoun/reference continuity;
- prior decisions;
- constraints;
- conversation tone;
- task evolution.

Where history conflicts with current canonical data, current authorized domain truth wins and the conflict should be explainable.

## 18. User memory vs company knowledge

Do not merge them.

```text
User preference:
'I prefer concise weekly reports.'
        ≠
Company knowledge:
'Weekly reports must be submitted Friday.'
```

Likewise:

```text
AI note:
'Meta seems weak this quarter.'
        ≠
Approved company strategy:
'Meta is deprioritized for 2027.'
```

RQ-23 will define learning/promotion/forgetting governance.

RQ-10 only locks that these remain separate context classes with separate authority.

## 19. Conflict resolution

When candidate context disagrees, use an explicit precedence process rather than letting the model silently choose.

Recommended signals:
1. platform/legal/safety authority;
2. canonical approved domain/company authority;
3. scope specificity/applicability;
4. effective period/current version;
5. source freshness;
6. explicit task-selected source;
7. user/private preferences where they do not conflict with higher authority;
8. AI-derived/history notes as non-authoritative supporting context.

If equally authoritative sources remain inconsistent:
- surface conflict;
- cite/provide both references;
- do not synthesize a fake certainty.

## 20. Provenance contract

Every significant retrieved context item should retain enough metadata to answer:
- where did this come from?;
- which resource/version?;
- when was it current/retrieved?;
- what scope does it apply to?;
- is it approved/canonical or derived?;
- can the user inspect/drill down to it?

This supports:
- evidence UI;
- action preflight;
- audit;
- explanations;
- confidence/freshness warnings.

## 21. Context Packet

Each expensive model call should be generated from an explicit packet/manifest.

Conceptually:

```text
ContextPacket
  task_id
  tenant/scope/user
  packet_profile/version
  system/product rules refs
  active resource/surface state
  structured canonical context
  approved knowledge excerpts
  retrieved evidence[]
    source ref
    authority
    freshness
    sensitivity
  compact task history
  allowed capability/tool subset
  token/size budget
  cache metadata
```

Not all fields must be rendered as model tokens; some remain runtime metadata.

## 22. Tool/capability context should also be just-in-time

Do not send every possible tool/connector/action schema to every model call.

Use the task/domain/capability plan to expose only relevant capabilities.

This:
- reduces tokens;
- reduces tool-selection confusion;
- reduces accidental capability exposure;
- improves prompt-cache stability when designed carefully.

Where provider APIs support deferred tool loading/tool search, exploit that behind the runtime adapter rather than making it a product dependency.

## 23. Executive/company Jarvis

Executive/company Jarvis should not preload all departments.

Instead:

```text
Executive request
       ↓
authorized cross-domain candidate set
       ↓
task identifies relevant domains
       ↓
retrieve only those domain contracts/evidence
       ↓
cross-domain synthesis
```

Example:
`Why did hiring cost rise?`

may require:
- Marketing acquisition spend;
- Recruitment funnel/hire outcomes;
- perhaps Finance-approved cost definition.

It does not require:
- Support ticket history;
- every employee profile;
- unrelated Marketing content assets.

Executive scope expands **eligibility**, not automatic prompt size.

## 24. Current dashboard / persistent Jarvis panel

RQ-05's persistent contextual panel should use X4 structured surface context.

Example:

```text
CurrentSurfaceContext
  product: Marketing
  resource: Recruitment Acquisition
  selected_channels: [Meta, LinkedIn]
  date_range: Q3
  visible_metrics: [Spend, CPL, Hires]
```

When user asks:
`summarize this`

Jarvis first resolves the structured resource/data refs, then requests current governed values if necessary.

Do not treat screenshots as the primary context transport.

## 25. Dynamic UI / source loading

Context assembly and RQ-06 UI reuse reinforce each other.

For known workspace/task types:
- preload/prepare required source bindings;
- retrieve data concurrently where permitted;
- render deterministic workspace skeleton immediately;
- populate results as context/data arrives;
- invoke C2 only for the reasoning that needs it.

Therefore high-speed Jarvis can often perform:

```text
task signature
  ↓
known context plan + known workspace
  ↓
parallel governed reads
  ↓
workspace populates
  ↓
AI reasoning only over selected evidence
```

rather than:

`LLM first decides everything, then data starts loading.`

## 26. Data minimization

Context assembly should enforce data minimization:
- retrieve only fields/records needed for the task;
- prefer aggregates when row-level detail is unnecessary;
- avoid cross-tenant caches;
- avoid sending sensitive raw identifiers/content where derived safe fields are sufficient;
- obey retention/sensitivity/provider-region rules.

This protects privacy and also reduces token/cost load.

## 27. Context assembly observability

Every meaningful model/task trace should be able to answer:
- which context sources were considered?;
- which were excluded by authorization?;
- which were retrieved?;
- why were they selected?;
- freshness/authority status;
- tokens/bytes contributed by source/class;
- cache hits;
- compaction events;
- what evidence supported the final answer/action?

This later feeds RQ-16, RQ-17 and RQ-18.

## 28. Context evaluation

Test context quality independently from model quality.

Metrics:
- answer/task success;
- context precision: included context that was actually useful;
- context recall: required evidence not omitted;
- unauthorized-context exposure: target zero;
- stale-context error rate;
- source/provenance correctness;
- context tokens per successful task;
- retrieved bytes/records per successful task;
- cache hit rate;
- compaction information-loss rate;
- unnecessary-domain retrieval rate;
- user correction caused by missing/wrong context.

A stronger model must not be used to hide a weak context pipeline.

## 29. Runtime boundary intentionally deferred

RQ-10 defines the **contract and semantics**, not whether the Context Assembler becomes:
- a shared runtime service;
- a shared package;
- product-local orchestration;
- a hybrid.

That belongs to M2-20 / RQ-25 after actual consumer/latency/security evidence exists.

## 30. Documentation debt / Corporate Brain wording

Older `AI-SUITE.md` wording calls the Corporate AI Assistant the `company brain`.

RQ-10 further confirms that this must eventually be reconciled with the locked Jarvis direction:
- there is no giant authoritative brain store;
- executive intelligence is the same Jarvis experience with broader authorized context/capability eligibility;
- specialist products and approved company sources remain authoritative.

Do not mass-rewrite that documentation during RQ-10; reconcile it during the planned final Jarvis concept/project audit.

## 31. Recommended lock

> **RQ-10 — Federated Just-in-Time Context Assembly**
>
> Context is not one database and not one prompt. Jarvis assembles an authorized, task-specific **Context Packet** just in time from federated authoritative sources.
>
> Keep four concepts distinct: **Context Sources**, **Context Registry**, **Durable Task State**, and the ephemeral **Context Packet** supplied to each model/decision call.
>
> The Jarvis task/session is not the model context window. Durable task state survives context trimming, compaction, model/provider changes and later resumption.
>
> Authorization and sensitivity filtering happen before content is exposed to model/tool context wherever possible.
>
> Context retrieval is source-aware and may use structured queries, domain APIs, search, vector/BM25 retrieval, provider reads or external research depending on the authoritative source. Retrieval indexes never become sources of truth.
>
> Use deterministic/predetermined context plans for known task classes; use the Reflex Decision Plane for bounded relevance/source selection; escalate to generative/deep planning only when necessary.
>
> Keep structured data structured as long as possible and generate prose only when reasoning/presentation requires it.
>
> Each cognitive route has a context budget. Do not send complete chat history, complete company knowledge or every tool schema by default.
>
> Cache source results, context plans and provider prompt prefixes separately, each within its own authorization/freshness/retention rules. Provider prompt caches are performance optimizations, not memory.
>
> Conversation/user history supplies continuity and preferences but never overrides current canonical business data or approved knowledge.
>
> Company/domain knowledge, private/user context, operational data, durable task state and ephemeral evidence remain separate authority classes.
>
> Cross-company/executive Jarvis expands the set of sources the user is allowed to query; it does not automatically preload all company data.
>
> **The goal is the smallest authorized, fresh, high-signal context that can successfully complete the task.**

## 32. Recommendation

**LOCK RQ-10 as written.**

This preserves domain truth and security while directly supporting Jarvis's high-speed, low-token, high-quality product objective.
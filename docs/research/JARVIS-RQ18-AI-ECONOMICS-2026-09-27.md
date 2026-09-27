# Jarvis Research Question 18 — Sustainable AI Economics

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** How do we maximize successful user outcomes per unit of cost without cheapening Jarvis?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/runtime/economics architecture research only.

## 1. Decision problem

Jarvis can consume money through many different paths:
- model input/output/reasoning tokens;
- realtime voice/audio;
- web/search/grounding tools;
- provider APIs;
- connector calls;
- vector/search infrastructure;
- durable-task compute;
- retries/failures;
- multi-agent duplication;
- parallel/speculative work;
- storage/caching;
- local/private model infrastructure;
- observability/evaluation.

Optimizing only `cost per token` would create the wrong system.

A cheap route that fails and retries may cost more than an expensive route that succeeds once. Likewise, a high-quality but unnecessarily deep model call may be wasteful when deterministic software or C1D could solve the task.

M2-14 already locks the core economic architecture:
- raw provider usage ledger;
- separate customer-facing Admonk AI Credit ledger;
- versioned rate card;
- task/user/tenant/product budgets;
- retries/failures/discarded work count;
- quality floor may not be sacrificed simply to reduce cost;
- primary efficiency metric is **cost per successful outcome**.

RQ-18 makes that operational for Jarvis.

## 2. External research evidence

### FinOps Foundation — move from token cost to outcome unit economics

The FinOps Foundation's current Unit Economics guidance specifically notes that GenAI economics often starts with cost-per-token and should mature toward outcome-oriented units such as cost per assist, agent action or case deflected. It frames unit economics as a mechanism for making explicit tradeoffs across cost, speed, quality and risk.

Source:
- https://www.finops.org/framework/capabilities/unit-economics/

### OpenAI — model tiers, caching and service tiers materially change cost

OpenAI's current API pricing shows large differences across model tiers and much lower cached-input pricing. Its prompt-caching documentation explains reuse of stable prompt prefixes, while Flex processing explicitly offers lower cost in exchange for slower response/occasional unavailability and is aimed at lower-priority/asynchronous workloads.

Sources:
- https://developers.openai.com/api/docs/pricing
- https://developers.openai.com/api/docs/guides/prompt-caching
- https://developers.openai.com/api/docs/guides/flex-processing

### Google Gemini — batch/flex/cache pricing independently reinforces the same economic levers

Gemini's current pricing separately prices Standard, Batch, Flex, Priority and context caching, demonstrating that execution tier and context reuse are first-class economic controls rather than only model selection.

Source:
- https://ai.google.dev/gemini-api/docs/pricing

### Anthropic — effort and caching can reduce unnecessary reasoning/input cost

Anthropic's current prompting guidance recommends lowering `effort` when tasks are completing with more reasoning than necessary and supports prompt caching across current model families.

Source:
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-templates-and-variables

## 3. Core conclusion

> **Jarvis economics optimize cost per successful quality outcome under latency, safety, privacy and authority constraints.**

Cost optimization happens in this order:

```text
1. Can software avoid the AI/tool call entirely?
2. Can a known plan/result structure be reused?
3. Can context/output/tool surface be reduced safely?
4. What is the minimum sufficient intelligence route that meets quality?
5. Can caching/batch/flex/local execution reduce cost without breaking latency/quality?
6. Is parallelism/agentic depth economically justified by outcome or time saved?
7. Which qualified provider/model deployment is best on successful-outcome economics?
```

Do not start with:
`Which model has the cheapest token?`

## 4. Canonical economic layers

Keep three economic views distinct.

### A. Raw Cost Ledger

Operational financial reality.

Track where applicable:
- provider/model deployment;
- input/output/reasoning/cached/cache-write tokens;
- voice/audio/video units;
- built-in search/grounding/tool charges;
- connector/API charges;
- compute/runtime/storage;
- evaluation/shadow calls;
- retry/discarded/speculative calls;
- region/data-residency premium;
- third-party infrastructure;
- estimated vs reconciled billed cost.

Provider billing remains financial source of truth and operational estimates are reconciled to it.

### B. Admonk AI Credit Ledger

Commercial/customer abstraction already locked by M2-14.

Credits decouple customer packaging from:
- token units;
- provider/model changes;
- cache discounts;
- provider price changes;
- infrastructure mix.

### C. Unit Economics / Business Outcome View

Transforms infrastructure consumption into product economics.

Examples:
- cost per successful Jarvis task;
- cost per successful action;
- cost per completed investigation;
- cost per generated approved artifact;
- cost per active user/month;
- cost per product/tenant/month;
- cost per business outcome where attributable.

Do not merge these ledgers into one number.

## 5. Primary economic metric

Preferred:

```text
Cost per Successful Quality Outcome
=
total attributable variable execution cost
/
number of outcomes that pass the relevant RQ-16 quality contract
```

Failed/retried/discarded/speculative work belongs in the numerator.

Example:

```text
Route A
$0.02/run × 100 runs = $2.00
70 successful outcomes
= $0.0286 per success

Route B
$0.035/run × 100 runs = $3.50
96 successful outcomes
= $0.0365 per success
```

Route A may still be economically attractive if its quality floor permits 70%, but if the product requires ≥95% success, it is not an eligible route at all.

Quality floor is a constraint, not a price trade.

## 6. Architecture-first savings

Rank cost levers by avoiding unnecessary work before choosing cheaper intelligence.

### E1 — Deterministic software substitution

Use C0 for:
- arithmetic;
- validation;
- permissions;
- known transformations;
- state transitions;
- fixed routing;
- formatting;
- exact data queries.

An avoided model call has zero model-token cost and often lower latency.

### E2 — Reflex Decision Plane

Use C1D for bounded semantic decisions where a generative/deep call would be overkill.

### E3 — Known task/context/workspace reuse

Reuse:
- task signatures;
- context plans;
- workspace plans;
- capability/source mappings;
- compatible prior structures.

This avoids repeated planner calls.

### E4 — Context minimization

RQ-10's smallest-authorized-high-signal Context Packet reduces input processing and often improves quality simultaneously.

### E5 — Output discipline

Do not generate lengthy prose where:
- a number;
- structured state;
- chart/table;
- short explanation;
- typed result

is more useful.

Output tokens are frequently more expensive than input tokens across provider pricing models, making concise structured outputs an economic as well as UX advantage.

## 7. Route economics

Each RouteProfile should carry an economic profile in addition to quality/latency requirements.

Candidate:

```text
EconomicProfile
  expected raw-cost range
  soft operating target
  hard per-run ceiling
  expected token/tool envelope
  eligible processing tiers
  cache policy
  batch/flex eligibility
  parallelism policy
  agent/multi-agent eligibility
  estimate confidence class
  user-credit estimate policy
```

Do not set one universal Jarvis run budget.

## 8. Budget hierarchy

Reuse M2-14 layered controls:

```text
1. per-step / per-run safety ceiling
2. task operating budget
3. user/product/tenant credit envelope
4. provider/emergency hard ceiling
```

Potential additional allocation views:
- agent/worker sub-budget;
- background/durable task budget;
- evaluation/shadow budget;
- connector/tool-specific budget.

Child tasks/agents receive subsets of the parent budget; spawning workers never creates new money.

## 9. Economic admission before expensive work

Before escalating:

### Deep reasoning
Ask whether expected quality gain over C1 meets the route's need.

### Agent loop
Ask whether adaptive autonomy is required under RQ-12.

### Multi-agent
Ask whether parallel/context-specialist gains justify significant duplicated model/context/tool cost.

### Parallel/speculative execution
Ask whether wall-clock reduction has sufficient user/business value to justify extra attempts.

Do not run multiple expensive routes merely to choose the nicest output unless the task/risk economically justifies it.

## 10. Multi-agent economics

RQ-12 already makes C3 exceptional.

Measure:
- total worker input/output tokens;
- duplicated context tokens;
- orchestration/synthesis tokens;
- tool/search charges;
- abandoned worker cost;
- parallel speedup;
- incremental quality gain;
- cost per successful outcome vs one capable agent.

A multi-agent route passes only if the outcome/latency benefit justifies the marginal cost for its task class.

## 11. Parallelism economics

Parallelism reduces elapsed latency but can increase cost.

Classify parallel work:

### Necessary independent retrieval

Example:
Marketing + Recruitment reads needed for the answer.

Often good: both results are required.

### Speculative race

Example:
run two models and keep first/best.

Expensive: loser still costs money.

Use only when:
- latency/value/risk justifies it;
- cancellation can materially reduce loser cost;
- route policy permits it;
- RQ-16/17 evidence proves value.

## 12. Caching economics

Keep separate caches from RQ-10:

### Context-plan/workspace-plan cache

Primary value:
- avoids planner/model calls entirely.

### Source/data cache

Primary value:
- avoids provider/connector reads;
- respects freshness/authorization.

### Provider prompt/KV cache

Primary value:
- reduces repeated model input processing cost/latency;
- stable prefixes first, dynamic task context later.

Provider pricing currently gives strong economic incentives for cached input, but exact discounts are vendor/model dependent and therefore belong in ModelDeployment pricing metadata rather than product logic.

Measure:
- cache creation/write cost;
- cache-read savings;
- storage cost where applicable;
- hit rate;
- invalidation rate;
- amortized savings per successful task.

A low-hit expensive cache can be net-negative.

## 13. Batch / flex / asynchronous processing

Some tasks do not deserve premium interactive capacity.

Eligible candidates:
- offline evaluations;
- nightly enrichment;
- historical backfill;
- non-urgent artifact processing;
- large background classifications;
- periodic batch analysis;
- shadow model comparisons.

Providers currently expose lower-cost Batch/Flex-style tiers in exchange for slower response and/or weaker availability guarantees.

Rule:
> **Use lower-cost execution tiers only when the user/task latency contract permits them.**

Never send an interactive R1 request to a slow batch tier solely to save money.

## 14. Priority / premium capacity

Conversely, premium execution tiers may be economically justified when:
- R1/voice latency has product value;
- a consequential user is blocked;
- deadline/task value exceeds incremental cost;
- reliability/throughput during peak periods matters.

Use explicit route policy rather than globally selecting premium capacity.

## 15. Reasoning/effort economics

Do not run maximum reasoning by default.

RQ-03 minimum-sufficient-intelligence principle applies inside a model family too.

Where providers expose effort/reasoning controls:
- choose route-qualified defaults;
- lower effort when evals show equivalent quality;
- raise effort only for tasks that gain from it;
- include hidden/reasoning token cost where providers bill it.

Anthropic currently explicitly recommends lowering effort when tasks complete with more reasoning than necessary; equivalent model/provider mechanisms should be treated through RQ-13 adapters.

## 16. Context-size economics

Large context has multiple costs:
- direct input price;
- latency;
- reduced cache efficiency;
- retrieval/storage overhead;
- possible long-context price tiers;
- distraction/quality degradation.

Therefore the RQ-10 Context Packet has an economic budget as well as a token/quality budget.

Track:
- input tokens by context class/source;
- context selected but unused;
- context cache hit;
- long-context threshold crossing;
- quality gained/lost by context expansion.

## 17. Tool / search / grounding economics

Tools are not free simply because they are not model tokens.

Track:
- external search requests;
- provider grounding calls;
- Maps/search charges;
- SaaS/API calls;
- browser/computer-use runtime;
- file processing;
- storage/vector/query infrastructure.

Current Gemini pricing, for example, separately charges Search/Maps grounding beyond included quotas, reinforcing the need to treat tool use as part of route cost rather than only token cost.

## 18. Retry/failure economics

RQ-15 failures create economic waste when recovery is poor.

Track:
- failed model/tool calls;
- retries;
- invalid schema repairs;
- provider fallback;
- duplicate action reconciliation;
- abandoned agent loops;
- wasted speculative work.

Useful metrics:
- retry cost as % of total;
- failure waste per successful outcome;
- cost of degraded/fallback paths;
- top failure causes by spend.

Improving reliability may reduce cost more than switching to a cheaper model.

## 19. Durable-task economics

Every R3 durable task needs:
- task budget;
- active compute cost;
- wait cost where infrastructure accrues;
- checkpoint/artifact/storage cost;
- subtask/agent budgets;
- notification/tool charges;
- stop-on-budget behavior.

Paused/waiting tasks must not continue consuming expensive model/worker resources merely to remain `alive`.

## 20. Pre-run estimates

M2-14 requires expected credit consumption where reasonable.

Use estimate classes:

```text
FIXED / NARROW
e.g. bounded classification/workflow
→ show tight estimate

RANGE
e.g. deep analysis
→ show expected credit range

VARIABLE / OPEN-ENDED
e.g. deep research agent
→ show starting/max budget and notify before exceeding policy
```

Do not present false precision when tool/model loops are inherently variable.

## 21. Customer credits vs raw cost

Do not map:
`1 AI Credit = 1,000 tokens`

or another provider-specific physical unit.

The versioned rate card may account for:
- raw variable cost;
- product value;
- processing class;
- expected operational overhead;
- commercial margin;
- risk/variance buffer;
- strategic packaging.

Exact commercial pricing/markup formula is **not locked by RQ-18**.

Important:
- rate-card changes are versioned;
- task credit debit remains auditable;
- historical tasks retain the rate-card version used.

## 22. Failed-run customer charging

RQ-18 does **not** lock one universal customer-refund policy.

Reason:
- failure causes differ;
- some failures still deliver useful partial value;
- some provider costs are incurred regardless;
- commercial plans may package risk differently.

Required architecture:
- raw failed/retry cost is always recorded;
- customer credit adjustment/refund can be represented;
- product/rate-card policy determines customer-facing treatment.

## 23. Cost allocation

Attribution dimensions where meaningful:
- tenant;
- product/SKU;
- user/delegator;
- RouteProfile;
- capability/task type;
- model/provider;
- connector/tool;
- agent/workflow;
- success/failure/degraded status.

Shared/overhead infrastructure may require an allocation model rather than pretending perfect direct attribution.

Do not add user/tenant identifiers as high-cardinality metrics labels; use governed ledger/trace records.

## 24. Unit economics maturity ladder

Move progressively:

### Stage 1 — Resource economics
- token/tool/provider cost;
- cache discounts;
- runtime cost.

### Stage 2 — Task economics
- cost per task;
- cost per successful task;
- cost by RouteProfile/capability.

### Stage 3 — Product economics
- cost per active user;
- cost per product/tenant;
- gross margin contribution;
- included-credit consumption.

### Stage 4 — Business outcome economics
Where attribution is defensible:
- cost per resolved case;
- cost per qualified lead analysis;
- cost per completed approved campaign artifact;
- cost per decision/action completed;
- measurable labor/time saved.

Do not fabricate financial value where attribution is weak.

## 25. Quality–latency–cost frontier

RQ-16 + RQ-17 + RQ-18 form one decision surface.

Every route/model candidate can be represented as:

```text
Quality / success
Latency distribution
Cost per successful outcome
```

Only candidates meeting hard authority/security/privacy constraints and quality floor are eligible.

Among eligible candidates, choose according to route priorities.

Example:

```text
Candidate A
quality 97
p95 5s
$0.08/success

Candidate B
quality 96
p95 2s
$0.05/success

Candidate C
quality 91
p95 1s
$0.01/success
```

If route quality floor is 95, C is excluded regardless of price.

B may dominate A if quality difference is immaterial and no other requirement favors A.

## 26. Economic route optimizer

Do not build a free-form model that selects providers based on price.

Preferred selection pipeline:

```text
hard security/capability constraints
        ↓
RQ-16 quality-qualified candidate set
        ↓
RQ-17 latency requirements
        ↓
economic comparison
        ↓
availability/health
        ↓
selected deployment/tier
```

Selection may use deterministic rules, Decision Plane or later learned routing within the approved candidate set.

Cost can choose among qualified candidates; it cannot qualify an unfit candidate.

## 27. Local/private inference economics

Local execution is not automatically `free`.

Total cost includes:
- hardware purchase/depreciation or cloud GPU;
- idle capacity;
- energy;
- runtime/platform ops;
- model serving engineering;
- monitoring/security;
- upgrades;
- redundancy;
- support;
- lower utilization;
- quality/latency differences.

Compare **total cost per successful outcome** against managed APIs.

OpenJarvis may help Lab measurement, but local is promoted only with evidence.

## 28. Evaluation economics

RQ-16 itself consumes money.

Track:
- regression suite cost;
- capability suite cost;
- repeated trial cost;
- human review cost where estimated;
- shadow/canary cost;
- provider/model comparison cost.

Optimization:
- run only affected suites plus critical gates;
- use deterministic graders first;
- reserve expensive judge/human evaluation for cases needing them;
- use batch/flex tiers for offline evals where latency permits.

Do not save evaluation cost by reducing confidence in consequential releases.

## 29. Design/UX economics

The immersive Jarvis UI adds frontend/asset/compute cost too.

Track if material:
- CDN/asset delivery;
- GPU-heavy rendering impacts/device battery;
- realtime state/event traffic;
- voice media cost;
- 3D asset production/maintenance.

Design performance requirements from RQ-17 remain primary; do not introduce expensive visual infrastructure unless the interaction value is demonstrated.

## 30. Economic anomaly detection

Monitor for:
- sudden cost/run increase after model or prompt change;
- context token growth;
- cache hit collapse;
- retry spikes;
- agent loop explosion;
- tool/search explosion;
- tenant/product abnormal usage;
- background tasks consuming after usefulness ended;
- provider pricing/rate-card drift.

Budget alerts should trigger before provider hard ceilings where practical.

## 31. Pricing change / provider migration

Provider pricing is mutable.

Therefore:
- ModelDeployment stores pricing metadata/version/effective dates;
- estimates use current effective pricing;
- raw ledger reconciles invoices;
- rate-card updates are versioned;
- model/provider changes run RQ-16/17/18 comparison;
- product code never hard-codes current token prices.

## 32. Jarvis Lab economics

For each Lab experiment record:

```text
task/eval case
route
quality/pass
latency distribution
input/output/reasoning/cached tokens
tool calls/cost
agent workers
cache hits
retries
raw cost
estimated credits
cost per successful outcome
```

Lab comparisons should answer questions like:
- Does Jev replace enough generative classification calls to matter?
- How much does predetermined workspace/context reuse save?
- Is C2 improvement worth its premium over C1?
- Does multi-agent improve quality enough for the extra cost?
- Does local inference beat API economics at expected utilization?
- Does parallelism buy enough latency to justify duplicated spend?

## 33. Recommended lock

> **RQ-18 — Outcome-First AI Economics**
>
> Jarvis optimizes **cost per successful quality outcome under latency, security, privacy, authority and reliability constraints**. Cost per token/call is an implementation metric, not the product objective.
>
> Preserve M2-14's three economic views: **raw usage/cost ledger, Admonk AI Credit ledger, and outcome/unit-economics analysis**. Provider billing remains financial truth; customer credits remain a versioned commercial abstraction.
>
> Optimize architecture before model price: avoid unnecessary AI calls with deterministic software, Reflex decisions, known-plan reuse, context minimization, structured/concise outputs and caching.
>
> Use the **minimum sufficient intelligence** that meets the RQ-16 quality floor. Cost may choose among qualified routes/models but may never qualify a route that fails quality, security, privacy or authority requirements.
>
> Every RouteProfile carries a bounded economic policy including operating target, hard ceiling, eligible processing tiers, caching, parallelism and agent/multi-agent rules.
>
> Deep reasoning, agents, multi-agent execution and speculative parallelism require measurable incremental outcome or latency value relative to their marginal cost.
>
> Cache economics are measured by amortized savings after write/storage/invalidation cost; provider discounts remain deployment metadata rather than product assumptions.
>
> Use Batch/Flex/lower-priority processing for asynchronous/offline work only when the task latency contract permits it; use premium capacity only when its latency/reliability value justifies the cost.
>
> Retries, failures, discarded/shadow/speculative calls and recovery work count toward real economics. Reliability improvements are economic optimizations.
>
> Durable tasks and child workers receive explicit budgets; waiting tasks do not burn expensive compute merely to remain alive.
>
> Pre-run customer estimates use fixed values, ranges or maximum budgets according to task predictability rather than false precision.
>
> Customer AI Credits are not literal provider tokens. Rate cards are versioned and commercial pricing/refund policy remains configurable without changing raw usage accounting.
>
> Local/private inference is evaluated using total cost of ownership per successful outcome, including hardware, energy, utilization, operations and quality—not treated as free compute.
>
> RQ-16 quality, RQ-17 latency and RQ-18 cost form a shared **quality–latency–cost frontier**. Only quality-qualified candidates enter economic optimization.
>
> **Spend intelligence where it creates measurable user value; remove cost by eliminating unnecessary work before cheapening the intelligence that remains.**

## 34. Recommendation

**LOCK RQ-18 as written.**

This preserves premium product quality while giving Jarvis a disciplined path to sustainable margins and scalable customer usage.
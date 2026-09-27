# Jarvis Research Question 11 — Department vs Executive / Company Operating Lens

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** What is the real difference between Department Jarvis and Executive/Company Jarvis?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/context/orchestration research only.

## 1. Decision problem

Locked Jarvis direction already says:
- Department Jarvis and Executive/Company Jarvis are the same core Jarvis experience;
- executive/company use combines authorized department capabilities with company-level strategy and cross-department context;
- executive/company intelligence must not become a second unrelated brain.

RQ-11 must define what **actually changes at runtime**.

The danger is two opposite mistakes:

1. creating separate assistant personalities/models for every role/department, causing an agent/persona zoo;
2. treating Executive Jarvis as merely `same prompt + more data`, which ignores cross-domain synthesis, strategy, dependencies and conflict handling.

## 2. External research evidence

### SAP — role/process context changes orchestration, not just answers

SAP's current Joule model uses role- and business-process context to coordinate specialized agents across functions. Joule Assistants are described as translating user intent into concrete actions by selecting/coordining the right agents, data, tools and applications based on deep role/business context.

Sources:
- https://www.sap.com/joule-agents
- https://news.sap.com/2026/07/sap-business-ai-release-highlights-q2-2026/

SAP's current direction also demonstrates that one unified Joule experience can adapt to role/business context and coordinate cross-function work rather than requiring unrelated assistant products.

### Google Gemini Enterprise — permissions-aware enterprise context

Google describes Gemini Enterprise as providing a single interface over organization data with permissions-aware access, while custom agents operate contextually. This supports the rule that broader organizational use expands eligible sources through authorization rather than bypassing source permissions.

Source:
- https://docs.cloud.google.com/gemini/enterprise/docs

### Microsoft — role-specific command-center behavior

Microsoft's current role-based agents for Sales and Finance emphasize role-grounded insights, contextual support and command-center experiences rather than one generic answer style for every role.

Source:
- https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2026/03/18/2026-release-wave-1-plans-for-dynamics-365-microsoft-power-platform-and-copilot-studio-offerings/

Market implication:
> role changes **default context, objective framing, workflow/capability selection and presentation**, but enterprise authorization still remains a separate control plane.

## 3. Core conclusion

> **Department Jarvis and Executive/Company Jarvis are not separate assistants. They are the same Jarvis operating under different effective Operating Lenses.**

An **Operating Lens** changes:
- default organizational/domain focus;
- eligible context candidate set (within actual authorization);
- applicable strategy/objective references;
- aggregation/detail level;
- default planning horizon;
- cross-domain orchestration behavior;
- workspace emphasis/presentation;
- what dependencies/conflicts Jarvis looks for.

An Operating Lens does **not**:
- grant permission;
- create product entitlement;
- expose unauthorized context;
- change connector/provider scopes;
- bypass approval;
- make a model more authoritative;
- create a separate business brain.

## 4. Operating Lens contract

Candidate runtime structure:

```text
OperatingLens
  lens_type: company | organizational_scope | product/domain | team | task
  tenant_id
  focus_scope_refs[]
  default_domain_refs[]
  applicable_strategy_refs[]
  objective/KPI refs[]
  decision_horizon
  aggregation_level
  cross_domain_mode
  preferred_surface/density hints
  version/effective_period
```

Important:
- this is a **context/orchestration profile**, not a permission object;
- `focus_scope_refs` must be intersected with M2 authorization;
- no hidden objective weights should be invented; prioritization weights exist only when explicit approved strategy/policy provides them.

## 5. Department / domain lens

Typical defaults:
- one organizational/domain scope is primary;
- domain semantics/KPIs/processes are high priority;
- operational detail is usually more useful;
- domain-specific workspace components are preferred;
- local strategy/objectives are loaded where relevant;
- cross-domain retrieval occurs only when the task actually requires it and the user is authorized.

Example — Marketing user:

```text
Default focus
Marketing
  ├ strategy
  ├ campaigns
  ├ website
  ├ acquisition
  └ marketing evidence
```

Question:
`Why did recruitment CPL rise?`

Marketing lens may identify that recruitment outcomes are required and, if authorized, retrieve the Recruitment domain's governed funnel data.

Department lens therefore means **default focus**, not an absolute data silo when legitimate authorized cross-domain analysis is required.

## 6. Company / executive lens

Typical defaults:
- company strategy/objectives are applicable;
- multiple authorized domains are eligible candidates;
- higher-level aggregation is preferred before drill-down;
- cross-domain dependencies are actively considered;
- organization-level tradeoffs/conflicts are surfaced;
- strategic horizon may be broader;
- synthesis focuses on company outcomes rather than optimizing one department in isolation.

Example:

`Why did cost per hire rise and what should we change?`

Potential context plan:

```text
Company hiring objectives
        │
        ├ Marketing
        │   acquisition spend / CPL / source mix
        │
        ├ Recruitment
        │   applications / funnel / hires / time-to-decision
        │
        └ Finance/approved cost semantics if relevant
```

The executive lens does not preload all company data; RQ-10 context minimization remains authoritative.

## 7. Executive title must not equal access

Do not infer authority from a UI label such as `CEO`, `Executive`, `Department Head` or a natural-language title alone.

Effective access still resolves through:
- tenant membership;
- product/SKU entitlement;
- organizational scope;
- role/capability permissions;
- context sensitivity restrictions;
- connector/provider authority;
- action approval.

An `Executive Lens` may be selected/configured only for users whose authorized scope supports it.

Likewise, a broadly authorized non-executive analyst may run a cross-domain task without being assigned an `executive persona`.

## 8. Lens can be task-scoped, not permanently tied to a person

Do not hard-code one user to one lens.

Example:

```text
Marketing Head
  default lens: Marketing

asks:
'Compare Marketing acquisition with Recruitment conversion.'

task lens:
cross-domain Marketing + Recruitment
```

Or:

```text
CEO
  default lens: Company

opens Marketing campaign resource

task/surface lens:
Marketing-focused within company-authorized context
```

This prevents role labels from becoming rigid personas.

## 9. Recommended lens resolution order

```text
1. hard authorization / entitlement
2. explicit task request
3. active product/resource/surface
4. explicitly selected focus/lens
5. user's default organizational/product lens
6. company/domain strategy applicability
```

Result:

```text
Effective Operating Lens
        ↓
RQ-10 Context Plan
        ↓
RQ-03 Cognitive Route
        ↓
RQ-05 Surface Route
```

## 10. Strategy is a context lens, not hidden model behavior

Company and department strategy should be represented as approved, inspectable context/resources, not buried only inside a system prompt.

Examples:
- company strategic objectives;
- department objectives;
- approved targets/KPIs;
- constraints;
- decision principles;
- effective periods;
- owner/approval/provenance.

When Jarvis recommends something `because it aligns with strategy`, the user should be able to inspect the strategy/objective reference.

Strategy may change ranking/analysis where explicitly applicable.

It must not silently override:
- legal/safety policy;
- explicit permission restrictions;
- provider constraints;
- authoritative current facts.

## 11. Strategic lens vs objective optimization

Jarvis must not invent a numerical optimization objective merely because several company goals exist.

Example:

```text
Goal A: reduce hiring cost
Goal B: increase hiring speed
Goal C: preserve quality
```

If approved strategy defines explicit priority/constraints, Jarvis can apply them.

If not, Jarvis should surface the tradeoff:
`Option A reduces cost but is likely to extend time-to-hire; Option B preserves speed at higher acquisition cost.`

Do not fabricate a hidden weighted score to declare one company objective superior.

## 12. Cross-domain orchestration

Executive/company work often requires more than broader retrieval.

Recommended process:

```text
Company-level task
      ↓
identify relevant authorized domains
      ↓
decompose into domain questions/capabilities
      ↓
run domain queries/analysis in parallel where useful
      ↓
preserve each domain's semantics/provenance
      ↓
cross-domain synthesis
      ↓
surface dependencies/conflicts/tradeoffs
```

Example:
`Improve interpreter hiring economics.`

Could decompose into:
- Marketing: acquisition cost/source efficiency;
- Recruitment: funnel conversion, rejection, time-to-decision;
- Training/Onboarding where authorized: post-hire conversion/dropoff;
- Finance if relevant: approved cost definition/budget.

Jarvis coordinates; each specialist product remains semantic authority.

## 13. Cross-domain conflict taxonomy

Jarvis should distinguish at least three kinds of conflict.

### CDF1 — Fact/source conflict

Two authoritative sources disagree about a supposedly identical fact.

Behavior:
- do not average or silently choose;
- identify source/freshness/definition difference;
- surface unresolved conflict.

### CDF2 — Semantic/metric conflict

Domains use similar names with different definitions.

Example:
`lead` in Marketing vs `candidate/application` in Recruitment.

Behavior:
- preserve definitions;
- translate only through an explicit governed mapping;
- never merge labels because names look similar.

### CDF3 — Objective/tradeoff conflict

Departments optimize different legitimate outcomes.

Example:
- Marketing wants lower CPL;
- Recruitment wants higher candidate quality;
- Operations wants sufficient staffing speed.

Behavior:
- show tradeoff/dependencies;
- apply explicit company strategy where it truly resolves priority;
- otherwise keep decision visible to the human rather than inventing a priority.

## 14. Cross-domain actions

Executive synthesis does not create a super-action permission.

A company-level plan may decompose into separate prepared actions owned by domains.

Example:

```text
Company goal: reduce cost per hire

Plan
├ Marketing action
│  adjust acquisition allocation
│  → Marketing capability/approval
│
├ Recruitment action
│  change screening workflow
│  → Recruitment capability/approval
│
└ Finance action if needed
   approve budget shift
   → Finance capability/approval
```

Each action continues to use RQ-07/M2-11 authority.

Executive Jarvis may coordinate the plan but cannot bypass domain ownership/approval.

## 15. Cross-domain delegation

RQ-11 does not lock the final agent topology; RQ-12 will.

But it locks the semantic rule:

> cross-domain orchestration may delegate domain-specific analysis/work, but delegation never changes data authority or expands permissions.

Any domain worker receives:
- only needed context;
- only allowed capabilities;
- explicit task objective;
- provenance requirements;
- reduced/delegated authority.

## 16. Presentation differences

Same Jarvis identity, different useful defaults.

### Department lens

Prefer:
- operational detail;
- domain KPIs;
- domain task/workflow state;
- specialist controls;
- shorter domain feedback loops.

### Company lens

Prefer:
- organization-level outcome summary;
- cross-domain causal/dependency view;
- exceptions/risks;
- strategic objective impact;
- drill-down paths into each domain.

Company lens should summarize before drowning executives in row-level data, but all important claims remain drillable to evidence/domain source.

## 17. The connected-circle / semantic graph

RQ-11 gives the interaction graph another useful behavior.

Department lens:

```text
Jarvis
  ↓
Marketing (primary focus)
  ├ Website
  ├ Acquisition
  ├ Content
  └ Brand
```

Company lens:

```text
                 Company objective
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
  Marketing       Recruitment      Operations
       │               │               │
       └────────────dependency─────────┘
```

The visible graph should still show only authorized/appropriate abstraction, not hidden systems or raw security topology.

## 18. Persistent Jarvis panel

When a company-authorized user opens a domain dashboard:
- the persistent Jarvis panel inherits the current domain/resource focus;
- broader company context remains eligible but is not automatically loaded;
- a request like `how does this affect company hiring goals?` expands the task lens just-in-time.

This preserves both specialization and company-wide continuity.

## 19. Same models by default

Do not create a special `Executive Model` merely because the user is senior.

Model/cognitive route remains determined by RQ-03 task complexity/quality needs.

An executive task may often route to C2/C3 because cross-domain strategic problems are complex, but:
- seniority does not automatically mean deeper reasoning;
- a CEO asking `what was spend yesterday?` may still use C0/C1;
- a specialist analyst may require C2/C3.

## 20. Same Jarvis identity

Avoid:
- `Marketing Jarvis`;
- `CEO Jarvis`;
- `Recruitment Jarvis`;
- separate memories/personas that drift.

Prefer:

```text
One Jarvis
 + Effective Operating Lens
 + Authorized Context
 + Available Capabilities
 + Applicable Strategy
```

Products may visually indicate current focus (`Marketing`, `Company`, etc.) without presenting separate assistant identities.

## 21. Lens switching UX

Where helpful and authorized, the UI may expose current focus:

```text
Jarvis
Focus: Marketing ▾
```

Possible authorized options:
- current product/domain;
- company;
- specific project/program;
- cross-domain task scope.

But many lens changes should happen naturally from the user's task without forcing manual mode switches.

Jarvis should explain material scope expansion when it changes what data/domains are being consulted.

## 22. Evaluation

Jarvis Lab should test the same query under different lenses/permissions.

Examples:

### Test A
`Why is hiring cost increasing?`

Marketing-only authorized user:
- should analyze authorized acquisition perspective;
- should disclose limitation if Recruitment outcomes are inaccessible.

Cross-domain authorized user:
- should use Marketing + Recruitment where relevant;
- should preserve domain provenance;
- should identify cross-domain drivers.

### Test B
`What should we change?`

Department lens:
- domain-appropriate recommendations.

Company lens:
- cross-domain tradeoffs and company-objective impact.

Metrics:
- unauthorized-context exposure: zero;
- correct domain selection;
- unnecessary domain retrieval;
- strategy-source correctness;
- conflict detection;
- provenance/drill-down correctness;
- recommendation usefulness;
- hidden/invented objective weighting;
- cross-domain action authority correctness;
- context/token cost.

## 23. Commercial/product consequence

Executive/company intelligence should be treated as:

> **a cross-domain capability/lens over subscribed and authorized products**

not:

> a second separate AI brain that duplicates product data.

This supports the earlier commercial model:
- subscribe to Marketing → Jarvis gains Marketing capabilities/context;
- subscribe to Recruitment → same Jarvis gains Recruitment;
- enable Company/Executive intelligence → authorized cross-domain operating lens can synthesize across those subscribed domains.

## 24. Documentation debt

Older `AI-SUITE.md` wording describes `Corporate AI Assistant` as the `company brain / intelligence and orchestration layer`.

RQ-11 further confirms the future reconciliation direction:
- Jarvis is the universal intelligent experience/orchestration layer;
- company/executive intelligence is an authorized Operating Lens/cross-domain capability;
- specialist products remain domain authority;
- there is no separate brain identity/database.

Do not mass-rewrite during RQ-11. Handle this during the planned final Jarvis concept + whole-project audit.

## 25. Recommended lock

> **RQ-11 — One Jarvis, Multiple Operating Lenses**
>
> Department and Executive/Company Jarvis are the **same Jarvis identity, experience and core architecture** operating under different effective **Operating Lenses**.
>
> An Operating Lens changes default focus, eligible context candidates, applicable approved strategy/objectives, aggregation/detail level, planning horizon, cross-domain orchestration and presentation defaults. It does **not** grant permissions, entitlements, provider access or action authority.
>
> Department/domain lenses prioritize domain semantics, operational detail and local objectives while allowing authorized cross-domain context when genuinely required by the task.
>
> Company/executive lenses expand the eligible domain set and apply company-level strategy/context, cross-domain dependency analysis and higher-level synthesis. They still use RQ-10 just-in-time context assembly rather than preloading all company data.
>
> User title/seniority does not itself grant an executive lens or access. Effective authorization remains Foundation-controlled, and task-scoped lenses can broaden/narrow focus dynamically within that authority.
>
> Company strategy is explicit inspectable context with provenance/effective period—not hidden prompt behavior. Jarvis may apply explicit approved priorities but must surface unresolved tradeoffs rather than invent objective weights.
>
> Cross-domain synthesis preserves domain semantics/provenance and distinguishes fact conflicts, metric-definition conflicts and legitimate objective tradeoffs.
>
> Cross-domain plans decompose into domain-owned capabilities/actions, each retaining its own RQ-07 permission/approval boundary. Executive Jarvis does not gain a super-permission.
>
> Cognitive model depth still follows task complexity under RQ-03; there is no special executive model by default.
>
> Commercially, company/executive intelligence is a cross-domain capability/lens over the tenant's subscribed and authorized specialist products—not a second AI brain.
>
> **One Jarvis; different effective scope, strategy and orchestration lens.**

## 26. Recommendation

**LOCK RQ-11 as written.**

This preserves one coherent Jarvis identity while adding the strategic/cross-domain behavior genuinely required for company-level intelligence.
# Jarvis Research Question 23 — Memory, Learning & Knowledge Governance

**Date:** 2026-09-28  
**Track:** Jarvis Deep Question Register  
**Question:** How should Jarvis learn across time without creating uncontrolled memory, stale truth or poisoned organizational knowledge?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/context/memory governance research only.

## 1. Decision problem

Jarvis should improve with use. Users should not need to repeat stable preferences, recurring working conventions or ongoing-project context forever.

But naive `remember everything` creates serious problems:
- stale preferences;
- accidental sensitive-data retention;
- private information becoming shared context;
- AI inference promoted into business truth;
- malicious content persisting through memory poisoning;
- deleted/changed source information continuing to influence future work;
- invisible personalization users cannot inspect/correct;
- one employee's preference becoming company policy;
- chat history becoming an ungoverned knowledge base;
- runtime optimization decisions changing without evaluation/change control.

RQ-23 must define what can be learned, what cannot, how memory is scoped, how it expires/corrects/deletes, and how learning differs from company knowledge and product improvement.

## 2. External evidence

### OpenAI — memory needs freshness, relevance, source visibility and user controls

OpenAI's 2026 memory architecture explicitly describes long-term memory as a freshness/correctness/scalability problem rather than simple storage. Current ChatGPT memory controls distinguish remembered context from underlying sources and support correction/removal/temporary non-learning sessions.

Sources:
- https://openai.com/index/chatgpt-memory-dreaming/
- https://help.openai.com/en/articles/8590148-memory-in-chatgpt
- https://help.openai.com/en/articles/8914046-temporary-chat-in-chatgpt

Product lesson:
> useful memory must stay relevant/current, expose provenance/control, and support sessions that do not write memory.

### Anthropic — persistent notes help continuity, but memory is external context rather than model truth

Anthropic's context-engineering work treats structured note-taking/agentic memory as persistent information outside the context window that is retrieved when needed. It emphasizes just-in-time context rather than preloading everything.

Sources:
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

Product lesson:
> memory is a context source with selective retrieval, not the model's authoritative world state.

### OWASP — persistent memory expands prompt-injection blast radius

OWASP ASI06: Memory & Context Poisoning warns that malicious/misleading data carried forward in memory, summaries, embeddings or RAG stores can bias future reasoning/tool use long after the initial interaction.

Sources:
- https://genai.owasp.org/2026/05/13/memory-is-a-feature-it-is-also-an-attack-surface/
- https://genai.owasp.org/download/52117/

Product lesson:
> untrusted content must not become durable reusable memory simply because the model encountered it.

### NIST — minimization, purpose limitation, correction/deletion and monitoring are governance requirements

NIST privacy guidance emphasizes limiting collection/storage to information needed for a defined purpose and maintaining mechanisms for review, alteration and deletion. AI RMF guidance emphasizes ongoing monitoring, user/actor input, override and change management.

Sources:
- https://csrc.nist.gov/glossary/term/minimization
- https://csrc.nist.gov/glossary/term/purpose_specification_and_use_limitation
- https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

## 3. Core conclusion

> **Jarvis memory is a typed, scoped, revocable context layer with provenance and temporal validity. It is not a hidden bucket of remembered text and never becomes business truth merely because it was remembered.**

Keep three meanings of `learning` separate:

```text
A. PERSONAL CONTINUITY
   user preferences / working conventions / ongoing context

B. ORGANIZATIONAL KNOWLEDGE
   approved shared definitions, policy, process, strategy

C. SYSTEM IMPROVEMENT
   routing/model/prompt/product changes learned from evals/outcomes
```

Each has a different owner, write path, authority and deletion/change process.

## 4. What is NOT memory

Do not copy these into a generic memory store merely for convenience:

### Canonical business facts
Examples:
- campaign spend;
- support-ticket status;
- employee record;
- current KPI result;
- provider connection state.

These remain in authoritative domain/provider sources.

### Approved company/domain knowledge
Examples:
- company strategy;
- KPI definitions;
- policy;
- process documentation.

These remain governed knowledge/resources with owners, effective periods and approval—not personal memory.

### Durable task state
RQ-14 owns active/resumable work.

### Durable artifacts
RQ-22 owns reports/plans/analyses/decision records.

### Authorization
Permissions/roles/entitlements are deterministic Foundation state, never learned memory.

## 5. Canonical memory classes

### M0 — Session / Working Continuity

Short-lived context for the current interaction/task.

Examples:
- current objective;
- recent correction;
- selected resource;
- temporary terminology choice.

Normally expires with session/task policy and is primarily RQ-10/RQ-14 state rather than long-term memory.

### M1 — Explicit User Memory

User deliberately states a reusable personal preference/convention.

Examples:
- preferred report format;
- preferred default comparison period;
- personal communication preference;
- `When I say acquisition, I mean recruitment acquisition in this project.`

Properties:
- user-scoped;
- inspectable/correctable;
- purpose-limited;
- cannot override policy/business truth;
- may be long-lived if still valid.

### M2 — Derived User Preference Hypothesis

Jarvis infers a possible stable preference from repeated behavior.

Examples:
- user usually prefers tables over prose;
- user normally opens Marketing view first;
- user often requests weekly rather than monthly comparison.

Properties:
- **low authority**;
- carries evidence/provenance;
- may decay/expire;
- should not silently affect high-impact decisions;
- sensitive/high-impact inferences require confirmation or are prohibited from automatic retention.

### M3 — User Working Convention / Personal Procedure

Reusable way this user prefers to execute work.

Examples:
- `Start campaign review with spend → CPL → applications → hires.`
- preferred artifact template.

May be explicit or confirmed from a proposed memory.

Still personal unless deliberately promoted to team/company procedure.

### M4 — Episodic Reference Memory

Lightweight references to prior durable work rather than copied conclusions.

Examples:
- `User worked on Artifact A / Task B`;
- `Decision Record C superseded earlier option`;
- `Project X is ongoing`.

Prefer stable resource refs and summaries over duplicating artifact contents.

Episodic memory helps continuity but does not make historical conclusions current truth.

### M5 — Temporary AI-Derived Note

Agent/task-generated working note for continuity.

Examples:
- investigation hypothesis;
- unresolved question;
- intermediate plan.

Default scope:
- task/project only;
- not reusable personal/company memory until explicitly promoted under policy.

## 6. Shared/company memory should normally become governed knowledge instead

Do **not** create an invisible collective memory where one employee's conversations gradually become organization truth.

If something should be reusable across a team/company:

```text
candidate insight/convention
       ↓
explicit promotion workflow
       ↓
owner/reviewer
       ↓
approved knowledge/procedure/artifact
       ↓
shared context eligibility
```

This produces accountability and provenance.

Team/company knowledge is therefore a **knowledge-governance problem**, not automatic memory personalization.

## 7. Memory authority ceiling

Memory has bounded authority.

Recommended conflict hierarchy:

```text
platform/legal/security policy
        ↓
current authorization/entitlement
        ↓
canonical current domain data
        ↓
approved company/domain knowledge/policy
        ↓
current explicit task instruction
        ↓
explicit user memory/preferences
        ↓
derived preference hypotheses
        ↓
AI/task notes/history
```

Nuance:
- current user intent may override a personal preference (`use prose this time`);
- user preference cannot override approved company policy/business facts;
- memory cannot grant access/action authority;
- older memory cannot override newer explicit correction.

## 8. Memory Record contract

Candidate:

```text
MemoryRecord
  memory_id
  tenant_id
  subject_user_id
  class: M1 | M2 | M3 | M4 | M5
  scope: user | project | task
  purpose / allowed-use refs
  normalized statement/value
  source/provenance refs
  creation mode: explicit | derived | promoted
  status: active | stale | disputed | superseded | disabled
  sensitivity class
  effective_from
  effective_until / review_after / ttl?
  last_confirmed_at
  version / supersedes
  retrieval tags/context
  retention/deletion policy ref
```

Do not store raw secrets/credentials in memory.

Exact schema/storage deferred.

## 9. Memory write pipeline

Never let arbitrary model output write directly into durable memory.

Preferred:

```text
interaction/task signal
      ↓
MEMORY CANDIDATE
      ↓
classify purpose/sensitivity/scope/source
      ↓
is retention allowed?
      ↓
explicit vs derived?
      ↓
validation / confirmation if required
      ↓
typed MemoryRecord
      ↓
audit/version
```

Memory creation is a governed software operation, not an unstructured `append text` tool.

## 10. Explicit memory

When user clearly says:
- `remember this preference`;
- `always use this template for my reports`;
- `for this project, compare against 2026 baseline`;

Jarvis may create/update an M1/M3 memory if:
- scope is clear;
- policy allows retention;
- information is not prohibited/sensitive beyond allowed policy;
- purpose is appropriate.

Confirm or expose the resulting memory in a lightweight way where UX supports it.

## 11. Derived memory

Automatic inference must be conservative.

A derived candidate should require:
- repeated or strong evidence;
- expected future usefulness;
- low risk of being situational;
- low sensitivity;
- no conflict with current explicit preference.

Use modes such as:

```text
candidate only
→ use within current task

low-impact derived memory
→ may personalize reversible presentation defaults

confirmation required
→ ask before persistence/use
```

Do not automatically derive/store:
- health status;
- political/religious beliefs;
- sexual life/orientation;
- criminal history;
- union affiliation;
- other highly sensitive personal classifications;
- inferred personality/psychological traits used for consequential treatment;
- hidden performance judgments about employees.

Exact regulated/sensitive categories follow tenant/legal/privacy policy; list above is a conservative product baseline, not legal advice.

## 12. High-impact decisions cannot rely silently on inferred preferences

Derived memory may personalize:
- formatting;
- default view;
- non-consequential workflow conveniences.

It must not silently decide:
- hiring/employment treatment;
- disciplinary actions;
- compensation;
- security/access;
- consequential budget/action;
- approval requirement;
- compliance/policy outcome.

High-impact decisions use current governed sources and explicit criteria.

## 13. Read/retrieval pipeline

RQ-10 remains authoritative.

Memory is one candidate Context Source.

Use:

```text
task contract
   ↓
authorized context plan
   ↓
is memory relevant?
   ↓
retrieve minimal matching records
   ↓
freshness/status/conflict check
   ↓
include typed memory in Context Packet
```

Do not preload all user memory into every request.

## 14. Temporal validity / forgetting

Different memory classes age differently.

### Explicit stable preference
May persist until changed/disabled, but can be reviewed if old.

### Derived preference
Should decay/expire/reconfirm when not reinforced or when behavior changes.

### Project convention
Expires or becomes inactive when project ends unless explicitly retained elsewhere.

### Episodic reference
May remain as pointer/history but should not be treated as current state.

### AI task note
Expires with task/project retention unless promoted.

Every reusable memory should support:
- effective period;
- last confirmation;
- stale/disputed state;
- supersession.

Do not interpret `stored` as `still true`.

## 15. Correction

If user says:
`That is wrong; use X instead.`

Jarvis should:
- immediately stop using the superseded memory for future context;
- create a new version/correction where audit/history policy requires;
- link superseded → current;
- update derived hypotheses that conflict;
- avoid forcing user to repeat the correction in every task.

Current explicit correction outranks historical inference.

## 16. Source correction/deletion propagation

If memory was derived from a source that is:
- corrected;
- deleted;
- access-revoked;
- retention-expired;
- reclassified as untrusted,

dependent memory must be:
- invalidated;
- marked stale/disputed;
- re-derived from remaining valid evidence;
- deleted where policy requires.

Do not keep a durable summary indefinitely after its only source has been deleted when policy says the derived data must also disappear.

## 17. User controls

Where allowed by tenant policy, users should be able to:
- view a useful summary of what Jarvis uses as personal memory;
- see source/reason where appropriate;
- correct it;
- disable a memory;
- request deletion;
- stop future personalization;
- use a no-memory/temporary mode;
- understand project-only vs account/user-wide scope.

OpenAI's current memory product reinforces the value of source visibility, correction/removal controls and temporary sessions that do not write memory.

Exact UI is not locked.

## 18. No-memory / private session mode

Admonk should support a session/task posture where:
- existing personal memory may be disabled from read;
- new personal memory is not written;
- task/artifact persistence still follows the task's explicit requirements;
- security/audit retention obligations remain separate.

This is not the same as deleting existing memory.

Exact naming/UI deferred.

## 19. Memory and artifacts

RQ-22 artifact ≠ memory.

Prefer M4 references:

```text
Memory:
`2027 Lead Generation Plan exists at Artifact A, current revision 8.`

rather than copying the entire plan into user memory.

When task requires the plan:
→ retrieve Artifact A under current authorization.

This prevents stale duplicate content.

## 20. Memory and company knowledge

Approved organization knowledge should have:
- named owner;
- scope;
- effective period;
- source/provenance;
- approval/published status;
- versioning;
- retention.

Jarvis may propose:
`This repeated convention appears useful across Marketing. Promote it to a Marketing procedure?`

but cross-user/company promotion requires explicit governance.

No silent `collective memory` from employee conversations.

## 21. Memory and operating lenses

RQ-11 lens affects memory eligibility.

Examples:
- Marketing lens may retrieve Marketing-project personal conventions;
- Company lens may retrieve personal preferences plus approved company knowledge;
- broader lens does not expose another user's private memory;
- executive authorization does not automatically expose individual private personalization records.

## 22. Memory and proactive behavior

RQ-21 proactive preferences can be remembered when explicitly configured:
- preferred digest cadence;
- muted category;
- preferred channel;
- monitor preferences.

Learned dismiss/open behavior may suggest adjustments but cannot silently suppress REQUIRED notices or expand monitoring scope.

## 23. Memory and actions

Memory can influence convenience defaults, never authorize an action.

Example:

`User usually exports reports as PDF`
→ safe formatting default.

`User usually approves campaign pauses`
→ **cannot** become permission to auto-pause campaigns.

Action authority still comes only from M2-11/RQ-07 current authorization/workflow.

## 24. Memory and security / poisoning

RQ-20 remains authoritative.

Untrusted content from:
- web;
- email;
- uploaded documents;
- CRM notes;
- provider/tool output;
- other agents

cannot directly write durable user/company memory.

AI-derived summaries/compaction inherit source trust/provenance; summarization does not sanitize malicious content into trusted memory.

Memory write operations need:
- source/trust metadata;
- sensitivity/purpose classification;
- scope validation;
- poisoning/anomaly monitoring;
- human confirmation/promotion where risk warrants.

## 25. Memory conflicts

Common conflict cases:

### Preference conflict
Old memory says `weekly`; user now says `monthly`.
→ current explicit instruction wins; memory updated/superseded.

### Memory vs business truth
Memory says campaign budget is £X; Marketing Hub says £Y current.
→ business source wins; budget should not have been treated as personal memory truth.

### Two derived preferences
Evidence mixed.
→ do not force a stable memory; lower confidence/mark disputed/stop applying automatically.

### Company policy vs personal preference
`User prefers external sharing` vs policy prohibits it.
→ policy wins.

## 26. Memory confidence

Do not expose fake universal percentages.

Use evidence-backed memory states such as:
- Explicit;
- Derived / tentative;
- Confirmed;
- Stale;
- Disputed;
- Superseded.

If a calibrated classifier produces probabilities for memory-candidate classification, those are implementation signals—not authority.

## 27. System improvement is NOT memory

Jarvis should improve globally/tenant-wide from:
- RQ-16 evaluations;
- production failures;
- aggregate route outcomes;
- latency/economic evidence;
- user feedback trends.

But changes such as:
- prompt update;
- new route policy;
- model binding change;
- Decision Plane threshold;
- agent profile change;
- workspace planner change

must go through versioned evaluation/change control.

Do not let production conversations silently mutate Jarvis's system prompt/runtime behavior.

## 28. Tenant-specific learned optimization

A tenant may eventually benefit from learned optimizations such as:
- common task routes;
- workspace templates;
- source/query plans;
- organization terminology mappings.

These are **configuration/learned-product assets**, not hidden personal memory.

Promotion requires:
- sufficient evidence;
- tenant scope;
- versioning;
- evaluation;
- review/rollback where material.

Example:
`Marketing recruitment-acquisition investigation usually uses Meta + Recruit`
may become an approved task/context plan after evaluation—not an opaque remembered sentence.

## 29. Preference learning vs engagement optimization

Do not use memory primarily to maximize:
- session time;
- notification clicks;
- dependence on Jarvis;
- persuasive targeting.

Memory should improve:
- continuity;
- relevance;
- reduced repetition;
- workflow efficiency;
- user control.

RQ-21 engagement metrics remain secondary diagnostics, not the objective.

## 30. Privacy minimization

Memory should store the minimum durable representation needed for the intended personalization purpose.

Prefer:
`Prefers concise weekly marketing briefs`

over:
copying ten full conversations that established the preference.

Prefer references to artifacts/tasks over duplicating their contents.

NIST minimization/purpose-limitation principles support this architecture.

## 31. Evaluation

RQ-16 memory cases should include:
- explicit preference remembered correctly;
- one-off choice does not become permanent preference;
- repeated low-risk preference can become derived candidate;
- sensitive inference is not auto-stored;
- current instruction overrides old preference;
- canonical business data overrides memory;
- memory is not cross-tenant or cross-user leaked;
- project-scoped memory does not escape project;
- source deletion/correction invalidates derived memory;
- poisoned document cannot create durable memory;
- AI task note expires unless promoted;
- artifact remains retrievable without copying whole artifact into memory;
- no-memory session neither reads/writes memory according to chosen posture;
- action authority never derives from preference memory;
- derived memory decay/staleness works;
- company knowledge promotion requires governance.

## 32. Memory observability

Track, with privacy-appropriate aggregation:
- memory reads/writes by class;
- candidate→confirmed conversion;
- correction rate;
- stale/expired memory rate;
- user disable/delete rate;
- memory-caused task correction/failure;
- source invalidation propagation;
- poisoned-memory attempts;
- retrieval usefulness;
- unnecessary memory inclusion/token cost;
- personalization benefit against control/no-memory cases where appropriate.

Do not expose raw private memory in broad operational telemetry.

## 33. What RQ-23 deliberately does NOT lock

- memory database/vector-store vendor;
- embedding model;
- exact decay formula;
- UI location/name;
- legal retention periods by jurisdiction;
- exact sensitive-data taxonomy beyond conservative baseline;
- automatic preference-detection model;
- whether a centralized memory service exists;
- exact employee-monitoring policy;
- federated learning/model-training mechanisms.

These belong to implementation/privacy/legal and M2-20/RQ-25 decisions.

## 34. Recommended lock

> **RQ-23 — Typed, Scoped, Revocable Memory with Governed Learning**
>
> Jarvis memory is a **typed, scoped, revocable context layer with provenance and temporal validity**. It is not a hidden store of remembered text and never becomes business truth merely because it was remembered.
>
> Keep **personal continuity, organizational knowledge and system improvement** as separate learning systems with different ownership, write paths and authority.
>
> Canonical business facts remain in their owning domain/provider sources; approved company knowledge remains governed knowledge; Durable Tasks and Artifacts remain under RQ-14/RQ-22. Do not duplicate them into generic memory.
>
> Long-term memory is limited to explicit user preferences/conventions, conservative low-authority derived preference hypotheses, personal working conventions, lightweight episodic resource references and temporary task/AI notes. Shared/team/company conventions require explicit promotion into governed knowledge/procedure resources.
>
> Every durable memory record is typed by tenant/user/project scope, purpose, provenance, sensitivity, status, effective/expiry/review period and version. Memory retrieval is just-in-time through RQ-10 rather than preloading all memory into every prompt.
>
> Memory has an **authority ceiling**: it cannot override security/policy, current authorization, canonical domain truth or approved organizational knowledge, and it can never grant action authority.
>
> Durable memory writes pass through a governed Memory Candidate → classification/scope/sensitivity/purpose validation → confirmation where required → typed MemoryRecord pipeline. Arbitrary model/tool output cannot directly write memory.
>
> Explicit low-risk user preferences may be remembered directly where policy allows. Derived memories are conservative, low-authority, revocable and time-sensitive; sensitive/high-impact inferred traits are not automatically retained or used for consequential treatment.
>
> Stored memory is not assumed permanently true. Support last-confirmed/effective periods, staleness, expiry/review, disputes and supersession. Current explicit corrections immediately outrank older memory.
>
> Corrections/deletions/access revocation of a source propagate to dependent memory according to governance; summaries cannot remain authoritative after their underlying permitted source disappears.
>
> Users should have meaningful controls to inspect/correct/disable/delete personal memory where policy allows, and Admonk should support a no-memory/private session posture that avoids personal memory reads/writes without confusing that with business audit/task retention.
>
> Prefer lightweight references to Durable Tasks/Artifacts over duplicating their full contents into memory. Artifact persistence does not automatically make content reusable memory or company knowledge.
>
> Untrusted/external/AI-derived content cannot automatically become durable reusable memory. Memory poisoning is a first-class RQ-20 security threat and memory governance is an RQ-16 hard-test area.
>
> Production behavior does not self-modify from conversation history. Model/prompt/routing/context/workspace/agent improvements come from evaluated, versioned change control; tenant-specific learned optimizations become explicit governed product assets rather than opaque memory.
>
> Apply data minimization and purpose limitation: remember the smallest durable representation needed to reduce repetition and improve continuity.
>
> **Jarvis may learn enough to stop making the user repeat themselves, but never so invisibly that preference becomes policy, history becomes truth, or poisoned context becomes permanent behavior.**

## 35. Recommendation

**LOCK RQ-23 as written.**

This gives Jarvis durable continuity without creating an uncontrolled second knowledge base or a self-modifying agent.
# Jarvis Research Question 22 — Persistent Product State & Artifact Architecture

**Date:** 2026-09-28  
**Track:** Jarvis Deep Question Register  
**Question:** What becomes persistent product state versus temporary AI output?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/state/artifact architecture research only.

## 1. Decision problem

Jarvis can produce:
- conversational answers;
- analyses;
- charts/tables;
- workspaces;
- reports;
- plans;
- briefs;
- drafts;
- simulations;
- recommendations;
- decisions/decision support;
- files;
- action proposals;
- task results.

If all of this lives only in chat history, the product loses durable work.

If all of it becomes permanent automatically, Admonk creates:
- noisy uncontrolled business state;
- duplicated sources of truth;
- memory/knowledge poisoning risk;
- unclear ownership;
- stale outputs that look current;
- accidental retention of sensitive data;
- impossible audit/version questions.

RQ-22 must define what persists, where it belongs, how it versions, and when AI output is promoted into durable business resources.

## 2. External evidence

### W3C PROV — provenance needs entities, activities, agents, derivation and versions

The W3C PROV family models durable outputs as entities produced/used by activities and associated with responsible agents. It explicitly supports derivation, versioning and the distinction between an evolving thing and specific versions/states of that thing.

Sources:
- https://www.w3.org/TR/prov-overview/
- https://www.w3.org/TR/prov-primer/
- https://www.w3.org/TR/prov-dm/

RQ-22 adopts these concepts as architectural inspiration; it does not require RDF/PROV serialization.

### OpenAI Agents API — published artifacts are durable/immutable outputs distinct from runtime files

OpenAI's current Agents API distinguishes environment files from published session artifacts. Published artifacts survive the execution environment and are immutable; updating a file produces another published artifact/version rather than mutating the prior published output.

Sources:
- https://developers.openai.com/api/docs/guides/agents-api/environments/files
- https://developers.openai.com/api/reference/go/resources/beta/subresources/agents/subresources/sessions/subresources/artifacts/methods/list

This supports the architectural distinction between temporary execution state and durable outputs.

### Agent products are moving from answers to finished work

OpenAI's 2026 Work product explicitly frames long-running AI work as producing finished documents, spreadsheets, presentations, reports and Sites rather than only conversational responses.

Source:
- https://openai.com/index/chatgpt-for-your-most-ambitious-work/

Market implication:
> useful AI software increasingly needs durable, inspectable outputs that outlive the conversation.

### HTTP conditional updates — avoid lost updates

HTTP's `If-Match` conditional-update semantics exist specifically to prevent accidental overwrites when multiple actors edit the same resource concurrently.

Source:
- https://www.rfc-editor.org/rfc/rfc9110.html

RQ-22 adopts the principle of version/precondition-aware edits; exact HTTP implementation is not required.

## 3. Core conclusion

> **Conversation is an interaction surface; it is not the system of record. Durable work becomes an explicit versioned resource with an owner, lifecycle and provenance.**

Jarvis should leave behind **artifacts and domain objects**, not rely on users finding old chat messages.

## 4. State taxonomy

Keep at least five categories distinct.

### S0 — Transient Interaction Output

Examples:
- streamed tokens;
- conversational phrasing;
- temporary clarification;
- transient progress message;
- hover/focus state.

Default:
- not a durable business object;
- may remain in conversation history according to product retention;
- not automatically reusable as company knowledge.

### S1 — Saved View / Workspace State

Examples:
- selected date range;
- filters;
- chart layout;
- chosen comparison;
- saved investigation workspace;
- pinned evidence panel.

This stores **how the user is viewing/working**, not a duplicate of the underlying business data.

### S2 — Durable Task State

Owned by RQ-14.

Examples:
- objective;
- completed steps;
- evidence refs;
- approval state;
- current phase;
- unresolved questions;
- child tasks.

Task state supports continuation; it is not itself the final business artifact.

### S3 — Durable Artifact

A durable output created/edited through intelligent work.

Examples:
- analysis;
- report;
- strategy draft;
- brief;
- plan;
- recommendation set;
- decision record;
- scenario/simulation;
- evidence bundle;
- generated document/spreadsheet/presentation;
- saved analytical workspace definition.

An artifact has stable identity, revisions, provenance, permissions and lifecycle.

### S4 — Authoritative Domain Object

Examples:
- campaign;
- support ticket;
- approved KPI definition;
- content item;
- workflow configuration;
- customer/account record.

These belong to specialist products/domains.

If an authoritative domain object already exists, Jarvis uses the product capability to create/update that object rather than inventing a parallel `Jarvis copy`.

### S5 — Durable Knowledge / Memory

Company knowledge, learned preferences and reusable memory are **not automatically artifacts**.

Promotion into reusable memory/knowledge is governed separately by RQ-23.

## 5. Promotion is explicit

Default flow:

```text
conversation output
      │
      ├─ remains transient
      │
      └─ task/deliverable requires persistence
             ↓
          ARTIFACT
             │
             ├─ remains analysis/report/draft
             │
             └─ explicit domain capability/promotion
                    ↓
            DOMAIN OBJECT / PUBLISHED STATE
```

Do not silently promote:
- ordinary answers → artifact;
- artifact → authoritative business object;
- artifact → company knowledge/memory.

Exceptions:
- the task contract explicitly defines a durable deliverable;
- the user explicitly saves/pins/converts;
- a governed workflow explicitly produces a durable resource.

## 6. Artifact identity vs revision identity

Separate the logical artifact from each immutable revision.

```text
Artifact
  artifact_id = stable logical identity
  current_revision_id

ArtifactRevision
  revision_id = immutable
  artifact_id
  base/parent revision(s)
  content/reference
  created_at
  creator/activity provenance
```

Editing creates a new revision/checkpoint rather than silently rewriting history.

Do not persist every keystroke as a business revision; products may coalesce edits and create revisions at meaningful save/checkpoint boundaries.

## 7. Artifact Contract

Candidate shared logical contract:

```text
Artifact
  artifact_id
  tenant_id
  owner_product/domain
  artifact_type + schema/version
  organizational_scope
  title/label
  lifecycle/status
  current_revision_id
  mode: snapshot | live_bound
  created_by actor/task
  created_at / updated_at
  sensitivity/classification
  retention/governance policy ref
  permissions/resource policy
  source/evidence refs
  parent/related artifact refs
  domain/resource links
```

ArtifactRevision candidate:

```text
revision_id
artifact_id
base_revision_id(s)
content/blob/structured-resource ref
schema version
created_by user / task / agent/workflow
created_at
change summary / diff ref
source snapshot/provenance refs
assumptions
task/trace/eval refs
model RouteProfile/binding ref where materially relevant
human review/approval refs where applicable
```

Exact storage schema is deferred.

## 8. Artifact owner

Every artifact has a semantic owner.

Examples:
- Marketing analysis → Marketing Hub;
- Support incident report → Support product;
- company cross-domain brief → company/Jarvis layer;
- shared Setup report → Admonk One/shared platform.

Ownership determines:
- schema;
- permissions;
- lifecycle;
- retention/export/delete;
- business meaning;
- edit/publish rules.

Jarvis owns orchestration/experience, not every artifact's domain semantics.

## 9. Shared Artifact Contract does not require one central artifact database

Logical interoperability needs:
- stable artifact/resource identity;
- common provenance/link/version conventions;
- Resource Link compatibility;
- ability to reference artifacts from tasks/conversation/Jarvis.

Possible physical storage:
- domain database;
- document store;
- object/blob storage;
- shared artifact service;
- hybrid.

Do not centralize all content merely because Jarvis can create it.

Runtime/storage topology remains for M2-20/RQ-25.

## 10. Files are representations, not necessarily the artifact identity

A report may have:

```text
canonical structured report artifact
      ├ HTML rendering
      ├ PDF export
      ├ DOCX export
      └ presentation representation
```

The exported file should not automatically become the only canonical form if the product has a richer structured artifact.

For file-native deliverables, the file/blob itself may be the primary content representation.

## 11. Snapshot vs live-bound artifacts

This distinction must be explicit.

### Snapshot artifact

Represents analysis/content **as of a specific state/time**.

Examples:
- Q3 performance report;
- investigation conclusion;
- board brief;
- evidence bundle.

Rules:
- source versions/as-of timestamps retained;
- later data changes do not silently rewrite the artifact;
- refresh/recompute creates a new revision or new artifact according to semantics.

### Live-bound artifact

Persists a query/view/model that resolves against current authorized data.

Examples:
- saved dashboard/workspace;
- live KPI board;
- saved comparison configuration.

Rules:
- clearly labeled as live/current;
- query/source definition versioned;
- underlying source remains authoritative;
- historical views need explicit snapshot/as-of mode.

Do not present live values as though they were the values used in a historical decision.

## 12. Provenance

Each durable artifact/revision should carry enough provenance to answer:
- who/what created it?;
- what task/activity produced it?;
- what sources/evidence were used?;
- which source versions/as-of times?;
- what prior artifact/revision was it derived from?;
- what assumptions were applied?;
- which user/agent/workflow participated?;
- what review/approval occurred?;
- what route/model/config produced AI-derived content where relevant?

W3C PROV's entity/activity/agent/derivation model is a useful conceptual reference.

Do **not** store private chain-of-thought as provenance.

Store observable inputs/outputs, source refs, configuration/profile versions, actions and trace references.

## 13. Evidence is distinct from provenance

Provenance answers:
`Where did this come from and how was it produced?`

Evidence answers:
`What supports this claim/conclusion?`

Important analysis artifacts should support section/claim-level evidence links where practical.

Example:

```text
Finding:
Arabic recruitment acquisition cost increased 31%.

Evidence:
- Marketing metric query ref / period
- Recruitment applications/hire ref
- source freshness/version
```

## 14. Source drift

Artifacts must not silently become `current truth` when their sources change.

If an artifact depends on operational data and newer data exists:
- preserve original revision;
- show `as of` / freshness where material;
- optionally flag `newer source data available`;
- offer refresh/recompute;
- create a new revision/artifact with new provenance.

Never retroactively alter the historical evidence for a decision/report merely because live data changed.

## 15. Simulations/scenarios

Scenario artifacts require explicit distinction from observed/canonical state.

Store:
- assumptions;
- input/source versions;
- scenario parameters;
- model/method version;
- outputs;
- uncertainty/limitations;
- created time.

Label:
`Scenario / Simulation`

not:
`Current forecast/fact`

unless the owning domain explicitly defines a formal forecast artifact.

Rerunning with changed assumptions creates a new revision/scenario branch rather than overwriting the prior result.

## 16. Decision records

When a material human/business decision should persist, store it explicitly rather than relying on chat history.

Candidate DecisionRecord artifact:
- decision;
- owner/decision maker;
- date/effective period;
- alternatives considered where recorded;
- evidence/artifact refs;
- assumptions/constraints;
- approval refs;
- related actions/resources;
- status: proposed/decided/superseded as domain permits.

AI may prepare the record.

Human/business authority determines the decision state.

## 17. Editing and collaboration

Jarvis should edit the **resource**, not merely answer with a replacement blob.

Pattern:

```text
open artifact revision 12
      ↓
user: 'shorten section 3'
      ↓
Jarvis proposes/applies edit against revision 12
      ↓
revision precondition check
      ↓
revision 13
```

Use optimistic concurrency/version preconditions to prevent silent lost updates.

If current head changed:
- rebase/merge safely where deterministic;
- show conflict/diff;
- ask user where necessary;
- never silently overwrite another collaborator's change.

HTTP `If-Match` is a standards example of this principle.

## 18. AI changes should be inspectable

Where the artifact format supports it, preserve:
- diff/change summary;
- AI vs human authored revision attribution;
- accepted/rejected proposal history for consequential/important edits;
- prior revision rollback.

Do not require permanent storage of every token-level edit or hidden reasoning.

## 19. Artifact lifecycle

Use a small extensible lifecycle rather than one universal workflow for every domain.

Candidate cross-product states:

```text
WORKING
DRAFT
IN_REVIEW
APPROVED
PUBLISHED
ARCHIVED
SUPERSEDED
```

Artifact types may support only a subset.

Lifecycle transition semantics belong to the owning product/domain and may use RQ-07 action/approval rules.

`APPROVED`/`PUBLISHED` must never be inferred merely because AI generated a polished result.

## 20. Artifact actions and authority

Editing a private draft may be low-risk/reversible.

Publishing, replacing an approved policy, sending externally, or converting a draft into an operational domain object may be consequential.

Therefore artifact actions use normal M2-11/RQ-07 action classes and approval policy.

Artifact persistence is not a bypass around the governed action model.

## 21. Workspace persistence

RQ-06 Dynamic Workspace can persist in two ways:

### Task-bound workspace
Reconstructable from Durable Task state; disappears/archives with task policy.

### Saved workspace artifact
User/task explicitly saves a reusable analytical view.

Persist:
- component/spec version;
- layout/state needed for reconstruction;
- resource/query refs;
- filters/time mode;
- artifact relationships.

Do not persist:
- entire duplicated source datasets unless required;
- temporary animation/UI microstate;
- unauthorized data snapshots.

## 22. Artifact discovery

Durable artifacts should be findable outside the original chat.

Potential entry points:
- owning product's artifact/library area;
- Jarvis recent work;
- task history;
- Resource Links from notifications/briefs;
- search where authorized;
- related domain resource.

Conversation remains one route to the artifact, not its only locator.

## 23. Conversation relationship

Conversation may reference artifacts with stable IDs/links.

Example:

`I updated the 2027 Lead Generation Plan → revision 8.`

Later conversation:
`Compare revision 8 with the approved strategy.`

Jarvis resolves the artifact directly.

Do not reconstruct the plan by rereading the old conversational prose if the durable artifact exists.

## 24. Durable task relationship

RQ-14 Durable Tasks may produce multiple artifacts.

```text
Task
  ├ evidence bundle
  ├ analysis
  ├ recommendation
  └ final report
```

Task stores references.

Large artifact content is kept outside the durable workflow/task history.

Task completion should identify canonical deliverable artifact(s).

## 25. Artifact relationships

Support typed links such as:
- derived_from;
- supersedes;
- supports;
- evidence_for;
- generated_by_task;
- related_to_domain_resource;
- representation_of;
- exported_as;
- decision_based_on;
- scenario_of.

Do not rely only on filenames/folders to communicate semantic relationships.

## 26. Data sensitivity and governance

An AI-generated artifact inherits sensitivity from its contents/sources and applicable policy.

`Generated by AI` does not reduce classification.

Artifact permissions/retention/export/delete follow:
- tenant/platform policy;
- owning product/domain policy;
- source sensitivity/contractual requirements;
- M2-18 data governance.

Derived indexes/previews/search entries must respect deletion/retention propagation.

## 27. Export

Users may export durable artifacts where authorized.

Where appropriate export should preserve or accompany:
- title/type/version;
- as-of date;
- source/evidence references;
- approval/published status;
- generated/edited provenance metadata.

Exact export formats vary by artifact type.

## 28. Deletion / archival

Deletion semantics depend on governance.

Possible outcomes:
- hard delete where allowed;
- archive;
- retention lock;
- tombstone/resource unavailable;
- remove content but retain minimal audit record where legally/operationally required.

Deleting an artifact must not silently delete its authoritative source/domain object.

Deleting a source may invalidate/redact derived artifact access according to policy.

## 29. Artifact vs memory/knowledge

RQ-23 boundary:

An artifact being durable does **not** mean:
- Jarvis may always preload it;
- it becomes company policy;
- it becomes user memory;
- its AI conclusions become facts;
- it is globally searchable across scopes.

RQ-23 will define when/how durable outputs may become reusable memory/knowledge.

## 30. Artifact vs domain object examples

### Marketing campaign proposal

Before approval:
`Campaign Plan Artifact`

After explicit governed creation:
`Marketing Campaign Domain Object`

Artifact may remain as planning/evidence history.

### Support analysis

`Case Root-Cause Analysis Artifact`

does not replace:
`Support Ticket / Case Domain Object`.

### Company brief

`Executive Brief Artifact`

references Marketing/Recruitment/Support resources without copying them into a new company database.

## 31. Artifact creation policy

Automatically persist an artifact when:
- task contract names a durable deliverable;
- workflow requires review/approval later;
- output is expected to be edited/reused/shared;
- provenance/history matters;
- durable task completion requires a retained result.

Keep output transient when:
- answer is simple/ephemeral;
- no future editing/reuse is expected;
- saving adds noise without business value.

Offer `Save / Pin / Turn into artifact` when user intent emerges later.

## 32. Artifact evaluation

RQ-16 cases should evaluate:
- correct persistence decision;
- correct artifact type/owner;
- no duplicate authoritative object;
- revision/provenance correctness;
- source/evidence freshness/as-of clarity;
- concurrency/lost-update protection;
- lifecycle/approval correctness;
- snapshot vs live-bound distinction;
- artifact recoverability independent of chat;
- export/retention/access behavior;
- AI edit diff/version correctness;
- no silent memory/knowledge promotion.

## 33. Product experience

Jarvis should make artifacts feel like **workspaces/objects the user can continue**, not attachments dropped at the end of a chat.

Example:

```text
Recruitment Acquisition Investigation
Status: Draft analysis
Revision 6
Updated 01:14

Evidence        14 sources
Findings        6
Scenario        2
Decision        Pending

[Open workspace] [Compare revision] [Export] [Continue with Jarvis]
```

This shifts the mental model from:
`Where was that answer?`

to:
`Open the work.`

## 34. What RQ-22 deliberately does NOT lock

- storage/database/object-store vendor;
- exact file formats;
- one universal artifact UI;
- real-time collaborative editing technology;
- CRDT/OT choice;
- whether every artifact uses a shared service;
- exact lifecycle per domain;
- retention durations;
- PDF/DOCX renderer;
- search/index provider;
- exact provenance serialization.

These remain for product/runtime implementation and M2-20/RQ-25.

## 35. Recommended lock

> **RQ-22 — Explicit Durable Artifact & Product-State Architecture**
>
> Conversation is an interaction surface, **not the system of record**. AI output remains transient unless the task/workflow explicitly requires a durable deliverable or the user intentionally saves/promotes it.
>
> Keep **Transient Interaction Output, Saved View/Workspace State, Durable Task State, Durable Artifacts, Authoritative Domain Objects, and Durable Knowledge/Memory** as distinct state classes.
>
> A Durable Artifact is an explicit resource with stable identity, owning product/domain, tenant/scope, type/schema, lifecycle, permissions, sensitivity, provenance and version history.
>
> Separate stable **artifact identity** from immutable **revision identity**. Meaningful edits create new revisions/checkpoints; products may coalesce micro-edits rather than version every keystroke.
>
> If an authoritative product/domain object already exists, Jarvis uses the governed domain capability to create/update it rather than creating a competing Jarvis copy.
>
> The shared Artifact Contract does not require one central artifact database. Content may remain domain-owned/shared/object-backed while stable links, version/provenance conventions and Resource Links provide interoperability.
>
> Distinguish **snapshot artifacts** from **live-bound artifacts**. Historical analyses preserve the source state/as-of provenance used at creation; live workspaces re-query current data and must not masquerade as historical snapshots.
>
> Provenance records observable creation/derivation responsibility, sources, task/activity, versions, assumptions, reviews and relevant model/route configuration without storing hidden chain-of-thought.
>
> Evidence is separate from provenance and should link important claims/sections to the sources that support them.
>
> Source changes never silently rewrite prior artifact history. Refresh/recompute produces a new revision/artifact with new provenance.
>
> Scenarios/simulations are explicitly hypothetical and preserve assumptions/input versions. Decision records persist material decisions and supporting evidence; AI can draft them but cannot grant decision authority.
>
> Collaborative/user/AI edits are version-aware and use optimistic concurrency/preconditions so Jarvis never silently overwrites another actor's newer changes.
>
> Artifact lifecycle/publishing uses normal M2-11/RQ-07 authority and approvals. A polished AI output is not automatically approved or published.
>
> Durable Tasks reference their output artifacts; large artifact content does not live inline in workflow history. Artifacts remain discoverable independently of the original conversation.
>
> An artifact being durable does **not** automatically make it company knowledge or memory. RQ-23 governs that promotion separately.
>
> **Jarvis should leave behind durable work with identity, evidence and history—not force the business to treat chat history as its filing cabinet.**

## 36. Recommendation

**LOCK RQ-22 as written.**

This gives Jarvis a durable work model while protecting domain authority, historical truth, collaboration and the upcoming memory-governance boundary.
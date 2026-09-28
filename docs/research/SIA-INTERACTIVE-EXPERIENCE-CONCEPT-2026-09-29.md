# SIA Interactive Experience Concept

**Date:** 2026-09-29  
**Status:** PROPOSED EXPERIENCE ARCHITECTURE — RESEARCH / VALIDATION  
**Masterbrand:** SIA  
**Intelligent experience:** Jarvis  
**Relationship to locked architecture:** Extends the existing AI-first / not-chat-only Jarvis direction and JX-01 Dynamic Jarvis Workspace. Does not reopen M2/M3 authority boundaries.

---

## 1. Product concept

SIA should not feel like a chatbot sitting beside software.

The product experience should feel like:

> **software continuously assembled around the user's intent, context and current work.**

Jarvis provides the intelligence.

SIA provides the environment in which that intelligence becomes visible, navigable, interactive and actionable.

The user can:
- talk or type;
- inspect live visual explanations;
- manipulate the same objects Jarvis is reasoning about;
- open panels and workflows without losing context;
- move between conversation, generated workspace and durable product surfaces;
- trigger governed actions;
- see immediate progress;
- return to anything Jarvis created or discovered.

This is an extension of the locked JX-01 model:

1. Conversation
2. Dynamic Jarvis Workspace
3. Full specialist dashboard

The important change in emphasis is that level 2 becomes a first-class **SIA Interactive Workspace Runtime**, not merely a set of chat cards.

---

# 2. Experience principle

## SIA does not generate arbitrary application code at runtime.

Jarvis selects and composes from an approved, versioned SIA component vocabulary.

Examples:
- Metric
- Chart
- Table
- ProcessMap
- RelationshipGraph
- EvidencePanel
- FindingCard
- RecommendationCard
- Plan
- Timeline
- ContactPicker
- MeetingPanel
- ApprovalCard
- TaskList
- Comparison
- DocumentViewer
- Form
- StatusTimeline
- Notification
- Artifact
- Drilldown
- ProductResourceLink

Each component:
- has a typed schema;
- declares what data it may receive;
- declares allowed interactions;
- has deterministic accessibility/responsive behavior;
- has loading/error/empty/permission-denied states;
- emits typed user events;
- cannot grant authority.

Jarvis may choose **what** to present and **how to combine approved components**.

The SIA client decides **how those components are safely rendered**.

---

# 3. Core interaction loop

```
User intent
   ↓
Jarvis understands context
   ↓
Reflex Router
   ├─ answer
   ├─ investigate
   ├─ present
   ├─ request input
   ├─ propose action
   └─ execute governed action
   ↓
SIA Surface Runtime
   ↓
interactive component(s)
   ↓
user interaction
   ↓
typed event / updated context
   ↓
Jarvis continues
```

The conversation and UI are not two separate systems.

They are two views over the same run/context/artifacts.

---

# 4. SIA Surface Protocol

Create a provider-neutral internal contract inspired by current generative-UI protocols.

Candidate message types:

- `surface.create`
- `surface.patch`
- `surface.close`
- `component.add`
- `component.update`
- `component.focus`
- `data.patch`
- `artifact.created`
- `artifact.updated`
- `action.proposed`
- `approval.requested`
- `run.progress`
- `run.completed`
- `run.failed`

Example conceptual payload:

```json
{
  "type": "surface.create",
  "surfaceType": "process_diagnosis",
  "title": "Talent Acquisition Lead Handoff",
  "components": [
    {
      "type": "ProcessMap",
      "artifactId": "process:ta-lead-handoff:v4"
    },
    {
      "type": "FindingCard",
      "findingId": "finding:handoff-delay"
    }
  ]
}
```

This is data, not generated source code.

---

# 5. Persistent artifacts

Anything important SIA creates should become a persistent versioned artifact rather than disappearing inside chat history.

Examples:
- report;
- process map;
- diagnostic finding;
- recommendation;
- action plan;
- scenario;
- meeting brief;
- meeting record;
- meeting minutes;
- decision;
- generated document;
- comparison;
- dashboard snapshot.

Each artifact should preserve:
- stable ID;
- type;
- owner/source;
- tenant/product/scope;
- revision;
- provenance;
- evidence links;
- permissions;
- creation run;
- freshness;
- related resources;
- status.

Jarvis can reopen, update or reference the artifact later.

This enables:

> “Open the process map from yesterday and show me what changed.”

without regenerating the entire experience.

---

# 6. First onboarding — SIA sensemaking sequence

The first-run experience should visually demonstrate SIA building an understanding of the organization.

It must be truthful rather than theatrical.

## Stage 1 — Connect

Show the connected systems as they become available.

Examples:
- CRM
- help desk
- marketing platforms
- task/project system
- document sources
- analytics
- people directory
- calendar/meeting provider

The user sees:
- connected;
- syncing;
- unavailable;
- permission-limited;
- action required.

## Stage 2 — Organize

SIA establishes a semantic view rather than pretending everything is just folders.

Visual language may show:
- organization;
- departments;
- systems;
- datasets;
- documents;
- processes;
- people;
- resources;
- relationships.

The UX may *look* folder-like where useful, but the underlying system should be a typed relationship/context graph.

## Stage 3 — Discover

SIA identifies:
- repeated workflows;
- handoffs;
- owners;
- dependencies;
- recurring tasks;
- system relationships;
- missing evidence;
- broken/missing connections.

Important:
SIA must distinguish:

- **Observed**
- **Inferred**
- **Needs confirmation**

It should never present an inferred process as authoritative fact.

## Stage 4 — Map

SIA turns evidence into understandable visual models.

Examples:
- process maps;
- relationship maps;
- system/data-flow maps;
- timelines;
- responsibility/handoff maps.

## Stage 5 — Analyze

SIA performs analysis over authorized evidence.

It should not dump 40 findings at once.

Present the most important findings progressively.

Example:

**Finding 1 — Candidate handoff delay**

Then:
- concise explanation;
- evidence;
- process map;
- highlight the failing node/edge;
- impact;
- confidence/evidence state.

Then ask:

**Prepare a remediation plan?**

## Stage 6 — Act

If the user agrees:
- compose a plan;
- identify required people;
- identify permissions/approvals;
- create tasks/drafts only when authorized;
- request approval where required;
- preserve the plan as an artifact.

---

# 7. Example — process diagnosis

User:
> Why are projects taking too long?

Jarvis investigates.

Instead of replying with a long paragraph, SIA opens a diagnosis workspace:

```
[Summary]
Projects are losing the most time between approval and assignment.

[Process Map]
Request → Review → Approval → Assignment → Work → QA

                         ↑
                  2.8 day median delay

[Evidence]
• 72% of delayed projects waited here
• ownership changes 3× on affected cases
• no automatic escalation after approval

[Recommendation]
Introduce owner assignment at approval + escalation after X hours

[ Prepare a plan ]
[ Show affected projects ]
[ Ask the process owner ]
```

Clicking/asking `Prepare a plan` continues the same context.

---

# 8. Example — report → meeting without leaving context

User is reviewing a report.

SIA displays:
- metrics;
- charts;
- anomalies;
- notes;
- recommendations.

User says:

> Set up a meeting with Ahmed about this.

Jarvis resolves the intent as a proposed meeting action.

SIA immediately opens a right-side **Meeting Panel**.

The panel already knows:
- report/artifact being discussed;
- tenant;
- user's identity;
- current context;
- user's meeting permissions.

## Contact resolution

While the user says/types “Ahmed”:
- People/Contacts search begins;
- matching authorized contacts stream into the panel;
- likely intended Ahmed is highlighted but not silently selected when ambiguous.

Example:

```
Meeting about: September Marketing Performance

People
✓ Ahmed Samir — Marketing
  Ahmed Khaled — Service Delivery
  Ahmed Ali — Training

When?
[ Now ] [ Schedule ]

Duration
[ 15m ] [ 30m ] [ 45m ]

Include SIA meeting notes
[✓]

[ Start meeting ]
```

The user does not need to leave the report.

---

# 9. Meeting lifecycle

## Before meeting

SIA can prepare:
- agenda;
- relevant report;
- evidence;
- open questions;
- previous decisions;
- action items;
- participant context allowed by policy.

## Start

A meeting provider capability creates/starts the authorized session.

Provider examples may include:
- Zoom;
- Google Meet;
- Microsoft Teams;
- future compatible provider.

The provider is accessed through the Connector/Capability boundary, not directly from arbitrary model code.

## During meeting

The meeting surface can coexist with:
- report;
- process map;
- live agenda;
- notes;
- action candidates.

SIA may update:
- transcript state;
- detected decisions;
- open questions;
- candidate actions;

but should not silently create consequential actions from conversation.

## After meeting

SIA creates a Meeting Record artifact with:
- participants;
- timestamps;
- authorized recording/transcript link;
- summary;
- decisions;
- unresolved questions;
- action items;
- evidence/resources referenced.

Then present:

```
Meeting complete

Decisions: 3
Actions: 4
Open questions: 2

[ Review minutes ]
[ Assign actions ]
[ Send minutes ]
```

Sending/assigning follows normal authorization and approval rules.

---

# 10. UI state model

SIA requires an explicit realtime interaction state.

At minimum:

- ready;
- listening;
- understanding;
- investigating;
- presenting;
- waiting_for_input;
- waiting_for_approval;
- executing;
- meeting;
- completed;
- degraded;
- failed.

The app should immediately transition state when work begins.

Long-running work streams truthful progress events.

Example:

```
Understanding request…
Searching approved sources…
Building process map…
Comparing 184 cases…
3 findings found.
```

No fake percentage progress.

---

# 11. Agent ↔ UI shared state

The frontend and Jarvis need a shared, typed interaction state.

Examples:
- active report;
- selected chart range;
- selected process node;
- currently highlighted anomaly;
- selected contacts;
- meeting draft;
- open approval;
- active product/resource;
- drawer/panel context.

This allows interaction like:

1. user clicks one process node;
2. the visual highlights it;
3. Jarvis receives the selected resource ID;
4. user says “why is this happening?”;
5. Jarvis understands “this” without requiring a restatement.

The UI should update model context through stable resource identifiers, not by dumping screenshots/DOM text back into the model.

---

# 12. Surface ownership

Three surface levels remain:

## Inline

Inside conversation:
- simple metrics;
- status;
- approval;
- short forms;
- small charts.

## Context panel / drawer

For:
- people picker;
- meeting setup;
- approval details;
- resource details;
- filters;
- quick edits;
- action configuration.

## Dynamic workspace

For:
- reports;
- investigations;
- process analysis;
- scenario planning;
- multi-chart analysis;
- meeting workspaces;
- plans.

## Full specialist product

For:
- dense management;
- administration;
- bulk operation;
- permanent operational tables;
- detailed configuration;
- audit/history.

Jarvis decides when to propose/open a surface; product contracts define what is allowed.

---

# 13. Technical implementation direction

Current ecosystem evidence supports this architecture.

Potential implementation patterns to evaluate rather than blindly adopt:

### A2UI
Streaming JSON-based agent-to-UI protocol with explicit surface creation, component updates and data-model updates.

Useful pattern for:
- SIA Surface Protocol;
- progressive rendering;
- separation of component structure from data.

### assistant-ui / controlled Generative UI
Supports:
- tool-linked React UI;
- model-composed UI from a controlled component vocabulary;
- streaming props;
- interactive forms and controls.

Useful for:
- fast Jarvis Lab validation;
- component-vocabulary experiments.

### MCP Apps
Official MCP extension for tools to return interactive applications/UI.

Useful for:
- provider/tool-specific rich interfaces;
- portable SIA capability apps;
- future tool ecosystem;
- sandboxed third-party/specialist UI surfaces.

Not necessarily the primary SIA native renderer; the first-party SIA UI can remain tighter and richer.

### AG-UI style agent/frontend event transport
Current implementations demonstrate:
- streaming;
- shared frontend/agent state;
- human-in-the-loop;
- generative UI;
- predictive state updates.

Useful as a reference when validating the SIA event/streaming contract.

---

# 14. Security boundary

The model must never control the application directly.

Required path:

```
Jarvis intent
→ allowed capability / presentation contract
→ deterministic authorization
→ SIA surface/action schema
→ client renderer
→ user interaction
→ action request
→ authority envelope
→ approval if applicable
→ owning product/provider
→ receipt
→ UI update
```

UI visibility is not action authority.

Seeing a button does not grant permission.

The backend remains authoritative.

---

# 15. Meeting-specific security and governance

Meeting workflows introduce additional controls:

- participant visibility according to tenant/scope;
- calendar/meeting provider scopes;
- explicit consent/notice requirements for recording/transcription;
- configurable recording policy;
- retention policy;
- transcript sensitivity;
- external-participant rules;
- action extraction does not equal action authorization;
- sending minutes to participants remains a governed communication action.

Provider limits must be respected.

For Zoom specifically, human meeting embedding and AI-notetaker/realtime-media access are distinct provider capabilities; do not misuse ordinary Meeting SDK access as an AI recording bot.

---

# 16. Why this is compatible with the existing Foundation

This concept does not require changing:
- tenant model;
- product boundaries;
- domain authority;
- settings hierarchy;
- entitlement model;
- Context Plane;
- Agent Authority Envelope;
- audit/provenance;
- Resource Links;
- lifecycle;
- runtime boundaries.

It adds a richer experience contract above them.

In fact, the existing Foundation enables this safely.

Without the Foundation, dynamic UI + agentic action would become a permission/security problem.

---

# 17. Proposed new Foundation concept

Working term:

**SIA Interactive Workspace Runtime**

Responsibilities:
- receive Jarvis UI/presentation events;
- render approved components;
- maintain surface state;
- maintain artifact/resource context;
- dispatch typed interaction events;
- coordinate drawers/workspaces;
- provide immediate progress feedback;
- preserve navigation/context across conversation and product surfaces.

This is an **experience-layer runtime**, not another business-data authority.

---

# 18. Product thesis

The differentiating experience is not:

> “Talk to your business data.”

It is:

> **SIA understands the business, turns that understanding into software you can interact with, and helps you act without losing context.**

Jarvis is the intelligence.

SIA is the environment.

Specialist products remain the authoritative operating systems for their domains.

---

# 19. Validation sequence

Before locking implementation technology, prototype these proof moments:

1. **First-run sensemaking**
   - source connection;
   - organization/process discovery;
   - process map;
   - evidence-backed finding;
   - prepare-plan action.

2. **Interactive report**
   - report generated;
   - chart/table selection;
   - user asks follow-up referring to selected element;
   - Jarvis maintains visual context.

3. **Report → meeting**
   - user requests meeting;
   - right drawer appears;
   - contact resolves live;
   - meeting draft;
   - governed creation.

4. **Meeting → minutes**
   - provider meeting/transcript;
   - summary;
   - decisions/actions;
   - approval before dispatch/action assignment.

5. **Long-running job**
   - immediate state feedback;
   - progressive truthful updates;
   - resumable run/artifact.

Measure:
- time to visible acknowledgement;
- time to first useful state;
- number of prompts/clicks;
- correction rate;
- wrong-context rate;
- generated-surface usefulness;
- user trust;
- approval clarity;
- completion rate;
- token/model/tool cost.

---

## Current recommendation

**Proceed to prototype this concept in Jarvis Lab before adding it to the permanent Product Platform implementation backlog.**

Do not reduce it to a chatbot feature.

Do not allow arbitrary runtime UI code generation.

Build the proof around a **typed component vocabulary + streaming surface protocol + persistent artifacts + governed actions**.

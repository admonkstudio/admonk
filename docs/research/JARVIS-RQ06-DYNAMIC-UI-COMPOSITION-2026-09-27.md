# Jarvis Research Question 06 — Scalable Dynamic UI / Workspace Composition

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** How do we make dynamic UI scalable without allowing arbitrary AI-generated product UI?  
**Status:** LOCKED — OWNER ACCEPTED  
**Implementation authority:** None. Product/interaction/platform research only.

## 1. Decision problem

RQ-05 locks the surface model:
- S0 Conversation;
- S1 Dynamic Jarvis Workspace;
- S2 Full Specialist Dashboard.

RQ-06 must define how S1 can be dynamically composed at runtime while preserving:
- Admonk design-system consistency;
- speed and progressive rendering;
- accessibility;
- security;
- predictable actions;
- provider independence;
- product/domain ownership;
- mobile/responsive behavior;
- version compatibility;
- low token usage;
- the ability to add future products without rewriting Jarvis.

The unsafe extreme is:

```text
LLM writes arbitrary HTML/CSS/JavaScript at runtime
    ↓
browser executes it
```

This is rejected for core Jarvis workspaces.

## 2. External research findings

### A2UI — declarative, catalog-constrained dynamic UI

Google's A2UI project is specifically designed to separate an agent's UI intent from the client application's concrete component implementation.

Current A2UI guidance emphasizes:
- agents generate structured UI declarations rather than raw HTML/JS;
- the host renders using its existing native component catalog;
- production applications normally define their own catalog so agents can use only approved components;
- component properties are schema-validated;
- UI structure and UI data are separated;
- surfaces can render progressively from streamed updates;
- clients advertise which catalogs/capabilities they support;
- client-side functions/validation are pre-registered rather than sent as arbitrary executable code.

Sources:
- https://developers.googleblog.com/a2ui-v0-9-generative-ui/
- https://a2ui.org/guides/defining-your-own-catalog/
- https://a2ui.org/concepts/components/
- https://github.com/a2ui-project/a2ui/blob/main/specification/v1_0/docs/a2ui_protocol.md

### A2UI + MCP Apps — hybrid native/catalog UI plus custom modules

Google and the MCP Apps authors explicitly describe the tradeoff:
- declarative/catalog UI gives native design consistency, security and performance;
- sandboxed MCP Apps give more freedom for complex, state-heavy custom modules;
- the two approaches can coexist.

Critically, the A2UI/MCP guidance recommends predefined trusted components for normal interfaces and reserving custom embedded applications for cases whose logic is too specialized for a declarative component catalog.

Source:
- https://developers.googleblog.com/a2ui-and-mcp-apps/

### MCP Apps — Tool + UI Resource

MCP Apps standardizes interactive views attached to tools. Views run in a sandboxed iframe and communicate bidirectionally through a defined bridge.

This is useful for:
- rich visualizations;
- design canvases;
- specialized editors;
- state-intensive external/tool-owned modules;
- third-party capability UI.

It is not necessary for every first-party Jarvis workspace.

Source:
- https://apps.extensions.modelcontextprotocol.io/api/

### OpenAI UI guidance

OpenAI's current UI model also preserves a separation between structured tool results, widget state, host functions and tool invocations. The host/application remains responsible for the component environment and can persist UI state between renders.

Sources:
- https://developers.openai.com/plugins/concepts/ui-guidelines
- https://developers.openai.com/plugins/build/chatgpt-ui
- https://developers.openai.com/plugins/reference

### SAP Joule Work

SAP's current Joule Work direction independently validates the product goal: intent-driven workspaces are composed in real time around the user's goal, bringing relevant data, tools and context together rather than making the user manually navigate multiple applications.

Sources:
- https://www.sap.com/products/artificial-intelligence/joule-work.html
- https://news.sap.com/2026/07/sap-business-ai-release-highlights-q2-2026/

## 3. Core conclusion

> **Jarvis should generate a validated declarative workspace specification, not executable interface code.**

The Admonk client owns:
- actual React/native components;
- design tokens/theme;
- responsiveness;
- accessibility;
- local interaction behavior;
- validation functions;
- rendering performance;
- executable client behavior.

Jarvis may choose:
- which approved components appear;
- their semantic arrangement;
- which approved data binds to them;
- which typed actions they expose;
- how the workspace evolves as the task changes.

## 4. Recommended architecture — Admonk Workspace Protocol

Create an Admonk-owned declarative contract conceptually similar to A2UI and deliberately mappable to A2UI where useful.

Do **not** lock A2UI itself as the internal Product Foundation protocol yet because:
- v0.9.1 is current production while v1.0 remains candidate/evolving;
- Admonk has domain/permission/provenance requirements that may need first-class semantics;
- the final interoperability boundary should be decided during RQ-13/RQ-25.

Working structure:

```text
Jarvis Task State
      │
      ▼
WORKSPACE PLANNER
      │
      ▼
Admonk Workspace Spec
- surface id / task id
- catalog ids + versions
- approved component tree
- separate data model
- data/source bindings
- typed actions
- resource/deep links
- provenance/evidence references
- responsive/display hints
- state version
      │
      ▼
SCHEMA + POLICY VALIDATOR
      │
      ▼
ADMONK RENDERER
- native design-system components
- local state
- accessibility
- responsive layouts
- progressive rendering
      │
      ▼
Dynamic Jarvis Workspace
```

## 5. Three composition classes

Not every workspace requires generative composition.

### U0 — Deterministic/template workspace

Use a product-defined fixed template when the interaction shape is known.

Examples:
- approval review;
- KPI detail;
- campaign status;
- standard report summary;
- workflow progress.

Advantages:
- zero UI-generation AI cost;
- fastest;
- easiest to test;
- most predictable.

### U1 — Catalog-composed dynamic workspace

Use when the structure genuinely varies by task/context.

Jarvis may compose only from approved catalog components.

Composition can be chosen by:
1. deterministic rule;
2. Reflex Decision Plane when selecting among known patterns/components is sufficient;
3. C1G/C2 declarative planning only when layout/composition is genuinely open-ended within the catalog.

Result remains a schema-validated declarative spec.

### U2 — Registered specialist module

Use when a task requires logic/state too complex for the declarative grammar.

Examples:
- sophisticated design canvas;
- specialized simulation engine;
- complex spreadsheet-like editor;
- third-party tool with its own interactive application;
- advanced domain visualization.

U2 is **registered at build/integration time**, not generated as runtime executable code.

It may be:
- a first-party Admonk module;
- a sandboxed MCP App;
- another governed embedded app/module.

If the task grows into broad durable domain work, route to S2 full specialist dashboard instead.

## 6. Catalog architecture

Use multiple versioned catalogs rather than one giant universal component list.

Conceptually:

```text
Admonk Core Catalog
├ layout
├ text / media
├ cards
├ lists
├ tables
├ chart containers
├ filters / inputs
├ evidence / provenance
├ resource links
├ approvals
├ task/progress
├ comparison
├ timeline
└ semantic graph/zoom primitives

Marketing Catalog
├ KPI comparison
├ campaign performance
├ channel comparison
├ budget allocation
├ content/calendar
└ marketing evidence views

Support Catalog
├ case summary
├ SLA state
├ resolution evidence
└ support workflow views

Future Product Catalogs ...
```

Rules:
- shared semantics belong in Core only when genuinely shared;
- domain products own domain-specific component contracts;
- tenant theme changes presentation, not component semantics;
- every catalog has an explicit version;
- clients advertise supported catalogs/versions/capabilities;
- unsupported components fail safely rather than silently rendering an approximation.

## 7. AI never controls raw styling

Jarvis should not normally emit:
- arbitrary colors;
- arbitrary fonts;
- arbitrary CSS;
- pixel coordinates;
- raw responsive breakpoints;
- accessibility implementation;
- arbitrary animation code.

Instead it supplies semantic intent:

```text
component: KPIComparison
importance: primary
density: compact
relationship: compare
```

and the renderer applies:
- Admonk Design Foundation;
- product theme;
- tenant overlay;
- user preference;
- accessibility/reduced-motion rules;
- current device layout.

This preserves M2-16 design/theme inheritance.

## 8. Structure and data must remain separate

Use the A2UI principle:

```text
Workspace structure
      ≠
Workspace data model
```

Why:
- live data can update without regenerating layout;
- filters can update locally;
- streaming results can hydrate components progressively;
- one structure can bind to changing data;
- fewer model tokens are needed;
- UI becomes easier to cache/test.

Example:

```text
structure:
KPIComparison(meta, linkedin, organic)

data update:
/channels/meta/cpl = 14.20
```

No AI call is necessary merely because a metric changed.

## 9. Progressive rendering contract

RQ-02 requires immediate agency and progressive useful output.

Dynamic workspace rendering should therefore be streamable:

```text
1. create surface / stable skeleton
2. render known components
3. stream data into them
4. add/update approved components as new task structure becomes known
5. finalize task/artifact state
```

Do not wait for a full workspace description before showing anything useful.

Layout changes should preserve visual stability; do not continuously reshuffle the screen as every token/event arrives.

## 10. Action contract

UI components must never directly encode arbitrary infrastructure actions.

Bad:
```text
button.onClick = POST https://n8n.../workflow/42
```

Good:
```text
action:
  capability: marketing.campaign.pause
  target: campaign_123
  intent: request_execution
```

The action then enters the already locked:
- A0/A1/A2/A3 authority classification;
- permission;
- policy;
- approval;
- typed execution;
- audit.

Client-local actions such as filtering, sorting or opening a modal may execute through pre-registered renderer functions.

## 11. State model

Use three state scopes.

### Local interaction state

Examples:
- open tab;
- hovered item;
- draft slider value before commit;
- collapsed panel;
- chart zoom.

Owned locally where possible for speed.

### Workspace/task state

Examples:
- selected campaigns;
- active date range;
- current scenario;
- reviewed evidence;
- pending action proposal.

Shared structurally with Jarvis so voice/text/UI all operate on the same task.

### Domain/durable state

Examples:
- campaign record;
- approved strategy;
- saved report;
- support ticket.

Owned by the specialist domain/system of record.

Do not send every micro-interaction to an AI model.

This mirrors current A2UI/MCP hybrid guidance that local micro-state can remain client-side while meaningful macro-state synchronizes with the coordinating system.

## 12. Persistent Jarvis panel inside S2

RQ-05's owner-approved direction is now part of the architecture:

On desktop/full dashboards, Jarvis should have a persistent right-side panel or equivalent contextual region.

The product sends Jarvis a **structured current-surface context envelope**, not screenshots as the default mechanism:

```text
CurrentSurfaceContext
- tenant
- product
- route
- resource ids
- selected records
- filters/date range
- visible metric/chart ids
- current task/artifact
- available capabilities
- resource/deep links
```

Therefore:
`summarize the presented data`

means:
`summarize the governed dataset represented by the current structured surface context`

rather than:
`guess what pixels on the screen mean`.

## 13. Reflex Decision Plane + dynamic UI

The newly locked Reflex Decision Plane can reduce UI-composition cost.

For many tasks the system only needs bounded decisions such as:
- S0 vs S1 vs S2;
- which known workspace template;
- which comparison component;
- whether a chart or table is more appropriate;
- which domain catalog;
- whether confirmation/review is required.

Those are C1D decisions.

Generative composition is reserved for cases where the arrangement itself is genuinely novel.

Recommended order:

```text
U0 deterministic template?
      yes → render
      no
       ↓
C1D choose from known patterns/components?
      yes → compose
      no
       ↓
C1G/C2 produce declarative catalog-constrained workspace plan
       ↓
schema/policy validation
       ↓
render
```

This directly supports the project's high-speed / low-token / high-delivery objective.

## 14. Security rules

Core S1 workspaces:
- no runtime arbitrary HTML/JS generated by the model;
- no eval;
- no arbitrary network endpoints;
- only allowlisted/catalog components;
- strict schema validation;
- sanitize untrusted text/media;
- typed actions only;
- client functions must be pre-registered;
- server actions pass governed action contracts;
- external/complex apps run in registered sandboxed boundaries;
- respect tenant/domain permissions before data is bound into a surface.

A2UI's catalog security model strongly supports this direction: production clients register trusted components, validate component properties, and reject unsupported/untrusted elements.

## 15. Accessibility and device independence

Accessibility must be enforced by the renderer/component catalog, not improvised by the model.

Requirements:
- semantic accessibility attributes;
- keyboard navigation;
- screen-reader support;
- color-independent state meaning;
- reduced-motion behavior;
- responsive layouts;
- touch-sized controls;
- deterministic fallback if a sophisticated component is unavailable.

A2UI v1 candidate explicitly makes accessibility requirements catalog/renderer responsibilities, which supports this ownership model.

## 16. Semantic zoom / connected-circle implication

The interaction-graph idea should be implemented as approved semantic primitives rather than arbitrary model-drawn graphics.

Possible catalog primitives:
- CapabilityMap;
- DomainNode;
- SourceNode;
- ActivePath;
- EvidenceLink;
- ActionBoundary;
- FocusTransition.

Jarvis supplies semantic relationships/state.

The renderer decides:
- coordinates;
- animation;
- reduced-motion fallback;
- mobile transformation;
- density/clustering;
- transitions.

This allows the screen to react intelligently while keeping motion/visual behavior deterministic and design-controlled.

## 17. Versioning and compatibility

Every workspace payload should identify:
- workspace protocol version;
- catalog id(s);
- catalog version(s);
- required renderer capabilities.

Renderer and backend negotiate compatibility.

If a client lacks a component/capability:
1. use an approved fallback component/template if defined;
2. otherwise fall back S1 → S0 explanation or S2 deep-link;
3. never ask the model to invent an unsupported substitute.

This directly connects to active Foundation M2-19 Version / Compatibility / Migration.

## 18. Evaluation

Jarvis Lab must evaluate dynamic UI on:

### Correctness
- right surface selected;
- right components selected;
- correct data bindings;
- action correctness;
- state synchronization;
- provenance displayed correctly.

### Experience
- first useful render latency;
- layout stability;
- user comprehension;
- fewer conversational round trips;
- direct-manipulation efficiency;
- successful voice/text/UI continuity;
- mobile usability;
- accessibility.

### Reliability
- schema validation failure rate;
- unsupported component rate;
- stale-state conflicts;
- failed action bindings;
- recovery/fallback quality.

### Economics
- UI-planning tokens;
- percentage U0 vs C1D vs generative composition;
- tokens avoided by structure/data separation;
- cost per successful workspace task.

## 19. A2UI disposition

**Adopt the architectural pattern now; evaluate protocol compatibility in the Lab; do not make the current evolving A2UI spec the canonical internal dependency yet.**

Reasons to align:
- catalog-constrained declarative UI;
- structure/data separation;
- streaming/progressive updates;
- capability/catalog negotiation;
- multi-framework renderers;
- strong fit with Admonk design-system ownership.

Reasons not to hard-lock today:
- protocol is still rapidly evolving (v0.9.1 current production; v1.0 candidate as of this research);
- Admonk may require first-class permission/provenance/resource semantics;
- final protocol boundary belongs with M2-19/RQ-13/RQ-25.

## 20. MCP Apps disposition

**Use as an interoperability/custom-module option, not the default rendering architecture for first-party Jarvis workspaces.**

Best fit:
- external MCP-delivered capability UI;
- complex stateful tool modules;
- specialized custom experiences whose logic cannot be expressed efficiently with the core catalog;
- migration/interoperability.

Default first-party Jarvis UI should render natively from Admonk catalog contracts for consistency, performance and theme inheritance.

## 21. Recommended lock

> **RQ-06 — Declarative Catalog-Constrained Dynamic UI**
>
> Jarvis dynamically composes S1 workspaces by producing a validated **declarative workspace specification** against versioned, client-owned component catalogs. It must not generate arbitrary executable production UI code at runtime.
>
> Dynamic UI uses three composition classes:
> **U0 deterministic/template**,
> **U1 catalog-composed dynamic workspace**,
> **U2 registered specialist module**.
>
> The renderer—not the model—owns concrete components, styling, responsive layout, accessibility, animation implementation, local validation and executable client behavior.
>
> Workspace structure and workspace data remain separate so data can stream/update without regenerating the interface.
>
> UI state is split into local interaction state, shared workspace/task state, and domain-owned durable state.
>
> All server-side actions bind to typed Admonk capabilities and pass through the locked authority/permission/approval/audit architecture. UI never contains arbitrary workflow endpoints.
>
> The Reflex Decision Plane should choose bounded surface/templates/components where possible; generative/deep models compose UI only where the structure genuinely requires flexible planning.
>
> Product/domain teams may contribute versioned domain component catalogs while shared components remain deliberately small and semantically shared.
>
> A2UI is a strong interoperability/reference architecture and should be evaluated for compatibility, but its current evolving protocol is not yet locked as Admonk's canonical internal workspace protocol.
>
> MCP Apps are a governed escape hatch for registered complex/custom modules, not the default S1 surface mechanism.
>
> **Jarvis may decide what approved interface the task needs; Admonk software decides what those interface primitives actually are and how they behave.**

## 22. Recommendation

**LOCK RQ-06 as written.**

This gives Jarvis genuinely adaptive UI while preserving product coherence, security, speed, accessibility, domain ownership and provider independence.
# Jarvis Research Question 05 — Conversation vs Dynamic Workspace Surface Routing

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** How does Jarvis know when conversation is no longer the right primary interface?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/interaction architecture research only.

## 1. Decision problem

JX-01 already locks three progressive surfaces:

1. Conversation
2. Dynamic Jarvis Workspace
3. Full specialist dashboard

RQ-05 must define **when Jarvis should move between them** without turning the product into:
- chat for everything;
- a dashboard that merely has a chat box;
- arbitrary AI-generated UI;
- unpredictable screen changes that disorient the user.

The key distinction is:

> **Conversation is the control channel. The workspace becomes the primary work surface when the user must see, manipulate, compare, confirm, or preserve structured state.**

Conversation does not disappear when a workspace appears.

## 2. External research

### OpenAI — optional UI should appear only when visual interaction improves the workflow

Current OpenAI plugin/UI guidance says custom UI should be added when users need to **inspect, compare, edit, confirm, or navigate structured information**. It also distinguishes:
- lightweight inline cards for single-purpose actions or small structured results;
- fullscreen surfaces for richer tasks such as interactive maps, editors, diagrams, and multi-step workflows;
- persistent conversation/composer alongside fullscreen interaction.

Sources:
- https://developers.openai.com/plugins/build/chatgpt-ui
- https://developers.openai.com/plugins/concepts/ui-guidelines
- https://developers.openai.com/plugins/concepts/plugins

Pattern:
**conversation remains available while structured UI takes over the work that is visually/directly easier.**

### OpenAI — conversational app value

OpenAI's current app-design guidance highlights structured interfaces for:
- comparisons;
- tables;
- timelines;
- charts;
- decision-specific summaries;
- visual/structured state.

It argues against recreating an entire product inside chat; expose the specific product powers that materially improve the conversational workflow.

Source:
- https://developers.openai.com/blog/what-makes-a-great-chatgpt-app

Pattern:
**use the smallest structured surface that materially improves comprehension or action.**

### SAP Joule Work

SAP's current Joule Work model separates:
- **Conversations** for expressing intent/exploring goals;
- **Spaces** as dynamic workspaces for simple and complex problem solving.

SAP explicitly describes Conversations as an entry point into Spaces for more complex workflows, while Spaces compose the right data, tools and context around the current goal.

Sources:
- https://www.sap.com/products/artificial-intelligence/joule-work.html
- https://news.sap.com/2026/07/sap-business-ai-release-highlights-q2-2026/

Pattern:
**intent begins conversationally; richer goal-oriented work moves into an adaptive workspace without forcing users back through traditional app navigation.**

## 3. Core conclusion

Do not route surfaces based on:
- model used;
- reasoning depth;
- elapsed time alone;
- how "important" the task sounds.

Route surfaces based on the **interaction shape of the task/result**.

A task needs a workspace when visual/direct manipulation is materially better than repeated conversational turns.

## 4. Surface hierarchy

### S0 — Conversation

Use when the interaction is primarily:
- asking;
- explaining;
- clarifying;
- summarizing;
- deciding one simple thing;
- issuing a simple command;
- receiving a concise result.

Conversation may include lightweight inline structured objects/cards, but the conversation remains the primary surface.

Examples:
- "What was Meta spend last month?"
- "Summarize yesterday's support trend."
- "Open the Arabic campaign."
- "What does this KPI mean?"

### S1 — Dynamic Jarvis Workspace

Use when the task benefits from persistent structured state or direct manipulation.

Typical signals:
- inspect several pieces of evidence;
- compare alternatives/entities/time periods;
- edit a structured artifact;
- confirm consequential details;
- manipulate filters/parameters;
- explore a chart/map/graph/timeline;
- monitor a multi-step task;
- coordinate several capabilities/sources;
- review recommendations with supporting evidence;
- work through a scenario/simulation;
- preserve partial results while continuing the conversation.

The workspace is task-specific and goal-oriented, not a mini version of the whole product.

Conversation remains available as a control channel.

### S2 — Full Specialist Dashboard

Use when the user needs durable, dense, repetitive, administrative or bulk work.

Typical signals:
- large tables/data sets;
- repeated operational workflows;
- bulk selection/actions;
- detailed settings/configuration;
- connector administration;
- permissions/role administration;
- audit/history investigation;
- billing/subscription administration;
- complex CRUD;
- persistent domain navigation across many resources.

Jarvis should deep-link/handoff into the owning product while preserving task/resource context.

## 5. Surface router — independent of cognitive route

Add a separate **surface route** to the task contract.

Conceptually:

```text
Cognitive route: C0 / C1 / C2 / C3
Authority class: A0 / A1 / A2 / A3
Surface route:   S0 / S1 / S2
Responsiveness:  R0 / R1 / R2 / R3 / R4
```

These are independent dimensions.

Examples:

| Request | Cognitive | Authority | Surface |
|---|---:|---:|---:|
| "What was spend last month?" | C0/C1 | A0 | S0 |
| "Compare Meta vs LinkedIn by CPL and hires." | C1/C2 | A0 | S1 |
| "Explain the anomaly in one sentence." | C2 | A0 | S0 |
| "Build a corrective campaign plan and let me adjust assumptions." | C2 | A0 | S1 |
| "Pause these 12 ad sets." | C0/C1 | A2 | S1 for review/confirmation |
| "Manage all connector credentials." | C0/C1 | A2/A3 | S2 |
| "Audit six months of workflow history." | C1/C2 | A0 | S2 |

**How hard the reasoning was does not decide the interface.**

## 6. Workspace trigger model

Jarvis should prefer S1 when one or more of these conditions materially improves the task.

### W1 — Structured inspection

The user must see multiple fields/items/evidence pieces at once.

Examples:
- evidence provenance;
- KPI breakdowns;
- campaign status;
- workflow steps.

### W2 — Comparison

The user is evaluating alternatives, periods, channels, scenarios or recommendations.

Direct visual comparison beats serial conversational descriptions.

### W3 — Direct manipulation

Changing:
- filters;
- parameters;
- selected entities;
- assumptions;
- priorities;
- dates;
- plan elements

would otherwise require several conversational round trips.

### W4 — Confirmation

Consequential actions need exact review of:
- target;
- scope;
- parameters;
- impact;
- approval.

The workspace creates a safer confirmation surface than relying on spoken/text paraphrase alone.

### W5 — Persistent state

The user needs to leave information visible while continuing the task.

Examples:
- chart remains visible while asking follow-up questions;
- recommendation table stays in place while editing the plan;
- workflow progress remains visible.

### W6 — Spatial/relational comprehension

The task is easier to understand through:
- graph;
- map;
- timeline;
- dependency view;
- journey;
- connected capability/source model.

This is where the Jarvis semantic-zoom / interaction-graph hypothesis may be especially valuable.

### W7 — Parallel work/results

Several workstreams or evidence sources are active simultaneously and need to be observed together.

### W8 — Artifact formation

The interaction is becoming a durable object:
- plan;
- report;
- campaign brief;
- approval package;
- simulation;
- schedule;
- decision record.

The artifact should progressively become directly editable/inspectable rather than remain buried in chat history.

## 7. Do not open a workspace merely because you can

Avoid S1 when:
- one concise answer is enough;
- the visual adds no decision value;
- the user explicitly wants a brief spoken/text answer;
- the structured object would only repeat the text;
- the user is on a constrained device and the visual benefit is low.

OpenAI's current UI guidance explicitly recommends optional UI only when visual interaction improves the workflow.

Therefore **visual richness is not a product goal by itself**.

## 8. Conversation never fully disappears

Even when the workspace becomes primary:

```text
WORKSPACE
┌───────────────────────────────────────┐
│ evidence / chart / plan / simulation │
│ direct controls                      │
│ task state                           │
└───────────────────────────────────────┘

Jarvis control channel remains available:
"Exclude TikTok."
"Show only Q2."
"Why did you recommend this?"
"Apply scenario B."
```

This is a fundamental Jarvis interaction rule.

The conversation becomes the **natural-language control layer over the current visible state**.

A user should not need to describe the entire screen back to Jarvis.

## 9. Bidirectional state synchronization

The visible workspace and Jarvis conversation must share one task state.

### UI → Jarvis

If the user changes:
- a filter;
- selected evidence;
- scenario;
- date range;
- draft field;
- entity selection;

Jarvis receives the structured state change.

### Jarvis → UI

If the user says:
"Compare only Q2 and Q3."

Jarvis updates the workspace directly.

This gives Jarvis a **multimodal software interaction loop**, not chat plus static widgets.

The canonical state should remain in the relevant task/artifact/domain contract, not in a model's hidden context.

## 10. The semantic-zoom / connected-circle hypothesis

The owner's interaction-graph idea becomes particularly relevant to the transition from S0 to S1.

Possible flow:

```text
S0 — conversational overview
       ↓
user asks: "Why did CPL rise?"
       ↓
Jarvis acknowledges immediately
       ↓
semantic environment focuses:
Marketing → Acquisition → relevant sources
       ↓
S1 workspace grows from the focused state
       ↓
evidence / comparison / task controls appear
```

Rather than opening an unrelated panel, the workspace can **emerge from the semantic focus** the user just created.

Potential benefit:
- orientation;
- continuity;
- provenance;
- meaningful motion;
- less sense of "AI jumped to another screen."

But RQ-05 does not lock the exact visual form.

JX-03/JX-04 must still test:
- whether semantic zoom aids comprehension;
- what objects/nodes are visible;
- mobile behavior;
- reduced-motion behavior;
- complexity limits;
- multi-domain paths;
- graph interaction vs explanatory animation.

## 11. Workspace composition boundary

RQ-05 establishes **when** a workspace is needed, not **how arbitrary UI is generated**.

Current direction remains:
- Jarvis composes approved primitives;
- it does not invent unrestricted production UI code;
- domain products may contribute domain-specific components/contracts;
- S2 remains the full specialist product.

RQ-06 will define the scalable component grammar/contract.

## 12. Surface persistence

S1 workspaces should have two broad lifetimes:

### Ephemeral workspace

Useful only for the current interaction.

Examples:
- quick comparison;
- temporary visualization;
- one-time confirmation.

May disappear when task context ends.

### Artifact-backed workspace

Represents something durable.

Examples:
- report;
- campaign plan;
- strategy revision;
- approval request;
- saved analysis.

The owning domain should provide a durable resource ID/deep link.

Exact artifact/state promotion rules belong to RQ-22.

## 13. Transition rules

### S0 → S1

Escalate when the task increasingly requires structured inspection/manipulation/persistence.

Do not require explicit user request such as "open a workspace."

### S1 → S0

Collapse back when:
- the structured work concludes;
- only concise follow-up remains;
- user asks to return to conversation.

Preserve resulting artifact/resource references.

### S1 → S2

Escalate to full product when:
- information density becomes high;
- repeated/bulk operations dominate;
- administrative configuration is needed;
- complete domain history/audit is required;
- the specialist product provides a better mature surface.

### S2 → Jarvis

The user should be able to invoke Jarvis while inside the product with current product/resource context preserved.

The journey is not linear.

## 14. Product rule — direct manipulation beats unnecessary prompting

A useful heuristic:

> **If the user can complete a precise next step faster, more safely, or with less ambiguity by manipulating visible structured state than by composing another prompt, surface the relevant control.**

Examples:
- choosing 4 campaigns from a list;
- adjusting budget from 20k to 25k;
- selecting date range;
- confirming recipients;
- turning channels on/off;
- changing simulation assumptions.

Natural language remains available, but should not be forced where familiar controls are superior.

## 15. Product rule — conversation beats unnecessary navigation

The inverse is also true:

> **If the user can express an outcome naturally and Jarvis can safely infer the required workflow, do not make them navigate menus/forms first.**

This creates the desired balance:

```text
Conversation for intent
Workspace for active thinking/manipulation
Dashboard for durable operational depth
```

## 16. Recommended lock

> **RQ-05 — Surface Routing Contract**
>
> Conversation is Jarvis's persistent natural-language **control channel**, but it is not always the primary work surface.
>
> Jarvis chooses the primary surface independently of reasoning depth and action authority:
> **S0 Conversation → S1 Dynamic Jarvis Workspace → S2 Full Specialist Dashboard.**
>
> S1 is preferred when the user benefits materially from structured inspection, comparison, direct manipulation, confirmation, persistent visible state, spatial/relational comprehension, parallel work/results, or artifact formation.
>
> S2 is preferred for dense, bulk, repetitive, administrative, configuration-heavy or audit-intensive specialist work.
>
> The workspace and conversation share the same structured task state bidirectionally: UI changes inform Jarvis, and natural-language instructions update the UI.
>
> Direct manipulation should replace unnecessary prompting when it is faster, safer or more precise; conversation should replace unnecessary navigation when intent can be understood safely.
>
> Jarvis should use the smallest useful surface and must not introduce visual UI merely because it can.
>
> Conversation remains available alongside S1/S2 context so users can continue controlling the visible work naturally.
>
> The semantic-zoom/connected-circle concept is a promising transition model from conversation into workspace, but its exact visual grammar remains a JX-03/JX-04 experiment.
>
> **Conversation is the control channel; structured UI becomes the work surface when the work itself is better seen or manipulated than described.**

## 17. Recommendation

**LOCK RQ-05 as written.**

This preserves JX-01 while defining a scalable, predictable mechanism for moving between its three surfaces.

RQ-06 should next define the component/interaction grammar that makes S1 dynamic without allowing uncontrolled AI-generated application UI.

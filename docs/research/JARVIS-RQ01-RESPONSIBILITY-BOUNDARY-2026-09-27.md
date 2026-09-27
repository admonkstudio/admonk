# Jarvis Research Question 01 — Responsibility & Product Boundary

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** What exactly is Jarvis responsible for?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. This is a product/architecture decision record.

## 1. Decision question

Define the smallest durable responsibility boundary that lets Jarvis:
- feel like one coherent intelligent experience;
- work across subscribed Admonk products;
- use voice, text and dynamic UI;
- reason and orchestrate across domains where authorized;
- invoke real actions safely;
- preserve specialist product authority;
- remain replaceable at the model/runtime/workflow-provider layer;
- scale without becoming one giant application or one giant database.

## 2. Existing Admonk constraints

Current canonical decisions already establish that:
- Jarvis is the adaptive intelligent experience above subscribed/authorized Admonk capabilities;
- Jarvis is not a source of truth;
- specialist products keep their own data, workflows, dashboards, permissions and governance;
- JX-01 locks Conversation → Dynamic Jarvis Workspace → Full Dashboard;
- the Product Platform Foundation owns/shared-contracts tenant, identity, permissions, entitlements, approvals, audit/provenance, connectors, AI credits, navigation and data-governance concerns where semantics are genuinely shared;
- Marketing Hub remains authoritative for marketing strategy, evidence, metrics, plans and marketing workflows;
- shared commercial unity does not require technical collapse.

These constraints strongly disfavor a Jarvis monolith.

## 3. External research findings

### 3.1 SAP Joule Work

SAP's 2026 Joule Work direction describes Joule as the engagement/user-experience layer over enterprise systems: users express goals, while Joule coordinates data, workflows and AI agents across SAP and non-SAP systems. The underlying governed enterprise systems remain the business foundation.

Relevant sources:
- https://www.sap.com/products/artificial-intelligence/joule-work.html
- https://learning.sap.com/courses/exploring-sap-cloud-erp/exploring-sap-joule_f568ea2d-1cdc-457a-81df-eb9177211b9c
- https://news.sap.com/2026/07/sap-business-ai-release-highlights-q2-2026/

Pattern extracted:
**one adaptive engagement/orchestration experience above governed business systems, not AI replacing those systems.**

### 3.2 OpenAI agent architecture

Current OpenAI agent documentation separates the agent loop from the application that owns deployment, tools, state storage, approval decisions and business logic. OpenAI also recommends adding specialists only when the contract genuinely changes, and placing validation/approval around side-effecting tools.

Relevant sources:
- https://developers.openai.com/api/docs/guides/agents
- https://developers.openai.com/api/docs/guides/agents/sdk
- https://developers.openai.com/api/docs/guides/agents/orchestration
- https://developers.openai.com/api/docs/guides/agents/guardrails-approvals
- https://developers.openai.com/api/docs/guides/tools

Pattern extracted:
**models/agents decide and orchestrate within bounded contracts; application-owned code remains responsible for durable state, business authority and side effects.**

### 3.3 Model Context Protocol

The current MCP architecture distinguishes:
- Resources — application-controlled context/data;
- Tools — typed executable capabilities available to models;
- Prompts — user-controlled interaction templates.

Current MCP SDKs also support capability/protocol negotiation and structured tool schemas.

Relevant sources:
- https://modelcontextprotocol.io/specification/draft/server/index
- https://ts.sdk.modelcontextprotocol.io/v2/
- https://java.sdk.modelcontextprotocol.io/latest/client/

Pattern extracted:
**AI-facing capability interfaces can be standardized without transferring ownership of the underlying system or data to the AI host.**

### 3.4 n8n

n8n describes itself as workflow automation connecting applications/APIs, with AI/tool support and human review for consequential tool calls.

Relevant sources:
- https://docs.n8n.io/
- https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/

Pattern extracted:
**workflow engines are execution mechanisms behind governed capabilities; they should not become the product's semantic authority.**

### 3.5 OpenJarvis

The owner-supplied OpenJarvis repository positions itself as a local-first personal-AI framework with agents, skills, traces, local/cloud inference and evaluation.

Source:
- https://github.com/open-jarvis/OpenJarvis

Pattern extracted:
**OpenJarvis may contribute runtime/evaluation techniques, but its runtime does not provide Admonk's tenant, entitlement, domain-authority, approval or product-governance model.**

## 4. Alternatives evaluated

### Option A — Jarvis as the monolithic “company brain”

Jarvis owns copied domain data, business rules, workflows, permissions, connectors, memory, UI and agent runtime.

**Rejected.**

Why:
- creates a second source of truth;
- duplicates specialist semantics;
- increases cross-tenant/data-governance risk;
- tightly couples every product release to Jarvis;
- makes standalone specialist products weaker;
- makes replacement of models/runtimes/workflow engines difficult;
- conflicts with locked Admonk Foundation decisions.

### Option B — Jarvis as the agent runtime

Jarvis is primarily whichever agent framework/runtime is selected.

**Rejected.**

Why:
- confuses product identity with implementation;
- creates vendor/framework lock-in;
- makes the product architecture depend on today's agent technology;
- does not naturally solve tenant, entitlement, approval, source-of-truth or domain-ownership questions.

Agent runtimes remain replaceable implementation components behind Jarvis.

### Option C — Jarvis as a thin chat/voice shell

Jarvis only translates natural language into calls to products.

**Rejected as insufficient.**

Why:
- cannot deliver the locked JX-01 dynamic workspace;
- under-specifies cross-domain orchestration;
- does not own interaction state, progressive feedback or presentation synthesis;
- would feel like a chatbot bolted onto dashboards rather than the primary intelligent experience.

### Option D — Jarvis as the adaptive experience + orchestration plane

Jarvis owns the intelligent user interaction and task orchestration experience, while consuming shared platform and specialist-domain capabilities through governed contracts.

**Recommended.**

This gives Jarvis enough responsibility to feel coherent and powerful without making it the authority for everything underneath it.

## 5. Recommended responsibility model

### Jarvis OWNS

1. **User interaction**
   - text;
   - voice;
   - conversation;
   - dynamic Jarvis workspace;
   - immediate state/progress feedback.

2. **Intent understanding**
   - infer what outcome the user wants;
   - clarify only when material information is missing;
   - classify whether the task is informational, analytical or action-oriented.

3. **Routing and orchestration**
   - choose FAST / DEEP / ACTION path;
   - select appropriate authorized capabilities;
   - coordinate bounded specialists/tools;
   - combine authorized cross-domain results.

4. **Context assembly request**
   - determine which authorized context is needed;
   - request/retrieve that context through governed contracts;
   - preserve provenance when presenting it.

5. **Task/session interaction state**
   - maintain the conversation/task experience needed to continue a Jarvis interaction;
   - preserve relevant tenant/product/resource context during navigation and handoff.
   - Exact durable background-job ownership remains open for the later long-running-task research question.

6. **Presentation synthesis**
   - choose conversation vs approved dynamic workspace primitives;
   - synthesize results into explanations, cards, charts, comparisons, approvals and other approved surfaces;
   - deep-link to the owning specialist product when the dashboard is superior.

7. **Action proposal/orchestration**
   - translate user intent into a typed proposed capability invocation;
   - present approval where required;
   - request execution through the governed capability/action boundary;
   - report the normalized result.

8. **Cross-product experience continuity**
   - feel like the same Jarvis when moving across products;
   - change effective knowledge/capabilities according to tenant, subscriptions, org scope, permissions and policy.

9. **Failure/fallback experience**
   - explain what failed;
   - preserve work where possible;
   - retry/fallback only within approved rules;
   - hand off to the owning dashboard/resource when appropriate.

### Jarvis CONSUMES BUT DOES NOT OWN

- tenant/company identity;
- users and memberships;
- product/SKU entitlements;
- canonical permission decisions;
- organization hierarchy;
- connector credentials;
- data-governance policy;
- approval policy;
- audit/provenance ledger;
- AI usage/credit ledger;
- notification delivery infrastructure;
- source data;
- domain knowledge;
- specialist business semantics;
- specialist workflows/actions;
- provider APIs;
- durable domain resources.

These belong to the Shared Product Platform or the relevant specialist product according to the already locked Foundation ownership rules.

### Jarvis MUST NOT

- become a second source of truth;
- copy every specialist database into a “brain database”;
- independently grant itself permissions;
- hold raw provider credentials in model context;
- let the model directly choose arbitrary infrastructure/workflow identifiers;
- bypass approval requirements;
- let one model/provider define product architecture;
- let n8n, OpenJarvis, MCP or any other implementation technology become the user-facing product identity;
- silently write directly into another specialist product's database;
- replace dashboard/admin surfaces where dense, precise, repeatable structured work is better.

## 6. The core architecture boundary

The clearest statement is:

> **Jarvis is Admonk's intelligent experience and orchestration plane. It owns how users express intent, how authorized capabilities are coordinated, and how results/actions are presented. It does not own the underlying business truth, permissions, credentials, domain semantics or execution infrastructure.**

Or, more compactly:

> **Jarvis owns the experience and orchestration — not the authority or the systems of record.**

Logical model:

```text
USER
  ↓
JARVIS EXPERIENCE & ORCHESTRATION PLANE
- voice / text / dynamic workspace
- intent
- routing
- context assembly
- specialist/tool orchestration
- presentation
- progress/failure/fallback
  ↓
GOVERNED CAPABILITY BOUNDARY
- typed capabilities
- permission
- entitlement
- approval
- provenance/audit
- usage policy
  ↓
SPECIALIST PRODUCTS / SHARED PLATFORM
- domain data
- domain semantics
- domain workflows
- canonical resources
- governed context
  ↓
EXECUTION ADAPTERS
- native APIs
- n8n
- MCP servers
- internal services
- future workflow/job runtimes
  ↓
SYSTEMS OF RECORD / PROVIDERS
```

## 7. Important consequences

### 7.1 n8n becomes replaceable

Jarvis asks for a business capability such as:
`campaign.create_draft`

It should not conceptually ask for:
`run n8n workflow 6832`.

The capability may use n8n today and a native service tomorrow without changing Jarvis's product contract.

### 7.2 Models become replaceable

Jarvis is not GPT, Claude, Gemini, OpenJarvis or any individual agent framework.

Models/runtimes are engines selected behind routing and capability contracts.

### 7.3 Specialist products remain valuable standalone products

Marketing Hub must still work without Jarvis being the only interface.

Jarvis improves discovery, reasoning and orchestration; it does not erase the Marketing operating system underneath it.

### 7.4 Executive/company intelligence becomes scope, not a separate unrelated brain

The current direction implies that executive/company Jarvis is the same Jarvis with authorized cross-product context/capabilities plus company strategy.

The older “Corporate AI Assistant = company brain” language should therefore be reconciled during the planned product-family audit. Existing repositories/implementation can remain until that audit; this research does not authorize a mass rewrite today.

### 7.5 Dynamic UI has a clean ownership model

Jarvis owns composition of approved interaction primitives.

Specialist products own domain-specific data/semantics and may contribute domain-specific components/contracts.

The full dashboard remains owned by the specialist product.

## 8. Scalability test

The recommended boundary survives these tests:

**Add a new product:** expose governed capabilities/context; Jarvis does not need a new identity.

**Replace n8n:** change execution adapter; Jarvis contract remains stable.

**Replace a model:** change routing/runtime implementation; domain contracts remain stable.

**Sell Marketing Hub alone:** Marketing remains useful because business authority stays in the product.

**Add Executive Jarvis:** expand authorized context/capability scope; do not build a second brain.

**Add 100 tenants:** tenant isolation and entitlements remain enforced by platform/domain services, not prompts.

**Add local AI later:** local runtime can serve selected routes without changing product authority.

**Provider outage:** Jarvis can degrade/fallback while the owning system remains authoritative.

## 9. Questions deliberately NOT answered by RQ-01

This decision does not prematurely lock:
- latency targets;
- exact FAST/DEEP models;
- voice provider/runtime;
- routing algorithm;
- dynamic UI component grammar;
- exact context/memory hierarchy beyond existing Foundation locks;
- number/topology of agents;
- durable background-job implementation;
- proactive behavior;
- artifact persistence;
- learning/memory promotion;
- production runtime topology.

Those belong to later questions in the register.

## 10. Recommended lock

> **RQ-01 — Jarvis Responsibility Boundary**
>
> Jarvis is the shared adaptive **intelligent experience and orchestration plane** across subscribed and authorized Admonk capabilities.
>
> Jarvis owns user interaction, intent understanding, routing, authorized context assembly, task orchestration, progressive state/presentation, dynamic workspace composition, action proposal/orchestration, and cross-product experience continuity.
>
> Jarvis consumes shared-platform identity, tenant, entitlement, permissions, approvals, audit/provenance, connectors, governance and AI-economics primitives, and consumes specialist-product data, semantics, workflows and actions through governed contracts.
>
> Jarvis is **not** a source of business truth, permission authority, credential store, specialist database, domain workflow owner or fixed agent/model/workflow-engine runtime.
>
> **Jarvis owns the experience and orchestration — not the authority or the systems of record.**

## 11. Recommendation

**LOCK RQ-01 as written.**

This is compatible with current Foundation locks, JX-01, Marketing Hub's domain boundary, the Jarvis Lab strategy and the strongest external enterprise/agent architecture patterns reviewed on 2026-09-27.

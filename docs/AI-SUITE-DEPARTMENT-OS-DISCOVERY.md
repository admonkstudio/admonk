# Admonk AI Suite — Department Operating System Discovery

**Status:** Brainstorm / discovery candidate — not an approved suite architecture decision  
**Date:** 2026-09-26  
**Owner:** Admonk Studio  
**First concrete discovery implementation:** Marketing Hub / Kalam Marketing

## 1. Hypothesis

A useful long-term suite pattern may be:

**Company control plane → Department packages → Specialized agents → Connectors/tools → Governed work/evidence/performance → Corporate AI Assistant**

Marketing Hub is the first strong example of a department-specific operating system, but the pattern should not be generalized to every department until reusable semantics are proven.

## 2. Candidate platform layers

### A. Organization / control plane
Potential shared concerns:
- tenant/company identity;
- departments;
- users;
- roles and memberships;
- app/product enablement;
- agent capability registry;
- shared policy/approval primitives;
- connector credential ownership;
- audit/event envelope;
- notification channels;
- model-routing policy metadata.

This is a possible future shared admin surface. It is not yet approved as a new product or implementation milestone.

### B. Department package
A package defines domain-specific behavior, such as Marketing:
- strategy hierarchy;
- KPI/metric semantics;
- workflows;
- work/task types;
- evidence requirements;
- default roles;
- agent capabilities;
- dashboards/views;
- connectors;
- approvals;
- domain policies.

The specialist product remains authoritative for these semantics.

### C. Specialized agents
Candidate agent pattern:
- research;
- planning;
- analytics;
- evidence verification;
- content creation;
- execution assistance;
- optimization/QA;
- other domain-specific capabilities.

An agent is not an AI model. It is a governed capability contract.

Candidate agent contract:
- purpose;
- inputs/sources;
- outputs/schema;
- skills/instructions;
- tools;
- permissions;
- approval gates;
- memory/context scope;
- provenance/evidence;
- failure/escalation behavior;
- audit events;
- evaluations.

Model selection should be a separate routing policy so the best available model can be chosen per task based on quality, latency, cost, privacy and availability.

### D. Connectors and delegated tools
Connector model should distinguish:
- organization-owned integrations;
- department-owned integrations;
- user-delegated integrations;
- personal/private scopes.

Examples may include email, calendar, Google Drive, Slack, WhatsApp, provider analytics and operational systems.

Credentials remain server-side and access must follow least privilege and revocation/offboarding rules.

### E. Corporate AI Assistant
The Corporate AI Assistant remains the company-wide intelligence/orchestration layer.

It should not own or directly read every specialist database by default.

Preferred pattern:
- specialist product owns domain truth;
- specialist agents report into their product/workflow;
- product exposes governed APIs/tools/events/summaries;
- Corporate AI Assistant consumes only permitted company-level context;
- cross-product actions use explicit contracts, permissions and audit.

Executive users can therefore receive company-wide direction/status without collapsing specialist systems into one source of truth.

## 3. Candidate provisioning journey

A future authorized admin flow could be:

1. Create organization.
2. Define departments.
3. Define/import users and roles.
4. Enable specialist department packages.
5. Enable appropriate agent capabilities.
6. Connect approved organization tools.
7. Allow user-delegated tool connections where policy permits.
8. Collect department SOPs, policies, templates, KPI definitions and workflow information through guided forms/questionnaires/imports.
9. Configure approvals, evidence rules and communication channels.
10. Activate department workspace.
11. Department users receive role-specific daily work and AI assistance.
12. Verified work/results roll into departmental performance.
13. Corporate AI Assistant receives governed cross-department summaries/events.

## 4. Important boundaries

Do not:
- build one giant app/database just because provisioning is shared;
- let the Corporate AI Assistant become an ungoverned super-admin;
- let agents bypass specialist-product authorization;
- bind one agent permanently to one model;
- duplicate connectors/credentials independently in every agent;
- treat task completion as business/KPI success;
- generalize Marketing-specific entities to every department without evidence.

## 5. Why this matters

The emerging value proposition is larger than “AI chat + dashboards.”

It is:

> Configure how a department operates, connect its real tools and sources of truth, give each role specialized AI assistance, verify the work, measure the outcomes, and provide governed company-level intelligence.

## 6. Current status / next proof

This remains a hypothesis to validate through:
- Marketing Hub PDISC;
- Corporate AI Assistant CAI-P0;
- Support Platform boundaries;
- future concrete cross-product contracts.

No implementation is authorized by this document.


## 7. Reusable specialist-product pattern

The emerging pattern is not "custom-build one app per client."

Instead, each mature specialist product should be reusable across organizations and configured per tenant.

A common high-level product chassis may include:
- **Setup** — tenant, users, roles, connectors, modules, permissions, agents;
- **Knowledge / Training** — policies, SOPs, domain documentation, instructions, templates and approved context;
- **Conversations / Review** — human-agent interactions, outputs, approvals, actions and audit;
- **Analytics** — domain outcomes, operational performance, agent quality and connector/data health.

Each specialist product then adds its own domain model.

Examples:
- Marketing Hub adds strategy, KPIs, campaigns, content, marketing tasks, evidence and channel analytics.
- Support Platform adds conversations, cases, resolution workflows, support knowledge, SLAs and verified outcomes.

The shared chassis should not erase these domain differences.

### Connector principle

Connectors should match the domain's work:
- Marketing may connect website, analytics, social, comments/messages, advertising, email/automation, Drive, calendar and planning/request systems.
- Support may connect support channels, tickets, messaging and customer-resolution systems.

When a channel crosses domains, route by ownership. For example, social engagement may begin in Marketing, but a genuine support case should hand off to Support through a governed contract.

### Productization implication

A future company may subscribe to one or more reusable specialist products and optionally connect them to the standalone Corporate AI Assistant.

The Corporate AI Assistant becomes more valuable as governed specialist products are connected, while each specialist product remains independently useful.

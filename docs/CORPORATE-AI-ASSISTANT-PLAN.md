# Corporate AI Assistant — Recovered Planning & Development Context

**Status:** Under development / planning source of truth  
**Date recovered:** 2026-09-21  
**Owner:** Admonk Studio  
**First operating organization:** Kalam CX  
**Current repository:** TBD — this file is temporarily canonical in `admonkstudio/admonk` until a dedicated product repository is identified or created.

## 1. Why this file exists

The Corporate AI Assistant has been discussed across earlier Kalam Digital Platform / Ask Kalam conversations under several names, including:

- Employee AI
- Employee Assistant
- Internal AI
- Company Intelligence
- Corporate AI Assistant

Those discussions contained important product decisions but were not consolidated into one durable planning file.

This document recovers and normalizes that earlier planning so it does not get lost.

It is a **planning/recovery document**, not permission to implement around the current Support Platform reconstruction milestone.

## 2. Product role

The Corporate AI Assistant is the **company-wide brain / intelligence and orchestration layer** of the Admonk AI Suite.

Current suite model:

- **Corporate AI Assistant** = company brain / intelligence / orchestration layer
- **Support Platform / Ask Kalam** = support/customer-resolution arm
- **Marketing Hub** = marketing arm

The Corporate AI Assistant should understand company context across departments and, where authorized, use specialist products and connected business systems to answer questions, support work, trigger approved actions, and surface proactive intelligence.

It should **not** replace the specialist products or silently become the owner of their data.

## 3. Historical sequence and dependency decisions

### 2026-08-24 planning sequence

Earlier Kalam Digital Platform planning used this broad sequence:

**Foundation → Ask Kalam → Analytics → Kalam Connect / employee identity → employee & marketing automation → Company Intelligence / Internal AI**

The key principle was that the public/customer assistant could launch independently, while the internal employee/company assistant would come later after identity and permissions were ready.

### 2026-08-27 product split

The user explicitly distinguished:

- external **Ask Kalam** for outsiders/customers/candidates;
- authenticated **Employee AI** for staff.

The accepted sequence at that time was:

1. external Customer AI first;
2. internal Employee AI second;
3. SaaS productization after Kalam proved the model.

### 2026-08-28 / 2026-08-29 lock

A stronger dependency was then accepted:

**Do not start Employee AI until the Customer AI scope is complete and user-reviewed.**

A later locked roadmap placed Employee AI after:

**PF0–PF5 foundation → CA1–CA6 Customer AI → PD1 product-design/experience gate → CA7 acceptance → user review → EA1 Employee AI**

The current Support Platform roadmap has since evolved into the Verified Resolution reconstruction, so these milestone names are historical. The durable decision to preserve is:

> **Do not let Corporate AI Assistant work bypass or destabilize unresolved Support Platform foundations.**

## 4. Internal identity model

The Corporate AI Assistant was planned as an **authenticated internal product**, unlike the public Ask Kalam experience.

Historical identity decisions:

- Kalam Connect remains a separate application from Digital Admin / specialist apps.
- They may share a common company identity.
- Approved employee email domains:
  - `@kalam.cx`
  - `@future-group.com`
- A normalized permanent company email was accepted as the practical employee identifier.
- Internal access must include explicit app roles and department/employee context.
- Authentication/identity was expected to support OAuth or equivalent enterprise identity where appropriate.
- Permissions, approvals, and auditability are mandatory.

The assistant must not treat possession of a company email alone as authorization for every company system or action.

## 5. Architecture concepts recovered from earlier planning

The internal assistant architecture was expected to reuse the strong platform patterns discovered while building Customer AI, including:

- organizations / tenants;
- agents;
- managed knowledge;
- conversations / interaction history;
- generic connectors;
- tools / actions;
- identity-aware context;
- role- and department-based permissions;
- approvals;
- audit logs;
- Data Firewall / controlled data access;
- reusable provider adapters;
- security and policy controls.

Earlier Customer AI foundation stages that were expected to benefit the Employee AI included:

- organization/agent model;
- managed knowledge;
- identity/channel-neutral conversations;
- generic connectors/tools;
- Data Firewall;
- handoff/business connectors;
- channel gateway;
- admin/QA;
- deployment/security foundations.

These are architectural inheritances, not a requirement that the Corporate AI Assistant reuse the same UI or product model.

## 6. Planned Corporate AI Assistant capabilities

The following capabilities were explicitly discussed in earlier planning.

### 6.1 Company and personal context

The assistant should be able to understand:

- the company;
- departments;
- employee identity;
- the user's role;
- permitted personal/work context;
- relevant connected systems.

The assistant's response/action scope should change based on who is asking and what they are authorized to access.

### 6.2 Connected company knowledge

The assistant should provide one governed conversational access layer over approved company knowledge and data.

Potential knowledge/data sources discussed included:

- internal company information;
- department-specific knowledge;
- Webflow/internal content where appropriate;
- connected business applications;
- operational data;
- specialist product outputs.

The exact canonical knowledge architecture was not finalized.

### 6.3 Connectors

Earlier department connector examples included:

- Zoho Recruit
- Zoho Marketing Automation
- Zoho Analytics
- Google Workspace / Google services
- Microsoft services
- Freshsales
- Zoom

This list was exploratory/roadmap-level, not a statement that all connectors were implemented.

Connector access must be controlled by role, department, scope, and action sensitivity.

### 6.4 Tools and actions

The assistant was not intended to be read-only forever.

Planned direction included:

- tools;
- actions;
- business-system operations;
- approved automation;
- task execution;
- company workflows.

High-impact actions require explicit permissions and, where appropriate, human approval.

### 6.5 Department-controlled permissions

The assistant should not expose all company information to every employee.

Planned controls included:

- role-based access;
- department context;
- connector-level permissions;
- action-level permissions;
- approval policies;
- audit history;
- data isolation.

### 6.6 Skills

A future Employee AI plan included **Skills** as reusable capabilities for recurring company jobs.

Skills should ultimately combine:
- instructions;
- approved data access;
- tools/actions;
- permissions;
- expected outputs;
- policy/approval requirements.

The exact Skill object/model was not finalized.

### 6.7 Automation

The Corporate AI Assistant was expected to participate in automation rather than only answer questions.

Earlier planning linked the internal assistant to:
- employee automation;
- marketing automation;
- operational workflows;
- approved company actions.

Automation must have clear owners, triggers, permissions, failure handling, and audit evidence.

### 6.8 Proactive intelligence

A later Employee AI concept included **proactive intelligence**.

The intended direction was for the assistant to surface relevant information without requiring the user to manually search every system, such as:
- important changes;
- anomalies;
- pending work;
- risks;
- useful summaries;
- cross-system insights.

The notification/alert model was not finalized.

### 6.9 Company Graph

A **Company Graph** was discussed as a future intelligence structure.

Conceptually it would represent important relationships between:
- people;
- departments;
- systems;
- knowledge;
- processes;
- responsibilities;
- data;
- work;
- decisions.

This was a product concept, not an approved database schema.

### 6.10 Operational memory

A later Employee AI plan included **operational memory**.

The goal was to preserve useful company/work context over time so the assistant could understand recurring work, prior decisions, and operational state without requiring users to repeat everything.

Memory must remain permission-aware, auditable, and distinct from raw source-of-truth data.

### 6.11 Audit and policy controls

Audit/policy controls were consistently part of the internal-assistant direction.

The assistant should be able to explain:
- what source it used;
- what action it attempted;
- what tool/provider performed the action;
- whether the action succeeded;
- who authorized it;
- what data was accessed.

## 7. Relationship with Kalam Connect

Kalam Connect and the Corporate AI Assistant should not be treated as the same application.

Historical direction:

- Kalam Connect remains its own internal employee-facing experience/content application.
- Corporate AI Assistant can use shared company identity.
- Kalam Connect content/context may become one source available to the assistant where appropriate.
- Future internal apps can share the same identity/permission foundation.

The assistant should therefore integrate with Kalam Connect rather than replacing it by default.

## 8. Relationship with Support Platform / Ask Kalam

The Support Platform is the specialist customer-resolution system.

Corporate AI Assistant may eventually ask it for governed information or invoke approved support tools, but the Support Platform remains authoritative for:

- customer conversations;
- customer goals/cases;
- support knowledge;
- support actions;
- verified customer outcomes;
- support/customer analytics.

The Corporate AI Assistant must not bypass Support Platform authorization or write directly into its database.

The current Support Platform is in an active reconstruction program with its own canonical rules and milestones. Those rules take precedence inside that repository.

## 9. Relationship with Marketing Hub

Marketing Hub is the specialist marketing operating/intelligence system.

Corporate AI Assistant may eventually query Marketing Hub for:

- marketing objectives;
- governed KPIs;
- current vs target performance;
- evidence;
- campaign/channel performance;
- analytics;
- strategic risks;
- approved marketing insights.

Example company-level question:

> How is Marketing performing against the 2027 strategy?

The Corporate AI Assistant should obtain the governed answer from Marketing Hub rather than reproducing a competing marketing analytics model.

Marketing Hub remains authoritative for marketing-specific strategy, evidence, metrics, and decisions.

## 10. Data and security principles

Recovered planning consistently points to these rules:

1. **Authenticated internal use** for employee/company functionality.
2. **Least privilege** by role/department/action.
3. **Data Firewall / controlled context retrieval.**
4. **Approval required** for sensitive actions.
5. **Auditability** for reads/actions where material.
6. **Specialist systems remain authoritative.**
7. **No direct cross-product database writes by default.**
8. **Provider access through governed connectors/tools.**
9. **Personal/company context must respect permissions.**
10. **AI is not the authorization boundary.**

## 11. SaaS / ownership direction

Historical ownership decisions:

- Admonk owns the reusable platform/product.
- Kalam is the first client / live proving organization.
- Initial live implementation can use Kalam-owned provider accounts.
- Broader Admonk-owned SaaS onboarding/platformization is deferred until the Kalam implementation proves the model.

This matches the current Admonk AI Suite direction.

## 12. Historical terminology normalization

Use the following terminology going forward unless product discovery changes it:

| Historical term | Current normalized term |
|---|---|
| Employee AI | Corporate AI Assistant |
| Employee Assistant | Corporate AI Assistant |
| Internal AI | Corporate AI Assistant |
| Company Intelligence | Corporate AI Assistant intelligence layer |
| Customer AI / Ask Kalam | Support Platform / Ask Kalam |
| Kalam marketing analytics/strategy app | Marketing Hub |

Do not delete the historical terms from old documentation; map them to the current product vocabulary.

## 13. Recovered roadmap concepts

### Previously approved historical dependency

Customer/support foundations first, then Corporate/Employee AI.

### Previously discussed Corporate AI scope

The Employee AI direction included:

- company/personal context;
- connectors;
- tools/actions;
- department permissions;
- approvals;
- Skills;
- automation;
- proactive intelligence;
- Company Graph;
- operational memory;
- audit/policy controls.

### Proposed normalized roadmap — NOT YET APPROVED

The following is a 2026-09-21 normalization of the recovered ideas. It is **not** a previously approved milestone plan and should not be treated as implementation authorization.

#### CAI-P0 — Recovery & Scope Freeze
- consolidate historical planning;
- identify/create repository;
- establish AGENTS/status/tasks;
- confirm v1 users/jobs;
- confirm product boundary;
- define current integrations and dependencies.

#### CAI-P1 — Identity & Permissions
- employee identity;
- company domains/SSO;
- roles/departments;
- permissions;
- audit foundation.

#### CAI-P2 — Knowledge & Context
- company knowledge;
- personal/department context;
- governed retrieval;
- source lineage.

#### CAI-P3 — Read-Only Company Intelligence
- Q&A across approved systems;
- summaries;
- cross-system read-only insights;
- source citations/provenance.

#### CAI-P4 — Tools, Actions & Approvals
- governed actions;
- department tools;
- approval flows;
- idempotency/result confirmation;
- audit.

#### CAI-P5 — Automation & Proactive Intelligence
- recurring jobs;
- proactive alerts;
- operational summaries;
- exception/risk detection.

#### CAI-P6 — Company Graph & Operational Memory
- governed relationship model;
- organizational context;
- permission-aware operational memory;
- decision/history context.

#### CAI-P7 — Cross-Product Orchestration
- Marketing Hub tools;
- Support Platform tools;
- cross-product company workflows;
- shared suite contracts.

#### CAI-P8 — Productization
- reusable tenant onboarding;
- connector configuration;
- organization administration;
- SaaS controls;
- portability beyond Kalam.

## 14. Open questions that must not be guessed

The following were not fully settled in the recovered planning:

- dedicated repository name/location;
- exact current v1 user group;
- first three employee jobs-to-be-done;
- UI/application shell;
- whether Kalam Connect embeds the assistant or only shares identity/context;
- final identity provider/SSO approach;
- exact Company Graph schema;
- exact memory model;
- final Skill schema;
- connector priority order;
- which systems are read-only vs actionable in v1;
- approval policy by action;
- automation runtime ownership;
- notification model;
- current implementation status, if any, outside the repositories presently connected;
- commercialization timing.

Mark these as unresolved until explicitly decided.

## 15. Current next action

The suite-level issue remains:

**Identify or create the dedicated Corporate AI Assistant repository.**

Before creating it, verify whether an existing Kalam/Admonk repository already contains current implementation work.

If no current repository exists, create a dedicated product repository and migrate this document into it as the starting planning record.

Until then, this file is the recovered canonical planning source.


## 16. Existing implementation verification

A focused GitHub review was completed on 2026-09-21.

### Evidence found

Historical Kalam Digital Platform commits document the Employee AI architecture and roadmap:

- `80e2f9ba3150ec7e824c57afef02fd371a7fb236` — Customer Agent Platform foundation; explicitly describes Employee AI as a later product and states that the work was documentation/foundation sequencing rather than Employee AI implementation.
- `a49b9a954a71e3ae994ac78d8a583c7bf7b91142` — locked PF/CA/PD/EA roadmap; documents EA1 Employee AI Foundation and later intelligence layers.

### Evidence not found

Within the currently connected GitHub estate:
- no dedicated Corporate/Employee AI repository was identified;
- no Employee AI / Internal AI / Company Intelligence implementation branch was found in `kalamcx/kalam-digital-platform`;
- current branch naming is Customer AI/reconstruction focused;
- no active default-branch Corporate AI Assistant implementation was found.

### Current conclusion

The recoverable state is **planning + reusable architectural foundations**, not a verified Corporate AI Assistant implementation.

This conclusion is limited to currently connected GitHub repositories. Local/unconnected/private work must still be checked before declaring that no implementation exists anywhere.

# FOUNDATION-M3-11 — Support / Operations Model and Tenant-Visible Health

**Date:** 2026-09-28  
**Status:** RESEARCH COMPLETE — OWNER DECISION PENDING  
**Milestone:** FOUNDATION-M3 — Main Product Master Plan  
**Method:** quick internal scan → two high-value sources → two scenarios → challenge → synthesis  
**Implementation authority:** None

## Internal scan

Already locked:
- M2-08: onboarding evolves into shared Setup & Health;
- M2-09: shared integration control plane owns reusable connection administration;
- M2-12: shared event/audit/provenance envelope;
- M2-13: shared Notification Plane handles suite inbox/preferences/routing/delivery health;
- M2-19A: Platform Operator is a separate authorization domain; production privilege is JIT; tenant business content requires scoped Support Access Grants; no silent impersonation; support access is auditable and tenant transparency is expected;
- M2-20: Admonk Control Room is a separate Platform Operations runtime from tenant application runtimes and Platform Management; telemetry/observability is operational infrastructure;
- M3-07: Admonk One is the customer-facing administration + Setup & Health center;
- M3-09: products retain domain authority and expose governed capability/health signals;
- M3-10: lifecycle transitions and dependency-aware offboarding are coordinated through Setup & Health.

The remaining M3-11 question is:

> What should customers see about Admonk health and support, how should they diagnose/escalate issues, and where should the boundary sit between customer-visible health and internal operator telemetry/control?

## External source 1 — Microsoft 365 Service Health

Microsoft 365 exposes service health inside the tenant admin center. Administrators can see:
- current health by subscribed service;
- active incidents/advisories;
- issues detected in the customer's environment that require customer action;
- incident history;
- issue reporting/escalation when the problem is not already represented.

Microsoft also distinguishes the authenticated tenant-aware Service Health experience from a public fallback status channel.

Sources:
- https://learn.microsoft.com/en-us/microsoft-365/enterprise/view-service-health
- https://learn.microsoft.com/en-us/services-hub/microsoft-engage-center/health/incident-readiness/ir-m365

Admonk implication:
- customer-visible health should be scoped to what that tenant actually uses;
- platform/provider incidents and tenant-actionable configuration problems should not be mixed into one undifferentiated status;
- known incidents should connect directly to status/troubleshooting rather than forcing duplicate support tickets;
- support escalation should remain available when the observed issue is not explained by known health events.

## External source 2 — Google Cloud Personalized Service Health

Google Cloud provides Personalized Service Health scoped to a project or organization. It exposes:
- active and past relevant incidents;
- impacted products and locations;
- incident state and relevance;
- latest updates;
- diagnosis/workaround information where available;
- alerts, logs and an API;
- organization-level aggregation across projects.

Google distinguishes personalized health from the broad public service-health dashboard.

Sources:
- https://docs.cloud.google.com/service-health/docs/overview
- https://docs.cloud.google.com/service-health/docs/view-events

Admonk implication:
- health should be relevance-filtered rather than showing every platform event to every tenant;
- health is not just uptime: it should communicate scope, impact, timeline, mitigation and action;
- tenant-visible health can serve as both human admin UI and structured signal for notifications/Jarvis/support workflows;
- aggregate organization health and per-product/resource drill-down can coexist.

## Scenario A — Traditional Support Portal + Generic Status

Admonk provides:
- a public red/amber/green status page;
- a generic support-ticket area;
- separate product troubleshooting;
- internal operators use Control Room independently.

Customer-visible health is mostly global platform uptime.

### Strengths
- simple to build;
- clear separation between support and operations;
- low risk of exposing operational detail;
- familiar SaaS pattern.

### Challenge
- does not tell a tenant whether *their* Marketing Hub, Support product, integrations, automations, Jarvis capabilities or credits are healthy;
- creates unnecessary support tickets for configuration/readiness/provider issues already knowable by the platform;
- forces customers to correlate product, connector, lifecycle and service incidents themselves;
- makes Setup & Health much less useful after onboarding;
- duplicates diagnostics across products;
- encourages support staff to become the translation layer between internal telemetry and customers;
- provides weak explainability during cross-product failures.

This is acceptable for a small standalone SaaS product but underuses Admonk's shared platform.

## Scenario B — Layered Health + Guided Support, with Internal Control Room Kept Separate

Use three distinct layers.

### Layer 1 — Public Admonk Service Status

Purpose:
- broad Admonk-operated incidents or maintenance affecting many customers;
- accessible even when tenant login/admin surfaces are unavailable.

Shows:
- affected public services/products;
- incident status;
- update timeline;
- broad workaround/communication where appropriate.

Does **not** expose:
- tenant names;
- tenant-specific telemetry;
- internal architecture/secrets;
- detailed security-sensitive diagnostics.

### Layer 2 — Tenant-Specific Setup & Health in Admonk One

This is the main customer/admin health surface.

It aggregates only health relevant to the tenant's subscribed products and authorized scope.

Health dimensions should include, where applicable:
- product operational state/readiness;
- shared integration/connector health;
- product-specific connection health;
- provider/API degradation relevant to that tenant;
- automation/durable-task health summaries;
- notification/delivery health;
- AI/Jarvis capability availability;
- AI-credit/budget conditions that can block work;
- compatibility/migration issues;
- data-sync freshness;
- lifecycle/offboarding status;
- security/policy/configuration items requiring customer action;
- active Admonk incidents relevant to the tenant.

Each issue should answer:
1. **What is affected?**
2. **Who/what is impacted?**
3. **Is Admonk working on it, is a provider involved, or does the tenant need to act?**
4. **What can the customer do now?**
5. **When was the status last updated?**
6. **Where is the authoritative owning product/resource?**
7. **Can the issue be escalated or linked to support?**

Customer-visible severity should describe customer impact, not internal engineering severity.

### Layer 3 — Internal Admonk Control Room

The Control Room remains a separate platform-operations surface.

It can contain deeper:
- infrastructure/service telemetry;
- queue/backlog/concurrency data;
- connector runtime internals;
- deployment/version/migration state;
- cross-tenant aggregates;
- provider failure details;
- security/operator evidence;
- incident correlation;
- cost/resource telemetry;
- platform diagnostic tools.

It must not become directly exposed to customers.

Tenant health is a purpose-built projection of safe, relevant, explainable operational facts from Control Room/product health contracts.

### Guided support model

Admonk One should make support contextual rather than a disconnected ticket form.

Flow:
1. user/admin sees a health problem or starts “Get help” from the current product/resource;
2. Admonk pre-fills tenant, product, resource-link, health signals, lifecycle state and safe diagnostic context;
3. known incident/configuration issue is shown first where applicable;
4. self-service remediation or owner-product deep link is offered when safe;
5. if unresolved, create/escalate a support case with the diagnostic context attached;
6. support case status remains visible in Admonk One/shared notification surfaces;
7. if tenant business content is required, operator requests a scoped Support Access Grant under M2-19A;
8. customer/admin can see active/recent support-access grants and their purpose/expiry where policy exposes them;
9. privileged work produces reconstructable audit/access receipts.

Jarvis may:
- explain a health item;
- summarize known impact;
- guide approved remediation;
- prepare/escalate a support case;
- explain what access is being requested.

Jarvis may **not**:
- grant operator privilege;
- approve support access;
- reveal secrets;
- bypass product/tenant permissions;
- claim an incident is resolved without authoritative health evidence.

### Health ownership contract

Shared Platform owns:
- aggregated tenant health model;
- health taxonomy/presentation contract;
- public/platform incident projection;
- support-case linkage;
- shared integration/notification/credits/lifecycle health;
- safe correlation and routing.

Specialist products own:
- domain-specific health semantics;
- product readiness;
- domain workflow health;
- product-specific failure/remediation guidance;
- resource-level impact facts.

Providers/connectors contribute:
- source status/errors/quota/auth health through governed connector contracts.

Control Room owns:
- internal operational diagnosis, correlation and operator workflow.

### Suggested customer-facing health states

Use a small normalized vocabulary:
- **Healthy**
- **Attention needed**
- **Degraded**
- **Unavailable**
- **Setting up / Paused / Offboarding** for lifecycle conditions rather than pretending these are outages.

Avoid showing internal labels such as queue saturation classes, shard names or deployment units.

### Incident/support linking

- known platform incident → show incident, impact and updates; avoid requiring duplicate ticket;
- tenant-specific issue with known remediation → show guided action;
- unexplained issue → allow report/escalation;
- existing support case → link health event and case rather than creating duplicates;
- post-incident/root-cause material may be attached where appropriate;
- historical health should remain available for meaningful troubleshooting/audit windows defined later.

### Strengths
- gives customers useful transparency without exposing Control Room;
- turns Setup & Health into a durable post-onboarding value surface;
- lowers unnecessary support volume;
- improves support context and time-to-diagnosis;
- handles provider, platform, product and tenant-action issues distinctly;
- supports multi-product customers without forcing manual correlation;
- aligns with M2-19A support-access safeguards;
- creates structured health context Jarvis can explain safely.

### Challenge
- health normalization can hide product-specific nuance if over-centralized;
- tenant-level impact correlation may be imperfect;
- false-positive health alerts could create noise;
- exposing too much diagnosis can leak security/architecture details;
- support-access transparency needs careful capability design;
- users may confuse provider outages, Admonk outages and their own configuration.

Mitigation:
- keep product-owned diagnosis underneath a small shared presentation contract;
- always label **source/owner of issue** and **who must act**;
- distinguish observed facts from inferred impact;
- expose confidence/freshness where correlation is not certain;
- require security review of customer-visible diagnostic fields;
- keep Control Room and privileged workflows separate.

## Synthesis

Choose **Scenario B**.

Admonk should provide:
1. a simple public service-status layer for broad platform incidents;
2. a tenant-aware **Setup & Health** center in Admonk One for relevant product/integration/configuration/incident health;
3. contextual guided support linked directly to health/resource context;
4. a separate internal **Admonk Control Room** for deep operational telemetry and privileged workflows.

The customer should never need Control Room access to understand whether Admonk is healthy for them.

And the support team should not need to manually reconstruct context that Admonk already knows safely.

## Recommended lock

> **M3-11 — Layered Tenant Health + Contextual Guided Support**
>
> Admonk separates public platform status, tenant-specific health and internal platform operations into three distinct layers.
>
> Admonk One / Setup & Health is the tenant's authoritative administration surface for health relevant to its subscribed products, integrations, automations, lifecycle, usage constraints and active incidents.
>
> Specialist products retain domain-specific health meaning and remediation; Shared Platform aggregates them through a small health contract.
>
> Health issues clearly identify affected scope, impact, source/owner, who must act, last update, remediation and escalation path.
>
> Support begins from product/resource/health context where possible, carrying safe diagnostics into the case instead of forcing customers to restate known information.
>
> Known incidents and known self-remediable conditions should be shown before creating duplicate support cases.
>
> Admonk Control Room remains internal and materially richer than the tenant health view.
>
> Access to tenant business content for support remains scoped, time-bound, authorized and auditable under M2-19A, with customer-visible support-access transparency where applicable.
>
> Jarvis may explain, guide and escalate health/support issues but never becomes the authority for incident state or privileged support access.
>
> **Show customers the health they need to act; keep operator complexity behind the boundary.**

**Recommendation:** LOCK Scenario B.

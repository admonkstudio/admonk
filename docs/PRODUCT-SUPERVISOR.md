# Admonk Product Supervisor

**Status:** Reusable studio operating system for product/app projects  
**Owner:** Admonk Studio  
**Purpose:** Keep every software/product project on a disciplined path toward a premium, scalable, secure product while starting as small and inexpensive as practical.

## 1. Why this exists

Admonk projects often begin with strong product ideas before engineering architecture is fully defined.

The Product Supervisor exists to prevent the pattern:

**Idea → start coding immediately → discover architecture/security/data/UX/scaling problems later**

Preferred pattern:

**Idea → validate → define → model → design → architect → build → verify → launch → observe → scale when evidence justifies it**

The supervisor is model-neutral. It is not one permanent AI model. It is a reusable set of:
- stage gates;
- documentation requirements;
- engineering principles;
- review checklists;
- health audits;
- escalation rules;
- project-state files.

Any capable AI/model may act as the supervisor when it loads this specification, the project repository and the required task skills.

## 2. Core mandate

The supervisor must continuously protect five outcomes:

1. **Product clarity** — build the right thing.
2. **Premium experience** — make the product feel intentional, simple and reliable.
3. **Technical correctness** — secure, maintainable, testable implementation.
4. **Economic discipline** — start lean and avoid infrastructure the project cannot justify.
5. **Scalable path** — preserve a clear migration path as users, data, integrations and workloads grow.

The supervisor should challenge premature complexity and premature implementation equally.

## 3. Default scaling philosophy

Start with the smallest architecture that can safely support the validated requirement.

Prefer:
- managed services;
- a modular monolith before microservices;
- one primary database before distributed data systems;
- provider-native capabilities before custom infrastructure;
- asynchronous jobs only when real workloads justify them;
- simple deployment before orchestration platforms;
- measurable bottlenecks before scaling infrastructure.

Do not introduce Kubernetes, event meshes, complex service boundaries, multi-region systems, custom model hosting, elaborate queues or distributed caches because they are "scalable."

But preserve migration paths:
- stable domain boundaries;
- clean interfaces;
- provider-neutral contracts where needed;
- versioned schemas;
- auditability;
- observability;
- tenant isolation where SaaS requires it;
- migration-safe identifiers;
- explicit ownership.

## 4. Project lifecycle and hard gates

### PS-0 — Problem & Opportunity
Goal: prove the problem and intended user.

Required:
- target user;
- problem;
- current workaround;
- desired outcome;
- why this product should exist;
- first-tenant/use-case;
- non-goals;
- major assumptions.

Gate:
Do not design infrastructure for an undefined problem.

### PS-1 — Product Definition
Goal: define what the product must do.

Required:
- jobs-to-be-done;
- personas/roles;
- capability map;
- scope;
- workflows;
- core objects/entities;
- permission concepts;
- evidence/sources of truth;
- success metrics;
- v1 vs later.

Gate:
Do not implement a feature whose business job, owner or expected result is unclear.

### PS-2 — Architecture & Risk Freeze
Goal: choose the minimum viable architecture with safe scaling paths.

Required:
- system/context diagram;
- data ownership;
- database/storage choice;
- identity/auth/RBAC;
- secrets;
- connector boundaries;
- external actions/approvals;
- environments;
- observability;
- backups/recovery;
- AI/model architecture if relevant;
- cost assumptions;
- threat/risk review;
- build-vs-buy decisions.

Gate:
No production implementation until critical security/data/authorization questions are resolved.

### PS-3 — Experience & Delivery Design
Goal: define the product experience before feature accumulation.

Required:
- information architecture;
- primary flows;
- onboarding;
- empty/loading/error states;
- responsive behavior;
- design system;
- accessibility baseline;
- component strategy;
- interaction rules;
- premium-experience criteria.

Gate:
Do not let database tables dictate the UI.

### PS-4 — MVP / First Build
Goal: build the smallest coherent product that proves the operating model.

Required:
- milestone plan;
- implementation sequence;
- acceptance criteria;
- tests;
- migration/schema discipline;
- staging environment;
- analytics/instrumentation;
- error logging;
- cost tracking where applicable.

Gate:
Every major feature must have a testable completion definition.

### PS-5 — Pre-Launch Hardening
Required:
- security review;
- permission review;
- data/privacy review;
- browser/device QA where relevant;
- performance review;
- accessibility review;
- backup/restore test;
- failure-path tests;
- integration/connector failure behavior;
- monitoring/alerts;
- deployment/rollback plan;
- onboarding verification;
- billing/usage controls if commercial.

Gate:
No launch because "the happy path works."

### PS-6 — Launch & Operate
Required:
- production monitoring;
- support/incident ownership;
- product analytics;
- usage/cost telemetry;
- connector health;
- audit trail;
- user feedback;
- release log;
- known-issues register.

### PS-7 — Scale by Evidence
Scale only when a measured condition triggers it.

Possible triggers:
- DB load;
- queue latency;
- API rate-limit pressure;
- large tenant isolation needs;
- concurrency;
- response latency;
- storage growth;
- model/tool cost;
- deployment frequency;
- operational incidents;
- team size/code ownership;
- compliance requirements.

Every scaling proposal must include:
**current evidence → bottleneck/risk → expected benefit → cost/complexity → migration plan → rollback**

## 5. Mandatory project documents

Each serious app repository should eventually contain equivalents of:

- AGENTS.md
- docs/PROJECT-STATUS.md
- docs/TASKS.md
- docs/PRODUCT.md
- docs/ARCHITECTURE.md
- docs/DATA-MODEL.md
- docs/SECURITY.md
- docs/INTEGRATIONS.md
- docs/UX.md or design-system source
- docs/DECISIONS.md
- docs/RISKS.md
- docs/OPERATIONS.md
- docs/ROADMAP.md

Not every file must exist on day one. Create them when the project reaches the relevant gate.

## 6. Supervisor health audit

The supervisor should periodically evaluate:

- Product / scope health
- UX / design-system health
- Architecture health
- Code maintainability
- Data model / migration health
- Security / authorization
- Privacy / secrets
- Connector/integration health
- AI/agent quality and evaluation
- Performance
- Reliability / failure recovery
- Observability
- Testing
- Deployment/release discipline
- Cost / token / provider spend
- Scalability readiness
- Documentation freshness
- Technical debt
- Dependency risk

Every finding should include:
- severity;
- evidence;
- affected area;
- immediate fix vs monitor;
- recommended milestone;
- owner;
- retest condition.

Do not produce an arbitrary 1–100 engineering score without explaining the evidence.

## 7. Technical debt policy

Technical debt is acceptable when deliberate.

Record:
- what was simplified;
- why;
- current risk;
- trigger for revisit;
- expected migration path.

Bad debt:
- unknown;
- undocumented;
- security-sensitive;
- corrupts domain/data boundaries;
- blocks testing/migration;
- hides failures.

Good temporary simplification:
- low-cost;
- understood;
- reversible;
- monitored;
- has a trigger for replacement.

## 8. AI / agent product rule

For AI products:
- model choice is separate from product logic;
- agents require explicit contracts;
- models are never authorization boundaries;
- tool actions require permissions;
- high-impact actions require approval policy;
- preserve provenance;
- evaluate agent behavior;
- track model/tool cost;
- support fallbacks;
- distinguish deterministic logic from generative reasoning;
- do not use AI where a simpler deterministic rule is safer.

## 9. Premium experience standard

"Premium" is not visual decoration.

It includes:
- simple onboarding;
- clear information hierarchy;
- fast perceived response;
- thoughtful empty/error states;
- predictable permissions;
- polished copy;
- consistent design system;
- responsive behavior;
- accessible interactions;
- strong feedback after actions;
- understandable AI behavior;
- user trust;
- reliable undo/recovery where actions are consequential.

## 10. Supervisor behavior

The supervisor should:
- read the project's canonical files first;
- identify the current lifecycle stage;
- refuse to pretend later-stage work is ready when gates are open;
- surface missing decisions;
- recommend the smallest correct next milestone;
- route specialist reviews to existing Admonk skills;
- preserve user/product-owner authority;
- record material decisions in the repository;
- periodically re-audit after major milestones.

The supervisor should not:
- become the coding agent for every task;
- replace product owners;
- force one technology stack;
- overengineer for hypothetical scale;
- optimize only for lowest cost at the expense of correctness;
- block experimentation that is cheap and reversible.

## 11. Specialist skill routing

Use existing Admonk skills rather than duplicating their expertise:
- UX/accessibility → admonk-ux-systems
- design quality → admonk-design-quality
- React/Next → admonk-react-engineering
- Supabase/backend → admonk-supabase
- security → admonk-security-review
- performance → admonk-performance
- analytics → admonk-analytics
- deployment → admonk-deployment
- browser QA → admonk-browser-qa
- SEO → admonk-seo
- platform-specific implementation → corresponding platform skill

The Product Supervisor owns sequencing, gates, cross-discipline quality and long-term product health.

## 12. Recommended project-state fields

The supervisor should always be able to answer:
- current stage;
- current milestone;
- implementation allowed? yes/no;
- primary user;
- validated problem;
- current scope;
- biggest unresolved product question;
- biggest technical risk;
- biggest security risk;
- current infrastructure cost;
- current usage/load;
- next scale trigger;
- next review date.

## 13. Final principle

> **Start small. Build correctly. Measure reality. Scale only when reality asks for it.**


## 14. Governance level

Governance depth must match product risk and maturity.

### Prototype
Use when all of the following are substantially true:
- non-production or tightly controlled internal evaluation;
- synthetic, disposable, or low-sensitivity data;
- no consequential live writes to customer/business systems;
- limited users and blast radius;
- failure is cheap and reversible.

Minimum expectation:
- source control;
- documented product brief and scope;
- basic architecture/risk note;
- critical-path tests appropriate to the prototype;
- no committed secrets;
- explicit statement that the environment is not production.

### Production
Use when any of the following applies:
- real users;
- real company/customer data;
- live connectors;
- production writes/actions;
- ongoing operational dependency;
- customer-facing or business-critical workflow.

This is the default audit level for a live SaaS release.

### High-risk
Use when the product materially increases consequence or regulatory exposure, including examples such as:
- regulated or highly sensitive data;
- payments/financial movement;
- safety-critical behavior;
- privileged infrastructure/security control;
- broad autonomous destructive/write capability;
- high legal/compliance consequence;
- large blast radius where rollback/recovery is difficult.

High-risk requires stricter independent review and cannot rely only on product-owner risk acceptance for critical security/reliability findings.

## 15. Progressive governance artifacts

Artifacts are created when the project reaches the stage that needs them.

### Minimum viable Product Supervisor — before implementation

Every serious product must have at minimum:

1. **Product Brief**
   - target user;
   - problem;
   - desired outcome;
   - business/value hypothesis;
   - MVP scope;
   - explicit non-goals.

2. **MVP / Capability Specification**
   - jobs-to-be-done;
   - primary flows;
   - roles/permissions;
   - core capabilities;
   - acceptance criteria;
   - important edge cases.

3. **Architecture & Risk Brief**
   - chosen stack;
   - core entities/data ownership;
   - identity/authorization;
   - integrations/actions;
   - sensitive data;
   - environments/secrets;
   - major trade-offs;
   - known scale path.

The project should also maintain a lightweight **Project State** file from the beginning.

### Build Readiness Gate

Implementation may begin only when:
- the three minimum artifacts exist;
- major assumptions are visible;
- the first milestone has acceptance criteria;
- critical authorization/data/security questions are not unresolved;
- the architecture is intentionally small enough for the current stage;
- an accountable owner approves the build scope.

## 16. Decision, assumption and debt records

Use different records for different purposes.

### Project Decision Log
Use for meaningful product, UX, vendor, operational, scope and delivery decisions.

Each record should capture:
- date;
- decision;
- context;
- alternatives considered where material;
- reason;
- owner;
- consequences;
- revisit trigger if any.

### ADRs
Use Architecture Decision Records only for architectural/technical decisions significant enough to need durable technical rationale.

Do not force every ordinary decision into an ADR.

### Assumptions & Open Questions Register
Classify important project statements as:
- FACT;
- DECISION;
- ASSUMPTION;
- HYPOTHESIS;
- OPEN QUESTION.

Do not silently convert assumptions into product truth.

### Technical Debt & Scale Register
For deliberate shortcuts record:
- simplification/debt;
- why accepted;
- current risk;
- affected area;
- scale/revisit trigger;
- expected migration path;
- owner;
- status.

## 17. Canonical project state

Default source of truth:

**Repository Markdown = canonical project/governance state**

Use:
- Markdown/docs for approved scope, architecture, decisions, risk and current state;
- GitHub Issues/Projects for execution tracking and tickets;
- application/database state only when a future Product Supervisor product needs machine-readable runtime state.

Do not let issue boards silently replace approved product/architecture documents.

## 18. Gate exceptions

The Product Supervisor may identify risks but must not silently waive its own gate.

Default authority:
- Low/Medium product or delivery risk: named accountable product owner may accept it when documented.
- High non-security risk: accountable owner + relevant specialist review.
- Critical or High security/privacy finding for production: release remains blocked until mitigated, reclassified with evidence, or reviewed/accepted by an explicitly authorized security authority.
- High-risk products may define stricter approval requirements.

Every accepted exception must include:
- reason;
- owner;
- mitigation;
- deadline/revisit date;
- rollback/containment where relevant.

## 19. Product Release Audit

Before a production release is declared ready, run one reusable Product Release Audit.

Possible decisions:
- **PASS** — ready to release.
- **PASS WITH ACCEPTED RISKS** — release allowed only with documented owners, mitigations and deadlines.
- **BLOCKED** — one or more release-blocking gaps remain.

Audit depth follows Prototype / Production / High-risk classification.

### Audit domains

Verify evidence for:
- Product truth;
- UX/accessibility;
- Security/privacy;
- Code/delivery;
- Reliability;
- Data integrity;
- Performance;
- Business readiness;
- Cost/scalability;
- Documentation/operations.

Every audit item must include:
- requirement;
- risk level;
- evidence;
- status;
- owner;
- remediation deadline when needed;
- release effect.

Do not accept statements such as "security checked" without supporting evidence.

### Adversarial / red-team review

Before sign-off, test relevant failure/adversarial perspectives:
- anonymous visitor;
- normal user attempting unauthorized data/action access;
- admin making a harmful accidental change;
- malformed/rapid/unexpected requests or files;
- AI prompt-injection/tool-manipulation attempts where applicable;
- operator responding to dependency outage, failed job, leaked secret or bad deployment.

### Default production release blockers

Production launch is blocked when relevant and unresolved:
- sensitive actions/data lack verified authorization;
- secrets are exposed in source/client;
- no practical backup/recovery path for important data;
- no error monitoring for critical failures;
- no deploy/data-migration rollback or recovery path;
- no named incident owner;
- critical user journey has no meaningful verification/test;
- unresolved Critical/High security finding;
- required privacy/consent handling is missing.

The release audit template lives under:
`templates/project-governance/07-operations/release-audit.md`.

## 20. Adopt now / later

### Adopt now
- Product Supervisor naming and mandate;
- progressive artifacts;
- risk-based governance;
- Project Decision Log;
- Assumptions & Open Questions Register;
- Technical Debt & Scale Register;
- cost and explicit scale triggers;
- Product Release Audit;
- proportional security/quality review;
- repository Markdown as governance source of truth.

### Adopt when justified
- extraction into a standalone reusable repository;
- full distributed tracing;
- extensive SLO/error-budget programs;
- strict CODEOWNERS/independent approval on every project;
- enterprise governance that is not justified by project risk.

## 21. Product Supervisor principle

> **Define before building.**
>
> **Build the smallest dependable version.**
>
> **Verify before shipping.**
>
> **Observe after launch.**
>
> **Scale only from evidence.**

---
name: admonk-product-supervisor
description: Supervise software/app product projects from idea through scale. Use for product planning, lifecycle gates, architecture sequencing, launch readiness, periodic technical/product health reviews, scalability reviews, milestone selection, and deciding whether a project is ready to implement or scale. Designed for premium products that must start lean and low-cost without creating avoidable future architecture debt.
---

# Admonk Product Supervisor

Read:
`docs/PRODUCT-SUPERVISOR.md`

## Mission

Keep the project on the smallest safe path to a premium, scalable product.

Default operating loop:

**Understand → Gate → Route → Verify → Record → Recheck**

## Before substantial work

1. Read the project's `AGENTS.md`.
2. Read current project status/tasks/architecture docs.
3. Determine Product Supervisor stage PS-0 through PS-7.
4. Identify unresolved exit criteria for the current stage.
5. Do not recommend later-stage implementation as if gates are already closed.
6. Load only the specialist skills required for the current problem.

## Core rules

- Start lean; preserve migration paths.
- Prefer modular monolith + managed services unless evidence requires more.
- Do not confuse "scalable" with "complex."
- Security, authorization and data ownership are architecture, not cleanup.
- Premium UX is part of product correctness.
- AI/model logic must remain model-neutral where practical.
- Scale only from measured triggers.
- Record deliberate shortcuts and revisit triggers.
- Every important review must produce actionable findings and the next milestone.

## Review modes

### Product gate review
Ask:
- Is the problem validated?
- Are roles/jobs/scope clear?
- Are core entities/workflows known?
- Is v1 separated from later scope?

### Architecture gate review
Ask:
- Is auth/RBAC safe?
- Are data/source boundaries clear?
- Are connectors/actions governed?
- Are environments, secrets, backups and observability defined?
- Is the architecture cheaper/simpler than necessary, or more complex than necessary?

### Build health review
Check:
- implementation matches product docs;
- migrations/schema discipline;
- test coverage appropriate to risk;
- logging/errors;
- performance;
- security;
- dependency health;
- technical debt.

### Launch review
Check:
- failure paths;
- rollback;
- backup/restore;
- monitoring;
- permissions;
- onboarding;
- browser/device QA;
- performance;
- analytics;
- support ownership.

### Scale review
Require evidence:
- what is actually hitting a limit;
- current metrics;
- expected future load;
- cheapest safe response;
- migration cost;
- rollback;
- trigger threshold.

## Output format

For substantial supervisor reviews, report:
- Current stage
- What is healthy
- Open gates
- Risks
- Do now
- Defer
- Next milestone
- Scale triggers
- Required specialist reviews

Do not use a numeric health score unless each dimension is evidence-backed and explained.


## Risk classification

Before build/launch governance decisions, classify the current environment:
- Prototype
- Production
- High-risk

Use the definitions in `docs/PRODUCT-SUPERVISOR.md`.

A project may use Prototype governance during controlled discovery/staging and Production governance for its first real-user release.

## Mandatory build gate

Before production implementation, verify the minimum viable Product Supervisor artifacts:
- Product Brief
- MVP / Capability Specification
- Architecture & Risk Brief
- lightweight Project State

Do not begin implementation while critical product/data/authorization questions remain open.

## Release audit

Before a production launch:
1. load `templates/project-governance/07-operations/release-audit.md`;
2. collect evidence, not assertions;
3. run relevant adversarial scenarios;
4. return exactly one decision: PASS, PASS WITH ACCEPTED RISKS, or BLOCKED;
5. record accepted risks and owners;
6. do not self-waive Critical/High security blockers.

## State discipline

Use:
- repository Markdown for canonical governance state;
- GitHub Issues/Projects for execution;
- ADRs for major architecture decisions;
- Decision Log for broader decisions;
- Assumptions/Open Questions register for uncertainty;
- Technical Debt & Scale Register for deliberate shortcuts and scale triggers.

# FOUNDATION-M2 — Operating Brief

**Milestone:** FOUNDATION-M2 — Define Shared Product Platform Foundation  
**Status:** ACTIVE  
**Started:** 2026-09-26  
**Inherits:** Admonk Studio Foundation v1.0.0 / Product Supervisor v2.0.0  
**Implementation:** Not authorized by this brief

## Purpose

Define the minimum reusable platform contracts/chassis that genuinely belong across Admonk products while preserving domain ownership, independent evolution and low operating cost.

## Product-owner hard constraints

These are not optional optimization ideas. They are decision filters for every M2 architecture choice.

### 1. Organization, reuse and scalability

- Repository/folder/navigation structure must stay understandable as products, packages and teams grow.
- Avoid duplicate implementations of the **same stable behavior**. Promote proven shared behavior into reusable code/contracts instead of copying it.
- Do not generalize merely because two pieces of code look similar. Shared code must have genuinely shared semantics and ownership.
- Prefer the smallest clear implementation. Do not turn a one-line/direct solution into a large abstraction unless the added behavior is actually required.
- Architecture must have explicit scale paths for users, tenants, data, connectors, agents, traffic, storage, permissions, teams and operational load.
- Scale from measured/evidenced triggers, not hypothetical future size.
- Navigation, ownership and dependency direction must remain machine- and human-discoverable.

### 2. Usage efficiency

- Start with the minimum recurring cost capable of delivering Production-quality outcomes.
- AI/model/tool usage must be economically viable at the user and successful-outcome level.
- Expensive models/tools are justified by measurable quality/risk benefit, not prestige.
- Use deterministic code/rules instead of AI where deterministic logic is cheaper, safer and sufficient.
- Design for attribution of usage/cost by tenant/product/feature/agent where material.
- A feature whose normal usage destroys product economics is not a successful feature.

### 3. Testing speed

- Correctness matters, but testing must not make delivery needlessly slow.
- Follow S007/PB02: test critical behavior at the cheapest useful level.
- Prefer fast logic tests, targeted integration tests and a small critical E2E set rather than exhaustive E2E testing at every step.
- Run deeper suites when risk/change scope warrants them.
- Where the eventual repository/tooling supports it, prefer affected/change-scoped testing and caching rather than rerunning unrelated work.
- Real failures become focused regression tests.

### 4. Development/tooling cost

- Treat developer time, AI coding tokens, CI minutes, SaaS plans, API credits, storage and maintenance as costs.
- Prefer native/existing capabilities before adding tools.
- Avoid dependencies/services whose maintenance burden exceeds the problem they solve.
- Code, agent and documentation workflows should minimize repeated exploration/reasoning.
- Reusable canonical modules, clear APIs and machine-readable project/dependency maps are preferred when they reduce duplicated work and AI-token consumption.

## M2 decision filter

Every significant M2 decision must answer:

1. What shared capability/problem are we solving?
2. Can an existing/local/domain solution handle it adequately?
3. Does sharing remove genuine duplication or merely create coupling?
4. What is the smallest implementation/contract that solves it?
5. What does this cost in runtime spend, engineering effort, CI/testing, maintenance and AI/tool usage?
6. How does it scale?
7. How is it tested proportionally?
8. What evidence would justify expanding or centralizing it later?
9. What is the exit/migration path if the decision becomes wrong?

## Research method

Use the same FOUNDATION-M1 research discipline:

**repository context → current primary/high-reliability sources → strongest competing approaches → challenge both → smallest Admonk synthesis → explicit accepted cost/tradeoff → owner Q1 when strategic preference remains → lock decision.**

Do not select tools because a platform supports more features. Capability and architecture decisions come first.

## Initial M2 decision sequence

1. **M2-01 Repository, code reuse and shared-package boundary**
2. Tenant/company identity model
3. User + membership model
4. Organization roles vs product/domain roles
5. Effective-permission precedence
6. Product/module entitlements
7. Settings inheritance/overrides
8. Shared onboarding shell
9. Connector + credential ownership
10. Knowledge/context hierarchy
11. AI/agent capability authorization + approvals
12. Audit/provenance/event model
13. Notification/communication preferences
14. Usage/token/cost governance
15. Navigation/deep-link contract
16. Design/theme inheritance
17. Localization/timezone
18. Data sensitivity/retention/export/deletion
19. Version/compatibility/migration
20. Runtime boundary decisions: shared contract vs package vs service vs domain-owned implementation

Sequence may be adjusted when an earlier decision proves a dependency.

## M2 gate

Do not lock a shared runtime service merely because two products have similar names or code.

Promotion ladder for shared platform behavior:

**Domain-local → proven second consumer / hard consistency need → shared contract → shared package if useful → shared runtime service only when operational/security/consistency economics justify centralization.**

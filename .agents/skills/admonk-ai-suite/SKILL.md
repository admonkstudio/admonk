# Admonk AI Suite Coordination Skill

## Purpose

Use this skill when a task spans more than one of these products:

- Corporate AI Assistant
- Support Platform / Ask Kalam
- Marketing Hub

Do not use this skill for ordinary product-specific work that can be handled entirely inside one repository.

## First step

Identify the owning product.

### Corporate AI Assistant owns
- company-wide intelligence;
- cross-department knowledge;
- company-level orchestration;
- cross-app tool routing;
- executive/company summaries and queries.

### Support Platform owns
- customer/support conversations;
- cases/customer goals;
- verified customer-resolution outcomes;
- support knowledge;
- support channels/actions;
- support-specific analytics.

### Marketing Hub owns
- marketing strategy;
- marketing evidence;
- marketing analytics;
- planning/campaign operations;
- marketing KPIs;
- marketing performance;
- marketing AI intelligence.

If one product clearly owns the task, route the work there and follow that repository's AGENTS.md.

## Cross-product rule

For work that genuinely spans products:

1. identify the authoritative source/product for every datum/action;
2. define read/write direction explicitly;
3. define authorization boundary;
4. define audit/provenance requirements;
5. define failure behavior;
6. avoid direct database coupling;
7. use API/tool/event contracts;
8. preserve tenant boundaries;
9. do not duplicate business logic across apps;
10. document the shared contract in the suite coordination layer.

## Instruction precedence

Inside a product repository:
1. current explicit user/product-owner instruction;
2. that repository's AGENTS.md;
3. its canonical task/status/architecture docs;
4. this suite skill.

This skill does not override a specialist product's security or milestone gates.

## Shared skill promotion test

Before creating a new suite/shared skill, confirm:
- at least two products genuinely need it;
- semantics are the same;
- lifecycle is shared;
- product-specific variation can remain configuration rather than branching;
- centralization reduces rather than adds complexity.

If not, keep the skill local to the product.

## Do not

- create a suite-wide database table because two products use similar words;
- share credentials across products by default;
- bypass one product's API/authorization to read another database directly;
- merge product repos for convenience;
- move product-specific roadmap items into suite docs;
- let the Corporate Assistant become an ungoverned super-admin;
- let analytics become a fourth standalone product when it belongs to Marketing Hub.

## Completion output for cross-product work

Report:
- products affected;
- owning product for each concern;
- shared contract created/changed;
- auth/security impact;
- data-flow direction;
- repositories changed;
- dependencies/blockers;
- whether a suite decision record is needed.

# Admonk AI Suite

**Status:** Canonical suite coordination layer  
**Owner:** Admonk Studio  
**First operating tenant:** Kalam CX  
**Date established:** 2026-09-21

## Purpose

Admonk AI Suite is the coordination layer for three specialist products.

The suite is **not** one giant application and is **not** one monorepo at this stage.

Each product keeps its own repository, product model, AGENTS.md, skills, milestones, database, deployment and release lifecycle. This repository holds only the shared architecture and cross-product coordination rules.

## Product family

### 1. Corporate AI Assistant
**Role:** company brain / intelligence and orchestration layer.

Intended responsibilities:
- company-wide knowledge access;
- executive/company Q&A;
- cross-department context;
- permitted orchestration across specialist products;
- company-level alerts, summaries and decision support;
- tool routing across approved company systems.

Repository:
`admonkstudio/corporate-ai-assistant`

Canonical product planning now lives in that repository. Historical recovery material in this suite repository is retained only as migration/history evidence.

The Corporate AI Assistant must not silently become the owner of specialist product data. It should call specialist systems through governed interfaces.

### 2. Support Platform / Ask Kalam
**Role:** support/customer-resolution arm.

Repository:
`kalamcx/kalam-digital-platform`

Current product category:
**AI Customer Resolution Platform**

Core promise:
**Resolve it. Prove it. Learn from it.**

Canonical authority remains inside that repository.

Current active program:
pre-launch reconstruction.

Current milestone:
**M0 — Freeze & Establish Source of Truth**

Do not move, merge, redesign, or reorganize that repository from this suite layer while its own active milestone prohibits such work.

### 3. Marketing Hub
**Role:** marketing arm.

Repository:
`admonkstudio/marketing-hub`

Marketing Hub combines:
**strategy → evidence → analytics → planning → execution → performance → AI marketing intelligence**

Marketing analytics is a core layer of Marketing Hub, not a separate Analytics Hub product.

Current active stage:
**PDISC — Product Discovery through Kalam 2027 Strategy**

## Commercial composition and shared foundation

Admonk's current product-owner direction is to make the suite commercially behave as **one composable product family that can be sold in parts**.

A customer may enable:
- one specialist product;
- several specialist products;
- the company/corporate intelligence layer;
- later optional modules/capabilities.

This commercial unity does **not** replace the technical boundary rule below.

The shared Product Platform Foundation should provide common cross-product semantics where they are genuinely the same, including candidates such as:
- tenant/company identity;
- users/memberships;
- product/module entitlements;
- roles/capabilities and permission primitives;
- settings hierarchy;
- onboarding shell;
- connector credential ownership;
- audit/provenance/event contracts;
- notification preferences;
- AI usage/cost governance;
- navigation/deep links;
- design/theme inheritance;
- version/compatibility metadata.

Specialist products still own their domain semantics, data, agents, workflows, KPIs and views.

Canonical foundation program:
`docs/FOUNDATION-PROGRAM.md`

Product Platform direction:
`docs/PRODUCT-PLATFORM-FOUNDATION.md`

## Shared architecture principle

Use:

**Separate products + shared contracts + governed integration**

Not:

**one giant app + one database + one roadmap**

The specialist application remains authoritative for its own domain.

Examples:
- Marketing Hub is authoritative for governed marketing strategy/metrics/evidence.
- Support Platform is authoritative for customer-resolution/support cases and verified support outcomes.
- Corporate AI Assistant can read/call those systems only through approved contracts and permissions.

## Shared suite contracts

The suite coordination layer owns only genuinely cross-product contracts.

Planned shared contracts include:
- organization / tenant identity;
- user identity / RBAC conventions;
- app-to-app authentication;
- product identity and version metadata;
- audit/event envelope;
- provenance and source attribution;
- cross-product data sensitivity labels;
- deep-link/navigation contract;
- AI tool invocation contract;
- notification/event contract;
- shared connector credential ownership rules;
- cross-product access policy.

Do not move product-specific business entities into the suite merely to make naming consistent.

## Repository model

```text
admonkstudio/admonk
└── shared studio + AI Suite coordination
    ├── docs/AI-SUITE.md
    ├── docs/AI-SUITE-REPOSITORY-MAP.md
    ├── docs/AI-SUITE-MANIFEST.yaml
    └── .agents/skills/admonk-ai-suite/SKILL.md

Product repositories
├── Corporate AI Assistant       TBD
├── Support Platform             kalamcx/kalam-digital-platform
└── Marketing Hub                admonkstudio/marketing-hub
```

The existing `admonkstudio/admonk` repository is the umbrella coordination source. A separate `admonk-ai-suite` repository is unnecessary unless the suite later outgrows this shared studio repository.

## Skills model

Use three layers:

### Shared studio skills
General skills reusable across projects:
- security review;
- analytics implementation;
- performance;
- deployment;
- design/UX;
- Supabase/platform guidance.

### Suite coordination skill
Use:
`.agents/skills/admonk-ai-suite/SKILL.md`

This skill decides product ownership/boundaries and cross-product integration rules.

### Product-specific skills
Stay in the product repository and outrank suite convenience.

Examples:
- Support: resolution integrity, Case/Outcome semantics, provider action safety.
- Marketing: metric governance, evidence governance, strategy/analytics linkage.
- Corporate Assistant: company-wide orchestration, tool routing, company permissions.

## GitHub organization model

Recommended GitHub Project board:

**Admonk AI Suite**

It should aggregate issues from the three product repositories.

Recommended fields:
- Product
- Workstream
- Milestone
- Status
- Priority
- Owner
- Repository
- Dependency
- Target release
- Cross-product impact

The Project board is a portfolio view only. It does not replace each repository's canonical task/milestone files.

## Integration rule

No specialist product may silently write directly to another specialist product's database.

Preferred pattern:

```text
Corporate AI Assistant
        │
        ├── governed API/tool access ──> Support Platform
        │
        └── governed API/tool access ──> Marketing Hub
```

Cross-product actions require explicit authorization, auditability, and source ownership.

## Current coordination priorities

1. Preserve the existing Support Platform reconstruction without interference.
2. Continue Marketing Hub discovery and provider/evidence verification.
3. Continue Corporate AI Assistant CAI-P0 scope freeze in its dedicated repository.
4. Define the minimum shared tenant/user/app-to-app contract only when concrete integration work begins.
5. Create the cross-repository GitHub Project board when UI/admin access is available.
6. Avoid premature shared runtime packages.

## Decision rule

Before moving a capability into the suite layer, ask:

> Is this concern genuinely shared by at least two specialist products, with the same semantics and lifecycle?

If no, keep it inside the specialist product.

# Corporate AI Assistant — Repository Bootstrap

## Repository to create

**Owner:** `admonkstudio`  
**Name:** `corporate-ai-assistant`  
**Visibility:** Private  
**Initialize with README:** Yes

## Purpose

Dedicated product repository for the company-wide brain / intelligence / orchestration layer in the Admonk AI Suite.

This repository is separate from:
- Marketing Hub
- Support Platform / Ask Kalam
- shared Admonk suite coordination

## Initial structure

```text
corporate-ai-assistant/
├── README.md
├── AGENTS.md
├── .agents/
│   └── skills/
│       └── corporate-ai-assistant/
│           └── SKILL.md
└── docs/
    ├── PROJECT-STATUS.md
    ├── TASKS.md
    ├── PRODUCT.md
    ├── ARCHITECTURE.md
    ├── SECURITY.md
    ├── INTEGRATIONS.md
    ├── DECISIONS.md
    ├── HISTORICAL-RECOVERY.md
    └── ROADMAP.md
```

## Initial instruction precedence

1. Current explicit product-owner instruction.
2. Root `AGENTS.md`.
3. `docs/PROJECT-STATUS.md`.
4. `docs/TASKS.md`.
5. Product/architecture/security docs.
6. Accepted decisions.
7. Historical recovery docs.
8. Suite coordination docs from `admonkstudio/admonk`.

## Product boundary

Corporate AI Assistant owns:
- company-wide intelligence;
- cross-department/company context;
- executive/company Q&A;
- approved orchestration across systems;
- governed cross-product tool routing;
- company-level proactive intelligence.

It does not own:
- marketing strategy/metrics/evidence → Marketing Hub owns these;
- customer-resolution cases/outcomes → Support Platform owns these;
- specialist app databases → remain specialist-owned.

## Historical source to migrate

From `admonkstudio/admonk`:
- `docs/CORPORATE-AI-ASSISTANT-PLAN.md`
- `docs/CORPORATE-AI-ASSISTANT-STATUS.md`
- `docs/CORPORATE-AI-ASSISTANT-TASKS.md`

Relevant historical Kalam Digital Platform commits:
- `80e2f9ba3150ec7e824c57afef02fd371a7fb236`
- `a49b9a954a71e3ae994ac78d8a583c7bf7b91142`

These commits are evidence/reference only. Do not copy the old Customer AI repository wholesale.

## First implementation rule

Do not begin by cloning the Support Platform UI/backend.

Recover requirements first, define the v1 jobs and authorization model, then decide what infrastructure can be reused through shared contracts or packages.

## Suite integration

Canonical suite coordination:
`admonkstudio/admonk/docs/AI-SUITE.md`

Use:
`admonkstudio/admonk/.agents/skills/admonk-ai-suite/SKILL.md`

No direct cross-product database writes by default.

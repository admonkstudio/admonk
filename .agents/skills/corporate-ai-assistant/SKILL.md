# Corporate AI Assistant Product Skill

## Product role

Corporate AI Assistant is the company-wide brain / intelligence / orchestration layer of the Admonk AI Suite.

Use this skill for work involving:
- company-wide Q&A;
- employee/company context;
- cross-department intelligence;
- internal knowledge;
- governed cross-system actions;
- proactive company intelligence;
- operational memory;
- Company Graph;
- internal skills/automation;
- cross-product orchestration.

## Product ownership boundaries

Marketing Hub owns:
- marketing strategy;
- marketing evidence;
- marketing KPIs/analytics;
- marketing planning/performance.

Support Platform owns:
- customer conversations;
- customer goals/cases;
- verified customer/support outcomes;
- support knowledge/actions.

Corporate AI Assistant may call those products through governed contracts but must not duplicate their domain logic or write directly into their databases by default.

## Current stage

Planning / CAI-P0 Recovery & Scope Freeze.

Do not implement production features until the repository bootstrap and scope-freeze exit criteria are approved.

## Historical terms

Treat these as historical references to the same evolving product:
- Employee AI
- Employee Assistant
- Internal AI
- Company Intelligence
- Corporate AI Assistant

Use **Corporate AI Assistant** as the current normalized name unless the product owner changes it.

## Security baseline

The assistant is internal/authenticated.

Always require:
- authenticated employee/company identity;
- role/department-aware access;
- least privilege;
- connector/tool authorization;
- approval for consequential actions;
- auditability;
- provenance;
- no model-as-authorization-boundary;
- permission-aware memory/context.

## Interaction principle

The assistant should simplify company work, not expose infrastructure.

Prefer:
- natural language;
- context-aware answers;
- concise summaries;
- actionable next steps;
- progressive disclosure for evidence/permissions/audit detail.

Do not turn the UI into a generic admin dashboard unless the job requires it.

## Cross-product work

For any task spanning more than one product, also use:
`admonkstudio/admonk/.agents/skills/admonk-ai-suite/SKILL.md`

Explicitly identify:
- source product;
- target product;
- read/write direction;
- authorization;
- audit/provenance;
- failure behavior.

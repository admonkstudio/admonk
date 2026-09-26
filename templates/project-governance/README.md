# Project Governance Template

Use this structure for software/app projects supervised by the Admonk Product Supervisor.

The folders are progressive. Do not populate every artifact on day one.

```text
project-governance/
├── PROJECT-STATE.md
├── 01-discovery/
│   ├── product-brief.md
│   └── assumptions-open-questions.md
├── 02-product/
├── 03-design/
├── 04-architecture/
├── 05-delivery/
├── 06-security/
├── 07-operations/
│   └── release-audit.md
├── 08-decisions/
│   └── decision-log.md
└── 09-scale-and-debt/
    └── technical-debt-scale-register.md
```

## Rule

Repository Markdown is the canonical governance state.
GitHub Issues/Projects may track execution, but they do not silently replace approved product, architecture, decision, risk or release records.

## Minimum before implementation

- Product Brief
- MVP / Capability Specification
- Architecture & Risk Brief
- Project State

Use `docs/PRODUCT-SUPERVISOR.md` for lifecycle gates and governance levels.

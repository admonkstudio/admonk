# Product Foundation Template

Use this optional template when an Admonk-owned software product needs a structured foundation document set.

This template is **neutral scaffolding**. It does not define a shared Admonk product platform, does not grant cross-product authority, and must not override a product repository's own canonical contracts.

## Recommended documents

```text
product-foundation/
├── PRODUCT-FOUNDATION.md
├── MASTER-PLAN.md
└── CONNECTION-CONTRACT.md
```

Use `DEPARTMENT-MASTER-PLAN.md` only when a real department/domain product model makes that structure useful.

## Authority order

```text
Approved product-owner decision
        ↓
Product repository canonical authority
        ↓
Explicit parent/shared contracts, if the product actually has them
        ↓
Approved Admonk Studio doctrine/standards
        ↓
Relevant skills/platform guidance
        ↓
Generic framework defaults
```

Security, legal and safety constraints may impose stricter requirements.

## Rule

> **Use the template to ask the right structural questions; never treat the template itself as architecture authority.**

Do not invent a product family, shared platform, cross-product contract or department-app model merely because this template contains a place to document one.

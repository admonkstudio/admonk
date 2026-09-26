# Product Foundation Template

Use this template when defining an Admonk-owned company, department, or specialist product that inherits from the shared Product Platform Foundation.

## Purpose

Keep every product structurally consistent where consistency creates value while preserving domain authority and product-specific experience.

## Recommended project documents

```text
product-foundation/
├── PRODUCT-FOUNDATION.md
├── MASTER-PLAN.md
└── CONNECTION-CONTRACT.md
```

For a department/specialist product also use:
`DEPARTMENT-MASTER-PLAN.md`

## Inheritance order

```text
Approved product-owner decision
        ↓
Product-specific foundation/domain authority
        ↓
Approved Shared Product Platform Foundation contract
        ↓
Approved Admonk Studio Foundation doctrine/standards
        ↓
Relevant skills/platform guidance
        ↓
Generic framework defaults
```

Security/safety/legal constraints may impose stricter requirements.

## Rule

A product should inherit shared behavior intentionally.

Do not:
- copy shared documents into the product and let them drift;
- rebuild shared primitives locally without a recorded reason;
- move domain semantics into the shared foundation merely for consistency;
- fork the product for each tenant when configuration can solve the need.

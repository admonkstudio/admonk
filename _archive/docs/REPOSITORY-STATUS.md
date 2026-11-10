# Admonk Repository Status

**Date:** 30/09/2026  
**Repository:** `admonkstudio/admonk`  
**Role:** Admonk Studio headquarters / reusable operating system  
**Product authority:** None; product-specific authority lives in dedicated repositories  
**Visibility:** Public  
**Pre-cleanup provenance commit:** `243f1f25db2fc85ff7a50432a4cc574778948955`

## Cleanup completed

The repository previously mixed Studio material with product-specific AI Suite / Corporate AI Assistant / Harvey / Jarvis / Marketing Hub / SIA Foundation work.

On 30/09/2026 the current tree was normalized:
- 111 obsolete/product-specific files removed from the current Studio tree;
- obsolete `admonk-ai-suite` and `corporate-ai-assistant` skills removed;
- SIA remains canonical in `admonkstudio/sia`;
- historical removed content remains recoverable through Git history at the pre-cleanup commit above;
- generic product-foundation templates were kept but made product-neutral;
- Studio doctrine, standards, skills, research, templates, labs and delivery methods were retained.

## Current top-level structure

- `.agents/skills/` — reusable Admonk specialist skills
- `.codex/` — local agent configuration
- `design-foundation/` — reusable product/app design-system principles
- `docs/` — Admonk business, creative, engineering, Project OS, Product Supervisor and operating guidance
- `doctrine/` — human-approved foundational beliefs
- `labs/` — controlled experiments and benchmarks
- `playbooks/` — reusable operating procedures
- `research/` — non-authoritative reusable Studio research
- `standards/` — Studio standards
- `templates/` — client/project/product governance scaffolding

## Authority boundary

This repository must not become a second SIA authority.

For SIA:
`admonkstudio/sia`

For Kalam/SOLO/runtime implementation:
use the relevant Kalam repository.

Reusable learning may move back here only when it is generalizable and does not carry product/client-specific authority, secrets, private metrics or implementation state.

## Public visibility

This repository is currently **public**. Treat everything committed here as public-facing Studio material. Do not place confidential client information, private operational data, credentials, internal-only product strategy or secrets in this repository.

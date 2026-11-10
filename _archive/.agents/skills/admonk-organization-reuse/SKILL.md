---
name: admonk-organization-reuse
description: Keep project knowledge, repository structure, documentation, and reusable assets understandable, discoverable, canonical, and appropriately separated. Use from project discovery onward when organizing repositories, auditing navigation, deciding canonical homes, resolving duplicate/stale docs, or evaluating reuse/extraction opportunities.
---

# Admonk Organization & Reuse

## Purpose

Keep project truth easy for a new person or model to find without forcing one universal source-code structure.

Core rule:

> **Every important thing should have one clear canonical home, and reuse should follow stable concepts rather than superficial similarity.**

## Inputs

- repository tree;
- current project state;
- canonical docs;
- lifecycle stage;
- platform/stack context;
- current implementation structure where one exists.

## Outputs

- repository navigation assessment;
- canonical-home decisions;
- duplicate/stale/conflicting-content findings;
- documentation gaps;
- reuse candidates;
- extraction recommendations;
- organization changes when justified.

## Organization rules

- Every canonical document has a clear purpose and owner.
- Project truth is separate from execution tracking.
- Governance records are separate from ordinary product/technical documentation.
- Reusable studio assets are separate from project/client-specific material.
- Temporary/generated work never becomes canonical automatically.
- Prefer links to canonical sources over copied duplicate truth.
- Keep navigation shallow enough that important material is easy to locate.
- Names describe purpose, not implementation history.
- Do not preserve confusing structures merely because they already exist; improve them deliberately and record material moves.

## Platform neutrality

Do not impose one universal source-code folder structure.

The relevant platform skill owns framework-specific structure:
- React/Next → admonk-react-engineering
- Astro → admonk-astro
- Webflow → admonk-webflow
- Supabase/backend → admonk-supabase
- other platforms → current authoritative project conventions

This skill judges discoverability, ownership, duplication and boundaries.

## Repository Navigation Audit

For a substantial project, ask:

- Can a new contributor/model find the current project state?
- Can they identify the source-of-truth product requirements?
- Can they find architecture/security/operations docs when relevant?
- Can they distinguish canonical docs from history/snapshots?
- Can they find implementation entry points and reusable components?
- Can they identify deployment/recovery instructions when the stage requires them?
- Are there duplicate, stale, superseded or conflicting documents?
- Are important links/imports still valid?
- Is any single file becoming an unsearchable dumping ground?
- Is project-governance separate from ordinary documentation?

Classify findings:
- KEEP
- CLARIFY
- CONSOLIDATE
- MOVE
- ARCHIVE/REFERENCE
- DEFER

Do not delete or move canonical material merely to make the tree aesthetically cleaner.

## Reuse policy

> **Reuse stable concepts, not merely similar-looking code.**

Extract shared implementation when:
- behavior is genuinely the same;
- API/boundary is stable enough;
- at least two real consumers exist, OR shared implementation is required for security/consistency;
- ownership is clear;
- tests can protect unrelated consumers.

Do not:
- create generic libraries for hypothetical future consumers;
- extract because two components look similar but behave differently;
- centralize client-specific logic into studio-wide code;
- move canonical documents without recording the decision.

## Lifecycle

PS-0 / PS-1:
- establish canonical homes;
- separate facts/decisions/assumptions;
- prevent discovery notes from becoming authority accidentally.

PS-2:
- review domain/module boundaries and dependency visibility.

PS-3 / PS-4:
- keep product/design/implementation artifacts discoverable;
- identify repeated patterns without premature extraction.

PS-5+:
- run navigation/stale-content/reuse audits;
- identify extraction candidates from proven repeated patterns.

## Evidence

Do not report "organization is good" without evidence.

Useful evidence:
- repository tree;
- canonical-document links;
- duplicate/conflict examples;
- dead/stale references;
- before/after path map for material moves.

## Final rule

> **A project is organized when the next person—or the next model—can locate the truth without reconstructing it from history.**

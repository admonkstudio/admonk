# T017 — Component Workbench / Documentation

**Date:** 2026-09-26  
**Mode:** Choice / Direction Research  
**Status:** DECIDED — ADOPT CONDITIONALLY  
**Capability:** Isolated component development, state documentation and reusable component test evidence  
**Decision owner:** Admonk Studio  
**Sources:** SRC-TOOL-WB-001, SRC-TOOL-WB-002

## Problem

As the Design Foundation reaches Level 2/3, Candidate/Trial/Stable UI assets need a practical place to:
- render important states in isolation;
- document usage/variants;
- review behavior/accessibility;
- reuse states as component-test evidence;
- support design/code review without running the whole product.

The tool must not become mandatory infrastructure for Local components or every small product.

## Direction A — Storybook

Storybook provides:
- isolated stories for components/pages;
- Autodocs/MDX documentation;
- multi-framework support;
- browser component testing through its current Vitest integration;
- interaction/accessibility test integration;
- optional visual testing through Chromatic;
- reuse of stories in wider testing workflows.

### Strengths for Admonk
- one story artifact can support development, documentation and several forms of test evidence;
- broad framework support fits a product family better than a React-only standard;
- mature enough for Trial/Stable shared components;
- aligns with R011 artifact-specific authority: code-rendered stories are implementation evidence, not design intent;
- can later support R013/R014 without requiring separate state fixtures.

### Costs / problems
- meaningful dependency/configuration surface;
- stories/docs need maintenance;
- broad addon ecosystem can encourage tool sprawl;
- Chromatic/hosted visual testing is a separate cost/decision;
- installing it too early would contradict R008 progressive maturity.

## Direction B — Ladle

Ladle provides:
- React/Vite-focused isolated component stories;
- very small/simple setup;
- fast startup and code splitting;
- built-in accessibility, controls and MSW;
- substantial Component Story Format compatibility.

### Strengths for Admonk
- lower local complexity;
- fast for React products;
- inexpensive way to get component isolation;
- easier to remove/replace.

### Costs / problems
- React-only;
- no third-party addon support currently;
- narrower docs/testing ecosystem;
- less suitable as a reusable cross-product Studio default;
- choosing it primarily for speed may create migration work once shared assets need richer documentation/testing.

## No-tool baseline

For Level 0/1 and Local assets:
- normal product routes/dev fixtures/manual review remain acceptable;
- no component workbench is required.

This is important: the capability is conditional, not universal.

## Decision Cost Ledger

**Benefit gained:**  
A shared code-rendered state/documentation surface once reusable components actually exist.

**Price paid:**  
Story maintenance, dependency/configuration overhead, CI/runtime cost where tests are enabled, and possible future cloud-service cost.

**New problem introduced:**  
Stories can become another artifact that drifts or goes stale if teams create them without using them for documentation/review/testing.

**Complexity cost:**  
Moderate only after adoption; zero for products where the trigger is not met.

**Operating cost:**  
Low/Moderate self-hosted; optional hosted services may add recurring cost.

**Speed cost:**  
Small ongoing cost to maintain stories; offset when hard-to-reach states no longer require full-app setup.

**Governance cost:**  
Need a rule for which assets deserve stories. Do not require Storybook coverage for every Local component.

**Portability:**  
Good at the story/content level; Component Story Format is broadly reusable in JS tooling, but some addons/integrations are Storybook-specific.

**Security/privacy:**  
Stories/fixtures must not embed real customer secrets or sensitive production data.

**Exit path:**  
Stories are code in the repository. Components remain normal product code. Storybook can be removed without redesigning core product architecture if addon-specific coupling is controlled.

## Decision type

**Conditional.**

This is not Storybook versus Ladle for every Admonk project.

The decision is:
- no mandatory workbench at Level 0/1;
- Storybook becomes the preferred workbench when a product/system crosses the adoption trigger;
- Ladle remains a local alternative only if a React product has a proven need for extreme workbench simplicity and does not need the richer shared-system capabilities.

## Adoption trigger

Adopt Storybook in a product/repository when at least one is true:

1. multiple Candidate/Trial shared components need isolated state review/documentation;
2. hard-to-reach UI states are repeatedly expensive to reproduce in the full app;
3. component-level accessibility/interaction evidence is becoming recurring release work;
4. a Domain/Stable component set needs a discoverable code-rendered catalog;
5. cross-product consumer work makes implementation contracts difficult to understand without an isolated workbench.

Do not adopt solely because "design systems use Storybook."

## Decision

### Storybook — ADOPT CONDITIONALLY

Preferred component workbench for sufficiently mature shared UI systems.

Not required for:
- Local components;
- early prototypes;
- products without recurring isolated-component/state needs.

### Ladle — DEFER AS NON-DEFAULT ALTERNATIVE

Keep available as a product-local option for React/Vite when its lower complexity materially matters and the richer Storybook ecosystem is unnecessary.

Do not establish a second Studio-wide workbench by default.

## Tool-evaluation record

**Problem addressed:** Reusable UI states need isolated development/documentation/test evidence once Design Foundation maturity warrants it.  
**Decision it informs:** Whether a shared component is behaviorally understood and ready for broader use.  
**Evidence produced:** Rendered component states, usage docs, optional interaction/accessibility/component-test results.  
**Reviewer:** Product/design/engineering owner for affected shared assets.  
**When it runs:** During Candidate/Trial/Stable component work and affected release review.  
**Action:** Fix component/state/documentation defects, promote/defer the asset, or add stronger testing only when justified.  
**Cost:** Story maintenance + tool/CI cost; optional hosted services evaluated separately.  
**Data/security risk:** Do not use sensitive production fixtures.  
**Replacement/exit:** Repository stories/components remain portable enough to migrate; avoid deep addon coupling unless value is proven.

## Why not Pilot?

The capability and Storybook's suitability are already well established. The uncertain question is **when a product has enough shared-component pressure to justify it**, not whether Storybook can perform the job.

Therefore **Adopt conditionally** is more precise than Pilot.

## Revisit triggers

Re-evaluate if:
- Storybook maintenance becomes a material delivery burden;
- a lighter tool provides the required evidence with substantially lower cost;
- the product family moves away from supported frameworks;
- shared component usage remains too low to justify the workbench;
- hosted visual/testing costs dominate the value.

## Final rule

> **Do not install a component workbench to look mature. Adopt Storybook when recurring shared-component state, documentation, or test work makes the workbench cheaper than reproducing that evidence ad hoc.**

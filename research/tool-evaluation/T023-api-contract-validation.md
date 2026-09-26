# T023 — API Contract Validation

**Date:** 2026-09-26  
**Mode:** Choice / Direction Research  
**Status:** DECIDED — PROGRESSIVE / CONDITIONAL  
**Capability:** Prevent incompatible API/schema changes across consumers/providers  
**Decision owner:** Admonk Studio  
**Sources:** SRC-TOOL-API-001, SRC-TOOL-API-002

## Problem

The Product Platform Foundation will eventually depend on shared contracts between products/services/connectors.

Admonk needs contract evidence that prevents:
- undocumented schema drift;
- accidental breaking API changes;
- provider/consumer misunderstanding;

without building microservice-grade contract infrastructure before independent consumers actually exist.

## Direction A — OpenAPI contract + repository linting

Redocly CLI can:
- validate OpenAPI descriptions;
- lint against recommended/strict/custom rules;
- bundle references;
- run locally/CI through normal exit codes.

### Strengths
- API definition remains repository-owned;
- cheap and easy to automate;
- good fit for explicit shared contracts;
- portable across providers/runtimes;
- improves documentation and structural consistency;
- no broker/service required.

### Price / limits
- valid OpenAPI does not prove runtime/provider behavior;
- does not prove a real consumer uses the API correctly;
- custom lint rules can become a standards bureaucracy;
- schema-first discipline has maintenance cost.

## Direction B — Pact consumer-driven contracts

Pact:
- creates contracts from consumer expectations;
- verifies providers against those contracts;
- supports HTTP and message interactions;
- is designed for independently deployed services/consumers.

### Strengths
- catches real consumer/provider incompatibility;
- allows independent deployment with stronger confidence;
- tests only interactions current consumers actually depend on;
- useful when one provider serves multiple independently evolving clients.

### Price / limits
- consumer and provider test infrastructure;
- Pact contract/broker/versioning workflow;
- additional CI/release coordination;
- badly written Pact tests can become brittle;
- excessive for early shared modules or one-provider/one-consumer systems.

## Decision type

**Progressive / conditional.**

OpenAPI/schema validation and consumer-driven contracts solve different maturity problems.

Admonk should not install both everywhere.

## Decision

### OpenAPI + repository validation — ADOPT CONDITIONALLY AS DEFAULT SHARED REST-API CONTRACT

When an HTTP API becomes:
- externally exposed;
- shared by more than one meaningful consumer;
- part of a cross-product contract;
- or important enough that undocumented breaking changes are costly;

then maintain a versioned OpenAPI description in the repository and validate it in CI.

### Redocly CLI — ADOPT CONDITIONALLY AS PREFERRED LIGHTWEIGHT VALIDATOR

Start with:
- spec validity;
- a small recommended rule set;
- only a few Admonk-specific rules when evidence shows recurring contract mistakes.

Do not create a large API-style rulebook for aesthetic consistency.

### Pact — DEFER, WITH A CLEAR ADOPTION TRIGGER

Adopt/Pilot when:
- provider and consumers deploy independently;
- multiple consumers have different expectations;
- breaking changes recur or integration E2E tests become expensive/brittle;
- schema validation cannot express the compatibility risk sufficiently.

This trigger is especially relevant if the future Product Platform becomes genuinely distributed.

Do not use Pact merely because "microservices use contract testing."

## Runtime verification rule

OpenAPI validation checks the contract artifact.

It does not replace:
- provider implementation tests;
- integration/boundary tests from R014;
- authentication/authorization tests;
- real connector verification.

Where provider-to-spec drift becomes a repeated problem, add targeted runtime/provider conformance checks before introducing a larger contract platform.

## Decision Cost Ledger

**Benefit gained:**  
Versioned shared API contracts with low initial operational cost and a path to stronger consumer compatibility later.

**Price paid:**  
OpenAPI maintenance now; possible Pact infrastructure later.

**New problem introduced:**  
Specification can drift from implementation if nobody validates the runtime boundary.

**Complexity cost:**  
Low for Redocly/OpenAPI; Moderate/High for Pact workflow.

**Operating cost:**  
Low repository/CI cost initially; Pact broker/service/maintenance only if triggered.

**Speed cost:**  
Shared API changes require contract updates and compatibility review.

**Governance cost:**  
Need an owner and version/change policy for Stable shared contracts.

**AI/tool cost:**  
Machine-readable OpenAPI can reduce agent guessing and integration mistakes; keep schemas concise enough to avoid unnecessary context overhead.

**Who pays:**  
Provider owns canonical shared API description; affected consumer/provider owners pay compatibility evidence when they deploy independently.

**Containment:**  
- only Stable/shared APIs require formal contract artifacts;
- keep rules small;
- one canonical API definition;
- Pact only after independent deployment evidence;
- preserve versioning/migration path.

## Tool-evaluation record

**Problem addressed:** Breaking or ambiguous API contracts.  
**Decision it informs:** Whether a shared API change is compatible and releasable.  
**Evidence produced:** Valid/linted OpenAPI artifact initially; consumer/provider compatibility evidence later if Pact is triggered.  
**Reviewer:** API/provider owner plus affected consumers for material changes.  
**When it runs:** Contract changes and relevant CI/release gates.  
**Action:** Fix schema/change, version/migrate contract, or document compatibility exception.  
**Cost:** Low CI/spec maintenance initially; higher only if consumer-driven contract infrastructure is later justified.  
**Data/security risk:** Example schemas/fixtures must avoid production secrets/PII.  
**Replacement/exit:** OpenAPI is portable; Pact remains a conditional implementation rather than architectural authority.

## Revisit triggers

- multiple independent product consumers emerge;
- breaking integration changes recur;
- provider/spec drift becomes common;
- shared event/message contracts become central;
- API compatibility review becomes a release bottleneck;
- selected API protocol is no longer well represented by OpenAPI.

## Final rule

> **Make shared contracts explicit before making contract infrastructure heavy. Use repository-owned API schemas first; adopt consumer-driven contract testing only when independent consumers make that extra machinery cheaper than recurring integration failures.**

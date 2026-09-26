# T021 — Static Analysis

**Date:** 2026-09-26  
**Mode:** Choice / Direction Research  
**Status:** DECIDED — LAYERED / ADOPT CONDITIONALLY  
**Capability:** Detect code defects and security-relevant patterns before runtime  
**Decision owner:** Admonk Studio  
**Sources:** SRC-TOOL-STATIC-001, SRC-TOOL-STATIC-002, SRC-TOOL-STATIC-003

## Scope

This decision covers source-code static analysis.

It does **not** duplicate:
- secret scanning (T020);
- dependency/supply-chain scanning (T022);
- runtime tests (R014);
- AI evals (R016).

## Baseline distinction

"Static analysis" is not one tool category.

There are at least two useful layers:

1. **language-native correctness/lint/type checks**;
2. **security-focused semantic SAST**.

Admonk should not force one tool to perform both jobs.

## Layer 1 — Language-native checks

For Production codebases, use the mature compiler/type/lint checks appropriate to the language/framework.

For JS/TS, examples include:
- TypeScript type checking where TypeScript is used;
- ESLint or framework-native linting for logical/problematic patterns.

These checks are normally:
- fast;
- inexpensive;
- close to developer feedback;
- repository-specific.

### Decision
**ADOPT NOW AS A CAPABILITY, NOT AS ONE UNIVERSAL TOOL.**

Each product stack chooses the smallest mature language-native set.

Do not create a Studio-wide rule empire of stylistic preferences.

## Direction A — GitHub CodeQL

CodeQL:
- models code semantically;
- supports JavaScript/TypeScript, Python, Go, Java/Kotlin, C/C++, C#, Ruby, Rust, Swift and GitHub Actions;
- offers default, security-extended and security-and-quality suites;
- integrates findings directly into GitHub code scanning;
- can use default setup with low configuration.

### Strengths for Admonk
- natural fit because GitHub is canonical repository hosting;
- strong repository-native triage/audit;
- deeper code/data-flow analysis than ordinary linting;
- good fit for security-sensitive Production code;
- SARIF-compatible ecosystem;
- low operational overhead when eligible for default setup.

### Price / weaknesses
- private organization repositories require GitHub Code Security entitlement;
- language support is finite;
- scans add Actions/analysis time;
- custom/niche framework modeling can require extra work;
- adopting it everywhere would duplicate low-value checks in low-risk projects.

## Direction B — Semgrep

Semgrep CE:
- runs locally or in CI;
- is portable across repository hosts;
- supports configurable/custom rules;
- is designed for fast source scanning.

Paid Semgrep Code adds:
- maintained Pro rules;
- cross-function/cross-file analysis;
- deeper engine capabilities;
- managed platform workflows.

### Strengths for Admonk
- portable fallback outside GitHub entitlement;
- simple custom rules are easy to express;
- useful for organization-specific dangerous patterns;
- fast for targeted scans.

### Price / weaknesses
- CE is intentionally lighter and largely single-function;
- community rule quality/maintenance is less controlled than paid Pro rules;
- paid platform introduces recurring contributor/platform cost;
- its paid SCA/secrets capabilities would overlap T020/T022;
- running Semgrep plus CodeQL by default creates duplicate findings/triage.

## Decision type

**Layered + conditional.**

The correct system is not:
> CodeQL vs ESLint vs Semgrep — choose one.

It is:
> **language-native checks always where appropriate; deeper SAST only when risk and economics justify it.**

## Decision

### Language-native static checks — ADOPT NOW

For Production repositories:
- use language/compiler/type/lint tooling appropriate to the stack;
- focus on correctness, likely defects and framework-safe patterns;
- avoid large style-only rule sets that create noise without product value.

### GitHub CodeQL — ADOPT CONDITIONALLY AS PREFERRED SECURITY SAST

Use when:
- repository language is supported;
- code is Production and materially security-sensitive, internet-facing, multi-tenant, permission-heavy, data-sensitive or consequential; and
- GitHub Code Security entitlement already exists or its cost is justified.

Prefer default setup first.
Escalate query/config complexity only from evidence.

### Semgrep CE — ADOPT CONDITIONALLY FOR TARGETED / PORTABLE CASES

Use when:
- CodeQL entitlement/language fit is unavailable;
- a targeted custom rule protects an Admonk-specific invariant;
- another repository/CI environment needs a portable scanner.

Do not run broad Semgrep CE + CodeQL scans together by default.

### Semgrep paid platform — DEFER

Revisit only when:
- multi-repo AppSec management;
- cross-file accuracy;
- custom organizational policy;
- triage burden;
- or coverage gaps

demonstrate enough value to justify its recurring cost.

## Decision Cost Ledger

**Benefit gained:**  
Fast local correctness feedback plus deeper security scanning where consequence justifies it.

**Price paid:**  
Configuration/CI time, finding triage and possible GitHub/paid AppSec entitlement.

**New problem introduced:**  
Overlapping analyzers can create duplicate/noisy findings if layering is not controlled.

**Complexity cost:**  
Low for native checks; Moderate for deeper SAST.

**Operating cost:**  
Low native; CodeQL plan/Actions dependent; Semgrep CE low; paid platform higher recurring cost.

**Speed cost:**  
Native checks should remain fast. SAST can run on PR/default-branch schedules rather than every local edit.

**Governance cost:**  
Need severity/false-positive ownership and explicit suppression reasons.

**AI/token/tool cost:**  
No model-token requirement for baseline static analysis. Avoid AI-assisted triage as a default paid dependency unless measured value justifies it.

**Who pays:**  
Product engineering owns native checks; security/repository owner owns SAST findings/policy.

**Containment:**  
- one preferred security SAST path per repository;
- native lint/type checks remain distinct;
- no style-rule bureaucracy;
- suppressions require rationale;
- deeper analysis only for supported/risky code;
- do not duplicate T020/T022 controls.

## Tool-evaluation record

**Problem addressed:** Defects/vulnerabilities detectable without running the application.  
**Decision it informs:** Block/fix code before release or accept/document a finding.  
**Evidence produced:** Compiler/lint/SAST findings tied to source locations and rules.  
**Reviewer:** Code owner; security owner for material SAST findings.  
**When it runs:** Local/CI for native checks; PR/default branch/scheduled as justified for SAST.  
**Action:** Fix, document false positive/exception, or escalate security review.  
**Cost:** CI/configuration + possible security-tool entitlement.  
**Data/security risk:** Cloud SAST providers may receive code/metadata; evaluate provider terms before adoption.  
**Replacement/exit:** Native tools are stack-local; SAST policy remains tool-neutral and SARIF-compatible where practical.

## Revisit triggers

- CodeQL entitlement becomes economical/unavailable;
- security defects escape current analysis repeatedly;
- false-positive burden becomes material;
- product stack moves beyond supported languages;
- repeated custom-policy needs justify Semgrep paid/custom tooling;
- AI-generated code materially increases static-analysis finding volume.

## Final rule

> **Use cheap language-native analysis everywhere it earns its keep. Add one deeper security scanner where code risk justifies it. Do not pay twice for overlapping analyzers without evidence.**

# T022 — Dependency / Supply-Chain Checks

**Date:** 2026-09-26  
**Mode:** Choice / Direction Research  
**Status:** DECIDED — LAYERED / CONDITIONAL  
**Capability:** Detect vulnerable or suspicious third-party dependencies before and after adoption  
**Decision owner:** Admonk Studio  
**Sources:** SRC-TOOL-SUPPLY-001, SRC-TOOL-SUPPLY-002

## Problem

Modern products inherit significant risk from third-party packages.

Admonk needs to detect:
- known vulnerable dependencies;
- unsafe dependency changes;
- suspicious/malicious package behavior where risk justifies it;

without paying for several overlapping SCA/supply-chain products by default.

## Direction A — GitHub Dependabot + dependency review

GitHub provides:
- dependency graph;
- Dependabot vulnerability alerts;
- Dependabot security-update pull requests;
- version-update automation when configured;
- dependency review for pull requests where eligible.

### Strengths
- lowest-friction fit with canonical GitHub repositories;
- Dependabot alerts can be enabled broadly;
- security updates are available for repositories using Dependabot alerts;
- dependency review can block introduction of known vulnerable packages;
- repository-native remediation and audit trail.

### Price / limits
- strongest at known vulnerability/advisory data;
- private/internal dependency-review enforcement can require GitHub Code Security;
- automatic update PRs still require tests/review;
- version-update noise can become significant if configured too aggressively;
- malicious packages without known advisories may escape.

## Direction B — Socket

Socket analyzes dependency changes for behaviors associated with supply-chain attacks, such as:
- known/potential malware;
- typosquatting;
- install scripts;
- obfuscation;
- shell/network/filesystem/environment access;
- suspicious dependency sources.

### Strengths
- protects against risks that may exist before a CVE/advisory;
- PR-time focus is useful when adding/changing dependencies;
- especially relevant in an AI-development environment where new packages may be suggested quickly;
- can complement rather than merely duplicate known-CVE scanning.

### Price / limits
- adds another external service and policy surface;
- behavioral alerts require judgment;
- some legitimate packages intentionally use privileged behavior;
- may overlap vulnerability/license checks already supplied by GitHub;
- recurring commercial cost must be justified before broad rollout.

## Decision type

**Layered / conditional.**

Known-vulnerability management and malicious-package behavior are different failure modes.

But Admonk should not automatically pay for both full platforms everywhere.

## Decision

### GitHub dependency graph + Dependabot alerts — ADOPT NOW for GitHub-hosted Production repositories

This is the default known-vulnerability baseline.

### Dependabot security updates — ADOPT CONDITIONALLY

Enable when:
- package ecosystem is supported;
- automated remediation PRs will be reviewed/tested;
- PR volume remains manageable.

Do not blindly auto-merge dependency updates.

### GitHub dependency review — ADOPT CONDITIONALLY where entitlement exists or cost is justified

Use PR-time blocking/review for dependency additions/updates in security-sensitive Production repositories.

### Socket — PILOT CONDITIONALLY, not universal baseline

Pilot when one or more is true:
- product has high third-party dependency churn;
- AI-assisted development is introducing unfamiliar packages frequently;
- package-execution/install-script risk is material;
- malicious/typosquat dependency threat is part of the product threat model;
- a prior incident or near miss demonstrates CVE-only scanning is insufficient.

The pilot must measure:
- material findings not already caught by GitHub;
- false-positive/triage burden;
- time saved or incidents prevented;
- recurring cost.

Adopt broadly only if that incremental value exceeds duplicate-alert/tool cost.

## Operating rules

- lockfiles/manifests remain reviewable source artifacts;
- dependency updates must pass relevant R014 tests;
- do not treat "latest" as automatically safer;
- do not auto-merge high-impact dependency changes without evidence;
- removal is preferable when a dependency's value no longer justifies its risk/maintenance surface;
- exceptions to vulnerable dependencies must have owner/reason/review date.

## Decision Cost Ledger

**Benefit gained:**  
Cheap known-vulnerability coverage now with a path to stronger malicious-package protection if evidence demands it.

**Price paid:**  
Alert/update PR triage; possible Code Security entitlement; possible Socket pilot/service cost.

**New problem introduced:**  
Dependency tooling can create alert fatigue and update noise.

**Complexity cost:**  
Low for Dependabot baseline; Moderate if PR-time policy/Socket is added.

**Operating cost:**  
Low native baseline; entitlement/service costs only where justified.

**Speed cost:**  
Security-sensitive dependency changes may wait for review/testing.

**Governance cost:**  
Need owners for alerts, update policy and exceptions.

**AI/tool cost:**  
No model-token requirement for baseline. Socket's AI-assisted detections should be treated as signals requiring triage, not sole authority.

**Who pays:**  
Repository owner handles updates/findings; security/product owner approves higher-risk exceptions.

**Containment:**  
- keep one known-vulnerability baseline;
- add behavioral supply-chain tooling only where incremental value is measurable;
- tune update cadence;
- remove stale alerts/exceptions;
- no blind auto-merge.

## Tool-evaluation record

**Problem addressed:** Vulnerable or malicious third-party dependencies.  
**Decision it informs:** Block/update/remove/accept a dependency.  
**Evidence produced:** Vulnerability advisory, dependency diff, security-update PR, or suspicious-package behavior alert.  
**Reviewer:** Repository owner; security owner for material findings.  
**When it runs:** Continuous alerts + dependency-change PRs.  
**Action:** Patch, replace, remove, block, or document a time-bound exception.  
**Cost:** Triage/CI + possible security entitlement/service.  
**Data/security risk:** External dependency services receive package/repository metadata according to integration scope; review permissions before connection.  
**Replacement/exit:** Package manifests/lockfiles remain repository-owned; policy is tool-neutral.

## Revisit triggers

- supply-chain incident/near miss;
- dependency churn rises materially;
- Dependabot alert noise becomes unmanageable;
- Code Security pricing/entitlement changes;
- Socket pilot demonstrates meaningful incremental detection;
- package ecosystem changes;
- dependency automation begins creating more breakage than remediation value.

## Final rule

> **Use the cheapest dependable known-vulnerability baseline everywhere it applies. Add malicious-package behavior analysis only when the threat or evidence proves the extra tool is worth paying for.**

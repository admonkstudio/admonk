# T020 — Secret Scanning

**Date:** 2026-09-26  
**Mode:** Choice / Direction Research  
**Status:** DECIDED — ADOPT CONDITIONALLY  
**Capability:** Prevent and detect committed credentials/secrets  
**Decision owner:** Admonk Studio  
**Sources:** SRC-TOOL-SECRET-001, SRC-TOOL-SECRET-002

## Problem

R004 makes exposed secrets a universal security concern.

Admonk needs automated prevention/detection that:
- catches accidental credentials before or soon after commit;
- does not require an expensive security platform when a repository does not justify it;
- works with private GitHub repositories;
- has a practical bypass/false-positive process.

## Direction A — GitHub Secret Protection

GitHub provides:
- secret scanning across repository history;
- push protection that can block supported secrets before repository entry;
- provider-aware supported patterns;
- alerts and bypass/audit workflows;
- organization/repository policy controls.

### Strengths
- prevention occurs in the hosting platform;
- low maintenance for GitHub-hosted repos;
- repository history continues to be rescanned as patterns evolve;
- bypasses can be visible/auditable;
- integrates naturally with repository governance.

### Price
- private/internal organization repos require GitHub Secret Protection entitlement;
- capability depends on plan/vendor;
- pattern coverage is not universal;
- platform-native checks do not replace correct secrets management/rotation.

## Direction B — Gitleaks

Gitleaks provides:
- repository/history scanning;
- local directory/stdin scanning;
- pre-commit use;
- CI integration;
- configurable rules/baselines.

### Strengths
- portable and repository-controlled;
- independent of GitHub paid security features;
- easy to use as a CI/pre-commit fallback;
- mature and widely understood.

### Price
- another binary/configuration/CI step to own;
- push prevention depends on local hooks/CI timing rather than repository-host enforcement;
- false-positive/baseline process must be maintained;
- project is now feature-complete and mainly receiving security patches while active development shifts to Betterleaks.

## Decision type

**Conditional / provider-first with portable fallback.**

The capability is important, but running two full scanners everywhere would duplicate evidence and triage.

## Decision

### GitHub Secret Protection — ADOPT CONDITIONALLY AS PREFERRED HOST-NATIVE CONTROL

Use for organization-owned private/internal repositories when:
- entitlement is already available or its price is justified by repository/security risk;
- push protection can be centrally enabled;
- GitHub remains the canonical repository host.

### Gitleaks — ADOPT CONDITIONALLY AS PORTABLE FALLBACK

Use when:
- GitHub Secret Protection is unavailable/unjustified;
- local/pre-commit scanning is specifically required;
- another Git host/CI environment needs a portable scanner.

Do not run both by default unless evidence shows the second scanner catches material gaps that justify duplicate triage.

### Betterleaks — WATCH / FUTURE PILOT

Because Gitleaks' maintainer has shifted feature development toward Betterleaks, re-evaluate the portable fallback before a long-lived standard is frozen.

Do not switch the Foundation baseline to a newer successor solely because it is newer.

## Minimum operating rule

For serious Production repositories, automated secret detection must exist through at least one approved path.

Push-time prevention is preferred when the chosen tool/provider supports it economically.

Any real leaked credential requires:
- revocation/rotation;
- history/exposure assessment;
- incident/evidence record proportional to impact.

Removing the string from the latest commit is not sufficient remediation.

## Decision Cost Ledger

**Benefit gained:**  
Prevents a high-impact, common failure cheaply relative to breach/remediation cost.

**Price paid:**  
Plan cost or CI/tool maintenance plus false-positive/bypass triage.

**New problem introduced:**  
Developers may assume scanning catches every credential format.

**Complexity cost:**  
Low with GitHub native; low/moderate with portable CI scanner.

**Operating cost:**  
GitHub depends on entitlement; Gitleaks mostly CI/maintenance cost.

**Governance cost:**  
Need one owner for bypasses, exceptions and credential rotation incidents.

**Portability:**  
GitHub low/moderate; Gitleaks high.

**Exit path:**  
Secret policy is tool-independent; host-native and portable scanners can be replaced without changing application architecture.

## Tool-evaluation record

**Problem addressed:** Accidental committed credentials and secret sprawl.  
**Decision it informs:** Block/fix a push or rotate/remediate an exposed credential.  
**Evidence produced:** Secret finding/alert and repository location.  
**Reviewer:** Repository/security owner.  
**When it runs:** Push/commit/CI/history scan depending implementation.  
**Action:** Remove, revoke/rotate, assess exposure, document bypass/false positive.  
**Cost:** Host entitlement or portable CI maintenance.  
**Data/security risk:** Scanner output itself may contain sensitive snippets; protect logs/artifacts.  
**Replacement/exit:** Maintain tool-neutral secret policy; switch scanner/provider as needed.

## Revisit triggers

- GitHub Secret Protection becomes economically available/unavailable;
- portable scanner maintenance changes materially;
- Betterleaks demonstrates sufficient maturity/advantage;
- material secrets repeatedly escape the selected scanner;
- repository hosting changes.

## Final rule

> **Use one dependable automated secret-detection path by default. Prefer host-native push prevention when economically justified; keep a portable fallback rather than paying for duplicate scanners without evidence.**

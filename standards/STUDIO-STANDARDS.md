# Admonk Studio Standards — FOUNDATION-M1

**Status:** Approved / locked through S030
**Owner:** Admonk Studio

Standards define **what must be true and what evidence proves it**. Playbooks define how to perform the work. Apply standards proportionally to lifecycle stage and actual risk. Material deviations use S030/PB07.

## S001 — Production Readiness
Small universal Production floor; stronger controls triggered by actual risk. Evidence: critical behavior, access/secrets protection, failure detection, recovery, accessibility, ownership, applicable AI evaluation.

## S002 — Release Evidence
Three release-risk levels: Low / Medium / High. Universal minimum for all; stronger tests, rollout, approval and recovery evidence as risk rises.

## S003 — Security & Privacy
Minimum security/privacy floor plus risk-based external references: OWASP ASVS for web security, OWASP AISVS for AI, NIST SSDF and Privacy Framework for lifecycle/privacy governance.

## S004 — AI Autonomy
Level 1 read/analyse/recommend; Level 2 low-impact/reversible actions may earn automation; Level 3 high-impact/irreversible/external commitments require human approval. Consequential approval is action-bound: one approval may authorize execution when it explicitly covers the exact action/target/material parameters and remains valid; material change, expiry or revocation requires re-approval. AI cannot promote its own authority.

## S005 — AI Cost & Economics
Provider bill is financial truth; operational tracing attributes cost to product/customer/feature/model. Track useful unit economics and spending guardrails for meaningful AI workflows.

## S006 — Accessibility
WCAG 2.2 AA is the Production web floor. Automation supports but never replaces manual testing. Deeper assistive-technology evidence is proportional to impact.

## S007 — Testing
Test critical behavior at the cheapest useful level: fast logic tests, integration tests for boundaries, small E2E set for critical journeys, regressions from real failures. Coverage is a gap signal, not a target.

## S008 — Observability & Monitoring
Monitor user-impacting health; alert only when someone should act. Capture errors and add logs/metrics/traces where useful. Prefer OpenTelemetry-compatible instrumentation where practical.

## S009 — Product Analytics
Question-first analytics. Track only events that answer real product questions; start with activation, critical use, success/completion, drop-off and retention where relevant; clean obsolete tracking.

## S010 — AI Evaluation
Small mandatory must-not-break regression suite; targeted capability/edge-case suites only when justified. Meaningful Production failures feed future regression cases. Calibrate subjective automated grading against human judgment.

## S011 — Component Reuse & Design System
Local → Candidate → Trial → Stable. Promote only with real reuse evidence, documentation, accessibility, testing and ownership. Similar appearance is not reuse evidence.

## S012 — Design Tokens & Styling
Share semantic token meaning, not forced appearance. Product themes map semantic tokens to their own visual values. Prefer DTCG-compatible format where practical.

## S013 — Design Source of Truth
Figma owns design intent; code owns actual behavior. Connect them when reuse/drift cost justifies it. No mandatory continuous Figma↔code sync from day one.

## S014 — Performance
Use current Core Web Vitals as the shared web floor plus a few product-specific critical-journey targets. Prefer real-user/field evidence when available.

## S015 — Progressive Delivery & Feature Flags
Flags are optional by default and used when they materially reduce release risk or enable controlled learning. Temporary flags require owner + cleanup/removal condition.

## S016 — Reliability & Recovery
Universal recoverability floor; define RTO/RPO from business impact when needed; backups are not proven until restores are tested.

## S017 — Database Change & Migration Safety
All Production DB changes are versioned and tested. Risky/breaking changes are staged and rehearsed; use expand → migrate → contract when appropriate.

## S018 — API Contract
Experimental/local APIs may remain informal. Stable/shared/external APIs require repository-owned OpenAPI contracts and explicit compatibility/version/migration handling.

## S019 — Dependency & Supply Chain
Continuously monitor dependencies; deeper pre-adoption review only for high-impact/new-risk packages.

## S020 — Secrets & Credentials
Provider-native secure storage first + scanning + least privilege. Centralized vault only when scale/risk justifies it. Rotate/revoke compromised credentials immediately.

## S021 — Static Analysis & Code Quality
Language-native type/lint checks on Production code; deeper SAST when risk justifies it; human secure review remains necessary for context/business logic.

## S022 — Product Definition & Scope
Small evidence gate before meaningful build: user/problem → evidence → desired outcome → smallest coherent solution → real-user learning. Explicit Now / Later / Not-this-version boundary.

## S023 — Quality & Craft
Universal quality floor everywhere + concentrated premium craft on high-value moments.

## S024 — Engineering Simplicity & Architecture
Start simple, protect only expensive-to-change boundaries, evolve from evidence. New services/abstractions/vendors must justify permanent complexity and have a reversal path.

## S025 — Incident Response & Learning
Simple handling for ordinary failures; structured incident management for material incidents; blameless review for serious/repeated failures; corrective actions must have owners.

## S026 — Data Retention & Deletion
Purpose-based retention; delete or properly anonymize when purpose ends; stronger rules for sensitive/regulated data. Apply to logs, analytics and AI data as well as primary records.

## S027 — Documentation & Source of Truth
One authoritative source per information type, not one tool for everything. Docs-as-code for Foundation/technical rules. Prefer references over competing copies.

## S028 — Tool Adoption & Complexity
Evidence ladder: existing/native → lightweight addition → dedicated/heavier tool only when justified. Status: Adopt / Adopt conditionally / Pilot / Defer / Reject. Revisit/remove unjustified tooling.

## S029 — Ownership, Deprecation & Retirement
Meaningful Production products/services/integrations/deployed AI agents require identifiable owner and lifecycle: Active → Deprecated → Retired. Retirement handles dependencies, data, credentials, monitoring and infrastructure.

## S030 — Exceptions & Risk Acceptance
Standards are defaults. Material exceptions require explicit rule, reason, accepted risk/cost, owner/approval, and review/expiry when temporary. Permanent exceptions are allowed only when explicitly approved and remain reviewable.

## Foundation usability rule
If repeated classifications/checklists create more burden than value, simplify the Foundation rather than adding another governance layer.

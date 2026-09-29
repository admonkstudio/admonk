# FOUNDATION-M5-02 Validation — Recruiting / Recruiter

**Date:** 29/09/2026  
**Result:** PASS WITH M4 CORRECTIONS  
**Reference model:** `docs/reference-models/RECRUITING-RECRUITER-REFERENCE-MODEL.md`

## What M5-02 validated

The M4 template can represent a deep Recruiting domain without:
- creating a separate Recruiting application;
- treating Recruiter as a permission bundle;
- tying capabilities to Zoho or another ATS;
- treating a candidate and an application as the same entity;
- requiring one permanent Recruiting agent;
- requiring one universal hiring pipeline.

The A→E sparse/progressive model still works.

## Evidence basis

### Kalam operational evidence

Verified internal evidence included:
- Zoho Recruit reporting baseline covering source, language, UTM attribution, funnel, rejection/disqualification, recruiter workload, job-opening performance, aging, hires and data-quality exceptions;
- application-level reporting/time semantics;
- candidate/application distinction;
- Talent Acquisition CRM requirements for configurable pipeline, interview scheduling, communications, candidate pool, reporting and cross-system integration;
- Recruiter role/JD evidence covering demand intake, sourcing, screening, interviewing, assessment, candidate communication, offers/reporting and hiring-manager coordination;
- referral-process evidence spanning Marketing, Recruiting, Service Delivery and payment/finance readiness;
- Marketing/TA evidence showing the need to connect acquisition cost/quality to downstream Recruiting outcomes without flattening domain ownership.

Provider-specific and Kalam-specific configuration was used only as stress-test evidence.

### Provider/reference evidence

Current Zoho Recruit product documentation supports:
- Applications as candidate-to-job records;
- multiple applications for one candidate;
- application-level pipelines;
- configurable stages/statuses;
- transition ownership/evidence through Blueprint;
- historical pipeline/state visibility.

### Human-impact AI governance evidence

Current U.S./NIST/EU references were used only to test the architecture:
- employment-selection AI can create material discrimination/rights risks;
- human roles/oversight and evidence should be explicit;
- some jurisdictions treat recruiting/employment AI as high-risk or regulated.

The reusable conclusion is an explicit human-impact decision boundary, not one jurisdiction's policy promoted globally.

## M4 defects found

### M5-02-A — subject vs domain-record identity

**Problem:** M4 correctly says not to normalize different business entities, but does not explicitly model one natural person having multiple legitimate domain records.

Recruiting makes this unavoidable:
- one candidate can have multiple applications;
- a hired person may later have an employee/worker record;
- subject linkage cannot collapse these independent records/lifecycles.

**Correction:** add a governed subject-linkage rule with provenance/confidence and explicit preservation of domain-record identity.

### M5-02-B — human-impact decision boundary

**Problem:** generic action/risk class and approval semantics do not fully express the difference between:
- reading evidence;
- analyzing;
- recommending;
- deciding;
- executing a consequential decision about a person.

**Correction:** add a conditional human-impact decision overlay defining:
- decision role;
- accountable authority;
- required human review/approval where applicable;
- prohibited evidence/factors/uses;
- evidence/explanation/override/appeal/accommodation semantics where required by policy/law;
- jurisdiction/policy applicability;
- audit/provenance.

Capability access alone must not imply authority to make a consequential decision.

## Product insight — durable workspace without separate product

Marketing showed that a manager can use the common shell with contextual components.

Recruiting adds a complementary result:

A domain can justify a **persistent dense workspace** without becoming a separate top-level application.

Recruiting pipeline work benefits from:
- funnel/Kanban;
- application table;
- candidate/application detail;
- timeline/evidence;
- scheduling;
- decision review;
- aging/workload/data-quality views.

This remains a shared SIA/Work runtime composition.

## Analytics mirror interpretation

A dashboard or analytics layer that mirrors the Recruiting process is useful as:
- OBSERVED process evidence;
- derived performance evidence;
- bottleneck discovery;
- cross-source comparison.

It does not become the authority for source Recruiting records merely because it is easier to visualize.

If Analytics and Recruit disagree:
1. preserve both provenance paths;
2. identify population/grain/freshness differences;
3. prefer the authoritative source for the owned semantic fact;
4. mark the derived conclusion with quality/conflict state;
5. do not silently overwrite the configured process or source record.

## Key metric lesson

Recruiting strongly validates M4's metric-governance requirement.

Examples:
- Candidate Created Time and Application Created Time answer different questions;
- candidate count and application count are not interchangeable;
- one candidate with two applications must not silently become one application;
- source quality requires a governed downstream outcome and join confidence;
- cross-domain cost-per-hire requires both Marketing/Finance cost authority and Recruiting hire authority.

## SIA behavior boundary

SIA may:
- retrieve/summarize Recruiting evidence;
- identify bottlenecks;
- draft candidate communication;
- schedule procedural work where authorized;
- analyze source quality;
- prepare interview/application summaries;
- produce recommendations where policy permits;
- surface missing evidence and data-quality risks.

SIA must not gain final hiring/rejection/offer authority merely because:
- a connector exposes the write action;
- a specialist generated a score/recommendation;
- an automation can move a status;
- a user has a broad role label.

Decision authority is separately governed.

## M5-02 result

**PASS WITH M4 CORRECTIONS.**

The two corrections are reusable beyond Recruiting:
1. subject identity vs domain-record identity;
2. human-impact decision participation vs decision authority.

After applying both, M4 remains coherent and no Recruiting-specific architectural exception is required.

## Next

**M5-03 — Support / Support Manager.**

Support should specifically challenge:
- high-volume case/ticket identity;
- SLA/escalation;
- conversation/thread evidence;
- assignment/ownership;
- knowledge vs source truth;
- customer-impacting automation;
- cross-domain incident/problem handoffs;
- Support Manager workspace density.

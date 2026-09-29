# FOUNDATION-M5-01 Validation — Marketing / Marketing Manager

**Date:** 29/09/2026  
**Result:** PASS WITH M4 CORRECTIONS  
**Reference model:** `docs/reference-models/MARKETING-MARKETING-MANAGER-REFERENCE-MODEL.md`

## What M5-01 validated

The M4 template can represent a broad Marketing domain without:
- defining Marketing as a separate app;
- tying roles to permissions;
- tying capabilities to providers;
- requiring one agent per Marketing role;
- making all Marketing companies use the same process.

The sparse Layer A→E model worked.

## Evidence basis

Primary internal source:
`admonkstudio/marketing-hub`

Relevant canonical Marketing Hub decisions support:
- Strategy → Evidence → Analytics → Planning → Execution → Measurement → Learning → Strategy;
- Strategy, Evidence/Analytics, Planning/Operations, Performance, AI Intelligence and Governance as core Marketing layers;
- provider-native systems as authoritative for owned data;
- website/SEO, paid media, social/content, recruitment acquisition, CRM/lead generation, Marketing requests and automation as observed/required areas;
- explicit data quality, evidence and metric governance.

Kalam-specific facts were used as stress-test evidence only and were not promoted automatically.

## M4 defects found

### M5-01-A — requirement wording ambiguity
Fixed.

### M5-01-B — cross-domain process authority
Needs M4 correction before M5-02.

### M5-01-C — shared definition references
Needs M4 correction before M5-02.

## Product insight

Marketing Manager does **not** need a dedicated top-level application/workspace by default.

The common shell:
SIA / Work / Projects / Performance / Settings

is sufficient as the base lens when it can render Marketing-scoped semantic components and artifacts.

This is positive validation of the unified-environment thesis.

## Next

Apply the two M4 corrections, then start:
**M5-02 — Recruiting / Recruiter**.

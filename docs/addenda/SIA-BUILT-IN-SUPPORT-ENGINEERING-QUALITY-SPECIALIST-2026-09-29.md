# SIA Built-in Support — Engineering & Quality Specialist

**Date:** 29/09/2026  
**Status:** OWNER-DIRECTED PRODUCT ADDENDUM / feeds M4 and M6  
**Parent authority:** `docs/PRODUCT-MASTER-PLAN.md`

## Product intent

Users and internal team members should be able to report software problems directly to SIA.

SIA should understand the operating environment, relevant product decisions, current code/test state and user context, then route the issue to a reusable **Engineering & Quality Specialist Profile**.

This is not a separate bot personality and not a permanently active employee.

It follows the existing architecture:

> **SIA owns the user goal and escalation. The Engineering & Quality Specialist performs narrow technical investigation and remediation.**

## Core behavior

A user may say, for example:
- “This button is not working.”
- “The report shows the wrong number.”
- “Mobile navigation is broken.”
- “This workflow used to work yesterday.”
- “SIA keeps failing on this request.”

SIA captures:
- product/surface;
- user role and authorized scope;
- expected behavior;
- actual behavior;
- reproduction context;
- relevant artifact/run/error IDs;
- screenshots/files when supplied;
- environment/version when available.

SIA then invokes the specialist when technical investigation is justified.

## Specialist responsibilities

The Engineering & Quality Specialist may:
- inspect the relevant code/contracts/tests;
- reproduce the reported issue in an approved environment;
- classify defect vs expected behavior vs data/provider problem;
- identify regression risk;
- add or repair automated tests;
- implement a bounded fix when it fits accepted architecture;
- run the required quality suite;
- prepare a patch/PR;
- verify the corrected behavior;
- create an incident/issue artifact with evidence;
- report unresolved provider/infrastructure problems.

## Conflict rule

The specialist must **not** silently change product architecture.

If a requested fix conflicts with:
- current Product Master Plan;
- security/authority boundaries;
- data ownership;
- approved UX behavior;
- domain semantics;
- migration strategy;
- current milestone scope;
- cost/governance policy;

then it stops the conflicting remediation and returns the issue to SIA with:
- evidence;
- affected decision;
- user impact;
- available options;
- recommended decision question.

SIA/owner decides.

## Initial authority posture

Pilot default:
- read/investigate: allowed when authorized;
- reproduce/test: allowed in approved test/preview environments;
- code patch: allowed on bounded implementation branches;
- production deploy: approval required;
- security/permission changes: approval required;
- schema/destructive migrations: approval required;
- provider credential changes: approval required.

Authority may graduate later using the normal Shadow → Supervised → Bounded Autonomous lifecycle.

## Issue lifecycle

Recommended durable lifecycle:

```text
REPORTED
→ TRIAGED
→ REPRODUCED
→ DIAGNOSED
→ FIX_PROPOSED
→ FIX_IMPLEMENTED
→ VALIDATED
→ APPROVED_FOR_RELEASE
→ DEPLOYED
→ VERIFIED
→ CLOSED
```

Alternate terminal states:
- EXPECTED_BEHAVIOR
- DUPLICATE
- PROVIDER_BLOCKED
- NEEDS_PRODUCT_DECISION
- CANNOT_REPRODUCE

## Required artifact

Create a persistent **Issue / Incident Artifact** containing:
- stable ID;
- reporter;
- affected surface;
- environment;
- severity/impact;
- reproduction steps/evidence;
- linked SIA run(s);
- diagnosis;
- affected contract/component/process;
- fix commit/PR if any;
- tests run;
- approval receipt;
- deployment reference;
- verification;
- final resolution.

## Big-picture knowledge

The specialist must not depend on chat memory.

Its context should be assembled from:
- canonical Product Master Plan;
- current project checkpoint;
- accepted architecture/security contracts;
- repository instructions;
- design system/component registry;
- current test/evaluation suites;
- issue/run/artifact evidence;
- relevant Company Graph context;
- active branch/deployment metadata.

This specialist is one of the strongest examples of why project state must live outside conversations.

## Built-in support experience

The user should not need to know whether the problem belongs to:
- UI;
- API;
- workflow;
- data;
- permissions;
- provider;
- deployment.

They report it to SIA.

SIA:
1. acknowledges immediately;
2. gathers only missing evidence;
3. routes to the appropriate technical capability;
4. shows progress;
5. fixes automatically only within delegated authority;
6. escalates architectural conflicts;
7. reports the verified result.

## Product implication

“Support” becomes more than a help center.

SIA can provide an intelligent operational support layer combining:
- product help;
- issue reporting;
- incident triage;
- technical diagnosis;
- test/reproduction;
- bounded remediation;
- human escalation.

This capability should be represented in the Operating-Model / Capability Template and frozen later in the Cross-Domain / SIA contracts.

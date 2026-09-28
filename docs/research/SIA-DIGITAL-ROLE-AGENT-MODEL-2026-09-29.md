# SIA Digital Role / Agent Model

**Date:** 2026-09-29  
**Status:** MAJOR PRODUCT THESIS — INCLUDE IN MASTER-PLAN RE-AUDIT  
**Environment name:** temporary working name SOLO  
**Intelligent operator:** SIA

---

## 1. Core idea

A role in the company operating model should not be inherently human.

The same modeled role can be fulfilled by:

- a human;
- a SIA digital specialist;
- a human + SIA hybrid;
- temporarily unfilled capacity.

This allows SIA to reason over the company's operating model before deciding who or what should perform the work.

Principle:

> **Model the work first; assign the worker second.**

---

## 2. Role model

Every modeled role can contain:

- purpose/outcomes;
- responsibilities;
- recurring tasks;
- processes;
- inputs;
- outputs;
- required systems;
- required data;
- artifacts;
- metrics;
- collaborators/handoffs;
- escalation paths;
- decision boundaries;
- approval requirements;
- authority/capabilities;
- expected service levels;
- evidence/quality checks.

That structure can serve both human and digital workers.

---

## 3. Worker types

### Human
A normal employee/person assigned to the role/responsibility.

### SIA Specialist
A bounded digital worker configured from the same role/responsibility model.

### Hybrid
Human retains ownership while SIA performs selected work:
- preparation;
- research;
- drafting;
- monitoring;
- classification;
- reconciliation;
- repetitive actions;
- follow-up.

### Unfilled
A required responsibility or process position exists but has no current sufficient owner/capacity.

This state is important because it lets SIA identify organizational/process gaps.

---

## 4. Discovery-to-agent loop

SIA can potentially detect:

- repeated unassigned work;
- excessive backlog;
- recurring handoff failure;
- single point of failure;
- role overload;
- frequent overtime/manual repetition;
- repetitive deterministic work;
- persistent SLA breach;
- recurring task repeatedly delegated ad hoc;
- responsibility present in reference/configured process but absent in observed ownership;
- work where a specialist role commonly exists but the company has no equivalent owner.

SIA should not immediately create an autonomous agent.

Recommended lifecycle:

```
Detect gap/opportunity
→ explain evidence
→ identify missing responsibility/capacity
→ recommend: redesign / automate / augment / hire / digital specialist / keep human-led
→ generate candidate role blueprint
→ review permissions + systems + escalation
→ simulate/test
→ shadow
→ supervised
→ bounded autonomous
→ continuous measurement
```

---

## 5. Critical recommendation: SIA should not recommend an agent for every gap

A missing/broken process may require:

- remove the step;
- redesign the workflow;
- connect systems;
- train the person;
- clarify ownership;
- automate deterministically;
- hire/reassign a human;
- add a SIA Specialist;
- use hybrid human + SIA.

The recommendation engine should choose among these options.

This prevents agent proliferation.

---

## 6. SIA Specialist

Working technical concept:

> **A SIA Specialist is a role-scoped agent profile assembled from a verified role/responsibility blueprint, governed company context, approved capabilities and an explicit authority envelope.**

It is not a separate personality/product.

The user still experiences **SIA** as the primary intelligent presence.

Internally the runtime may execute work through one or more SIA Specialists.

Example:

Marketing department contains:
- Marketing Manager — Hisham
- SEO — Tawfiq
- Marketing Reporting — unfilled/repetitive capacity

SIA observes:
- monthly report preparation takes 14 hours;
- inputs are stable;
- 80% of work is repeatable;
- final interpretation/approval belongs to Hisham.

SIA may recommend:

**Create SIA Marketing Reporting Specialist**

Responsibilities:
- collect governed data;
- normalize metrics;
- populate report;
- flag anomalies;
- draft narrative;
- prepare evidence.

Human retains:
- interpretation;
- business judgment;
- final approval;
- communication.

---

## 7. Shadow mode — critical differentiator candidate

Before giving a digital specialist production authority, allow it to work in parallel.

### Shadow mode

The SIA Specialist:
- receives the same task/context;
- produces its proposed output;
- does not perform consequential external actions;
- records time/cost/output;
- can be compared with the human or existing process.

Compare:
- quality;
- accuracy;
- completion time;
- cost;
- correction rate;
- escalation rate;
- policy compliance;
- outcome metric.

This creates evidence before automation.

Example:

> “Run the SIA SEO Reporting Specialist beside Tawfiq for the next four weekly reports. Do not publish anything. Compare results.”

After four runs:

```
Human process
Average time: 3h 20m
Correction rate: baseline
Cost: X

SIA Specialist
Average runtime: 7m
Human review: 18m
Corrections required: 2/4
Estimated cost: Y

Recommendation:
Keep SIA in supervised mode; accuracy threshold not yet met for autonomous publishing.
```

---

## 8. Promotion lifecycle

Suggested states:

1. **DRAFT**
2. **SIMULATION**
3. **SHADOW**
4. **SUPERVISED**
5. **BOUNDED_AUTONOMOUS**
6. **SUSPENDED**
7. **RETIRED**

Authority expands only through explicit promotion.

Promotion must consider:
- minimum trial count;
- success/error thresholds;
- cost;
- severity of possible failure;
- human review requirements;
- provider/security constraints;
- compliance;
- business-owner approval.

No SIA Specialist self-promotes.

---

## 9. Compare human vs digital without turning employees into a surveillance leaderboard

Performance evaluation must focus on the **process/task outcome**, not covert employee scoring.

Acceptable comparisons:
- cycle time;
- correctness;
- rework;
- cost;
- SLA;
- output quality;
- exception rate.

Avoid:
- hidden individual productivity rankings;
- opaque employee scoring;
- replacing people based solely on model-generated judgments.

The product should help the company decide how work is allocated, not become an unaccountable HR surveillance system.

---

## 10. Role catalog → agent catalog

The existing SIA operating-model library becomes much more valuable.

A role archetype can contain two related definitions:

### Human operating lens
What the person sees, owns and does.

### Digital execution profile
Which responsibilities/tasks are eligible for SIA execution, with:
- tools;
- context;
- instructions;
- deterministic workflow;
- approval points;
- escalation;
- quality checks.

This means SIA can ship with tested specialist candidates without making customers design agents from scratch.

Examples:
- Marketing Reporting Specialist
- SEO Research Specialist
- Social Content Operations Specialist
- Recruiting Screening Assistant
- Support Triage Specialist
- Meeting Follow-up Specialist
- Invoice Reconciliation Specialist

These should be capability templates, not fictional employee characters.

---

## 11. Process-level staffing model

Each process step can declare an assignment policy:

- human_only;
- human_preferred;
- hybrid;
- digital_preferred;
- digital_allowed;
- deterministic_automation;
- approval_required.

Example:

```
Campaign reporting

Collect source data        → deterministic automation
Normalize metrics          → deterministic automation
Detect anomalies           → SIA Specialist
Draft explanation          → SIA Specialist
Interpret business impact  → hybrid
Approve report             → human
Send externally            → human approval / governed action
```

This is more precise than “replace the Marketing Analyst with an agent.”

---

## 12. Capacity model

A digital specialist can also be proposed because of capacity, not role absence.

Example:
- three human recruiters exist;
- application volume spikes;
- screening backlog exceeds target;
- SIA proposes temporary digital screening capacity;
- bounded specialist handles low-risk pre-screen work;
- ambiguous/rejected/high-risk cases escalate to humans;
- digital capacity scales back when demand falls.

This makes agents elastic capacity inside the same operating model.

---

## 13. Relationship model

SIA Specialists participate in the Company Graph as governed workers but remain distinguishable from humans.

Graph example:

```
SIA Reporting Specialist
├─ fulfills → Monthly Marketing Reporting
├─ reports_output_to → Hisham
├─ reads → GA4
├─ reads → Ads data
├─ produces → Monthly Marketing Report
├─ escalates_to → Hisham
└─ authority → draft_only
```

Every relationship must make the worker type explicit.

Never impersonate a human.

---

## 14. Market validation

Current 2026 products already validate major pieces:

- Glean Transform maps recurring work by role/function, ranks opportunities and drafts agent/skill blueprints.
- ServiceNow Autonomous Workforce ships role-scoped AI specialists embedded in governed workflows.
- Salesforce Agentforce Operations assigns workflow tasks to AI agents, tests their plans, locks plans for repeatable execution and supports human reviewers/fallbacks.
- Microsoft Research's CORPGEN explores digital employees operating across multi-horizon workplace tasks.

Therefore the category is validated.

Potential SOLO/SIA distinction:

> **The digital worker is generated from the same role/responsibility/company operating model used for humans, can be proposed automatically from observed process gaps, and has a first-class evidence-based promotion path from shadow to bounded autonomy.**

---

## 15. Strong recommendation

Do **not** expose an agent builder as the primary experience.

Primary experience:

> “SIA found a repeatable capacity gap in this process. Here are the options.”

Then:

- Fix process
- Connect system
- Reassign responsibility
- Create automation
- Add SIA Specialist
- Keep human-led

If the owner chooses SIA Specialist, most configuration should already be populated from:
- role;
- task;
- process;
- systems;
- authority;
- company policy;
- existing evidence.

Advanced administrators can inspect/customize it.

---

## 16. Strategic effect

This turns the operating-model library into more than onboarding content.

It becomes a **workforce architecture**.

The same definition can support:

- teach a new human employee;
- configure their SOLO workspace;
- evaluate process conformance;
- define a hybrid assistant;
- instantiate a SIA Specialist;
- test the digital specialist;
- measure human/digital process allocation;
- adapt staffing when demand changes.

This is a major product-level leverage point.

---

## 17. Audit requirements

The master-plan audit must evaluate:

- role model compatibility;
- agent authority;
- worker identity;
- licensing/pricing;
- human labor/legal implications;
- observability/evaluation;
- shadow testing;
- process mining/privacy;
- agent lifecycle;
- cost ceilings;
- failure/escalation;
- capacity scaling;
- role inheritance/versioning;
- organizational change impact;
- employee trust/adoption.

Do not lock full autonomous workforce behavior until those areas are tested.


---

## 18. SIA as Company Brain

The owner clarified the intended ceiling:

> **SIA is the company brain. It may suggest, follow orders, coordinate work, temporarily fill missing capacity, operate specialist functions, analyze outcomes and report upward for decision-making.**

This should be interpreted as:

> **No artificial functional ceiling, but always bounded authority.**

SIA may potentially:
- advise;
- answer;
- analyze;
- investigate;
- audit;
- prepare;
- communicate;
- coordinate;
- schedule;
- delegate;
- assign;
- monitor;
- execute;
- temporarily staff roles/functions;
- instantiate specialist digital workers;
- supervise digital workers;
- request human decisions;
- escalate;
- summarize/report to owners/managers;
- hand work back to humans.

SIA must still be constrained by:
- explicit tenant/company policy;
- user/delegator authority;
- role/capability scope;
- provider limits;
- legal/regulatory requirements;
- privacy/data boundaries;
- approval thresholds;
- risk classification;
- runtime/credit budgets;
- auditable action receipts.

SIA's ambition is broad capability, not unrestricted authority.

---

## 19. Department continuity / emergency staffing

A department or function can become temporarily under-capacity or fully unstaffed.

Example:
- recruiting team resigns;
- core recruiting workflows must continue;
- company owner authorizes temporary digital coverage.

Potential SIA response:

1. identify responsibilities that must continue;
2. identify which are safely executable by deterministic automation;
3. identify which can be assigned to SIA Specialists;
4. identify which legally/policy-wise require humans;
5. instantiate a temporary Recruiting Department coverage plan;
6. assign digital specialists to bounded responsibilities;
7. keep approval/escalation paths to the owner or authorized manager;
8. produce daily/weekly operating reports;
9. maintain complete audit/provenance;
10. allow new human hires to progressively take over responsibilities.

The digital department is **temporary operating capacity**, not a permanent replacement assumption.

Human re-entry should be first-class:
- shadow SIA;
- review history/artifacts;
- accept responsibility transfer;
- reduce digital authority;
- retire temporary specialists when appropriate.

---

## 20. User-directed orchestration

SIA must also support direct operational delegation from ordinary authorized users.

Example:
A recruiter asks:

> "Report today's meeting. Call the first five candidates, capture the findings and recordings, then audit the collected documents and send the package to the next department for verification."

SIA should decompose this into governed work:

```
meeting context
→ identify candidate list
→ verify call/contact permissions
→ schedule/place calls through approved channel
→ capture permitted recording/transcript
→ extract structured findings
→ audit collected documents
→ flag missing/inconsistent items
→ prepare verification package
→ request approval if required
→ send/route to next department
→ create completion receipt/report
```

The user experiences one request to SIA.

Internally, SIA may use:
- deterministic workflows;
- communication capabilities;
- document audit specialist;
- meeting/recording capability;
- recruitment specialist;
- routing/escalation logic.

The user should not need to manually orchestrate those sub-agents.

---

## 21. Company-brain operating loop

SIA's core operating loop can be modeled as:

```
Observe
→ Understand
→ Compare against company/reference model
→ Decide what kind of response is appropriate
→ Suggest OR act according to delegated authority
→ Coordinate humans/software/digital specialists
→ Verify outcome
→ Record evidence
→ Report upward/outward
→ Learn/update operating context
```

The "decide" step does not mean SIA has sovereign authority.

It means SIA selects an allowed next step inside the current authority envelope.

---

## 22. No-limits principle — precise wording

Do not use:
> "SIA can do anything."

Use:

> **SIA should have no arbitrary product-imposed ceiling on the kinds of business work it can understand and coordinate, while every action remains bounded by explicit authority, policy, evidence and risk controls.**

This preserves the long-term ambition without weakening safety, governance or enterprise trust.

---

## 23. Why this differs from a collection of AI employees

The architecture is not:

```
AI Recruiter
AI Marketer
AI Finance Agent
AI Support Agent
```

with users selecting bots.

The architecture is:

```
                 SIA
          Company Brain / Operator
                    │
          Company Operating Model
                    │
      ┌─────────────┼─────────────┐
      │             │             │
    Humans     Automations    SIA Specialists
      │             │             │
      └─────────────┴─────────────┘
              Business Work
```

SIA remains the coherent intelligence visible to the user.

Specialists are bounded execution roles beneath it.

---

## 24. Strategic consequence

SIA can support:
- one-person companies;
- normal human-led teams;
- hybrid human/digital teams;
- temporary capacity expansion;
- temporary department continuity;
- eventually more autonomous operating functions where evidence, law, policy and authority permit.

This makes workforce composition dynamic while preserving one company model.

The company can move continuously between:
- human-led;
- hybrid;
- digitally augmented;
- temporarily digital-heavy;
- back to human-led

without migrating to another product or rebuilding the process model.

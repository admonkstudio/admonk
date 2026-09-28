# Admonk / Harvey External Challenge Validation Audit — 2026-09-28

**Status:** RESOLVED — OWNER ACCEPTED ARCHITECTURE FINDINGS / RESTORED JARVIS / PARKED CHARACTERS  
**Method:** post-reconciliation internal architecture audit challenged against high-value external sources  
**Scope:** Harvey identity/characters, RQ-01..25 architecture, Product Platform Foundation, Control Room, SCALE roadmap, Product Supervisor integration  
**Implementation authority:** None

## Owner resolution — 2026-09-28

The owner accepted the architecture/scaling/Control Room challenge findings and resolved the product questions as follows:
- restore **Jarvis** as the canonical current product name;
- do not proceed with Harvey as a product identity;
- remove character profiles from the active architecture;
- park character/persona variants as a possible future add-on only if the gender/persona concerns are later resolved;
- resume the official Foundation sequence at **M2-19 — Version / Compatibility / Migration**.

This audit remains valuable historical validation but is no longer an open decision gate.

## 1. Audit method

This audit intentionally tries to disprove or weaken current choices.

Each major architecture/product choice is checked against:
- AWS Well-Architected SaaS Lens;
- Azure Architecture Center;
- Google SRE;
- NIST Zero Trust / AI Risk Management Framework;
- OpenTelemetry;
- OpenAI evaluation guidance;
- Anthropic agent evaluation/context-engineering guidance;
- Microsoft Human-AI Interaction guidance;
- Google Conversation Design;
- current public Harvey AI brand/trademark evidence where naming is concerned.

The goal is not architectural conformity. External sources are used as pressure tests:
- where they validate our direction, keep it;
- where they expose a trade-off, document it;
- where they reveal avoidable risk, change or defer.

## 2. Executive result

> **Architecture: STRONG PASS.**
>
> **Product identity / naming: MATERIAL RISK.**
>
> **Character system: PASS WITH REFINEMENT.**
>
> **Scaling roadmap: PASS, but must remain multidimensional and evidence-triggered.**
>
> **Control Room: STRONG PASS if it remains issue/action-first rather than a custom monitoring stack.**
>
> **Foundation: PASS; M2-19 → M2-19A → M2-20 remains the correct next architecture sequence.**

The audit does not recommend reopening RQ-01..25.

It recommends one major product decision revisit:
> **Do not treat “Harvey” as externally launch-safe until professional name/trademark clearance is completed.**

---

# PART A — CHALLENGE MATRIX

## C-01 — One Harvey core + Operating Lenses

**Current choice:** one intelligent experience/core with department/company/operator lenses rather than separate assistants/brains.

**External challenge:** large enterprise AI systems often become domain-specific because context, tools, policy and quality requirements diverge.

**Evidence:** Anthropic emphasizes selective context engineering because context is finite and should be curated for the task; Microsoft human-AI guidance emphasizes contextual relevance and clear capability expectations.

**Pros**
- consistent user mental model;
- shared quality/eval/security;
- no duplicated permission/memory stacks;
- cross-product continuity;
- simpler commercial story.

**Cons**
- one orchestration layer can become bloated;
- lens rules can become hidden complexity;
- poor context isolation could create cross-domain leakage.

**Decision:** **KEEP.**

Guardrail:
> one Harvey experience, but specialist products remain domain authorities and task context remains just-in-time.

Sources:
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/

---

## C-02 — Federated specialist products + shared contracts

**Current choice:** separate product repositories/domain ownership with shared contracts rather than one giant app/database.

**External challenge:** independent repositories increase version skew, deployment coordination and contract-migration cost.

**Evidence:** Azure recommends explicit visibility into which infrastructure/software/feature version each tenant uses and supports progressive deployment rings, stamps and API version strategies.

**Pros**
- independent domain evolution;
- clear ownership;
- smaller blast radius;
- products can be sold/operated independently.

**Cons**
- compatibility discipline becomes mandatory;
- more release coordination;
- cross-product debugging is harder.

**Decision:** **KEEP, CONDITIONAL ON M2-19.**

Without strong compatibility/version/migration contracts, this choice becomes fragile.

Source:
- https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/updates

---

## C-03 — Pooled SaaS first, targeted isolation later

**Current choice:** pooled/shared default; targeted/dedicated isolation only when load/compliance/noisy-neighbor evidence justifies it.

**External challenge:** dedicated/silo architectures are simpler to isolate and reduce blast radius.

**Evidence:** AWS explicitly documents the trade-off:
- pooled infrastructure improves agility, cost efficiency and unified operations;
- siloed infrastructure improves isolation/noisy-neighbor containment but costs more and is operationally heavier;
- targeted isolation can mix the two where needed.

**Pros**
- lower early cost;
- faster product evolution;
- unified operations;
- efficient utilization.

**Cons**
- stronger tenant-isolation engineering required;
- larger shared blast radius;
- noisier cost attribution;
- noisy-neighbor risk.

**Decision:** **KEEP.**

This is exactly the kind of trade-off SCALE-3/SCALE-4 exists to manage.

Sources:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/pool-isolation.html
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/silo-isolation.html
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/targeted-isolation.html

---

## C-04 — SCALE-0 through SCALE-6 roadmap

**Current choice:** pre-planned structural stages with evidence-based Scale Gates.

**External challenge:** scale rarely evolves linearly. One workload or tenant may need isolation/region before the whole platform does.

**Evidence:** AWS recommends decomposing services according to individual multi-tenant load/isolation profiles; Azure stamps/rings can apply to selected tenants or groups.

**Pros**
- architecture is planned before crisis;
- cost/risk are explicit;
- migrations become governed;
- owner can see what comes next.

**Cons**
- numbered levels can create false pressure to “graduate”;
- teams may overbuild the next stage prematurely;
- platform-wide label can hide workload-specific reality.

**Decision:** **KEEP WITH ONE REFINEMENT.**

Treat SCALE-0..6 as a **capability/evolution map**, not a maturity score.

Control Room must show:
- platform default stage;
- stage by workload;
- tenant placement/isolation exceptions.

Sources:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/general-design-principles.html
- https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/updates

---

## C-05 — Control Room

**Current choice:** custom visual Operations/Quality/Architecture control surface over specialist telemetry/eval systems.

**External challenge:** “single pane of glass” projects often become expensive internal platforms that duplicate observability products.

**Evidence:** AWS supports tenant-aware operational views and unified operations; Google SRE recommends actionable monitoring focused on user impact and key signals instead of humans staring at dashboards.

**Pros**
- owner can understand the platform without coding;
- cross-tool correlation;
- tenant-aware operations;
- issue → evidence → action journey;
- scaling/release/quality become visible together.

**Cons**
- very easy to overbuild;
- custom trace/log UI duplicates mature tools;
- Control Room itself becomes security-critical;
- “full visibility” can become privacy-invasive if content capture is careless.

**Decision:** **STRONG KEEP, WITH STRICT SCOPE.**

Control Room should custom-build:
- system/resource map;
- issue correlation;
- Task X-Ray summary;
- scaling/release state;
- governed runbooks;
- owner-friendly explanations.

It should integrate/deep-link rather than rebuild:
- raw log explorer;
- full trace explorer;
- metrics engine;
- detailed eval UI;
- error stack tooling.

Sources:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/tenant-aware-operations.html
- https://sre.google/sre-book/monitoring-distributed-systems/

---

## C-06 — Platform Operator access

**Current choice:** add M2-19A rather than use tenant super-admin.

**External challenge:** platform support occasionally needs broad access; least-privilege workflows add friction.

**Evidence:** NIST Zero Trust explicitly rejects implicit trust based on affiliation/location and requires identity/resource-level authorization; NIST least privilege limits access to what is needed for the task.

**Pros**
- protects tenant trust;
- reduces insider/support blast radius;
- clear audit;
- environment-specific safety.

**Cons**
- slower investigations;
- more access workflow;
- break-glass process must be reliable.

**Decision:** **STRONG KEEP.**

Operational convenience is not enough reason to create a universal super-admin.

Sources:
- https://csrc.nist.gov/pubs/sp/800/207/a/final
- https://csrc.nist.gov/glossary/term/least_privilege

---

## C-07 — AI eval-first architecture

**Current choice:** task-specific layered evaluations, traces, real failures → regression cases.

**External challenge:** eval infrastructure can become a product of its own and slow early experimentation.

**Evidence:** both OpenAI and Anthropic recommend structured, task-specific evaluation; Anthropic explicitly argues eval value compounds and recommends realistic tasks, multiple grader types and production-failure feedback.

**Pros**
- changes become measurable;
- model/provider replacement is faster;
- quality regressions are caught;
- routing/cost/latency decisions use evidence.

**Cons**
- upfront work;
- graders can themselves be wrong;
- test suites can become stale;
- subjective UX still needs human review.

**Decision:** **STRONG KEEP.**

Lab should start with the smallest representative regression set, not a huge benchmark program.

Sources:
- https://developers.openai.com/api/docs/guides/evaluation-best-practices
- https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

---

## C-08 — Metadata-first telemetry

**Current choice:** operational metadata by default; raw AI/user content only when explicitly required and governed.

**External challenge:** deeper content often makes AI debugging much easier.

**Evidence:** OpenTelemetry's GenAI conventions explicitly warn that input/output messages may contain sensitive user/PII data. NIST AI RMF emphasizes ongoing governance, monitoring, accountability and privacy/risk management throughout the lifecycle.

**Pros**
- stronger privacy;
- lower data leakage risk;
- lower retention burden;
- safer cross-tenant operations.

**Cons**
- some AI failures become harder to reproduce;
- deeper debugging may require controlled capture;
- masking can remove useful evidence.

**Decision:** **KEEP.**

Add controlled “diagnostic capture windows” for explicitly authorized cases rather than continuous raw-content logging.

Sources:
- https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/
- https://airc.nist.gov/airmf-resources/airmf/5-sec-core/

---

## C-09 — Four Harvey Character Profiles

**Current choice:** Male/Female × Professional/Friendly.

**External challenge:** Google Conversation Design recommends building persona from meaningful traits and specifically advises against using gender as the defining persona dimension; it notes users automatically infer competence, warmth, status and other traits from voice. Microsoft recommends matching social norms while mitigating social bias.

**Pros**
- user choice;
- voice/presentation flexibility;
- friendly vs professional is commercially understandable;
- can improve accessibility/preference fit.

**Cons**
- four “characters” can fragment one Harvey brand;
- gender labels can trigger stereotypes;
- four profiles multiply voice/UX/localization/eval work;
- tone combinations may feel artificial if treated as hard personas.

**Decision:** **KEEP THE CAPABILITY, REFINE THE PRODUCT FRAMING.**

Recommended:
- one canonical Harvey personality/brand;
- **Professional/Friendly** as interaction-style preference;
- multiple voice/avatar identities available to users;
- voice choices may include male/female presentation, but gender should not define behavior;
- public UI should consider named voice/character previews instead of making gender the core personality label;
- do not build four separate character systems.

Sources:
- https://developers.google.com/assistant/conversation-design/create-a-persona
- https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/

---

## C-10 — “Harvey” product name

**Current choice:** Harvey is the canonical forward product identity.

**External challenge:** **major existing AI brand collision.**

Current Harvey AI Corporation operates a prominent enterprise AI platform used in legal and professional services. Its product already includes agents, knowledge, memory, workflow/platform features and a Command Center. Its current website reports thousands of organizations and use across many countries.

The UK Intellectual Property Office published a 2026 HARVEY application from Harvey AI Corporation covering broad AI software/SaaS categories including:
- data analysis;
- knowledge management;
- workflow automation;
- decision support;
- conversational agents;
- task/project automation;
- professional services beyond legal.

This scope is materially adjacent to Admonk's intended intelligent enterprise software category.

**Pros**
- human, memorable;
- fits the character concept;
- less generic than “assistant”.

**Cons**
- immediate market confusion;
- search/SEO discoverability disadvantage;
- possible trademark/legal conflict;
- enterprise buyers may assume connection with Harvey AI;
- expensive future rebrand if we build identity assets now.

**Decision:** **RED FLAG — DO NOT TREAT AS LAUNCH-CLEARED.**

Recommended:
1. Harvey may remain an **internal working name** temporarily.
2. Pause external brand investment under Harvey.
3. Run professional trademark/name/domain clearance in intended markets/classes.
4. If clearance is weak, rename before design system, character art, domains or public launch.

This is a brand-risk conclusion, not legal advice.

Sources:
- https://www.harvey.ai/
- https://www.ipo.gov.uk/t-tmj/tm-journals/2026-035/UK00004420811.html

---

## C-11 — “AI-first, not chat-only”

**Current choice:** Harvey dynamically moves between conversation, visual workspace and specialist dashboard.

**External challenge:** adaptive interfaces can confuse users if the system's capabilities and state are not predictable.

**Evidence:** Microsoft Human-AI guidelines emphasize making capabilities/limitations clear, showing contextually relevant information and supporting efficient correction/dismissal.

**Pros**
- interaction matches task;
- avoids forcing dense work into chat;
- preserves dashboard precision;
- strong differentiation.

**Cons**
- dynamic layout can feel unpredictable;
- accessibility/testing scope increases;
- workspace generation adds latency/cost.

**Decision:** **KEEP.**

Lab must prove Dynamic Workspace beats simpler templates for the task; otherwise use deterministic templates.

Source:
- https://www.microsoft.com/en-us/research/project/guidelines-for-human-ai-interaction/

---

## C-12 — Minimum Production runtime roles

**Current choice:** logical Control, Interactive, Durable/Async and Connector runtime roles.

**External challenge:** seed architecture can be over-segmented before load exists.

**Evidence:** AWS states there is no one-size-fits-all SaaS architecture and recommends decomposition according to load/isolation profile.

**Pros**
- clear failure/pressure boundaries;
- connector credentials/backfills isolated;
- interactive work protected.

**Cons**
- unnecessary deployment complexity if treated as four services;
- distributed debugging/network cost.

**Decision:** **KEEP AS LOGICAL ROLES ONLY.**

M2-20 must be free to begin with fewer physical deployables.

Source:
- https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/general-design-principles.html

---

# PART B — POST-CHANGE INTERNAL DEFECT CHECK

## 3. Rename regression found and corrected

The Harvey rename had accidentally changed external proper nouns in the new canonical experience document:
- `open-jarvis/OpenJarvis` became `open-jarvis/OpenHarvey`;
- Jarvis Institute became Harvey Institute.

This was a documentation migration bug, not an architecture decision.

Corrected on 2026-09-28.

Lesson:
> Product-name migrations must exclude external proper nouns/repository names.

---

# PART C — WHAT EXTERNAL RESEARCH MOST STRONGLY VALIDATES

## 4. Strongest validated choices

### Tenant boundary / pool-first architecture
Strongly aligned with AWS SaaS Lens.

### Unified but tenant-aware operations
Strongly aligned with AWS SaaS operational guidance.

### Evidence-triggered stamps/isolation
Strongly aligned with AWS targeted isolation and Azure deployment-stamp/update guidance.

### Explicit operator authority
Strongly aligned with NIST zero-trust/least-privilege principles.

### Layered AI evaluation
Strongly aligned with OpenAI + Anthropic.

### Metadata-first AI telemetry
Strongly aligned with OpenTelemetry privacy warnings + NIST risk governance.

### One persona with controlled presentation
External UX research validates deliberate persona design, but challenges gender as the personality-defining axis.

---

# PART D — WHAT WE SHOULD CHANGE

## 5. Required refinements

### R1 — Harvey becomes “working name pending clearance”
Do not invest further in launch branding until naming/legal clearance.

### R2 — Character system becomes one Harvey persona + selectable presentation
Keep:
- Professional/Friendly style;
- voice/avatar choice;
- male/female voice presentation if desired.

Avoid:
- four independent branded personas;
- gender-driven behavioral traits.

### R3 — Scale stages are not a maturity score
Display:
- default platform stage;
- stage by workload;
- tenant-specific placement/isolation.

### R4 — Control Room remains a control spine
Do not rebuild telemetry/eval/logging products.

### R5 — M2-19/M2-19A/M2-20 remain mandatory before Production topology
Do not let RQ-25 diagrams harden into service count.

---

# PART E — TRADE-OFFS WE ARE DELIBERATELY ACCEPTING

## 6. Accepted costs

### Federated product architecture
Accept:
- compatibility/version work
for:
- domain autonomy and independent evolution.

### Pooled SaaS
Accept:
- stronger isolation engineering
for:
- cost/agility/operational efficiency.

### Control Room
Accept:
- custom correlation/operations UX
for:
- owner control and cross-system understanding.

### One Harvey
Accept:
- context/routing complexity
for:
- one coherent intelligent experience.

### Eval-first AI
Accept:
- upfront quality infrastructure
for:
- measurable improvement and provider/model replaceability.

---

# PART F — FINAL CHALLENGE VERDICT

## 7. Architecture verdict

> **KEEP THE ARCHITECTURE.**
>
> The independent external challenge validates the central design:
> - shared contracts + specialist domain authority;
> - one intelligent experience rather than many assistants;
> - deterministic authority around AI;
> - evidence-first AI quality;
> - pool-first SaaS with planned isolation/stamps;
> - tenant-aware Control Room;
> - scale by measured constraints rather than hypothetical size.

The architecture is ambitious but internally disciplined enough to remain buildable **if M2-20 is allowed to choose a simpler physical deployment than the logical diagrams suggest**.

## 8. Product verdict

> **THE PRODUCT IDEA IS STRONGER THAN THE CURRENT NAME.**

The most serious post-change risk is not technical—it is branding.

The Harvey identity collides directly with an established and rapidly scaling enterprise AI brand operating in adjacent professional-software territory.

Therefore:

> **Harvey should be considered a working codename pending professional clearance, not a launch-ready product name.**

The character idea is viable, but the strongest version is:
> **one recognizable personality, multiple voices/avatars, Professional/Friendly presentation modes, situational tone adaptation.**

This gives users personalization without fragmenting the brand or encoding gender stereotypes into product behavior.

## 9. Challenge-audit conclusion

> **GREEN — architecture**
>
> **GREEN — scaling strategy**
>
> **GREEN — Control Room**
>
> **GREEN — AI governance/evals**
>
> **AMBER — character UX until Lab-tested**
>
> **RED — Harvey external naming until trademark/brand clearance**

## 10. Recommended next move

Do **not** reopen architecture discovery.

Next:
1. owner accepts/revises these challenge findings;
2. mark Harvey as working-name-pending-clearance or choose another name;
3. refine Character Direction accordingly;
4. resume M2-19 → M2-19A → M2-20;
5. run Lab against the remaining product hypotheses rather than architecture already validated.

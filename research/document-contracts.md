# Document Contracts

Document contracts define what a future doctrine/standard/playbook document is allowed to become before content is authored.

They do **not** contain doctrine answers.

## Contract schema

**Document:**  
**Type:** Doctrine / Standard / Playbook  
**Purpose:**  
**Decision it supports:**  
**Required questions:**  
**Required evidence:**  
**Allowed assumptions:**  
**Owner:**  
**Reviewer(s):**  
**Created when:**  
**Updated when:**  
**Must not contain:**  
**Downstream dependencies:**  

---

## Planned foundational doctrine contracts

### doctrine/product-principles.md

**Type:** Doctrine  
**Purpose:** Define Admonk's durable beliefs about discovering, defining, scoping and evolving software products.  
**Decision it supports:** Whether a product/feature is ready to move from idea into governed delivery.  
**Required questions:** Product-definition research questions in `research/research-questions.md`.  
**Required evidence:** Research synthesis plus real-project validation.  
**Allowed assumptions:** None may be presented as doctrine; unresolved assumptions stay labeled.  
**Owner:** Admonk Studio.  
**Reviewer(s):** Product owner + relevant specialist where needed.  
**Created when:** Research synthesis is ready for manual doctrine review.  
**Updated when:** Material evidence changes the principle or its limits.  
**Must not contain:** Generic feature patterns, fixed business models, client-specific strategy.  
**Downstream dependencies:** Product Supervisor gates, Product Brief/MVP spec contracts.

### doctrine/design-principles.md

**Type:** Doctrine  
**Purpose:** Define durable beliefs about premium UX/design quality while preserving product-specific visual identity.  
**Decision it supports:** What quality principles must guide design without standardizing aesthetic answers.  
**Required evidence:** UX/design/accessibility research and project examples.  
**Must not contain:** A universal dashboard layout, fixed palette, fixed visual style, or client-independent art direction.

### doctrine/engineering-principles.md

**Type:** Doctrine  
**Purpose:** Define durable beliefs about simplicity, maintainability, abstraction, dependencies, architecture proportionality and reversibility.  
**Decision it supports:** Whether technical complexity is justified.  
**Required evidence:** Engineering literature, platform guidance, incident/case evidence, project validation.  
**Must not contain:** One mandatory framework/stack or universal folder structure.

### doctrine/security-principles.md

**Type:** Doctrine  
**Purpose:** Define durable security/privacy beliefs and non-negotiable boundaries.  
**Decision it supports:** What security requirements may never be treated as optional convenience.  
**Required evidence:** Current standards/official security guidance and risk context.  
**Must not contain:** Unverified compliance claims or one-size-fits-all controls without risk context.

### doctrine/ai-autonomy-principles.md

**Type:** Doctrine  
**Purpose:** Define when AI may read, draft, propose, execute, approve or be denied authority.  
**Decision it supports:** Human/AI responsibility boundaries.  
**Required evidence:** AI/security/risk research plus adversarial evaluation.  
**Must not contain:** Model-specific authorization assumptions.

### doctrine/operations-principles.md

**Type:** Doctrine  
**Purpose:** Define durable beliefs about observability, recovery, release responsibility, cost and scale.  
**Decision it supports:** What makes a product responsible to operate and when scaling is justified.  
**Required evidence:** Reliability/operations research and real release evidence.  
**Must not contain:** Enterprise operations ceremony without proportional need.

## Standard/playbook contracts

Standards and playbooks should be created only after the relevant doctrine is approved.

A standard must convert doctrine into testable expectations.
A playbook must convert doctrine/standards into a repeatable procedure.

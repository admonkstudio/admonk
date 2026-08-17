# Admonk Agent Architecture

This document defines how Admonk's AI system should scale across Admonk itself and future client projects.

The central principle is:

> **Studio intelligence should travel. Client identity should not.**

Admonk's reusable methods, quality standards, design thinking, motion principles, image-production workflow, UX rules, engineering guidance, and QA processes should be usable across client work.

Admonk's own business positioning, website copy, portfolio language, and company-specific decisions should remain specific to the Admonk repository.

---

# 1. Three Context Layers

Every project should distinguish three kinds of knowledge.

## Layer A — Studio Intelligence

Reusable across projects.

Examples:

- Web design methodology
- UX systems
- Design-quality review
- Image direction and production
- Motion principles and production
- Browser QA
- GSAP knowledge
- React engineering
- Platform implementation skills
- Accessibility, performance, testing, and security practices

This is the **Admonk Agent Kit** layer.

## Layer B — Client / Brand Context

Specific to one client.

Examples:

- Business model
- Audience
- Positioning
- Brand identity
- Brand guidelines
- Content
- Competitors
- Objectives
- Products/services
- Constraints
- Existing systems
- Approved decisions

This belongs in the client's repository.

## Layer C — Project / Platform Context

Specific to the implementation.

Examples:

- Figma
- Webflow
- Astro
- React / Next.js
- CMS choice
- Hosting
- Analytics
- CRM
- APIs
- Motion technology
- Browser support
- Performance targets

This also belongs in the client's project repository.

---

# 2. Authority Order

For client projects, use this hierarchy:

```text
1. Current explicit user/client instruction
        ↓
2. Client business and brand context
        ↓
3. Current project requirements
        ↓
4. Admonk studio principles
        ↓
5. Relevant Admonk task skills
        ↓
6. Platform-specific skills
        ↓
7. External skills / MCPs
        ↓
8. Generic best practices
```

This prevents the reusable Admonk system from forcing the Admonk website's visual identity onto client work.

---

# 3. Current Repository Role

The `admonkstudio/admonk` repository currently serves two purposes:

1. Admonk's own company/business context.
2. The development ground for Admonk's reusable agent system.

Do not duplicate the entire repository into client projects.

Reusable skills can be distributed to client projects or installed in a shared personal/global skill location where the active Codex environment supports it.

Client repositories should contain only client/project-specific context plus any skills that genuinely need project-local overrides.

---

# 4. Recommended Client Repository Structure

Use the template under:

```text
templates/client-project/
```

A client project should normally look like:

```text
client-project/
├── AGENTS.md
├── docs/
│   ├── CLIENT-BUSINESS.md
│   ├── BRAND-GUIDELINES.md
│   ├── PROJECT-BRIEF.md
│   ├── CONTENT.md
│   ├── PROJECT-DECISIONS.md
│   └── PLATFORM.md
├── .agents/
│   └── skills/
│       └── client-specific skills only when needed
└── actual project files
```

The reusable Admonk skills should be supplied separately rather than copied into every client's documentation.

---

# 5. Client Context Loading

Before design or implementation, determine what context is relevant.

## Business / strategy task

Read:

- `docs/CLIENT-BUSINESS.md`
- `docs/PROJECT-BRIEF.md`

## Brand / design task

Read:

- `docs/BRAND-GUIDELINES.md`
- `docs/PROJECT-BRIEF.md`
- relevant supplied assets

## Copy/content task

Read:

- `docs/CONTENT.md`
- `docs/CLIENT-BUSINESS.md`
- `docs/BRAND-GUIDELINES.md`

## Implementation task

Read:

- `docs/PLATFORM.md`
- `docs/PROJECT-BRIEF.md`
- existing project/code structure

## Continuation or revision

Also read:

- `docs/PROJECT-DECISIONS.md`

Do not load every context file for every task.

---

# 6. Client Brand Overrides Admonk Aesthetic Preferences

Admonk's skills should improve the quality of client work without making every client look like Admonk.

Reusable principles include:

- Strong visual concepts
- Intentional composition
- Purposeful motion
- Quality control
- Responsive thinking
- Accessibility
- Technical performance
- Business relevance

Non-reusable defaults include:

- Admonk-specific colors
- Admonk-specific typography
- Admonk website layouts
- Admonk copy
- Admonk portfolio treatment
- A fixed house style applied regardless of client identity

The studio signature should be **quality of thinking and execution**, not visual sameness.

---

# 7. Platform Skills Are Execution Layers

Platform skills must not redefine the design.

Examples:

```text
admonk-figma
→ design-system and canvas execution

admonk-webflow
→ visual production and CMS implementation

admonk-astro
→ code-native lightweight website implementation

admonk-react-engineering
→ React/Next engineering quality
```

The platform is selected because it fits the project.

Do not select the project because a platform skill is available.

---

# 8. Capability Library Strategy

Admonk should maintain a broad capability library because future client needs are unpredictable.

However, broad capability does not mean every skill should influence every task.

Use progressive disclosure:

```text
Skill exists
      ↓
Task matches its description
      ↓
Skill loads
      ↓
Relevant references load only if needed
```

This allows future-ready capability without flooding normal tasks with unrelated guidance.

---

# 9. New Client Workflow

When a new client arrives:

1. Create a repository from `templates/client-project/`.
2. Populate the client business and brand context.
3. Record the project objective and deliverables.
4. Record existing systems before proposing replacements.
5. Choose the implementation platform after requirements are understood.
6. Activate the relevant reusable Admonk skills.
7. Build.
8. Verify in the real environment.
9. Record major decisions and exceptions.
10. Reuse project learning without leaking confidential client data into unrelated projects.

---

# 10. Reusable Knowledge vs Learned Client Knowledge

Reusable learning can be promoted back into Admonk's studio system when it is generalizable.

Example:

```text
Client project reveals a recurring Webflow/GSAP issue
        ↓
Confirm it is general, not client-specific
        ↓
Add the lesson to the relevant Admonk skill
```

Do not promote:

- Private client information
- Credentials
- Proprietary strategy
- Confidential metrics
- Client-specific copy
- Licensed client assets

---

# 11. Future Direction

As the system grows, the preferred long-term split is:

```text
admonk
→ Admonk company context + development/testing of the system

admonk-agent-kit
→ reusable studio skills, references, templates, evaluation workflows

client repositories
→ client identity + actual implementation
```

A separate `admonk-agent-kit` repository should be created when the reusable layer becomes mature enough to version independently.

Until then, the current repository remains the source of truth for the reusable system.

---

# Final Principle

> **Carry the method. Learn the client. Choose the tool. Build the project.**

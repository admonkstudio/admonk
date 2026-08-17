# Client Project Agent Rules

This repository contains one client/project.

Reusable Admonk studio skills may be available to the agent, but the client's business, brand, and project context take priority over general studio preferences.

## Context

Before major work, load only the relevant files:

- Business / positioning → `docs/CLIENT-BUSINESS.md`
- Brand / visual identity → `docs/BRAND-GUIDELINES.md`
- Project objective / scope → `docs/PROJECT-BRIEF.md`
- Copy / content → `docs/CONTENT.md`
- Previous decisions → `docs/PROJECT-DECISIONS.md`
- Technical/platform constraints → `docs/PLATFORM.md`

## Authority

Use this priority:

1. Current explicit user/client instruction.
2. Client business and brand context.
3. Current project requirements.
4. Admonk studio principles.
5. Relevant Admonk skills.
6. Platform-specific skills.
7. External skills/MCPs.
8. Generic best practices.

## Core Rules

- Do not make the client look like Admonk unless the client brief genuinely calls for it.
- Preserve strong existing brand assets and systems.
- Integrate before replacing functioning systems.
- Do not invent client facts, metrics, testimonials, awards, or proof.
- Do not commit secrets or credentials.
- Use the simplest technology that satisfies the requirement.
- Test the real rendered experience before declaring implementation complete.
- Record material project decisions in `docs/PROJECT-DECISIONS.md`.

## Delivery Standard

The final work should be:

- Aligned with the client's identity.
- Purposeful for the business objective.
- Visually intentional.
- Usable and accessible.
- Responsive.
- Technically sound.
- Tested in the target environment.

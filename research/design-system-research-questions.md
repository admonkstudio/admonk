# Design System Foundation — Research Questions

**Status:** Research backlog; not approved doctrine.

## Foundation boundary

- Which design decisions should be reusable across products?
- Which decisions should remain product-brand or domain-specific?
- How should a design foundation support distinct visual identities without fragmenting behavior?
- What is the minimum useful design-system layer before a component library exists?

## Tokens

- Which token layers are useful: primitives, semantic roles, component tokens, theme tokens?
- Which semantic roles are robust across product types?
- Which values should never be standardized globally?
- How should tokens map between design tools and code?
- When do tokens improve maintainability versus create abstraction overhead?

## Components

- What evidence justifies creating a shared component?
- When should a product keep a local component instead?
- What makes a component API stable enough for reuse?
- How should variants/states be bounded to prevent component bloat?
- When is composition preferable to adding another variant?

## Interaction patterns

- Which behaviors should remain predictable across products?
- Which workflows are domain patterns rather than generic UI patterns?
- How should loading, empty, error, permission, partial-data and destructive states be represented?
- When does a familiar interaction improve trust, and when can product-specific interaction be justified?

## Accessibility

- Which accessibility requirements should be non-negotiable?
- Which rules belong in the foundation versus product QA?
- What evidence should be required before a reusable component is considered accessible?

## Responsive behavior

- Which responsive principles generalize across product classes?
- How should dense dashboards/data tables differ from content-led products?
- How should input modality (touch/pointer/keyboard) influence component behavior?

## Content

- Which interface-writing rules generalize without flattening product tone?
- What disclosure/labeling should apply to AI-generated content?
- How should error, confirmation and permission language be governed?

## Governance

- Which changes require design-system review?
- When should a new token, component, pattern or behavior be rejected?
- How should exceptions be recorded?
- How should breaking changes across consumers be managed?
- What usage evidence should trigger extraction into a shared component package?

## Tooling

- What should Figma represent versus code?
- How should drift between design and implementation be detected?
- Which automated visual/accessibility checks are valuable at different maturity levels?

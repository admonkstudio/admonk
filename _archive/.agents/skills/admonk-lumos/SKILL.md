---
name: admonk-lumos
description: Architect, build, review, or maintain professional Webflow projects using the Lumos framework. Use for new Lumos-based Webflow sites, Lumos class naming, variables, typography/color systems, components, page structure, fluid sizing, breakpointless responsive behavior, grids, utilities, trigger/state attributes, Figma-to-Webflow translation, or auditing an existing Lumos project. Lumos governs Webflow implementation architecture, not Admonk creative direction.
---

# Admonk Lumos

Lumos is Admonk's **preferred Webflow architecture for serious new production builds when no stronger project-specific system already exists**.

It is not Admonk's visual language.

Core relationship:

```text
Client brand + business objective
        ↓
Admonk creative direction
        ↓
Admonk UX / motion / image systems
        ↓
Lumos Webflow architecture
        ↓
Webflow production
```

Core rule:

> **Admonk decides what should be designed. Lumos helps Webflow stay systematic while we build it.**

Native implementation rule:

> **Lumos should be implemented through Webflow's native Designer capabilities wherever Webflow supports the requirement. Custom code extends Lumos only where Webflow itself ends.**

---

# 1. When to Use Lumos

Prefer Lumos when:

- Starting a substantial new Webflow project.
- The project needs a maintainable system across many sections/pages.
- Client editors will maintain or build pages after handoff.
- Variables, components, reusable layout systems, responsive behavior, and long-term consistency matter.
- Figma and Webflow should share a more deliberate design-system relationship.

Lumos is optional when:

- Building a tiny experiment or disposable prototype.
- The project is a very small one-page build where framework overhead adds no real value.
- Webflow is not the chosen production platform.

Do **not** impose Lumos when:

- An existing client project already uses Client-First, MAST, a proprietary framework, or another coherent system.
- Migrating the site would create more risk than value.
- The client explicitly requires another framework.

For existing systems follow:

> **Integrate → Improve → Replace only when justified.**

---

# 2. Version Discipline

Lumos evolves.

Never assume conventions remembered from a previous project still represent the current release.

For every Lumos project:

1. Determine the project's Lumos version or approximate generation.
2. Read the matching/current official Lumos documentation before structural work.
3. Preserve the project's established version conventions during maintenance unless migration is explicitly approved.
4. Record the Lumos version in the client project's `docs/PLATFORM.md` or equivalent project context.
5. Do not mix class, variable, component, or responsive conventions from different Lumos releases casually.

For a new project, check the current stable Lumos documentation/changelog before setup.

---

# 3. Authority Boundaries

Lumos may govern:

- Class architecture
- Utility/combo-class usage
- Variable organization
- Typography implementation
- Color/theme implementation
- Size and spacing systems
- Grid/flex utilities
- Containers
- Components and slots
- Page structure
- Responsive implementation
- Trigger/state architecture
- Client-editable build structure

Lumos does **not** decide:

- Brand positioning
- Visual concept
- Composition
- Art direction
- Font selection merely because the starter uses a font
- Color palette merely because the starter contains colors
- Image direction
- Motion concept
- Storytelling
- Page hierarchy
- Whether the site should visually resemble another Lumos site

Do not let framework availability become creative sameness.

---

# 4. Inspect Before Building

Before creating or changing Lumos structure:

- Inspect existing Webflow classes.
- Inspect variables and variable modes.
- Inspect existing components and component props/slots.
- Inspect page structure.
- Inspect custom CSS/JavaScript.
- Identify project-specific deviations from standard Lumos.
- Check whether the project's documentation records custom classes, components, or variables.

Do not create a duplicate utility, variable, class, or component if the project already provides an appropriate one.

Also audit existing custom CSS/JS for rules that Webflow can now express natively. Do not preserve unnecessary code simply because an older implementation used it.

---

# 5. Class Architecture

Lumos distinguishes three class roles:

1. **Custom classes** — define an element's role within a project/component.
2. **Utility classes** — apply reusable system behavior/style.
3. **Combo classes** — contextual modifications stacked with a base/custom class.

For current Lumos V2 projects, follow the current official naming rules rather than inventing an Admonk alternative.

Important custom-class principles from Lumos:

- Use a meaningful component/context prefix.
- Use underscores between words for custom classes.
- Keep names concise and structural rather than describing incidental visual values.
- Keep the custom class first in the class stack.
- Current Lumos guidance limits custom-class names to no more than three underscores.

Example conceptual structure:

```text
hero_wrap
hero_layout
hero_content
hero_title
hero_visual
```

Do not generate meaningless AI names such as:

```text
wrapper-7
left-col-new
big-text
section-div-copy
```

## Utility Discipline

Use existing Lumos utilities when they express a genuine reusable system value.

Do not stack utilities merely because they are available.

If the same one-off combination repeatedly appears and represents a meaningful component role, consider whether a custom class/component is clearer.

Do not create project-specific utilities until checking whether Lumos already provides the behavior.

---

# 6. Variables First

Lumos relies heavily on variables to make Webflow scalable.

For repeated design values prefer the project's native Webflow/Lumos variable system over hard-coded one-off values when appropriate.

Common variable domains include:

- Site viewport range
- Site margin/gutter
- Maximum widths
- Spacing/fluid sizes
- Typography families/weights/sizes/line heights/letter spacing
- Text styles
- Swatches
- Theme values
- Component/system-specific values
- Responsive/state/trigger values in versions that provide them

When adapting the Lumos starter to a client:

1. Translate the client's real design system into Webflow variables.
2. Do not preserve starter values simply because they exist.
3. Avoid hard-coded duplication that defeats global control.
4. Add project-specific variables only when they represent real reusable decisions.
5. Do not create a parallel CSS custom-property system in embedded code when native Webflow variables can own the value.

Variables serve the design; the design does not serve the starter variables.

---

# 7. Typography

Use Lumos's typography architecture for implementation consistency while allowing the client's typography to define the actual visual language.

Translate:

- Font families
- Weights
- Fluid sizes
- Line heights
- Letter spacing
- Text wrapping
- Text styles

into the project's Lumos/Webflow variable and text-style system.

Do not replace client typography with framework defaults.

Check actual browser rendering across platforms, especially for fonts with different Windows/macOS metrics.

Typography utilities should make global changes easier, not flatten all editorial hierarchy into a generic preset.

---

# 8. Color and Theme System

Use Lumos theme/swatches and native Webflow variables/modes when they improve systematic color behavior.

Useful cases:

- Section themes
- Light/dark/brand contexts
- Text/background/border relationships
- Button states
- Inputs
- Reusable surfaces
- Component variants

A theme system is infrastructure, not an instruction to force every design into a few repeated color blocks.

Client brand colors and art direction remain authoritative.

Do not recreate native theme/variable behavior in custom CSS unless the project requires functionality Webflow does not provide.

---

# 9. Fluid Size and Breakpointless Principles

Modern Lumos increasingly favors fluid sizing, container-aware behavior, and content-driven responsive decisions instead of solving every change through Webflow's fixed pixel breakpoints.

Use these principles where the project's Lumos version and Webflow capabilities support them:

- Fluid sizes between defined viewport limits.
- `clamp()`-style scaling through Lumos/Fluid Builder systems.
- Container-aware behavior where supported.
- Content-driven wrapping.
- Responsive variables/utilities when supplied by the version.
- Breakpoints only when the composition genuinely needs a structural change.

Native-first requirement:

- If Webflow exposes the responsive property/control required, use the Designer.
- If Lumos provides the utility/variable, use that system.
- Use embedded CSS media/container queries only when Webflow itself cannot express the required responsive behavior cleanly.

This does **not** mean never designing mobile explicitly.

Admonk still requires intentional mobile art direction.

Use fluid architecture to reduce arbitrary overrides, then make explicit structural changes where the design needs them.

Always test:

- Browser zoom
- Text enlargement
- Long content/localization
- Tablet/intermediate widths
- Mobile
- Touch interaction

---

# 10. Size and Spacing

Use the Lumos spacing system to create rhythm and global control.

Prefer reusable project spacing tokens/variables over random values when the distance represents a system decision.

Optical adjustments are still allowed.

Do not turn every composition into a rigid mathematical grid when art direction requires controlled asymmetry.

Rule:

> **Systemize recurring spacing. Art-direct exceptional spacing.**

Use native Webflow spacing controls for both system and optical values rather than embedded CSS when the property is supported.

---

# 11. Grid and Layout

Use Lumos grid/flex/container utilities and Webflow's native layout controls as structural tools.

Do not allow the default grid system to force every section into the same composition.

Admonk may create unusual layouts, overlaps, asymmetry, editorial compositions, spatial storytelling, and custom motion while retaining a clean underlying Lumos structure.

Before adding custom CSS for layout, check whether the current Webflow Designer can express the required grid, flex, positioning, sizing, overflow, transform, aspect-ratio, sticky/fixed, or other CSS behavior natively.

If Webflow supports it, use Webflow.

Use custom CSS such as unsupported selectors/properties, advanced subgrid/container logic, specialized masks, or other features only when the required behavior is not available cleanly through the native platform.

Document any custom layout CSS so later editors know why it exists.

---

# 12. Components

Lumos treats components as core building blocks.

Use components to create consistency and safe client editing without turning the page into a library of generic blocks.

## Open Components

Prefer open components when flexibility matters.

They typically use slots and allow elements/content to be added, removed, or rearranged.

Good for:

- Flexible section structures
- Reusable layout shells
- Client page-building freedom
- Systems that need many creative content combinations

## Closed Components

Use closed components when structure/content should remain controlled across instances.

They typically use component properties/variants.

Good for:

- Navigation
- Footer
- Modal/forms
- Repeated CTAs with controlled structure
- Elements where consistency outweighs free composition

Do not convert every unique art-directed section into a closed component.

Choose component rigidity according to editing risk and reuse.

Prefer native Webflow component slots/properties/variants over code-driven templating when they satisfy the requirement.

---

# 13. Page Structure

Follow the project's Lumos page architecture unless a documented project requirement changes it.

Current Lumos documentation includes concepts such as:

```text
page_wrap
├── global styles / guides where used
├── navigation
├── page_main / page slot
│   └── page-specific sections
└── footer
```

The main content area should remain semantically appropriate and editable according to the project handoff model.

If cookie consent, global modals, accessibility tools, global overlays, or other infrastructure is required, place them intentionally rather than disrupting the core page organization randomly.

---

# 14. Trigger and State

Where the Lumos version provides trigger/state systems, prefer their data-attribute/state architecture for simple predictable UI states when it keeps behavior visible and maintainable in Webflow.

Useful states may include concepts such as:

- current
- checked
- open
- expanded
- external
- active

Use the project's actual implementation and current docs rather than inventing attribute syntax from memory.

Prefer Webflow-native states/interactions and Lumos trigger/state conventions before JavaScript when the required behavior is natively achievable.

For advanced choreography, `admonk-motion` and `admonk-motion-production` still choose the appropriate technology.

Lumos state systems do not replace GSAP when GSAP is genuinely the better motion engine.

---

# 15. Figma → Lumos → Webflow

When a project uses Figma before Webflow, aim for conceptual continuity between environments.

Translate intentionally:

```text
Figma variables/tokens
→ Lumos/Webflow variables

Figma components
→ Webflow/Lumos components where reuse/editability matches

Figma spacing/layout logic
→ Lumos grid/container/spacing architecture

Figma responsive intent
→ fluid/container/responsive Lumos implementation
```

Do not blindly mirror every Figma frame/group as a Webflow div.

Do not componentize merely because a Figma component exists; verify its production role.

Use `admonk-figma` for Figma operations and `admonk-webflow` for platform operations.

---

# 16. Motion Inside Lumos

Lumos provides structure; Admonk motion skills own motion decisions.

Routing:

```text
Simple hover / transition / transform / opacity / state
→ Webflow native Style panel / state

Standard interaction supported cleanly by Webflow
→ Webflow native interaction

Lumos state/trigger behavior
→ Lumos + native Webflow implementation

Advanced sequence / scroll choreography / complex SVG / behavior beyond Webflow capability
→ GSAP/custom code
```

Do not write CSS/JavaScript for a simple animation just because code is easier for an agent to generate.

Do not treat an MCP limitation as a Webflow limitation. If Webflow can create the interaction natively but the current agent tool cannot author it, record/use a native Designer step rather than defaulting to code.

Animation code should target stable intentional hooks/classes/attributes without making the framework impossible to edit.

Avoid creating layout structure solely to satisfy an animation hack when a cleaner wrapper/hook would work.

---

# 17. Client Handoff

One of Lumos's strongest values is maintainability after delivery.

Before handoff:

- Ensure variables reflect the client design system.
- Ensure components have understandable names.
- Expose only useful component properties.
- Keep page-building primitives understandable.
- Remove abandoned experiments/classes/components where safe.
- Document project-specific additions/deviations.
- Explain which areas are safe for client editing.
- Preserve advanced custom-code areas from accidental editing where possible.
- Minimize custom code so the site's normal styling/layout remains editable inside Webflow.

For substantial projects, document custom Lumos additions in the client repository and/or project documentation.

---

# 18. AI / Webflow MCP Rules

When an agent is building through Webflow tools/MCP:

- Inspect before creating.
- Reuse existing variables/components/classes.
- Follow Lumos naming rather than generating arbitrary names.
- Prefer Webflow-native variables/components when Lumos expects them.
- Use the Style panel/native Designer capabilities for supported CSS rather than embedded CSS.
- Use native responsive controls before custom media-query code.
- Use native CMS/forms/settings/components before recreating equivalent behavior in JavaScript.
- Use native Webflow states/interactions when they can achieve the intended behavior cleanly.
- Preserve client editor usability.
- Verify actual output after structural changes.

## Native-First Decision Test

Before any custom CSS or JavaScript is introduced, the agent must determine whether Webflow itself supports the requirement.

```text
Can Webflow do it natively?
        │
        ├── YES → use Webflow Designer/platform capability
        │
        └── NO  → custom code may be considered
```

This includes CSS properties supported by Webflow's Style panel. If Webflow can set the property, do not duplicate it in embedded CSS.

## Tool Limitation Rule

If a Webflow MCP operation cannot express a native Lumos/Webflow requirement cleanly, do **not** corrupt the framework or jump to custom code merely to keep the task fully automated.

Instead:

1. Check for another native Webflow tool/action.
2. Preserve the intended native architecture.
3. Document the manual/native Designer step if automation cannot reach it.
4. Use custom code only when Webflow itself lacks the required capability, not simply because the MCP lacks the operation.

Mandatory distinction:

> **MCP limitation ≠ Webflow limitation.**

---

# 19. Migration Into Lumos

Do not migrate an existing project to Lumos by default.

Migration is justified only when expected benefits outweigh:

- Regression risk
- SEO risk
- CMS complexity
- Component rebuild effort
- Custom-code dependencies
- Client retraining
- Timeline/cost

If migration is approved:

1. Inventory the current system.
2. Map old conventions to Lumos equivalents.
3. Migrate incrementally where possible.
4. Preserve behavior and semantic structure.
5. Replace avoidable code with native Webflow/Lumos capabilities where safe.
6. Run full responsive/browser/form/SEO QA.
7. Document breaking changes.

---

# 20. Quality Review

Before calling a Lumos Webflow build complete, check:

## Architecture

- Classes follow the project's Lumos convention.
- Utility use is intentional.
- Variables replace avoidable duplication.
- Components match real reuse/editing needs.
- Page structure is consistent.

## Native Webflow Use

- Supported CSS is implemented through Webflow rather than unnecessary `<style>` blocks.
- Native layout/responsive controls are used where capable.
- Native components/CMS/forms/settings are used instead of avoidable code equivalents.
- Custom interactions/code exist only where Webflow cannot achieve the requirement cleanly or where a documented advanced implementation is genuinely better.
- No custom code exists solely because the current MCP lacked access to a Designer capability.

## Design

- Lumos has not flattened the creative concept.
- Client brand remains visible and specific.
- Sections do not look templated simply because components exist.

## Responsive

- Fluid behavior works between major widths.
- Explicit structural changes are added where necessary.
- Browser zoom/text enlargement remain usable.
- Mobile is intentionally designed.

## Production

- Necessary custom code is documented with the native limitation it solves.
- Forms/CMS/integrations still work.
- Browser QA is complete.
- Client editing is understandable.

Use `admonk-browser-qa` for final real-browser verification.

---

# Source Discipline

Lumos is version-sensitive.

Primary references:

- Official Lumos documentation by Timothy Ricks & Caleb Raney.
- Official `lumosframework/skill` repository.
- Lumos Webflow starter/cloneable.
- Official Lumos Figma resource.

When remembered guidance conflicts with the current project or current Lumos documentation, follow the project's version/current authoritative source.

See `UPSTREAM.md` for attribution and integration decisions.

---

# Final Principle

> **Use Lumos to make the Webflow system invisible. Use Webflow natively wherever possible, and add code only beyond the platform's real limits.**

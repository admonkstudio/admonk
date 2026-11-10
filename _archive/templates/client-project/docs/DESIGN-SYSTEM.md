# Client Design System

This file records the **implementation-facing design system** for the project.

It does not replace the client's original Style Sheet, Figma library, Webflow classes, components, variables, or other canonical design-system source. It tells the agent where those sources live, how they are organized, and which rules must be preserved.

Core rule:

> **Inspect and reuse the client's design system before inventing a new style, class, token, component, or pattern.**

---

# 1. Canonical Sources

List the real sources of truth.

## Webflow

- Style Sheet page name: `Style Sheet`
- Style Sheet page URL / page ID:
- Brand Guideline page name: `Brand Guideline`
- Brand Guideline page URL / page ID:
- Webflow variables/modes source:
- Webflow component library/source:
- Framework/system and version:

## Figma

- Design-system/library file:
- Brand guideline file:
- Variables/tokens source:
- Component library:
- Code Connect/component mappings:

## Other

- External design-system documentation:
- Brand asset repository:
- Icon library:
- Motion library:

If canonical sources conflict, record the conflict in `PROJECT-DECISIONS.md` before silently choosing one.

---

# 2. Source-of-Truth Priority

Unless the client explicitly defines another order, use:

```text
Current explicit client/user instruction
        ↓
Approved brand guideline / strategy source
        ↓
Live project design system (Style Sheet / Figma library / variables / components)
        ↓
Project-specific decisions
        ↓
Admonk reusable skills
        ↓
Framework defaults / generic best practices
```

Framework starter values never override the client's real identity.

---

# 3. Visual Tokens

Document or link the canonical values for:

- Primary colors:
- Secondary/support colors:
- Semantic colors:
- Theme/mode behavior:
- Font families:
- Font weights:
- Type scale:
- Line heights:
- Letter spacing:
- Spacing scale:
- Container widths:
- Grid/gutters:
- Radius system:
- Borders/dividers:
- Shadows/elevation:
- Opacity:
- Z-index/layering:
- Breakpoint/fluid-size strategy:

Do not duplicate tokens in code when the production platform already has the approved token/variable.

---

# 4. Webflow Class System

If the project uses Webflow, document the live class strategy.

- Naming convention:
- Framework utilities:
- Custom-class convention:
- Combo-class convention:
- Section/container structure:
- Text classes:
- Button/link classes:
- Form classes:
- Image/media classes:
- Visibility/responsive utilities:
- State/attribute conventions:
- Project-specific utilities:

The `Style Sheet` page should visibly demonstrate the important reusable classes and system states whenever practical.

Before creating a new class:

1. Search the existing class/system.
2. Check the Style Sheet page.
3. Check whether an existing variable/component solves the requirement.
4. Create a new class only when it represents a real missing role.
5. Add important reusable additions back to the Style Sheet/documentation.

---

# 5. Components

Document reusable production components.

| Component | Source | Variants / Props | Editing Notes |
|---|---|---|---|
| Navigation |  |  |  |
| Footer |  |  |  |
| Button / CTA |  |  |  |
| Forms |  |  |  |
| Reusable sections |  |  |  |

Add project-specific components below.

Do not create duplicate components because an AI implementation failed to inspect the existing library.

---

# 6. Responsive System

Responsiveness is part of the design system, not an afterthought.

Record:

- Fluid sizing approach:
- Native platform breakpoints:
- Container-query usage:
- Typography scaling:
- Grid collapse/reflow rules:
- Image crop/art-direction rules:
- Navigation behavior:
- Touch/hover substitutions:
- Motion substitutions:
- Long-content/localization behavior:

Do not test only named breakpoint widths. Check intermediate widths where wrapping, grids, and art direction can fail.

Mobile must preserve the concept, hierarchy, usability, and brand—not merely stack the desktop layout.

---

# 7. States

Document important reusable states:

- Hover:
- Focus:
- Active/current:
- Disabled:
- Loading:
- Success:
- Error:
- Open/closed:
- Selected/checked:
- Empty:

Critical information/actions must remain available without hover.

---

# 8. Imagery / Media System

- Photography treatment:
- Product/mockup treatment:
- Illustration/3D treatment:
- Image ratios/crops:
- Mobile crops:
- Overlays/gradients:
- Video treatment:
- Iconography:
- Alt-text/decorative rules:

Coordinate with the project's brand guideline and `admonk-image-direction`.

---

# 9. Motion System

- Motion character:
- Default easing:
- Duration/rhythm guidance:
- Reveal behavior:
- Hover/micro-interaction behavior:
- Section-transition behavior:
- Reduced-motion behavior:
- GSAP/Rive/Motion usage rules:

Motion implementation must remain subordinate to the approved brand experience and performance requirements.

---

# 10. Performance-Sensitive Design Decisions

Record system decisions that affect performance:

- Font file/weight limits:
- Image delivery rules:
- Video/autoplay policy:
- 3D/WebGL policy:
- Third-party embeds/widgets:
- Heavy blur/filter/effect constraints:
- Motion/runtime constraints:

Coordinate with `docs/PLATFORM.md` and `admonk-performance`.

---

# 11. Adding to the System

When a new reusable pattern is created:

1. confirm it is genuinely reusable
2. follow the established naming/token/component system
3. add it to the canonical production system
4. demonstrate/document it on the Style Sheet or equivalent source when appropriate
5. record unusual exceptions

Do not let production pages become the only undocumented source of new system behavior.

---

# Final Rule

> **The client should experience one coherent brand system, not a mixture of client rules, framework defaults, and AI-invented styles.**

# Lumos Upstream / Attribution

## Source

Official framework documentation:

- Lumos Framework documentation by Timothy Ricks & Caleb Raney
- Documentation areas reviewed: Getting Started, Client Guide, Class Naming, Variables, Typography, Color, Components, Page Structure, Breakpointless, Size & Spacing, Grid/Flex concepts, Trigger & State, and changelog material

Official agent-skill repository:

- `lumosframework/skill`
- Repository: https://github.com/lumosframework/skill
- Inspected main tree SHA: `269307128ff1ff41bb0474af396e440924409d27`
- Packaged skill archive: `lumos-skill.skill`
- Archive blob SHA: `837cae476ca9fc18035409f4bb812897b04d8322`
- License blob SHA: `7d7768cf3b72237708204e6f056053aca0ba9ccb`

The official repository distributes the skill as a packaged `.skill` archive. Admonk's `admonk-lumos` skill is an **adapted operational wrapper grounded in the official Lumos documentation and source project**, not a claim of verbatim reproduction of the packaged upstream skill.

Lumos evolves frequently. Version-sensitive implementation details must be checked against the current project version/current official documentation before production changes.

---

# Admonk Integration Decision

## Keep

Admonk adopts Lumos guidance for Webflow architecture where it strengthens professional production:

- Custom / utility / combo class discipline
- Meaningful class naming
- Variable-driven system design
- Typography implementation systems
- Color/theme variable systems
- Fluid sizing and spacing
- Container/content-driven responsive principles
- Grid/flex structural utilities
- Open/closed component strategy
- Component slots/properties
- Page architecture
- Trigger/state architecture where appropriate
- Client-editable structure
- Documentation of project-specific additions
- Figma-to-Webflow system translation

## Modify

The following Lumos ideas are retained but placed under Admonk/client creative authority:

- Lumos becomes the preferred architecture for substantial **new** Webflow production builds, not a universal framework mandate.
- Breakpointless/fluid behavior reduces arbitrary breakpoint overrides but does not eliminate intentional mobile art direction.
- Utilities support implementation but do not determine composition.
- Components support reuse and handoff but do not require every section to become a generic reusable block.
- Theme systems support scalable color behavior but do not determine the client's palette or section rhythm.
- Typography systems implement the client's type direction rather than selecting it.
- Figma/Lumos mapping is conceptual; Figma groups/components are not blindly mirrored into DOM structure.
- Lumos state/trigger systems own suitable UI states; advanced motion still routes through Admonk motion guidance and GSAP/Motion/Rive/etc. when appropriate.

## Skip

Admonk does not adopt these as universal rules:

- Migrating coherent existing Webflow projects to Lumos without a business/maintenance reason.
- Making every Webflow project Lumos-based regardless of scale.
- Treating starter colors, typography, components, or layouts as creative defaults.
- Forcing every composition into the starter's structural grammar.
- Using utilities/components merely because the framework provides them.
- Allowing a framework convention to override client identity, accessibility, business objectives, or a stronger project-specific requirement.

## Reference Only

Use current official Lumos material as a reference for:

- Exact current class names and utility inventory
- Variable names and modes
- Fluid Builder behavior
- Current responsive-variable conventions
- Component inventory
- Trigger/state attribute implementation
- Changelog/migration differences between Lumos versions
- Starter/cloneable updates
- Figma resource changes

These details change over time and should not be frozen unnecessarily inside the Admonk skill.

---

# License

MIT License

Copyright (c) 2026 Lumos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Third-Party Skills

This repository includes selected external AI skills and adapted guidance that supplement Admonk's own business, design, image, motion, and implementation rules.

Admonk's internal instructions remain authoritative according to the priority defined in `AGENTS.md`.

## GSAP Skills

Source project: `greensock/gsap-skills`

Maintainer: GreenSock

Imported/adapted skills:

- `gsap-core`
- `gsap-timeline`
- `gsap-scrolltrigger`
- `gsap-performance`
- `gsap-plugins`
- `gsap-react`

Some files are copied directly and some are condensed/adapted for Admonk's workflow while preserving the technical guidance and attribution.

### GSAP License

MIT License

Copyright (c) 2026 GreenSock

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

---

## Taste Skill

Source project: `Leonxlnx/taste-skill`

Maintainer: Leonxlnx

Admonk does **not** import the main Taste Skill unchanged. Its strongest quality-control ideas are adapted into:

- `admonk-design-quality`

### Integration Decision

#### Keep

Ideas retained because they strengthen Admonk's workflow without defining the aesthetic:

- Read the brief and audience before choosing a visual direction.
- Actively challenge generic AI/frontend defaults.
- Audit existing projects before redesigning them.
- Preserve strong existing brand and functionality instead of rewriting automatically.
- Explicit responsive/mobile review for major compositions.
- Dependency verification before importing libraries.
- Production-state checks for interactive components.
- Real/project-specific visual assets instead of meaningless fake screenshots.
- Copy self-audit and removal of generic marketing filler.
- No fabricated proof, metrics, testimonials, or results.
- Pre-flight quality review before delivery.
- Complete requested implementation instead of placeholder code.

#### Modify

Useful ideas retained but changed to fit Admonk:

- Taste's anti-card and anti-layout-pattern guidance becomes a repetition/context check rather than a ban.
- Its imagery guidance becomes "use imagery when it strengthens the concept," not a mandatory image count.
- Its motion guidance becomes purpose-led and follows Admonk's more restrained motion philosophy.
- Its redesign rules become brand-preserving diagnosis rather than automatic font/color/style replacement.
- Its visual-cliche rules become questions requiring justification rather than universal prohibitions.

#### Skip

The following are intentionally not imported as governing rules:

- Fixed design/motion/density dial presets.
- Mandatory React/Next.js/Tailwind/Motion stack.
- Mandatory image generation for every marketing page.
- Universal requirement for multiple real images even when the concept does not need them.
- Fixed font preferences and blanket serif discouragement.
- Absolute light/dark page-theme restrictions.
- Absolute em-dash ban.
- Absolute bans on section numbers, scroll cues, decorative lines, or other legitimate art-direction techniques.
- Forced replacement of common UI patterns simply to appear different.
- Any rule that prioritizes avoiding a trend over serving the client's objective and brand.

#### Reference Only

Taste remains useful as a vocabulary/reference source for:

- Alternative layout patterns.
- Interaction-pattern names.
- Redesign audit ideas.
- Common LLM-generated visual clichés.
- Frontend completion checks.

These references may inspire exploration but do not override Admonk's design language.

### Taste Skill License

MIT License

Copyright (c) 2026 Leonxlnx

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

---

## UI UX Pro Max

Source project: `nextlevelbuilder/ui-ux-pro-max-skill`

Maintainer: Next Level Builder

Admonk does **not** import the full searchable UI UX Pro Max catalog or its design-system generator unchanged. The parts that strengthen usability and interface-system quality are adapted into:

- `admonk-ux-systems`

### Integration Decision

#### Keep

Ideas retained because they provide strong UX foundations:

- Accessibility before cosmetic polish.
- Keyboard navigation and visible focus treatment.
- WCAG-aware contrast and non-color-only communication.
- Meaningful alt text and accessible names for controls.
- Reduced-motion support.
- Touch/pointer target and interaction feedback checks.
- Hover-independent critical interactions.
- Explicit loading, error, success, disabled, and empty states where relevant.
- Form labels, inline errors, helper text, and recovery behavior.
- Responsive behavior as an explicit design responsibility.
- Layout-stability and Core Web Vitals awareness.
- Semantic color and system tokens where repeated UI benefits from them.
- Consistent icon language and state behavior.
- Stack detection before framework-specific implementation advice.
- Dependency verification before adding packages.
- Navigation clarity, back behavior, and task completion.
- Accessible chart and data-presentation checks.
- Pre-delivery UX/accessibility review.

#### Modify

Useful ideas retained but adapted to Admonk's philosophy:

- UI UX Pro Max's design-system generation becomes a UX/system reference layer, not the source of creative direction.
- Product palettes and font recommendations are treated as research inputs rather than automatic choices.
- Spacing systems provide technical rhythm but do not override optical composition.
- Touch-target recommendations are interpreted by platform and context rather than applying one measurement universally.
- Motion recommendations defer to Admonk's `MOTION-LANGUAGE.md` and `admonk-motion` skill.
- Component-library guidance preserves reliable behavior while allowing complete visual art direction.
- Responsive rules protect usability without requiring a fixed universal breakpoint set.
- System consistency is balanced with Admonk's preference for distinctive, non-repetitive composition.

#### Skip

The following are intentionally not imported as governing rules:

- The full product/style/color/font recommendation catalog as a default creative engine.
- Automatic generation of a project's visual identity from industry keywords.
- Design variance, motion, and density dials as authoritative creative decisions.
- Fixed palette recommendations based solely on product category.
- Fixed typography pairings based solely on database matching.
- Automatic GSAP presets that bypass Admonk's motion reasoning.
- Any recommendation that turns a client website into a preconfigured design-system aesthetic.
- Large upstream font/icon datasets that add repository weight without being necessary for normal Admonk work.

#### Reference Only

The upstream project remains useful as a research source for:

- UX guideline lookup.
- Accessibility edge cases.
- Platform-specific interface conventions.
- Chart-selection references.
- Icon semantics.
- Technology-stack UI implementation patterns.
- Product/industry pattern exploration when a project needs broader research.

These sources may inform a decision but must be evaluated against the client's actual brand, objectives, users, and Admonk's creative direction.

### UI UX Pro Max License

MIT License

Copyright (c) 2024 Next Level Builder

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

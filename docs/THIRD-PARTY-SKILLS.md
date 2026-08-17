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

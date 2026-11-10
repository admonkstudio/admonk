# Platform & Technical Context

Use this file to record the implementation environment and constraints.

## Selected Platform

- Platform/framework:
- Why selected:
- Hosting/deployment:
- Repository structure:

---

## Canonical Project Sources

Record the live sources the agent should inspect before substantial implementation.

### Brand

- Brand Guideline page/file:
- Strategy/voice source:
- Approved assets source:

### Design System

- `docs/DESIGN-SYSTEM.md` completed: yes / no
- Webflow `Style Sheet` page URL / page ID:
- Webflow `Brand Guideline` page URL / page ID:
- Figma design-system/library:
- Variables/token source:
- Component source:

A project-specific framework or starter never overrides these approved client sources.

---

## Webflow Architecture (if applicable)

- Webflow framework/system: Lumos / Client-First / MAST / custom / existing client system / none
- Framework version:
- Starter/cloneable source:
- Project-specific framework deviations:
- Variable system notes:
- Component strategy:
- Client Build Mode/editor expectations:
- Style Sheet maintenance owner:
- Brand Guideline maintenance owner:

For substantial new Webflow projects, evaluate Lumos as the preferred Admonk architecture. Do not migrate an existing coherent framework automatically.

For Webflow implementation, use native Designer/platform capabilities before custom code when the platform itself supports the requirement.

---

## Design Source

- Figma file/project:
- Design-system source:
- Component mappings / Code Connect:
- Prototype/motion source:
- Approved desktop design source:
- Approved mobile design source:

---

## Frontend

- Languages:
- Frameworks:
- Styling approach:
- Component system:
- Motion tools:
- Image pipeline:

---

## Responsive Strategy

Responsiveness should be designed and implemented continuously rather than left to final QA.

- Fluid sizing approach:
- Native breakpoints:
- Container queries:
- Grid/reflow rules:
- Typography scaling/wrapping:
- Image crop/art-direction rules:
- Navigation behavior:
- Touch/hover substitutions:
- Motion substitutions:
- Localization/long-content considerations:
- Browser zoom/text enlargement requirements:
- Required representative devices/viewports:
- Required intermediate-width testing:

Do not rely only on named platform breakpoints. Real viewport widths between breakpoints must remain coherent.

---

## CMS / Data

- CMS:
- Database:
- APIs:
- Content model:
- Authentication:

---

## Integrations

- CRM:
- Forms:
- Email:
- Analytics:
- Marketing automation:
- Payments:
- Search:
- Other:

---

## Performance / PageSpeed

Performance is part of the implementation requirements, not only a launch checklist.

- Core Web Vitals target:
- Required PageSpeed/Lighthouse score, if contractually specified:
- Mobile performance target:
- Desktop performance target:
- Image strategy:
- Video/media policy:
- Font strategy / allowed families & weights:
- Script constraints:
- Third-party scripts:
- 3D/WebGL constraints:
- Known intentional performance tradeoffs:

Default when no stricter project target exists:

- aim to pass current Core Web Vitals on mobile and desktop
- run PageSpeed Insights/Lighthouse diagnostics at meaningful build milestones and before handoff when the URL is testable
- preserve the intended experience while removing avoidable loading, rendering, interaction, and layout-stability cost

Verify current official Core Web Vitals definitions/thresholds rather than relying on stale remembered values.

---

## Accessibility

- Required standard/target:
- Keyboard requirements:
- Focus requirements:
- Reduced-motion requirements:
- Localization/RTL:
- Color/contrast constraints:

---

## Environments

- Development:
- Preview/staging:
- Production:

---

## Secrets

List required environment-variable names only. Never store real values here.

- 

---

## Testing

- Browser QA:
- Automated tests:
- Devices/browsers:
- Intermediate viewport tests:
- Form/integration verification:
- PageSpeed mobile checkpoint:
- PageSpeed desktop checkpoint:
- Field/Core Web Vitals source after launch:

---

## Deployment / Handoff

- Deployment owner:
- Client editing requirements:
- Documentation/training requirements:
- Style Sheet handoff/update rules:
- Brand Guideline handoff/update rules:
- Known performance exceptions:
- Known responsive exceptions:

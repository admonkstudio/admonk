# Current Admonk Capability Coverage Baseline

**Date:** 2026-09-26  
**Basis:** Existing Admonk capability registry, MCP documentation and specialist skills.  
**Purpose:** Establish what already exists before researching new tools or capabilities.

This is an internal baseline, **not** an external evidence synthesis.

## Strong current coverage

| Area | Current Admonk coverage |
|---|---|
| Product/app supervision | Product Supervisor, lifecycle gates, release/scale review |
| Repository/code collaboration | GitHub-centered project workflow |
| Design collaboration | Figma skill/integration |
| UX/accessibility review | `admonk-ux-systems` |
| Design-quality review | `admonk-design-quality` |
| Web/browser QA | `admonk-browser-qa` + Playwright CLI |
| Performance | `admonk-performance` |
| Security review | `admonk-security-review` |
| Analytics/conversion measurement | `admonk-analytics` |
| Deployment/release | `admonk-deployment` |
| React engineering | `admonk-react-engineering` |
| Astro | `admonk-astro` |
| Webflow | `admonk-webflow` |
| Supabase/backend | `admonk-supabase` |
| Organization/reuse | `admonk-organization-reuse` |
| Simplicity engineering | `admonk-simplicity-engineering` |
| Capability routing | `admonk-capability-router` |

## Existing but not yet standardized as a required product-development baseline

These capabilities are present as reference, project-specific guidance, or "ready when needed" rather than a researched Admonk-wide baseline:

- visual regression automation;
- formal cross-browser matrices;
- error monitoring;
- uptime monitoring;
- CI/CD conventions;
- agent evaluations;
- n8n/workflow automation;
- product analytics beyond general analytics/conversion guidance;
- preview/staging conventions across all app stacks.

## Coverage requiring research/verification

The current registry does not yet establish a durable, evidence-backed baseline for:

- component workbench/documentation;
- design-token interchange/tooling;
- automated visual regression policy;
- automated accessibility tooling policy;
- static analysis policy;
- dependency vulnerability/license policy;
- automated secret scanning policy;
- software supply-chain controls;
- API contract-testing policy;
- database migration verification policy;
- feature-flag policy;
- backup/restore verification policy;
- incident-management tooling/process;
- structured logs/metrics/traces maturity model;
- AI prompt/workflow versioning;
- AI evaluation dataset/golden-test governance;
- agent trace inspection;
- AI regression testing;
- model/token cost monitoring baseline;
- repository indexing/context-retrieval strategy for coding agents;
- component/connector/template registries beyond current documentation;
- deprecation/compatibility policy for reusable assets.

"Requires research" does not mean "must add a new tool."

The correct next question for every item is:
> **Do we have a real capability gap, and what feedback loop would closing it improve?**

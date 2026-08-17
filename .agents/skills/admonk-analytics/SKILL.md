---
name: admonk-analytics
description: Use for analytics strategy, measurement plans, GA4, Webflow Analyze, PostHog, event tracking, conversion measurement, attribution, funnels, campaign parameters, dashboards, experimentation measurement, or validating analytics implementations.
---

# Admonk Analytics

Analytics should answer business questions, not collect events because tracking is possible.

## Start With Decisions

Before implementation ask:

- What business decision will this data inform?
- What user action represents meaningful progress?
- What is the primary conversion?
- Which supporting actions explain the journey?
- Who will use the report and how often?

## Measurement Model

Prefer a small intentional event model:

```text
Business objective
→ user outcome
→ conversion
→ supporting behaviors
→ dimensions/context
→ implementation
→ validation
→ reporting
```

## Event Quality

Use stable, descriptive event names and documented properties. Avoid duplicate events from multiple tools unless there is a clear reason.

Track meaningful behavior such as:

- qualified form submission
- booking/request completion
- product/plan selection
- account creation
- key content interaction
- meaningful CTA progression
- application completion

Do not treat every click as a KPI.

## Implementation

- Inspect existing analytics/tagging before adding new tools.
- Keep consent/privacy requirements in scope.
- Avoid unnecessary third-party script weight.
- Do not expose personal/sensitive data in event payloads unless the platform, legal basis, and project explicitly support it.
- Keep UTM/campaign naming consistent.
- Validate event firing in the real browser and analytics/debug tooling.

## Reporting

Separate:

- acquisition
- behavior
- conversion
- quality/business outcome

Vanity metrics can provide context but should not replace useful measures.

## Experimentation

Do not recommend A/B testing merely because it exists. Experiments need sufficient traffic, a meaningful hypothesis, reliable measurement, and a decision that can change based on the result.

## Admonk Principle

> Measure what helps the business decide what to do next.

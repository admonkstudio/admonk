---
name: admonk-deployment
description: Use for deployment, hosting, preview environments, domains, environment configuration, CI/CD, release checks, rollback planning, production publishing, error monitoring, or operational handoff of a client website/app.
---

# Admonk Deployment & Release

Deployment is the final implementation system, not a platform loyalty decision.

## Choose Hosting From the Stack

Use the hosting/runtime that fits the actual project. Webflow sites should normally publish through Webflow; static/Astro/React/server applications should use a platform compatible with their runtime, data, traffic, regional and operational needs.

Do not move a project to a different framework merely to use a preferred host.

## Environments

For substantial projects prefer clear separation between:

- local/development
- preview/staging
- production

Keep secrets scoped to the correct environment and out of Git.

## Release Checklist

Before production launch verify, as applicable:

- build/type/lint/tests
- browser QA
- responsive behavior
- forms and integrations
- auth/permissions
- redirects/canonicals/sitemap/robots
- analytics events
- performance
- accessibility-critical flows
- environment variables
- domains/DNS/SSL
- error handling/logging
- backups/migration readiness
- rollback path

## Database Changes

Treat destructive or incompatible migrations as release-risk events. Plan ordering, backups, compatibility and rollback rather than coupling irreversible data changes casually to frontend deployment.

## CI/CD

Automate repeatable validation when project scale justifies it. CI should catch real risks, not become an elaborate pipeline that costs more to maintain than the project.

## Monitoring

Application-style or business-critical projects should consider error monitoring, uptime checks and meaningful alerting after release. Marketing sites may need a lighter operational model.

## Handoff

Document what the client/team needs to operate safely: publishing workflow, editable content, environment ownership, third-party accounts, recovery path and known constraints.

## Admonk Principle

> A project is not delivered when it builds. It is delivered when it can run, be verified, and be maintained.

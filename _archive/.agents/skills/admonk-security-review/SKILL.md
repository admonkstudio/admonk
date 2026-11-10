---
name: admonk-security-review
description: Use for security-sensitive web/app work involving authentication, authorization, user data, payments, forms handling sensitive data, APIs, databases, uploads, secrets, dependencies, third-party scripts, threat modeling, or pre-launch security review.
---

# Admonk Security Review

Security guidance is risk-sensitive and version-sensitive. Prefer current vendor documentation, OWASP guidance, dependency advisories, platform security tooling, and official security scanners where available.

## Authorization

Only test systems Admonk or the client is authorized to assess. Do not expand a review into unrelated infrastructure.

## Review Areas

Depending on the project, examine:

- authentication/session handling
- authorization and tenant/ownership boundaries
- secrets and environment variables
- client/server trust boundaries
- input validation/output encoding
- database/RLS permissions
- file upload validation and access
- API authorization and rate/abuse controls
- CORS/CSRF where applicable
- dependency and supply-chain risk
- third-party scripts and embeds
- redirects and URL handling
- sensitive logs/analytics
- security headers/CSP where appropriate
- admin and privileged operations
- payment-provider boundaries
- backups/recovery where relevant

## Rules

- Never commit credentials.
- Never place server secrets into browser-exposed variables.
- Do not solve permission errors by weakening authorization.
- Least privilege beats convenience.
- Validate on the trusted side of the boundary.
- Treat user-controlled data as untrusted.
- Prefer established auth/payment/security primitives over custom cryptography or home-grown session systems.
- Separate development/test data from production data when practical.

## Threat Model

For meaningful sensitive systems, identify:

1. assets worth protecting
2. actors and trust boundaries
3. entry points
4. likely abuse cases
5. controls
6. residual risks
7. verification/tests

## Delivery

Report findings by severity and evidence. Distinguish confirmed vulnerabilities from hardening recommendations and assumptions.

## Admonk Principle

> Security is a design constraint of the system, not a checklist added the day before launch.

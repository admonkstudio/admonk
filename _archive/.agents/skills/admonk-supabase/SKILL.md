---
name: admonk-supabase
description: Use for Admonk or client projects involving Supabase Database, Auth, Storage, Realtime, Edge Functions, RLS, Postgres, migrations, vectors, queues, cron, or Supabase-backed forms/apps. Do not load for projects that do not use Supabase.
---

# Admonk Supabase

Supabase is an optional backend capability, not Admonk's default stack.

## Authority

Before implementation, verify current behavior against Supabase's official documentation, changelog, and available official Supabase skill/MCP. Supabase changes frequently; do not rely on remembered API/config details.

Official upstream skills:

- `supabase/agent-skills` → `supabase`
- `supabase/agent-skills` → `supabase-postgres-best-practices`

## Use Supabase When

It meaningfully helps with:

- authentication
- relational data
- client portals
- project/application backends
- storage/uploads
- realtime data
- server-side functions
- database-driven CMS-like experiences
- AI/vector/search workloads
- workflow data that belongs outside a website CMS

Do not add Supabase merely because a form or simple marketing site exists.

## Workflow

1. Inspect the existing project and backend first.
2. Determine whether Supabase already exists or is justified.
3. Verify current official docs/changelog.
4. Define the data model and trust boundaries before writing policies.
5. Keep secrets/server credentials off the client.
6. Enable and design RLS deliberately for exposed schemas.
7. Use migrations/declarative schemas according to the project's existing workflow.
8. Verify changes with real queries/tests.
9. Review security before launch.

## Security Rules

- Never expose service-role/secret keys in public clients.
- Treat `anon`/publishable client access as untrusted.
- RLS is authorization, not a checkbox; policies must represent the real ownership/tenant model.
- Do not use user-editable metadata for authorization decisions.
- Treat `SECURITY DEFINER`, views, functions, storage policies, and privileged operations as security-sensitive.
- Do not weaken RLS to make an error disappear.
- Auth, user data, uploads, and private client data require explicit security review.

## Existing System Rule

Prefer:

> Integrate → Improve → Replace only when justified.

If a client already has a functioning database/backend, compare migration cost and operational value before recommending Supabase.

## Verification

A Supabase implementation is incomplete until the relevant flows are tested from the actual roles involved: anonymous, authenticated user, owner/admin, and server-side privileged code where applicable.

## Admonk Principle

> The backend should make the Web Experience more useful, not make the project unnecessarily complex.

# T024 — Migration Validation

**Decision:** Use the native database migration system + CI validation. Replay full migration history on an ephemeral clean DB; validate schema/data/permission/RLS/application invariants; add representative upgrade/data-transform tests for risky migrations; rehearse material migrations in staging.

For Supabase/Postgres, prefer Supabase CLI + pgTAP/GitHub Actions where practical.

Do not add Flyway/Liquibase/Atlas by default; adopt only if later scale/risk/heterogeneous-database evidence justifies the complexity.

**Related:** S017, PB02.

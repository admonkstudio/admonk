# Corporate AI Assistant — Bootstrap Tasks

**Active stage:** CAI-P0 — Recovery & Scope Freeze  
**Status:** Planning only  
**Implementation allowed:** No production implementation until the bootstrap/recovery gate is accepted.

## CAI-P0 objective

Create a reliable source of truth for the Corporate AI Assistant before implementation starts.

## Checklist

### Historical recovery

- [x] Consolidate Employee AI / Internal AI / Company Intelligence / Corporate AI Assistant terminology.
- [x] Recover historical product role and sequencing.
- [x] Recover identity/permission direction.
- [x] Recover connectors/tools/actions direction.
- [x] Recover Skills/automation/proactive-intelligence direction.
- [x] Recover Company Graph/operational-memory concepts.
- [x] Recover Support Platform and Marketing Hub relationships.
- [x] Separate approved historical decisions from exploratory concepts.
- [x] Record unresolved questions explicitly.

### Existing implementation verification

- [x] Search accessible Admonk/Kalam repositories for a dedicated Corporate/Employee AI repository.
- [x] Search `kalamcx/kalam-digital-platform` branches for Employee/Internal/Company AI implementation branches.
- [x] Search historical commits for Employee AI roadmap/foundation evidence.
- [x] Confirm historical work found is documentation/roadmap architecture, not a verified dedicated implementation.
- [ ] Verify whether any local/private/unconnected repository exists outside the current GitHub connection.

### Repository bootstrap

- [ ] Create private repository `admonkstudio/corporate-ai-assistant`.
- [ ] Add root `AGENTS.md`.
- [ ] Add `README.md`.
- [ ] Add `docs/PROJECT-STATUS.md`.
- [ ] Add `docs/TASKS.md`.
- [ ] Add `docs/PRODUCT.md`.
- [ ] Add `docs/ARCHITECTURE.md`.
- [ ] Add `docs/SECURITY.md`.
- [ ] Add `docs/INTEGRATIONS.md`.
- [ ] Add `docs/DECISIONS.md`.
- [ ] Add product-specific skill `.agents/skills/corporate-ai-assistant/SKILL.md`.
- [ ] Migrate `docs/CORPORATE-AI-ASSISTANT-PLAN.md` into the new repository.
- [ ] Link the new repository from `docs/AI-SUITE-REPOSITORY-MAP.md`.
- [ ] Update `docs/AI-SUITE-MANIFEST.yaml`.
- [ ] Update GitHub Project item `admonkstudio/admonk#3` with the final repository.

### Scope freeze

- [ ] Confirm primary v1 users.
- [ ] Confirm first 3 jobs-to-be-done.
- [ ] Confirm relationship with Kalam Connect.
- [ ] Confirm v1 identity/SSO model.
- [ ] Confirm initial connector priority.
- [ ] Confirm read-only vs action-capable v1 scope.
- [ ] Confirm approval model for consequential actions.
- [ ] Confirm memory boundary.
- [ ] Confirm Company Graph is future vs v1.
- [ ] Confirm initial UI/product surface.
- [ ] Confirm deployment/runtime ownership.
- [ ] Confirm first tenant/security model.

## CAI-P0 exit criteria

CAI-P0 is complete when:
- dedicated repository exists;
- recovered planning is migrated;
- v1 users/jobs/product boundary are accepted;
- identity/permissions direction is accepted;
- initial connector/action scope is accepted;
- security boundaries are documented;
- unresolved historical ambiguity is removed;
- next implementation milestone is explicitly approved.

Do not start CAI-P1 automatically.

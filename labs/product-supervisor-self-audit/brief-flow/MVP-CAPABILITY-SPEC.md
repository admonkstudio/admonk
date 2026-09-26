# BriefFlow — MVP / Capability Specification

## Jobs-to-be-done

1. Capture enough campaign context for a useful brief.
2. Generate a clearly labeled AI draft.
3. Let a human edit and approve.
4. Store and retrieve approved briefs.

## Roles

| Role | Responsibility | Permissions |
|---|---|---|
| Member | Create/edit own briefs | Read/create/edit own briefs; request AI draft |
| Manager | Review team briefs | Member rights + approve/read team briefs |

## Capabilities

| Capability | Acceptance criteria |
|---|---|
| Create brief input | Required fields validated before generation |
| Generate draft | Output is labeled Draft and never auto-approved |
| Edit brief | User changes persist |
| Approve brief | Only authorized Manager may approve |
| Search briefs | Authorized user can find allowed briefs |

## Edge cases

- AI generation fails: preserve user input and allow retry.
- User lacks approval permission: approval action is denied.
- Empty/invalid input: generation does not run.

## Non-goals

No external write connectors in baseline MVP.

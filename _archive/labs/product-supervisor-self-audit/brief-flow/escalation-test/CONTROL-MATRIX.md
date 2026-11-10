# BriefFlow — Escalation Control Matrix

| Capability | Class | Default | Required controls | Fixture result |
|---|---|---|---|---|
| Generate AI brief | DRAFT | Allowed | Draft label, user edit, invocation record | PASS |
| Read CMS content | READ | Least privilege | Read scope only, audit where needed | PASS |
| Publish to production CMS | EXECUTE_CONSEQUENTIAL | Not autonomous | Named approver, scoped write permission, preview/confirmation, action log, revision/unpublish recovery | BLOCKED until all controls are evidenced |
| Delete production content | DESTRUCTIVE | Denied | Controlled manual procedure unless separately justified | DENIED |

## Expected Supervisor behavior

Adding the CMS connector does not imply publish permission.
The production publish capability remains disabled until its required controls and evidence exist.

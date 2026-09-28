# FOUNDATION-M2-19A — Platform Operator Identity, Support Access & Environment Authority

**Date:** 2026-09-28  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Program:** FOUNDATION-M2 — Shared Product Platform Foundation  
**Implementation authority:** None. Architecture/security contract only.

## 1. Decision problem

M2-02..M2-05 correctly model:
- global Admonk users;
- tenant membership;
- organizational scopes;
- tenant/product capabilities.

That is not enough for the Admonk Control Room.

Admonk's own operators/support/security staff may need to:
- see platform-wide health;
- identify which tenant is affected;
- inspect traces/task/connector state;
- support a tenant;
- investigate a Production incident;
- roll back a release;
- reconcile an uncertain action;
- respond when normal administration is unavailable.

If this is modeled as:
- membership in every tenant;
- a universal `super_admin`;
- “Platform Operator Lens” granting access;
- permanent Production admin;

then the hard tenant boundary is weakened precisely where the platform is most sensitive.

M2-19A therefore defines a **separate platform-operator authority domain** that interoperates with—but is not swallowed by—tenant RBAC.

---

## 2. Core conclusion

> **Admonk platform operators have standing identity and eligibility, not standing unlimited privilege.**

Normal operator work should use:
- least privilege;
- explicit environment;
- visible operator context;
- tenant/content access only when required;
- just-in-time elevation for privileged work;
- time-bound support access;
- action-specific approval through M2-11/RQ-07;
- complete audit;
- a separate emergency recovery path.

And:

> **Operational visibility, tenant-content access, and action authority are three different permissions.**

---

## 3. External research

### NIST Zero Trust

NIST SP 800-207 rejects implicit trust based on network location, affiliation or ownership and moves authorization toward explicit subject/resource policy.

NIST SP 800-207A further emphasizes application/service identities and granular application-level authorization rather than assuming trusted internal placement.

Sources:
- https://csrc.nist.gov/pubs/sp/800/207/final
- https://csrc.nist.gov/pubs/sp/800/207/a/final

**Admonk lesson:** being an Admonk employee or being inside the Control Room cannot itself create cross-tenant authority.

### NIST least privilege

NIST defines least privilege as granting only the minimum resources/authorizations necessary to perform the task. NIST SP 800-53 also requires review of privileged assignments and auditing privileged functions.

Sources:
- https://csrc.nist.gov/glossary/term/least_privilege
- https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf

**Admonk lesson:** operator capability must be task/scope appropriate and periodically reviewable.

### Microsoft Privileged Identity Management

Microsoft Entra PIM provides:
- just-in-time privileged access;
- time-bound activation;
- optional approval;
- MFA/strong authentication;
- justification;
- access reviews;
- audit history.

Microsoft also recommends “just-enough” privilege and defines elevation policy based on what privilege is needed and for how long.

Sources:
- https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure
- https://learn.microsoft.com/en-us/entra/architecture/security-operations-privileged-accounts

**Admonk lesson:** eligibility and active privilege are separate states. Production power should expire automatically.

### Google Access Approval / Access Transparency

Google Cloud's support-access model uses:
- business justification;
- explicit approval where configured;
- time-limited access;
- logs tied to the access request;
- exact resource/method visibility;
- customer transparency.

Sources:
- https://cloud.google.com/security/products/access-transparency
- https://docs.cloud.google.com/docs/security/privileged-access-management

**Admonk lesson:** support access to tenant content should be a scoped auditable grant, not an invisible consequence of working for Admonk.

### Emergency access

Microsoft recommends dedicated emergency/break-glass access for lockout scenarios, kept separate from ordinary administrator activity, strongly protected, monitored, and tested.

Source:
- https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access

**Admonk lesson:** emergency recovery exists because normal privileged-access controls can fail; it must not become the normal shortcut.

---

# PART A — IDENTITY MODEL

## 4. Platform Operator is not a tenant role

Extend the global identity model:

```text
Global Admonk User
  ├── Tenant Membership(s)
  │      └── tenant/product/scope roles
  │
  └── Platform Operator Assignment? 
         └── platform operator eligibility/capabilities
```

Platform Operator Assignment:
- exists in Admonk/platform authority;
- is not copied into each tenant;
- does not create ordinary tenant membership;
- does not automatically expose tenant business content;
- does not override M2-11/RQ-07;
- may be absent for nearly all users.

A person may have both:
- a tenant membership;
- a platform-operator assignment.

The two contexts are evaluated separately.

---

## 5. Same identity, separate privileged context

Default direction:

> use the same accountable global human identity, but require a separately activated **Operator Session** for privileged platform work.

Advantages:
- individual attribution;
- fewer duplicate identities;
- compatible with just-in-time activation;
- easier audit/correlation.

Do not infer operator authority from an ordinary logged-in session.

Entering Control Room operator mode creates an explicitly different authority context.

M2-19A does not require a second permanent admin account per person.

Higher-assurance deployments may later require:
- separate privileged account;
- managed/privileged workstation;
- stronger device posture.

Those are policy/implementation escalations, not the base architecture.

---

## 6. Operator capability bundles

Do not create one `platform_super_admin`.

Use a stable operator capability catalog and small default bundles such as:

- Platform Observer;
- Support Investigator;
- Operations Engineer;
- Release Operator;
- Security Responder;
- Billing/Usage Operator;
- Platform Access Administrator.

Names remain configurable/internal.

Capabilities should be task-based.

Examples:
- view platform health;
- view tenant-identifiable operational metadata;
- request tenant support access;
- inspect task trace;
- inspect connector metadata;
- retry/reconcile safe operation;
- manage release ring;
- approve operator elevation;
- manage operator eligibility;
- invoke emergency recovery procedure.

A user may receive multiple bundles.

Delegation ceilings apply exactly as with tenant administration:
> an operator cannot grant a capability they do not themselves have authority to delegate.

---

# PART B — FOUR ACCESS MODES

## 7. Mode O0 — Normal Operations

Purpose:
- everyday platform observation/support triage.

May include standing access to:
- aggregate platform health;
- service/runtime health;
- issue/incident metadata;
- redacted task/trace structure;
- release/version state;
- tenant-identifiable operational metadata if role permits.

Does not include by default:
- raw tenant prompts/documents/business records;
- secret values;
- consequential mutations;
- user impersonation.

O0 may remain active for eligible operators because it is deliberately constrained.

---

## 8. Mode O1 — Elevated Operator Session

Purpose:
- Production investigation/privileged operator capability.

Activation:
- operator must be eligible;
- explicit environment;
- explicit capability set;
- reason/business justification;
- strong re-authentication/authentication policy;
- time-limited expiry;
- approval when policy/risk requires it.

An Elevated Operator Session is not automatically tenant-content access.

Example:
> An Operations Engineer can activate Production release rollback capability for 45 minutes without receiving permission to read tenant conversations.

---

## 9. Mode O2 — Support Access Grant

Purpose:
- scoped access to tenant business content/resources that normal operational metadata cannot provide.

A Support Access Grant is separate from operator elevation.

Required fields:

```text
SupportAccessGrant
  grant_id
  tenant
  environment

  operator / eligible operator group
  case / incident / support_ref
  business_justification

  resource_scope
  content_scope
  allowed_methods / read classes

  requested_by
  approved_by / approval_policy
  granted_at
  expires_at
  revoked_at?

  tenant_notification_policy
  audit_ref
```

Rules:
- minimum required tenant/resource/content scope;
- automatic expiry;
- revocable immediately;
- reason/case reference mandatory;
- content access does not grant mutation authority;
- secret values remain excluded;
- every use is attributable to the real operator.

### Approval policy

Not every support grant must use the same approver.

Tenant/product policy may require:
- Admonk internal approval;
- tenant/customer approval;
- both;
- pre-authorized contractual support policy for defined resources;
- security/emergency exception under a separate audited policy.

This supports both ordinary customers and higher-assurance/regulatory tenants.

---

## 10. Mode O3 — Emergency Recovery / Break Glass

Purpose:
- recover critical administration/security/availability when normal privileged-access mechanisms are unavailable or dangerously blocked.

Examples:
- identity/elevation service outage;
- no approver can activate necessary Production role;
- severe platform security incident;
- critical configuration locks normal operators out.

Break-glass:
- is separate from normal Operator Session;
- uses dedicated emergency access mechanism/identity;
- is highly protected;
- is never used for convenience;
- emits immediate high-priority alert;
- creates an incident/audit record;
- requires explicit reason;
- undergoes mandatory post-use review;
- is periodically tested for availability;
- preserves individual accountability where technically possible.

If non-personal recovery credentials are unavoidable:
- custody is tightly controlled;
- use is attributable through checkout/incident/process evidence;
- dual control may be required according to policy.

M2-19A does not lock exact emergency credential count, IdP or hardware mechanism.

---

# PART C — VISIBILITY / CONTENT / ACTION SEPARATION

## 11. Operator visibility classes

Use a small content-access classification for Control Room.

### OV0 — Aggregate platform telemetry
Examples:
- system error rate;
- global queue pressure;
- aggregate model latency.

No tenant/business content.

### OV1 — Tenant-identifiable operational metadata
Examples:
- tenant name/ID;
- affected product;
- connector health;
- task status;
- release/version;
- usage/cost totals;
- redacted trace structure.

No raw business payload by default.

### OV2 — Tenant business content
Examples:
- prompt/message content;
- uploaded document contents;
- ticket/customer record text;
- business rows/fields needed for support.

Requires Support Access Grant.

### OV3 — Secrets / credentials
Examples:
- provider OAuth refresh token;
- API secret;
- raw credential material.

**Never directly readable through normal Control Room support access.**

Operators may see:
- credential status;
- scopes;
- expiry;
- fingerprint/reference;
- last rotation/reconnect;

and may invoke governed rotate/reconnect/revoke actions.

They do not reveal the secret.

---

## 12. Action authority remains separate

SupportAccessGrant answers:
> what tenant content may this operator inspect?

M2-11/RQ-07 answers:
> what may this operator change/do?

Effective operator authority:

```text
Platform Operator Assignment
∩ Active Operator Session
∩ Environment
∩ Tenant/resource scope
∩ Support Access Grant where content is needed
∩ Platform/tenant policy ceilings
∩ M2-11 action class
∩ Approval state
∩ Runtime/provider limits
= Effective Operator Authority
```

No factor can widen another factor.

---

# PART D — ENVIRONMENT AUTHORITY

## 13. Environment is a first-class authorization dimension

Every operator session/action has an explicit environment.

Candidate environment classes:
- LAB / DEVELOPMENT;
- STAGING / PREPRODUCTION;
- PRODUCTION.

Exact names remain implementation-specific.

Rules:
- lower-environment authority does not imply Production authority;
- Production authority does not silently imply other environments;
- grants explicitly state allowed environments;
- Production elevation may require stronger authentication/approval/device posture;
- operator UI must show the current environment persistently and unmistakably;
- Prepared Actions bind to the exact environment;
- changing environment invalidates/re-runs relevant preflight.

Environment is never inferred solely from:
- hostname;
- UI route;
- visual theme;
- model instruction.

---

## 14. Production safety UX

Control Room Production mode should visibly show:
- PRODUCTION state;
- active operator privileges;
- tenant/resource scope where relevant;
- Support Access expiry timer where active;
- content-access level;
- approval status for consequential actions.

The operator should be able to:
- end elevation early;
- revoke own support access;
- return to normal O0 mode.

High-impact actions repeat the exact:
- environment;
- tenant(s);
- resource(s);
- material effect

inside RQ-07 confirmation/preflight.

---

# PART E — SUPPORT WITHOUT IMPERSONATION

## 15. No silent user impersonation

Default rule:

> **Admonk operators act as themselves, with delegated support access; they do not become the customer user.**

Audit records therefore show:

```text
Operator X
acting under SupportAccessGrant Y
on Tenant Z
performed/read ...
```

not:
```text
Customer User A did ...
```

Avoid:
- issuing customer session cookies to support;
- creating actions under a customer's identity;
- hiding operator origin.

### View-as / reproduction

If support needs to reproduce a customer's experience:
- prefer a read-only/simulated `view as` context;
- preserve operator identity;
- show that the session is simulated/support context;
- never expand authority beyond the operator's own authorized support scope.

True impersonation, if ever required for a narrow product reason, becomes a separate future high-risk decision—not a default support feature.

---

# PART F — APPROVAL / JIT POLICY

## 16. Do not require approval for every operator click

Avoid approval fatigue.

Use risk-based activation:

### Low-risk / O0
May be standing:
- platform aggregate health;
- redacted system views;
- permitted tenant operational metadata.

### Moderate privileged investigation
JIT operator elevation:
- re-auth;
- reason;
- time limit;
- approval depending policy.

### Tenant content
Support Access Grant:
- case/reason;
- time/resource/content scope;
- internal/customer approval per tenant policy.

### Consequential platform/business action
M2-11/RQ-07 approval according to action class and blast radius.

### Emergency
break-glass path + immediate alert + mandatory post-review.

This preserves usability without normalizing permanent privilege.

---

## 17. Time bounds

Every activated/elevated access should expire automatically.

Policy defines maximum duration by:
- capability;
- environment;
- data/content sensitivity;
- action risk;
- tenant policy.

No single global duration is locked.

Operator may request extension/renewal through a new policy evaluation.

Expiry:
- removes active privilege;
- does not delete audit history;
- does not silently cancel already-started Durable Tasks unless policy requires it;
- prevents new privileged steps after expiry unless reactivated.

Long-running privileged tasks must carry the authority receipt/delegation they were legitimately started under and still obey RQ-14/RQ-07 continuation rules.

---

# PART G — ACCESS REVIEWS / LIFECYCLE

## 18. Operator assignment lifecycle

Platform operator eligibility itself is governed.

States:
- REQUESTED;
- ACTIVE/ELIGIBLE;
- SUSPENDED;
- EXPIRED;
- REVOKED.

Requirements:
- owner/team;
- business role;
- allowed capabilities;
- environment ceiling;
- created/approved by;
- periodic review date;
- last reviewed;
- termination/revocation integration.

Periodic access reviews verify:
> does this person still need this eligibility?

Removing operator eligibility must not erase historical audit attribution.

---

## 19. Separation of duties

Policies may prevent self-approval for selected high-risk capabilities.

Examples:
- operator cannot approve their own broad tenant-content access;
- release operator cannot independently approve a platform-wide destructive rollback when policy requires second approval;
- Platform Access Administrator manages eligibility but does not automatically gain tenant content access.

Do not impose two-person approval on all ordinary operations.

Use it where the risk justifies the friction.

---

# PART H — CUSTOMER TRANSPARENCY

## 20. Tenant-visible support access history

Admonk One should eventually support a tenant-scoped support-access history where appropriate.

Candidate information:
- support/access request;
- reason/case;
- time window;
- access category;
- resources/methods accessed;
- status;
- whether tenant approval was required;
- revocation/end time.

Exact employee identity visibility is a tenant/compliance/privacy policy decision, but Admonk's internal audit always retains accountable identity.

High-assurance tenants may opt into:
- customer approval before OV2 content access;
- immediate access notifications;
- tighter content ceilings;
- specific operator-region constraints if commercially/compliance justified.

This is a product trust feature, not only a compliance mechanism.

---

# PART I — JARVIS IN CONTROL ROOM

## 21. Platform Operator Lens remains non-authoritative

Jarvis may:
- explain incidents;
- correlate evidence;
- tell the operator that additional access is required;
- draft a support-access request;
- propose a runbook;
- prepare an action.

Jarvis may not:
- activate operator privilege;
- approve its own/support access;
- grant OV2 content access;
- switch tenant/environment authority;
- use break-glass;
- reveal credentials.

Example:

```text
Jarvis:
"To inspect the failed ticket payload I need temporary OV2 support access
to Tenant A / Support / ticket 4839 for this incident.

[Request support access]"
```

The operator initiates the deterministic access workflow.

---

# PART J — AUDIT / RECEIPTS

## 22. Privileged Access Receipt

Every privilege activation/support grant/break-glass session should be reconstructable.

Candidate receipt:

```text
PrivilegedAccessReceipt
  operator_identity
  operator_assignment
  session_id

  environment
  tenant/resource scope
  visibility/content class

  business_reason
  case/incident ref

  requested_at
  approved_by/policy
  activated_at
  expires_at
  ended_at

  auth strength / session assurance reference
  support_access_grant?
  break_glass?

  privileged actions / action receipts[]
  sensitive resource-access references[]

  final status
```

Do not duplicate every trace/log line into the audit receipt.

Link to evidence through correlation IDs.

---

## 23. Audit requirements

Always audit:
- operator eligibility changes;
- elevation requests/activation;
- support access grants/denials/revocation;
- privileged content accesses according to policy;
- all privileged/control actions;
- break-glass use;
- failed/denied privilege attempts;
- environment changes affecting privilege.

Audit record is immutable/append-oriented according to M2-12 policy.

Operators cannot erase their own privileged-access audit evidence through ordinary Control Room access.

---

# PART K — FAILURE / SECURITY RULES

## 24. Fail closed

If the system cannot verify:
- operator identity;
- environment;
- tenant/resource scope;
- support grant;
- policy;
- approval;

the privileged operation does not proceed.

A logging/Control Room UI failure must not convert into more privilege.

Where an action is safety-critical and audit persistence is temporarily unavailable:
- policy decides safe stop vs emergency recovery;
- bypass requires explicit emergency procedure, never silent downgrade.

---

## 25. Tenant isolation remains hard

Operator infrastructure does not weaken M2-02.

Normal tenant context:
- cannot address another tenant.

Operator context:
- is explicitly different;
- must carry platform authorization;
- still validates tenant/resource targets;
- logs cross-tenant access;
- cannot silently convert to ordinary tenant session.

Cross-tenant bulk operations have higher blast radius and are classified accordingly under M2-11/RQ-07.

---

## 26. Secrets stay outside operator vision

Even elevated/break-glass operators should not routinely retrieve provider/application secrets.

Prefer:
- secret broker/vault;
- opaque references;
- rotation;
- revoke;
- reconnect;
- short-lived credentials for machine runtime.

If an emergency credential must be accessed:
- separate emergency procedure;
- strong custody;
- explicit audit;
- immediate review/rotation where appropriate.

---

# PART L — WHAT M2-19A DOES NOT LOCK

## 27. Deferred implementation choices

M2-19A does not select:
- identity provider;
- PIM/PAM vendor;
- MFA/authenticator vendor;
- device management vendor;
- privileged workstation technology;
- ticket/support tool;
- exact access duration values;
- exact number/names of operator roles;
- exact customer approval policy;
- exact break-glass credential mechanism;
- implementation storage/service for grants/receipts.

M2-20 determines runtime/service packaging.

Security/product policy later determines tenant-specific support-access options.

---

# PART M — RECOMMENDED LOCK

## 28. M2-19A lock statement

> **M2-19A — Separate Platform-Operator Authority with Just-in-Time Privilege, Scoped Support Access & Explicit Environment**
>
> Platform Operator is a distinct Admonk/platform authorization domain, not a tenant role and never a universal `super_admin`.
>
> A global human identity may have tenant memberships and a separate Platform Operator Assignment, but the contexts are evaluated independently.
>
> Platform operators hold **standing identity/eligibility, not standing unlimited privilege**. Privileged Production capabilities activate through an explicit time-bound Operator Session with environment, capability scope, business justification, stronger authentication/session assurance, automatic expiry and approval where policy requires it.
>
> Keep **operational visibility, tenant business-content access and action authority separate**.
>
> Control Room uses visibility classes:
> - OV0 aggregate platform telemetry;
> - OV1 tenant-identifiable operational metadata;
> - OV2 tenant business content requiring scoped Support Access;
> - OV3 secrets/credentials, which are never directly readable through ordinary support access.
>
> A **Support Access Grant** is tenant/environment/resource/content scoped, tied to a support case/incident and business justification, time-bound, revocable and audited. Approval may be internal, tenant/customer, both, or pre-authorized by policy depending tenant/data sensitivity. Support content access never grants mutation authority.
>
> M2-11/RQ-07 remains the only action-authority model. Effective operator authority is the intersection of Operator Assignment, active Operator Session, environment, tenant/resource scope, Support Access where needed, restriction policy, action class, approval state and runtime/provider limits.
>
> **Environment is a first-class authorization dimension.** Development/staging authority does not imply Production. Production sessions/actions explicitly bind to Production; changing environment requires new policy evaluation/preflight.
>
> Operators act **as themselves**, not as customer users. No silent impersonation. Any support/view-as feature preserves operator identity and authorization in the audit trail.
>
> Use risk-based just-in-time controls rather than approval for every operator click: low-risk redacted operations may be standing; privileged Production investigation activates temporarily; tenant content requires Support Access; consequential actions follow RQ-07 approval; emergencies use break-glass.
>
> Break-glass is a dedicated, strongly protected, highly monitored emergency recovery path used only when normal privileged-access controls cannot safely operate. Every use triggers immediate alert, incident/audit record and mandatory post-use review.
>
> Operator eligibility is itself lifecycle-managed, periodically reviewed and revocable. High-risk policies may require separation of duties/self-approval prevention.
>
> Admonk One should eventually expose tenant-scoped support-access transparency and optional stronger customer-approval controls where policy/compliance requires them.
>
> Jarvis Platform Operator Lens can explain evidence and propose/request access, but it **cannot grant privilege, approve support access, switch authority context, invoke break-glass or reveal secrets**.
>
> Privilege activation, support grants, privileged accesses and emergency sessions produce reconstructable **Privileged Access Receipts** linked to M2-12/RQ-07 evidence.
>
> Secrets remain behind protected credential infrastructure. Operators see secret status/metadata and invoke governed reconnect/rotate/revoke operations rather than reading raw secret values.
>
> **Admonk should be able to operate and support every tenant without ever needing an invisible god account.**

## 29. Accepted cost

This adds:
- operator capability/eligibility metadata;
- temporary privilege sessions;
- support-access grants;
- access expiry/review;
- customer-access transparency;
- emergency procedures;
- more audit evidence.

In exchange:
- tenant isolation remains credible;
- Control Room can be powerful without universal privilege;
- support access becomes explainable;
- insider/credential compromise blast radius drops;
- Production access becomes deliberate;
- regulated/high-assurance tenants can use stronger approval modes;
- future operational growth does not depend on shared root credentials.

## 30. Recommendation

**LOCK M2-19A as written.**

If locked, proceed to:

> **M2-20 — Runtime Boundaries: shared contract vs package/module vs process/worker vs shared platform service vs domain-owned runtime.**

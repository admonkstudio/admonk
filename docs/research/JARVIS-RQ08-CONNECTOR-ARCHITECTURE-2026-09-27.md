# Jarvis Research Question 08 — Admonk-Owned Connector & Integration Architecture

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** How should Admonk's own connector/integration architecture work?  
**Status:** RESEARCH COMPLETE — RECOMMENDED FOR OWNER LOCK  
**Implementation authority:** None. Product/platform architecture research only.

## 1. Decision problem

The earlier research register used the provisional question `What role should n8n ultimately have?`.

The owner has clarified the Product direction:

> **n8n is not part of the Admonk Product architecture. Admonk will build and own its connectors, and connections are configured as part of onboarding/setup.**

Therefore RQ-08 is replaced with the correct problem:

> **How should Admonk-owned connectors be defined, connected, synchronized, monitored, versioned and exposed to products/Jarvis while preserving security, speed and domain authority?**

This question implements the already-locked Foundation M2-09 direction:
- Admonk One is the shared integration control plane;
- connect once where the provider/account/purpose/security boundary is compatible;
- sync/backfill once where practical;
- centrally protect credentials;
- separate data-read access from provider-action access;
- specialist products keep domain semantics.

## 2. External evidence

### OAuth security baseline

IETF RFC 9700 is the current OAuth 2.0 Security Best Current Practice. It recommends/mandates modern protections including PKCE for public clients (and recommends it for confidential clients), least-privilege access-token scope/resource restriction, and refresh-token replay protections such as rotation/sender-constraining where relevant.

Source:
- https://www.rfc-editor.org/info/rfc9700/

### Incremental consent / least privilege

Google's current OAuth guidance recommends requesting scopes in context and incrementally, rather than asking for broad access up front, and supports offline access through refresh tokens when background synchronization is required.

Sources:
- https://developers.google.com/identity/protocols/oauth2/web-server
- https://developers.google.com/identity/protocols/oauth2/resources/best-practices

### Push + durable delta synchronization

Microsoft Graph documents two complementary mechanisms:
- change notifications for fast event-driven awareness;
- delta queries/checkpoints to synchronize all changes since the last known state.

Microsoft explicitly recommends combining the two where suitable to reduce polling while preserving synchronization completeness.

Sources:
- https://learn.microsoft.com/en-us/graph/change-notifications-overview
- https://learn.microsoft.com/graph/delta-query-overview

### Incremental state/checkpointing

Airbyte's connector architecture provides a useful reference pattern: connector state/cursors allow incremental sync rather than re-reading the complete provider dataset, while deduplication/primary keys handle replayed boundary records.

Sources:
- https://docs.airbyte.com/platform/using-airbyte/core-concepts/sync-modes/incremental-append-deduped
- https://docs.airbyte.com/platform/connector-development/tutorials/custom-python-connector/getting-started

Airbyte is not proposed as Admonk's connector runtime; this is an implementation-pattern reference only.

## 3. Core conclusion

> **A connector is a versioned Admonk software adapter around one provider/API boundary. A connection is a tenant-owned configured instance of that connector.**

Do not merge these concepts.

```text
Connector Definition
  Google Ads v3 adapter
        │
        ├── Connection A — Tenant Kalam / Marketing
        ├── Connection B — Tenant X / Marketing
        └── Connection C — Tenant Y / Marketing
```

The connector code is Admonk-owned.

The connection belongs to the tenant/provider authorization and contains configuration/credential references—not connector business logic.

## 4. Recommended architecture

```text
                     ADMONK ONE
              Setup / Integration Center
                         │
             ┌───────────┴────────────┐
             ▼                        ▼
      Connector Catalog        Connection Registry
      - definitions            - tenant-owned instances
      - versions               - auth/scopes
      - requirements           - selected accounts/resources
      - capabilities           - health/status
      - setup schema           - sync checkpoints
             │                        │
             └───────────┬────────────┘
                         ▼
             ADMONK CONNECTOR RUNTIME
      ┌────────────────────────────────────┐
      │ credential broker/vault reference  │
      │ provider clients                   │
      │ account/resource discovery         │
      │ backfill                           │
      │ incremental sync/checkpoints       │
      │ webhook/change ingestion           │
      │ polling/reconciliation             │
      │ rate-limit/retry control           │
      │ provider action adapters           │
      │ health/observability               │
      └─────────────────┬──────────────────┘
                        │
                        ▼
                   PROVIDER APIs
                        │
                        ▼
            GOVERNED DATA/CAPABILITY LAYER
              ┌─────────┼─────────┐
              ▼         ▼         ▼
          Marketing   Support   Future Product
              │         │         │
              └─────────┼─────────┘
                        ▼
                      Jarvis
```

Jarvis never receives provider credentials and never calls raw provider endpoints directly.

## 5. Connector Definition contract

Every provider connector should expose a versioned manifest.

Candidate:

```text
ConnectorDefinition
  connector_key
  version
  provider
  auth_method(s)
  setup_schema
  supported_regions/environments
  requested_scope_catalog
  account/resource discovery
  data_domains/streams
  incremental_sync support
  webhook/change support
  polling/reconciliation support
  read capabilities
  action capabilities
  rate-limit model
  retry policy
  provider idempotency support
  health checks
  migration policy
  deauthorization/revocation handling
```

Do not force every provider into identical mechanics. The manifest describes capabilities; it does not pretend all APIs behave the same.

## 6. Connection Instance contract

Candidate:

```text
Connection
  connection_id
  tenant_id
  connector_key + version
  provider_environment
  authorization_owner/principal
  organizational_scope steward
  credential_reference
  granted_scopes
  provider account/workspace ids
  selected resources/data domains
  enabled read capabilities
  enabled action capabilities
  status
  health
  created/reauthorized timestamps
  last successful sync
  freshness/lag
  sync checkpoint(s)
  webhook/subscription references
  errors/degraded reasons
```

Secrets/tokens are referenced, not copied into ordinary product records.

## 7. Setup / onboarding lifecycle

Connections should feel like part of product setup, not a developer integration console.

Recommended flow:

```text
1. Product/SKU enabled
        ↓
2. Setup Center shows Required / Recommended / Later connectors
        ↓
3. User chooses Connect
        ↓
4. Explain why access is needed + requested capability
        ↓
5. Provider OAuth/API authorization
        ↓
6. Discover accessible provider accounts/workspaces/resources
        ↓
7. User selects correct accounts/resources
        ↓
8. Validate scopes + connection health
        ↓
9. Configure initial backfill / start-from-now
        ↓
10. Initial sync
        ↓
11. Product-specific mapping/semantic setup if needed
        ↓
12. Connector becomes Ready
```

This should reuse M2-08 Shared Setup Center:
- `Required` connectors may block a capability's activation;
- `Recommended` connectors improve product value;
- `Later` connectors are requested only when relevant functionality is used.

## 8. Incremental permission / scope acquisition

Do not request every possible provider scope during onboarding.

Preferred:

```text
Initial use:
read analytics scopes only

Later user enables publishing:
request additional write/publish scope
```

Benefits:
- clearer consent;
- smaller blast radius;
- higher authorization success;
- capability activation reflects actual granted provider authority.

Where providers support incremental authorization, use it.

Where they do not, explain that reauthorization will expand scopes before initiating it.

## 9. Connection reuse — connect once does not mean reuse blindly

M2-09 says connect once where practical.

Reuse the same provider connection only when these boundaries are compatible:
- tenant;
- provider account/workspace;
- authorization principal/service identity;
- security purpose;
- required scopes;
- environment/region;
- data residency/policy constraints.

Do not force unrelated departments/security contexts onto one credential merely to achieve architectural neatness.

Connection reuse is a cost/security optimization, not an absolute rule.

## 10. Separate read, sync and action capabilities

A provider connector may expose three distinct families:

### Read/query
Live or near-live provider reads.

### Sync/ingestion
Historical backfill + incremental synchronization into governed Admonk data layers.

### Actions
Provider mutations through RQ-07 capability contracts.

Authorization is separate.

Example:

```text
Meta connection
  READ ads metrics       ✓
  SYNC campaign data     ✓
  CREATE draft campaign  ✓
  PUBLISH campaign       ✗
```

Having provider read access does not imply action permission.

## 11. Data sync strategy

Each data stream/resource declares its synchronization mode.

Possible modes:

```text
LIVE_QUERY
FULL_BACKFILL
INCREMENTAL_CURSOR
DELTA_TOKEN
WEBHOOK_TRIGGERED
HYBRID_PUSH_PULL
MANUAL_IMPORT
```

Default preference where provider support exists:

> **event/change notification for low latency + durable cursor/delta reconciliation for completeness.**

Why:
- webhooks can be duplicated, delayed or missed;
- polling everything is slow/expensive and risks rate limits;
- durable incremental checkpoints provide recovery.

## 12. Push notifications are signals, not canonical history

A webhook/change notification should generally mean:

`something changed; reconcile this resource/domain`

rather than:

`this event alone is the permanent source of truth`.

Connector runtime should:
- verify signature/authenticity;
- deduplicate provider event IDs where available;
- acknowledge quickly;
- process asynchronously;
- reconcile provider state/delta where the provider semantics require it;
- tolerate out-of-order/replayed notifications.

## 13. Sync checkpoints and replay safety

Every incremental stream needs durable state:
- cursor;
- delta token;
- page/checkpoint token;
- provider sequence/revision;
- last reconciled time;
- stream version.

Providers may replay changes. Merge logic must be idempotent/deduplicated using stable provider IDs/primary keys/revisions.

Checkpoint updates should occur only after the corresponding batch is durably applied.

## 14. Initial backfill and ongoing sync are different modes

Initial activation may require:
- full account discovery;
- historical pagination;
- rate-limit-aware backfill;
- progress reporting;
- retry/resume.

Once caught up:
- switch to incremental/push-based updates.

The user should see:
- setup/backfill progress;
- last successful sync;
- freshness lag;
- degraded/healthy state.

## 15. Provider rate limits

Every connector owns provider-specific rate-limit behavior.

Runtime should support:
- provider/account-level budgets;
- backoff and retry-after handling;
- concurrency limits;
- priority classes;
- backfill throttling;
- interactive action priority over low-priority historical sync where appropriate.

Do not let a large backfill prevent an urgent approved provider action.

## 16. Connector health contract

Connection health should be first-class in Admonk One.

Candidate states:

```text
UNCONFIGURED
AUTHORIZING
BACKFILLING
HEALTHY
DEGRADED
REAUTH_REQUIRED
MISSING_SCOPE
RATE_LIMITED
SYNC_STALLED
PROVIDER_OUTAGE
DISABLED
ERROR
```

Health should expose user-actionable cause and repair path.

Examples:
- reconnect account;
- grant missing scope;
- choose replacement account;
- restart full sync after expired delta token;
- resolve provider configuration.

## 17. Provider revocation and token lifecycle

OAuth/token lifecycle is part of connector health, not a hidden implementation detail.

Runtime must handle:
- token expiration/refresh;
- token rotation where applicable;
- user/provider revocation;
- expired refresh grants;
- scope changes;
- provider app reauthorization;
- disconnected/deleted provider account.

Connection loss should degrade only the dependent capabilities; it should not destroy previously governed historical data unless retention/deletion policy requires it.

## 18. Credential architecture

Rules:
- raw tokens/secrets remain server-side;
- store them through an encrypted credential/vault boundary;
- ordinary application DB rows store credential references/metadata rather than raw secrets where practical;
- models never receive credentials;
- frontend never receives long-lived provider secrets;
- log redaction is mandatory;
- rotate internal encryption/key material independently of provider connections where possible.

OAuth authorization flows should use modern security protections, including state/transaction binding and PKCE where applicable.

## 19. Own framework, provider libraries allowed

`Admonk-owned connectors` does not mean reinvent every low-level HTTP/OAuth library.

We may use:
- official provider SDKs;
- mature OAuth libraries;
- HTTP clients;
- schema libraries;
- webhook-signature libraries.

But Admonk owns:
- connector contract;
- setup experience;
- credential boundary;
- sync/checkpoint semantics;
- normalized health;
- capability mapping;
- domain exposure;
- tests/migrations;
- observability.

## 20. Do not normalize away useful provider semantics

A dangerous connector-platform mistake is creating one universal `record` API that hides important provider differences.

Use two layers:

```text
Provider Adapter
  preserves provider-native concepts
        ↓
Governed Domain Contract
  translates only what the product/domain genuinely understands
```

Example:
- Google Ads campaign and Meta campaign may both participate in `Marketing Campaign Performance`;
- but provider-specific targeting/bidding semantics need not be forced into one fake universal object.

Shared semantics are promoted only when proven, consistent with M2-01.

## 21. Connector packages / internal organization

Recommended shape:

```text
connectors/
  meta-ads/
    manifest
    auth
    discovery
    reads
    sync
    actions
    webhooks
    rate-limits
    mappings
    health
    migrations
    fixtures/tests

  google-analytics/
  google-search-console/
  linkedin/
  zoho-recruit/
  zoho-desk/
  ...
```

Not every connector requires every module.

## 22. Product/domain exposure

Connector data/actions are not automatically available to every product.

Flow:

```text
Provider Connector
        ↓
shared connection/sync plumbing
        ↓
domain-owned governed contract
        ↓
product capability
        ↓
Jarvis
```

Marketing Hub decides what a Meta/GA4 field means for marketing metrics.

Jarvis consumes Marketing's governed capability/data contract; it does not reinterpret raw provider schemas as business truth.

## 23. Source/freshness metadata

Every governed data result should be able to expose:
- source/provider;
- connection;
- provider resource/account;
- retrieved/synced time;
- effective data time;
- freshness status;
- whether value is live/cached/imported;
- provenance/version where relevant.

This is important for Jarvis explanations and the interactive workspace.

## 24. Connector onboarding should seed Jarvis's capability graph

Once a connection becomes healthy:
- activated read capabilities become discoverable;
- synchronized data domains become available to authorized products;
- allowed action capabilities become candidates for RQ-07 execution;
- Jarvis semantic/capability graph can represent the newly connected system.

This gives meaning to the connected-circle hypothesis:

```text
Before connection:
Marketing → Meta (available to connect)

After connection:
Marketing → Meta Ads (healthy)
              ├ analytics
              ├ campaigns
              └ approved actions
```

The visual representation must still hide secrets and respect authorization.

## 25. Testing strategy

Every connector must have contract tests covering:

### Authentication/setup
- callback/state validation;
- scope detection;
- revocation;
- refresh/reconnect;
- wrong account/resource selection.

### Reads/sync
- initial backfill;
- pagination;
- checkpoint resume;
- replay/duplicate events;
- deletion handling;
- expired/reset cursor/delta token;
- partial sync failure;
- rate limiting;
- schema evolution.

### Actions
- RQ-07 capability schema;
- permission/approval boundary;
- idempotent retry;
- provider error mapping;
- result verification.

### Health
- outage;
- token expiry;
- missing scope;
- stalled sync;
- recovery.

Use provider sandboxes/test accounts/recorded fixtures where available.

## 26. Versioning/migrations

A connector version can change:
- OAuth scopes;
- provider API version;
- schemas;
- sync state format;
- mapping logic;
- action behavior.

Therefore versioning must distinguish:
- connector code version;
- provider API version;
- connection configuration version;
- sync/checkpoint format version;
- domain contract version.

Migration should preserve/transform connection state where safe; otherwise explicitly require resync or reauthorization.

This directly intersects M2-19 Version/Compatibility/Migration.

## 27. What is deliberately not locked here

RQ-08 does not yet choose:
- programming language/runtime;
- secrets-vault vendor;
- job/queue technology;
- exact database/storage topology;
- event-bus vendor;
- connector SDK packaging mechanism;
- exact deployment model;
- whether some connector runtime later becomes a shared service vs package.

Those are later M2-20/RQ-19/RQ-25 decisions.

## 28. Recommended lock

> **RQ-08 — Admonk-Owned Connector Architecture**
>
> Admonk builds and owns a versioned connector framework and connector modules. Third-party workflow engines are not part of the Product architecture.
>
> **Connector Definition** and tenant-owned **Connection Instance** are separate concepts. Connections are established and maintained through Admonk One / the Shared Setup Center as part of onboarding and ongoing setup health.
>
> Provider credentials remain centrally protected and server-side. Products, browsers and models consume governed capabilities/data—not raw credentials.
>
> Connect once / sync once applies where tenant, provider account, purpose, scope and security boundaries are compatible; it is not a mandate to reuse incompatible credentials.
>
> Connectors expose separate read/query, sync/ingestion and provider-action capabilities. Read access never implies action authority.
>
> OAuth/scopes follow least-privilege and incremental-consent principles where supported.
>
> Synchronization prefers provider-native incremental/delta mechanisms and durable checkpoints. Where suitable, combine push/change notifications for low latency with pull/delta reconciliation for completeness.
>
> Connector runtime must be replay-safe, rate-limit-aware, resumable and health-observable.
>
> Provider-native details remain in the provider adapter; products translate them into governed domain contracts only where semantics genuinely belong to the domain.
>
> Jarvis sees stable governed product capabilities and source/provenance metadata. It never calls provider APIs or connector internals directly.
>
> Connection activation seeds the authorized Jarvis capability/context graph so newly connected systems become available immediately to relevant products and experiences.
>
> **Admonk owns the integration experience, connector contracts, sync mechanics, health and capability boundary—even when it uses provider SDKs/libraries internally.**

## 29. Recommendation

**LOCK RQ-08 as written.**

This converts the existing M2-09 strategy into a concrete connector/onboarding architecture while preserving future implementation freedom.
# T025 — Error Monitoring

**Decision:** Better Stack from the beginning.

Use Better Stack as the preferred operational/error monitoring platform, but enable only capabilities the product needs. Do not treat adoption as permission to turn on every feature or duplicate adequate observability elsewhere.

Prefer OpenTelemetry-compatible instrumentation where practical to preserve portability.

**Accepted tradeoff:** broader platform earlier for fewer separate operational tools later.
**Related:** S008, PB02, PB06.

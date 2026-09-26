# T026 — Feature Flags

**Decision:** PostHog + OpenFeature.

Use PostHog for practical feature flags, experiments and product analytics; preserve provider portability through OpenFeature where practical.

Flags are not universal for every change. Use them when they materially reduce risk or enable controlled learning; temporary flags require cleanup ownership.

**Related:** S015, PB02.

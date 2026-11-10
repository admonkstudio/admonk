# BriefFlow — Architecture & Risk Brief

## Smallest dependable architecture

A managed web application with one application/backend boundary, one managed relational database, managed authentication, and one external AI model API.

## Proposed stack

Application: single web app / modular monolith.  
Database: managed PostgreSQL.  
Auth: managed passwordless/email authentication.  
Hosting: managed application hosting.  
AI: provider API behind server-side adapter.  
Secrets: server-side environment/secret store only.

## Core entities

- User
- Workspace
- Membership
- Brief
- BriefRevision
- ApprovalEvent
- AIInvocationReceipt

## Authorization

Every brief query/action is scoped by authenticated workspace membership. Manager approval is checked server-side.

## Environments

Local/development and isolated staging for prototype validation. No real production customer data.

## Observability/recovery

Application errors captured. Structured server logs for auth/AI failures. Database provider backup capability enabled before any persistent pilot data is considered important.

## Cost

Prefer free/low-cost managed tiers; model calls capped for the fixture.

## Deliberate critical-unknown test

Initial test question: **How is workspace authorization enforced?**

Before this brief specified server-side membership checks, the Build Readiness Gate was **BLOCKED**, because cross-workspace data access was unresolved.

Resolution: workspace membership and manager approval checks are explicit server-side authorization requirements.

## Build gate

Critical unresolved product/data/auth/security question exists: No.  
Ready for controlled prototype build: Yes.

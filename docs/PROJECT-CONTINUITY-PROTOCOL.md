# Project Continuity & Multi-Agent Coordination Protocol

**Date:** 29/09/2026  
**Status:** CANONICAL OPERATING RULE  
**Applies to:** SOLO/SIA discovery, pilots, implementations, specialist workers and cross-repository execution

## Purpose

Long-running product work must survive:
- chat/session limits;
- agent handoffs;
- model changes;
- parallel workers;
- temporary branches;
- external-tool state;
- interrupted implementation.

Chat memory is useful context, but it is **not project authority**.

> **Repository state + current checkpoint + explicit work packet = authoritative working memory.**

An agent must be able to resume correctly even if it has never seen the prior conversation.

## 1. Authority rule

For any active project:

1. current explicit owner instruction;
2. repository AGENTS/instructions;
3. current status/checkpoint;
4. current task/work packet;
5. canonical architecture/product decisions;
6. implementation evidence;
7. chat/session memory.

If memory conflicts with repository authority, the repository wins unless the owner explicitly changes it.

No agent may treat a prior chat summary as proof that code was merged, deployed, tested or accepted.

## 2. One bounded work packet at a time

Avoid giant sessions that mix architecture, implementation, deployment, cleanup and testing.

A work packet should normally contain:
- one objective;
- one repository/branch or one external-system scope;
- explicit allowed changes;
- explicit prohibited changes;
- exit evidence;
- checkpoint update.

Prefer several moderate completed packets over one enormous conversation.

A worker must not begin the next major slice merely because the current slice code exists.

## 3. Mandatory start-of-work reconstruction

Before changing anything, the worker must verify:

- canonical repository;
- current phase/milestone;
- current branch/PR if implementation is active;
- live current HEAD SHA verified from the repository host;
- current blockers;
- accepted vs implemented vs tested vs deployed state;
- relevant external resource IDs when the task touches external systems.

If the current status document is stale, correcting it is part of the task before further expansion.

### SHA recording rule

A checkpoint commit cannot contain its own resulting SHA without becoming stale by definition.

Therefore:
- record the **code-under-review SHA** or pre-checkpoint implementation SHA inside the checkpoint;
- verify the **live branch HEAD** directly from GitHub/repository host at the start of the next work packet;
- treat any SHA written inside a committed checkpoint as evidence of the code state it describes, not as a self-updating branch pointer.

## 4. Mandatory end-of-work checkpoint

Before an agent/session stops, it must update project authority with:

- exact work completed;
- exact work not completed;
- branch + code-under-review SHA (or pre-checkpoint HEAD);
- PR/deployment status;
- tests actually executed and their results;
- external mutations made;
- new blockers;
- next bounded action;
- explicit do-not-resume items.

Never write “complete” when the work is merely implemented but untested.

Use explicit states:
- PLANNED
- IMPLEMENTED
- VALIDATION BLOCKED
- VALIDATED
- ACCEPTED
- DEPLOYED
- RETIRED / CLEANED UP

## 5. Multi-agent roles

SIA/supervisor owns:
- objective;
- architecture;
- work decomposition;
- authority;
- acceptance;
- synthesis;
- escalation.

Workers/specialists receive narrow work packets.

Workers must not silently change architecture, expand scope or reinterpret product decisions.

When a worker finds a conflict:
1. stop the conflicting change;
2. capture evidence;
3. explain impact;
4. return the decision to SIA/owner.

## 6. External-system state

GitHub, Webflow, n8n, Supabase and other platforms can accumulate temporary resources.

Any created or modified external resource must be recorded with:
- system;
- resource name;
- resource ID when available;
- purpose;
- environment;
- owner;
- current status;
- cleanup disposition: KEEP / MIGRATE / DELETE / REVIEW.

Temporary resources must never become permanent architecture by accident.

## 7. Cleanup principle

The project will include explicit consolidation/hygiene milestones.

Cleanup must be evidence-driven, not impulsive.

Target:
> **one clean canonical project structure, intentional environments, intentional branches, intentional workflows, intentional names, and no undocumented leftovers.**

Cleanup can cover:
- GitHub repositories/branches/PRs/files;
- Webflow Cloud apps/environments;
- n8n projects/workflows/credentials;
- Supabase projects/tables/functions;
- duplicate docs/checkpoints;
- obsolete naming;
- staging/test fixtures.

Do not mix broad cleanup into an active feature-validation branch unless the cleanup directly blocks acceptance.

## 8. Session-limit recovery

If a conversation/session is cut off:

1. do not trust conversational memory as complete;
2. open the canonical current status/checkpoint;
3. inspect active branch/PR HEAD;
4. inspect last worker evidence;
5. reconcile discrepancies;
6. continue only from verified state.

The user should never need to reconstruct the entire project manually.

## 9. Acceptance ownership

Implementation workers may report evidence.

They do not self-promote work from IMPLEMENTED to ACCEPTED unless the work packet explicitly delegates acceptance authority.

For critical architecture/security/product work, final acceptance remains with SIA/supervisor + owner as defined by the project.

## 10. Minimum handoff format

Every substantial worker response/checkpoint should provide:

1. objective completed;
2. repository + branch + HEAD;
3. files/resources changed;
4. tests actually run;
5. test results;
6. external mutations;
7. blockers;
8. next bounded step;
9. explicit merge/deploy status.

This protocol is intended to reduce memory dependence, duplicated work, accidental drift and cleanup debt.

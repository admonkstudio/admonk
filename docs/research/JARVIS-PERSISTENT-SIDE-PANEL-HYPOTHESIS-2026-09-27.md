# Jarvis Persistent Side-Panel Hypothesis

**Date:** 2026-09-27  
**Status:** OWNER DESIGN HYPOTHESIS — NOT YET LOCKED AS LAYOUT  
**Related decisions:** RQ-05 / JX-03 / JX-04

## Owner direction

When the user is inside a full specialist dashboard (S2), Jarvis should remain continuously available in a dedicated right-side panel or equivalent persistent assistant region.

The user should be able to continue the same task/conversation with the current dashboard context already known, for example:
- summarize the data currently presented;
- explain an anomaly in the visible chart;
- compare selected rows/resources;
- create a follow-up action from the current resource;
- continue a conversation that began in S0/S1;
- update the visible dashboard/workspace through natural-language instruction where the product exposes that capability.

## Product interpretation

This strengthens the RQ-05 rule:

> Conversation is the persistent control channel even when S1 or S2 becomes the primary work surface.

The side panel is a strong desktop layout candidate because it lets the user keep:
- the domain workspace visible;
- Jarvis contextually present;
- task continuity across Conversation → Workspace → Dashboard;
- direct manipulation and natural-language control available at the same time.

## Important architecture rule

Jarvis must receive structured current-surface context rather than relying on screenshots or asking the model to rediscover the UI.

Possible current-context envelope:
- tenant/product;
- route/page;
- resource id(s);
- selected records;
- active filters/date range;
- visible metric/chart identifiers;
- current artifact/task id;
- permitted actions;
- deep-link/resource references.

This allows a prompt such as `summarize the presented data` to mean the governed currently-visible dataset, not an ambiguous scrape of pixels.

## Responsive-layout note

The right-side panel is a desktop hypothesis, not a universal layout rule. JX-04 should define equivalents for narrow screens, mobile, fullscreen workspaces and accessibility modes.

## Status

Preserve as a leading JX-03/JX-04 design direction. Do not yet lock exact width, placement, collapse behavior or mobile presentation.
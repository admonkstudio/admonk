# Jarvis Research Question 04 — Voice Architecture

**Date:** 2026-09-27  
**Track:** Jarvis Deep Question Register  
**Question:** What is the correct architecture for voice?  
**Status:** LOCKED — OWNER ACCEPTED  
**Implementation authority:** None. Product/architecture research only.

## 1. Decision problem

Jarvis voice must feel like a natural part of the software experience without:
- forcing every spoken request through the same reasoning model;
- making voice the authority for tools/actions;
- coupling Jarvis to one provider;
- losing text/workspace continuity;
- becoming fragile when networks, turn detection or speech recognition are imperfect;
- assuming that English-only or monolingual behavior is sufficient.

The desired product is not a voice bot.

Voice is one realtime interaction surface for the same Jarvis software and governed capability architecture.

## 2. Current research evidence

### OpenAI — three distinct voice architectures

Current OpenAI voice guidance explicitly distinguishes:
1. **full-duplex voice with a separate backend**;
2. **single speech-to-speech realtime model**;
3. **chained STT → agent workflow → TTS**.

Its current recommendation for new conversational voice applications is a full-duplex live experience when the conversation must continue naturally while a separate backend reasons, uses tools or completes tasks.

Sources:
- https://developers.openai.com/api/docs/guides/voice-agents
- https://developers.openai.com/api/docs/guides/audio
- https://developers.openai.com/api/docs/guides/live

This is highly aligned with Jarvis because RQ-03 already separates realtime interaction from cognitive depth and action authority.

### OpenAI — browser transport and backend control

OpenAI currently recommends WebRTC for browser/mobile realtime audio because it gives more consistent realtime performance than browser WebSockets. It also supports a server-side/sideband control connection so private tools, authorization and business rules remain on the trusted backend while audio stays on the low-latency media path.

Sources:
- https://developers.openai.com/api/docs/guides/voice-webrtc
- https://developers.openai.com/api/docs/guides/voice-server-controls

Pattern:
**direct low-latency media path + trusted backend control plane.**

### OpenAI — turn taking and interruption

Realtime supports server VAD, semantic VAD, manual/push-to-talk control and interruption/truncation. WebRTC/SIP sessions can automatically track how much generated audio was actually played when a user interrupts.

Sources:
- https://developers.openai.com/api/docs/guides/realtime-vad
- https://developers.openai.com/api/docs/guides/realtime-conversations

Pattern:
**barge-in and turn handling are first-class product mechanics, not cosmetic features.**

### Google Gemini Live — multilingual + interruption

Google's current Live API supports continuous realtime audio, VAD, interruption events and automatic spoken-language adaptation. Google documents 99 supported Live API languages including Arabic, and states native-audio models can switch languages during a conversation. It also recommends small streaming audio chunks and clearing client playback immediately on interruption.

Sources:
- https://ai.google.dev/gemini-api/docs/live-api/capabilities
- https://ai.google.dev/gemini-api/docs/live-api/best-practices

Pattern:
**multilingual native-audio conversation and interruption behavior are now provider capabilities, but must still be evaluated on the target dialect/environment.**

### Microsoft Voice Live

Microsoft's current Voice Live API supports real-time bidirectional voice over WebSocket, WebRTC features, smart end-of-turn detection and agent/tool lifecycle events. Microsoft recommends WebRTC for client-side real-time audio.

Sources:
- https://learn.microsoft.com/en-us/azure/ai-services/speech-service/voice-live-how-to
- https://learn.microsoft.com/en-us/azure/ai-services/speech-service/voice-live-api-reference-2026-06-01-preview

Pattern:
**the market is converging on realtime media sessions with explicit lifecycle/control events rather than one-shot speech APIs.**

### Deepgram

Deepgram exposes both:
- a managed single-WebSocket voice-agent pipeline; and
- composable streaming STT / LLM / TTS patterns.

Its docs emphasize immediate playback stop during barge-in and preserving what the user actually heard so conversation state can be reconciled.

Sources:
- https://developers.deepgram.com/docs/build-a-voice-agent
- https://developers.deepgram.com/docs/flux-tts/voice-agent

Pattern:
**a composable chained pipeline remains valuable where stage-level control or provider interchangeability matters.**

## 3. Architectures evaluated

### Option A — Chained STT → LLM → TTS for every voice turn

**Do not use as the universal Jarvis voice architecture.**

Advantages:
- transcript can be inspected before reasoning;
- each stage can be replaced independently;
- useful for precision, compliance, vocabulary tuning and fallback;
- easiest provider interchangeability.

Problems:
- added handoff latency;
- weaker natural turn-taking;
- loses some native audio/prosody information;
- more orchestration for barge-in and playback-state reconciliation.

Use selectively, not universally.

### Option B — One native speech-to-speech model owns the entire Jarvis session

**Reject as the product architecture.**

Advantages:
- natural conversation;
- low first-audio latency;
- simple session.

Problems:
- makes realtime model the reasoning/tool authority;
- couples voice, cognition and actions;
- difficult to independently upgrade deep reasoning;
- encourages provider lock-in;
- conflicts with RQ-01/RQ-03.

A realtime model may handle bounded turns, but it must not become the entire Jarvis brain.

### Option C — Hybrid full-duplex conversation plane + independent Jarvis backend

**Recommended.**

Voice owns:
- microphone/speaker realtime loop;
- speech activity/turn handling;
- interruption/barge-in;
- concise conversational bridging;
- live transcripts/events where available.

The Jarvis backend owns:
- task contract;
- C0/C1/C2/C3 routing;
- evidence/context retrieval;
- specialist orchestration;
- A0/A1/A2/A3 authority;
- permissions/approvals;
- durable task state;
- tool execution;
- final structured results.

This allows Jarvis to keep the conversation alive while deeper work proceeds independently.

## 4. Recommended architecture — dual plane

```text
                         USER
                    voice / text / UI
                          │
                          ▼
              JARVIS REALTIME EXPERIENCE
        ┌───────────────────────────────────┐
        │ audio in/out                     │
        │ turn detection                   │
        │ barge-in / interruption          │
        │ live transcript/events           │
        │ short conversational bridge      │
        │ immediate semantic UI state      │
        └─────────────────┬─────────────────┘
                          │
                   DELEGATION CONTRACT
                          │
                          ▼
                  JARVIS TASK ENGINE
        ┌───────────────────────────────────┐
        │ task contract                    │
        │ C0/C1/C2/C3 cognitive routing    │
        │ governed context/evidence        │
        │ A0/A1/A2/A3 authority            │
        │ tools / workflows                │
        │ durable/background work          │
        │ audit/provenance                 │
        └─────────────────┬─────────────────┘
                          │
                     result/events
                          │
                ┌─────────┴──────────┐
                ▼                    ▼
          spoken bridge      dynamic workspace
          / concise result    / artifact / chart
```

Voice and the visual workspace are synchronized views of the same task, not separate assistants.

## 5. Voice session rules

### V1 — The user can always interrupt

Barge-in is a core contract.

When the user speaks while Jarvis is speaking:
- stop local playback immediately;
- cancel/truncate the current spoken turn where supported;
- preserve what was actually heard;
- do not necessarily cancel backend work;
- decide backend cancellation separately based on task/action semantics.

Important distinction:
**interrupting speech is not the same as cancelling the task.**

Example:
Jarvis may stop speaking instantly while an already-approved report generation continues.

### V2 — Voice may delegate without blocking the conversation

For a deep request:

```text
User: "Investigate why CPL increased."
        ↓
Realtime Jarvis:
"Got it — I'm checking the acquisition evidence."
        ↓
backend C2 task begins
        ↓
voice remains available
        ↓
workspace populates progressively
        ↓
Jarvis summarizes result when useful
```

The realtime voice model does not need to perform the deep analysis itself.

### V3 — Voice must not bypass governed actions

A spoken request can propose an action.

It cannot bypass:
- capability validation;
- permission;
- policy;
- approval;
- typed execution;
- audit.

For consequential actions, visual confirmation should normally be available even if the user initiated by voice.

Voice confirmation may be allowed later for narrowly defined action classes, but that must be a separate policy decision rather than assumed.

### V4 — Voice and text share task continuity

A user can:
- begin by voice;
- inspect evidence visually;
- type a correction;
- continue speaking;
- leave and return to a long-running task.

The same Jarvis task/session identity must persist across modalities.

### V5 — Do not speak everything

Voice should optimize for conversational comprehension, not read the entire workspace aloud.

Prefer voice for:
- acknowledgement;
- concise findings;
- choices;
- warnings;
- clarifying questions;
- action/approval summaries.

Prefer workspace for:
- dense tables;
- charts;
- long evidence;
- comparisons;
- exact values;
- artifacts;
- detailed audit/history.

This preserves JX-01: Conversation → Dynamic Workspace → Full Dashboard.

## 6. Multilingual policy

Jarvis must be multilingual by architecture, but provider quality must be measured.

### Product rule

Separate:
- **user language preference**;
- **detected spoken language**;
- **accent**;
- **company/product terminology**.

Do not infer desired response language merely from accent or one borrowed word.

Current OpenAI prompting guidance explicitly recommends separating accent from language choice and controlling language switching deliberately.

Source:
- https://developers.openai.com/api/docs/guides/voice-prompting

Google's Live API currently documents automatic language adaptation, Arabic support and natural switching among supported languages.

Source:
- https://ai.google.dev/gemini-api/docs/live-api/capabilities

### Jarvis Lab requirement

Test at minimum:
- English;
- Modern Standard Arabic;
- Egyptian Arabic;
- English ↔ Arabic code-switching;
- Kalam/Admonk product names;
- marketing/technical vocabulary;
- noisy office/mobile conditions;
- different Egyptian accents/speaking rates.

Do not select a Production voice provider based only on published language support.

Measure:
- intent accuracy;
- transcription accuracy where transcript exists;
- turn-boundary quality;
- language-switch correctness;
- proper-noun/product-name accuracy;
- first-audio latency;
- interruption quality;
- perceived naturalness;
- task-success impact.

## 7. Transport architecture

### Browser/mobile

Preferred:
**WebRTC when supported by the selected realtime provider.**

Reasons:
- media transport designed for realtime audio;
- provider guidance consistently favors it for client realtime usage;
- better handling of media conditions than treating browser audio as ordinary application WebSocket traffic.

### Trusted backend

Use a server-side control connection / sideband / adapter for:
- private tools;
- business rules;
- permissions;
- approval coordination;
- secure context;
- observability;
- provider event normalization.

### Server-side audio / telephony

WebSocket or SIP/telephony transports may be appropriate depending on the provider/use case.

Transport choice is an adapter concern, not a Jarvis product-semantic decision.

## 8. Provider abstraction

Do not create a lowest-common-denominator interface that hides useful provider features.

Use an **Admonk Voice Session Contract** with capability negotiation.

Conceptually:

```text
VoiceSessionCapabilities
- transport: webrtc | websocket | sip
- native_audio: yes/no
- vad: server | semantic | client/manual
- barge_in: yes/no
- input_transcript: interim/final/none
- output_transcript: yes/no
- language_detection: yes/no
- language_switching: yes/no
- tool_delegation: yes/no
- session_resume: yes/no
- custom_voice: yes/no
- regional_processing: ...
```

Then:

```text
Jarvis Voice Contract
      │
      ├ OpenAI adapter
      ├ Google adapter
      ├ Azure adapter
      ├ composable STT/TTS adapter
      └ future/local adapter
```

The product can require capabilities per use case instead of pretending all providers behave identically.

## 9. Network and degradation strategy

Voice must fail gracefully.

Recommended degradation ladder:

```text
Full duplex native audio
       ↓ quality/connection problem
Realtime transcript + controlled speech
       ↓
Push-to-talk / chained STT→backend→TTS
       ↓
Voice input + text response
       ↓
Text-only Jarvis
```

Principles:
- never lose the underlying task merely because audio transport fails;
- preserve task ID/context;
- tell the user clearly when the interaction mode changed;
- do not falsely claim audio was understood if transcription/turn detection is uncertain;
- allow manual push-to-talk as a reliable fallback for difficult VAD environments.

## 10. Session and transcript ownership

Provider realtime session state is **ephemeral interaction state**, not canonical company memory.

Jarvis should normalize needed events/transcripts into its own governed task/event model subject to retention/privacy policy.

Do not assume:
- provider conversation history = company knowledge;
- transcript = source of business truth;
- every raw audio stream should be retained.

Audio/transcript retention requires later privacy/data-governance policy.

## 11. Evaluation matrix

### Natural interaction
- first-audio latency;
- turn-end detection latency;
- false interruption rate;
- missed interruption rate;
- barge-in stop latency;
- over-talking rate;
- unnecessary spoken responses;
- perceived naturalness.

### Language
- English task success;
- MSA task success;
- Egyptian Arabic task success;
- code-switch task success;
- proper noun/domain vocabulary accuracy;
- language-switch error rate.

### Backend continuity
- delegation success;
- deep-task continuation while voice remains usable;
- voice↔text↔workspace continuity;
- interruption without accidental task cancellation;
- approved action reliability.

### Reliability
- reconnect/resume;
- network degradation;
- device/browser variance;
- fallback success.

### Economics
- audio model cost/minute;
- STT/TTS cost where chained;
- backend reasoning cost;
- cost per successful spoken task;
- discarded/interrupted audio cost.

## 12. Provider decision

**Do not lock one Production voice provider in RQ-04.**

For the Jarvis Lab, benchmark at least:
1. one native/full-duplex realtime architecture;
2. one alternative native realtime provider;
3. one composable chained STT→Jarvis backend→TTS path.

A practical benchmark set based on current capabilities could include:
- OpenAI GPT-Live/Realtime;
- Google Gemini Live;
- a composable speech pipeline such as Deepgram STT/TTS + Jarvis backend.

Microsoft Voice Live is relevant if enterprise Azure requirements later justify inclusion, but the Lab should remain small.

The purpose is not to choose the provider with the prettiest demo. It is to measure the provider that best satisfies:
**task success + Arabic/English quality + interruption + latency + control + reliability + sustainable cost.**

## 13. Recommended lock

> **RQ-04 — Hybrid Voice Architecture**
>
> Voice is a realtime interaction surface of Jarvis, not a separate assistant or the authority for reasoning/actions.
>
> Jarvis uses a **dual-plane architecture**:
> 1. a low-latency realtime conversation plane for audio, turn-taking, interruption, transcripts/events and concise spoken interaction;
> 2. an independent governed Jarvis task/backend plane for C0–C3 cognition, context/evidence, A0–A3 authority, tools, actions and durable work.
>
> Realtime voice may handle bounded conversational turns directly, but deeper analysis/actions are delegated without blocking the conversation.
>
> Browser/mobile audio should prefer WebRTC when supported; private tools/business rules stay on a trusted backend/control plane.
>
> Barge-in is required. Interrupting speech must not automatically cancel backend work.
>
> Voice, text and dynamic workspace share one task/session continuity.
>
> Jarvis uses an Admonk-owned voice-session contract with provider capability negotiation so realtime providers, speech components and transports remain replaceable.
>
> Multilingual operation is a product requirement. English, MSA, Egyptian Arabic and English/Arabic code-switching must be measured in Jarvis Lab before Production provider selection.
>
> Voice degrades gracefully through realtime → push-to-talk/chained → voice-input/text-output → text rather than losing the task.
>
> **Do not select the final voice provider until measured Jarvis Lab evidence exists.**

## 14. Recommendation

**LOCK RQ-04 as written.**

This gives Jarvis a durable voice architecture while intentionally leaving provider/model choice to empirical Lab testing.

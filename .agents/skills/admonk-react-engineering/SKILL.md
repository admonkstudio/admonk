---
name: admonk-react-engineering
description: Build, review, refactor, and optimize React or Next.js implementations for Admonk web experiences. Use only when the project actually uses React/Next.js or when evaluating whether React/Next.js code has performance, data-fetching, rendering, bundle, or architecture problems. Adapted from Vercel Engineering's React Best Practices while preserving Admonk's stack-neutral product philosophy.
---

# Admonk React Engineering

Use this skill when the implementation layer is **React or Next.js**.

This skill answers:

> **Is the React/Next.js implementation efficient, maintainable, responsive, and technically appropriate for the experience we are trying to build?**

It does not decide whether a project should use React or Next.js in the first place.

> **Choose the stack because the project needs it. Optimize it properly once it is chosen.**

---

## 1. Authority and Context

Admonk's product is the Web Experience, not a framework.

Before applying React-specific guidance:

1. Confirm the project actually uses React or Next.js.
2. Inspect `package.json` and the existing project structure.
3. Identify the framework/version and rendering model.
4. Preserve working architecture unless there is a concrete reason to change it.
5. Do not migrate a Webflow, static HTML, or another-framework project to React merely because this skill exists.

For UX behavior, use:

- `.agents/skills/admonk-ux-systems/SKILL.md`

For creative web direction, use:

- `.agents/skills/admonk-web-design/SKILL.md`

For motion decisions, use:

- `.agents/skills/admonk-motion/SKILL.md`
- Relevant GSAP skills when GSAP is used.

---

## 2. Performance Priority Order

When reviewing React/Next.js performance, investigate in this order:

1. Network/data waterfalls
2. Bundle size and unnecessary client JavaScript
3. Server-side work and serialization
4. Client-side fetching and duplicated work
5. Unnecessary re-renders
6. Rendering cost and browser work
7. JavaScript micro-optimizations
8. Advanced abstractions

Do not spend time micro-optimizing loops while the page still contains a major request waterfall or oversized client bundle.

---

## 3. Eliminate Waterfalls First

Independent asynchronous work should generally run in parallel.

Prefer:

```js
const [profile, projects] = await Promise.all([
  getProfile(),
  getProjects(),
]);
```

instead of unnecessarily sequential awaits.

Also:

- Start independent promises early and await them when their values are needed.
- Move `await` inside the branch that actually requires it.
- Check cheap synchronous conditions before starting expensive remote work where appropriate.
- Restructure component/data boundaries when they create accidental serial fetching.
- Use Suspense/streaming when it improves meaningful progressive rendering.

Do not parallelize operations that genuinely depend on each other.

---

## 4. Bundle Size Is a Critical Constraint

Every client-side dependency has a cost.

Review:

- Large dependencies
- Barrel imports that pull in unnecessary modules
- Client components that could remain server-rendered
- Heavy features loaded on the initial route
- Analytics and third-party scripts loaded before they are needed
- Libraries added for problems that the current stack already solves

Prefer:

- Direct imports where they reduce bundled code.
- Dynamic imports for genuinely heavy optional components.
- Conditional loading for features that may never be used in the session.
- Deferring non-critical third-party scripts.
- Preloading only when there is a strong probability the resource will soon be required.

Do not split code into tiny chunks indiscriminately. The objective is lower real loading cost, not maximum fragmentation.

---

## 5. Keep the Server/Client Boundary Intentional

In Next.js projects using React Server Components, avoid turning large parts of the tree into client components without need.

Keep client-side code for things that genuinely require:

- Browser APIs
- Interactive state
- Effects
- Event handlers
- Client-only libraries

When data can remain on the server, avoid serializing large objects into client props unnecessarily.

Prefer sending the smallest useful representation across the server/client boundary.

---

## 6. Server Actions and Server Endpoints Require Security

Treat server actions like public server endpoints.

For sensitive operations:

- Authenticate the user.
- Authorize the specific action/resource.
- Validate input.
- Do not trust hidden fields or client-supplied IDs.
- Return only the data the client needs.

A function being called from a React component does not make it private.

---

## 7. Server Caching Must Match Data Semantics

Use caching deliberately.

Possible layers include:

- Per-request deduplication
- Framework/data cache
- Cross-request application cache
- CDN/cache headers

Use per-request deduplication when repeated reads during one render should share work.

Use cross-request caching only when the data is safe to share for the chosen scope and invalidation model.

Never cache user-specific or authorization-sensitive data globally without an explicit safe design.

---

## 8. Avoid Shared Mutable Server State

Do not store request-specific mutable state in module-level variables in server-rendered applications.

Server processes can serve multiple users and requests.

Request-specific state should remain request-scoped or live in an appropriate external store.

---

## 9. Parallelize Server Fetching Through Architecture

Component composition can accidentally determine request order.

When two server-rendered sections are independent, structure them so they can begin work independently rather than forcing one component's fetch to complete before another starts.

For lists where each item's nested data can load independently, consider parallel item-level fetching instead of serial loops.

Always consider backend rate limits and database load before increasing concurrency.

---

## 10. Keep Non-Critical Work Off the Critical Response Path

Logging, analytics, notifications, and other side work should not delay a successful response unless the operation is required for correctness.

Use the framework/runtime's supported post-response or background mechanism when appropriate.

Do not move critical transactional work into a best-effort background path.

---

## 11. Client Data Fetching Should Avoid Duplication

If multiple client components consume the same remote resource, use an appropriate shared data strategy rather than creating repeated requests independently.

Possible approaches include:

- Framework data primitives
- A query/data-fetching library already used by the project
- SWR when it fits the existing stack
- Shared context/store for already-loaded data

Do not add SWR or another library automatically just because an upstream guideline mentions it.

Use the project's existing architecture unless a new dependency solves a real problem.

---

## 12. Global Event Listeners Should Be Controlled

Avoid attaching duplicate window/document listeners from many component instances.

For scroll/touch listeners:

- Use passive listeners where appropriate.
- Remove listeners during cleanup.
- Throttle/debounce only when the event workload needs it.
- Prefer browser/platform primitives over high-frequency JavaScript when possible.

For advanced pointer/scroll animation behavior, coordinate with the motion and GSAP performance guidance.

---

## 13. Treat Browser Storage as a Small Persistence Layer

For `localStorage` or `sessionStorage`:

- Store only what is necessary.
- Version persisted structures when schema changes are plausible.
- Handle malformed or old values safely.
- Avoid repeated storage reads in hot render paths.
- Never use browser storage for secrets.

---

## 14. Derive State Instead of Synchronizing It

If a value can be calculated from current props/state during render, usually calculate it directly.

Avoid:

```js
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

when this is sufficient:

```js
const fullName = `${firstName} ${lastName}`;
```

Every extra synchronized state value creates another opportunity for stale or inconsistent state.

---

## 15. Move Interaction Logic Into the Interaction

If logic exists only because a user clicked, selected, submitted, or changed something, prefer executing it in the event path rather than setting state solely to trigger an effect.

Effects are appropriate for synchronization with external systems.

They should not become the default place for all application logic.

---

## 16. Stabilize State Updates Where It Matters

Prefer functional state updates when the next state depends on the previous state:

```js
setCount((count) => count + 1);
```

This reduces stale-closure problems and often allows callbacks to remain stable.

For expensive initial state creation, pass an initializer function to `useState` rather than computing it on every render.

---

## 17. Do Not Memoize Automatically

Memoization has its own cost and complexity.

Use `memo`, `useMemo`, and `useCallback` when they prevent meaningful repeated work or stabilize an important dependency boundary.

Do not wrap simple expressions in memoization just because React performance is being discussed.

Measure or reason about the actual render cost.

---

## 18. Avoid Component Definitions Inside Components

Do not define reusable component types inside another component's render unless there is a specific reason.

Inline component definitions can create a new component identity on each render and cause unnecessary remounting/state loss.

Move stable component definitions to module scope.

---

## 19. Keep Effect Dependencies Understandable

Prefer primitive/stable dependencies where possible.

Avoid effects that depend on large freshly-created objects/functions every render.

If a hook contains multiple unrelated synchronization concerns, split them rather than building one effect with a difficult dependency graph.

Do not suppress dependency linting simply to make warnings disappear.

---

## 20. Use React Scheduling for Non-Urgent Work

For expensive updates that do not need to block direct input feedback, consider React scheduling primitives such as:

- `startTransition`
- `useTransition`
- `useDeferredValue`

The user's typing, tapping, and navigation feedback should remain responsive.

Do not use transitions to hide genuinely slow architecture or network problems.

---

## 21. Use Refs for High-Frequency Transient Values

Values that change frequently but do not need to trigger a visual render may belong in a ref rather than state.

Examples can include:

- Pointer coordinates used by an animation loop
- Previous measurement values
- Imperative integration state

Do not move UI state into refs merely to avoid rendering. If the UI depends on the value, React generally needs to know when it changes.

---

## 22. Rendering Performance

For expensive pages/components, review browser work as well as React work.

Useful techniques can include:

- `content-visibility` for very long off-screen content when appropriate.
- Hoisting truly static JSX/data out of repeated render paths.
- Reducing excessive SVG path precision where file weight is significant.
- Reserving dimensions to prevent layout shift.
- Using resource hints only for known critical upcoming resources.
- Loading scripts with appropriate async/defer behavior.

Do not sacrifice visual fidelity or semantic structure for tiny theoretical wins.

---

## 23. Animation and React

For complex motion:

- Avoid driving every animation frame through React state.
- Prefer transforms/opacity for compositor-friendly visual motion where appropriate.
- Keep DOM measurement and writes organized to avoid layout thrashing.
- Clean up timelines, listeners, observers, and ScrollTriggers when components unmount.
- Use `gsap.context()` / `useGSAP()` patterns where appropriate in React projects.

Use the dedicated Admonk motion and GSAP skills for animation architecture.

---

## 24. JavaScript Hot-Path Optimization

Only after higher-impact problems are addressed, consider optimizations such as:

- `Map`/`Set` for repeated lookups.
- Combining multiple passes over very large arrays when useful.
- Early exits from expensive functions.
- Hoisting repeated `RegExp` creation out of loops.
- Avoiding sorting when only min/max values are needed.
- Caching repeated storage/property/function reads in genuine hot paths.
- Deferring non-critical browser work to idle time where supported and appropriate.

Prioritize readability unless profiling or scale justifies the complexity.

---

## 25. Third-Party Libraries

Before installing a package:

1. Check whether the project already has a solution.
2. Check package size and maintenance status when relevant.
3. Confirm the feature is worth the dependency.
4. Prefer native/framework capabilities for straightforward problems.
5. Avoid importing an entire utility/component library for one small function.

Do not remove a stable existing dependency merely because another library is fashionable.

---

## 26. React/Next.js Review Workflow

For significant implementation work:

### Step 1 — Detect

Confirm framework, version, routing model, dependencies, rendering boundaries, and deployment environment.

### Step 2 — Reproduce

Understand the actual bug, bottleneck, or requirement before refactoring.

### Step 3 — Prioritize

Check waterfalls and bundle/client-JS cost before small render optimizations.

### Step 4 — Refactor

Make the smallest architectural change that resolves the meaningful issue.

### Step 5 — Verify

Run the project's available:

- Type check
- Lint
- Tests
- Build
- Relevant performance checks

### Step 6 — Experience Check

Confirm that optimization did not damage:

- Visual design
- Motion
- Accessibility
- Responsiveness
- Content behavior
- Conversion flow

---

## 27. Pre-Delivery Engineering Check

Before completing meaningful React/Next.js work, verify what is relevant:

### Data

- No obvious avoidable sequential fetch waterfall.
- Independent operations run concurrently where safe.
- Server/client boundaries are intentional.
- Sensitive server operations authenticate and authorize.
- Cache scope matches the data.

### Bundle

- No clearly unnecessary heavy dependency was added.
- Optional heavy UI is not forced into the initial bundle without reason.
- Third-party scripts load at an appropriate priority.

### React

- No unnecessary synchronized derived state.
- Effects represent synchronization rather than ordinary event logic.
- Expensive renders are addressed where they matter.
- Memoization is purposeful rather than automatic.
- Stable component identity is preserved.

### Browser

- No avoidable layout thrashing in frequent handlers.
- Animation remains smooth.
- Media/layout does not create major unexpected shifts.
- Long content/list rendering is appropriate for the scale.

### Project Integrity

- Existing project conventions were respected.
- New dependencies are justified.
- Build/tests/lint were run when available.
- Optimization did not flatten the intended web experience.

---

## 28. Relationship to Vercel React Best Practices

This skill is adapted from Vercel Engineering's `react-best-practices` agent skill.

The upstream guide prioritizes eight areas:

1. Eliminating waterfalls
2. Bundle size optimization
3. Server-side performance
4. Client-side data fetching
5. Re-render optimization
6. Rendering performance
7. JavaScript performance
8. Advanced patterns

Admonk keeps that performance hierarchy while changing the application rule:

> **React/Next.js recommendations apply only when React/Next.js is the actual implementation context. They do not define Admonk's preferred technology stack.**

See `docs/THIRD-PARTY-SKILLS.md` for source attribution and integration notes.

---

## 29. Final Principle

> **Solve architectural cost before micro-cost.  
> Keep client JavaScript intentional.  
> Keep interactions responsive.  
> Keep the code understandable.  
> Never let framework optimization become more important than the Web Experience.**

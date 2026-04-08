# Observality

Interactive single-page “observatory” that records React hook–driven runtime events (renders, state updates, reducers, effects, context changes) into a shared trace and visualizes them in a filterable timeline and component-level counters.

<!-- ADD SCREENSHOT OR GIF HERE -->

**Live demo:** _Add your deployed URL here._

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, Geist fonts (`next/font`)
- Zustand (in-memory runtime event store)
- Vercel Analytics (`@vercel/analytics`)
- ESLint (`eslint-config-next`)
- D3 and `@xyflow/react` are listed in devDependencies for future charts/graphs (not imported in the app yet)

## Key features

- **`withRenderTracker` HOC** — logs a `render` event on each commit via `useEffect`, avoiding store writes during render.
- **Tracked hooks** (`useTrackedState`, `useTrackedReducer`, `useTrackedEffect`, `useTraceTick`) — emit typed events with before/after labels for state transitions, reducer actions, effect runs, and context value changes.
- **Hook Lab** — tabbed demos for `useState`, `useReducer`, `useEffect`, `useContext`, and `React.memo` vs unmemoized children, wired to the instrumentation so you can compare event sequences side by side.
- **Timeline UI** — color-coded rows by event type (`render`, `state`, `reducer`, `effect`, `context`) with relative timing across the trace window.
- **Sidebar filters** — filter by event type and component name; component list shows per-component event counts with emphasis on high-activity components.
- **Trace controls** — live trace on/off, reset trace (new `traceId`, cleared events), JSON export of the full trace (events, filters, controls, span metadata).
- **Metrics bar** — aggregate render count, trace span in milliseconds, and state-change count; the Memo control toggles between `React.memo`-wrapped and unmemoized expensive children in the Hook Lab.

## Getting started

```bash
git clone <repository-url>
cd Observality
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Environment variables:** none — the application does not read `process.env`. There is no `.env.example`. For production you may add a `.env` only if you introduce configurable endpoints or keys later.

**Scripts:** `npm run dev` (development), `npm run build` / `npm run start` (production), `npm run lint` (ESLint).

## Project structure

- **`src/app`** — App Router entry (`layout.tsx`, `page.tsx`), route-level UI (header, sidebar, timeline, graph panel, controls, footer).
- **`src/experiments`** — Hook Lab and other experiment panels that exercise the instrumentation.
- **`src/instrumentation`** — `withRenderTracker` and tracked hook implementations.
- **`src/data`** — Zustand store, event types, filtering helpers, export payload shape.

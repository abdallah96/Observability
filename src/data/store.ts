import { create } from "zustand";

/** One render event: which component rendered and when. */
export type RenderEvent = {
  id: string;
  componentName: string;
  timestamp: number; // Date.now()
};

type ObservatoryStore = {
  traceId: string;
  renderEvents: RenderEvent[];
  addRenderEvent: (componentName: string) => void;
  resetTrace: () => void;
  getTraceForExport: () => { traceId: string; events: RenderEvent[]; totalMs: number };
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export const useObservatoryStore = create<ObservatoryStore>((set, get) => ({
  traceId: makeId(),
  renderEvents: [],

  addRenderEvent(componentName: string) {
    set((state) => ({
      renderEvents: [
        ...state.renderEvents,
        { id: makeId(), componentName, timestamp: Date.now() },
      ],
    }));
  },

  resetTrace() {
    set({ traceId: makeId(), renderEvents: [] });
  },

  getTraceForExport() {
    const { traceId, renderEvents } = get();
    if (renderEvents.length === 0) {
      return { traceId, events: [], totalMs: 0 };
    }
    const times = renderEvents.map((e) => e.timestamp);
    const totalMs = Math.max(...times) - Math.min(...times);
    return { traceId, events: renderEvents, totalMs };
  },
}));

/** Derive render count per component from events. */
export function getRenderCounts(events: RenderEvent[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const e of events) {
    counts[e.componentName] = (counts[e.componentName] ?? 0) + 1;
  }
  return counts;
}

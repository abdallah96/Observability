import { create } from "zustand";

export type EventType = "render" | "state" | "reducer" | "effect" | "context";

export type RuntimeEvent = {
  id: string;
  type: EventType;
  componentName: string;
  label: string;
  timestamp: number;
};

type RuntimeControls = {
  memoization: boolean;
  strictMode: boolean;
  throttling: boolean;
};

type EventFilters = {
  type: EventType | "all";
  component: string | "all";
};

type ObservatoryStore = {
  traceId: string;
  liveTrace: boolean;
  controls: RuntimeControls;
  filters: EventFilters;
  events: RuntimeEvent[];
  addEvent: (event: Omit<RuntimeEvent, "id" | "timestamp">) => void;
  resetTrace: () => void;
  setLiveTrace: (value: boolean) => void;
  setControl: (key: keyof RuntimeControls, value: boolean) => void;
  setFilterType: (value: EventType | "all") => void;
  setFilterComponent: (value: string | "all") => void;
  getTraceForExport: () => {
    traceId: string;
    liveTrace: boolean;
    controls: RuntimeControls;
    filters: EventFilters;
    events: RuntimeEvent[];
    totalMs: number;
  };
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export const useObservatoryStore = create<ObservatoryStore>((set, get) => ({
  traceId: makeId(),
  liveTrace: true,
  controls: {
    memoization: false,
    strictMode: false,
    throttling: false,
  },
  filters: {
    type: "all",
    component: "all",
  },
  events: [],

  addEvent(event) {
    const { liveTrace } = get();
    if (!liveTrace) return;

    set((state) => ({
      events: [...state.events, { ...event, id: makeId(), timestamp: Date.now() }],
    }));
  },

  resetTrace() {
    set({ traceId: makeId(), events: [] });
  },

  setLiveTrace(value) {
    set({ liveTrace: value });
  },

  setControl(key, value) {
    set((state) => ({
      controls: { ...state.controls, [key]: value },
    }));
  },

  setFilterType(value) {
    set((state) => ({ filters: { ...state.filters, type: value } }));
  },

  setFilterComponent(value) {
    set((state) => ({ filters: { ...state.filters, component: value } }));
  },

  getTraceForExport() {
    const { traceId, liveTrace, controls, filters, events } = get();
    if (events.length === 0) {
      return { traceId, liveTrace, controls, filters, events: [], totalMs: 0 };
    }
    const times = events.map((e) => e.timestamp);
    const totalMs = Math.max(...times) - Math.min(...times);
    return { traceId, liveTrace, controls, filters, events, totalMs };
  },
}));

export function getEventCountsByComponent(
  events: RuntimeEvent[],
  filters: EventFilters
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const event of events) {
    if (filters.type !== "all" && event.type !== filters.type) continue;
    if (filters.component !== "all" && event.componentName !== filters.component) {
      continue;
    }
    counts[event.componentName] = (counts[event.componentName] ?? 0) + 1;
  }

  return counts;
}

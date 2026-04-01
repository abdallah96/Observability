"use client";

import { EventType, useObservatoryStore } from "@/data/store";

const eventColor: Record<EventType, string> = {
  render: "bg-amber-500/90 text-slate-950",
  state: "bg-sky-500/90 text-slate-950",
  reducer: "bg-violet-500/90 text-slate-50",
  effect: "bg-emerald-500/90 text-slate-950",
  context: "bg-fuchsia-500/90 text-slate-50",
};

export function RenderTimeline() {
  const events = useObservatoryStore((s) => s.events);
  const filters = useObservatoryStore((s) => s.filters);

  const filtered = events.filter((event) => {
    if (filters.type !== "all" && event.type !== filters.type) return false;
    if (filters.component !== "all" && event.componentName !== filters.component) return false;
    return true;
  });

  const startTime = filtered.length ? Math.min(...filtered.map((e) => e.timestamp)) : 0;
  const endTime = filtered.length ? Math.max(...filtered.map((e) => e.timestamp)) : 0;
  const totalMs = filtered.length > 1 ? endTime - startTime : 0;
  const maxMs = Math.max(totalMs, 1);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="observatory-panel flex flex-1 min-h-0 flex-col overflow-hidden">
        <header className="shrink-0 flex items-center justify-between border-b border-slate-800/70 px-3 py-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Timeline
            </span>
            <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />render
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />state
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />reducer
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />effect
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />context
            </div>
          </div>
          <span className="text-[10px] text-slate-400">
            <span className="font-semibold text-slate-100">{totalMs}ms</span>
          </span>
        </header>

        <div className="flex-1 min-h-0 overflow-auto px-3 py-2 observatory-grid-bg">
          <div className="relative z-10">
            <div className="mb-1.5 flex items-center justify-between text-[9px] text-slate-500">
              <span>0ms</span>
              <span>{Math.round(maxMs * 0.5)}ms</span>
              <span>{totalMs}ms</span>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-900/50 text-lg">
                  ↓
                </div>
                <p className="text-[12px] font-medium text-slate-300">
                  Start in the Hook Lab below
                </p>
                <p className="max-w-[280px] text-[11px] text-slate-500">
                  Pick a hook tab (useState, useReducer, etc.), click a button,
                  then watch this timeline fill with color-coded events showing
                  exactly what React did.
                </p>
              </div>
            ) : (
              <div className="mt-1 flex flex-col gap-0.5">
                {filtered.map((event) => {
                  const offsetMs = event.timestamp - startTime;
                  const leftPercent = maxMs > 0 ? (offsetMs / maxMs) * 100 : 0;
                  return (
                    <div
                      key={event.id}
                      className="flex items-center"
                      style={{ marginLeft: `${Math.min(leftPercent, 70)}%` }}
                    >
                      <div
                        className={`flex h-6 items-center gap-1 rounded px-2 text-[9px] font-medium shadow-sm ${eventColor[event.type]}`}
                      >
                        <span className="font-semibold">{event.type}</span>
                        <span className="opacity-60">|</span>
                        <span className="truncate max-w-[180px]">{event.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderTimeline;

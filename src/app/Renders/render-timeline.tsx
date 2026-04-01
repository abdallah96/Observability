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
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="observatory-panel flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Runtime Timeline
            </span>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-amber-400" />render
              <span className="h-2 w-2 rounded-full bg-sky-400" />state
              <span className="h-2 w-2 rounded-full bg-violet-400" />reducer
              <span className="h-2 w-2 rounded-full bg-emerald-400" />effect
              <span className="h-2 w-2 rounded-full bg-fuchsia-400" />context
            </div>
          </div>
          <span className="text-[11px] text-slate-400">
            <span className="font-semibold text-slate-100">{totalMs}ms</span> Total
          </span>
        </header>

        <div className="relative flex-1 overflow-auto px-4 py-3 observatory-grid-bg">
          <div className="relative z-10 min-h-[200px]">
            <div className="mb-2 flex items-center justify-between text-[10px] text-slate-500">
              <span>0ms</span>
              <span>{Math.round(maxMs * 0.25)}ms</span>
              <span>{Math.round(maxMs * 0.5)}ms</span>
              <span>{Math.round(maxMs * 0.75)}ms</span>
              <span>{totalMs}ms</span>
            </div>

            {filtered.length === 0 ? (
              <p className="mt-4 text-[11px] text-slate-500">
                No events yet. Use the Hook Lab below to trigger actions.
              </p>
            ) : (
              <div className="mt-2 flex flex-col gap-1">
                {filtered.map((event) => {
                  const offsetMs = event.timestamp - startTime;
                  const leftPercent = maxMs > 0 ? (offsetMs / maxMs) * 100 : 0;
                  return (
                    <div
                      key={event.id}
                      className="flex items-center"
                      style={{ marginLeft: `${Math.min(leftPercent, 75)}%` }}
                    >
                      <div
                        className={`flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[10px] font-medium shadow-md ${eventColor[event.type]}`}
                      >
                        <span className="font-semibold">{event.type}</span>
                        <span className="opacity-70">|</span>
                        <span className="truncate max-w-[220px]">{event.label}</span>
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

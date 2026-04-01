"use client";

import { EventType, useObservatoryStore } from "@/data/store";

function countByType(events: Array<{ type: EventType }>) {
  return events.reduce<Record<EventType, number>>(
    (acc, event) => {
      acc[event.type] += 1;
      return acc;
    },
    { render: 0, state: 0, reducer: 0, effect: 0, context: 0 }
  );
}

export function StateAndCacheGraph() {
  const events = useObservatoryStore((s) => s.events);
  const lastEvent = events.length > 0 ? events[events.length - 1] : null;
  const totals = countByType(events);

  return (
    <div className="flex w-[28%] min-w-[260px] flex-col gap-2">
      <div className="observatory-panel flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Event Summary
          </span>
        </header>

        <div className="relative flex-1 px-4 pb-3 pt-4 observatory-grid-bg">
          <div className="relative z-10 space-y-3">
            <div className="observatory-panel-subtle px-3 py-2 text-[11px]">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                Last event
              </p>
              {lastEvent ? (
                <>
                  <p className="text-slate-200">
                    <span className="font-semibold text-sky-300">{lastEvent.componentName}</span>
                    {" "}
                    <span className="text-slate-400">fired a</span>
                    {" "}
                    <span className="font-semibold text-amber-300">{lastEvent.type}</span>
                    {" "}
                    <span className="text-slate-400">event</span>
                  </p>
                  <p className="mt-1 text-slate-300">{lastEvent.label}</p>
                </>
              ) : (
                <p className="text-slate-500">
                  Nothing yet. Click a button in the Hook Lab.
                </p>
              )}
            </div>

            <div className="observatory-panel-subtle px-3 py-2">
              <p className="mb-2 text-[10px] uppercase tracking-wider text-slate-500">
                How to read these counters
              </p>
              <p className="mb-2 text-[11px] text-slate-400">
                Each number shows how many times that type of event fired since the last Reset.
              </p>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-amber-300">render</span>
                  <span className="font-mono text-amber-300">{totals.render}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sky-300">state</span>
                  <span className="font-mono text-sky-300">{totals.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-violet-300">reducer</span>
                  <span className="font-mono text-violet-300">{totals.reducer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-300">effect</span>
                  <span className="font-mono text-emerald-300">{totals.effect}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-fuchsia-300">context</span>
                  <span className="font-mono text-fuchsia-300">{totals.context}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StateAndCacheGraph;

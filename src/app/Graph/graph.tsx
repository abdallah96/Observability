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

const colorMap: Record<EventType, string> = {
  render: "text-amber-300",
  state: "text-sky-300",
  reducer: "text-violet-300",
  effect: "text-emerald-300",
  context: "text-fuchsia-300",
};

export function StateAndCacheGraph() {
  const events = useObservatoryStore((s) => s.events);
  const lastEvent = events.length > 0 ? events[events.length - 1] : null;
  const totals = countByType(events);

  return (
    <div className="flex w-[240px] shrink-0 flex-col">
      <div className="observatory-panel flex flex-1 min-h-0 flex-col overflow-hidden">
        <header className="shrink-0 border-b border-slate-800/70 px-3 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Event Summary
          </span>
        </header>

        <div className="flex-1 overflow-auto px-3 py-2 observatory-grid-bg">
          <div className="relative z-10 space-y-2">
            <div className="observatory-panel-subtle px-2 py-1.5 text-[10px]">
              <p className="uppercase tracking-wider text-slate-500 mb-0.5" style={{ fontSize: "9px" }}>
                Last event
              </p>
              {lastEvent ? (
                <>
                  <p className="text-slate-200">
                    <span className="font-semibold text-sky-300">{lastEvent.componentName}</span>
                    {" · "}
                    <span className="font-semibold text-amber-300">{lastEvent.type}</span>
                  </p>
                  <p className="mt-0.5 text-slate-400 truncate">{lastEvent.label}</p>
                </>
              ) : (
                <p className="text-slate-500">Click a button in Hook Lab.</p>
              )}
            </div>

            <div className="observatory-panel-subtle px-2 py-1.5">
              <p className="mb-1.5 uppercase tracking-wider text-slate-500" style={{ fontSize: "9px" }}>
                Counters
              </p>
              <div className="space-y-1 text-[11px] text-slate-300">
                {(Object.keys(totals) as EventType[]).map((type) => (
                  <div key={type} className="flex justify-between">
                    <span className={colorMap[type]}>{type}</span>
                    <span className={`font-mono ${colorMap[type]}`}>{totals[type]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StateAndCacheGraph;

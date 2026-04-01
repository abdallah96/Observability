"use client";

import { EventType, getEventCountsByComponent, useObservatoryStore } from "@/data/store";

const eventTypes: Array<EventType | "all"> = ["all", "render", "state", "reducer", "effect", "context"];

export function Sidebar() {
  const events = useObservatoryStore((s) => s.events);
  const traceId = useObservatoryStore((s) => s.traceId);
  const filters = useObservatoryStore((s) => s.filters);
  const setFilterType = useObservatoryStore((s) => s.setFilterType);
  const setFilterComponent = useObservatoryStore((s) => s.setFilterComponent);

  const counts = getEventCountsByComponent(events, filters);
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...Object.values(counts), 1);
  const components = [...new Set(events.map((event) => event.componentName))];

  return (
    <div className="flex w-[220px] shrink-0 flex-col">
      <div className="observatory-panel flex flex-1 min-h-0 flex-col overflow-hidden">
        <header className="shrink-0 space-y-2 border-b border-slate-800/70 px-3 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Components
            </span>
            <span className="text-[9px] text-slate-500">{traceId.slice(0, 6)}</span>
          </div>

          <div className="flex gap-1.5">
            <select
              value={filters.type}
              onChange={(e) => setFilterType(e.target.value as EventType | "all")}
              className="w-1/2 rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-200"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={filters.component}
              onChange={(e) => setFilterComponent(e.target.value)}
              className="w-1/2 rounded border border-slate-700 bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-200"
            >
              <option value="all">all</option>
              {components.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-3 py-2">
          {entries.length === 0 ? (
            <div className="mt-2 space-y-1.5 text-[10px] text-slate-500">
              <p>Components will appear here as they render.</p>
              <p className="text-slate-600">Use the Hook Lab to trigger events.</p>
            </div>
          ) : (
            <ul className="space-y-1 text-[11px] font-mono text-slate-300">
              {entries.map(([name, count]) => {
                const isHigh = count >= maxCount && count > 1;
                return (
                  <li
                    key={name}
                    className={`flex items-center justify-between rounded-md px-2 py-0.5 ${
                      isHigh ? "bg-amber-500/10 ring-1 ring-amber-400/60" : "bg-slate-900/60"
                    }`}
                  >
                    <span className={isHigh ? "text-amber-200 font-semibold" : "text-sky-200/90"}>
                      &lt;{name}&gt;
                    </span>
                    <span
                      className={`inline-flex h-4 min-w-[24px] items-center justify-center rounded-full px-1 text-[10px] ${
                        isHigh
                          ? "bg-rose-900/70 font-semibold text-rose-200"
                          : "bg-emerald-900/60 text-emerald-300"
                      }`}
                    >
                      {count}x
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

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
    <div className="flex w-[24%] min-w-[240px] flex-col gap-2">
      <div className="observatory-panel flex flex-1 flex-col overflow-hidden">
        <header className="space-y-2 border-b border-slate-800/70 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Components
            </span>
            <span className="text-[10px] text-slate-500">Trace {traceId.slice(0, 6)}</span>
          </div>

          <div className="flex gap-2">
            <select
              value={filters.type}
              onChange={(e) => setFilterType(e.target.value as EventType | "all")}
              className="w-1/2 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-200"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={filters.component}
              onChange={(e) => setFilterComponent(e.target.value)}
              className="w-1/2 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-200"
            >
              <option value="all">all components</option>
              {components.map((component) => (
                <option key={component} value={component}>
                  {component}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="flex-1 overflow-auto px-4 py-3">
          {entries.length === 0 ? (
            <p className="text-[11px] text-slate-500">No events yet for current filter.</p>
          ) : (
            <ul className="space-y-1.5 text-[12px] font-mono text-slate-300">
              {entries.map(([name, count]) => {
                const isHigh = count >= maxCount && count > 1;
                return (
                  <li
                    key={name}
                    className={`flex items-center justify-between rounded-md px-2 py-1 ${
                      isHigh ? "bg-amber-500/10 ring-1 ring-amber-400/60" : "bg-slate-900/60"
                    }`}
                  >
                    <span className={isHigh ? "text-amber-200 font-semibold" : "text-sky-200/90"}>
                      &lt;{name}&gt;
                    </span>
                    <span
                      className={`inline-flex h-5 min-w-[28px] items-center justify-center rounded-full px-1 text-[11px] ${
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

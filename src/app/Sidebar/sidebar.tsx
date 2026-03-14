"use client";

import { getRenderCounts, useObservatoryStore } from "@/data/store";

export function Sidebar() {
  const renderEvents = useObservatoryStore((s) => s.renderEvents);
  const traceId = useObservatoryStore((s) => s.traceId);
  const counts = getRenderCounts(renderEvents);

  // Sort by count descending so busiest components are on top
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...Object.values(counts), 1);

  return (
    <div className="flex w-[22%] min-w-[220px] flex-col gap-2">
      <div className="observatory-panel flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Component Tree
          </span>
          <span className="text-[10px] text-slate-500">Trace {traceId.slice(0, 6)}</span>
        </header>
        <div className="flex-1 overflow-auto px-4 py-3">
          {entries.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              No renders yet. Use the Lab below to trigger re-renders.
            </p>
          ) : (
            <ul className="space-y-1.5 text-[12px] font-mono text-slate-300">
              {entries.map(([name, count]) => {
                const isHigh = count >= maxCount && count > 3;
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

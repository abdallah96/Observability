"use client";

import { useObservatoryStore } from "@/data/store";

export function StateAndCacheGraph() {
  const renderEvents = useObservatoryStore((s) => s.renderEvents);
  const lastEvent = renderEvents.length > 0 ? renderEvents[renderEvents.length - 1] : null;

  return (
    <div className="flex w-[30%] min-w-[260px] flex-col gap-2">
      <div className="observatory-panel flex flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            State &amp; activity
          </span>
        </header>
        <div className="relative flex-1 px-4 pb-3 pt-4 observatory-grid-bg">
          <div className="relative z-10">
            {/* Live log: last render and event count (useState observatory) */}
            <div className="observatory-panel-subtle px-3 py-2 text-[11px] text-sky-200/90">
              <p>
                <span className="font-semibold text-sky-300">Last render:</span>{" "}
                {lastEvent ? (
                  <span className="font-mono text-amber-200">&lt;{lastEvent.componentName}&gt;</span>
                ) : (
                  <span className="text-slate-500">—</span>
                )}
              </p>
              <p className="mt-1 text-slate-400">
                <span className="font-semibold text-emerald-300">This trace:</span>{" "}
                {renderEvents.length} event{renderEvents.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Placeholder for later: cache / state graph */}
            <div className="mt-3 observatory-panel-subtle px-3 py-2">
              <div className="text-[10px] text-slate-500">
                Cache / state graph (when we add that layer)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StateAndCacheGraph;
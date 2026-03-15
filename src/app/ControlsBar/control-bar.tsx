"use client";

import { useObservatoryStore } from "@/data/store";

export function BottomControlsBar() {
  const renderEvents = useObservatoryStore((s) => s.renderEvents);

  // Total time span of this trace (first event → last event). 0 if no events.
  const renderTimeMs =
    renderEvents.length < 2
      ? 0
      : Math.max(...renderEvents.map((e) => e.timestamp)) -
        Math.min(...renderEvents.map((e) => e.timestamp));

  return (
    <section className="mt-3 flex gap-3">
      <div className="flex flex-1 gap-3">
        <div className="observatory-metric-card flex flex-1 flex-col justify-between px-4 py-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
            TTFB
          </span>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-semibold text-slate-500">—</span>
            <span className="pb-1 text-[11px] text-slate-500">(later)</span>
          </div>
        </div>
        <div className="observatory-metric-card flex flex-1 flex-col justify-between px-4 py-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
            Render Time
          </span>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-semibold text-amber-300">
              {renderTimeMs}
            </span>
            <span className="pb-1 text-[11px] text-slate-400">ms</span>
          </div>
        </div>
        <div className="observatory-metric-card flex flex-1 flex-col justify-between px-4 py-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
            Cache Hit
          </span>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-semibold text-slate-500">—</span>
            <span className="pb-1 text-[11px] text-slate-500">(later)</span>
          </div>
        </div>
      </div>

    <div className="observatory-panel-subtle flex w-[280px] flex-col justify-between px-4 py-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
        Runtime Controls
      </span>
      <div className="mt-3 space-y-2 text-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-slate-200">Memoization</span>
          <div className="observatory-toggle">
            <div className="observatory-toggle-thumb" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Strict Mode</span>
          <div className="observatory-toggle">
            <div className="absolute inset-y-2 left-2 right-[18px] rounded-full bg-slate-600" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Throttling</span>
          <div className="observatory-toggle">
            <div className="absolute inset-y-2 left-1 right-[24px] rounded-full bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
}
export default BottomControlsBar;
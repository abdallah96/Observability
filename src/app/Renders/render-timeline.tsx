"use client";

import { useObservatoryStore } from "@/data/store";

type RenderTimelineProps = {
  isLiveTrace: boolean;
  isResetTrace: boolean;
  isExportJson: boolean;
  isDeployFix: boolean;
};

export function RenderTimeline(props: RenderTimelineProps) {
  const { isLiveTrace } = props;
  const renderEvents = useObservatoryStore((s) => s.renderEvents);

  const startTime = renderEvents.length > 0 ? Math.min(...renderEvents.map((e) => e.timestamp)) : 0;
  const endTime = renderEvents.length > 0 ? Math.max(...renderEvents.map((e) => e.timestamp)) : 0;
  const totalMs = endTime - startTime || 0;
  const maxMs = Math.max(totalMs, 1);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="observatory-panel flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Hydration &amp; Render Timeline
            </span>
            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>Render</span>
              </div>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">
            <span className="font-semibold text-slate-100">{totalMs}ms</span> Total
          </span>
        </header>
        <div className="relative flex-1 overflow-auto px-4 py-3 observatory-grid-bg">
          <div className="relative z-10 min-h-[120px]">
            <div className="mb-2 flex items-center justify-between text-[10px] text-slate-500">
              <span>0ms</span>
              <span>{Math.round(maxMs * 0.25)}ms</span>
              <span>{Math.round(maxMs * 0.5)}ms</span>
              <span>{Math.round(maxMs * 0.75)}ms</span>
              <span>{totalMs}ms</span>
            </div>
            {renderEvents.length === 0 && !isLiveTrace && (
              <p className="mt-4 text-[11px] text-slate-500">
                No events yet. Turn on Live Trace and use the Lab to trigger renders.
              </p>
            )}
            <div className="mt-2 flex flex-col gap-1.5">
              {renderEvents.map((event) => {
                const offsetMs = event.timestamp - startTime;
                const leftPercent = maxMs > 0 ? (offsetMs / maxMs) * 100 : 0;
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-2"
                    style={{ marginLeft: `${Math.min(leftPercent, 85)}%` }}
                  >
                    <div className="h-7 min-w-[100px] rounded-md bg-amber-500/90 px-3 py-1 text-[10px] font-medium text-slate-950 shadow-md">
                      {event.componentName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderTimeline;

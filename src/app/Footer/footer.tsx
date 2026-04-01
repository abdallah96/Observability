"use client";

import { useObservatoryStore } from "@/data/store";

export default function Footer() {
  const traceId = useObservatoryStore((s) => s.traceId);
  const liveTrace = useObservatoryStore((s) => s.liveTrace);
  const eventsCount = useObservatoryStore((s) => s.events.length);

  return (
    <footer className="mt-3 flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/80 px-4 py-2 text-[10px] text-slate-500">
      <div className="flex items-center gap-2">
        <span className="text-slate-400">OBSERVATORY</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-300">hooks_runtime_lab</span>
        <span className="text-slate-600">/</span>
        <span className="text-sky-300">trace_id: {traceId}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className={`h-2 w-2 rounded-full ${liveTrace ? "bg-emerald-400" : "bg-slate-600"}`} />
          <span>{liveTrace ? "Tracing" : "Paused"}</span>
        </div>
        <span className="text-slate-400">{eventsCount} events</span>
      </div>
    </footer>
  );
}

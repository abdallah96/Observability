"use client";

import { useObservatoryStore } from "@/data/store";

export default function Footer() {
  const traceId = useObservatoryStore((s) => s.traceId);

  return (
    <footer className="mt-3 flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/80 px-4 py-2 text-[10px] text-slate-500">
      <div className="flex items-center gap-2">
        <span className="text-slate-400">OBSERVATORY</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-300">render_tracking</span>
        <span className="text-slate-600">/</span>
        <span className="text-sky-300">trace_id: {traceId}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>Connected</span>
        </div>
      </div>
    </footer>
  );
}

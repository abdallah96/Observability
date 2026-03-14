"use client";

import { Button } from "../Components/Button/button";
import { ActiveAction } from "../page";
import { useObservatoryStore } from "@/data/store";

type HeaderProps = {
  activeAction: ActiveAction;
  onChangeActiveAction: (action: ActiveAction) => void;
};

export function Header({ activeAction, onChangeActiveAction }: HeaderProps) {
  const resetTrace = useObservatoryStore((s) => s.resetTrace);
  const getTraceForExport = useObservatoryStore((s) => s.getTraceForExport);

  const isLiveTraceActive = activeAction === "liveTrace";
  const isResetTraceActive = activeAction === "resetTrace";
  const isExportJsonActive = activeAction === "exportJson";
  const isDeployFixActive = activeAction === "deployFix";

  const handleReset = () => {
    resetTrace();
    onChangeActiveAction(null);
  };

  const handleExport = () => {
    const data = getTraceForExport();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `observatory-trace-${data.traceId}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onChangeActiveAction(null);
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/90 shadow-lg shadow-sky-500/40">
          <span className="text-xs font-semibold tracking-tight text-slate-950">
            OB
          </span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Observatory
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
          Experiment
        </span>
        <span className="text-xs font-semibold text-slate-100">
          Render tracking
        </span>
      </div>

      <div className="flex items-center gap-3 text-[11px]">
        <Button
          onClick={() => onChangeActiveAction("liveTrace")}
          className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-50 shadow-md shadow-rose-500/40"
          isActive={isLiveTraceActive}
        >
          <span className="h-2 w-2 rounded-full bg-rose-300 shadow-[0_0_8px_rgba(248,113,113,0.9)]" />
          Live Trace
        </Button>
        <Button
          onClick={handleReset}
          className="observatory-chip px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300 hover:text-slate-50"
          isActive={isResetTraceActive}
        >
          Reset Trace
        </Button>
        <Button
          onClick={handleExport}
          className="observatory-chip px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300 hover:text-slate-50"
          isActive={isExportJsonActive}
        >
          Export JSON
        </Button>
        <Button
          onClick={() => onChangeActiveAction("deployFix")}
          className="observatory-pill-accent px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-lg shadow-sky-500/40"
          isActive={isDeployFixActive}
        >
          Deploy Fix
        </Button>
      </div>
    </header>
  );
}
export default Header;

import RenderBlock from "./render-block";

type RenderTimelineProps = {
  isLiveTrace: boolean;
  isResetTrace: boolean;
  isExportJson: boolean;
  isDeployFix: boolean;
};
export const RenderTimeline = (props: RenderTimelineProps) => {
  const { isLiveTrace, isResetTrace } = props;
  return (
    <div className="flex w-[48%] flex-col gap-2">
      <div className="observatory-panel flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Hydration &amp; Render Timeline
            </span>
            <div className="flex items-center gap-3 text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span>Render</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>State</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                <span>Data</span>
              </div>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">
            <span className="font-semibold text-slate-100">248ms</span> Total
          </span>
        </header>
        <div className="relative flex-1 overflow-hidden px-4 py-3 observatory-grid-bg">
          <div className="relative z-10 h-full">
            {/* Time axis */}
            <div className="mb-2 flex items-center justify-between text-[10px] text-slate-500">
              <span>0ms</span>
              <span>50ms</span>
              <span>100ms</span>
              <span>150ms</span>
              <span>200ms</span>
            </div>
            {isLiveTrace && <RenderBlock />}
            {isResetTrace && !isLiveTrace && <span>Reset Trace</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RenderTimeline;

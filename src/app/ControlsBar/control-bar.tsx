"use client";

import { useObservatoryStore } from "@/data/store";

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      className="observatory-toggle"
      onClick={() => onChange(!value)}
      aria-pressed={value}
    >
      <div
        className={`absolute top-[2px] h-[18px] w-[18px] rounded-full transition-all ${
          value
            ? "left-[24px] bg-gradient-to-br from-sky-300 to-emerald-300"
            : "left-[2px] bg-slate-600"
        }`}
      />
    </button>
  );
}

export function BottomControlsBar() {
  const events = useObservatoryStore((s) => s.events);
  const controls = useObservatoryStore((s) => s.controls);
  const setControl = useObservatoryStore((s) => s.setControl);

  const renderTimeMs =
    events.length < 2
      ? 0
      : Math.max(...events.map((e) => e.timestamp)) - Math.min(...events.map((e) => e.timestamp));
  const totalRenders = events.filter((e) => e.type === "render").length;
  const totalStateChanges = events.filter((e) => e.type === "state").length;

  return (
    <section className="mt-2 flex items-stretch gap-2">
      <div className="flex flex-1 gap-2">
        <div className="observatory-metric-card flex flex-1 items-center justify-between px-3 py-2">
          <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-400">
            Renders
          </span>
          <span className="text-lg font-semibold text-amber-300">{totalRenders}</span>
        </div>
        <div className="observatory-metric-card flex flex-1 items-center justify-between px-3 py-2">
          <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-400">
            Trace span
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-semibold text-amber-300">{renderTimeMs}</span>
            <span className="text-[9px] text-slate-400">ms</span>
          </div>
        </div>
        <div className="observatory-metric-card flex flex-1 items-center justify-between px-3 py-2">
          <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-400">
            State changes
          </span>
          <span className="text-lg font-semibold text-sky-300">{totalStateChanges}</span>
        </div>
      </div>

      <div className="observatory-panel-subtle flex items-center gap-4 px-3 py-2">
        <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-400">
          Controls
        </span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className={controls.memoization ? "text-slate-200" : "text-slate-500"}>
            Memo
          </span>
          <Toggle
            value={controls.memoization}
            onChange={(v) => setControl("memoization", v)}
          />
        </div>
      </div>
    </section>
  );
}

export default BottomControlsBar;

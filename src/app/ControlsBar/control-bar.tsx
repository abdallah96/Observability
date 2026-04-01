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
  const totalStateTransitions = events.filter((e) => e.type === "state").length;

  return (
    <section className="mt-3 flex gap-3">
      <div className="flex flex-1 gap-3">
        <div className="observatory-metric-card flex flex-1 flex-col justify-between px-4 py-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
            Render Events
          </span>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-semibold text-amber-300">{totalRenders}</span>
            <span className="pb-1 text-[11px] text-slate-400">count</span>
          </div>
        </div>
        <div className="observatory-metric-card flex flex-1 flex-col justify-between px-4 py-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
            Render Time
          </span>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-semibold text-amber-300">{renderTimeMs}</span>
            <span className="pb-1 text-[11px] text-slate-400">ms</span>
          </div>
        </div>
        <div className="observatory-metric-card flex flex-1 flex-col justify-between px-4 py-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
            State Transitions
          </span>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-2xl font-semibold text-sky-300">{totalStateTransitions}</span>
            <span className="pb-1 text-[11px] text-slate-400">count</span>
          </div>
        </div>
      </div>

      <div className="observatory-panel-subtle flex w-[300px] flex-col justify-between px-4 py-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
          Runtime Controls
        </span>
        <div className="mt-3 space-y-2 text-[11px]">
          <div className="flex items-center justify-between">
            <span className={controls.memoization ? "text-slate-200" : "text-slate-400"}>
              Memoization
            </span>
            <Toggle
              value={controls.memoization}
              onChange={(value) => setControl("memoization", value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className={controls.strictMode ? "text-slate-200" : "text-slate-400"}>
              Strict Mode (label only)
            </span>
            <Toggle value={controls.strictMode} onChange={(value) => setControl("strictMode", value)} />
          </div>
          <div className="flex items-center justify-between">
            <span className={controls.throttling ? "text-slate-200" : "text-slate-400"}>
              Throttling (label only)
            </span>
            <Toggle value={controls.throttling} onChange={(value) => setControl("throttling", value)} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BottomControlsBar;

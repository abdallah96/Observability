"use client";

import { Counter } from "./Counter";
import { Display } from "./Display";
import { useState } from "react";

/**
 * Small lab on the page: tracked Counter + Display.
 * Click the button and watch the sidebar (render counts) and timeline (events) update.
 */
export function LabPanel() {
  const [value, setValue] = useState(0);
  return (
    <div className="observatory-panel-subtle rounded-lg border border-slate-700/60 px-4 py-3">
      <p className="mb-3 text-[11px] text-slate-400">
        Lab: click below to trigger re-renders. Watch the Component Tree and
        Timeline.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Counter />
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <span>Display value:</span>
          <Display value={value} />
          <button
            type="button"
            onClick={() => setValue((v) => v + 1)}
            className="rounded bg-slate-600 px-2 py-1 text-xs hover:bg-slate-500"
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
}

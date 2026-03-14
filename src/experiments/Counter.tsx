"use client";

import { withRenderTracker } from "@/instrumentation/withRenderTracker";
import { useState } from "react";

function CounterInner() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-slate-300">Count: {count}</span>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded bg-sky-600 px-3 py-1.5 text-sm text-white hover:bg-sky-500"
      >
        +1
      </button>
    </div>
  );
}

/** Tracked counter: each click causes a re-render; observatory shows it. */
export const Counter = withRenderTracker(CounterInner, "Counter");
Counter.displayName = "Counter";

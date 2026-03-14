"use client";

import { withRenderTracker } from "@/instrumentation/withRenderTracker";

function DisplayInner({ value }: { value: number }) {
  return <span className="text-amber-300 font-mono">{value}</span>;
}

/** Tracked display: re-renders when parent passes new value. */
export const Display = withRenderTracker(DisplayInner, "Display");
Display.displayName = "Display";

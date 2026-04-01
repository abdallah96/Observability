"use client";

import { useObservatoryStore } from "@/data/store";
import { ComponentType, useEffect } from "react";

/**
 * Wrap a component to log a "render" event after each commit.
 * This keeps tracking predictable and avoids store writes during render.
 */
export function withRenderTracker<P extends object>(
  WrappedComponent: ComponentType<P>,
  componentName: string
) {
  function TrackedComponent(props: P) {
    const addEvent = useObservatoryStore((s) => s.addEvent);

    useEffect(() => {
      addEvent({
        type: "render",
        componentName,
        label: "component render",
      });
    });

    return <WrappedComponent {...props} />;
  }

  TrackedComponent.displayName = `Tracked(${componentName})`;
  return TrackedComponent;
}

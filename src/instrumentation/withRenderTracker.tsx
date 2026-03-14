"use client";

import { useObservatoryStore } from "@/data/store";
import { ComponentType } from "react";

/**
 * Wraps a component so each render is logged to the observatory store.
 * Use this on experiment components to see when they re-render in the timeline and sidebar.
 */
export function withRenderTracker<P extends object>(
  WrappedComponent: ComponentType<P>,
  displayName: string
) {
  function TrackedComponent(props: P) {
    const addRenderEvent = useObservatoryStore((s) => s.addRenderEvent);
    addRenderEvent(displayName); // Log every time this component renders

    return <WrappedComponent {...props} />;
  }

  TrackedComponent.displayName = `Tracked(${displayName})`;
  return TrackedComponent;
}

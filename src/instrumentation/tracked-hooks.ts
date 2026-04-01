"use client";

import { useObservatoryStore } from "@/data/store";
import { DependencyList, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

function shortValue(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function useTrackedState<T>(
  componentName: string,
  stateName: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);
  const addEvent = useObservatoryStore((s) => s.addEvent);

  const trackedSetState: Dispatch<SetStateAction<T>> = (next) => {
    setState((prev) => {
      const resolved = typeof next === "function" ? (next as (v: T) => T)(prev) : next;
      addEvent({
        type: "state",
        componentName,
        label: `${stateName}: ${shortValue(prev)} -> ${shortValue(resolved)}`,
      });
      return resolved;
    });
  };

  return [state, trackedSetState];
}

export function useTrackedReducer<TState, TAction>(
  componentName: string,
  reducerName: string,
  reducer: (state: TState, action: TAction) => TState,
  initialState: TState
): [TState, Dispatch<TAction>] {
  const [state, setState] = useState(initialState);
  const addEvent = useObservatoryStore((s) => s.addEvent);

  const dispatch: Dispatch<TAction> = (action) => {
    setState((prev) => {
      const next = reducer(prev, action);
      addEvent({
        type: "reducer",
        componentName,
        label: `${reducerName}: ${shortValue(action)} | ${shortValue(prev)} -> ${shortValue(next)}`,
      });
      return next;
    });
  };

  return [state, dispatch];
}

export function useTrackedEffect(
  componentName: string,
  label: string,
  deps: DependencyList,
  effect: () => void
) {
  const addEvent = useObservatoryStore((s) => s.addEvent);

  useEffect(() => {
    addEvent({
      type: "effect",
      componentName,
      label,
    });
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useTraceTick(componentName: string, label: string, value: unknown) {
  const addEvent = useObservatoryStore((s) => s.addEvent);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      addEvent({
        type: "context",
        componentName,
        label: `${label}: ${shortValue(prev.current)} -> ${shortValue(value)}`,
      });
      prev.current = value;
    }
  }, [addEvent, componentName, label, value]);
}

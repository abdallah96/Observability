"use client";

import { useObservatoryStore } from "@/data/store";
import {
  useTraceTick,
  useTrackedEffect,
  useTrackedReducer,
  useTrackedState,
} from "@/instrumentation/tracked-hooks";
import { withRenderTracker } from "@/instrumentation/withRenderTracker";
import { createContext, memo, useContext, useMemo, useState } from "react";

const btn =
  "rounded bg-sky-700 px-3 py-1.5 text-xs text-white hover:bg-sky-600 transition-colors";

function SectionHeader({
  hook,
  title,
  description,
  watch,
}: {
  hook: string;
  title: string;
  description: string;
  watch: string;
}) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2">
        <span className="rounded bg-sky-900/80 px-1.5 py-0.5 text-[10px] font-semibold text-sky-300">
          {hook}
        </span>
        <span className="text-[12px] font-semibold text-slate-200">{title}</span>
      </div>
      <p className="mt-1 text-[11px] text-slate-400">{description}</p>
      <p className="mt-0.5 text-[11px] text-emerald-400/80">
        Watch: {watch}
      </p>
    </div>
  );
}

function CounterStateInner() {
  const [count, setCount] = useTrackedState("CounterState", "count", 0);
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-slate-200">count = {count}</span>
      <button type="button" onClick={() => setCount((v) => v + 1)} className={btn}>
        +1
      </button>
      <button type="button" onClick={() => setCount((v) => v - 1)} className={btn}>
        -1
      </button>
    </div>
  );
}
const CounterState = withRenderTracker(CounterStateInner, "CounterState");

type ReducerAction = "inc" | "dec" | "reset";
function counterReducer(state: number, action: ReducerAction) {
  if (action === "inc") return state + 1;
  if (action === "dec") return state - 1;
  return 0;
}

function ReducerInner() {
  const [count, dispatch] = useTrackedReducer<number, ReducerAction>(
    "ReducerCounter",
    "counterReducer",
    counterReducer,
    0
  );
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-slate-200">reducer = {count}</span>
      <button type="button" onClick={() => dispatch("inc")} className={btn}>
        dispatch &quot;inc&quot;
      </button>
      <button type="button" onClick={() => dispatch("reset")} className={btn}>
        dispatch &quot;reset&quot;
      </button>
    </div>
  );
}
const ReducerCounter = withRenderTracker(ReducerInner, "ReducerCounter");

function EffectInner() {
  const [query, setQuery] = useTrackedState("EffectDemo", "query", "");
  const [result, setResult] = useState("idle");

  useTrackedEffect("EffectDemo", "query effect ran", [query], () => {
    setResult(query.trim() === "" ? "idle" : `synced: "${query}"`);
  });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="type here..."
        className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-sky-500"
      />
      <span className="font-mono text-slate-200">{result}</span>
    </div>
  );
}
const EffectDemo = withRenderTracker(EffectInner, "EffectDemo");

const ThemeContext = createContext<"light" | "dark">("light");

function ThemeReaderInner() {
  const theme = useContext(ThemeContext);
  useTraceTick("ThemeReader", "theme", theme);
  return <span className="font-mono text-slate-200">theme = &quot;{theme}&quot;</span>;
}
const ThemeReader = withRenderTracker(ThemeReaderInner, "ThemeReader");

function ExpensiveListInner({ value }: { value: number }) {
  let total = 0;
  for (let i = 0; i < 25000; i += 1) total += (i * value) % 7;
  return <span className="font-mono text-slate-200">expensive = {total}</span>;
}
const ExpensiveList = withRenderTracker(ExpensiveListInner, "ExpensiveList");
const MemoExpensiveList = memo(ExpensiveList);

function MemoInner() {
  const memoization = useObservatoryStore((s) => s.controls.memoization);
  const [value, setValue] = useTrackedState("MemoDemo", "value", 1);
  const [unrelated, setUnrelated] = useTrackedState("MemoDemo", "unrelated", 0);
  const label = useMemo(() => (memoization ? "ON" : "OFF"), [memoization]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-slate-200">memo: {label}</span>
        <span className="font-mono text-slate-400">unrelated = {unrelated}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={btn} onClick={() => setValue((v) => v + 1)}>
          change value (prop to child)
        </button>
        <button type="button" className={btn} onClick={() => setUnrelated((v) => v + 1)}>
          unrelated state change
        </button>
      </div>
      {memoization ? <MemoExpensiveList value={value} /> : <ExpensiveList value={value} />}
    </div>
  );
}
const MemoDemo = withRenderTracker(MemoInner, "MemoDemo");

export function LabPanel() {
  const [theme, setTheme] = useTrackedState<"light" | "dark">("ThemeProvider", "theme", "light");

  return (
    <div className="observatory-panel-subtle rounded-lg border border-slate-700/60 px-4 py-4 space-y-5">
      <div>
        <p className="text-[13px] font-semibold text-slate-100">Hook Lab</p>
        <p className="mt-1 text-[11px] text-slate-400">
          Each section below uses a different React hook. Click the buttons, then look at the
          Timeline (colored blocks), Components panel (render counts), and Event Summary (counters)
          to see exactly what React did.
        </p>
      </div>

      <div className="border-t border-slate-800/60 pt-4">
        <SectionHeader
          hook="useState"
          title="Counter with local state"
          description="Clicking +1 or -1 calls setState. This causes CounterState to re-render."
          watch="Timeline shows a blue 'state' block (the setState call) and an amber 'render' block (the re-render it caused)."
        />
        <CounterState />
      </div>

      <div className="border-t border-slate-800/60 pt-4">
        <SectionHeader
          hook="useReducer"
          title="Counter with reducer"
          description='dispatch("inc") sends an action to the reducer function. The reducer computes the next state. The component re-renders with the new value.'
          watch='Timeline shows a purple "reducer" block with the action and state transition, then an amber "render" block.'
        />
        <ReducerCounter />
      </div>

      <div className="border-t border-slate-800/60 pt-4">
        <SectionHeader
          hook="useEffect"
          title="Effect triggered by dependency"
          description="Typing in the input updates state (query). The effect depends on [query], so it runs after every render where query changed."
          watch='Timeline shows: blue "state" (query changed) -> amber "render" (re-render) -> green "effect" (effect ran). Three events per keystroke.'
        />
        <EffectDemo />
      </div>

      <div className="border-t border-slate-800/60 pt-4">
        <SectionHeader
          hook="useContext"
          title="Context provider and consumer"
          description='Toggling the theme updates the context value. ThemeReader consumes it via useContext and re-renders when it changes.'
          watch='Timeline shows: blue "state" (theme changed in provider) -> pink "context" (ThemeReader detected the change) -> amber "render" (ThemeReader re-rendered).'
        />
        <ThemeContext.Provider value={theme}>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={btn}
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            >
              toggle theme
            </button>
            <ThemeReader />
          </div>
        </ThemeContext.Provider>
      </div>

      <div className="border-t border-slate-800/60 pt-4">
        <SectionHeader
          hook="useMemo + React.memo"
          title="Memoization experiment"
          description={
            'ExpensiveList does heavy work. With memoization OFF, it re-renders even when only "unrelated" state changes. ' +
            "With memoization ON (toggle in Runtime Controls below), React.memo skips the re-render if its props didn't change."
          }
          watch='Click "unrelated state change" with memo OFF: ExpensiveList renders. Toggle Memoization ON, click again: ExpensiveList does NOT render. Compare render counts in the Components panel.'
        />
        <MemoDemo />
      </div>
    </div>
  );
}

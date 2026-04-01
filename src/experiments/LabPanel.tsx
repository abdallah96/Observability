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

const tabs = [
  { id: "state", label: "useState" },
  { id: "reducer", label: "useReducer" },
  { id: "effect", label: "useEffect" },
  { id: "context", label: "useContext" },
  { id: "memo", label: "useMemo" },
] as const;

type TabId = (typeof tabs)[number]["id"];

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

const experimentInfo: Record<TabId, { description: string; watch: string }> = {
  state: {
    description:
      "Clicking +1 or -1 calls setState. This causes CounterState to re-render.",
    watch:
      'Timeline: blue "state" block (setState call) then amber "render" block (re-render).',
  },
  reducer: {
    description:
      'dispatch("inc") sends an action to the reducer. The reducer computes next state. Component re-renders.',
    watch:
      'Timeline: purple "reducer" block (dispatch + transition) then amber "render" block.',
  },
  effect: {
    description:
      "Typing updates state (query). The effect depends on [query], so it runs after every render where query changed.",
    watch:
      'Timeline per keystroke: blue "state" -> amber "render" -> green "effect". Three events.',
  },
  context: {
    description:
      "Toggling theme updates the context value. ThemeReader consumes it via useContext and re-renders.",
    watch:
      'Timeline: blue "state" -> pink "context" (detected change) -> amber "render".',
  },
  memo: {
    description:
      'ExpensiveList does heavy work. With memo OFF it re-renders on any parent state change. With memo ON (toggle in Runtime Controls) React.memo skips it if props didn\'t change.',
    watch:
      'Click "unrelated state change" with memo OFF vs ON. Compare ExpensiveList render counts in Components panel.',
  },
};

function ContextExperiment() {
  const [theme, setTheme] = useTrackedState<"light" | "dark">(
    "ThemeProvider",
    "theme",
    "light"
  );

  return (
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
  );
}

export function LabPanel() {
  const [activeTab, setActiveTab] = useState<TabId>("state");
  const info = experimentInfo[activeTab];

  return (
    <div className="observatory-panel-subtle shrink-0 rounded-lg border border-slate-700/60">
      <div className="flex items-center gap-1 border-b border-slate-800/60 px-3 pt-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-t px-3 py-1.5 text-[11px] font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-sky-900/60 text-sky-300 border-b-2 border-sky-400"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-slate-500">Hook Lab</span>
      </div>

      <div className="px-4 py-3 space-y-2">
        <p className="text-[11px] text-slate-400">{info.description}</p>
        <p className="text-[11px] text-emerald-400/80">Watch: {info.watch}</p>

        <div className="pt-1">
          {activeTab === "state" && <CounterState />}
          {activeTab === "reducer" && <ReducerCounter />}
          {activeTab === "effect" && <EffectDemo />}
          {activeTab === "context" && <ContextExperiment />}
          {activeTab === "memo" && <MemoDemo />}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="observatory-shell">
      {/* Top navigation / experiment bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/90 shadow-lg shadow-sky-500/40">
            <span className="text-xs font-semibold tracking-tight text-slate-950">
              NX
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Nexus Observatory
            </span>
            <span className="text-[11px] text-slate-500">v0.1.0 · canary</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
            Experiment
          </span>
          <span className="text-xs font-semibold text-slate-100">
            Hydration Optimization
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <button className="flex items-center gap-2 px-3 py-1.5 observatory-pill-danger text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-50 shadow-md shadow-rose-500/40">
            <span className="h-2 w-2 rounded-full bg-rose-300 shadow-[0_0_8px_rgba(248,113,113,0.9)]" />
            Live Trace
          </button>
          <button className="observatory-chip px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300 hover:text-slate-50">
            Reset Trace
          </button>
          <button className="observatory-chip px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300 hover:text-slate-50">
            Export JSON
          </button>
          <button className="observatory-pill-accent px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-lg shadow-sky-500/40">
            Deploy Fix
          </button>
        </div>
      </header>

      {/* Main layout */}
      <main className="flex flex-1 flex-col px-4 pb-4 pt-3 text-xs text-slate-200">
        <section className="flex flex-1 gap-3">
          {/* Left: Component tree */}
          <div className="flex w-[22%] min-w-[220px] flex-col gap-2">
            <div className="observatory-panel flex flex-1 flex-col overflow-hidden">
              <header className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Component Tree
                </span>
                <span className="text-[10px] text-slate-500">Trace #01</span>
              </header>
              <div className="flex-1 overflow-auto px-4 py-3">
                <ul className="space-y-1.5 text-[12px] font-mono text-slate-300">
                  <li className="flex items-center justify-between rounded-md bg-slate-900/60 px-2 py-1">
                    <span className="text-sky-300">&lt;Root&gt;</span>
                    <span className="inline-flex h-5 min-w-[28px] items-center justify-center rounded-full bg-emerald-900/60 px-1 text-[11px] text-emerald-300">
                      1x
                    </span>
                  </li>
                  <li className="ml-3 flex items-center justify-between rounded-md px-2 py-1 text-slate-400">
                    <span className="text-sky-200/90">&lt;Layout&gt;</span>
                    <span className="inline-flex h-5 min-w-[28px] items-center justify-center rounded-full bg-emerald-900/40 px-1 text-[11px] text-emerald-300/80">
                      1x
                    </span>
                  </li>
                  <li className="ml-6 flex items-center justify-between rounded-md px-2 py-1 text-slate-400">
                    <span className="text-slate-300">&lt;Navbar&gt;</span>
                    <span className="inline-flex h-5 min-w-[28px] items-center justify-center rounded-full bg-emerald-900/40 px-1 text-[11px] text-emerald-300/90">
                      3x
                    </span>
                  </li>
                  <li className="ml-6 flex items-center justify-between rounded-md bg-amber-500/10 px-2 py-1 text-amber-100 ring-1 ring-amber-400/60">
                    <span className="text-amber-200 font-semibold">
                      &lt;ProductList&gt;
                    </span>
                    <span className="inline-flex h-5 min-w-[32px] items-center justify-center rounded-full bg-rose-900/70 px-1 text-[11px] font-semibold text-rose-200 shadow-[0_0_10px_rgba(248,113,113,0.7)]">
                      42x
                    </span>
                  </li>
                  <li className="ml-9 flex items-center justify-between rounded-md px-2 py-1 text-slate-400">
                    <span>&lt;Card&gt;</span>
                    <span className="inline-flex h-5 min-w-[28px] items-center justify-center rounded-full bg-emerald-900/40 px-1 text-[11px] text-emerald-300/80">
                      1x
                    </span>
                  </li>
                  <li className="ml-9 flex items-center justify-between rounded-md px-2 py-1 text-slate-400">
                    <span>&lt;Card&gt;</span>
                    <span className="inline-flex h-5 min-w-[28px] items-center justify-center rounded-full bg-emerald-900/40 px-1 text-[11px] text-emerald-300/80">
                      1x
                    </span>
                  </li>
                  <li className="ml-6 flex items-center justify-between rounded-md px-2 py-1 text-slate-400">
                    <span>&lt;Footer&gt;</span>
                    <span className="inline-flex h-5 min-w-[28px] items-center justify-center rounded-full bg-emerald-900/40 px-1 text-[11px] text-emerald-300/80">
                      1x
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Center: Hydration & render timeline */}
          <div className="flex w-[48%] flex-col gap-2">
            <div className="observatory-panel flex flex-1 flex-col overflow-hidden">
              <header className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Hydration &amp; Render Timeline
                  </span>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-sky-400" />
                      <span>Render</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span>State</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                      <span>Data</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-100">248ms</span>{" "}
                  Total
                </span>
              </header>
              <div className="relative flex-1 overflow-hidden px-4 py-3 observatory-grid-bg">
                <div className="relative z-10 h-full">
                  {/* Time axis */}
                  <div className="mb-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span>0ms</span>
                    <span>50ms</span>
                    <span>100ms</span>
                    <span>150ms</span>
                    <span>200ms</span>
                  </div>

                  {/* Example event blocks */}
                  <div className="mt-4 space-y-3 text-[11px]">
                    <div className="flex gap-2">
                      <div className="h-7 min-w-[90px] rounded-md bg-violet-500/80 px-3 py-1 text-[10px] font-medium text-slate-50 shadow-lg shadow-violet-500/40">
                        getServerSideProps
                      </div>
                      <div className="h-7 min-w-[110px] rounded-md bg-amber-400/90 px-3 py-1 text-[10px] font-medium text-slate-950 shadow-lg shadow-amber-400/40">
                        Hydration
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-7 min-w-[190px] rounded-md bg-amber-500/90 px-3 py-1 text-[10px] font-semibold text-slate-950 shadow-lg shadow-amber-500/50">
                        ProductList: Massive Re-render
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="ml-[120px] h-7 min-w-[90px] rounded-md bg-fuchsia-500/80 px-3 py-1 text-[10px] font-medium text-slate-50 shadow-lg shadow-fuchsia-500/40">
                        fetch(/api/products)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: State & cache graph */}
          <div className="flex w-[30%] min-w-[260px] flex-col gap-2">
            <div className="observatory-panel flex flex-col overflow-hidden">
              <header className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  State &amp; Cache Graph
                </span>
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="h-6 w-6 rounded-full bg-slate-900/80 flex items-center justify-center text-[13px]">
                    ?
                  </span>
                  <span className="h-6 w-6 rounded-full bg-slate-900/80 flex items-center justify-center text-[13px]">
                    ⌕
                  </span>
                </div>
              </header>
              <div className="relative flex-1 px-4 pb-3 pt-4 observatory-grid-bg">
                <div className="relative z-10 h-full">
                  <div className="relative mx-auto mt-2 h-40 w-full max-w-[220px]">
                    {/* Center node */}
                    <div className="absolute inset-x-10 top-1/2 -translate-y-1/2">
                      <div className="mx-auto flex h-10 w-28 items-center justify-center rounded-xl bg-sky-500/90 text-[11px] font-semibold text-slate-950 shadow-lg shadow-sky-500/40">
                        PRODUCTVIEW
                      </div>
                    </div>
                    {/* Top nodes */}
                    <div className="absolute -top-1 left-1/2 flex -translate-x-1/2 gap-12">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/90 text-[13px]">
                          🧍
                        </div>
                        <span className="text-[10px] text-slate-400">
                          USERAUTH
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/90 text-[13px]">
                          🛒
                        </div>
                        <span className="text-[10px] text-slate-400">
                          CARTACTION
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event log */}
                  <div className="mt-4 observatory-panel-subtle px-3 py-2 text-[11px] text-sky-200/90">
                    <p>
                      <span className="font-semibold text-sky-300">Active:</span>{" "}
                      userAuth.session_token changed.
                    </p>
                    <p className="mt-1 text-slate-400">
                      <span className="font-semibold text-emerald-300">
                        Triggered:
                      </span>{" "}
                      3 component updates.
                    </p>
                  </div>

                  {/* Cache map */}
                  <div className="mt-3 observatory-panel-subtle px-3 py-2">
                    <div className="mb-2 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Cache Status Map</span>
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />{" "}
                        <span className="text-[10px]">Hit</span>
                        <span className="ml-2 h-2 w-2 rounded-full bg-slate-700" />{" "}
                        <span className="text-[10px]">Miss</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-8 gap-1">
                      {Array.from({ length: 40 }).map((_, index) => (
                        <div
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          className={`h-3 w-3 rounded-[3px] ${
                            index % 3 === 0 || index % 5 === 0
                              ? "bg-emerald-400/90"
                              : "bg-slate-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom metrics & controls bar */}
        <section className="mt-3 flex gap-3">
          <div className="flex flex-1 gap-3">
            <div className="observatory-metric-card flex flex-1 flex-col justify-between px-4 py-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                TTFB
              </span>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-semibold text-sky-300">120</span>
                <span className="pb-1 text-[11px] text-slate-400">ms</span>
              </div>
            </div>
            <div className="observatory-metric-card flex flex-1 flex-col justify-between px-4 py-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                Render Time
              </span>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-semibold text-amber-300">14</span>
                <span className="pb-1 text-[11px] text-slate-400">ms</span>
              </div>
            </div>
            <div className="observatory-metric-card flex flex-1 flex-col justify-between px-4 py-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                Cache Hit
              </span>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-2xl font-semibold text-emerald-300">
                  89
                </span>
                <span className="pb-1 text-[11px] text-slate-400">%</span>
              </div>
            </div>
          </div>

          <div className="observatory-panel-subtle flex w-[280px] flex-col justify-between px-4 py-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
              Runtime Controls
            </span>
            <div className="mt-3 space-y-2 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-200">Memoization</span>
                <div className="observatory-toggle">
                  <div className="observatory-toggle-thumb" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Strict Mode</span>
                <div className="observatory-toggle">
                  <div className="absolute inset-y-2 left-2 right-[18px] rounded-full bg-slate-600" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Throttling</span>
                <div className="observatory-toggle">
                  <div className="absolute inset-y-2 left-1 right-[24px] rounded-full bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer status bar */}
        <footer className="mt-3 flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/80 px-4 py-2 text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">NEXUS_RUNTIME</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">hydration_optimization_v2</span>
            <span className="text-slate-600">/</span>
            <span className="text-sky-300">
              trace_id: 8f92-a12b-77c1
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Connected</span>
            </div>
            <span className="text-slate-600">CPU: 4x</span>
            <span className="text-slate-600">MEM: 256MB</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

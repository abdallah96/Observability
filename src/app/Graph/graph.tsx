export const StateAndCacheGraph = () => {
  return (
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
    );
};
export default StateAndCacheGraph;
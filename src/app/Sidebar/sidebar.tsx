export const Sidebar = () => {
  return (
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
  );
};
export default Sidebar;
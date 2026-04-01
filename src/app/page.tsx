"use client";

import Header from "./Header/header";
import Sidebar from "./Sidebar/sidebar";
import { RenderTimeline } from "./Renders/render-timeline";
import StateAndCacheGraph from "./Graph/graph";
import BottomControlsBar from "./ControlsBar/control-bar";
import Footer from "./Footer/footer";
import { LabPanel } from "@/experiments/LabPanel";

export default function Home() {
  return (
    <div className="observatory-shell h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 min-h-0 gap-3 px-4 pt-3 text-xs text-slate-200">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col gap-2 min-h-0">
          <RenderTimeline />
          <LabPanel />
        </div>

        <StateAndCacheGraph />
      </div>

      <div className="shrink-0 px-4 pb-3">
        <BottomControlsBar />
        <Footer />
      </div>
    </div>
  );
}

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
    <div className="observatory-shell">
      <Header />
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 text-xs text-slate-200">
        <div className="flex flex-1 gap-3">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <RenderTimeline />
            <LabPanel />
          </div>
          <StateAndCacheGraph />
        </div>
        <BottomControlsBar />
        <Footer />
      </div>
    </div>
  );
}

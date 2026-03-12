"use client";
import Header from "./Header/header";
import Sidebar from "./Sidebar/sidebar";
import { RenderTimeline } from "./Renders/render-timeline";
import StateAndCacheGraph from "./Graph/graph";
import BottomControlsBar from "./ControlsBar/control-bar";
import Footer from "./Footer/footer";
import { useState } from "react";

export const Home = () => {
  type ActiveAction =
    | "liveTrace"
    | "resetTrace"
    | "exportJson"
    | "deployFix"
    | null;
  const [activeButton, setActiveButton] = useState < ActiveAction(null);
  return (
    <div className="observatory-shell">
      <Header
        activeAction={activeAction}
        onChangeActiveAction={setActiveButton}
      />
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 text-xs text-slate-200">
        <div className="flex flex-1 gap-3">
          <Sidebar />
          <RenderTimeline
            isLiveTrace={isLiveTrace}
            isResetTrace={isResetTrace}
            isExportJson={isExportJson}
            isDeployFix={isDeployFix}
          />
          <StateAndCacheGraph />
        </div>
        <BottomControlsBar />
        <Footer />
      </div>
    </div>
  );
};
export default Home;

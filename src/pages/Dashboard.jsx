import React, { useState } from "react";
import Header from "../components/Header";
import ControlSection from "../components/ControlSection";
import CameraView from "../components/CameraView";
// import PlaybackControl from "../components/PlaybackControl";
import ViolationLog from "../components/ViolationLog";
import "./Dashboard.css";
import EditPanel from "../components/EditPanel";

export default function Dashboard() {
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="dashboard">
      <Header />
      <div className={`dashboard-content ${activePanel ? "with-panel" : ""}`}>
        <div className="main-section">
          <ControlSection togglePanel={togglePanel} activePanel={activePanel} />
          <CameraView />
        </div>
        {activePanel === "log" && <ViolationLog />}
        {activePanel === "edit" && <EditPanel />}
      </div>
    </div>
  );
}

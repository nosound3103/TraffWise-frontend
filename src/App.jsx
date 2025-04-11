import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import CameraMonitor from "./pages/CameraMonitor";
import ViolationPage from "./pages/ViolationPage";
import ViolationDetail from "./pages/ViolationDetail";
import { DataProvider } from "./contexts/DataProvider";

// Import default settings from EditPanel to reuse the same defaults
const DEFAULT_SETTINGS = {
  // Speed Estimation
  speedEstimationEnabled: true,
  speedLimit: 60,
  overspeedBuffer: 5,
  maxHistorySeconds: 3.0,

  // Red Light Violation
  redLightDetectionEnabled: true,
  maxTrackRLV: 50,

  // Wrong Lane Detection
  wrongLaneDetectionEnabled: true,
  angleThreshold: 90,
  straightThreshold: 30,
  dotThreshold: -0.5,
  toleranceTime: 3,

  // General Model Settings
  confidenceThreshold: 0.5,
  nmsThreshold: 0.45,
  maxAge: 15,
};

export default function App() {
  // Initialize parameters on app startup
  useEffect(() => {
    const initializeParameters = async () => {
      try {
        // Get saved settings from localStorage
        const savedSettings = localStorage.getItem("traffwise_settings");
        const settingsToApply = savedSettings
          ? JSON.parse(savedSettings)
          : DEFAULT_SETTINGS;

        // Send parameters to backend
        const response = await fetch("http://localhost:8000/api/parameters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settingsToApply),
        });

        if (!response.ok) {
          throw new Error("Failed to initialize parameters");
        }
        console.log("System parameters initialized from localStorage");
      } catch (error) {
        console.error("Error initializing parameters:", error);
      }
    };

    initializeParameters();
  }, []);
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/monitor/:cameraId" element={<CameraMonitor />} />
          <Route path="/violations" element={<ViolationPage />} />
          <Route path="/violations/:id" element={<ViolationDetail />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

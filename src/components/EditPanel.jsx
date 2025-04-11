import React, { useState, useEffect, useCallback } from "react";
import "./EditPanel.css";

// Define default settings as a constant outside the component
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

export default function EditPanel() {
  // Always initialize with default settings
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Load settings from localStorage only once at component mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("traffwise_settings");
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(parsedSettings);
        // Don't send parameters here as App.jsx already does this on startup
      }
    } catch (error) {
      console.error("Error loading settings from localStorage:", error);
    }
  }, []);

  // Memoize the sendParametersToBackend function
  const sendParametersToBackend = useCallback(async (params) => {
    try {
      console.log("Sending parameters from EditPanel:", params);
      const response = await fetch("http://localhost:8000/api/parameters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error("Failed to update parameters");
      }

      const data = await response.json();
      console.log("Parameters updated:", data);
    } catch (error) {
      console.error("Error updating parameters:", error);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseFloat(value)
        : value;

    setSettings((prev) => {
      const newSettings = { ...prev, [name]: newValue };

      // Save to localStorage
      localStorage.setItem("traffwise_settings", JSON.stringify(newSettings));

      // Update backend
      sendParametersToBackend(newSettings);

      return newSettings;
    });
  };

  const handleReset = () => {
    // Clear from localStorage
    localStorage.removeItem("traffwise_settings");

    // Reset to defaults
    setSettings(DEFAULT_SETTINGS);
    sendParametersToBackend(DEFAULT_SETTINGS);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2 className="title">System Parameters</h2>

        {/* General Model Settings */}
        <section className="section">
          <h3 className="section-title">General Model Settings</h3>
          <div className="parameter-control">
            <label htmlFor="confidenceThreshold">Detection Confidence:</label>
            <input
              type="number"
              id="confidenceThreshold"
              name="confidenceThreshold"
              min="0.1"
              max="1.0"
              step="0.05"
              value={settings.confidenceThreshold}
              onChange={handleInputChange}
            />
          </div>

          <div className="parameter-control">
            <label htmlFor="nmsThreshold">NMS IoU Threshold:</label>
            <input
              type="number"
              id="nmsThreshold"
              name="nmsThreshold"
              min="0.1"
              max="1.0"
              step="0.05"
              value={settings.nmsThreshold}
              onChange={handleInputChange}
            />
          </div>

          <div className="parameter-control">
            <label htmlFor="maxAge">Track Max Age:</label>
            <input
              type="number"
              id="maxAge"
              name="maxAge"
              min="1"
              max="50"
              step="1"
              value={settings.maxAge}
              onChange={handleInputChange}
            />
          </div>
        </section>

        {/* Speed Estimation Settings */}
        <section className="section">
          <div className="section-header">
            <h3 className="section-title">Speed Estimation</h3>
            <div className="toggle-container">
              <input
                type="checkbox"
                id="speedEstimationEnabled"
                name="speedEstimationEnabled"
                checked={settings.speedEstimationEnabled}
                onChange={handleInputChange}
              />
              <label className="toggle-label" htmlFor="speedEstimationEnabled">
                {settings.speedEstimationEnabled ? "On" : "Off"}
              </label>
            </div>
          </div>

          <div
            className={`section-content ${
              !settings.speedEstimationEnabled ? "disabled" : ""
            }`}
          >
            <div className="parameter-control">
              <label htmlFor="speedLimit">Speed Limit (km/h):</label>
              <input
                type="number"
                id="speedLimit"
                name="speedLimit"
                min="5"
                max="200"
                step="5"
                value={settings.speedLimit}
                onChange={handleInputChange}
                disabled={!settings.speedEstimationEnabled}
              />
            </div>

            <div className="parameter-control">
              <label htmlFor="overspeedBuffer">Overspeed Buffer (km/h):</label>
              <input
                type="number"
                id="overspeedBuffer"
                name="overspeedBuffer"
                min="0"
                max="20"
                step="1"
                value={settings.overspeedBuffer}
                onChange={handleInputChange}
                disabled={!settings.speedEstimationEnabled}
              />
            </div>

            <div className="parameter-control">
              <label htmlFor="maxHistorySeconds">Max History (seconds):</label>
              <input
                type="number"
                id="maxHistorySeconds"
                name="maxHistorySeconds"
                min="1"
                max="10"
                step="0.5"
                value={settings.maxHistorySeconds}
                onChange={handleInputChange}
                disabled={!settings.speedEstimationEnabled}
              />
            </div>
          </div>
        </section>

        {/* Red Light Violation Settings */}
        <section className="section">
          <div className="section-header">
            <h3 className="section-title">Red Light Violation Detection</h3>
            <div className="toggle-container">
              <input
                type="checkbox"
                id="redLightDetectionEnabled"
                name="redLightDetectionEnabled"
                checked={settings.redLightDetectionEnabled}
                onChange={handleInputChange}
              />
              <label
                className="toggle-label"
                htmlFor="redLightDetectionEnabled"
              >
                {settings.redLightDetectionEnabled ? "On" : "Off"}
              </label>
            </div>
          </div>

          <div
            className={`section-content ${
              !settings.redLightDetectionEnabled ? "disabled" : ""
            }`}
          >
            <div className="parameter-control">
              <label htmlFor="maxTrackRLV">Maximum Tracked Vehicles:</label>
              <input
                type="number"
                id="maxTrackRLV"
                name="maxTrackRLV"
                min="10"
                max="200"
                step="10"
                value={settings.maxTrackRLV}
                onChange={handleInputChange}
                disabled={!settings.redLightDetectionEnabled}
              />
            </div>
          </div>
        </section>

        {/* Wrong Lane Detection Settings */}
        <section className="section">
          <div className="section-header">
            <h3 className="section-title">Wrong Lane Driving Detection</h3>
            <div className="toggle-container">
              <input
                type="checkbox"
                id="wrongLaneDetectionEnabled"
                name="wrongLaneDetectionEnabled"
                checked={settings.wrongLaneDetectionEnabled}
                onChange={handleInputChange}
              />
              <label
                className="toggle-label"
                htmlFor="wrongLaneDetectionEnabled"
              >
                {settings.wrongLaneDetectionEnabled ? "On" : "Off"}
              </label>
            </div>
          </div>

          <div
            className={`section-content ${
              !settings.wrongLaneDetectionEnabled ? "disabled" : ""
            }`}
          >
            <div className="parameter-control">
              <label htmlFor="angleThreshold">Angle Threshold (degrees):</label>
              <input
                type="number"
                id="angleThreshold"
                name="angleThreshold"
                min="0"
                max="180"
                step="5"
                value={settings.angleThreshold}
                onChange={handleInputChange}
                disabled={!settings.wrongLaneDetectionEnabled}
              />
            </div>

            <div className="parameter-control">
              <label htmlFor="straightThreshold">
                Straight Threshold (degrees):
              </label>
              <input
                type="number"
                id="straightThreshold"
                name="straightThreshold"
                min="0"
                max="90"
                step="5"
                value={settings.straightThreshold}
                onChange={handleInputChange}
                disabled={!settings.wrongLaneDetectionEnabled}
              />
            </div>

            <div className="parameter-control">
              <label htmlFor="dotThreshold">Direction Dot Threshold:</label>
              <input
                type="number"
                id="dotThreshold"
                name="dotThreshold"
                min="-1"
                max="1"
                step="0.1"
                value={settings.dotThreshold}
                onChange={handleInputChange}
                disabled={!settings.wrongLaneDetectionEnabled}
              />
            </div>

            <div className="parameter-control">
              <label htmlFor="toleranceTime">Tolerance Time (seconds):</label>
              <input
                type="number"
                id="toleranceTime"
                name="toleranceTime"
                min="0"
                max="10"
                step="0.5"
                value={settings.toleranceTime}
                onChange={handleInputChange}
                disabled={!settings.wrongLaneDetectionEnabled}
              />
            </div>
          </div>
        </section>

        {/* Reset Button */}
        <div className="action-buttons">
          <button className="reset-button" onClick={handleReset}>
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}

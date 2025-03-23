import React, { useState } from "react";
import { FaCamera, FaVideo, FaCog, FaPowerOff, FaList } from "react-icons/fa";
import "./ControlSection.css";

export default function Controls({ togglePanel, activePanel }) {
  const [isOn, setIsOn] = useState(false);
  const [selectedModel, setSelectedModel] = useState("YOLO");
  const [selectedCamera, setSelectedCamera] = useState("Camera 1");

  const toggleOnOff = () => setIsOn(!isOn);

  return (
    <div className="control-section">
      {/* Model Selection */}
      <select
        className="control-dropdown"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <option value="YOLO">YOLO11</option>
        <option value="Faster-RCNN">Faster R-CNN</option>
        <option value="DETR">RTDETRv2</option>
      </select>

      {/* Camera Selection (Dropdown) */}
      <select
        className="control-dropdown"
        value={selectedCamera}
        onChange={(e) => setSelectedCamera(e.target.value)}
      >
        <option value="Camera 1">Camera 1</option>
        <option value="Camera 2">Camera 2</option>
        <option value="Camera 3">Camera 3</option>
      </select>

      {/* Power Button */}
      <button
        className={`control-btn ${isOn ? "active" : ""}`}
        onClick={toggleOnOff}
      >
        <FaPowerOff /> {isOn ? "ON" : "OFF"}
      </button>

      {/* Edit Button */}
      <button
        className={`control-btn ${activePanel === "edit" ? "active" : ""}`}
        onClick={() => togglePanel("edit")}
      >
        <FaCog /> Edit
      </button>

      {/* Capture Button */}
      <button className="control-btn">
        <FaCamera />
        Capture
      </button>

      {/* Record Button */}
      <button className="control-btn">
        <FaVideo /> Record
      </button>

      {/* Logs Button */}
      <button
        className={`control-btn ${activePanel === "log" ? "active" : ""}`}
        onClick={() => togglePanel("log")}
      >
        <FaList /> Logs
      </button>
    </div>
  );
}

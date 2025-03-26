import React, { useState, useEffect } from "react";
import { FaCamera, FaVideo, FaCog, FaPowerOff, FaList } from "react-icons/fa";
import "./ControlSection.css";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataProvider";

export default function ControlSection({ togglePanel, activePanel, cameraId }) {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const { cameras } = useData();
  const [selectedModel, setSelectedModel] = useState("YOLO");
  const [selectedCamera, setSelectedCamera] = useState(1);

  const toggleOnOff = () => setIsOn(!isOn);

  useEffect(() => {
    if (cameraId) setSelectedCamera(cameraId);
  }, [cameraId]);

  const handleCameraChange = (e) => {
    const newCamera = e.target.value;
    setSelectedCamera(newCamera);
    navigate(`/monitor/${newCamera}`);
  };

  return (
    <div className="control-section">
      <select
        className="control-dropdown"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <option value="YOLO">YOLO11</option>
        <option value="Faster-RCNN">Faster R-CNN</option>
        <option value="DETR">RTDETRv2</option>
      </select>

      <select
        className="control-dropdown"
        value={selectedCamera}
        onChange={handleCameraChange}
      >
        {cameras.map((cam) => (
          <option key={cam.id} value={cam.id}>
            {cam.name}
          </option>
        ))}
      </select>

      <button
        className={`control-btn ${isOn ? "active" : ""}`}
        onClick={toggleOnOff}
      >
        <FaPowerOff /> {isOn ? "ON" : "OFF"}
      </button>

      <button
        className={`control-btn ${activePanel === "edit" ? "active" : ""}`}
        onClick={() => togglePanel("edit")}
      >
        <FaCog /> Edit
      </button>

      <button className="control-btn">
        <FaCamera />
        Capture
      </button>

      <button className="control-btn">
        <FaVideo /> Record
      </button>

      <button
        className={`control-btn ${activePanel === "log" ? "active" : ""}`}
        onClick={() => togglePanel("log")}
      >
        <FaList /> Logs
      </button>
    </div>
  );
}

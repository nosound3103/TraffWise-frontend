import React, { useState, useEffect } from "react";
import { FaCamera, FaVideo, FaCog, FaPowerOff, FaList } from "react-icons/fa";
import "./ControlSection.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataProvider";

export default function ControlSection({ togglePanel, activePanel, cameraId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOn, setIsOn] = useState(false);
  const { cameras } = useData();
  const [selectedModel, setSelectedModel] = useState("yolo11");
  const [selectedCamera, setSelectedCamera] = useState("1");
  const [error, setError] = useState(null);
  const toggleOnOff = () => setIsOn(!isOn);

  const isMonitorPage = location.pathname.includes("/monitor");

  useEffect(() => {
    const resetEverything = async () => {
      if (isMonitorPage) {
        setIsOn(false);
        setSelectedModel("yolo11");

        const newCameraId = cameraId ? String(cameraId) : "1";
        setSelectedCamera(newCameraId);

        try {
          await fetch("http://localhost:8000/set_model", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model_type: "yolo11" }),
          });

          await fetch("http://localhost:8000/set_camera", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ camera_id: newCameraId }),
          });

          console.log("Reset successful");
        } catch (err) {
          console.error("Error resetting state:", err);
          setError("Failed to reset video feed");
        }
      }
    };

    resetEverything();

    return () => {
      console.log("ControlSection unmounting");
    };
  }, [isMonitorPage, cameraId]);

  useEffect(() => {
    if (cameraId) setSelectedCamera(String(cameraId));
  }, [cameraId]);

  const handleModelChange = async (e) => {
    const model_type = e.target.value;
    setSelectedModel(model_type);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/set_model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model_type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error switching model:", errorData);
        setError(
          `Failed to switch model: ${errorData.detail || "Unknown error"}`
        );
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error when switching model");
    }
  };

  const handleCameraChange = async (e) => {
    const camera_id = e.target.value;
    setSelectedCamera(camera_id);
    navigate(`/monitor/${camera_id}`);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/set_camera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ camera_id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error switching camera:", errorData);
        setError(
          `Failed to switch camera: ${errorData.detail || "Unknown error"}`
        );
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error when switching camera");
    }
  };

  return (
    <div className="control-section">
      {error && <div className="error-message">{error}</div>}

      <select
        className="control-dropdown"
        value={selectedModel}
        onChange={handleModelChange}
      >
        <option value="yolo11">YOLO11</option>
        <option value="rtdetrv2">RTDETRv2</option>
        <option value="faster_rcnn">Faster-RCNN</option>
      </select>

      <select
        className="control-dropdown"
        value={selectedCamera}
        onChange={handleCameraChange}
      >
        {cameras.map((cam) => (
          <option key={cam.id} value={String(cam.id)}>
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

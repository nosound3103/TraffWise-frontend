import React, { useState } from "react";
import CameraGrid from "./CameraGrid";

export default function CameraPage() {
  const [cameras, setCameras] = useState([
    { id: 1, name: "Camera 1", location: "location 1", status: "active" },
    { id: 2, name: "Camera 2", location: "location 2", status: "active" },
    { id: 3, name: "Camera 3", location: "location 3", status: "active" },
    { id: 4, name: "Camera 4", location: "location 4", status: "active" },
    { id: 5, name: "Camera 5", location: "location 5", status: "active" },
    { id: 6, name: "Camera 6", location: "location 6", status: "active" },
  ]);

  const handleAddCamera = () => {
    const newCamera = {
      id: cameras.length + 1,
      name: `Camera ${cameras.length + 1}`,
      location: `Location ${cameras.length + 1}`,
      status: "inactive",
    };
    setCameras([...cameras, newCamera]);
  };

  const handleRemoveCamera = (id) => {
    setCameras(cameras.filter((camera) => camera.id !== id));
  };

  return (
    <CameraGrid
      cameras={cameras}
      onAddCamera={handleAddCamera}
      onRemoveCamera={handleRemoveCamera}
    />
  );
}

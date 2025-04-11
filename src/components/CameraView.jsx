import React, { useState } from "react";
import "./CameraView.css";
import { useParams } from "react-router-dom";

export default function CameraView() {
  const { cameraId } = useParams();
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div className="camera-view" key={cameraId}>
      {!hasError ? (
        <img
          className="camera-feed"
          src={`http://localhost:8000/video_feed`}
          alt="Live Camera Feed"
          onError={handleImageError}
        />
      ) : (
        <div className="no-signal">
          <div className="no-signal-text">No Signal</div>
          <div className="no-signal-overlay"></div>
        </div>
      )}
    </div>
  );
}

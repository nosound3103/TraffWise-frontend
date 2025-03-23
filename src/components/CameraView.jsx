import React from "react";
import "./CameraView.css";

export default function CameraView() {
  return (
    <div className="camera-view">
      <video className="camera-feed" controls autoPlay loop>
        <source src="videos\HaNoi_VPGT.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

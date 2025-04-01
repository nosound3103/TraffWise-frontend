// import React from "react";
// import "./CameraView.css";
// import { useParams } from "react-router-dom";

// export default function CameraView() {
//   const { cameraId } = useParams();
//   return (
//     <div className="camera-view" key={cameraId}>
//       <video className="camera-feed" controls autoPlay loop>
//         <source src={`/videos/cam_${cameraId}.mp4`} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// }

import React from "react";
import "./CameraView.css";
import { useParams } from "react-router-dom";

export default function CameraView() {
  const { cameraId } = useParams();

  return (
    <div className="camera-view" key={cameraId}>
      <img
        className="camera-feed"
        src={`http://localhost:8000/video_feed`}
        alt="Live Camera Feed"
      />
    </div>
  );
}

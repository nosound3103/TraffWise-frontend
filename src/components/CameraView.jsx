import React from "react";
import "./CameraView.css";
import { useParams } from "react-router-dom";

export default function CameraView() {
  const { cameraId } = useParams();
  return (
    <div className="camera-view" key={cameraId}>
      <video className="camera-feed" controls autoPlay loop>
        <source src={`/videos/cam_${cameraId}.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

// import React, { useState, useRef, useEffect } from "react";
// import "./CameraView.css";

// export default function CameraView({
//   isDrawingMode,
//   onPolygonCreate,
//   roadData,
// }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [points, setPoints] = useState([]);
//   const [isDrawingComplete, setIsDrawingComplete] = useState(false);

//   // Resize canvas to match video dimensions
//   useEffect(() => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     const resizeCanvas = () => {
//       if (video && canvas) {
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//       }
//     };

//     // Resize when video metadata is loaded
//     video.addEventListener("loadedmetadata", resizeCanvas);

//     return () => {
//       video.removeEventListener("loadedmetadata", resizeCanvas);
//     };
//   }, []);

//   // Handle canvas click for drawing polygon
//   const handleCanvasClick = (e) => {
//     if (!isDrawingMode || isDrawingComplete) return;

//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();

//     // Calculate coordinates scaled to canvas
//     const scaleX = canvas.width / rect.width;
//     const scaleY = canvas.height / rect.height;

//     const x = (e.clientX - rect.left) * scaleX;
//     const y = (e.clientY - rect.top) * scaleY;

//     // Check if clicking close to the first point to close the polygon
//     if (points.length > 2) {
//       const firstPoint = points[0];
//       const closingDistance = 10; // pixels
//       if (
//         Math.abs(x - firstPoint.x) < closingDistance &&
//         Math.abs(y - firstPoint.y) < closingDistance
//       ) {
//         setIsDrawingComplete(true);
//         return;
//       }
//     }

//     setPoints((prevPoints) => [...prevPoints, { x, y }]);
//   };

//   // Handle right-click to cancel drawing
//   const handleCanvasRightClick = (e) => {
//     e.preventDefault();
//     if (isDrawingMode) {
//       setPoints([]);
//       setIsDrawingComplete(false);
//     }
//   };

//   // Render polygon on canvas
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     if (!canvas || !video) return;

//     const ctx = canvas.getContext("2d");

//     // Clear previous drawings
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw current video frame
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     // Draw existing road polygons
//     Object.entries(roadData).forEach(([key, road]) => {
//       if (road.points && road.points.length > 2) {
//         ctx.beginPath();
//         ctx.moveTo(road.points[0].x, road.points[0].y);

//         road.points.slice(1).forEach((point) => {
//           ctx.lineTo(point.x, point.y);
//         });

//         ctx.closePath();
//         ctx.strokeStyle = "lime";
//         ctx.lineWidth = 3;
//         ctx.setLineDash([5, 5]);
//         ctx.stroke();
//       }
//     });

//     // Draw current polygon in progress
//     if (points.length > 0) {
//       ctx.beginPath();
//       ctx.moveTo(points[0].x, points[0].y);

//       points.slice(1).forEach((point) => {
//         ctx.lineTo(point.x, point.y);
//       });

//       // Draw a line back to first point when hovering near start point
//       if (points.length > 2) {
//         ctx.lineTo(points[0].x, points[0].y);
//       }

//       ctx.strokeStyle = "red";
//       ctx.lineWidth = 3;
//       ctx.setLineDash([5, 5]);
//       ctx.stroke();
//     }
//   }, [points, roadData]);

//   // Finish drawing and create polygon
//   useEffect(() => {
//     if (isDrawingComplete && points.length > 2) {
//       onPolygonCreate(points);
//       setPoints([]);
//       setIsDrawingComplete(false);
//     }
//   }, [isDrawingComplete, points, onPolygonCreate]);

//   return (
//     <div className="camera-view">
//       <div className="video-container">
//         <video ref={videoRef} className="camera-feed" controls autoPlay loop>
//           <source src="videos\HaNoi_VPGT.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <canvas
//           ref={canvasRef}
//           className="polygon-canvas"
//           onClick={handleCanvasClick}
//           onContextMenu={handleCanvasRightClick}
//         />
//       </div>
//     </div>
//   );
// }

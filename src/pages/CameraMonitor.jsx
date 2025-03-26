import React, { useState } from "react";
import Header from "../components/Header";
import ControlSection from "../components/ControlSection";
import CameraView from "../components/CameraView";
// import PlaybackControl from "../components/PlaybackControl";
import ViolationLog from "../components/ViolationLog";
import "./CameraMonitor.css";
import EditPanel from "../components/EditPanel";
import { useParams } from "react-router-dom";

export default function CameraMonitor() {
  const [activePanel, setActivePanel] = useState(null);
  const { cameraId } = useParams();

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  const roadData = {
    road_1: {
      polygons: {
        coordinates: [
          [614, 140],
          [644, 141],
          [712, 719],
          [333, 719],
        ],
      },
      expected_direction: {
        coordinates: [
          [629, 139],
          [561, 719],
        ],
      },
      TARGET: {
        width: 6,
        height: 60,
      },
      speed_limit: 60,
      traffic_lights: {
        coordinates: [],
      },
      stop_line: {
        coordinates: [],
      },
    },
    road_2: {
      polygons: {
        coordinates: [
          [646, 142],
          [684, 142],
          [1093, 714],
          [715, 718],
        ],
      },
      expected_direction: {
        coordinates: [
          [898, 715],
          [665, 141],
        ],
      },
      TARGET: {
        width: 6,
        height: 60,
      },
      speed_limit: 60,
      traffic_lights: {
        coordinates: [],
      },
      stop_line: {
        coordinates: [],
      },
    },
  };

  const handleCreatePolygon = () => {
    alert("Create Polygon");
  };

  const handleRemovePolygon = (road) => {
    alert(`Remove Polygon for ${road}`);
  };

  const handleEditPolygon = (road) => {
    alert(`Edit Polygon for ${road}`);
  };

  return (
    <div className="camera-monitor">
      <Header />
      <div
        className={`camera-monitor-content ${activePanel ? "with-panel" : ""}`}
      >
        <div className="main-section">
          <ControlSection
            togglePanel={togglePanel}
            activePanel={activePanel}
            cameraId={cameraId}
          />
          <CameraView />
        </div>
        {activePanel === "log" && <ViolationLog />}
        {activePanel === "edit" && (
          <EditPanel
            roadData={roadData}
            onCreatePolygon={handleCreatePolygon}
            onRemovePolygon={handleRemovePolygon}
            onEditPolygon={handleEditPolygon}
          />
        )}
      </div>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
// import ControlSection from "../components/ControlSection";
// import CameraView from "../components/CameraView";
// import ViolationLog from "../components/ViolationLog";
// import "./CameraMonitor.css";
// import EditPanel from "../components/EditPanel";

// export default function Dashboard() {
//   const [roadData, setRoadData] = useState({});
//   const [isDrawingMode, setIsDrawingMode] = useState(false);
//   const [editingRoadKey, setEditingRoadKey] = useState(null);
//   const [activePanel, setActivePanel] = useState(null);

//   // Initialize road data using useEffect to prevent re-render loops
//   useEffect(() => {
//     setRoadData({
//       road_1: {
//         points: [
//           { x: 614, y: 140 },
//           { x: 644, y: 141 },
//           { x: 712, y: 719 },
//           { x: 333, y: 719 },
//         ],
//         polygons: {
//           coordinates: [
//             [614, 140],
//             [644, 141],
//             [712, 719],
//             [333, 719],
//           ],
//         },
//         expected_direction: {
//           coordinates: [
//             [629, 139],
//             [561, 719],
//           ],
//         },
//         TARGET: {
//           width: 6,
//           height: 60,
//         },
//         speed_limit: 60,
//         traffic_lights: {
//           coordinates: [],
//         },
//         stop_line: {
//           coordinates: [],
//         },
//       },
//       road_2: {
//         points: [
//           { x: 646, y: 142 },
//           { x: 684, y: 142 },
//           { x: 1093, y: 714 },
//           { x: 715, y: 718 },
//         ],
//         polygons: {
//           coordinates: [
//             [646, 142],
//             [684, 142],
//             [1093, 714],
//             [715, 718],
//           ],
//         },
//         expected_direction: {
//           coordinates: [
//             [898, 715],
//             [665, 141],
//           ],
//         },
//         TARGET: {
//           width: 6,
//           height: 60,
//         },
//         speed_limit: 60,
//         traffic_lights: {
//           coordinates: [],
//         },
//         stop_line: {
//           coordinates: [],
//         },
//       },
//     });
//   }, []); // Empty dependency array ensures this runs only once

//   const togglePanel = (panel) => {
//     setActivePanel(activePanel === panel ? null : panel);
//   };

//   const handleCreatePolygon = () => {
//     setIsDrawingMode(true);
//   };

//   const handlePolygonCreate = (points) => {
//     // If editing an existing road, update it
//     if (editingRoadKey) {
//       setRoadData((prev) => ({
//         ...prev,
//         [editingRoadKey]: {
//           ...prev[editingRoadKey],
//           points,
//         },
//       }));
//       setEditingRoadKey(null);
//     } else {
//       // Create a new road
//       const newRoadKey = `Road_${Object.keys(roadData).length + 1}`;
//       setRoadData((prev) => ({
//         ...prev,
//         [newRoadKey]: { points },
//       }));
//     }
//     setIsDrawingMode(false);
//   };

//   const handleRemovePolygon = (roadKey) => {
//     const updatedRoadData = { ...roadData };
//     delete updatedRoadData[roadKey];
//     setRoadData(updatedRoadData);
//   };

//   const handleEditPolygon = (roadKey) => {
//     setIsDrawingMode(true);
//     setEditingRoadKey(roadKey);
//   };

//   return (
//     <div className="dashboard">
//       <Header />
//       <div className={`dashboard-content ${activePanel ? "with-panel" : ""}`}>
//         <div className="main-section">
//           <ControlSection togglePanel={togglePanel} activePanel={activePanel} />
//           <CameraView
//             isDrawingMode={isDrawingMode}
//             onPolygonCreate={handlePolygonCreate}
//             roadData={roadData}
//           />
//         </div>
//         {activePanel === "log" && <ViolationLog />}
//         {activePanel === "edit" && (
//           <EditPanel
//             roadData={roadData}
//             onCreatePolygon={handleCreatePolygon}
//             onRemovePolygon={handleRemovePolygon}
//             onEditPolygon={handleEditPolygon}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

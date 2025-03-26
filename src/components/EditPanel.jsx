import React, { useState } from "react";
import "./EditPanel.css";

const PREDEFINED_LABELS = [
  { id: "polygons", name: "Roads" },
  { id: "expected_direction", name: "Direction" },
  { id: "traffic_lights", name: "Traffic Light" },
  { id: "speed_limit", name: "Speed Limit" },
];

export default function EditPanel({
  roadData,
  onCreatePolygon,
  onRemovePolygon,
  onEditPolygon,
}) {
  const [selectedRoad, setSelectedRoad] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleCreatePolygon = () => {
    if (onCreatePolygon) {
      onCreatePolygon();
    }
  };

  const handleRemovePolygon = () => {
    if (selectedRoad && onRemovePolygon) {
      onRemovePolygon(selectedRoad);
    }
  };

  const handleEditPolygon = () => {
    if (selectedRoad && onEditPolygon) {
      onEditPolygon(selectedRoad);
    }
  };

  const handleLabelSelect = (label) => {
    if (label.id === "speed_limit") {
      setSelectedLabel({ ...label, value: "" });
    } else {
      setSelectedLabel(label);
    }
  };

  const handleRoadSelect = (roadKey) => {
    setSelectedRoad(roadKey);
  };

  return (
    <div className={"sidebar"}>
      <div className="sidebar-content">
        <h2 className="title">Label Management</h2>

        <section className="section">
          <h3 className="section-title">Actions</h3>
          <div className="button-group">
            <button className="action-button" onClick={handleCreatePolygon}>
              Create Polygon
            </button>
            <button
              className="action-button"
              onClick={handleRemovePolygon}
              disabled={!selectedRoad}
            >
              Remove Polygon
            </button>
            <button
              className="action-button"
              onClick={handleEditPolygon}
              disabled={!selectedRoad}
            >
              Edit Polygon
            </button>
          </div>
        </section>

        {/* Roads Section */}
        <section className="section">
          <h3 className="section-title">Roads</h3>
          <div className="road-list">
            {Object.keys(roadData).map((roadKey) => (
              <div
                key={roadKey}
                className={`road-item ${
                  selectedRoad === roadKey ? "selected" : ""
                }`}
                onClick={() => handleRoadSelect(roadKey)}
              >
                {roadKey}
              </div>
            ))}
          </div>
        </section>

        {/* Labels Section */}
        <section className="section">
          <h3 className="section-title">Labels</h3>
          <div className="label-list">
            {PREDEFINED_LABELS.map((label) => (
              <div
                key={label.id}
                className={`label-item ${
                  selectedLabel?.id === label.id ? "selected" : ""
                }`}
                onClick={() => handleLabelSelect(label)}
              >
                {label.name}
              </div>
            ))}
          </div>

          {selectedLabel?.id === "speed_limit" && (
            <input
              type="number"
              className="speed-limit-input"
              placeholder="Enter speed limit"
              value={selectedLabel.value || ""}
              onChange={(e) =>
                setSelectedLabel({ ...selectedLabel, value: e.target.value })
              }
            />
          )}
        </section>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import "./EditPanel.css";

// const PREDEFINED_LABELS = [
//   { id: "polygons", name: "Roads" },
//   { id: "expected_direction", name: "Direction" },
//   { id: "traffic_lights", name: "Traffic Light" },
//   { id: "speed_limit", name: "Speed Limit" },
// ];

// export default function EditPanel({
//   roadData,
//   onCreatePolygon,
//   onRemovePolygon,
//   onEditPolygon,
// }) {
//   const [selectedRoad, setSelectedRoad] = useState(null);
//   const [selectedLabel, setSelectedLabel] = useState(null);

//   const handleCreatePolygon = () => {
//     if (onCreatePolygon) {
//       onCreatePolygon();
//     }
//   };

//   const handleRemovePolygon = () => {
//     if (selectedRoad && onRemovePolygon) {
//       onRemovePolygon(selectedRoad);
//     }
//   };

//   const handleEditPolygon = () => {
//     if (selectedRoad && onEditPolygon) {
//       onEditPolygon(selectedRoad);
//     }
//   };

//   const handleLabelSelect = (label) => {
//     if (label.id === "speed_limit") {
//       setSelectedLabel({ ...label, value: "" });
//     } else {
//       setSelectedLabel(label);
//     }
//   };

//   const handleRoadSelect = (roadKey) => {
//     setSelectedRoad(roadKey);
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-content">
//         <h2 className="title">Label Management</h2>

//         <section className="section">
//           <h3 className="section-title">Actions</h3>
//           <div className="button-group">
//             <button className="action-button" onClick={handleCreatePolygon}>
//               Create Polygon
//             </button>
//             <button
//               className="action-button"
//               onClick={handleRemovePolygon}
//               disabled={!selectedRoad}
//             >
//               Remove Polygon
//             </button>
//             <button
//               className="action-button"
//               onClick={handleEditPolygon}
//               disabled={!selectedRoad}
//             >
//               Edit Polygon
//             </button>
//           </div>
//         </section>

//         <section className="section">
//           <h3 className="section-title">Roads</h3>
//           <div className="road-list">
//             {Object.keys(roadData).map((roadKey) => (
//               <div
//                 key={roadKey}
//                 className={`road-item ${
//                   selectedRoad === roadKey ? "selected" : ""
//                 }`}
//                 onClick={() => handleRoadSelect(roadKey)}
//               >
//                 {roadKey}
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="section">
//           <h3 className="section-title">Labels</h3>
//           <div className="label-list">
//             {PREDEFINED_LABELS.map((label) => (
//               <div
//                 key={label.id}
//                 className={`label-item ${
//                   selectedLabel?.id === label.id ? "selected" : ""
//                 }`}
//                 onClick={() => handleLabelSelect(label)}
//               >
//                 {label.name}
//               </div>
//             ))}
//           </div>

//           {selectedLabel?.id === "speed_limit" && (
//             <input
//               type="number"
//               className="speed-limit-input"
//               placeholder="Enter speed limit"
//               value={selectedLabel.value || ""}
//               onChange={(e) =>
//                 setSelectedLabel({ ...selectedLabel, value: e.target.value })
//               }
//             />
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }

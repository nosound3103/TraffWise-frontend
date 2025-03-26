// import React from "react";
// import "./ViolationLog.css";

// export default function ViolationLog() {
//   return (
//     <aside className="violation-log">
//       <h2>Violation log</h2>
//     </aside>
//   );
// }

import React from "react";
import "./ViolationLog.css";
import { useData } from "../contexts/DataProvider";

export default function ViolationLog() {
  const { violations } = useData();
  const formatPlate = (plate) => {
    const [label, trackingId] = plate.split("-");
    return `${label.charAt(0).toUpperCase() + label.slice(1)} - ${trackingId}`;
  };

  const getTypeClass = (type) => {
    if (type.includes("Speeding")) return "violation-type speeding";
    if (type.includes("Red Light")) return "violation-type red-light";
    if (type.includes("Wrong Lane")) return "violation-type wrong-lane";
    return "violation-type";
  };

  return (
    <aside className="violation-log">
      <h2>Violation Log</h2>
      <div className="violation-list">
        {violations.map((violation) => (
          <div key={violation.id} className="violation-item">
            <div className="violation-date">
              {new Date(violation.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="violation-details">
              <h3 className={getTypeClass(violation.type)}>{violation.type}</h3>
              <p className="violation-plate">{formatPlate(violation.plate)}</p>
              <p className="violation-location">{violation.location}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

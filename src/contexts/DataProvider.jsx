import { createContext, useState, useContext } from "react";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [cameras, setCameras] = useState([
    { id: 1, name: "Camera 1", location: "Location 1", status: "active" },
    { id: 2, name: "Camera 2", location: "Location 2", status: "active" },
    // { id: 3, name: "Camera 3", location: "Location 3", status: "active" },
    // { id: 4, name: "Camera 4", location: "Location 4", status: "active" },
    // { id: 5, name: "Camera 5", location: "Location 5", status: "inactive" },
    // { id: 6, name: "Camera 6", location: "Location 6", status: "inactive" },
  ]);

  const [violations, setViolations] = useState([
    {
      id: 1,
      plate: "car-001",
      type: "Speeding",
      status: "Pending",
      date: "2025-03-22",
      location: cameras[0]?.location || "Unknown",
      speed: "80 km/h (Limit: 60 km/h)",
      evidence: "https://placehold.co/1400x800",
    },
    {
      id: 2,
      plate: "bus-002",
      type: "Red Light Violation",
      status: "Resolved",
      date: "2025-03-21",
      location: cameras[1]?.location || "Unknown",
      signalTime: "Crossed at 3s after red",
      evidence: "https://placehold.co/1400x800",
    },
    {
      id: 3,
      plate: "motorbike-003",
      type: "Wrong Lane Driving",
      status: "Pending",
      date: "2025-03-20",
      location: cameras[2]?.location || "Unknown",
      laneDetails: "Entered car-only lane with a motorbike",
      evidence: "https://placehold.co/1400x800",
    },
    {
      id: 4,
      plate: "truck-004",
      type: "Speeding",
      status: "Resolved",
      date: "2025-03-19",
      location: cameras[3]?.location || "Unknown",
      speed: "75 km/h (Limit: 60 km/h)",
      evidence: "https://placehold.co/1400x800",
    },
    {
      id: 5,
      plate: "car-005",
      type: "Red Light Violation",
      status: "Pending",
      date: "2025-03-18",
      location: cameras[4]?.location || "Unknown",
      signalTime: "Crossed at 2s after red",
      evidence: "https://placehold.co/1400x800",
    },
    {
      id: 6,
      plate: "bus-006",
      type: "Wrong Lane Driving",
      status: "Resolved",
      date: "2025-03-17",
      location: cameras[5]?.location || "Unknown",
      laneDetails: "Drove into an emergency lane",
      evidence: "https://placehold.co/1400x800",
    },
    {
      id: 7,
      plate: "motorbike-007",
      type: "Speeding",
      status: "Pending",
      date: "2025-03-16",
      location: cameras[0]?.location || "Unknown",
      speed: "70 km/h (Limit: 50 km/h)",
      evidence: "https://placehold.co/1400x800",
    },
    {
      id: 8,
      plate: "truck-008",
      type: "Red Light Violation",
      status: "Resolved",
      date: "2025-03-15",
      location: cameras[1]?.location || "Unknown",
      signalTime: "Crossed at 4s after red",
      evidence: "https://placehold.co/1400x800",
    },
    {
      id: 9,
      plate: "bus-009",
      type: "Wrong Lane Driving",
      status: "Pending",
      date: "2025-03-14",
      location: cameras[2]?.location || "Unknown",
      laneDetails: "Drove in a bus-only lane",
      evidence: "https://placehold.co/1400x800",
    },
    {
      id: 10,
      plate: "car-010",
      type: "Speeding",
      status: "Resolved",
      date: "2025-03-13",
      location: cameras[3]?.location || "Unknown",
      speed: "90 km/h (Limit: 70 km/h)",
      evidence: "https://placehold.co/1400x800",
    },
  ]);

  return (
    <DataContext.Provider
      value={{ cameras, setCameras, violations, setViolations }}
    >
      {children}
    </DataContext.Provider>
  );
}

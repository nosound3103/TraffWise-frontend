import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./ViolationDetail.css";
import Header from "../components/Header";

export default function ViolationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const sampleViolations = {
    1: {
      plate: "car-001",
      type: "Speeding",
      status: "Pending",
      date: "2025-03-22",
      location: "District 1",
      speed: "80 km/h (Limit: 60 km/h)",
      evidence: "https://placehold.co/1400x800",
    },
    2: {
      plate: "bus-002",
      type: "Red Light Violation",
      status: "Resolved",
      date: "2025-03-21",
      location: "District 2",
      signalTime: "Crossed at 3s after red",
      evidence: "https://placehold.co/1400x800",
    },
    3: {
      plate: "motorbike-003",
      type: "Wrong Lane Driving",
      status: "Pending",
      date: "2025-03-20",
      location: "Highway 1A",
      laneDetails: "Entered car-only lane with a motorbike",
      evidence: "https://placehold.co/1400x800",
    },
    4: {
      plate: "truck-004",
      type: "Speeding",
      status: "Resolved",
      date: "2025-03-19",
      location: "District 3",
      speed: "75 km/h (Limit: 60 km/h)",
      evidence: "https://placehold.co/1400x800",
    },
    5: {
      plate: "car-005",
      type: "Red Light Violation",
      status: "Pending",
      date: "2025-03-18",
      location: "District 4",
      signalTime: "Crossed at 2s after red",
      evidence: "https://placehold.co/1400x800",
    },
    6: {
      plate: "bus-006",
      type: "Wrong Lane Driving",
      status: "Resolved",
      date: "2025-03-17",
      location: "Highway 5B",
      laneDetails: "Drove into an emergency lane",
      evidence: "https://placehold.co/1400x800",
    },
    7: {
      plate: "motorbike-007",
      type: "Speeding",
      status: "Pending",
      date: "2025-03-16",
      location: "City Center",
      speed: "70 km/h (Limit: 50 km/h)",
      evidence: "https://placehold.co/1400x800",
    },
    8: {
      plate: "truck-008",
      type: "Red Light Violation",
      status: "Resolved",
      date: "2025-03-15",
      location: "District 6",
      signalTime: "Crossed at 4s after red",
      evidence: "https://placehold.co/1400x800",
    },
    9: {
      plate: "bus-009",
      type: "Wrong Lane Driving",
      status: "Pending",
      date: "2025-03-14",
      location: "Expressway A",
      laneDetails: "Drove in a bus-only lane",
      evidence: "https://placehold.co/1400x800",
    },
    10: {
      plate: "car-010",
      type: "Speeding",
      status: "Resolved",
      date: "2025-03-13",
      location: "District 7",
      speed: "90 km/h (Limit: 70 km/h)",
      evidence: "https://placehold.co/1400x800",
    },
  };

  const [violation, setViolation] = useState(sampleViolations[id] || {});

  const handleStatusChange = (event) => {
    setViolation({ ...violation, status: event.target.value });
  };

  return (
    <>
      <Header />
      <div className="violation-detail-container">
        <div className="detail-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <h2>Violation Details</h2>
        </div>

        <div className="violation-info">
          <div className="info-row">
            <strong>License Plate:</strong> {violation.plate}
          </div>
          <div className="info-row">
            <strong>Violation Type:</strong> {violation.type}
          </div>
          <div className="info-row">
            <strong>Status:</strong>
            <select
              className={`status-select ${violation.status?.toLowerCase()}`}
              value={violation.status}
              onChange={handleStatusChange}
            >
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div className="info-row">
            <strong>Date:</strong> {violation.date}
          </div>
          <div className="info-row">
            <strong>Location:</strong> {violation.location}
          </div>

          {violation.type === "Speeding" && (
            <div className="info-row">
              <strong>Speed:</strong> {violation.speed}
            </div>
          )}

          {violation.type === "Red Light Violation" && (
            <div className="info-row">
              <strong>Signal Timing:</strong> {violation.signalTime}
            </div>
          )}

          {violation.type === "Wrong Lane Driving" && (
            <div className="info-row">
              <strong>Details:</strong> {violation.laneDetails}
            </div>
          )}
        </div>

        <div className="evidence-section">
          <h3>Evidence</h3>
          <img
            src={violation.evidence}
            alt="Violation Evidence"
            className="evidence-img"
          />
        </div>
      </div>
    </>
  );
}

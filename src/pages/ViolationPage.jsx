import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilePdf,
  FaFileExcel,
  FaFilter,
  FaEye,
} from "react-icons/fa";
import "./ViolationPage.css";
import Header from "../components/Header";
import { useData } from "../contexts/DataProvider";

export default function ViolationPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({ type: "", status: "" });
  const { violations } = useData();

  const filteredViolations = violations.filter(
    (v) =>
      v.plate.includes(searchQuery) &&
      (filter.type === "" || v.type === filter.type) &&
      (filter.status === "" || v.status === filter.status)
  );

  const handleReview = (id) => {
    navigate(`/violations/${id}`);
  };

  return (
    <>
      <Header />
      <div className="violation-container">
        <div className="violation-header">
          <h2>Violation List</h2>
          <div className="search-bar">
            <FaSearch className="icon" />
            <input
              type="text"
              placeholder="Search by plate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-panel">
          <FaFilter className="icon" />
          <select
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="Speeding">Speeding</option>
            <option value="Red Light Violation">Red Light Violation</option>
            <option value="Wrong Lane Driving">Wrong Lane Driving</option>
          </select>
          <select
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <table className="violation-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Plate</th>
              <th>Type</th>
              <th>Status</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredViolations.map((v) => (
              <tr key={v.id}>
                <td>{v.date}</td>
                <td>{v.plate}</td>
                <td>{v.type}</td>
                <td>{v.status}</td>
                <td>{v.location}</td>
                <td>
                  <button
                    className="review-btn"
                    onClick={() => handleReview(v.id)}
                  >
                    <FaEye /> Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="report-generation">
          <h3>Generate Report</h3>
          <button className="report-btn pdf">
            <FaFilePdf /> PDF
          </button>
          <button className="report-btn excel">
            <FaFileExcel /> Excel
          </button>
        </div>
      </div>
    </>
  );
}

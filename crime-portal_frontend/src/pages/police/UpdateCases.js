import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext"; // to get police officer email
import { fetchReportById, updateReport } from "../../utils/reportsApi";

function UpdateCases() {
  const { user } = useAuth(); // logged-in police officer
  const [reportId, setReportId] = useState("");
  const [report, setReport] = useState(null);
  const [status, setStatus] = useState("");
  const [handledBy, setHandledBy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadReport = async () => {
    if (!reportId) {
      setError("Please enter a report ID");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await fetchReportById(reportId);
      setReport(data);
      setStatus(data.status || "Pending");
      setHandledBy(data.handledBy || "");
    } catch (e) {
      setError(e.message || "Report not found");
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!report) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await updateReport(report.id, {
        ...report, // keep all existing fields
        status,
        handledBy,
      });
      setSuccess("Report updated successfully!");
      // Reload to show updated data
      const updated = await fetchReportById(report.id);
      setReport(updated);
    } catch (e) {
      setError(e.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const assignToMe = () => {
    if (user?.email) setHandledBy(user.email);
  };

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="fw-bold mb-4">Update Case</h2>
      <p>Enter a report ID to view and update its status.</p>

      {/* Step 1: Fetch report by ID */}
      <div className="shadow p-4 rounded bg-light mb-4">
        <h5 className="mb-3">Load Report</h5>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Report ID"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
          />
          <button className="btn btn-primary" onClick={loadReport} disabled={loading}>
            {loading ? "Loading..." : "Load"}
          </button>
        </div>
        {error && <p className="text-danger mt-2 mb-0">{error}</p>}
      </div>

      {/* Step 2: Show report details and update form */}
      {report && (
        <form onSubmit={handleUpdate} className="shadow p-4 rounded bg-light">
          <h5 className="mb-3">Report Details</h5>
          <div className="mb-2">
            <strong>ID:</strong> {report.id}
          </div>
          <div className="mb-2">
            <strong>User Email:</strong> {report.userEmail}
          </div>
          <div className="mb-2">
            <strong>Category:</strong> {report.category}
          </div>
          <div className="mb-2">
            <strong>Body:</strong> {report.body}
          </div>
          <div className="mb-2">
            <strong>Location:</strong> {report.location}
          </div>
          <div className="mb-3">
            <strong>Date/Time:</strong> {report.date} at {report.time}
          </div>

          <hr />

          <div className="mb-3">
            <label className="form-label fw-bold">Update Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Handled By (Officer Email)</label>
            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Officer email"
                value={handledBy}
                onChange={(e) => setHandledBy(e.target.value)}
              />
              <button type="button" className="btn btn-secondary" onClick={assignToMe}>
                Assign to Me
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-success me-2" disabled={loading}>
            {loading ? "Updating..." : "Update Report"}
          </button>
          {success && <span className="text-success">{success}</span>}
          {error && <p className="text-danger mt-2 mb-0">{error}</p>}
        </form>
      )}
    </motion.div>
  );
}

export default UpdateCases;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchAllReports } from "../../utils/reportsApi";

function ViewReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllReports();
        setReports(data);
      } catch (e) {
        setError(e.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="fw-bold mb-4">View Reports</h2>
        <p>Loading reports...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="fw-bold mb-4">View Reports</h2>
        <p className="text-danger">{error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="fw-bold mb-4">View Reports</h2>
      <p>Police can view all submitted crime reports here and take action.</p>

      {reports.length === 0 ? (
        <p className="text-muted">No reports available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered shadow-sm align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>User Email</th>
                <th>User Phone</th>
                <th>Body</th>
                <th>Category</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Status</th>
                <th>Score</th>
                <th>Handled By</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.id}>
                  <td>{index + 1}</td>
                  <td>{report.id}</td>
                  <td>{report.userEmail}</td>
                  <td>{report.userPhone || "—"}</td>
                  <td
                    style={{
                      maxWidth: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {report.body}
                  </td>
                  <td>{report.category}</td>
                  <td>{report.date}</td>
                  <td>{report.time}</td>
                  <td>{report.location}</td>
                  <td>
                    <span
                      className={`badge ${
                        report.status === "Resolved"
                          ? "bg-success"
                          : report.status === "In Progress"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        report.score >= 46 ? "bg-danger" : "bg-info"
                      }`}
                    >
                      {report.score}
                    </span>
                  </td>
                  <td>{report.handledBy || <span className="text-muted">—</span>}</td>
                  <td style={{ fontSize: "0.85rem" }}>
                    {new Date(report.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

export default ViewReports;

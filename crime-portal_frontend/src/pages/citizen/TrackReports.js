import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext"; // adjust path if needed
import { fetchReportsByEmail } from "../../utils/reportsApi";

function TrackReports() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!user?.email) {
        setError("User not logged in");
        setLoading(false);
        return;
      }
      try {
        const data = await fetchReportsByEmail(user.email);
        setReports(data);
      } catch (e) {
        setError(e.message || "Failed to load reports");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  if (loading) {
    return (
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="fw-bold mb-3">Track Reports</h2>
        <p>Loading your reports...</p>
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
        <h2 className="fw-bold mb-3">Track Reports</h2>
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
      <h2 className="fw-bold mb-3">Track Reports</h2>
      <p>Here you can see the status of reports you've submitted.</p>

      {reports.length === 0 ? (
        <p className="text-muted">You have not submitted any reports yet.</p>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Body</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Department</th>
                <th>Handled By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.id}>
                  <td>{index + 1}</td>
                  <td>{report.body}</td>
                  <td>{report.date}</td>
                  <td>{report.time}</td>
                  <td>{report.location}</td>
                  <td>{report.category}</td>
                  <td>{report.handledBy || <span className="text-muted">—</span>}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

export default TrackReports;

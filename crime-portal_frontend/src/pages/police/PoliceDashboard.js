import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchAllReports, groupByStatus } from "../../utils/reportsApi";

function PoliceDashboard() {
  const [counts, setCounts] = useState({ Pending: 0, "In Progress": 0, Resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const reports = await fetchAllReports();
        const statusMap = groupByStatus(reports);
        setCounts({
          Pending: statusMap["Pending"] || 0,
          "In Progress": statusMap["In Progress"] || 0,
          Resolved: statusMap["Resolved"] || 0,
        });
      } catch (e) {
        console.error("Failed to load reports:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = [
    { title: "New Reports", value: counts.Pending, icon: "file-earmark-plus", color: "primary" },
    { title: "Ongoing Cases", value: counts["In Progress"], icon: "hourglass-split", color: "warning" },
    { title: "Resolved Cases", value: counts.Resolved, icon: "check-circle", color: "success" },
    { title: "Crime Alerts", value: 0, icon: "bell", color: "danger" }, // placeholder for future alerts feature
  ];

  if (loading) {
    return (
      <div>
        <h1 className="mb-4 fw-bold">Police Dashboard</h1>
        <p>Loading statistics...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 fw-bold">Police Dashboard</h1>
      <p className="text-muted mb-5">Quick overview of current reports and cases</p>

      <div className="row g-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="col-md-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <div className={`card border-0 shadow-sm text-white bg-${stat.color}`}>
              <div className="card-body d-flex align-items-center">
                <i className={`bi bi-${stat.icon} display-6 me-3`}></i>
                <div>
                  <h5 className="card-title mb-1">{stat.title}</h5>
                  <h2 className="fw-bold">{stat.value}</h2>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PoliceDashboard;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchAllUsers } from "../../utils/userApi";
import { fetchAllReports } from "../../utils/reportsApi";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [pendingReports, setPendingReports] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Fetch users and reports in parallel
        const [users, reports] = await Promise.all([
          fetchAllUsers(),
          fetchAllReports(),
        ]);

        setTotalUsers(users.length);
        
        // Count reports with status "Pending"
        const pending = reports.filter(
          (r) => (r.status || "").toLowerCase() === "pending"
        ).length;
        setPendingReports(pending);
      } catch (e) {
        console.error("Failed to load dashboard stats:", e);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="fw-bold mb-3">Admin Dashboard</h2>
        <p>Loading dashboard statistics...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="fw-bold mb-3">Admin Dashboard</h2>
      <p className="text-muted">
        Welcome, Admin 👋 Here you can manage users, monitor reports, and update system settings.
      </p>

      {/* Quick Stats */}
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm p-4 text-center border-0">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <i className="bi bi-people-fill text-primary me-2" style={{ fontSize: "2rem" }}></i>
              <h6 className="fw-bold mb-0">Total Users</h6>
            </div>
            <p className="fs-2 text-primary fw-bold mb-0">{totalUsers}</p>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow-sm p-4 text-center border-0">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <i className="bi bi-exclamation-triangle-fill text-warning me-2" style={{ fontSize: "2rem" }}></i>
              <h6 className="fw-bold mb-0">Pending Reports</h6>
            </div>
            <p className="fs-2 text-warning fw-bold mb-0">{pendingReports}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AdminDashboard;

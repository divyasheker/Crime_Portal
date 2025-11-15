import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function PoliceSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears user from context and sessionStorage
    navigate("/login");
  };

  const sidebarItems = [
    { name: "Dashboard", icon: "speedometer2", path: "/police" },
    { name: "Analytics", icon: "bar-chart-line", path: "/police/analytics" },
    { name: "View Reports", icon: "file-earmark-text", path: "/police/view-reports" },
    { name: "Update Cases", icon: "journal-check", path: "/police/updatecases" },
    { name: "Crime Alerts", icon: "bell", path: "/police/police-alerts" },
    { name: "Profile", icon: "person-badge", path: "/profile" },
  ];

  return (
    <motion.div
      className="bg-dark text-light vh-100 p-3"
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="text-center mb-4 fw-bold">Police</h4>
      <ul className="nav flex-column">
        {sidebarItems.map((item, idx) => (
          <motion.li
            key={idx}
            whileHover={{ scale: 1.05, x: 5 }}
            className="nav-item mb-2"
          >
            <NavLink
              to={item.path}
              className="nav-link text-light d-flex align-items-center"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#495057" : "transparent",
                borderRadius: "6px",
              })}
            >
              <i className={`bi bi-${item.icon} me-2`}></i>
              {item.name}
            </NavLink>
          </motion.li>
        ))}

        {/* Logout button */}
        <motion.li
          whileHover={{ scale: 1.05, x: 5 }}
          className="nav-item mt-3"
        >
          <button
            onClick={handleLogout}
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </motion.li>
      </ul>
    </motion.div>
  );
}

export default PoliceSidebar;

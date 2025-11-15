import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Navbar() {
const { user, logout } = useAuth();
const navigate = useNavigate();

const roleHome = (role) => {
const r = (role || "").toUpperCase();
if (r === "ADMIN") return "/admin";
if (r === "POLICE") return "/police";
if (r === "MANAGER") return "/manager";
return "/citizen";
};

const handleLogout = () => {
logout();
navigate("/login");
};

const handleHomeClick = (e) => {
e.preventDefault();
if (user) navigate(roleHome(user.role));
else navigate("/");
};

return (
<motion.nav
className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm"
initial={{ y: -80, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.6, ease: "easeOut" }}
>
<div className="container-fluid">
{/* Brand remains standard link to landing page */}
<NavLink className="navbar-brand fw-bold" to="/">Crime Portal</NavLink>
<button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {/* Home redirects by role if logged in, else to landing */}
          <a href="/" className="nav-link" onClick={handleHomeClick}>
            Home
          </a>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/features">Features</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
      </ul>

      <div className="d-flex">
        {user ? (
          <motion.div whileHover={{ scale: 1.05 }}>
            <button className="btn btn-outline-light me-2" onClick={handleLogout}>
              Logout
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.05 }}>
              <NavLink className="btn btn-outline-light me-2" to="/login">
                Login
              </NavLink>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <NavLink className="btn btn-primary" to="/signup">
                Signup
              </NavLink>
            </motion.div>
          </>
        )}
      </div>
    </div>
  </div>
</motion.nav>
);
}

export default Navbar;
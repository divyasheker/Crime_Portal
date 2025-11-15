import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function NotFound() {
  const navigate = useNavigate();

  // Get user type from localStorage (set this during login)
  const userType = localStorage.getItem("userType");

  // Determine dashboard path based on role
  const dashboardPath = userType === "citizen" 
    ? "/citizen" 
    : userType === "moderator" 
    ? "/moderator" 
    : userType === "police" 
    ? "/police" 
    : userType === "admin" 
    ? "/admin" 
    : "/"; // fallback to public home

  const handleGoBack = () => {
    navigate(dashboardPath);
  };

  return (
    <motion.div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "80vh", padding: "20px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Page Not Found</h2>
      <p className="mb-4">
        Oops! The page you're looking for does not exist or has been moved.
      </p>
      <button 
        className="btn btn-primary"
        onClick={handleGoBack}
      >
        Go Back Home
      </button>
    </motion.div>
  );
}

export default NotFound;

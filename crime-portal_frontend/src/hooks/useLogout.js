// src/hooks/useLogout.js
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    // Clear session or local storage (adjust for your auth flow)
    localStorage.removeItem("userRole");
    localStorage.removeItem("authToken");

    // Redirect to login
    navigate("/login");
  };

  return logout;
}

export default useLogout;

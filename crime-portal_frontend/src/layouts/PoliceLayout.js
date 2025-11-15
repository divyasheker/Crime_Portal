import { Outlet } from "react-router-dom";
import PoliceSidebar from "../components/PoliceSidebar";

function PoliceLayout() {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div style={{ width: "250px" }}>
        <PoliceSidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default PoliceLayout;

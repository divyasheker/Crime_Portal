import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

function AdminLayout() {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div style={{ width: "250px" }}>
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;

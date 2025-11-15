import { Outlet } from "react-router-dom";
import CitizenSidebar from "../components/CitizenSidebar";

function CitizenLayout() {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <CitizenSidebar />

      {/* Main content area */}
      <div className="flex-grow-1 p-4" style={{ marginTop: "70px" }}>
        <Outlet /> {/* Render nested pages here */}
      </div>
    </div>
  );
}

export default CitizenLayout;

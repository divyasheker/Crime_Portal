// src/pages/police/PoliceResources.js
import React from "react";
import PoliceSidebar from "../../components/PoliceSidebar";

function PoliceResources() {
  return (
    <div className="d-flex">
      <PoliceSidebar />
      <div className="flex-grow-1 p-4">
        <h2>Police Resources</h2>
        <p>Access documents, guidelines, and tools helpful for police officers.</p>
      </div>
    </div>
  );
}

export default PoliceResources;

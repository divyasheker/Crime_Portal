import React from "react";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { fetchAllReports, groupByStatus, emergencySplit } from "../../utils/reportsApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PoliceAnalytics() {
const [statusCounts, setStatusCounts] = React.useState({ Pending: 0, "In Progress": 0, Resolved: 0 });
const [emSplit, setEmSplit] = React.useState({ emergency: 0, nonEmergency: 0 });
const [loading, setLoading] = React.useState(true);
const [error, setError] = React.useState("");

React.useEffect(() => {
const load = async () => {
try {
const reports = await fetchAllReports();
const statuses = groupByStatus(reports);
const em = emergencySplit(reports, 46);
setStatusCounts({
Pending: statuses["Pending"] || 0,
"In Progress": statuses["In Progress"] || 0,
Resolved: statuses["Resolved"] || 0
});
setEmSplit(em);
} catch (e) {
setError(e.message || "Failed to load reports");
} finally {
setLoading(false);
}
};
load();
}, []);

const statusData = {
labels: ["Pending", "In Progress", "Resolved"],
datasets: [
{
label: "Complaints Status",
data: [statusCounts["Pending"], statusCounts["In Progress"], statusCounts["Resolved"]],
backgroundColor: ["#f39c12", "#3498db", "#27ae60"],
},
],
};

const emergencyData = {
labels: ["Emergency (score ≥ 46)", "Non‑Emergency"],
datasets: [
{
label: "Complaints Type",
data: [emSplit.emergency, emSplit.nonEmergency],
backgroundColor: ["#e74c3c", "#3498db"],
},
],
};

const options = {
responsive: true,
maintainAspectRatio: false,
plugins: { legend: { position: "top" } },
};

if (loading) return <div className="container my-5">Loading...</div>;
if (error) return <div className="container my-5 text-danger">{error}</div>;

return (
<div className="container my-5">
<h2 className="text-center mb-4">Analytics</h2>
<div className="row justify-content-center">
<div className="col-md-6 mb-4">
<div className="card p-3 shadow-sm" style={{ height: "400px" }}>
<h5 className="text-center mb-3 fw-bold">Status of Complaints</h5>
<Bar data={statusData} options={options} />
</div>
</div>
<div className="col-md-6 mb-4">
<div className="card p-3 shadow-sm" style={{ height: "400px" }}>
<h5 className="text-center mb-3 fw-bold">Emergency vs Non‑Emergency</h5>
<Bar data={emergencyData} options={options} />
</div>
</div>
</div>
</div>
);
}

export default PoliceAnalytics;
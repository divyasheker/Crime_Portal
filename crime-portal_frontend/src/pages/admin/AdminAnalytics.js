import React from "react";
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { fetchAllReports, groupByCategory } from "../../utils/reportsApi";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminAnalytics() {
const [totalsByDept, setTotalsByDept] = React.useState({});
const [pendingByDept, setPendingByDept] = React.useState({});
const [loading, setLoading] = React.useState(true);
const [error, setError] = React.useState("");

React.useEffect(() => {
const load = async () => {
try {
const reports = await fetchAllReports();
const totals = groupByCategory(reports);
const pendingOnly = groupByCategory(reports.filter(r => (r.status || '').toLowerCase() === 'pending'));
setTotalsByDept(totals);
setPendingByDept(pendingOnly);
} catch (e) {
setError(e.message || "Failed to load reports");
} finally {
setLoading(false);
}
};
load();
}, []);

const labelsTotals = Object.keys(totalsByDept);
const dataTotals = Object.values(totalsByDept);

const labelsPending = Object.keys(pendingByDept);
const dataPending = Object.values(pendingByDept);

const colorsA = ["#3498db", "#e67e22", "#2ecc71", "#9b59b6", "#f1c40f", "#1abc9c", "#e74c3c"];
const colorsB = ["#e74c3c", "#c0392b", "#d35400", "#8e44ad", "#f39c12", "#16a085", "#2980b9"];

const totalCasesData = {
labels: labelsTotals,
datasets: [
{
label: "Total Cases",
data: dataTotals,
backgroundColor: labelsTotals.map((_, i) => colorsA[i % colorsA.length]),
borderColor: "#fff",
borderWidth: 1,
},
],
};

const pendingCasesData = {
labels: labelsPending,
datasets: [
{
label: "Pending Cases",
data: dataPending,
backgroundColor: labelsPending.map((_, i) => colorsB[i % colorsB.length]),
borderColor: "#fff",
borderWidth: 1,
},
],
};

const options = {
responsive: true,
maintainAspectRatio: false,
plugins: { legend: { position: "right" } },
};

if (loading) return <div className="container my-5">Loading...</div>;
if (error) return <div className="container my-5 text-danger">{error}</div>;

return (
<div className="container my-5">
<h2 className="text-center mb-4">Admin Analytics Dashboard</h2>
<div className="row justify-content-center">
<div className="col-md-6 mb-4">
<div className="card p-3 shadow-sm text-center" style={{ height: "400px" }}>
<h5 className="mb-3 fw-bold">Total Cases per Department</h5>
<Pie data={totalCasesData} options={options} />
</div>
</div>
<div className="col-md-6 mb-4">
<div className="card p-3 shadow-sm text-center" style={{ height: "400px" }}>
<h5 className="mb-3 fw-bold">Pending Cases per Department</h5>
<Pie data={pendingCasesData} options={options} />
</div>
</div>
</div>
</div>
);
}

export default AdminAnalytics;
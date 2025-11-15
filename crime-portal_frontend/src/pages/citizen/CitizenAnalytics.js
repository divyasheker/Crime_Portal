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
import { useAuth } from "../../context/AuthContext";
import { fetchReportsByEmail, pendingCompletedForUser } from "../../utils/reportsApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function CitizenAnalytics() {
const { user } = useAuth();
const [pending, setPending] = React.useState(0);
const [completed, setCompleted] = React.useState(0);
const [loading, setLoading] = React.useState(true);
const [error, setError] = React.useState("");

React.useEffect(() => {
const load = async () => {
if (!user?.email) { setError("User not logged in"); setLoading(false); return; }
try {
const reports = await fetchReportsByEmail(user.email);
const pc = pendingCompletedForUser(reports);
setPending(pc.pending);
setCompleted(pc.completed);
} catch (e) {
setError(e.message || "Failed to load reports");
} finally {
setLoading(false);
}
};
load();
}, [user]);

const data = {
labels: ["Pending", "Completed"],
datasets: [
{
label: "Number of Complaints",
data: [pending, completed],
backgroundColor: ["#f39c12", "#27ae60"],
},
],
};

const options = {
responsive: true,
plugins: {
legend: { position: "top" },
title: {
display: true,
text:`Complaints Analytics for ${user?.name || "You"}`,
},
},
};

if (loading) return <div className="container my-5">Loading...</div>;
if (error) return <div className="container my-5 text-danger">{error}</div>;

return (
<div className="container my-5">
<div className="row justify-content-center">
<div className="col-md-8">
<div className="card p-3 shadow-sm">
<Bar data={data} options={options} />
</div>
</div>
</div>
</div>
);
}

export default CitizenAnalytics;
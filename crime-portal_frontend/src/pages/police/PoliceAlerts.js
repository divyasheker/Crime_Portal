import { motion } from "framer-motion";

const dummyAlerts = [
  { id: 1, message: "Curfew imposed in City Center", date: "2025-09-06" },
  { id: 2, message: "Traffic diversion due to festival", date: "2025-09-07" },
];

function PoliceAlerts() {
  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="fw-bold mb-4">Manage Crime Alerts</h2>
      <ul className="list-group shadow">
        {dummyAlerts.map((alert) => (
          <li key={alert.id} className="list-group-item d-flex justify-content-between">
            <span>{alert.message}</span>
            <small className="text-muted">{alert.date}</small>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default PoliceAlerts;

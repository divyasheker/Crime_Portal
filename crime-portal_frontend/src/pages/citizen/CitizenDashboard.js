import { motion } from "framer-motion";

function CitizenDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="fw-bold mb-3">Citizen Dashboard</h2>
      <p>
        Welcome to your citizen dashboard. Here you can see quick stats, alerts,
        and shortcuts to important features.
      </p>
    </motion.div>
  );
}

export default CitizenDashboard;

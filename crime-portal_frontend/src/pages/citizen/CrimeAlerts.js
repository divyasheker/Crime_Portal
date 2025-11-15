// src/pages/citizen/CrimeAlerts.js
import React from "react";
import { motion } from "framer-motion";

const dummyAlerts = [
  {
    id: 1,
    title: "Robbery at Downtown",
    description: "A robbery was reported at Main Street. Police are investigating.",
    date: "2025-09-08",
    severity: "High",
  },
  {
    id: 2,
    title: "Suspicious Activity",
    description: "Unidentified person seen near City Park at night.",
    date: "2025-09-07",
    severity: "Medium",
  },
  {
    id: 3,
    title: "Traffic Accident",
    description: "Minor accident on 5th Avenue. No casualties reported.",
    date: "2025-09-06",
    severity: "Low",
  },
];

const severityColor = {
  High: "bg-red-500",
  Medium: "bg-yellow-400",
  Low: "bg-green-500",
};

const severityIcon = {
  High: "⚠️",
  Medium: "⚠",
  Low: "✅",
};

const CrimeAlerts = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-8">Crime Alerts</h1>
      <div className="max-w-4xl mx-auto grid gap-6">
        {dummyAlerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold mb-2">{alert.title}</h2>
              <span
                className={`text-white text-sm px-2 py-1 rounded flex items-center gap-1 ${severityColor[alert.severity]}`}
              >
                {severityIcon[alert.severity]} {alert.severity}
              </span>
            </div>
            <p className="text-gray-700 mb-2">{alert.description}</p>
            <span className="text-sm text-gray-500">
              {new Date(alert.date).toLocaleDateString()}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CrimeAlerts;

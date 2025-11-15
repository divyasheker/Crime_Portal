import { motion } from "framer-motion";

function Features() {
  const features = [
    {
      title: "Crime Data Visualization",
      description: "Charts, graphs, and maps for clear insights into crime patterns.",
      delay: 0.1,
    },
    {
      title: "Predictive Analysis",
      description: "AI models to forecast hotspots and unusual crime spikes.",
      delay: 0.2,
    },
    {
      title: "Interactive Maps",
      description: "Geo-mapped heatmaps for location-based crime tracking.",
      delay: 0.3,
    },
    {
      title: "User Reports",
      description: "Citizens can submit verified reports to help investigations.",
      delay: 0.4,
    },
  ];

  return (
    <div className="container my-5">
      {/* Title */}
      <motion.h2
        className="text-center mb-5 fw-bold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Key Features
      </motion.h2>

      {/* Features Grid */}
      <div className="row">
        {features.map((feature, index) => (
          <div key={index} className="col-md-3 mb-4">
            <motion.div
              className="card shadow-sm p-4 text-center h-100 border-0 rounded"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ scale: 1.05 }}
            >
              <h5 className="fw-bold">{feature.title}</h5>
              <p className="text-muted small">{feature.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;

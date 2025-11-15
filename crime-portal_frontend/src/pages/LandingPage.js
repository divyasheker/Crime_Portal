import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-5 bg-light">
        <motion.h1
          className="display-4 fw-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to Crime Analysis Portal
        </motion.h1>

        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Empowering citizens with AI-driven insights for a safer tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/signup" className="btn btn-primary btn-lg mt-3 shadow-lg">
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Features Preview */}
      <section className="container my-5">
        <div className="row">
          {[
            {
              title: "Report Incidents",
              text: "Easily report crimes in your locality with verified details.",
              delay: 0.2,
            },
            {
              title: "Crime Awareness",
              text: "Stay updated with latest alerts and safety guidelines.",
              delay: 0.4,
            },
            {
              title: "Data Insights",
              text: "Visualize and analyze patterns with AI-powered analytics.",
              delay: 0.6,
            },
          ].map((feature, idx) => (
            <div className="col-md-4" key={idx}>
              <motion.div
                className="card shadow-sm p-4 border-0 rounded-3 h-100"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="fw-bold">{feature.title}</h4>
                <p>{feature.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

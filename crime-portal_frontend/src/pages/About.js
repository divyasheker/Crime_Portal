import { motion } from "framer-motion";

function About() {
  return (
    <div className="container my-5">
      {/* Heading */}
      <motion.h2
        className="text-center mb-4 fw-bold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h2>

      {/* Intro */}
      <motion.p
        className="lead text-center text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        The Crime Analysis Portal is designed to assist citizens and law enforcement
        by providing tools to analyze, visualize, and predict crime patterns.
      </motion.p>

      {/* Mission & Vision */}
      <div className="row mt-5">
        <div className="col-md-6">
          <motion.div
            className="p-4 shadow-sm rounded bg-light h-100"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="fw-bold">Our Mission</h4>
            <p>
              To improve public safety by combining modern technology, data
              analytics, and AI/ML models for proactive crime prevention.
            </p>
          </motion.div>
        </div>

        <div className="col-md-6">
          <motion.div
            className="p-4 shadow-sm rounded bg-light h-100"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <h4 className="fw-bold">Our Vision</h4>
            <p>
              A safer society where data empowers better decision-making and
              ensures transparency in crime reporting and analysis.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;

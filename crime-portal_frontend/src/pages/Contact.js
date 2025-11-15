import { motion } from "framer-motion";

function Contact() {
  return (
    <div className="container my-5">
      {/* Title */}
      <motion.h2
        className="text-center mb-4 fw-bold"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h2>

      {/* Contact Form Centered */}
      <motion.div
        className="col-md-8 col-lg-6 mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <form className="p-4 shadow-sm bg-light rounded">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
              <input type="text" className="form-control" placeholder="Your Name" />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
              <input type="email" className="form-control" placeholder="Your Email" />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-send-fill me-2"></i> Send Message
          </button>
        </form>
      </motion.div>

      {/* Contact Info Below */}
      <motion.div
        className="text-center mt-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p>
          <i className="bi bi-envelope-fill text-primary me-2"></i>
          support@crimeportal.com
        </p>
        <p>
          <i className="bi bi-telephone-fill text-success me-2"></i>
          +91 98765 43210
        </p>
        <p>
          <i className="bi bi-geo-alt-fill text-danger me-2"></i>
          Hyderabad, India
        </p>
      </motion.div>
    </div>
  );
}

export default Contact;

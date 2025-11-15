import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      className="bg-dark text-light py-2 shadow-sm"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        
        {/* Left: Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="fw-bold">Crime Analysis Portal</span>
        </motion.div>

        {/* Center: Quick Links */}
        <motion.div
          className="my-2 my-md-0"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {["Home", "About", "Features", "Contact"].map((item, idx) => (
            <Link
              key={idx}
              className="text-light text-decoration-none mx-2"
              to={`/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          ))}
        </motion.div>

        {/* Right: Socials */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {["facebook", "twitter", "linkedin"].map((icon, idx) => (
            <motion.a
              key={idx}
              href="#"
              className="text-light mx-1 fs-5"
              whileHover={{ scale: 1.2 }}
            >
              <i className={`bi bi-${icon}`}></i>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom note */}
      <div className="text-center mt-2">
        <small>© 2025 Crime Analysis Portal | All Rights Reserved</small>
      </div>
    </motion.footer>
  );
}

export default Footer;

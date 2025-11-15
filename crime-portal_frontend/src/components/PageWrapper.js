// src/components/PageWrapper.js
import { motion } from "framer-motion";

/**
 * PageWrapper
 * Wraps a page component to add smooth enter/exit animations.
 *
 * Props:
 * - children: The page component to render
 */
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // Start slightly below and invisible
      animate={{ opacity: 1, y: 0 }}    // Animate to visible and in place
      exit={{ opacity: 0, y: -20 }}     // Exit animation (slide up & fade out)
      transition={{ duration: 0.5, ease: "easeInOut" }}  // Smooth timing
      style={{ minHeight: "80vh" }}     // Ensure some vertical space
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;

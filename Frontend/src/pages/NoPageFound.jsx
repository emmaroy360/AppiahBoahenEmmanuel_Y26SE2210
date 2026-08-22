import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NoPageFound() {
  return (
    <motion.section
      className="page denied"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1
        className="code-404"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
      >
        404
      </motion.h1>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist or was moved.</p>
      <Link to="/" className="text-link">
        Back to Home
      </Link>
    </motion.section>
  );
}

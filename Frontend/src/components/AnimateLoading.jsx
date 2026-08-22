import { motion } from "framer-motion";

export default function AnimateLoading({ label = "Loading..." }) {
  return (
    <div className="loading-wrap">
      <motion.div
        className="loading-ring"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
      />
      <motion.p
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        {label}
      </motion.p>
    </div>
  );
}

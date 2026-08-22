import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function YouCantAccessPageRedirect() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(
      () => setCountdown((current) => current - 1),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  if (countdown <= 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <motion.section
      className="page denied"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="denied-badge"
        animate={{ rotate: [0, -6, 6, -4, 0] }}
        transition={{ repeat: Infinity, repeatDelay: 1.2, duration: 0.9 }}
      >
        <svg viewBox="0 0 24 24" width="54" height="54" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      </motion.div>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <p className="countdown">
        Redirecting you home in <strong>{Math.max(countdown, 0)}</strong>...
      </p>
    </motion.section>
  );
}

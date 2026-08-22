import { motion } from "framer-motion";

export default function CustomButton({ loading, children, className = "", ...props }) {
  const disabled = props.disabled || loading;

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.04 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`btn ${className}`}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn-spinner" />
          Please wait...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}

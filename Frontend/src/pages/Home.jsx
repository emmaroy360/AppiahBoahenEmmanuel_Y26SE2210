import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";

export default function Home() {
  const { user } = useAuth();

  return (
    <motion.section
      className="page home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
    >
      <div className="hero">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {["Manage", "users", "with", "confidence."].map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 120, damping: 14 },
                },
              }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          Welcome to our user management platform, where you can effortlessly manage and organize your users with ease and efficiency.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          {user ? (
            <Link to="/profile">
              <CustomButton className="btn-primary">Go to Profile</CustomButton>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <CustomButton className="btn-primary">Get Started</CustomButton>
              </Link>
              <Link to="/login">
                <CustomButton className="btn-ghost">Log In</CustomButton>
              </Link>
            </>
          )}
        </motion.div>
      </div>

      <motion.div
        className="feature-grid"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
        }}
      >
        {[
          {
            title: "Card 1",
            text: "....",
          },
          {
            title: "Card 2",
            text: "....",
          },
          {
            title: "Card 3",
            text: ".....",
          },
        ].map((f) => (
          <motion.article
            key={f.title}
            className="card feature"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -6 }}
          >
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}

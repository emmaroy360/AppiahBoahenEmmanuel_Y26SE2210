import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import CustomInputField from "../components/CustomInputField";
import CustomButton from "../components/CustomButton";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="page narrow"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
    >
      <h1>Welcome back</h1>
      <p className="lede">Log in to access your profile.</p>

      <motion.form
        className="card form-card"
        onSubmit={handleSubmit}
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        noValidate
      >
        <CustomInputField
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <CustomInputField
          label="Password"
          type="password"
          name="password"
          placeholder="Your password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="form-error">{error}</p>}

        <CustomButton type="submit" loading={loading} className="btn-primary full">
          Log In
        </CustomButton>

        <p className="form-alt">
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </motion.form>
    </motion.section>
  );
}

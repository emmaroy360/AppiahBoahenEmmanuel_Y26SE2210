import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import CustomInputField from "../components/CustomInputField";
import CustomButton from "../components/CustomButton";

const initialForm = {
  usrname: "",
  firstname: "",
  surname: "",
  email: "",
  password: "",
};

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
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
      await register(form);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
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
      <h1>Create account</h1>
      <p className="lede">Join us &mdash; it only takes a minute.</p>

      <motion.form
        className="card form-card"
        onSubmit={handleSubmit}
        initial={{ scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        noValidate
      >
        <CustomInputField
          label="Username"
          type="text"
          name="usrname"
          placeholder="janedoe"
          value={form.usrname}
          onChange={handleChange}
          required
        />
        <div className="field-row">
          <CustomInputField
            label="Firstname"
            type="text"
            name="firstname"
            placeholder="Jane"
            value={form.firstname}
            onChange={handleChange}
            required
          />
          <CustomInputField
            label="Surname"
            type="text"
            name="surname"
            placeholder="Doe"
            value={form.surname}
            onChange={handleChange}
            required
          />
        </div>
        <CustomInputField
          label="Email"
          type="email"
          name="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <CustomInputField
          label="Password"
          type="password"
          name="password"
          placeholder="Minimum 6 characters"
          minLength="6"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="form-error">{error}</p>}

        <CustomButton type="submit" loading={loading} className="btn-primary full">
          Sign Up
        </CustomButton>

        <p className="form-alt">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </motion.form>
    </motion.section>
  );
}

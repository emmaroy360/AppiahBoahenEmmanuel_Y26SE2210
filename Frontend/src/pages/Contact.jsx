import { useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import CustomInputField from "../components/CustomInputField";
import CustomButton from "../components/CustomButton";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/contact", form);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Could not send message.");
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
      <h1>Contact us</h1>
      <p className="lede">Send a message straight to our inbox.</p>

      {sent ? (
        <motion.div
          className="card success-card"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <div className="success-tick">&#10003;</div>
          <h2>Message sent!</h2>
          <p>We will get back to you shortly.</p>
        </motion.div>
      ) : (
        <form className="card form-card" onSubmit={handleSubmit} noValidate>
          <CustomInputField
            label="Name"
            type="text"
            name="name"
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
          <CustomInputField
            label="Email"
            type="email"
            name="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="input-field">
            <span>Message</span>
            <textarea
              name="message"
              rows="5"
              placeholder="How can we help?"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <CustomButton type="submit" loading={loading} className="btn-primary full">
            Send Message
          </CustomButton>
        </form>
      )}
    </motion.section>
  );
}

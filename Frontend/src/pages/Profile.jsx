import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import AnimateLoading from "../components/AnimateLoading";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    api
      .get("/profile")
      .then((res) => mounted && setProfile(res.data.user))
      .catch(
        (err) =>
          mounted &&
          setError(err.response?.data?.message || "Could not load profile.")
      )
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <AnimateLoading label="Loading your profile..." />;

  if (error) {
    return (
      <section className="page narrow center">
        <p className="form-error">{error}</p>
        <CustomButton onClick={logout}>Log out</CustomButton>
      </section>
    );
  }

  const initials =
    `${profile?.firstname?.[0] || ""}${profile?.surname?.[0] || ""}`.toUpperCase();

  return (
    <motion.section
      className="page narrow"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className="card profile-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div
          className="avatar"
          whileHover={{ rotate: 6, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {initials || "U"}
        </motion.div>

        <h2>
          {profile?.firstname} {profile?.surname}
        </h2>
        <span className={`role-badge role-${user?.role}`}>
          {(user?.role || "user").toUpperCase()}
        </span>

        <dl className="profile-details">
          <div>
            <dt>Username</dt>
            <dd>{profile?.usrname}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{profile?.email}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              <span className={profile?.active ? "dot on" : "dot off"} />
              {profile?.active ? "Active" : "Inactive"}
            </dd>
          </div>
          <div>
            <dt>Member since</dt>
            <dd>
              {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "-"}
            </dd>
          </div>
        </dl>

        <CustomButton className="btn-danger" onClick={logout}>
          Log Out
        </CustomButton>
      </motion.div>
    </motion.section>
  );
}

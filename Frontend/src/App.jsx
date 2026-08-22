import { Routes, Route, NavLink, Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import YouCantAccessPageRedirect from "./components/YouCantAccessPageRedirect";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NoPageFound from "./pages/NoPageFound";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="navbar">
        <Link to="/" className="brand">
          My<span>App</span>
        </Link>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user ? (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <button className="nav-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register" className="nav-cta">
                Register
              </NavLink>
            </>
          )}
        </nav>
      </header>

      <main className="main">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/unauthorized" element={<YouCantAccessPageRedirect />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

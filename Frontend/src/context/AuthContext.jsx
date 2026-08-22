import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { decodeJwt } from "../utils/jwt";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const payload = decodeJwt(token);
        if (payload?.exp && payload.exp * 1000 > Date.now()) {
          setUser({
            id: payload.id,
            email: payload.email,
            role: payload.role || "user",
          });
        }
      }
      setBooting(false);
    };
    initAuth();
  }, []);

  const persistSession = (data) => {
    localStorage.setItem("token", data.token);
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    const payload = decodeJwt(data.token) || {};
    setUser({
      id: payload.id,
      email: payload.email,
      role: payload.role || "user",
    });
  };

  const login = async (email, password) => {
    const { data } = await api.post("/login", { email, password });
    persistSession(data);
    return data;
  };

  const register = async (formData) => {
    const { data } = await api.post("/register", formData);
    persistSession(data);

    api
      .post("/welcome-mailer", {
        email: formData.email,
        firstname: formData.firstname,
      })
      .catch(() => {});

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, booting, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

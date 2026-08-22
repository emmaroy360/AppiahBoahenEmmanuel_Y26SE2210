import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AnimateLoading from "./AnimateLoading";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, booting } = useAuth();
  const location = useLocation();

  if (booting) {
    return <AnimateLoading label="Checking your session..." />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles?.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// strore-rating-platform/frontend/src/routes/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  // Wait until AuthContext finishes checking localStorage
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // User is not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // User role is not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // User is authorized
  return children;
}

export default ProtectedRoute;
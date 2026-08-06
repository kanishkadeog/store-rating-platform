// store-rating-platform/frontend/src/routes/PublicRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // If user is already logged in, redirect based on role
  if (user) {
    switch (user.role) {
      case "ADMIN":
        return <Navigate to="/admin/dashboard" replace />;

      case "OWNER":
        return <Navigate to="/owner/dashboard" replace />;

      default:
        return <Navigate to="/user/dashboard" replace />;
    }
  }

  // User is not logged in, allow access
  return children;
}

export default PublicRoute;
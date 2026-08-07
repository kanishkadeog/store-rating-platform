// store-rating-platform/frontend/src/routes/AppRoutes.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";

import UserDashboard from "../pages/user/UserDashboard";
import OwnerDashboard from "../pages/owner/OwnerDashboard";

import UserDetails from "../pages/admin/UserDetails";
import EditUser from "../pages/admin/EditUser";

import Stores from "../pages/admin/Stores";
import StoreDetails from "../pages/admin/StoreDetails";

import CreateUser from "../pages/admin/CreateUser";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
  path="/"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>
       
        <Route
  path="/register"
  element={
    <PublicRoute>
      <Register />
    </PublicRoute>
  }
/>

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/users"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Users />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users/create"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <CreateUser />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users/:id"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <UserDetails />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/users/edit/:id"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <EditUser />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/stores"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <Stores />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/stores/:id"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <StoreDetails />
    </ProtectedRoute>
  }
/>

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Owner Routes */}
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
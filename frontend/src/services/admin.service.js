// store-rating-platform/frontend/src/services/admin.service.js

//everything related to admin will be added to separated files

import api from "../api/axios";

/**
 * Get Admin Dashboard Statistics
 */
export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");

  return response.data;
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  const response = await api.get("/admin/users");

  return response.data;
};

/**
 * Get user by ID
 */
export const getUserById = async (id) => {
  const response = await api.get(`/admin/users/${id}`);

  return response.data;
};

/**
 * Update User
 */
export const updateUser = async (id, data) => {
  const response = await api.put(
    `/admin/users/${id}`,
    data
  );

  return response.data;
};

/**
 * Delete User
 */
export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);

  return response.data;
};

/**
 * Create User
 */
export const createUser = async (data) => {
  const response = await api.post("/admin/users", data);

  return response.data;
};

/**
 * Get all owners
 */
export const getAllOwners = async () => {
  const response = await api.get("/admin/owners");

  return response.data;
};

/**
 * Create Store
 */
export const createStore = async (data) => {
  const response = await api.post("/admin/stores", data);

  return response.data;
};
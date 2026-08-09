//store-rating-platform/frontend/src/services/user.service.js

import api from "../api/axios";

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
 * Update user
 */
export const updateUser = async (id, data) => {
  const response = await api.put(
    `/admin/users/${id}`,
    data
  );

  return response.data;
};

/**
 * Delete user
 */
export const deleteUser = async (id) => {
  const response = await api.delete(
    `/admin/users/${id}`
  );

  return response.data;
};



/**
 * Get all stores
 */
export const getAllStores = async (params) => {
  const response = await api.get("/user/stores", {
    params,
  });

  return response.data;
};
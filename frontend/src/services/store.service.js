//store-rating-platform/frontend/src/services/store.service.js

import api from "../api/axios";

/**
 * Get all stores
 */
// export const getAllStores = async () => {
//   const response = await api.get("/admin/stores");

//   return response.data;
// };
export const getAllStores = async (params = {}) => {
  const response = await api.get("/admin/stores", {
    params,
  });
  return response.data;
};

/**
 * Get Store By ID
 */
export const getStoreById = async (id) => {
  const response = await api.get(`/admin/stores/${id}`);

  return response.data;
};
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
  return await api.get("/admin/stores", {
    params,
  });
};

/**
 * Get Store By ID
 */
export const getStoreById = async (id) => {
  const response = await api.get(`/admin/stores/${id}`);

  return response.data;
};
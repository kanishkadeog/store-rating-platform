//store-rating-platform/frontend/src/services/store.service.js

import api from "../api/axios";

/**
 * Get all stores
 */
export const getAllStores = async () => {
  const response = await api.get("/admin/stores");

  return response.data;
};
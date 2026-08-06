//store-rating-platform/frontend/src/services/dashboard.service.js

import api from "../api/axios";

/**
 * Get Admin Dashboard Statistics
 */
export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");

  return response.data;
};
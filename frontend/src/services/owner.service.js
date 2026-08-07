//store-rating-platform/frontend/src/services/owner.service.js

import api from "../api/axios";

/**
 * Get Owner Dashboard
 */
export const getOwnerDashboard = async () => {
  const response = await api.get("/owner/dashboard");

  return response.data;
};

/**
 * Get Store Ratings
 */
export const getStoreRatings = async (
  page = 1,
  search = ""
) => {
  const response = await api.get("/owner/ratings", {
    params: {
      page,
      search,
    },
  });

  return response.data;
};
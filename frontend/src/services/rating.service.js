//store-rating-platform/frontend/src/services/rating.service.js

// store-rating-platform/frontend/src/services/rating.service.js

import api from "../api/axios";

/**
 * Submit a rating for a store
 */
export const createRating = async (data) => {
  const response = await api.post(
    "/ratings",
    data
  );

  return response.data;
};

/**
 * Get ratings submitted by logged-in user
 */
export const getMyRatings = async () => {
  const response = await api.get(
    "/ratings/my"
  );

  return response.data;
};

/**
 * Update existing rating
 */
export const updateRating = async (
  storeId,
  data
) => {
  const response = await api.put(
    `/ratings/${storeId}`,
    data
  );

  return response.data;
};
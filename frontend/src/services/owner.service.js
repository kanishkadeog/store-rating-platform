//store-rating-platform/frontend/src/services/owner.service.js

import api from "../api/axios";


/**
 * =====================================================
 * GET OWNER DASHBOARD
 * =====================================================
 */
export const getOwnerDashboard =
  async ({
    page = 1,
    limit = 5,
    search = "",
    sortBy = "name",
    sortOrder = "ASC",
  } = {}) => {

    const response =
      await api.get(
        "/owner/dashboard",
        {
          params: {
            page,
            limit,
            search,
            sortBy,
            sortOrder,
          },
        }
      );

    return response.data;
  };


/**
 * =====================================================
 * GET OWNER STORE RATINGS
 * =====================================================
 */
export const getStoreRatings =
  async ({
    page = 1,
    limit = 5,
    search = "",
    sortBy = "createdAt",
    sortOrder = "DESC",
  } = {}) => {

    const response =
      await api.get(
        "/owner/ratings",
        {
          params: {
            page,
            limit,
            search,
            sortBy,
            sortOrder,
          },
        }
      );

    return response.data;
  };
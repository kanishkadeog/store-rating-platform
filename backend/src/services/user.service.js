//store-rating-platform/backend/src/services/user.service.js

// backend/src/services/user.service.js

const userRepository = require("../repositories/user.repository");

/**
 * Get all stores for normal users
 */
const getAllStores = async (userId, query) => {
  const result = await userRepository.getAllStores(
    userId,
    query
  );

  return {
    total: result.total,
    currentPage: result.currentPage,
    totalPages: result.totalPages,

    stores: result.stores.map((store) => ({
      // =====================================================
      // STORE DETAILS
      // =====================================================

      id: store.id,

      name: store.name,

      email: store.email,

      address: store.address,

      // =====================================================
      // AVERAGE RATING
      // =====================================================

      averageRating: Number(
        store.dataValues.averageRating || 0
      ).toFixed(1),

      // =====================================================
      // STORE OWNER
      // =====================================================

      owner: store.owner
        ? {
            id: store.owner.id,
            name: store.owner.name,
            email: store.owner.email,
          }
        : null,
    })),
  };
};

module.exports = {
  getAllStores,
};
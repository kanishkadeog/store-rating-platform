//store-rating-platform/backend/src/services/owner.service.js

const ownerRepository = require("../repositories/owner.repository");

const getDashboard = async (ownerId) => {
  const dashboard = await ownerRepository.getDashboard(ownerId);

  if (!dashboard) {
    throw new Error("Store not found");
  }

  return {
    store: {
      id: dashboard.id,
      name: dashboard.name,
      email: dashboard.email,
      address: dashboard.address,
    },
    averageRating: Number(
      dashboard.dataValues.averageRating || 0
    ).toFixed(1),
    totalRatings: Number(
      dashboard.dataValues.totalRatings || 0
    ),
  };
};

const getStoreRatings = async (ownerId, query) => {
  const result = await ownerRepository.getStoreRatings(
    ownerId,
    query
  );

  if (!result) {
    throw new Error("Store not found");
  }

  return {
    total: result.total,
    currentPage: result.currentPage,
    totalPages: result.totalPages,

   ratings: result.ratings.map((item) => ({
  id: item.id,
  rating: item.rating,
  createdAt: item.createdAt,

  user: {
    id: item.user.id,
    name: item.user.name,
    email: item.user.email,
  },
})),
  };
};

module.exports = {
  getDashboard,
  getStoreRatings,
};
//store-rating-platform/backend/src/services/store.service.js

const storeRepository = require("../repositories/store.repository");
const ratingRepository = require("../repositories/rating.repository");

const getAllStores = async (query, userId) => {

  // Step 1: Get stores
  const storeData = await storeRepository.getStores(query);

  const stores = storeData.stores;

  // No stores found
  if (stores.length === 0) {
    return storeData;
  }

  // Step 2: Extract store IDs
  const storeIds = stores.map((store) => store.id);

  // Step 3: Get average ratings and user ratings
  const [averageRatings, userRatings] = await Promise.all([
    ratingRepository.getAverageRatings(storeIds),
    ratingRepository.getUserRatings(storeIds, userId),
  ]);

  // Step 4: Convert arrays to maps for fast lookup
  const averageRatingMap = {};

  averageRatings.forEach((item) => {
    averageRatingMap[item.storeId] = Number(item.averageRating).toFixed(1);
  });

  const userRatingMap = {};

  userRatings.forEach((item) => {
    userRatingMap[item.storeId] = item.rating;
  });

  // Step 5: Merge ratings into each store
  const updatedStores = stores.map((store) => {

    const plainStore = store.toJSON();

    return {
      ...plainStore,

      averageRating:
        averageRatingMap[store.id] || "0.0",

      userRating:
        userRatingMap[store.id] || null,
    };
  });

  // Step 6: Return final response
  return {
    ...storeData,
    stores: updatedStores,
  };
};

module.exports = {
  getAllStores,
};

//===========================================


// const storeRepository = require("../repositories/store.repository");

// const getAllStores = async (query, userId) => {
//   return await storeRepository.getStores(query, userId);
// };

// module.exports = {
//   getAllStores,
// };
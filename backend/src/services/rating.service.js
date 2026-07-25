//store-rating-platform/backend/src/services/rating.service.js


const ratingRepository = require("../repositories/rating.repository");
const storeRepository = require("../repositories/store.repository");

const createRating = async (userId, data) => {

  // Check whether store exists
  const store = await storeRepository.findStoreById(data.storeId);

  if (!store) {
    throw new Error("Store not found");
  }

  // Check whether user has already rated this store
  const existingRating =
    await ratingRepository.findRatingByUserAndStore(
      userId,
      data.storeId
    );

  if (existingRating) {
    throw new Error("You have already rated this store");
  }

  // Create rating
  const rating =
    await ratingRepository.createRating({
      userId,
      storeId: data.storeId,
      rating: data.rating,
    });

  return rating;
};

const updateRating = async (userId, storeId, data) => {

  // Check whether store exists
  const store = await storeRepository.findStoreById(storeId);

  if (!store) {
    throw new Error("Store not found");
  }

  // Find existing rating
  const existingRating =
    await ratingRepository.findRatingByUserAndStore(
      userId,
      storeId
    );

  if (!existingRating) {
    throw new Error("Rating not found");
  }

  // Update rating
  const updatedRating =
    await ratingRepository.updateRating(
      existingRating,
      data.rating
    );

  return updatedRating;
};

const getMyRatings = async (userId) => {

  const ratings = await ratingRepository.getMyRatings(userId);

  return ratings.map((item) => ({
    storeId: item.store.id,
    storeName: item.store.name,
    address: item.store.address,
    rating: item.rating,
  }));

};

module.exports = {
  createRating,
  updateRating,
  getMyRatings,
};
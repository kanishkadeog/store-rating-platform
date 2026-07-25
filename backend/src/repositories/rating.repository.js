//store-rating-platform/backend/src/repositories/rating.repository.js

const { Rating, Store } = require("../models");
const { Op, fn, col } = require("sequelize");

/**
 * Check whether a user has submitted any ratings.
 */
const hasUserRatings = async (userId) => {
  const count = await Rating.count({
    where: {
      userId,
    },
  });

  return count > 0;
};

/**
 * Get average rating for a store.
 */
const getAverageRating = async (storeId) => {
  const result = await Rating.findOne({
    attributes: [
      [fn("AVG", col("rating")), "averageRating"],
    ],
    where: {
      storeId,
    },
    raw: true,
  });

  return Number(result.averageRating || 0).toFixed(1);
};

/**
 * Get the logged-in user's rating for a store.
 */
const getUserRating = async (storeId, userId) => {
  const rating = await Rating.findOne({
    where: {
      storeId,
      userId,
    },
  });

  return rating ? rating.rating : null;
};

/**
 * Get average ratings for multiple stores.
 */
const getAverageRatings = async (storeIds) => {
  const ratings = await Rating.findAll({
    attributes: [
      "storeId",
      [fn("AVG", col("rating")), "averageRating"],
    ],
    where: {
      storeId: {
        [Op.in]: storeIds,
      },
    },
    group: ["storeId"],
    raw: true,
  });

  return ratings;
};

/**
 * Get logged-in user's ratings for multiple stores.
 */
const getUserRatings = async (storeIds, userId) => {
  const ratings = await Rating.findAll({
    attributes: ["storeId", "rating"],
    where: {
      userId,
      storeId: {
        [Op.in]: storeIds,
      },
    },
    raw: true,
  });

  return ratings;
};

/**
 * Find a rating by user and store.
 */
const findRatingByUserAndStore = async (userId, storeId) => {
  return await Rating.findOne({
    where: {
      userId,
      storeId,
    },
  });
};

/**
 * Create a new rating.
 */
const createRating = async (data) => {
  return await Rating.create(data);
};

const updateRating = async (rating, newRating) => {
  rating.rating = newRating;
  await rating.save();

  return rating;
};

/**
 * Get all ratings submitted by a user.
 */
const getMyRatings = async (userId) => {
  return await Rating.findAll({
    where: {
      userId,
    },

    attributes: ["rating"],

    include: [
      {
        model: Store,
        as: "store",
        attributes: ["id", "name", "address"],
      },
    ],

    order: [["createdAt", "DESC"]],
  });
};

module.exports = {
  hasUserRatings,
  getAverageRating,
  getUserRating,
  getAverageRatings,
  getUserRatings,
  findRatingByUserAndStore,
  createRating,
  updateRating,
  getMyRatings,
};
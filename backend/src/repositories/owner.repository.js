// store-rating-platform/backend/src/repositories/owner.repository.js

const { Store, Rating, User } = require("../models");
const { fn, col, Op } = require("sequelize");

/**
 * Get dashboard details for the logged-in store owner.
 */
const getDashboard = async (ownerId) => {
  return await Store.findOne({
    where: {
      ownerId,
    },

    subQuery: false,

    attributes: [
      "id",
      "name",
      "email",
      "address",
      [
        fn("AVG", col("ratings.rating")),
        "averageRating",
      ],
      [
        fn("COUNT", col("ratings.id")),
        "totalRatings",
      ],
    ],

    include: [
      {
        model: Rating,
        as: "ratings",
        attributes: [],
      },
    ],

    group: ["Store.id"],
  });
};

/**
 * Get all users who rated the owner's store.
 */
const getStoreRatings = async (ownerId, query) => {

  const {
    page = 1,
    limit = 10,
    search = "",
  } = query;

  const offset = (Number(page) - 1) * Number(limit);

  const store = await Store.findOne({
    where: {
      ownerId,
    },
  });

  if (!store) {
    return null;
  }

  const { rows, count } = await Rating.findAndCountAll({
    where: {
      storeId: store.id,
    },

    // attributes: ["rating"],
    attributes: [
  "id",
  "rating",
  "createdAt",
],

    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name", "email"],

        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        },
      },
    ],

    limit: Number(limit),
    offset,

    order: [["createdAt", "DESC"]],
  });

  return {
    total: count,
    currentPage: Number(page),
    totalPages: Math.ceil(count / Number(limit)),
    ratings: rows,
  };
};

module.exports = {
  getDashboard,
  getStoreRatings,
};
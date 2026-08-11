// store-rating-platform/backend/src/repositories/owner.repository.js

const {
  Store,
  Rating,
  User,
} = require("../models");

const {
  fn,
  col,
  Op,
} = require("sequelize");

/**
 * =====================================================
 * GET OWNER DASHBOARD
 * =====================================================
 *
 * Returns ALL stores belonging to the logged-in owner.
 *
 * Previously:
 * Store.findOne()
 *
 * That was the reason only one store appeared.
 *
 * Now:
 * Store.findAndCountAll()
 *
 * returns all stores owned by the owner.
 */
const getDashboard = async (ownerId, query = {}) => {

  const {
    page = 1,
    limit = 5,
    search = "",
    sortBy = "name",
    sortOrder = "ASC",
  } = query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const offset =
    (pageNumber - 1) * limitNumber;


  // =====================================================
  // SEARCH
  // =====================================================

  const searchCondition = search
    ? {
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

          {
            address: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      }
    : {};


  // =====================================================
  // ALLOWED SORT COLUMNS
  // =====================================================

  const allowedSortFields = [
    "name",
    "email",
    "address",
  ];

  const safeSortBy =
    allowedSortFields.includes(sortBy)
      ? sortBy
      : "name";


  const safeSortOrder =
    String(sortOrder).toUpperCase() === "DESC"
      ? "DESC"
      : "ASC";


  // =====================================================
  // FETCH STORES
  // =====================================================

  const result =
    await Store.findAndCountAll({

      where: {
        ownerId,

        ...searchCondition,
      },

      attributes: [
        "id",
        "name",
        "email",
        "address",

        [
          fn(
            "COALESCE",
            fn(
              "AVG",
              col("ratings.rating")
            ),
            0
          ),
          "averageRating",
        ],

        [
          fn(
            "COUNT",
            col("ratings.id")
          ),
          "totalRatings",
        ],
      ],

      include: [
        {
          model: Rating,

          as: "ratings",

          attributes: [],

          required: false,
        },
      ],

      group: ["Store.id"],

      order: [
        [safeSortBy, safeSortOrder],
      ],

      limit: limitNumber,

      offset,

      subQuery: false,
    });


  // =====================================================
  // COUNT
  // =====================================================

  const stores = result.rows || [];

  const total =
    Array.isArray(result.count)
      ? result.count.length
      : Number(result.count);


  return {
    stores,
    total,
    currentPage: pageNumber,
    totalPages: Math.ceil(
      total / limitNumber
    ),
  };
};


/**
 * =====================================================
 * GET OWNER STORE RATINGS
 * =====================================================
 *
 * IMPORTANT:
 *
 * Previously this used findOne() to get
 * only one owner's store.
 *
 * Now ratings are fetched for ALL stores
 * belonging to this owner.
 */
const getStoreRatings = async (
  ownerId,
  query
) => {

  const {
    page = 1,
    limit = 5,
    search = "",
    sortBy = "createdAt",
    sortOrder = "DESC",
  } = query;


  const pageNumber =
    Number(page);

  const limitNumber =
    Number(limit);

  const offset =
    (pageNumber - 1) * limitNumber;


  // =====================================================
  // GET ALL OWNER STORE IDs
  // =====================================================

  const ownerStores =
    await Store.findAll({

      where: {
        ownerId,
      },

      attributes: [
        "id",
      ],

      raw: true,
    });


  const storeIds =
    ownerStores.map(
      (store) => store.id
    );


  // Owner has no stores
  if (storeIds.length === 0) {

    return {
      total: 0,
      currentPage: pageNumber,
      totalPages: 0,
      ratings: [],
    };
  }


  // =====================================================
  // SEARCH
  // =====================================================

  const whereCondition = {
    storeId: {
      [Op.in]: storeIds,
    },
  };


  // =====================================================
  // ALLOWED SORTING
  // =====================================================

  const allowedSortFields = [
    "rating",
    "createdAt",
  ];


  const safeSortBy =
    allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";


  const safeSortOrder =
    String(sortOrder).toUpperCase() === "ASC"
      ? "ASC"
      : "DESC";


  // =====================================================
  // FETCH RATINGS
  // =====================================================

  const result =
    await Rating.findAndCountAll({

      where: whereCondition,

      attributes: [
        "id",
        "rating",
        "createdAt",
        "storeId",
      ],

      include: [

        // =================================================
        // USER
        // =================================================

        {
          model: User,

          as: "user",

          attributes: [
            "id",
            "name",
            "email",
          ],

          where: search
            ? {
                [Op.or]: [

                  {
                    name: {
                      [Op.like]:
                        `%${search}%`,
                    },
                  },

                  {
                    email: {
                      [Op.like]:
                        `%${search}%`,
                    },
                  },
                ],
              }
            : undefined,
        },

        // =================================================
        // STORE
        // =================================================

        {
          model: Store,

          as: "store",

          attributes: [
            "id",
            "name",
            "email",
            "address",
          ],

          where: search
            ? {
                [Op.or]: [

                  {
                    name: {
                      [Op.like]:
                        `%${search}%`,
                    },
                  },

                  {
                    email: {
                      [Op.like]:
                        `%${search}%`,
                    },
                  },

                  {
                    address: {
                      [Op.like]:
                        `%${search}%`,
                    },
                  },
                ],
              }
            : undefined,
        },
      ],

      limit: limitNumber,

      offset,

      order: [
        [
          safeSortBy,
          safeSortOrder,
        ],
      ],

      distinct: true,
    });


  return {
    total: result.count,

    currentPage:
      pageNumber,

    totalPages:
      Math.ceil(
        result.count /
          limitNumber
      ),

    ratings:
      result.rows,
  };
};


module.exports = {
  getDashboard,
  getStoreRatings,
};
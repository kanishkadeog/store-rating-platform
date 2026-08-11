// store-rating-platform/backend/src/repositories/store.repository.js

const { Store, User, Rating } = require("../models");

const {
  Op,
  fn,
  col,
  literal,
} = require("sequelize");

// Create a new store
const createStore = async (data) => {
  return await Store.create(data);
};

// Find a store by email
const findStoreByEmail = async (email) => {
  return await Store.findOne({
    where: {
      email,
    },
  });
};

// Find a store by ID
const findStoreById = async (id) => {
  return await Store.findByPk(id);
};



// Get all stores with owner details
const getAllStores = async () => {
  return await Store.findAll({
    include: [
      {
        model: User,
        as: "owner",
        attributes: ["id", "name", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Check whether an owner has any stores
const hasStoresByOwner = async (ownerId) => {
  const count = await Store.count({
    where: {
      ownerId,
    },
  });

  return count > 0;
};

// Get stores with pagination, search and sorting
// =====================================================
// GET STORES WITH PAGINATION, SEARCH AND SORTING
// =====================================================

// =====================================================
// GET STORES WITH PAGINATION, SEARCH AND SORTING
// =====================================================

// =====================================================
// GET STORES WITH PAGINATION, SEARCH AND SORTING
// =====================================================

const getStores = async (query = {}) => {

    const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "name",
        order = "ASC",
    } = query;

    const offset =
        (Number(page) - 1) * Number(limit);


    // =====================================================
    // SEARCH
    // =====================================================

    const whereCondition = {};

    if (search) {

        whereCondition[Op.or] = [

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

            {
                "$owner.name$": {
                    [Op.like]: `%${search}%`,
                },
            },

            {
                "$owner.email$": {
                    [Op.like]: `%${search}%`,
                },
            },

        ];
    }


    // =====================================================
    // SORTING
    // =====================================================

    const allowedSortFields = [
        "name",
        "email",
        "address",
        "owner",
        "averageRating",
        "createdAt",
    ];


    const validSortBy =
        allowedSortFields.includes(sortBy)
            ? sortBy
            : "name";


    const validOrder =
        String(order).toUpperCase() === "DESC"
            ? "DESC"
            : "ASC";


    let orderClause;


    // Sort by owner name
    if (validSortBy === "owner") {

        orderClause = [
            [
                {
                    model: User,
                    as: "owner",
                },

                "name",

                validOrder,
            ],
        ];

    }

    // Sort by average rating
    else if (validSortBy === "averageRating") {

        orderClause = [
            [
                literal("averageRating"),
                validOrder,
            ],
        ];

    }

    // Normal store column
    else {

        orderClause = [
            [
                validSortBy,
                validOrder,
            ],
        ];

    }


    // =====================================================
    // FETCH STORES
    // =====================================================

    const { count, rows } =
        await Store.findAndCountAll({

            where: whereCondition,


            // =================================================
            // STORE FIELDS
            // =================================================

            attributes: [
                "id",
                "name",
                "email",
                "address",
                "ownerId",

                [
                    fn(
                        "AVG",
                        col("ratings.rating")
                    ),

                    "averageRating",
                ],
            ],


            // =================================================
            // OWNER
            // =================================================

            include: [

                {
                    model: User,

                    as: "owner",

                    attributes: [
                        "id",
                        "name",
                        "email",
                    ],

                    required: false,
                },


                // =================================================
                // RATINGS
                // =================================================

                {
                    model: Rating,

                    as: "ratings",

                    attributes: [],

                    required: false,
                },

            ],


            // =================================================
            // GROUP
            // =================================================

            group: [
                "Store.id",
                "owner.id",
            ],


            // =================================================
            // ORDER
            // =================================================

            order: orderClause,


            limit: Number(limit),

            offset,

            subQuery: false,
        });


    // =====================================================
    // COUNT
    // =====================================================

    const totalStores =
        Array.isArray(count)
            ? count.length
            : count;


    // =====================================================
    // DEBUG
    // =====================================================

    console.log(
        "========== STORES FROM DATABASE =========="
    );


    rows.forEach((store) => {

        console.log(
            store.toJSON()
        );

    });


    console.log(
        "==========================================="
    );


    // =====================================================
    // RESPONSE
    // =====================================================

    return {

        totalStores,

        currentPage:
            Number(page),

        totalPages:
            Math.ceil(
                totalStores /
                Number(limit)
            ),

        stores: rows,

    };
};

//++++++++++++++++++++++++++++++++++++++
// const getStores = async (query = {}) => {
//   const {
//     page = 1,
//     limit = 10,
//     search = "",
//     sortBy = "name",
//     order = "ASC",
//   } = query;

//   const offset =
//     (Number(page) - 1) * Number(limit);

//   // =====================================================
//   // SEARCH CONDITIONS
//   // =====================================================

//   const whereCondition = {};

//   if (search) {
//     whereCondition[Op.or] = [
//       {
//         name: {
//           [Op.like]: `%${search}%`,
//         },
//       },

//       {
//         email: {
//           [Op.like]: `%${search}%`,
//         },
//       },

//       {
//         address: {
//           [Op.like]: `%${search}%`,
//         },
//       },

//       {
//         "$owner.name$": {
//           [Op.like]: `%${search}%`,
//         },
//       },

//       {
//         "$owner.email$": {
//           [Op.like]: `%${search}%`,
//         },
//       },
//     ];
//   }

//   // =====================================================
//   // SORTING VALIDATION
//   // =====================================================

//   const allowedSortFields = [
//     "name",
//     "email",
//     "address",
//     "owner",
//     "averageRating",
//     "createdAt",
//   ];

//   const validSortBy = allowedSortFields.includes(sortBy)
//     ? sortBy
//     : "name";

//   const validOrder =
//     String(order).toUpperCase() === "ASC"
//       ? "ASC"
//       : "DESC";

//   // =====================================================
//   // SORTING CONFIGURATION
//   // =====================================================

//   let orderClause;

//   if (validSortBy === "owner") {
//     // Sort using owner's name
//     orderClause = [
//       [
//         {
//           model: User,
//           as: "owner",
//         },
//         "name",
//         validOrder,
//       ],
//     ];
//   } else if (validSortBy === "averageRating") {
//     // Sort using calculated average rating
//     orderClause = [
//       [
//         literal("averageRating"),
//         validOrder,
//       ],
//     ];
//   } else {
//     // Normal Store columns
//     orderClause = [
//       [
//         validSortBy,
//         validOrder,
//       ],
//     ];
//   }

//   // =====================================================
//   // FETCH STORES
//   // =====================================================

//   const { count, rows } =
//     await Store.findAndCountAll({
//       where: whereCondition,

//       attributes: [
//         "id",
//         "name",
//         "email",
//         "address",
//         "ownerId",

//         [
//           fn(
//             "AVG",
//             col("ratings.rating")
//           ),
//           "averageRating",
//         ],
//       ],

//       include: [
//         {
//           model: User,
//           as: "owner",

//           attributes: [
//             "id",
//             "name",
//             "email",
//           ],
//         },

//         {
//           model: Rating,
//           as: "ratings",

//           attributes: [],

//           required: false,
//         },
//       ],

//       group: ["Store.id", "owner.id"],

//       order: orderClause,

//       limit: Number(limit),

//       offset,

//       subQuery: false,
//     });

//   // =====================================================
//   // COUNT
//   // =====================================================

//   const totalStores = Array.isArray(count)
//     ? count.length
//     : count;

//   // =====================================================
//   // RESPONSE
//   // =====================================================

//   return {
//     totalStores,

//     currentPage: Number(page),

//     totalPages: Math.ceil(
//       totalStores / Number(limit)
//     ),

//     stores: rows,
//   };
// };

//+++++++++++++++++++++++++++++++++


/**
 * Get store by ID
 */
/**
 * Get store by ID
 */
const getStoreById = async (id) => {
  return await Store.findByPk(id, {
    attributes: [
      "id",
      "name",
      "email",
      "address",
      "ownerId",

      [
        fn(
          "AVG",
          col("ratings.rating")
        ),
        "averageRating",
      ],
    ],

    include: [
      {
        model: User,
        as: "owner",
        attributes: [
          "id",
          "name",
          "email",
        ],
      },

      {
        model: Rating,
        as: "ratings",
        attributes: [],
        required: false,
      },
    ],

    group: [
      "Store.id",
      "owner.id",
    ],
  });
};

module.exports = {
  createStore,
  findStoreByEmail,
  findStoreById,
  getAllStores,
  hasStoresByOwner,
  getStores,
  getStoreById,
};
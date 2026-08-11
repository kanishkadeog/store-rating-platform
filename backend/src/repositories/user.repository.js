// store-rating-platform/backend/src/repositories/user.repository.js

const {
  User,
  Store,
  Rating,
} = require("../models");

const {
  Op,
  fn,
  col,
  literal,
} = require("sequelize");

// Find user by ID (used internally)
const findUserById = async (id) => {
  return await User.findByPk(id);
};

// Find user by email
const findUserByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

// Get user by ID (exclude password)
const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
};



//----

// Get all users (excluding password)
// Supports sorting by name, email, address, and role
const getAllUsers = async (query = {}) => {
  const {
    sortBy = "createdAt",
    sortOrder = "desc",
  } = query;

  // -------------------------------------------------
  // Allowed sorting columns
  // -------------------------------------------------
  // IMPORTANT:
  // Never directly pass user-provided sortBy
  // into Sequelize.
  //
  // This whitelist prevents invalid/unwanted
  // database column access.
  // -------------------------------------------------

  const allowedSortFields = {
    name: "name",
    email: "email",
    address: "address",
    role: "role",
    createdAt: "createdAt",
  };

  // -------------------------------------------------
  // Validate sort field
  // -------------------------------------------------

  const orderField =
    allowedSortFields[sortBy] || "createdAt";

  // -------------------------------------------------
  // Validate sort direction
  // -------------------------------------------------

  const orderDirection =
    String(sortOrder).toLowerCase() === "asc"
      ? "ASC"
      : "DESC";

  return await User.findAll({
    attributes: {
      exclude: ["password"],
    },

    order: [
      [orderField, orderDirection],
    ],
  });
};

//----


/**
 * Get all users with OWNER role
 */
const getAllOwners = async () => {
  return await User.findAll({
    where: {
      role: "OWNER",
    },

    attributes: [
      "id",
      "name",
      "email",
    ],

    order: [["name", "ASC"]],
  });
};

// Update user by ID
const updateUser = async (id, data) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  await user.update(data);

  return user;
};

// Delete user by ID
const deleteUser = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  await user.destroy();

  return true;
};


//===================================================

/**
 * Get all stores for normal users
 */
const getAllStores = async (userId, query = {}) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "name",
    sortOrder = "ASC",
  } = query;

  const offset =
    (Number(page) - 1) * Number(limit);

  // =====================================================
  // SEARCH
  // =====================================================

  const whereCondition = {
    [Op.or]: [
      {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        address: {
          [Op.like]: `%${search}%`,
        },
      },
    ],
  };

  // =====================================================
  // SORTING VALIDATION
  // =====================================================

  const allowedSortFields = {
    name: "name",
    email: "email",
    address: "address",
    createdAt: "createdAt",
  };

 

  const validSortOrder =
    String(sortOrder).toUpperCase() === "ASC"
      ? "ASC"
      : "DESC";

  // =====================================================
  // FETCH STORES
  // =====================================================

  const { rows, count } =
    await Store.findAndCountAll({
      where: whereCondition,

      attributes: [
  "id",
  "name",
  "email",
  "address",

  [
    literal(
      "COALESCE(AVG(`ratings`.`rating`), 0)"
    ),
    "averageRating",
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

      limit: Number(limit),

      offset,

      order:
  sortBy === "averageRating"
    ? [
        [
           literal(
            "COALESCE(AVG(`ratings`.`rating`), 0)"
          ),
          validSortOrder,
        ],
      ]
    : [
        [
          allowedSortFields[sortBy] || "name",
          validSortOrder,
        ],
      ],

      subQuery: false,
    });

  const total = Array.isArray(count)
    ? count.length
    : count;

  return {
    total,

    currentPage: Number(page),

    totalPages: Math.ceil(
      total / Number(limit)
    ),

    stores: rows,
  };
};

module.exports = {
  findUserById,
  findUserByEmail,
  getUserById,
  getAllUsers,
  getAllOwners,
  updateUser,
  deleteUser,
    getAllStores,

};
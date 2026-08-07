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

// Get all users (excluding password)
const getAllUsers = async () => {
  return await User.findAll({
    attributes: {
      exclude: ["password"],
    },
    order: [["createdAt", "DESC"]],
  });
};

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

/**
 * Get all stores for normal users
 */
const getAllStores = async (userId, query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
  } = query;

  const offset =
    (Number(page) - 1) * Number(limit);

  const { rows, count } =
    await Store.findAndCountAll({
      where: {
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
      },

      attributes: [
        "id",
        "name",
        "email",
        "address",

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
          model: Rating,
          as: "ratings",
          attributes: [],
          required: false,
        },
      ],

      group: ["Store.id"],

      limit: Number(limit),

      offset,

      order: [["createdAt", "DESC"]],

      subQuery: false,
    });

  return {
    total: Array.isArray(count)
      ? count.length
      : count,

    currentPage: Number(page),

    totalPages: Math.ceil(
      (Array.isArray(count)
        ? count.length
        : count) / Number(limit)
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
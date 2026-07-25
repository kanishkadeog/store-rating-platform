// store-rating-platform/backend/src/repositories/store.repository.js

const { Store, User } = require("../models");
const { Op } = require("sequelize");

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
const getStores = async (query) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "name",
    order = "ASC",
  } = query;

  const offset = (Number(page) - 1) * Number(limit);

  const whereCondition = {};

  if (search) {
    whereCondition[Op.or] = [
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
      {
        "$owner.name$": {
          [Op.like]: `%${search}%`,
        },
      },
    ];
  }

  const { count, rows } = await Store.findAndCountAll({
    where: whereCondition,

    include: [
      {
        model: User,
        as: "owner",
        attributes: ["id", "name", "email"],
      },
    ],

    order: [[sortBy, order.toUpperCase()]],

    limit: Number(limit),

    offset,
  });

  return {
    totalStores: count,
    currentPage: Number(page),
    totalPages: Math.ceil(count / Number(limit)),
    stores: rows,
  };
};

module.exports = {
  createStore,
  findStoreByEmail,
  findStoreById,
  getAllStores,
  hasStoresByOwner,
  getStores,
};
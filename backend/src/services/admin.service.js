//store-rating-platform/backend/src/services/admin.service.js

const { User, Store, Rating } = require("../models");

const storeRepository = require("../repositories/store.repository");

const userRepository = require("../repositories/user.repository");

const ratingRepository = require("../repositories/rating.repository");

const ROLES = require("../constants/roles");

const {
  hashPassword,
} = require("../utils/password");

const getDashboardStats = async () => {

    const [
        totalUsers,
        totalStores,
        totalRatings,
    ] = await Promise.all([

        User.count(),

        Store.count(),

        Rating.count(),

    ]);

    return {

        totalUsers,

        totalStores,

        totalRatings,

    };

};

const createUser = async (data) => {

    const existingUser =
        await User.findOne({

            where: {
                email: data.email,
            },

        });

    if (existingUser) {

        throw new Error(
            "Email already exists"
        );

    }

    const password =
        await hashPassword(
            data.password
        );

    const user =
        await User.create({

            name: data.name,

            email: data.email,

            address: data.address,

            password,

            role: data.role,

        });

    return {

        id: user.id,

        name: user.name,

        email: user.email,

        role: user.role,

    };

};

const createStore = async (data) => {

  const existingStore =
    await storeRepository.findStoreByEmail(
      data.email
    );

  if (existingStore) {
    throw new Error(
      "Store email already exists"
    );
  }

  const owner =
    await userRepository.findUserById(
      data.ownerId
    );

  if (!owner) {
    throw new Error(
      "Store owner not found"
    );
  }

  if (owner.role !== ROLES.OWNER) {
    throw new Error(
      "Selected user is not a store owner"
    );
  }

  const store =
    await storeRepository.createStore({

      name: data.name,

      email: data.email,

      address: data.address,

      ownerId: data.ownerId,

    });

  return store;
};

// const getAllUsers = async () => {
//   return await userRepository.getAllUsers();
// };

const getAllUsers = async (query) => {
  return await userRepository.getAllUsers(query);
};

/**
 * Get all owners
 */
const getAllOwners = async () => {
  return await userRepository.getAllOwners();
};

const getAllStores = async (query = {}) => {
  return await storeRepository.getStores(query);
};

/**
 * Get Store By ID
 */
const getStoreById = async (id) => {
  const store = await storeRepository.getStoreById(id);

  if (!store) {
    throw new Error("Store not found");
  }

  return store;
};

const getUserById = async (id) => {

  const user = await userRepository.getUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateUser = async (id, data) => {

  // Check whether user exists
  const existingUser = await userRepository.getUserById(id);

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Check duplicate email
  const emailUser = await userRepository.findUserByEmail(data.email);

  if (emailUser && emailUser.id !== Number(id)) {
    throw new Error("Email already exists");
  }

  // Validate role
  if (!Object.values(ROLES).includes(data.role)) {
    throw new Error("Invalid role");
  }

  // Update user
  const updatedUser = await userRepository.updateUser(id, {
    name: data.name,
    email: data.email,
    address: data.address,
    role: data.role,
  });

  return updatedUser;
};

const deleteUser = async (id) => {

  // Check if user exists
  const existingUser = await userRepository.findUserById(id);

  if (!existingUser) {
    throw new Error("User not found");
  }

  // Check if user owns stores
  const hasStores = await storeRepository.hasStoresByOwner(id);

  if (hasStores) {
    throw new Error(
      "Cannot delete user because they own one or more stores"
    );
  }

  // Check if user has submitted ratings
  const hasRatings = await ratingRepository.hasUserRatings(id);

  if (hasRatings) {
    throw new Error(
      "Cannot delete user because they have submitted ratings"
    );
  }

  // Delete user
  await userRepository.deleteUser(id);

  return;
};

module.exports = {
  getDashboardStats,
  createUser,
  createStore,
  getAllUsers,
  getAllStores,
  getUserById,
  updateUser,
  deleteUser,
  getStoreById,
  getAllOwners,
};
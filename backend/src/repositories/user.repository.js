// store-rating-platform/backend/src/repositories/user.repository.js

const { User } = require("../models");

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

module.exports = {
  findUserById,
  findUserByEmail,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
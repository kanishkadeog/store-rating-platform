//store-rating-platform/backend/src/services/auth.service.js

const { User } = require("../models");

const ROLES = require("../constants/roles");

const { hashPassword, comparePassword } = require("../utils/password");

const { generateToken } = require("../utils/token");

const signup = async (data) => {
  const existingUser = await User.findOne({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    address: data.address,
    role: ROLES.USER,
  });

  return user;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await comparePassword(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  return {
    token,
    user,
  };
};

const changePassword = async (
  userId,
  oldPassword,
  newPassword
) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(
    oldPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  const hashedPassword = await hashPassword(
    newPassword
  );

  user.password = hashedPassword;

  await user.save();

  return true;
};

module.exports = {
  signup,
  login,
  changePassword,
};
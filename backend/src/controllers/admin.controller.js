//store-rating-platform/backend/src/controllers/admin.controller.js

const adminService = require("../services/admin.service");

const getDashboard = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();

    res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await adminService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const createStore = async (req, res, next) => {
  try {
    const store = await adminService.createStore(req.body);

    res.status(201).json({
      success: true,
      message: "Store created successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    // const users = await adminService.getAllUsers();

    const users = await adminService.getAllUsers(
  req.query
);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOwners = async (req, res, next) => {
  try {
    const owners = await adminService.getAllOwners();

    res.status(200).json({
      success: true,
      message: "Owners fetched successfully",
      data: owners,
    });
  } catch (error) {
    next(error);
  }
};

const getAllStores = async (req, res, next) => {
  try {
    const stores = await adminService.getAllStores();

    res.status(200).json({
      success: true,
      message: "Stores fetched successfully",
      data: stores,
    });
  } catch (error) {
    next(error);
  }
};

const getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const store = await adminService.getStoreById(id);

    res.status(200).json({
      success: true,
      message: "Store fetched successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await adminService.getUserById(id);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedUser = await adminService.updateUser(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// Delete User
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await adminService.deleteUser(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  createUser,
  createStore,
  getAllUsers,
  getAllOwners,
  getAllStores,
  getUserById,
  getStoreById,
  updateUser,
  deleteUser,
};
//store-rating-platform/backend/src/routes/admin.routes.js

const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin.controller");

const authMiddleware = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

const validate = require("../middleware/validation.middleware");

const {
  createUserValidation,
  createStoreValidation,
  updateUserValidation,
} = require("../validators/admin.validator");

const ROLES = require("../constants/roles");

// Dashboard API
router.get(
  "/dashboard",
  authMiddleware,
  authorize(ROLES.ADMIN),
  adminController.getDashboard
);

// Get All Users API
router.get(
  "/users",
  authMiddleware,
  authorize(ROLES.ADMIN),
  adminController.getAllUsers
);

// Get All Owners API
router.get(
  "/owners",
  authMiddleware,
  authorize(ROLES.ADMIN),
  adminController.getAllOwners
);

// Get User By ID API
router.get(
  "/users/:id",
  authMiddleware,
  authorize(ROLES.ADMIN),
  adminController.getUserById
);

// Update User API
router.put(
  "/users/:id",
  authMiddleware,
  authorize(ROLES.ADMIN),
  updateUserValidation,
  validate,
  adminController.updateUser
);

// Delete User API
router.delete(
  "/users/:id",
  authMiddleware,
  authorize(ROLES.ADMIN),
  adminController.deleteUser
);

// Get All Stores API
router.get(
  "/stores",
  authMiddleware,
  authorize(ROLES.ADMIN),
  adminController.getAllStores
);

// Get Store By ID API
router.get(
  "/stores/:id",
  authMiddleware,
  authorize(ROLES.ADMIN),
  adminController.getStoreById
);


// Create User API
router.post(
  "/users",
  authMiddleware,
  authorize(ROLES.ADMIN),
  createUserValidation,
  validate,
  adminController.createUser
);

// Create Store API
router.post(
  "/stores",
  authMiddleware,
  authorize(ROLES.ADMIN),
  createStoreValidation,
  validate,
  adminController.createStore
);

module.exports = router;
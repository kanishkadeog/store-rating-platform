//store-rating-platform/backend/src/routes/user.routes.js

// backend/src/routes/user.routes.js

const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const ROLES = require("../constants/roles");

/**
 * Get All Stores
 */
router.get(
  "/stores",
  authMiddleware,
  authorize(ROLES.USER),
  userController.getAllStores
);

module.exports = router;
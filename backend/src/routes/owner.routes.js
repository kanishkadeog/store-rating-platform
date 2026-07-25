//store-rating-platform/backend/src/routes/owner.routes.js

const express = require("express");

const ownerController = require("../controllers/owner.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const ROLES = require("../constants/roles");

const router = express.Router();

// Store Owner Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware(ROLES.OWNER),
  ownerController.getDashboard
);

// Store Owner Ratings
router.get(
  "/ratings",
  authMiddleware,
  roleMiddleware(ROLES.OWNER),
  ownerController.getStoreRatings
);

module.exports = router;
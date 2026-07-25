//store-rating-platform/backend/src/routes/store.routes.js

const express = require("express");

const router = express.Router();

const storeController = require("../controllers/store.controller");

const authMiddleware = require("../middleware/auth.middleware");

const validate = require("../middleware/validation.middleware");

const {
  getStoresValidation,
} = require("../validators/store.validator");

// Protect all store routes
router.use(authMiddleware);

// GET /api/stores
router.get(
  "/",
  getStoresValidation,
  validate,
  storeController.getAllStores
);

module.exports = router;
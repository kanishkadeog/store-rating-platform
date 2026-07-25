//store-rating-platform/backend/src/routes/rating.routes.js

const express = require("express");

const ratingController = require("../controllers/rating.controller");

const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

const ROLES = require("../constants/roles");

const {
  createRatingValidation,
  updateRatingValidation,
} = require("../validators/rating.validator");

const validate = require("../middleware/validation.middleware");

const router = express.Router();

// Only logged-in normal users can submit ratings
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.USER),
  createRatingValidation,
  validate,
  ratingController.createRating
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware(ROLES.USER),
  ratingController.getMyRatings
);

router.put(
  "/:storeId",
  authMiddleware,
  roleMiddleware(ROLES.USER),
  updateRatingValidation,
  validate,
  ratingController.updateRating
);

module.exports = router;
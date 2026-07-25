//store-rating-platform/backend/src/validators/rating.validator.js

const { body } = require("express-validator");

const createRatingValidation = [

  body("storeId")
    .isInt({ min: 1 })
    .withMessage("Store ID must be a positive integer"),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

];

const updateRatingValidation = [

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

];

module.exports = {
  createRatingValidation,
  updateRatingValidation,
}; 
//store-rating-platform/backend/src/validators/store.validator.js

const { query } = require("express-validator");

const getStoresValidation = [

  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("sortBy")
    .optional()
    .isIn([
      "name",
      "email",
      "address",
      "createdAt",
    ])
    .withMessage("Invalid sortBy field"),

  query("order")
    .optional()
    .isIn([
      "ASC",
      "DESC",
      "asc",
      "desc",
    ])
    .withMessage("Order must be ASC or DESC"),

  query("search")
    .optional()
    .trim(),
];

module.exports = {
  getStoresValidation,
};
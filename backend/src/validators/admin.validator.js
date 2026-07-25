//store-rating-platform/backend/src/validators/admin.validator.js

const { body } = require("express-validator");

const ROLES = require("../constants/roles");

// ================================
// Create User Validation
// ================================
const createUserValidation = [

  body("name")
    .trim()
    .isLength({
      min: 20,
      max: 60,
    })
    .withMessage(
      "Name must be between 20 and 60 characters"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Invalid email"
    ),

  body("address")
    .trim()
    .isLength({
      max: 400,
    })
    .withMessage(
      "Address cannot exceed 400 characters"
    ),

  body("password")
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/
    )
    .withMessage(
      "Password must be 8-16 characters and contain one uppercase letter and one special character"
    ),

  body("role")
    .isIn([
      ROLES.ADMIN,
      ROLES.USER,
      ROLES.OWNER,
    ])
    .withMessage(
      "Invalid role"
    ),

];

// ================================
// Create Store Validation
// ================================
const createStoreValidation = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Store name is required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),

  body("ownerId")
    .isInt()
    .withMessage("Owner Id must be integer"),

];

// ================================
// Update User Validation
// ================================
const updateUserValidation = [

  body("name")
    .trim()
    .isLength({
      min: 20,
      max: 60,
    })
    .withMessage(
      "Name must be between 20 and 60 characters"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Invalid email"
    ),

  body("address")
    .trim()
    .isLength({
      max: 400,
    })
    .withMessage(
      "Address cannot exceed 400 characters"
    ),

  body("role")
    .isIn([
      ROLES.ADMIN,
      ROLES.USER,
      ROLES.OWNER,
    ])
    .withMessage(
      "Invalid role"
    ),

];


module.exports = {
  createUserValidation,
  createStoreValidation,
  updateUserValidation,
};
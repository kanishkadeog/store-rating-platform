//store-rating-platform/backend/src/validators/auth.validator.js

const { body } = require("express-validator");

const signupValidation = [
  body("name")
    .trim()
    .isLength({ min: 20, max: 60 })
    .withMessage("Name must be between 20 and 60 characters"),

  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("address")
    .trim()
    .isLength({ max: 400 })
    .withMessage("Address cannot exceed 400 characters"),

  body("password")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/)
    .withMessage(
      "Password must be 8-16 characters and contain one uppercase letter and one special character"
    ),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

const changePasswordValidation = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Old password is required"),

  body("newPassword")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/)
    .withMessage(
      "New password must be 8-16 characters and contain one uppercase letter and one special character"
    ),
];

module.exports = {
  signupValidation,
  loginValidation,
  changePasswordValidation,
};
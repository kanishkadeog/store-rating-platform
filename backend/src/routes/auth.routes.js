//store-rating-platform/backend/src/routes/auth.routes.js

const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

const validate = require("../middleware/validation.middleware");

const {
  signupValidation,
  loginValidation,
  changePasswordValidation,
} = require("../validators/auth.validator");

router.post(
  "/signup",
  signupValidation,
  validate,
  authController.signup
);

router.post(
  "/login",
  loginValidation,
  validate,
  authController.login
);

router.get(
  "/me",
  authMiddleware,
  authController.me
);

router.put(
  "/change-password",
  authMiddleware,
  changePasswordValidation,
  validate,
  authController.changePassword
);

module.exports = router;
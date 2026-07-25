//store-rating-platform/backend/src/controllers/auth.controller.js

const authService = require("../services/auth.service");

const signup = async (req, res, next) => {
  try {
    const user = await authService.signup(req.body);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: result.token,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        role: result.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      address: req.user.address,
      role: req.user.role,
    },
  });
};

const changePassword = async (req, res, next) => {
  try {
    await authService.changePassword(
      req.user.id,
      req.body.oldPassword,
      req.body.newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  me,
  changePassword,
};
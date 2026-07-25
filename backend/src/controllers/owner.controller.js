//store-rating-platform/backend/src/controllers/owner.controller.js

const ownerService = require("../services/owner.service");

const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await ownerService.getDashboard(req.user.id);

    res.status(200).json({
      success: true,
      message: "Dashboard fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

const getStoreRatings = async (req, res, next) => {
  try {
    const ratings = await ownerService.getStoreRatings(
      req.user.id,
      req.query
    );

    res.status(200).json({
      success: true,
      message: "Ratings fetched successfully",
      data: ratings,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  getStoreRatings,
};
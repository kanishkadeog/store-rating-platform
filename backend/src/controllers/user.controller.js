//store-rating-platform/backend/src/controllers/usser.controller.js

// backend/src/controllers/user.controller.js

const userService = require("../services/user.service");

/**
 * Get all stores for normal user
 */
const getAllStores = async (req, res, next) => {
  try {
    const stores = await userService.getAllStores(
      req.user.id,
      req.query
    );

    res.status(200).json({
      success: true,
      message: "Stores fetched successfully",
      data: stores,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStores,
};
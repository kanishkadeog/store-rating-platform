//store-rating-platform/backend/src/controllers/store.controller.js

const storeService = require("../services/store.service");

const getAllStores = async (req, res, next) => {
  try {
    const stores = await storeService.getAllStores(
      req.query,
      req.user.id
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
//store-rating-platform/backend/src/controllers/rating.controller.js

const ratingService = require("../services/rating.service");

const createRating = async (req, res, next) => {
  try {
    const rating = await ratingService.createRating(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      data: rating,
    });
  } catch (error) {
    next(error);
  }
};

const updateRating = async (req, res, next) => {
  try {
    const updatedRating = await ratingService.updateRating(
      req.user.id,
      req.params.storeId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      data: updatedRating,
    });
  } catch (error) {
    next(error);
  }
};

const getMyRatings = async (req, res, next) => {
  try {
    const ratings = await ratingService.getMyRatings(req.user.id);

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
  createRating,
  updateRating,
  getMyRatings,
};
//store-rating-platform/backend/src/middleware/error.middleware.js

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  let statusCode = 500;

  switch (err.message) {
    case "User not found":
    case "Store not found":
      statusCode = 404;
      break;

    case "Email already exists":
    case "Store email already exists":
      statusCode = 409;
      break;

    case "Invalid role":
    case "Selected user is not a store owner":
      statusCode = 400;
      break;

    case "Unauthorized":
    case "Invalid token":
      statusCode = 401;
      break;

    case "Forbidden":
      statusCode = 403;
      break;

    default:
      statusCode = 500;
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};

module.exports = errorMiddleware;
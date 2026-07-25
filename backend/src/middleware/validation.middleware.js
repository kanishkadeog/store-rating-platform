//store-rating-platform/backend/src/middleware/validation.middleware.js

const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors: errors.array(),
        });
    }

    next();
};

module.exports = validate;
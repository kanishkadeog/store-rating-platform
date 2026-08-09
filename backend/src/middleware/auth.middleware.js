//store-rating-platform/backend/src/middleware/auth.middleware.js

const { verifyToken } = require("../utils/token");

const { User } = require("../models");

const authMiddleware = async (
    req,
    res,
    next
) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Access token required",

            });

        }

        const token =
            authHeader.split(" ")[1];

        const decoded =
            verifyToken(token);

console.log("Decoded Token:", decoded);

        const user =
            await User.findByPk(
                decoded.id
            );

            console.log("User Found:", user);

        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "User not found",

            });

        }

        req.user = user;

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message:
                "Invalid or expired token",

        });

    }

};

module.exports =
authMiddleware;
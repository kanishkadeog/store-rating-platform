//store-rating-platform/backend/src/middleware/role.middleware.js

const authorize =
    (...roles) => {

        return (
            req,
            res,
            next
        ) => {

            if (
                !roles.includes(
                    req.user.role
                )
            ) {

                return res.status(403).json({

                    success: false,

                    message:
                        "Access denied",

                });

            }

            next();

        };

    };

module.exports =
authorize;
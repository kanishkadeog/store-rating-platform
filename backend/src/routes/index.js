////store-rating-platform/backend/src/routes/index.js
const express = require("express");

const router = express.Router();

const authRoutes =require("./auth.routes");

const adminRoutes = require("./admin.routes");

const storeRoutes = require("./store.routes");

const ratingRoutes = require("./rating.routes");

const ownerRoutes = require("./owner.routes");

const userRoutes = require("./user.routes");

const testRoutes = require("./test.routes");

router.use("/auth",authRoutes);

router.use("/admin", adminRoutes);

router.use("/stores", storeRoutes);

router.use("/ratings", ratingRoutes);

router.use("/owner", ownerRoutes);

router.use("/api/user", userRoutes);

router.use("/test",testRoutes);

router.get("/health",(req, res) => {

        res.json({

            success: true,

            message:
                "API Running",

        });

    }
);

module.exports = router;
//store-rating-platform/backend/src/utils/seedAdmin.js

const { User } = require("../models");

const ROLES = require("../constants/roles");

const {
    hashPassword,
} = require("./password");

const seedAdmin = async () => {
    const admin = await User.findOne({
        where: {
            email: "admin@gmail.com",
        },
    });

    if (admin) {
        console.log("Admin already exists");
        return;
    }

    const password = await hashPassword(
        "Admin@123"
    );

    await User.create({
        name: "System Administrator",

        email: "admin@gmail.com",

        password,

        address: "Head Office",

        role: ROLES.ADMIN,
    });

    console.log("Default Admin Created");
};

module.exports = seedAdmin;
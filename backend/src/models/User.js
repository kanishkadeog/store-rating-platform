//store-rating-platform/backend/src/models/User.js

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const ROLES = require("../constants/roles");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        address: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },

        role: {
            type: DataTypes.ENUM(
                ROLES.ADMIN,
                ROLES.USER,
                ROLES.OWNER
            ),
            allowNull: false,
            defaultValue: ROLES.USER,
        },
    },
    {
        tableName: "users",
    }
);

module.exports = User;
//store-rating-platform/backend/src/models/Store.js

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Store = sequelize.define(
    "Store",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(100),
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

        address: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
    },
    {
        tableName: "stores",
    }
);

module.exports = Store;
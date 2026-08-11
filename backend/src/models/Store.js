//store-rating-platform/backend/src/models/Store.js

// store-rating-platform/backend/src/models/Store.js

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Store = sequelize.define(
    "Store",
    {
        // =====================================================
        // STORE ID
        // =====================================================

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        // =====================================================
        // STORE NAME
        // =====================================================

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        // =====================================================
        // STORE EMAIL
        // =====================================================

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,

            validate: {
                isEmail: true,
            },
        },

        // =====================================================
        // STORE ADDRESS
        // =====================================================

        address: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },

        // =====================================================
        // STORE OWNER
        // =====================================================

        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,

            references: {
                model: "users",
                key: "id",
            },
        },
    },

    {
        tableName: "stores",
    }
);

module.exports = Store;
const User = require("./User");
const Store = require("./Store");
const Rating = require("./Rating");

// Owner → Stores
User.hasMany(Store, {
    foreignKey: "ownerId",
    as: "stores",
    onDelete: "RESTRICT",
});

Store.belongsTo(User, {
    foreignKey: "ownerId",
    as: "owner",
});

// User → Ratings
User.hasMany(Rating, {
    foreignKey: "userId",
    as: "ratings",
    onDelete: "RESTRICT",
});

Rating.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

// Store → Ratings
Store.hasMany(Rating, {
    foreignKey: "storeId",
    as: "ratings",
    onDelete: "RESTRICT",
});

Rating.belongsTo(Store, {
    foreignKey: "storeId",
    as: "store",
});

module.exports = {
    User,
    Store,
    Rating,
};
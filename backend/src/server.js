//store-rating-platform/backend/src/server.js


require("dotenv").config();

const app = require("./app");
const { connectDB, sequelize } = require("./config/db");

require("./models");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("1. Connecting DB...");
    await connectDB();

    console.log("2. Syncing Database...");
    // await sequelize.sync({ alter: true });
await sequelize.sync();
    console.log("3. Database Synced");

    console.log("4. Loading seedAdmin...");
    const seedAdmin = require("./utils/seedAdmin");

    console.log("5. Running seedAdmin...");
    await seedAdmin();

    console.log("6. Admin Seed Completed");

    app.listen(PORT, () => {
      console.log(`7. Server running on ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Startup Error:");
    console.error(error);
  }
};

startServer();
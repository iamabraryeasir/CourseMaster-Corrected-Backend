const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const connectDB = require("./src/config/db");
const seedDatabase = require("./seed");

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    // Automatically seed data on startup if database is empty
    try {
      await seedDatabase();
    } catch (seedError) {
      console.error("Database seeding on server start encountered an error:", seedError.message);
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });

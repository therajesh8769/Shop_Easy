const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/User");

// Load env variables
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB connection failed:", err));

// Create admin user
const createAdmin = async () => {
  try {
    const existing = await User.findOne({ email: "therajesh8769@gmail.com" });
    if (existing) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashed = await bcrypt.hash("shopeasy_rajesh", 10);
    const admin = await User.create({
      name: "Rajesh",
      email: "therajesh8769@gmail.com",
      password: hashed,
      mobile: "9928518628",
      isAdmin: true,
    });

    console.log("✅ Admin created:", admin.email);
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

createAdmin();

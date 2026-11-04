const mongoose = require("mongoose");

const connectDB = async () => {
  const database = await mongoose.connect(`${process.env.MONGO_URI}/myStore`);
  console.log("Database connected successfully");
  return database;
};

module.exports = connectDB;

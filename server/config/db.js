const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  await mongoose
    .connect(`mongodb://localhost:27017/travel`)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;

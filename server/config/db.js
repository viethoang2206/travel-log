const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/travel")
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log("cant connect");
    });
};

module.exports = connectDB;

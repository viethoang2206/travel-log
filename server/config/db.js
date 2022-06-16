const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://admin:root@cluster0.tsd2mac.mongodb.net/travels?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;

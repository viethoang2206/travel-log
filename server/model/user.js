const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserSchema = mongoose.model("users", user);

module.exports = UserSchema;

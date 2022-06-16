const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserSchema = mongoose.model("users", user);

module.export = UserSchema;

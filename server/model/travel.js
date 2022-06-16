const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const travel = new Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TravelSchema = mongoose.model("travel", travel);
module.exports = TravelSchema;

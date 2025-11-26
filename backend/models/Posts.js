const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  labels: {
    type: Array,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;
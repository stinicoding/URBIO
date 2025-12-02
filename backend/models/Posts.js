const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
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
  datetime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pictures: {
    type: Array,
    required: true,
  },
  rating: {
    type: Number,
  },
  comments: {
    type: Array,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model("Posts", postSchema);
module.exports = Posts;

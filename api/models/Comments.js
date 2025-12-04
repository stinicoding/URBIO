const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  picture: {
    type: Object,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
  },
  groups: {
    type: Array,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;

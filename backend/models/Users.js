const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  mail: {
    type: mail,
    required: true,
    unique: true,
  },
  password: {
    type: password,
    required: true,
    unique: false,
  },
  postings: {
    type: Array,
    required: true,
    unique: true
  },
  friends: {
    type: Array,
    required: true,
    unique: false
  },
  groups: {
    type: Array,
    required: true,
    unique: false
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;

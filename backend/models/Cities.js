const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  //url of image
  img: {
    type: String,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Cities = mongoose.model("Cities", citySchema);
module.exports = Cities;

const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 500,
  },
  village: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 500,
  },
  created_At: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Character", characterSchema);

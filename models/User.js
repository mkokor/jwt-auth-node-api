const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "User first name field is required."],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "User last name field is required."],
  },
  username: {
    type: String,
    trim: true,
    required: [true, "User username field is required."],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "User email field is required."],
  },
  passwordHash: {
    type: String,
    trim: true,
    required: [true, "User password hash field is required."],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

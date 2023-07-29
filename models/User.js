const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  passwordHash: String,
});

// Pre middleware function is set up mannually so that the server can control Mongoose validation errors.
userSchema.pre("validate", function () {
  if (
    !this.firstName ||
    !this.lastName ||
    !this.username ||
    !this.email ||
    !this.passwordHash
  )
    throw new Error(
      "Incomplete data! Provide: first name, last name, username, email and password."
    );
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

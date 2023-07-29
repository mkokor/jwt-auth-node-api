const { User } = require("../models/User");
const cryptoHandler = require("../utils/crypto-handler");

const validatePasswordStrength = (password) => {
  // minimum 8 characters
  // minimum one digit
  // minimum one uppercase letter
  // minimum one lowercase letter
  // minimum one special character
  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/))
    throw new Error("Unsecure password.");
};

const registerUser = async (user) => {
  validatePasswordStrength(user.password);
  user.passwordHash = await cryptoHandler.encrypt(user.password);
  delete user.password;
  await User.create(user);
  return {
    message: "User successfully registered.",
  };
};

module.exports = {
  registerUser,
};

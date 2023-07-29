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

const getUserByFieldValue = async (fieldName, value) => {
  const user = await User.findOne({ [fieldName]: value });
  return user;
};

const checkUsernameAvailabilty = async (username) => {
  const user = await getUserByFieldValue("username", username);
  if (user) throw new Error(`Provided username is not available.`);
};

const checkEmailAvailabilty = async (email) => {
  const user = await getUserByFieldValue("email", email);
  if (user) throw new Error(`Provided email is not available.`);
};

const registerUser = async (user) => {
  await checkUsernameAvailabilty(user.username);
  await checkEmailAvailabilty(user.email);
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

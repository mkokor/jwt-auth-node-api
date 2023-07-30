const { User } = require("../models/User");
const { RefreshToken } = require("../models/RefreshToken");
const cryptoHandler = require("../utils/crypto-handler");
const tokenGenerator = require("../utils/token-utility");

const validatePasswordStrength = (password) => {
  // minimum 8 characters
  // minimum one digit
  // minimum one special character
  if (!password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/))
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

// This function convert password field of user to passwordHash field (field name and field value).
const hashPassword = async (user) => {
  user.passwordHash = await cryptoHandler.encrypt(user.password);
  delete user.password;
  return user;
};

const getUserByUsername = async (username) => {
  const user = await getUserByFieldValue("username", username);
  if (!user) throw new Error("User with provided username does not exist.");
  return user;
};

const validatePassword = async (plaintextPassword, passwordHash) => {
  const passwordMatch = await cryptoHandler.compare(
    plaintextPassword,
    passwordHash
  );
  if (!passwordMatch) throw new Error("Password does not match the username.");
};

const createRefreshToken = async (user) => {
  const refreshToken = await RefreshToken.findOneAndUpdate(
    { owner: user._id },
    { value: tokenGenerator.generateRefreshToken(user) },
    { upsert: true, new: true }
  );
  return refreshToken.value;
};

const registerUser = async (user) => {
  await checkUsernameAvailabilty(user.username);
  await checkEmailAvailabilty(user.email);
  validatePasswordStrength(user.password);
  user = await hashPassword(user);
  await User.create(user);
  return {
    message: "User successfully registered.",
  };
};

const logInUser = async (loginData) => {
  const user = await getUserByUsername(loginData.username);
  await validatePassword(loginData.password, user.passwordHash);
  const refreshToken = await createRefreshToken(user);
  return {
    accessToken: tokenGenerator.generateAccessToken(user),
    refreshToken: refreshToken,
  };
};

module.exports = {
  registerUser,
  logInUser,
};

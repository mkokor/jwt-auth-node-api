const { User } = require("../models/User");
const { RefreshToken } = require("../models/RefreshToken");
const { Role } = require("../models/Role");
const cryptoHandler = require("../utils/crypto-handler");
const tokenUtility = require("../utils/token-utility");
const errors = require("../errors/errors");

const validatePasswordStrength = (password) => {
  // minimum 8 characters
  // minimum one digit
  // minimum one special character
  if (!password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/))
    throw new errors.BadRequestError("Unsecure password.");
};

const getUserByFieldValue = async (fieldName, value) => {
  const user = await User.findOne({ [fieldName]: value }).populate("roles");
  return user;
};

const checkUsernameAvailabilty = async (username) => {
  const user = await getUserByFieldValue("username", username);
  if (user)
    throw new errors.BadRequestError(`Provided username is not available.`);
};

const checkEmailAvailabilty = async (email) => {
  const user = await getUserByFieldValue("email", email);
  if (user)
    throw new errors.BadRequestError(`Provided email is not available.`);
};

// This function convert password field of user to passwordHash field (field name and field value).
const hashPassword = async (user) => {
  user.passwordHash = await cryptoHandler.encrypt(user.password);
  delete user.password;
  return user;
};

const getRoleByName = async (name) => {
  const basicUserRole = await Role.findOne({ name: name });
  if (!basicUserRole) throw new Error("Something went wrong.");
  return basicUserRole;
};

const getUserByUsername = async (username) => {
  const user = await getUserByFieldValue("username", username);
  if (!user)
    throw new errors.NotFoundError(
      "User with provided username does not exist."
    );
  return user;
};

const validatePassword = async (plaintextPassword, passwordHash) => {
  const passwordMatch = await cryptoHandler.compare(
    plaintextPassword,
    passwordHash
  );
  if (!passwordMatch)
    throw new errors.UnauthenticatedError(
      "Password does not match the username."
    );
};

const createRefreshToken = async (user) => {
  const refreshTokenValue = tokenUtility.generateRefreshToken(user);
  await RefreshToken.create({
    valueHash: await cryptoHandler.encrypt(refreshTokenValue),
    owner: user._id,
  });
  return refreshTokenValue;
};

const getRefreshTokenByValue = async (value) => {
  const refreshTokens = await RefreshToken.find().populate("owner");
  const result = await Promise.all(
    refreshTokens.filter(async (refreshToken) => {
      const validation = await cryptoHandler.compare(
        value,
        refreshToken.valueHash
      );
      return validation;
    })
  );
  if (result.length === 0)
    throw new errors.UnauthenticatedError("Invalid refresh token.");
  return result[0];
};

const deleteRefreshToken = async (refreshTokenValue) => {
  const refreshToken = await getRefreshTokenByValue(refreshTokenValue);
  await RefreshToken.findByIdAndDelete({ _id: refreshToken._id });
};

const validateRefreshToken = async (refreshTokenValue) => {
  const refreshToken = await getRefreshTokenByValue(refreshTokenValue);
  try {
    await tokenUtility.verifyRefreshToken(refreshTokenValue);
  } catch (error) {
    await deleteRefreshToken(refreshTokenValue);
    throw new errors.UnauthenticatedError("Invalid refresh token.");
  }
  return refreshToken.owner;
};

const registerUser = async (user) => {
  await checkUsernameAvailabilty(user.username);
  await checkEmailAvailabilty(user.email);
  validatePasswordStrength(user.password);
  user = await hashPassword(user);
  basicUserRole = await getRoleByName("Basic User"); // On self-registration role is Basic User.
  await User.create({ ...user, roles: [basicUserRole._id] });
  return {
    message: "User successfully registered.",
  };
};

const logInUser = async (loginData) => {
  const user = await getUserByUsername(loginData.username);
  await validatePassword(loginData.password, user.passwordHash);
  const refreshToken = await createRefreshToken(user);
  return {
    accessToken: tokenUtility.generateAccessToken(user),
    refreshToken: refreshToken,
  };
};

const refreshAccessToken = async (refreshTokenValue) => {
  const user = await validateRefreshToken(refreshTokenValue);
  await deleteRefreshToken(refreshTokenValue);
  const refreshToken = await createRefreshToken(user);
  return {
    accessToken: tokenUtility.generateAccessToken(user),
    refreshToken,
  };
};

const logOutUser = async (refreshTokenValue) => {
  await deleteRefreshToken(refreshTokenValue);
};

module.exports = {
  registerUser,
  logInUser,
  refreshAccessToken,
  logOutUser,
};

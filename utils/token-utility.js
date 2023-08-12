const jwt = require("jsonwebtoken");
const environment = require("../config/environment");
const errors = require("../errors/errors");
const cryptoHandler = require("./crypto-handler");

const generateJwt = (payload, secretKey, expirationTime) => {
  return jwt.sign(payload, secretKey, {
    issuer: environment.authentication.jwt.issuer,
    expiresIn: expirationTime,
  });
};

const verifyJwt = (tokenValue, secretKey, tokenType = "JWT") => {
  try {
    const claims = jwt.verify(tokenValue, secretKey);
    return claims;
  } catch (error) {
    throw new errors.UnauthenticatedError(`Invalid ${tokenType}.`);
  }
};

const generateAccessToken = (user) => {
  const payload = {
    username: user.username,
    roles: user.roles.map((role) => role.name), // Roles names should be present in access token (not identifiers).
  };
  return generateJwt(
    payload,
    environment.authentication.accessToken.secret,
    "15min"
  );
};

const getRefreshTokenExpirationDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  return new Date(date);
};

const createRefreshToken = async (user) => {
  const refreshTokenValue = cryptoHandler.generateRandomString();
  const refreshToken = {
    valueHash: await cryptoHandler.hash(refreshTokenValue),
    expirationDate: getRefreshTokenExpirationDate(),
    owner: user._id,
  };
  return {
    refreshToken,
    refreshTokenValue,
  };
};

const verifyAccessToken = async (accessToken) => {
  const { username, roles } = verifyJwt(
    accessToken,
    environment.authentication.accessToken.secret,
    "access token"
  );
  return {
    username,
    roles,
  };
};

const verifyRefreshToken = (refreshToken) => {
  if (refreshToken.expirationDate > new Date()) return;
  throw new Error("Refresh token expired.");
};

module.exports = {
  generateAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

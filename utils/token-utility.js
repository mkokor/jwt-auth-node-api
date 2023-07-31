const jwt = require("jsonwebtoken");
const environment = require("../config/environment");

const generateJwt = (payload, secretKey, expirationTime) => {
  return jwt.sign(payload, secretKey, {
    issuer: environment.authentication.jwtIssuer,
    expiresIn: expirationTime,
  });
};

const verifyJwt = async (tokenValue, secretKey, tokenType = "JWT") => {
  try {
    const { username } = await jwt.verify(tokenValue, secretKey);
    return { username };
  } catch (error) {
    throw new Error(`Invalid ${tokenType}.`);
  }
};

const generateAccessToken = (user) => {
  const payload = { username: user.username };
  return generateJwt(
    payload,
    environment.authentication.accessTokenSecret,
    "15min"
  );
};

const generateRefreshToken = (user) => {
  const payload = { username: user.username };
  return generateJwt(
    payload,
    environment.authentication.refreshTokenSecret,
    "20s"
  );
};

const verifyAccessToken = async (accessToken) => {
  const user = await verifyJwt(
    accessToken,
    environment.authentication.accessTokenSecret,
    "access token"
  );
  return user;
};

const verifyRefreshToken = async (refreshToken) => {
  const user = await verifyJwt(
    refreshToken,
    environment.authentication.refreshTokenSecret,
    "refresh token"
  );
  return user;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

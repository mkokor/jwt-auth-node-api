const jwt = require("jsonwebtoken");
const environment = require("../config/environment");

const generateJwt = (payload, secretKey, expirationTime) => {
  return jwt.sign(payload, secretKey, {
    issuer: environment.authentication.jwtIssuer,
    expiresIn: expirationTime,
  });
};

const verifyJwt = async (tokenValue, secretKey) => {
  try {
    const { username } = await jwt.verify(tokenValue, secretKey);
    return { username };
  } catch (error) {
    throw new Error(
      `${error.message.replace(new RegExp("jwt"), "Access token")}.`
    );
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
    "1d"
  );
};

const verifyAccessToken = async (accessToken) => {
  const user = await verifyJwt(
    accessToken,
    environment.authentication.accessTokenSecret
  );
  return user;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
};

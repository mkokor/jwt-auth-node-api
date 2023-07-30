const jwt = require("jsonwebtoken");
const environment = require("../config/environment");

const generateJwt = (payload, secretKey, expirationTime) => {
  return jwt.sign(payload, secretKey, {
    issuer: environment.authentication.jwtIssuer,
    expiresIn: expirationTime,
  });
};

const generateAccessToken = (user) => {
  const payload = { username: user.username };
  return generateJwt(
    payload,
    environment.authentication.accessTokenSecret,
    "30s"
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

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};

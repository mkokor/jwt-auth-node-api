const jwt = require("jsonwebtoken");
const environment = require("../config/environment");

const generateJwt = (payload, secretKey, expirationTime) => {
  return jwt.sign(payload, secretKey, {
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

module.exports = {
  generateAccessToken,
};

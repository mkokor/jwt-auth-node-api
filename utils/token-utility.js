const jwt = require("jsonwebtoken");
const environment = require("../config/environment");

const generateJwt = (payload, secretKey, expirationTime) => {
  return jwt.sign(payload, secretKey, {
    issuer: environment.authentication.jwtIssuer,
    expiresIn: expirationTime,
  });
};

const verifyJwt = (tokenValue, secretKey, tokenType = "JWT") => {
  try {
    const claims = jwt.verify(tokenValue, secretKey);
    return claims;
  } catch (error) {
    throw new Error(`Invalid ${tokenType}.`);
  }
};

const generateAccessToken = (user) => {
  const payload = {
    username: user.username,
    roles: user.roles.map((role) => role.name), // Roles names should be present in access token (not identifiers).
  };
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
  const { username, roles } = verifyJwt(
    accessToken,
    environment.authentication.accessTokenSecret,
    "access token"
  );
  return {
    username,
    roles,
  };
};

const verifyRefreshToken = async (refreshToken) => {
  const { username } = verifyJwt(
    refreshToken,
    environment.authentication.refreshTokenSecret,
    "refresh token"
  );
  return { username };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

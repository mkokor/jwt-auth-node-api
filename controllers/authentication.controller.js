const authenticationService = require("../services/authentication.service");

const registerUser = async (req, res) => {
  const result = await authenticationService.registerUser(req.body);
  res.status(201).json(result);
};

const logInUser = async (req, res) => {
  const { accessToken, refreshToken } = await authenticationService.logInUser(
    req.body
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 24,
  });
  res.status(200).json({ accessToken });
};

const refreshAccessToken = async (req, res, next) => {
  const { accessToken } = await authenticationService.refreshAccessToken(
    req.cookies.refreshToken
  );
  res.status(200).json({
    accessToken: accessToken,
  });
};

module.exports = {
  registerUser,
  logInUser,
  refreshAccessToken,
};

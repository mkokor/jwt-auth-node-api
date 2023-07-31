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
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 24,
  });
  res.status(200).json({ accessToken });
};

const refreshAccessToken = async (req, res) => {
  const { accessToken } = await authenticationService.refreshAccessToken(
    req.cookies.refreshToken
  );
  res.status(200).json({
    accessToken: accessToken,
  });
};

const logOutUser = async (req, res) => {
  await authenticationService.logOutUser(req.cookies.refreshToken);
  // Client side should delete access token from local storage (or other storage system)!
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(200).json({ message: "User successfully logged out." });
};

module.exports = {
  registerUser,
  logInUser,
  refreshAccessToken,
  logOutUser,
};

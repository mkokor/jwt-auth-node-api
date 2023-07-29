const authenticationService = require("../services/authentication.service");

const registerUser = async (req, res) => {
  const result = await authenticationService.registerUser(req.body);
  res.status(201).json(result);
};

const logInUser = async (req, res) => {
  const result = await authenticationService.logInUser(req.body);
  res.status(200).json(result);
};

module.exports = {
  registerUser,
  logInUser,
};

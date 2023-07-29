const authenticationService = require("../services/authentication.service");

const registerUser = async (req, res) => {
  const result = await authenticationService.registerUser(req.body);
  res.status(200).json(result);
};

module.exports = {
  registerUser,
};

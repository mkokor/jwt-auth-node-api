const usersService = require("../services/users.service");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const result = await usersService.getAllUsers();
  res.status(200).json(result);
};

module.exports = {
  getAllUsers,
};

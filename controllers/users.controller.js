const usersService = require("../services/users.service");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
  const result = await usersService.getAllUsers();
  res.status(StatusCodes.OK).json(result);
};

module.exports = {
  getAllUsers,
};

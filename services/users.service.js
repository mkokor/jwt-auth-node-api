const { User } = require("../models/User");

const getAllUsers = async () => {
  const allUsers = await User.find();
  return allUsers;
};

module.exports = {
  getAllUsers,
};

const { User } = require("../models/User");

const getAllUsers = async () => {
  const allUsers = await User.find().populate("roles");
  return allUsers.map((user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    roles: user.roles.map((role) => role.name),
  }));
};

module.exports = {
  getAllUsers,
};

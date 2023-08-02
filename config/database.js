const mongoose = require("mongoose");
const { Role } = require("../models/Role");
const { User } = require("../models/User");
const cryptoHandler = require("../utils/crypto-handler");

const connectDatabase = async (connectionString) => {
  await mongoose.connect(connectionString);
};

const insertRoles = async () => {
  let insertedRoles = await Role.find();
  if (insertedRoles.length !== 0) return;
  const roles = [{ name: "Admin" }, { name: "Basic User" }];
  insertedRoles = await Role.insertMany(roles);
  return insertedRoles;
};

const insertUsers = async (roles = []) => {
  const insertedUsers = await User.find();
  if (insertedUsers.length !== 0) return;
  const users = [
    {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "johndoe@email",
      passwordHash: await cryptoHandler.encrypt("adminprofile123#"),
      roles: roles
        .filter((role) => role.name === "Admin")
        .map((role) => role._id),
    },
  ];
  await User.insertMany(users);
};

const seedDatabase = async () => {
  const roles = await insertRoles();
  await insertUsers(roles);
};

module.exports = {
  connectDatabase,
  seedDatabase,
};

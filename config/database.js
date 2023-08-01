const mongoose = require("mongoose");
const { Role } = require("../models/Role");

const connectDatabase = async (connectionString) => {
  await mongoose.connect(connectionString);
};

const seedDatabase = async () => {
  const seedData = {
    roles: [{ name: "Admin" }, { name: "Basic User" }],
  };

  await Role.deleteMany(); // In development mode server will be restarted multiple times.
  await Role.insertMany(seedData.roles);
};

module.exports = {
  connectDatabase,
  seedDatabase,
};

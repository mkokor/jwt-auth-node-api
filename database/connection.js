const mongoose = require("mongoose");

const connectDatabase = (connectionString) => {
  return mongoose.connect(connectionString);
};

module.exports = { connectDatabase };

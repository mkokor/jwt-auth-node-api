require("dotenv").config();

module.exports = {
  database: {
    connectionString: process.env.DB_CONNECTION_STRING,
  },
  application: {
    port: process.env.PORT || 3000,
  },
  authentication: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  },
};

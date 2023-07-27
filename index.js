const express = require("express");
const authenticationRoutes = require("./routes/authentication.routes");
const environment = require("./config/environment");
const { connectDatabase } = require("./database/connection");

const app = express();
const port = 3000;

app.use("/api/authentication", authenticationRoutes);

const runServer = async () => {
  try {
    await connectDatabase(environment.database.connectionString);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log("Error occured while connecting to the database.");
  }
};

runServer();

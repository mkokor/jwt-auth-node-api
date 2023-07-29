require("express-async-errors");
const express = require("express");
const bodyParser = require("body-parser");
const authenticationRoutes = require("./routes/authentication.routes");
const environment = require("./config/environment");
const { connectDatabase } = require("./config/database-connection");
const { notFoundRoute } = require("./middleware/not-found");
const { errorHandler } = require("./middleware/error-handler");
const {
  checkRegistrationData,
} = require("./middleware/registration-data-check");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api/authentication/registration", checkRegistrationData);

app.use("/api/authentication", authenticationRoutes);
app.use(notFoundRoute);

app.use(errorHandler);

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

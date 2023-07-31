require("express-async-errors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authenticationRoutes = require("./routes/authentication.routes");
const usersRoutes = require("./routes/users.routes");
const environment = require("./config/environment");
const corsOptions = require("./config/cors-options");
const { connectDatabase } = require("./config/database-connection");
const { notFoundRoute } = require("./middleware/not-found");
const { errorHandler } = require("./middleware/error-handler");
const { checkLoginData } = require("./middleware/login-data-check");
const { checkRefreshToken } = require("./middleware/refresh-token-check");
const {
  checkRegistrationData,
} = require("./middleware/registration-data-check");

const app = express();
const port = environment.application.port;

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/authentication/registration", checkRegistrationData);
app.use("/api/authentication/login", checkLoginData);
app.use("/api/authentication/access-token-refresh", checkRefreshToken);

app.use("/api/authentication", authenticationRoutes);
app.use("/api/users/", usersRoutes);
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

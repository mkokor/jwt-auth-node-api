const express = require("express");
const authenticationRoutes = require("./routes/authentication.routes");

const app = express();
const port = 3000;

app.use("/api/authentication", authenticationRoutes);

const runServer = () => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
};

runServer();

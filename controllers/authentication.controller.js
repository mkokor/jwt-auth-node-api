const authenticationService = require("../services/authentication.service");

const sayHelloWorld = (req, res) => {
  const result = authenticationService.sayHelloWorld();
  res.status(200).json(result);
};

module.exports = {
  sayHelloWorld,
};

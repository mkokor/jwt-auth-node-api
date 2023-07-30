const authenticateUser = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  console.log(authorizationHeader);
  next();
};

module.exports = { authenticateUser };

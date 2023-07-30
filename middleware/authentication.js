const { verifyAccessToken } = require("../utils/token-utility");

const processAuthorizationHeader = (authorizationHeader) => {
  const keyword = authorizationHeader.split(" ")[0];
  if (keyword.toLowerCase() !== "bearer")
    throw new Error("Invalid authorizatin header format.");
  return authorizationHeader.split(" ")["1"];
};

const authenticateUser = async (req, res, next) => {
  req.user = await verifyAccessToken(
    processAuthorizationHeader(req.headers["authorization"])
  );
  next();
};

module.exports = { authenticateUser };

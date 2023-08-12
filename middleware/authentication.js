const { verifyAccessToken } = require("../utils/token-utility");
const errors = require("../errors/errors");

const processAuthorizationHeader = (authorizationHeader) => {
  if (!authorizationHeader)
    throw new errors.UnauthenticatedError("Access token missing.");
  const keyword = authorizationHeader.split(" ")[0];
  if (keyword !== "Bearer")
    throw new errors.UnauthenticatedError(
      "Invalid authorization header format."
    );
  return authorizationHeader.split(" ")[1];
};

const authenticateUser = async (req, res, next) => {
  req.user = await verifyAccessToken(
    processAuthorizationHeader(
      req.headers.authorization || req.headers.Authorization
    )
  );
  next();
};

module.exports = { authenticateUser };

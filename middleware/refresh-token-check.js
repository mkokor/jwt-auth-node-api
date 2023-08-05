const errors = require("../errors/errors");

const checkRefreshToken = (req, res, next) => {
  if (!req.cookies || !req.cookies.refreshToken)
    throw new errors.BadRequestError("Refresh token could not be found.");
  next();
};

module.exports = { checkRefreshToken };

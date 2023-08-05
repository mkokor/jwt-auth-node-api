const errors = require("../errors/errors");

const authorizeUser = (allowedRoles) => {
  return (req, res, next) => {
    const result = req.user.roles
      .map((role) => allowedRoles.includes(role))
      .filter((role) => role === true);
    if (result.length === 0)
      throw new errors.UnauthorizedError("User unauthorized.");
    next();
  };
};

module.exports = { authorizeUser };

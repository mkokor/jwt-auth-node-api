const { StatusCodes } = require("http-status-codes");

const notFoundRoute = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: "Invalid route.",
  });
};

module.exports = { notFoundRoute };

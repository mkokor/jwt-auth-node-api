const notFoundRoute = (req, res, next) => {
  res.status(404).json({
    message: "Invalid route.",
  });
};

module.exports = { notFoundRoute };

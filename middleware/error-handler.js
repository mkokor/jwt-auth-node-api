const errorHandler = (err, req, res, next) => {
  const statusCode = !err.statusCode ? 500 : err.statusCode;
  res.status(statusCode).json({ message: err.message });
};

module.exports = { errorHandler };

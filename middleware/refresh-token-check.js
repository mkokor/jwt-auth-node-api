const checkRefreshToken = (req, res, next) => {
  if (!req.cookies || !req.cookies.refreshToken)
    throw new Error("Refresh token could not be found.");
  next();
};

module.exports = { checkRefreshToken };

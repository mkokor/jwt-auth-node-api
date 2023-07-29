const checkLoginData = (req, res, next) => {
  if (!req.body.username || !req.body.password)
    throw new Error("Incomplete data! Provide: username and password.");
  next();
};

module.exports = {
  checkLoginData,
};

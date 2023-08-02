const authorizeUser = (allowedRoles) => {
  return (req, res, next) => {
    console.log(allowedRoles);
    console.log(req.user.roles);
    next();
  };
};

module.exports = { authorizeUser };

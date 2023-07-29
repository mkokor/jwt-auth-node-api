const checkRegistrationData = (req, res, next) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  )
    throw new Error(
      "Incomplete data! Provide: first name, last name, username, email and password."
    );
  next();
};

module.exports = {
  checkRegistrationData,
};

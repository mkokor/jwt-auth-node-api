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

const extractRequiredData = (req, res, next) => {
  // Disables user to pass roles values.
  req.body = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  next();
};

module.exports = {
  checkRegistrationData,
  extractRequiredData,
};

const bcrypt = require("bcrypt");

const getNumberOfSaltRounds = () => {
  return 10;
};

const encrypt = async (value) => {
  const result = await bcrypt.hash(value, getNumberOfSaltRounds());
  return result;
};

module.exports = {
  encrypt,
};

const bcrypt = require("bcrypt");
const crypto = require("crypto");

const getNumberOfSaltRounds = () => {
  return 10;
};

const generateRandomString = () => {
  return crypto.randomBytes(64).toString("hex");
};

const hash = async (value) => {
  const result = await bcrypt.hash(value, getNumberOfSaltRounds());
  return result;
};

const compare = async (plaintext, encryptedValue) => {
  const result = await bcrypt.compare(plaintext, encryptedValue);
  return result;
};

module.exports = {
  hash,
  compare,
  generateRandomString,
};

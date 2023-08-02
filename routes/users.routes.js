const express = require("express");
const usersController = require("../controllers/users.controller");
const { authenticateUser } = require("../middleware/authentication");
const { authorizeUser } = require("../middleware/authorization");

const router = express.Router();

router.get(
  "/",
  authenticateUser,
  authorizeUser(["Admin"]),
  usersController.getAllUsers
);

module.exports = router;

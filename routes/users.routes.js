const express = require("express");
const usersController = require("../controllers/users.controller");
const { authenticateUser } = require("../middleware/authentication");

const router = express.Router();

router.get("/", authenticateUser, usersController.getAllUsers);

module.exports = router;

const express = require("express");
const authenticationController = require("../controllers/authentication.controller");

const router = express.Router();

router.get("/registration", authenticationController.registerUser);
router.post("/login", authenticationController.logInUser);

module.exports = router;

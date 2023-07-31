const express = require("express");
const authenticationController = require("../controllers/authentication.controller");

const router = express.Router();

router.get("/registration", authenticationController.registerUser);

router.post("/login", authenticationController.logInUser);

router.post(
  "/access-token-refresh",
  authenticationController.refreshAccessToken
);

router.post("/logout", authenticationController.logOutUser);

module.exports = router;

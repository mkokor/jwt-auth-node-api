const express = require("express");
const authenticationController = require("../controllers/authentication.controller");

const router = express.Router();

router.get("/hello-world", authenticationController.sayHelloWorld);

module.exports = router;

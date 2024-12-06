const express = require("express");
const router = express.Router();

const userSignupController = require("../controller/userSignup");
const userSigninController = require("../controller/userSignin");

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);

module.exports = router;

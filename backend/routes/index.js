const express = require("express");
const router = express.Router();

const userSignupController = require("../controller/userSignup");
const userSigninController = require("../controller/userSignin");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/userLogout");
const userForgotPassword = require("../controller/userForgotPassword");
const userResetPassword = require("../controller/userResetPassword");

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// Forgot Password routes
router.post("/forgot-password", userForgotPassword);
router.post("/reset-password/:token", userResetPassword);

module.exports = router;

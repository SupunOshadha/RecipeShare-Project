const express = require("express");
const router = express.Router();

const userSignupController = require("../controller/user/userSignup");
const userSigninController = require("../controller/user/userSignin");
const userDetailsController = require("../controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/user/userLogout");
const userForgotPassword = require("../controller/user/userForgotPassword");
const userResetPassword = require("../controller/user/userResetPassword");
const UploadProductController = require("../controller/product/uploadProduct");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const approveProductController = require("../controller/product/approveProductController");
const rejectProductController = require("../controller/product/rejectProductController ");
const deleteUserController = require("../controller/user/deleteUserController");
const getCategoryProduct = require("../controller/product/getCategoryProduct");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");

router.post("/signup", userSignupController);
router.post("/signin", userSigninController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// Forgot Password routes
router.post("/forgot-password", userForgotPassword);
router.post("/reset-password/:token", userResetPassword);

//admin panel
router.get("/all-user", authToken, allUsers);
router.post("/update-user", authToken, updateUser);
router.delete("/delete-user/:userId", authToken, deleteUserController);
router.post("/update-product", authToken, updateProductController);
router.post("/approve-product", authToken, approveProductController);
router.delete("/reject-product/:productId", authToken, rejectProductController);

//recipe
router.post("/upload-recipe", authToken, UploadProductController);
router.get("/get-product", getProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);

module.exports = router;

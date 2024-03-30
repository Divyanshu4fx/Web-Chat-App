const express = require('express');
const router = express.Router();
const { signup, login, logout ,verifyEmail,verifyOTP, changePasswordController} = require('../controllers/authController.js');


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyEmail", verifyEmail);
router.post("/verifyOTP", verifyOTP);
router.post("/changePassword", changePasswordController);
module.exports = router;
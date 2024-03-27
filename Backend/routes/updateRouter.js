const express = require('express');
const {updateUser , updatePassword,updateProfilePic} = require("../controllers/updateController");
const protectRoute = require("../middleWare/protectRoute")
const upload = require('../middleWare/storageHandle')

const router = express.Router();
router.put("/user",protectRoute,updateUser);
router.put("/password",protectRoute,updatePassword);
router.post("/profilePic",upload.single('profileImage'),updateProfilePic)
module.exports = router;
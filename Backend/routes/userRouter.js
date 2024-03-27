const express = require('express');
const protectRoute = require('../middleWare/protectRoute');
const getUserList = require('../controllers/getUserListController.js');
router = express.Router()

router.get("/",protectRoute,getUserList);
// router.get("/",getUserList);
module.exports=router;
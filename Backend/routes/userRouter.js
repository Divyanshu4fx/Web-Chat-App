const express = require('express');
const protectRoute = require('../middleWare/protectRoute');
const { getUserList, getUser } = require('../controllers/getUserListController.js');
// const { route } = require('./groupRouter.js');
// const router = require('./groupRouter.js');
router = express.Router()

router.get("/", protectRoute, getUserList);
router.get("/user/:id", getUser);
// router.get("/",getUserList);
module.exports = router;
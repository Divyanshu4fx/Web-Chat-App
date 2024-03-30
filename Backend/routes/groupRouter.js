const express = require('express');
const protectRoute = require('../middleWare/protectRoute.js');
const {createGroup} = require('../controllers/groupController.js');
const router = express.Router();

router.post("/creategroup",protectRoute, createGroup);

module.exports = router;
const express = require('express');
const { sendMessage, getMessage } = require("../controllers/messageController.js");
const protectRoute = require('../middleWare/protectRoute.js');

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router


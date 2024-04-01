const express = require('express');
const { sendMessage, getMessage, uploadFile, downloadFile } = require("../controllers/messageController.js");
const protectRoute = require('../middleWare/protectRoute.js');
const upload = require('../utils/upload.js');

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/uploadFile/:id", protectRoute,upload.single("file"), uploadFile)
router.get("/file/:fileId", protectRoute, downloadFile)
module.exports = router


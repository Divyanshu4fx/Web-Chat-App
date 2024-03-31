const express = require('express');
const protectRoute = require('../middleWare/protectRoute.js');
const { createGroup,getGroups,sendGroupMessage,getGroupMessage } = require('../controllers/groupController.js');
const router = express.Router();

router.post("/creategroup", protectRoute, createGroup);
router.get("/getgroups", protectRoute, getGroups);
router.post("/sendmessage/:id",protectRoute,sendGroupMessage);
router.get("/groupmessage/:id",protectRoute,getGroupMessage);

module.exports = router;
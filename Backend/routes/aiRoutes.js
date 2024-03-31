const express = require('express');
const protectRoute = require('../middleWare/protectRoute');
const {aiListenAndSend} = require("../controllers/aiController");
router = express.Router()

router.post("/",protectRoute,aiListenAndSend);
module.exports = router;
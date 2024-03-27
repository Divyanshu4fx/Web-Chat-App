const User = require('../models/userModel.js');

const getUserList = async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const filteredUser = await User.find({_id : {$ne : loggedUserId}}).select("-password");
        res.status(200).json(filteredUser);
    } catch (e) {
        console.log("Error in getUserList " + e.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = getUserList;
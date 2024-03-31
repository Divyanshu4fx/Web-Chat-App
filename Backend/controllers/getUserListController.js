const User = require('../models/userModel.js');
const getUserList = async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const filteredUser = await User.find({ _id: { $ne: loggedUserId } }).select("-password");
        res.status(200).json(filteredUser);
    } catch (e) {
        console.log("Error in getUserList " + e.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const user = await User.findById({ _id: userId }).select("fullname profilePic");
        res.status(200).json(user);
    }
    catch (e) {
        console.log("Error in getUser " + e.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { getUserList, getUser };
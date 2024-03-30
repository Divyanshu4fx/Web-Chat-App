const GroupChat = require("../models/groupChatModel");
const createGroup = async (req, res) => {
    const loggedUserId = req.user._id;
    const { groupName, participants } = req.body;
    try {
        const group = await GroupChat.findOne({ chatName: groupName });
        if (group) {
            res.status(400).json({ error: "Group already exists!" });
            return;
        }
        if (participants.length < 2) {
            res.status(400).json({ error: "Group must have more than 2 members." });
            return;
        }

        const newGroup = new GroupChat(
            {
                chatName: groupName,
                participants: [...participants, loggedUserId],
                groupAdmin: loggedUserId,
            }
        );
        if (!newGroup) {
            res.status(400).json({ error: "Invalid Group Data" });
            return;
        }
        const savedGroup = await newGroup.save();
        res.status(200).json({message : "Group Created Succesfully"});
    }
    catch (e) {
        console.log("Error in group controller");
        res.status(500).json({ error: e.message });
    }
};

module.exports = {createGroup};
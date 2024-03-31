const e = require("express");
const GroupChat = require("../models/groupChatModel");
const GroupMessage = require("../models/groupMessageModel");
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
        res.status(200).json({ message: "Group Created Succesfully" });
    }
    catch (e) {
        console.log("Error in group controller");
        res.status(500).json({ error: e.message });
    }
};

const getGroups = async (req, res) => {
    const loggedUserId = req.user._id;
    try {
        const groups = await GroupChat.find({ participants: loggedUserId }).populate('participants', 'fullname');
        // const groups = await GroupChat.find({ participants: loggedUserId }).populate('participants');
        if (groups.length === 0) {
            res.status(400).json({ error: "No groups found" });
            return;
        }
        res.status(200).json(groups);
    } catch (error) {
        console.log("Error in groupController");
        res.status(500).json(error.message);
    }
}

const sendGroupMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: groupId } = req.params;
        const senderId = req.user._id;
        const group = await GroupChat.findById({ _id: groupId }).select("-groupImage");
        if (!group) {
            res.status(400).json("Group Not Found");
        }
        const newMessage = new GroupMessage(
            {
                senderId: senderId,
                chat: groupId,
                message: message,
            }
        )

        if (newMessage) {
            group.messages.push(newMessage._id);
        }
        await Promise.all([group.save(), newMessage.save()])

        // const recevierSocketId = getReceiverSocketId(reciverId);
        // if (recevierSocketId) {
        //     io.to(recevierSocketId).emit("newMessage", newMessage);
        // }

        res.status(201).json(newMessage)

    } catch (e) {
        console.log("Error in sendMessage controller " + e.message);
        res.status(500).json({ error: "Interval server error" });
    }
}

const getGroupMessage = async (req, res) => {
    try {
        const { id: groupId } = req.params;
        const group = await GroupChat.findById({ _id: groupId }).select("-groupImage").populate("messages");
        res.status(200).json(group.messages);
    }
    catch(error)
    {
        res.status(500).json(error.message);
    }
}
module.exports = { createGroup, getGroups, sendGroupMessage, getGroupMessage };
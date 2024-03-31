const mongoose = require('mongoose');

const groupMessageModel = mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "GroupChat" },
},
    {
        timestamps: true,
    })

const GroupMessage = mongoose.model("GroupMessage", groupMessageModel);

module.exports = GroupMessage;
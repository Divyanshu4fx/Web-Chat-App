const mongoose = require('mongoose');

const groupchatModel = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "GroupMessage",
                default: [],
            }
        ],
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        groupImage: {
            type: String,
            default: "https://www.culvercitychamber.com/wp-content/uploads/group-image-placeholder.jpg",
        }
    }
    , { timestamps: true }
)

const GChat = mongoose.model("GroupChat", groupchatModel);

module.exports = GChat;
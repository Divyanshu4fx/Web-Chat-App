const Convsersation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId } = require("../socket/socket");
const {io} = require("../socket/socket");
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: reciverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Convsersation.findOne({
            participants: { $all: [senderId, reciverId] },
        })

        if (!conversation) {
            conversation = await Convsersation.create(
                {
                    participants: [senderId, reciverId],
                }
            )
        }

        const newMessage = new Message(
            {
                senderId: senderId,
                reciverId: reciverId,
                message: message,
            }
        )

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(), newMessage.save()])

        const recevierSocketId = getReceiverSocketId(reciverId);
        if(recevierSocketId)
        {
            io.to(recevierSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage)

    } catch (e) {
        console.log("Error in sendMessage controller" + e.message);
        res.status(500).json({ error: "Interval server error" });
    }
}

const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = await Convsersation.findOne(
            {
                participants: { $all: [senderId, userToChatId] },
            }
        ).populate("messages");
        if (!conversation){
           return res.status(200).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (e) {
        console.log("Error in getMessage controller " + e.message);
        res.status(500).json({ error: "Interval server error" });
    }
}

module.exports = { sendMessage, getMessage };
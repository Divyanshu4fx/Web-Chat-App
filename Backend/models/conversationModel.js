const mongoose = require('mongoose');

const convsersationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
}, { timestamps: true })


const Convsersation = mongoose.model("Conversation", convsersationSchema)

module.exports = Convsersation;
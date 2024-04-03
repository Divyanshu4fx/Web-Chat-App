const Convsersation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId } = require("../socket/socket");
const { io } = require("../socket/socket");
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Convsersation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      conversation = await Convsersation.create({
        participants: [senderId, reciverId],
      });
    }

    const newMessage = new Message({
      senderId: senderId,
      reciverId: reciverId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    const recevierSocketId = getReceiverSocketId(reciverId);
    if (recevierSocketId) {
      io.to(recevierSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
  } catch (e) {
    console.log("Error in sendMessage controller" + e.message);
    res.status(500).json({ error: "Interval server error" });
  }
};

const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    const conversation = await Convsersation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (e) {
    console.log("Error in getMessage controller " + e.message);
    res.status(500).json({ error: "Interval server error" });
  }
};

const uploadFile = async (req, res) => {
  try {
    const { id: reciverId } = req.params;
    const senderId = req.user._id;
    let conversation = await Convsersation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!conversation) {
      conversation = await Convsersation.create({
        participants: [senderId, reciverId],
      });
    }


    const fileObj = {
      senderId: req.user._id,
      reciverId,
      isFileType: true,
      path: req.file.path,
      message: req.file.originalname,
    };
    const file = await Message.create(fileObj);
    if (file) {
      conversation.messages.push(file._id);
    }
    await conversation.save()
    const recevierSocketId = getReceiverSocketId(reciverId);
    if (recevierSocketId) {
      io.to(recevierSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(file);
  } catch (error) {
    console.log("Error in uploadFile controller " + error);
    res.status(500).json({
      message: "Error",
      success: false,
    });
  }
};
const downloadFile = async (req, res) => {
  try {
    const file = await Message.findById(req.params.fileId);
    res.download(file.path, file.message);
  } catch (error) {
    console.log("Error in downloadFile controller " + error);
    res.status(500).json({
      message: "Error",
      success: false,
    });
  }
};

module.exports = { sendMessage, getMessage, uploadFile, downloadFile };

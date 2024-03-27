const { Server } = require("socket.io");
const http = require('http');
const express = require("express");

const app = express();

const server = http.createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: ["http://localhost:3000"],
            methods: ["GET", "POST","PUT"],
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
            credentials: true,
        }
    }
)

const getReceiverSocketId = (receiverId)=>
{
    return userSocketMap[receiverId];
}

const userSocketMap = {}; 

io.on('connection', (socket) => {
    console.log("a user just connect", socket.id)
    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

module.exports = { app, io, server,getReceiverSocketId}
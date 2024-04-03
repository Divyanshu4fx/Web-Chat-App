const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const authRouter = require('./routes/authRoutes.js');
const connectToMongoDB = require('./DB/connectToDb.js');
const messageRouter = require('./routes/messageRoutes.js')
const userRouter = require("./routes/userRouter.js");
const updateRouter = require("./routes/updateRouter.js");
const groupRouter = require("./routes/groupRouter.js");
const aiRouter = require("./routes/aiRoutes.js");
const { app, server } = require("./socket/socket.js");


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users/", userRouter);
app.use("/api/update/", updateRouter);
app.use("/api/group/", groupRouter);
app.use("/api/ai", aiRouter);

fs.readdir('./', (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    
    console.log('Files in current directory:');
    files.forEach(file => {
      console.log(file);
    });
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));
console.log(__dirname);
console.log(path.join(__dirname, "../frontend/dist"));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend/dist", "index.html"));
})

app.get("/", (req, res) => {
    res.send("Hello World");
    res.end();
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
    connectToMongoDB();
})
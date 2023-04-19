const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io")
// const server = http.createServer(app);




// rest of your code...  
  const server = app.listen(process.env.PORT, () => {
    console.log(`Server is ready at ${process.env.PORT}`);
  });
  
  const io = new Server(server, { cors: { origin: '*' } });

  
  // Socket.io connection handling
  io.on('connection', (socket) => {
  
  socket.on('newUser', (userId) => {
    addUser(userId, socket.id);
  });
  
  
  socket.on('sendNotification', ({senderId,receiverId,type,replyId,reply})=>{

    const receiver = getUser(receiverId)
        if (receiver) {
            io.to(receiver.socketId).emit('getNotification', {
                senderId: senderId,
                type: type,
                replyId: replyId,
                reply: reply
            });
        }
    });
  

    socket.on('disconnect', () => {
        removeUser(socket.id);
    });
  });
  

  
  // helper functions for managing online users array
  let onlineUsers = [];
  
  const addUser = (userId, socketId) => {
    if (!onlineUsers.some((user) => user._id === userId)) {
      onlineUsers.push({ _id: userId, socketId });
    }
  };
  
  const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };
  
  
  const getUser = (userId) =>{
    return onlineUsers.find(user => user._id == userId); 
  }
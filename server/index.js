const express =   require("express");
const mongoose =  require("mongoose");
const cors = require("cors");
const helmet =  require("helmet");
const dotenv =  require('dotenv')
const morgan =  require("morgan");
const {Server} = require("socket.io")
const userRoute = require('./routes/users')
const adminRoute = require('./routes/admin')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const chatRoute = require('./routes/chat')
const notificationRoute = require('./routes/notification')
const router = require('express').Router();
const notificationController = require("./controllers/notificationController");

const app = express();
dotenv.config()

//Database
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
.then(()=>{
    console.log('Database Connected Successfully')
})
.catch((err)=>{
    console.log('err = ',err.message)
}) 

//Middleware
app.use(express.json())
app.use(cors());
app.use(helmet())
app.use(morgan('common'))

// routes
router.get('/asdf', (req, res) => {
  res.send('Hello world!');
});
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)
app.use('/api/auth',authRoute)
app.use('/api/notification',notificationRoute)
app.use('/api/admin',adminRoute)
app.use('/api/chat',chatRoute)



const server = app.listen(process.env.PORT, () => {
  console.log(`Server is ready at ${process.env.PORT}`);
});


// Socket
const io = new Server(server, { cors: { origin: '*' } });
module.exports = io;
    // Socket.io connection handling
    io.on('connection', (socket) => {

    // add user to online users array on connection
    socket.on('newUser', (userId) => {
      addUser(userId, socket.id);
    });

    socket.on('sendNotification', (data)=>{
        console.log('ehehehh ',data)
        const receiver = getUser(data.receiverId)
        if (receiver) {
          io.to(receiver.socketId).emit('getNotification', data);
        }
    });

    socket.on("sendMessage",(data)=>{
      console.log('data ',data)
      // io.emit('receiveMessage',data);
      socket.broadcast.emit('receiveMessage', data);
    })


    socket.on("setBlocked",(data)=>{
      console.log(data);
      const receiver = getUser(data.receiverId)
      if(receiver){
        io.to(receiver.socketId).emit('getBlocked');
      }
    })

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
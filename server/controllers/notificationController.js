const NotificationModel = require('../models/NotificationModel')
const bcrypt = require('bcrypt');
const  mongoose  = require('mongoose');
const ReviewModel =  require('../models/ReviewModel')
const dotenv =  require('dotenv')
// const io = require("../index.js");

// const { Server } = require("socket.io");
// const io = new Server(process.env.PORT);

const notificationController =  {
    followNotiy : async(req,res) =>{
        try {
            console.log('followed broo')
            const notificationFor = req.params.id;
            const notificationData = req.body.notificationData;



            const newNotification = await new NotificationModel(notificationData).save();

          // res.redirect('/asdf')
            res.status(200).json(newNotification);
        } catch (error) {
            console.log('errrorr => ',error);
            res.status(500);
        }
        
    },
    getNotifications: async (req, res) => {
      console.log('311111111111')
        try {
          const notificationFor = req.params.id;
          console.log('nn ',notificationFor)
          const notifications = await NotificationModel.find({notificationFor:Object(notificationFor)})
                .populate('notificationBy','_id name username email profilePicture')
                .populate('postId','image')
                .sort({createdAt:-1})
          res.status(200).json(notifications);
        } catch (error) {
          console.log('error => ', error);
          res.status(500);
        }
    },


    makeNotificationSeen : async(req,res) =>{
      console.log('makeNotificationSeenn\n')
      try {
        const userId = Object(req.params.id);
        const response = await NotificationModel.updateMany({notificationFor: userId},{$set:{read:true}});
      } catch (error) {
        console.log('error => ',error);
        res.status(500);
      }
    }
}


module.exports = notificationController;



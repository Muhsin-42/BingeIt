const NotificationModel = require('../models/NotificationModel')
const bcrypt = require('bcrypt');
const  mongoose  = require('mongoose');
const ReviewModel =  require('../models/ReviewModel')
const dotenv =  require('dotenv')

const notificationController =  {
    followNotiy : async(req,res) =>{
        try {
            const notificationFor = req.params.id;
            const notificationData = req.body.notificationData;
            const newNotification = await new NotificationModel(notificationData).save();

            res.status(200).json(newNotification);
        } catch (error) {
            res.status(500);
        }
        
    },
    getNotifications: async (req, res) => {
        try {
          const notificationFor = req.params.id;
          const notifications = await NotificationModel.find({notificationFor:Object(notificationFor)})
                .populate('notificationBy','_id name username email profilePicture')
                .populate('postId','image')
                .sort({createdAt:-1})
          res.status(200).json(notifications);
        } catch (error) {
          res.status(500);
        }
    },


    makeNotificationSeen : async(req,res) =>{
      try {
        const userId = Object(req.params.id);
        const response = await NotificationModel.updateMany({notificationFor: userId},{$set:{read:true}});
      } catch (error) {
        res.status(500);
      }
    }
}


module.exports = notificationController;



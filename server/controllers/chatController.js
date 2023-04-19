const {User} = require('../models/UserModel')
const  mongoose  = require('mongoose');
const NotificationModel = require('../models/NotificationModel')
const GroupsModel = require('../models/GroupsModel');



const chatsController = {
    
    createGroup : async (req,res) =>{
        try {
            const { name, description, creator, members, image } = req.body;
            console.log('reqqqq ',req.body)
            const newGroup = new GroupsModel({
              name,
              description,
              creator,
              members,
              image
            });
            const savedGroup = await newGroup.save();
            const createdGroup =  await GroupsModel.findById(savedGroup._id).populate('creator members messages.sender', 'username name profilePicture email');
            res.status(201).json(createdGroup);
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
          }
    },
    getGroups : async (req,res) =>{
      try {
        const groups = await GroupsModel.find().populate('creator members messages.sender', 'username name profilePicture email');
        res.json(groups);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },


    addMessage : async (req, res) => {
      const userId = req.body.userId;
      const groupId = req.params.groupId;
      const text = req.body.text;
    
      try {
        // Find the group and user
        const group = await GroupsModel.findById(groupId);
        // const user = await UsersMode.findById(userId);
        
        // Create a new message and add it to the group's messages array
        const newMessage = {
          sender: userId,
          text: text
        };
        group.messages.push(newMessage);
        await group.save();
        const updatedGroup = await GroupsModel.findById(groupId).populate('creator members messages.sender', 'username name profilePicture email');
        
        res.status(201).json(updatedGroup);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }

}


module.exports = chatsController;
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  type:{
    type: String,
    default: 'text',
    required: false
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }],
  messages: [messageSchema]
},{timestamps:true});

const Group = mongoose.model('groups', groupSchema);

module.exports = Group;

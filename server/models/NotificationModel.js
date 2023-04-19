const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
    type:{
        type: String,
        required: true
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    reviewId: {
        type: Schema.Types.ObjectId,
        ref : 'reviews'
    },
    postId:{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    notificationFor: {
        type: Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },
    notificationBy: {
        type: Schema.Types.ObjectId,
        ref : 'users'
    },
    
    notificationMessage: {
        type: String,
        required: true,
    },
    read:{
        type: Boolean,
        default: false
    }
},{timestamps:true});

const NotificationModel = mongoose.model('notifications', NotificationSchema);

module.exports = NotificationModel;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReplySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },
    reviewId:{
        type: Schema.Types.ObjectId,
        ref : 'reviews',
        required: true
    },
    replyMessage: {
        type: String,
        required: true,
    },
    likes : {
        type: Array(Schema.Types.ObjectId),
        default: []
    }

},{timestamps:true});

const RepliesModel = mongoose.model('replies', ReplySchema);

module.exports = RepliesModel;

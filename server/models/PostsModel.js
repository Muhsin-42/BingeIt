const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostsSchema = new Schema({
    content: {
        type: String,
        require:false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    image: {
        type: String,
        required: false
    },
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: [{
        text: {
            type: String,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        isDelete: {
            type: Boolean,
            default: false
        }
    }],
    reports: {
        type: Number,
        default: 0
    },
    isDelete: {
        type: Boolean,
        default: false
    }
},{timestamps:true});

const PostsModel = mongoose.model('posts', PostsSchema);

module.exports = PostsModel;

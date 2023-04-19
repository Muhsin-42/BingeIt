const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    movieId: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref : 'users',
        required: true
    },
    rating: {
        type: String,
        required: true,
    },
    reviewMessage: {
        type: String,
        required: true,
    },
    likes : {
        type: Array(Schema.Types.ObjectId),
        default: []
    }

},{timestamps:true});

const ReviewModel = mongoose.model('reviews', ReviewSchema);

module.exports = ReviewModel;

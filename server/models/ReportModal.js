const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportSchema = new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    reportedBy : {
        type: Schema.Types.ObjectId,
        ref : 'users'
    },
    reportReason: {
        type: String,
        required: true,
    },
    read:{
        type: Boolean,
        default: false
    },
    status:{
        type:String,
        default: 'reported'
    }
},{timestamps:true});

const ReportModal = mongoose.model('reports', ReportSchema);

module.exports = ReportModal;

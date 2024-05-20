const mongoose = require('mongoose');


const BlogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('Blog', BlogSchema);
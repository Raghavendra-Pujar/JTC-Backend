const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const posts = Schema({
    postId: {
        type:String,
        default: '',
        required: '',
        unique: true
    },
    title:{
        type: String,
        default: '',
        required: true
    },
    description:{
        type: String,
        default: '',
        required: true
    },
    createdOn:{
        type: Date,
        default: Date.now
    },
    upVotes: {
        type: Number,
        default: 0
    }
});

mongoose.model('postSchema', posts);
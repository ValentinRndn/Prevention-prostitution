const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,   
    },
    date: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    pin: {
        type: Boolean,
        required: true,
    },
    archive: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('Blog', BlogSchema);
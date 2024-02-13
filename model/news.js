const { text } = require('express');
const mongoose = require('mongoose');
const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
    },
    icon_id: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    short_content: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    }
}, {
    timestamps: true
});

const News = mongoose.model('news', NewsSchema);
module.exports = News;
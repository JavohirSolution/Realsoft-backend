const mongoose = require('mongoose');
const recommendationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    person: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cloudinary_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Recommadition = mongoose.model('recommendation', recommendationSchema);
module.exports.Recommadition = Recommadition;
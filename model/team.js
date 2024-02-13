const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    cloudinary_id: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Team = mongoose.model("team", teamSchema);
module.exports = Team;
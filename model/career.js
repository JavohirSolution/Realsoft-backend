const mongoose = require('mongoose');
const careerSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    icon_id: {
        type: String,
    },
    job: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    operatingMode:{
        type: String,
    }
}, {
    timestamps: true
});

const career = mongoose.model("career", careerSchema);
module.exports = career
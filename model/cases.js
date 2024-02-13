const mongoose = require('mongoose');
const CaseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    short_title: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    solution: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

const Cases = mongoose.model('cases', CaseSchema);
module.exports.Cases = Cases;
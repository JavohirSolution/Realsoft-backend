const mongoose = require("mongoose");
const SecuritySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true
    },
    cloudinary_id: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})
const SecurityModel = mongoose.model('security', SecuritySchema);
module.exports.Security = SecurityModel;
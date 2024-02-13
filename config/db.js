const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

const db = async () => {
    try {
        const connect = await mongoose.connect(mongoUrl);
        console.log(`Database is running`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = db
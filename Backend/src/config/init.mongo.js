const mongoose = require('mongoose');
const connectDB = require('./mongo');

const initMongo = async () => {
    await connectDB();
    mongoose.disconnect();
}

initMongo();

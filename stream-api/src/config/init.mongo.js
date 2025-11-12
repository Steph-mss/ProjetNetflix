const mongoose = require('mongoose');
const connectDB = require('./mongo');

const initMongo = async () => {
    await connectDB();
    // Seed data here if needed
    mongoose.disconnect();
}

initMongo();

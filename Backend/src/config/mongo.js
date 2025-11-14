const mongoose = require('mongoose');


require('dotenv').config();

const MONGO_URI = process.env.MONGO_URL; 

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error('Erreur: MONGO_URL n\'est pas défini dans .env');
    process.exit(1); 
  }
  try {
    
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected'); 
  } catch (err) {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
    process.exit(1); 
  }
};

module.exports = { connectDB, mongoose };
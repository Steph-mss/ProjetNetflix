const mongoose = require('mongoose');

// On charge dotenv/config pour être sûr que les variables sont là
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URL; 

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error('Erreur: MONGO_URL n\'est pas défini dans .env');
    process.exit(1); // Arrête tout si l'URL manque
  }
  try {
    // On enlève les options 'useNewUrlParser' et 'useUnifiedTopology' (obsolètes)
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected'); // Message de succès
  } catch (err) {
    console.error('❌ Erreur de connexion MongoDB:', err.message);
    process.exit(1); // Arrête tout si la connexion échoue
  }
};

// On exporte la fonction ET mongoose
module.exports = { connectDB, mongoose };
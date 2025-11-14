// stream-api/models/Favoris.mongo.js
const mongoose = require('mongoose');

const favorisSchema = new mongoose.Schema({
  userId: {
    type: Number, // L'ID de PostgreSQL
    required: true,
    index: true, // Bon pour les performances de recherche
  },
  sqlId: { // L'ID du film/série
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Film', 'Serie'] // <-- LA CORRECTION (avec majuscules)
  }
}, { timestamps: true });

module.exports = mongoose.model('Favoris', favorisSchema);
const mongoose = require('mongoose');

const FavorisSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['film', 'serie'],
    required: true,
  },
  sqlId: {
    type: Number,
    required: true,
  },
  dateAjout: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Favoris', FavorisSchema);

const mongoose = require('mongoose');

const favorisSchema = new mongoose.Schema({
  userId: {
    type: Number, 
    required: true,
    index: true, 
  },
  sqlId: { 
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Film', 'Serie'] 
  }
}, { timestamps: true });

module.exports = mongoose.model('Favoris', favorisSchema);
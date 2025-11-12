const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
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
  dateVisionnage: {
    type: Date,
    default: Date.now,
  },
  duree: {
    type: Number, // in minutes
  },
  metadata: {
    type: Object,
  },
});

module.exports = mongoose.model('History', HistorySchema);

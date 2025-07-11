const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  reserveDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Ready', 'Cancelled'], default: 'Pending' },
});

module.exports = mongoose.model('Reservation', reservationSchema); 
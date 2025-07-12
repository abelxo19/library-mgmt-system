const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  reserveDate: { type: Date, required: true, default: Date.now },
  status: { 
    type: String, 
    enum: ['Pending', 'Ready', 'Cancelled', 'Fulfilled'], 
    default: 'Pending' 
  },
  priority: { type: Number, default: 0 }, // For queue ordering
  notifiedAt: { type: Date }, // When member was notified book is ready
  expiresAt: { type: Date }, // When reservation expires
  notes: String,
}, {
  timestamps: true
});

// Add index for efficient queries
reservationSchema.index({ book: 1, status: 1 });
reservationSchema.index({ member: 1, status: 1 });
reservationSchema.index({ priority: -1, reserveDate: 1 });

module.exports = mongoose.model('Reservation', reservationSchema); 
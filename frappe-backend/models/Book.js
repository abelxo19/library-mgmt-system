const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publishDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Available', 'Borrowed', 'Reserved', 'Maintenance'], 
    default: 'Available' 
  },
  description: String,
  genre: String,
  copies: { type: Number, default: 1 },
  availableCopies: { type: Number, default: 1 },
  location: String, // Shelf location
  tags: [String],
}, {
  timestamps: true
});

// Add index for efficient queries
bookSchema.index({ status: 1 });
bookSchema.index({ title: 1, author: 1 });
bookSchema.index({ isbn: 1 });

module.exports = mongoose.model('Book', bookSchema); 
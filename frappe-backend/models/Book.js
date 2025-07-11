const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publishDate: { type: Date, required: true },
  status: { type: String, enum: ['Available', 'Borrowed'], default: 'Available' },
  description: String,
  genre: String,
});

module.exports = mongoose.model('Book', bookSchema); 
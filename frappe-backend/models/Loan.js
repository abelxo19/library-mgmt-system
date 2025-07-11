const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  borrowDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  returnDate: Date,
  status: { type: String, enum: ['Active', 'Returned', 'Overdue'], default: 'Active' },
});

module.exports = mongoose.model('Loan', loanSchema); 
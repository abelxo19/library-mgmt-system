const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  borrowDate: { type: Date, required: true, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { 
    type: String, 
    enum: ['Active', 'Returned', 'Overdue'], 
    default: 'Active' 
  },
  returnedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: String,
}, {
  timestamps: true
});

// Add index for efficient queries
loanSchema.index({ book: 1, status: 1 });
loanSchema.index({ member: 1, status: 1 });
loanSchema.index({ dueDate: 1, status: 1 });

module.exports = mongoose.model('Loan', loanSchema); 
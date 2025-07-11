const Loan = require('../models/Loan');
const Book = require('../models/Book');
const Member = require('../models/Member');

// Get all loans (admin/librarian only)
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('bookId', 'title author')
      .populate('memberId', 'name email');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get my loans (for members)
exports.getMyLoans = async (req, res) => {
  try {
    // Find member by user ID
    const member = await Member.findOne({ userId: req.user.id });
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const loans = await Loan.find({ memberId: member._id })
      .populate('bookId', 'title author');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create loan (admin/librarian only)
exports.createLoan = async (req, res) => {
  try {
    const { memberId, bookId, dueDate } = req.body;

    // Check if book is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Create loan
    const loan = new Loan({
      memberId,
      bookId,
      dueDate: new Date(dueDate),
      status: 'active'
    });

    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update loan (admin/librarian only)
exports.updateLoan = async (req, res) => {
  try {
    const { status, dueDate } = req.body;
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { status, dueDate },
      { new: true, runValidators: true }
    );
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete loan (admin/librarian only)
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.json({ message: 'Loan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 
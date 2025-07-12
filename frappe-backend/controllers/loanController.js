const Loan = require('../models/Loan');
const Book = require('../models/Book');
const Member = require('../models/Member');
const Reservation = require('../models/Reservation');

// Get all loans (admin/librarian only)
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('book', 'title author isbn')
      .populate('member', 'name email')
      .populate('returnedBy', 'username')
      .sort({ createdAt: -1 });
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

    const loans = await Loan.find({ member: member._id })
      .populate('book', 'title author isbn')
      .sort({ createdAt: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create loan (admin/librarian only)
exports.createLoan = async (req, res) => {
  try {
    const { bookId, memberId, dueDate, notes } = req.body;

    // Check if book is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.status !== 'Available' || book.availableCopies <= 0) {
      return res.status(400).json({ error: 'Book is not available for loan' });
    }

    // Check if member exists
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Check if member already has this book on loan
    const existingLoan = await Loan.findOne({
      book: bookId,
      member: memberId,
      status: 'Active'
    });

    if (existingLoan) {
      return res.status(400).json({ error: 'Member already has this book on loan' });
    }

    // Create loan with explicit field mapping
    const loan = new Loan({
      book: bookId,
      member: memberId,
      borrowDate: new Date(),
      dueDate: new Date(dueDate),
      status: 'Active', // Explicitly set the correct status
      notes: notes || ''
    });

    await loan.save();

    // Update book availability
    book.availableCopies -= 1;
    if (book.availableCopies === 0) {
      book.status = 'Borrowed';
    }
    await book.save();

    // Populate the response
    await loan.populate('book', 'title author isbn');
    await loan.populate('member', 'name email');

    res.status(201).json(loan);
  } catch (err) {
    console.error('Loan creation error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Return book (admin/librarian only)
exports.returnBook = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { notes } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    if (loan.status === 'Returned') {
      return res.status(400).json({ error: 'Book is already returned' });
    }

    // Update loan
    loan.returnDate = new Date();
    loan.status = 'Returned';
    loan.returnedBy = req.user.id;
    if (notes) loan.notes = notes;
    await loan.save();

    // Update book availability
    const book = await Book.findById(loan.book);
    book.availableCopies += 1;
    if (book.availableCopies > 0) {
      book.status = 'Available';
    }
    await book.save();

    // Check for pending reservations and notify first in queue
    await checkAndNotifyReservations(book._id);

    await loan.populate('book', 'title author isbn');
    await loan.populate('member', 'name email');
    await loan.populate('returnedBy', 'username');

    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update loan (admin/librarian only)
exports.updateLoan = async (req, res) => {
  try {
    const { dueDate, notes } = req.body;
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { dueDate: new Date(dueDate), notes },
      { new: true, runValidators: true }
    );
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    
    await loan.populate('book', 'title author isbn');
    await loan.populate('member', 'name email');
    await loan.populate('returnedBy', 'username');
    
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete loan (admin/librarian only)
exports.deleteLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    // If loan is active, update book availability
    if (loan.status === 'Active') {
      const book = await Book.findById(loan.book);
      if (book) {
        book.availableCopies += 1;
        if (book.availableCopies > 0) {
          book.status = 'Available';
        }
        await book.save();
      }
    }

    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Loan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get overdue loans
exports.getOverdueLoans = async (req, res) => {
  try {
    const overdueLoans = await Loan.find({
      status: 'Active',
      dueDate: { $lt: new Date() }
    })
    .populate('book', 'title author isbn')
    .populate('member', 'name email')
    .sort({ dueDate: 1 });

    res.json(overdueLoans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper function to check and notify reservations
async function checkAndNotifyReservations(bookId) {
  try {
    // Find the first pending reservation for this book
    const reservation = await Reservation.findOne({
      book: bookId,
      status: 'Pending'
    }).sort({ priority: -1, reserveDate: 1 });

    if (reservation) {
      // Update reservation to ready
      reservation.status = 'Ready';
      reservation.notifiedAt = new Date();
      // Set expiration (e.g., 7 days from now)
      reservation.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await reservation.save();
    }
  } catch (err) {
    console.error('Error checking reservations:', err);
  }
} 
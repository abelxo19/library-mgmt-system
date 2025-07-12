const Reservation = require('../models/Reservation');
const Book = require('../models/Book');
const Member = require('../models/Member');
const Loan = require('../models/Loan');

// Get all reservations (admin/librarian only)
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('book', 'title author isbn status')
      .populate('member', 'name email')
      .sort({ priority: -1, reserveDate: 1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get my reservations (for members)
exports.getMyReservations = async (req, res) => {
  try {
    // Find member by user ID
    const member = await Member.findOne({ userId: req.user.id });
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const reservations = await Reservation.find({ member: member._id })
      .populate('book', 'title author isbn status')
      .sort({ reserveDate: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create reservation (any authenticated user)
exports.createReservation = async (req, res) => {
  try {
    const { bookId, notes } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Find member by user ID
    const member = await Member.findOne({ userId: req.user.id });
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    // Check if member already has this book on loan
    const existingLoan = await Loan.findOne({
      book: bookId,
      member: member._id,
      status: 'Active'
    });

    if (existingLoan) {
      return res.status(400).json({ error: 'You already have this book on loan' });
    }

    // Check if member already has a reservation for this book
    const existingReservation = await Reservation.findOne({
      book: bookId,
      member: member._id,
      status: { $in: ['Pending', 'Ready'] }
    });

    if (existingReservation) {
      return res.status(400).json({ error: 'You already have a reservation for this book' });
    }

    // If book is available, create loan instead of reservation
    if (book.status === 'Available' && book.availableCopies > 0) {
      return res.status(400).json({ 
        error: 'Book is available for immediate loan. Please borrow it directly.' 
      });
    }

    // Get the next priority number for this book
    const lastReservation = await Reservation.findOne({ book: bookId })
      .sort({ priority: -1 });
    const priority = lastReservation ? lastReservation.priority + 1 : 1;

    // Create reservation
    const reservation = new Reservation({
      book: bookId,
      member: member._id,
      reserveDate: new Date(),
      priority: priority,
      notes: notes || ''
    });

    await reservation.save();

    // Update book status if needed
    if (book.status === 'Available') {
      book.status = 'Reserved';
      await book.save();
    }

    await reservation.populate('book', 'title author isbn status');
    await reservation.populate('member', 'name email');

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fulfill reservation (admin/librarian only) - convert reservation to loan
exports.fulfillReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { dueDate } = req.body;

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    if (reservation.status !== 'Ready') {
      return res.status(400).json({ error: 'Reservation is not ready for fulfillment' });
    }

    // Check if book is still available
    const book = await Book.findById(reservation.book);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({ error: 'Book is not available for loan' });
    }

    // Create loan
    const loan = new Loan({
      book: reservation.book,
      member: reservation.member,
      borrowDate: new Date(),
      dueDate: new Date(dueDate),
      notes: `Fulfilled from reservation: ${reservation.notes || ''}`
    });

    await loan.save();

    // Update book availability
    book.availableCopies -= 1;
    if (book.availableCopies === 0) {
      book.status = 'Borrowed';
    }
    await book.save();

    // Update reservation status
    reservation.status = 'Fulfilled';
    await reservation.save();

    await loan.populate('book', 'title author isbn');
    await loan.populate('member', 'name email');

    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update reservation (admin/librarian only)
exports.updateReservation = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    
    await reservation.populate('book', 'title author isbn status');
    await reservation.populate('member', 'name email');
    
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel reservation (member can cancel their own, admin/librarian can cancel any)
exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    // Check if user can cancel this reservation
    const member = await Member.findOne({ userId: req.user.id });
    if (req.user.role !== 'admin' && req.user.role !== 'librarian') {
      if (!member || reservation.member.toString() !== member._id.toString()) {
        return res.status(403).json({ error: 'Not authorized to cancel this reservation' });
      }
    }

    reservation.status = 'Cancelled';
    await reservation.save();

    res.json({ message: 'Reservation cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete reservation (admin/librarian only)
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    res.json({ message: 'Reservation deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get ready reservations (admin/librarian only)
exports.getReadyReservations = async (req, res) => {
  try {
    const readyReservations = await Reservation.find({
      status: 'Ready',
      expiresAt: { $gt: new Date() } // Not expired
    })
    .populate('book', 'title author isbn')
    .populate('member', 'name email')
    .sort({ notifiedAt: 1 });

    res.json(readyReservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 
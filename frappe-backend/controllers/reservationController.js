const Reservation = require('../models/Reservation');
const Book = require('../models/Book');
const Member = require('../models/Member');

// Get all reservations (admin/librarian only)
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('bookId', 'title author')
      .populate('memberId', 'name email');
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

    const reservations = await Reservation.find({ memberId: member._id })
      .populate('bookId', 'title author');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create reservation (any authenticated user)
exports.createReservation = async (req, res) => {
  try {
    const { bookId, reservationDate } = req.body;

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

    // Check if reservation already exists
    const existingReservation = await Reservation.findOne({
      memberId: member._id,
      bookId,
      status: 'active'
    });

    if (existingReservation) {
      return res.status(400).json({ error: 'Reservation already exists' });
    }

    // Create reservation
    const reservation = new Reservation({
      memberId: member._id,
      bookId,
      reservationDate: new Date(reservationDate),
      status: 'active'
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update reservation (admin/librarian only)
exports.updateReservation = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
    res.json(reservation);
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
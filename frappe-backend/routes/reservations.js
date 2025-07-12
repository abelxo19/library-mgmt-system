const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Librarians and admins can view all reservations
router.get('/', authMiddleware, roleMiddleware(['admin', 'librarian']), reservationController.getReservations);

// Members can view their own reservations
router.get('/my-reservations', authMiddleware, reservationController.getMyReservations);

// Get ready reservations (admin/librarian only)
router.get('/ready', authMiddleware, roleMiddleware(['admin', 'librarian']), reservationController.getReadyReservations);

// Members can create their own reservations, librarians can create for anyone
router.post('/', authMiddleware, reservationController.createReservation);

// Fulfill reservation (admin/librarian only)
router.post('/:reservationId/fulfill', authMiddleware, roleMiddleware(['admin', 'librarian']), reservationController.fulfillReservation);

// Cancel reservation (members can cancel their own, admin/librarian can cancel any)
router.post('/:id/cancel', authMiddleware, reservationController.cancelReservation);

// Only librarians and admins can update/delete reservations
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), reservationController.updateReservation);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), reservationController.deleteReservation);

module.exports = router; 
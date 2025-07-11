const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Librarians and admins can view all reservations
router.get('/', authMiddleware, roleMiddleware(['admin', 'librarian']), reservationController.getReservations);

// Members can view their own reservations
router.get('/my-reservations', authMiddleware, reservationController.getMyReservations);

// Members can create their own reservations, librarians can create for anyone
router.post('/', authMiddleware, reservationController.createReservation);

// Only librarians and admins can update/delete reservations
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), reservationController.updateReservation);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), reservationController.deleteReservation);

module.exports = router; 
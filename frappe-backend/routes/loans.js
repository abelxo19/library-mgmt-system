const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Librarians and admins can view all loans
router.get('/', authMiddleware, roleMiddleware(['admin', 'librarian']), loanController.getLoans);

// Members can view their own loans
router.get('/my-loans', authMiddleware, loanController.getMyLoans);

// Get overdue loans (admin/librarian only)
router.get('/overdue', authMiddleware, roleMiddleware(['admin', 'librarian']), loanController.getOverdueLoans);

// Only librarians and admins can create/update loans
router.post('/', authMiddleware, roleMiddleware(['admin', 'librarian']), loanController.createLoan);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), loanController.updateLoan);

// Return book (admin/librarian only)
router.post('/:loanId/return', authMiddleware, roleMiddleware(['admin', 'librarian']), loanController.returnBook);

// Delete loan (admin/librarian only)
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), loanController.deleteLoan);

module.exports = router; 
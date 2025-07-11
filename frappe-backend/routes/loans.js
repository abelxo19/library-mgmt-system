const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Librarians and admins can view all loans
router.get('/', authMiddleware, roleMiddleware(['admin', 'librarian']), loanController.getLoans);

// Members can view their own loans (implement in controller)
router.get('/my-loans', authMiddleware, loanController.getMyLoans);

// Only librarians and admins can create/update loans
router.post('/', authMiddleware, roleMiddleware(['admin', 'librarian']), loanController.createLoan);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), loanController.updateLoan);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), loanController.deleteLoan);

module.exports = router; 
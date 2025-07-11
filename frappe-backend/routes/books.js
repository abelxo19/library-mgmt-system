const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public routes
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);

// Protected routes (admin and librarian only)
router.post('/', authMiddleware, roleMiddleware(['admin', 'librarian']), bookController.createBook);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), bookController.updateBook);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), bookController.deleteBook);

module.exports = router; 
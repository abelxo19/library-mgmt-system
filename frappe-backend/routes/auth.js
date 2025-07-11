const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes (admin/librarian only)
router.post('/register-librarian', authMiddleware, roleMiddleware(['admin']), authController.registerLibrarian);
router.post('/register-member', authMiddleware, roleMiddleware(['admin', 'librarian']), authController.registerMember);

module.exports = router; 
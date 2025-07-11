const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public routes (anyone can view members)
router.get('/', memberController.getMembers);
router.get('/:id', memberController.getMember);

// Protected routes (admin and librarian only)
router.post('/register', authMiddleware, roleMiddleware(['admin', 'librarian']), memberController.registerMemberWithProfile);
router.post('/', authMiddleware, roleMiddleware(['admin', 'librarian']), memberController.createMember);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), memberController.updateMember);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'librarian']), memberController.deleteMember);

module.exports = router; 
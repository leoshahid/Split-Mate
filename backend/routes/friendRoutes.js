const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const friendController = require('../controllers/friendController');

// Get all friends with balances (people you've had transactions with)
router.get('/', protect, friendController.getFriends);

// Search for users by email or name
router.get('/search', protect, friendController.searchUsers);

module.exports = router; 
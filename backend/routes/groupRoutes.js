const express = require('express');
const { getGroups, createGroup } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.get('/', getGroups);
router.post('/', createGroup);

module.exports = router; 
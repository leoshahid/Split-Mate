const express = require('express');
const { getExpenses, createExpense } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.get('/', getExpenses);
router.post('/', createExpense);

module.exports = router; 
const express = require('express');
const { body, validationResult } = require('express-validator');
const { signup, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const {
    sanitizeInput,
    validatePasswordStrength,
    validateEmail,
    preventSensitiveDataLogging
} = require('../middleware/securityMiddleware');

const router = express.Router();

// Validation error handler middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }
    next();
};

// Validation middleware
const validateSignup = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    handleValidationErrors
];

const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    handleValidationErrors
];

// Routes with security middleware
router.post('/signup',
    preventSensitiveDataLogging,
    sanitizeInput,
    validateEmail,
    validatePasswordStrength,
    validateSignup,
    signup
);

router.post('/login',
    preventSensitiveDataLogging,
    sanitizeInput,
    validateEmail,
    validateLogin,
    login
);

router.get('/me', protect, getMe);

module.exports = router; 
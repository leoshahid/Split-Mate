const express = require('express');
const { body, validationResult } = require('express-validator');
const {
    signup,
    login,
    getMe,
    updateProfile,
    changePassword,
    logout,
    sendVerificationCode,
    verifyEmail,
    googleAuth
} = require('../controllers/authController');
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
    body('phone')
        .optional()
        .matches(/^[\+]?[1-9][\d]{0,15}$/)
        .withMessage('Please provide a valid phone number'),
    body('dateOfBirth')
        .optional()
        .isISO8601()
        .withMessage('Please provide a valid date'),
    body('currency')
        .optional()
        .isIn(['PKR', 'USD', 'EUR', 'GBP', 'INR'])
        .withMessage('Please provide a valid currency'),
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

const validateVerificationCode = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('code')
        .isLength({ min: 6, max: 6 })
        .isNumeric()
        .withMessage('Verification code must be 6 digits'),
    handleValidationErrors
];

const validateGoogleAuth = [
    body('idToken')
        .notEmpty()
        .withMessage('Google ID token is required'),
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

// Email verification routes
router.post('/send-verification',
    preventSensitiveDataLogging,
    sanitizeInput,
    validateEmail,
    sendVerificationCode
);

router.post('/verify-email',
    preventSensitiveDataLogging,
    sanitizeInput,
    validateVerificationCode,
    verifyEmail
);

// Google OAuth route
router.post('/google',
    preventSensitiveDataLogging,
    sanitizeInput,
    validateGoogleAuth,
    googleAuth
);

router.get('/me', protect, getMe);

// Protected routes
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/logout', protect, logout);

module.exports = router; 
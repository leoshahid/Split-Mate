const { body, validationResult } = require('express-validator');

// Input sanitization middleware
const sanitizeInput = (req, res, next) => {
    // Sanitize body parameters
    if (req.body) {
        Object.keys(req.body).forEach(key => {
            if (typeof req.body[key] === 'string') {
                // Remove potential XSS vectors
                req.body[key] = req.body[key]
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/javascript:/gi, '')
                    .replace(/on\w+\s*=/gi, '')
                    .trim();
            }
        });
    }
    next();
};

// Password strength validation
const validatePasswordStrength = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    // Check password strength
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        return res.status(400).json({
            message: `Password must be at least ${minLength} characters long`
        });
    }

    // Optional: Add more strict password requirements
    // if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    //     return res.status(400).json({ 
    //         message: 'Password must contain uppercase, lowercase, and numbers' 
    //     });
    // }

    next();
};

// Email validation
const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    next();
};

// Prevent sensitive data logging
const preventSensitiveDataLogging = (req, res, next) => {
    // Clone request body to avoid modifying original
    const sanitizedBody = { ...req.body };

    // Remove sensitive fields from logging
    if (sanitizedBody.password) {
        sanitizedBody.password = '[REDACTED]';
    }

    // Add sanitized body to request for logging purposes
    req.sanitizedBody = sanitizedBody;

    next();
};

module.exports = {
    sanitizeInput,
    validatePasswordStrength,
    validateEmail,
    preventSensitiveDataLogging
}; 
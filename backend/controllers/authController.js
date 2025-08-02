const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { sendVerificationCode } = require('../services/emailService');
const { generateVerificationCode, storeVerificationCode, getAndVerifyCode } = require('../services/verificationService');
const { verifyGoogleToken, extractGoogleUserData } = require('../services/googleAuthService');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

// Generate random token for email verification and password reset
const generateRandomToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
    try {
        const { name, email, password, phone, dateOfBirth, currency } = req.body;

        // Input sanitization
        const sanitizedName = name.trim().replace(/[<>]/g, '');
        const sanitizedEmail = email.toLowerCase().trim();
        const sanitizedPhone = phone ? phone.trim() : undefined;

        // Check if user already exists
        const existingUser = await User.findOne({ email: sanitizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Generate email verification token
        const emailVerificationToken = generateRandomToken();

        // Create user with sanitized data
        const userData = {
            name: sanitizedName,
            email: sanitizedEmail,
            password,
            emailVerificationToken
        };

        // Add optional fields if provided
        if (sanitizedPhone) userData.phone = sanitizedPhone;
        if (dateOfBirth) userData.dateOfBirth = new Date(dateOfBirth);
        if (currency) userData.currency = currency;

        const user = await User.create(userData);

        if (user) {
            const token = generateToken(user._id);

            res.status(201).json({
                success: true,
                message: 'User registered successfully. Please check your email to verify your account.',
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        currency: user.currency,
                        emailVerified: user.emailVerified,
                        avatar: user.avatar,
                        preferences: user.preferences
                    },
                    token
                }
            });
        }
    } catch (error) {
        console.error('Signup error:', error);
        // Don't expose internal errors to client
        res.status(500).json({ message: 'Server error during signup' });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input sanitization
        const sanitizedEmail = email.toLowerCase().trim();

        // Check if user exists
        const user = await User.findOne({ email: sanitizedEmail }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if account is locked
        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(423).json({
                message: 'Account is temporarily locked due to too many failed login attempts'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            // Increment login attempts
            user.loginAttempts += 1;

            // Lock account after 5 failed attempts for 15 minutes
            if (user.loginAttempts >= 5) {
                user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
            }

            await user.save();

            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Reset login attempts on successful login
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    currency: user.currency,
                    emailVerified: user.emailVerified,
                    avatar: user.avatar,
                    preferences: user.preferences,
                    lastLogin: user.lastLogin
                },
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        // Don't expose internal errors to client
        res.status(500).json({ message: 'Server error during login' });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    currency: user.currency,
                    emailVerified: user.emailVerified,
                    avatar: user.avatar,
                    preferences: user.preferences,
                    lastLogin: user.lastLogin,
                    createdAt: user.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const { name, phone, dateOfBirth, currency, avatar } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (name) user.name = name.trim();
        if (phone) user.phone = phone.trim();
        if (dateOfBirth) user.dateOfBirth = new Date(dateOfBirth);
        if (currency) user.currency = currency;
        if (avatar) user.avatar = avatar;

        await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    currency: user.currency,
                    emailVerified: user.emailVerified,
                    avatar: user.avatar,
                    preferences: user.preferences,
                    lastLogin: user.lastLogin
                }
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
    try {
        // In a real application, you might want to blacklist the token
        // For now, we'll just return a success message
        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Send verification code
// @route   POST /api/auth/send-verification
// @access  Public
const sendVerificationCodeHandler = async (req, res) => {
    try {
        const { email } = req.body;
        const sanitizedEmail = email.toLowerCase().trim();

        // Check if user already exists
        const existingUser = await User.findOne({ email: sanitizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Generate verification code
        const code = generateVerificationCode();

        // Store the code
        storeVerificationCode(sanitizedEmail, code);

        // Send email
        const emailResult = await sendVerificationCode(sanitizedEmail, code);

        if (emailResult.success) {
            res.json({
                success: true,
                message: 'Verification code sent to your email'
            });
        } else {
            res.status(500).json({ message: 'Failed to send verification code' });
        }
    } catch (error) {
        console.error('Send verification code error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Verify email with code
// @route   POST /api/auth/verify-email
// @access  Public
const verifyEmail = async (req, res) => {
    try {
        const { email, code, name, phone, dateOfBirth, currency } = req.body;
        const sanitizedEmail = email.toLowerCase().trim();

        // Verify the code
        const verificationResult = getAndVerifyCode(sanitizedEmail, code);

        if (!verificationResult.valid) {
            return res.status(400).json({ message: verificationResult.message });
        }

        // Create user
        const userData = {
            email: sanitizedEmail,
            name: name.trim(),
            emailVerified: true,
            authProvider: 'email'
        };

        // Add optional fields
        if (phone) userData.phone = phone.trim();
        if (dateOfBirth) userData.dateOfBirth = new Date(dateOfBirth);
        if (currency) userData.currency = currency;

        const user = await User.create(userData);
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Email verified and account created successfully',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    currency: user.currency,
                    emailVerified: user.emailVerified,
                    avatar: user.avatar,
                    preferences: user.preferences
                },
                token
            }
        });
    } catch (error) {
        console.error('Verify email error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Google OAuth authentication
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
    try {
        const { idToken } = req.body;

        // Verify Google token
        const googleResult = await verifyGoogleToken(idToken);

        if (!googleResult.success) {
            return res.status(400).json({ message: googleResult.error });
        }

        const googleUser = googleResult.user;
        const userData = extractGoogleUserData(googleUser);

        // Check if user exists
        let user = await User.findOne({
            $or: [
                { email: userData.email },
                { googleId: userData.googleId }
            ]
        });

        if (user) {
            // Update existing user with Google data if needed
            if (!user.googleId) {
                user.googleId = userData.googleId;
                user.authProvider = 'google';
                user.profilePicture = userData.profilePicture;
                await user.save();
            }
        } else {
            // Create new user
            user = await User.create({
                ...userData,
                emailVerified: true // Google emails are pre-verified
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        const token = generateToken(user._id);

        res.json({
            success: true,
            message: 'Google authentication successful',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    currency: user.currency,
                    emailVerified: user.emailVerified,
                    avatar: user.avatar || user.profilePicture,
                    preferences: user.preferences
                },
                token
            }
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    signup,
    login,
    getMe,
    updateProfile,
    changePassword,
    logout,
    sendVerificationCode: sendVerificationCodeHandler,
    verifyEmail,
    googleAuth
}; 
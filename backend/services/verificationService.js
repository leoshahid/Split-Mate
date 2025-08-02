const speakeasy = require('speakeasy');

// Generate a 6-digit verification code
const generateVerificationCode = () => {
    return speakeasy.totp({
        secret: speakeasy.generateSecret({ length: 20 }).base32,
        digits: 6,
        step: 600, // 10 minutes
        window: 1
    });
};

// Verify the code
const verifyCode = (secret, token) => {
    return speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token,
        window: 1 // Allow 1 step (10 minutes) of tolerance
    });
};

// Store verification codes in memory (in production, use Redis)
const verificationCodes = new Map();

// Store verification code with expiration
const storeVerificationCode = (email, code) => {
    const expiresAt = Date.now() + (10 * 60 * 1000); // 10 minutes
    verificationCodes.set(email, {
        code,
        expiresAt
    });

    // Clean up expired codes
    setTimeout(() => {
        verificationCodes.delete(email);
    }, 10 * 60 * 1000);
};

// Get and verify stored code
const getAndVerifyCode = (email, providedCode) => {
    const stored = verificationCodes.get(email);

    if (!stored) {
        return { valid: false, message: 'No verification code found' };
    }

    if (Date.now() > stored.expiresAt) {
        verificationCodes.delete(email);
        return { valid: false, message: 'Verification code has expired' };
    }

    if (stored.code !== providedCode) {
        return { valid: false, message: 'Invalid verification code' };
    }

    // Remove the code after successful verification
    verificationCodes.delete(email);
    return { valid: true, message: 'Verification successful' };
};

// Clean up expired codes
const cleanupExpiredCodes = () => {
    const now = Date.now();
    for (const [email, data] of verificationCodes.entries()) {
        if (now > data.expiresAt) {
            verificationCodes.delete(email);
        }
    }
};

// Run cleanup every 5 minutes
setInterval(cleanupExpiredCodes, 5 * 60 * 1000);

module.exports = {
    generateVerificationCode,
    verifyCode,
    storeVerificationCode,
    getAndVerifyCode
}; 
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify Google ID token
const verifyGoogleToken = async (idToken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        return {
            success: true,
            user: {
                googleId: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                emailVerified: payload.email_verified
            }
        };
    } catch (error) {
        console.error('Google token verification error:', error);
        return {
            success: false,
            error: 'Invalid Google token'
        };
    }
};

// Extract user data from Google profile
const extractGoogleUserData = (googleUser) => {
    return {
        googleId: googleUser.googleId,
        email: googleUser.email,
        name: googleUser.name,
        profilePicture: googleUser.picture,
        emailVerified: googleUser.emailVerified,
        authProvider: 'google'
    };
};

module.exports = {
    verifyGoogleToken,
    extractGoogleUserData
}; 
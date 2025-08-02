const nodemailer = require('nodemailer');

// Create transporter for Gmail (free tier)
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_APP_PASSWORD // Gmail App Password
        }
    });
};

// Send verification code email
const sendVerificationCode = async (email, code) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'SplitMate - Email Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">SplitMate</h1>
                        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Email Verification</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
                        <h2 style="color: #333; margin: 0 0 20px 0;">Verify Your Email Address</h2>
                        <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">
                            Thank you for signing up with SplitMate! To complete your registration, please enter the verification code below:
                        </p>
                        
                        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                            <h3 style="color: #667eea; margin: 0; font-size: 32px; letter-spacing: 5px; font-weight: bold;">${code}</h3>
                        </div>
                        
                        <p style="color: #666; margin: 20px 0; line-height: 1.6;">
                            This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
                        </p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p style="color: #999; margin: 0; font-size: 14px;">
                                Best regards,<br>
                                The SplitMate Team
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
};

// Send password reset email
const sendPasswordResetCode = async (email, code) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'SplitMate - Password Reset Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">SplitMate</h1>
                        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Password Reset</p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
                        <h2 style="color: #333; margin: 0 0 20px 0;">Reset Your Password</h2>
                        <p style="color: #666; margin: 0 0 20px 0; line-height: 1.6;">
                            You requested a password reset for your SplitMate account. Please enter the verification code below:
                        </p>
                        
                        <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                            <h3 style="color: #667eea; margin: 0; font-size: 32px; letter-spacing: 5px; font-weight: bold;">${code}</h3>
                        </div>
                        
                        <p style="color: #666; margin: 20px 0; line-height: 1.6;">
                            This code will expire in 10 minutes. If you didn't request this reset, please ignore this email.
                        </p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                            <p style="color: #999; margin: 0; font-size: 14px;">
                                Best regards,<br>
                                The SplitMate Team
                            </p>
                        </div>
                    </div>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Email sending error:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendVerificationCode,
    sendPasswordResetCode
}; 
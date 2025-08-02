import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Email, Lock, Person, Phone, Cake, AttachMoney, PersonAdd, TrendingUp, Security, Group } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    InputField,
    Card,
    IconButton,
    Select,
    VerificationCodeInput,
    GoogleAuthButton,
    Divider
} from 'components';
import api from '../services/api';
import { GoogleLogin } from '@react-oauth/google';

const SignupContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
        `,
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const SignupCard = styled(Card)(({ theme }) => ({
    maxWidth: 800,
    width: '100%',
    padding: theme.spacing(6),
    borderRadius: theme.spacing(3),
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(4),
        margin: theme.spacing(1),
    },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(5),
}));

const LogoText = styled(Typography)(({ theme }) => ({
    fontSize: '3rem',
    fontWeight: 900,
    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem',
    },
}));

const LogoSubtext = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '1.2rem',
    fontWeight: 500,
    marginBottom: theme.spacing(3),
}));

const FeaturesSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(4),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
}));

const FeatureItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: '0.9rem',
    fontWeight: 500,
}));

const Form = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
}));

const FormRow = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        gap: theme.spacing(2),
    },
}));

const InputWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
}));

const InputIcon = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.primary.main,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
}));

const StyledInputField = styled(InputField)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        transition: 'all 0.3s ease',
        minHeight: 60,
        fontSize: '1.1rem',
        border: `2px solid ${theme.palette.divider}`,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-focused': {
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 4px ${theme.palette.primary.main}15`,
        },
    },
    '& .MuiOutlinedInput-input': {
        fontSize: '1.1rem',
        padding: theme.spacing(1.5, 0),
        '&::placeholder': {
            fontSize: '1.1rem',
            color: theme.palette.text.secondary,
            opacity: 1,
            fontWeight: 400,
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}));



const PasswordWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
}));

const PasswordToggle = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1.5),
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    color: theme.palette.text.secondary,
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main + '10',
    },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    height: 60,
    fontSize: '1.2rem',
    fontWeight: 700,
    borderRadius: theme.spacing(2),
    textTransform: 'none',
    background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
        transform: 'translateY(-3px)',
    },
    '&:disabled': {
        background: theme.palette.action.disabledBackground,
        transform: 'none',
    },
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    fontSize: '0.95rem',
    textAlign: 'center',
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.error.main + '10',
    borderRadius: theme.spacing(1.5),
    border: `1px solid ${theme.palette.error.main}20`,
    fontWeight: 500,
}));

const SuccessMessage = styled(Typography)(({ theme }) => ({
    color: theme.palette.success.main,
    fontSize: '0.95rem',
    textAlign: 'center',
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.success.main + '10',
    borderRadius: theme.spacing(1.5),
    border: `1px solid ${theme.palette.success.main}20`,
    fontWeight: 500,
}));

const SwitchText = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '1rem',
    marginTop: theme.spacing(3),
    fontWeight: 500,
}));

const SwitchLink = styled('span')(({ theme }) => ({
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontWeight: 700,
    textDecoration: 'underline',
    '&:hover': {
        color: theme.palette.primary.dark,
    },
}));

const Signup = ({ onSignup, onSwitchToLogin, onGoogleSuccess, onGoogleError }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dateOfBirth: '',
        currency: 'USD',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Email verification states
    const [showEmailVerification, setShowEmailVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [sendingCode, setSendingCode] = useState(false);
    const [verifyingCode, setVerifyingCode] = useState(false);

    // Google OAuth states
    const [googleLoading, setGoogleLoading] = useState(false);

    const currencyOptions = [
        { value: 'PKR', label: 'Pakistani Rupee (₨)' },
        { value: 'USD', label: 'US Dollar ($)' },
        { value: 'EUR', label: 'Euro (€)' },
        { value: 'GBP', label: 'British Pound (£)' },
        { value: 'INR', label: 'Indian Rupee (₹)' },
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        if (error) setError('');
        if (success) setSuccess('');
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('Name is required');
            return false;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!formData.password) {
            setError('Password is required');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            if (!validateForm()) {
                setLoading(false);
                return;
            }

            // Prepare data for API (remove confirmPassword)
            const signupData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone || undefined,
                dateOfBirth: formData.dateOfBirth || undefined,
                currency: formData.currency,
            };

            // Call signup API
            const response = await api.post('/auth/signup', signupData);

            setSuccess('Account created successfully! Please check your email to verify your account.');

            // Store token and user data
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));

            // Call parent signup handler
            onSignup(response.data.data.user, response.data.data.token);
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.response?.data?.message || 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Email verification methods
    const handleSendVerificationCode = async () => {
        if (!formData.email.trim()) {
            setError('Please enter your email address first');
            return;
        }

        setSendingCode(true);
        setError('');

        try {
            await api.post('/auth/send-verification', { email: formData.email });
            setShowEmailVerification(true);
            setSuccess('Verification code sent to your email!');
        } catch (error) {
            console.error('Send verification error:', error);
            setError(error.response?.data?.message || 'Failed to send verification code');
        } finally {
            setSendingCode(false);
        }
    };

    const handleVerifyEmail = async (code) => {
        setVerifyingCode(true);
        setError('');

        try {
            const response = await api.post('/auth/verify-email', {
                email: formData.email,
                code,
                name: formData.name,
                phone: formData.phone || undefined,
                dateOfBirth: formData.dateOfBirth || undefined,
                currency: formData.currency,
            });

            setSuccess('Email verified and account created successfully!');

            // Store token and user data
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));

            // Call parent signup handler
            onSignup(response.data.data.user, response.data.data.token);
        } catch (error) {
            console.error('Verify email error:', error);
            setError(error.response?.data?.message || 'Failed to verify email');
        } finally {
            setVerifyingCode(false);
        }
    };

    // Google OAuth method
    const handleGoogleAuth = async () => {
        setGoogleLoading(true);
        setError('');

        try {
            // This will be handled by Google OAuth provider
            // The actual implementation will be in the main App component
            console.log('Google OAuth initiated');
        } catch (error) {
            console.error('Google auth error:', error);
            setError('Google authentication failed');
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleGoogleSuccess = (credentialResponse) => {
        setGoogleLoading(true);
        setError('');

        if (onGoogleSuccess) {
            onGoogleSuccess(credentialResponse);
        }
    };

    const handleGoogleError = () => {
        setGoogleLoading(false);
        setError('Google authentication failed');

        if (onGoogleError) {
            onGoogleError();
        }
    };

    return (
        <SignupContainer>
            <SignupCard variant="form">
                <HeaderSection>
                    <LogoText>SplitMate</LogoText>
                    <LogoSubtext>Smart expense splitting for modern life</LogoSubtext>
                    <FeaturesSection>
                        <FeatureItem>
                            <TrendingUp fontSize="small" />
                            Track Expenses
                        </FeatureItem>
                        <FeatureItem>
                            <Group fontSize="small" />
                            Split Bills
                        </FeatureItem>
                        <FeatureItem>
                            <Security fontSize="small" />
                            Secure & Private
                        </FeatureItem>
                    </FeaturesSection>
                </HeaderSection>

                <Form component="form" onSubmit={handleSubmit}>
                    <FormRow>
                        <InputWrapper>
                            <InputIcon>
                                <Person fontSize="small" />
                            </InputIcon>
                            <StyledInputField
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                fullWidth
                                required
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <InputIcon>
                                <Email fontSize="small" />
                            </InputIcon>
                            <StyledInputField
                                type="email"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                fullWidth
                                required
                            />
                        </InputWrapper>
                    </FormRow>

                    <FormRow>
                        <InputWrapper>
                            <InputIcon>
                                <Phone fontSize="small" />
                            </InputIcon>
                            <StyledInputField
                                type="tel"
                                placeholder="Phone number (optional)"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                fullWidth
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <InputIcon>
                                <Cake fontSize="small" />
                            </InputIcon>
                            <StyledInputField
                                type="date"
                                placeholder="Date of birth (optional)"
                                value={formData.dateOfBirth}
                                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                fullWidth
                            />
                        </InputWrapper>
                    </FormRow>

                    <FormRow>
                        <PasswordWrapper>
                            <InputIcon>
                                <Lock fontSize="small" />
                            </InputIcon>
                            <StyledInputField
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                fullWidth
                                required
                            />
                            <PasswordToggle
                                onClick={togglePasswordVisibility}
                                size="small"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </PasswordToggle>
                        </PasswordWrapper>

                        <PasswordWrapper>
                            <InputIcon>
                                <Lock fontSize="small" />
                            </InputIcon>
                            <StyledInputField
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                fullWidth
                                required
                            />
                            <PasswordToggle
                                onClick={toggleConfirmPasswordVisibility}
                                size="small"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </PasswordToggle>
                        </PasswordWrapper>
                    </FormRow>

                    <Box sx={{ position: 'relative' }}>
                        {/* <InputIcon>
                            <AttachMoney fontSize="small" />
                        </InputIcon> */}
                        <Select
                            label="Preferred Currency"
                            value={formData.currency}
                            onChange={(e) => handleInputChange('currency', e.target.value)}
                            options={currencyOptions}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    paddingLeft: '48px',
                                }
                            }}
                        />
                    </Box>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}

                    {/* Email Verification Section */}
                    {showEmailVerification && (
                        <Box sx={{ mt: 3, mb: 3 }}>
                            <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
                                Enter Verification Code
                            </Typography>
                            <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
                                We've sent a 6-digit code to {formData.email}
                            </Typography>
                            <VerificationCodeInput
                                onComplete={handleVerifyEmail}
                                onCodeChange={setVerificationCode}
                                error={!!error}
                                helperText="Enter the 6-digit code from your email"
                                disabled={verifyingCode}
                            />
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                <Button
                                    variant="outlined"
                                    onClick={handleSendVerificationCode}
                                    disabled={sendingCode}
                                    sx={{ flex: 1 }}
                                >
                                    {sendingCode ? 'Sending...' : 'Resend Code'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => setShowEmailVerification(false)}
                                    sx={{ flex: 1 }}
                                >
                                    Back to Form
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {/* Authentication Options */}
                    {!showEmailVerification && (
                        <>
                            <Box sx={{ mt: 3, mb: 3 }}>
                                <Divider>
                                    <Typography variant="body2" color="text.secondary">
                                        or
                                    </Typography>
                                </Divider>
                            </Box>

                            {/* Google OAuth Button */}
                            <Box sx={{ mb: 3 }}>
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    disabled={loading || googleLoading}
                                    theme="outline"
                                    size="large"
                                    text="continue_with"
                                    shape="rectangular"
                                    width="100%"
                                />
                            </Box>

                            {/* Email Verification Option */}
                            <Box sx={{ mb: 3 }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={handleSendVerificationCode}
                                    disabled={sendingCode || loading}
                                    sx={{
                                        height: '60px',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                    }}
                                >
                                    {sendingCode ? 'Sending Code...' : 'Sign up with Email Verification'}
                                </Button>
                            </Box>

                            <Box sx={{ mt: 3, mb: 3 }}>
                                <Divider>
                                    <Typography variant="body2" color="text.secondary">
                                        or use traditional signup
                                    </Typography>
                                </Divider>
                            </Box>
                        </>
                    )}

                    {/* Traditional Signup Button */}
                    {!showEmailVerification && (
                        <SubmitButton
                            type="submit"
                            variant="primary"
                            fullWidth
                            disabled={loading}
                            startIcon={loading ? null : <PersonAdd />}
                        >
                            {loading ? 'Creating Your Account...' : 'Create Account & Start Splitting'}
                        </SubmitButton>
                    )}
                </Form>

                <SwitchText>
                    Already have an account?{' '}
                    <SwitchLink onClick={onSwitchToLogin}>
                        Sign in here
                    </SwitchLink>
                </SwitchText>
            </SignupCard>
        </SignupContainer>
    );
};

export default Signup; 
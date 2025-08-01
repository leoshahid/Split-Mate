import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Email, Lock, Person, Phone, Cake, AttachMoney } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    InputField,
    Card,
    IconButton,
    Select
} from 'components';

const SignupContainer = styled(Box)(({ theme }) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const SignupCard = styled(Card)(({ theme }) => ({
    maxWidth: 500,
    width: '100%',
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
    },
}));

const Logo = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(4),
}));

const LogoText = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
}));

const LogoSubtext = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: '1rem',
}));

const Form = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

const FormRow = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
    },
}));

const InputWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
}));

const InputIcon = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.text.secondary,
    zIndex: 1,
}));

const StyledInputField = styled(InputField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        paddingLeft: theme.spacing(5),
    },
}));

const PasswordWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
}));

const PasswordToggle = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    height: 48,
    fontSize: '1rem',
    fontWeight: 600,
}));

const Divider = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(3, 0),
    '&::before, &::after': {
        content: '""',
        flex: 1,
        height: 1,
        backgroundColor: theme.palette.divider,
    },
}));

const DividerText = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(0, 2),
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
}));

const LoginLink = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    marginTop: theme.spacing(2),
}));

const LinkText = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    fontSize: '0.875rem',
    marginTop: theme.spacing(1),
    textAlign: 'center',
}));

const SuccessMessage = styled(Typography)(({ theme }) => ({
    color: theme.palette.success.main,
    fontSize: '0.875rem',
    marginTop: theme.spacing(1),
    textAlign: 'center',
}));

const Signup = ({ onSignup, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dateOfBirth: '',
        currency: 'PKR',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const theme = useTheme();

    const currencyOptions = [
        { value: 'PKR', label: 'Pakistani Rupee (PKR)' },
        { value: 'USD', label: 'US Dollar (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'British Pound (GBP)' },
        { value: 'INR', label: 'Indian Rupee (INR)' },
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
        setError(''); // Clear error when user types
        setSuccess(''); // Clear success message
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all required fields');
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

        if (formData.phone && !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone)) {
            setError('Please enter a valid phone number');
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
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Account created successfully! Please check your email to verify your account.');

                // Store token and user data
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));

                // Call parent signup handler
                onSignup(data.data.user, data.data.token);
            } else {
                setError(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('Network error. Please try again.');
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

    return (
        <SignupContainer>
            <SignupCard variant="form">
                <Logo>
                    <LogoText>SplitMate</LogoText>
                    <LogoSubtext>Create your account</LogoSubtext>
                </Logo>

                <Form component="form" onSubmit={handleSubmit}>
                    <FormRow>
                        <InputWrapper>
                            <InputIcon>
                                <Person fontSize="small" />
                            </InputIcon>
                            <StyledInputField
                                type="text"
                                placeholder="Full Name"
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
                                placeholder="Email address"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                fullWidth
                                required
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
                                placeholder="Password"
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
                                placeholder="Confirm Password"
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
                                placeholder="Date of Birth (optional)"
                                value={formData.dateOfBirth}
                                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                fullWidth
                            />
                        </InputWrapper>
                    </FormRow>

                    <InputWrapper>
                        <InputIcon>
                            <AttachMoney fontSize="small" />
                        </InputIcon>
                        <Select
                            value={formData.currency}
                            onChange={(e) => handleInputChange('currency', e.target.value)}
                            options={currencyOptions}
                            fullWidth
                        />
                    </InputWrapper>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {success && <SuccessMessage>{success}</SuccessMessage>}

                    <SubmitButton
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </SubmitButton>
                </Form>

                <Divider>
                    <DividerText>or</DividerText>
                </Divider>

                <LoginLink>
                    <Typography variant="body2" color="text.secondary">
                        Already have an account?{' '}
                        <LinkText onClick={onSwitchToLogin}>
                            Sign in
                        </LinkText>
                    </Typography>
                </LoginLink>
            </SignupCard>
        </SignupContainer>
    );
};

export default Signup; 
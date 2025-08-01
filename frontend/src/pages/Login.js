import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Email, Lock, Login as LoginIcon, TrendingUp, Security, Group } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    InputField,
    Card,
    IconButton,
    Divider
} from 'components';
import api from '../services/api';

const LoginContainer = styled(Box)(({ theme }) => ({
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

const LoginCard = styled(Card)(({ theme }) => ({
    maxWidth: 500,
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

const Login = ({ onLogin, onSwitchToSignup }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Validate form
            if (!formData.email || !formData.password) {
                setError('Please fill in all fields');
                return;
            }

            // Call login API
            const response = await api.post('/auth/login', formData);

            // Store token and user data
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));

            // Call parent login handler
            onLogin(response.data.data.user, response.data.data.token);
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <LoginContainer>
            <LoginCard variant="form">
                <HeaderSection>
                    <LogoText>SplitMate</LogoText>
                    <LogoSubtext>Welcome back! Sign in to manage your expenses</LogoSubtext>
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

                    <PasswordWrapper>
                        <InputIcon>
                            <Lock fontSize="small" />
                        </InputIcon>
                        <StyledInputField
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
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

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <SubmitButton
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                        startIcon={loading ? null : <LoginIcon />}
                    >
                        {loading ? 'Signing In...' : 'Sign In & Continue'}
                    </SubmitButton>
                </Form>

                <SwitchText>
                    Don't have an account?{' '}
                    <SwitchLink onClick={onSwitchToSignup}>
                        Create one here
                    </SwitchLink>
                </SwitchText>
            </LoginCard>
        </LoginContainer>
    );
};

export default Login; 
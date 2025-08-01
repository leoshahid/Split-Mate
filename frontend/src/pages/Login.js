import React, { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import {
    Box,
    Typography,
    Button,
    InputField,
    Card,
    IconButton
} from 'components';

const LoginContainer = styled(Box)(({ theme }) => ({
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

const LoginCard = styled(Card)(({ theme }) => ({
    maxWidth: 400,
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

const SignupLink = styled(Box)(({ theme }) => ({
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

const Login = ({ onLogin, onSwitchToSignup }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
        setError(''); // Clear error when user types
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
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user data
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));

                // Call parent login handler
                onLogin(data.data.user, data.data.token);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Network error. Please try again.');
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
                <Logo>
                    <LogoText>SplitMate</LogoText>
                    <LogoSubtext>Sign in to your account</LogoSubtext>
                </Logo>

                <Form component="form" onSubmit={handleSubmit}>
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

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <SubmitButton
                        type="submit"
                        variant="primary"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </SubmitButton>
                </Form>

                <Divider>
                    <DividerText>or</DividerText>
                </Divider>

                <SignupLink>
                    <Typography variant="body2" color="text.secondary">
                        Don't have an account?{' '}
                        <LinkText onClick={onSwitchToSignup}>
                            Sign up
                        </LinkText>
                    </Typography>
                </SignupLink>
            </LoginCard>
        </LoginContainer>
    );
};

export default Login; 
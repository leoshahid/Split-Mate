import React, { useState, useEffect } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import QueryProvider from './providers/QueryProvider';
import Sidebar from './components/Layout/Sidebar';
import AppBar from './components/Layout/AppBar';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import Expenses from './pages/Expenses';
import HistoryPage from './pages/History';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useGoogleAuth } from './hooks';


const AppContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
}));

const MainContent = styled(Box)(({ theme, isMobile }) => ({
    flex: 1,
    marginLeft: isMobile ? 0 : 280, // Sidebar width, adjusted for mobile
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    transition: 'margin-left 0.3s ease', // Smooth transition for sidebar
}));

const ScreenContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: 'auto',
}));

const Screen = styled(Box)(({ theme, active }) => ({
    display: active ? 'block' : 'none',
}));

function App() {
    const [activeScreen, setActiveScreen] = useState('dashboard');
    const [mobileOpen, setMobileOpen] = useState(false); // State for mobile sidebar
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [user, setUser] = useState({
        name: '',
        email: '',
    });

    // Google OAuth Client ID (you'll need to replace this with your actual client ID)
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id-here';

    // React Query hooks
    const { mutateAsync: googleAuth, isLoading: isGoogleLoading } = useGoogleAuth();

    // Check authentication status on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const screenTitles = {
        dashboard: 'Dashboard',
        groups: 'Groups',
        expenses: 'Expenses',
        history: 'History',
        profile: 'Profile',
    };

    const handleScreenChange = (screen) => {
        setActiveScreen(screen);
    };

    const handleMobileToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Update state
        setIsAuthenticated(false);
        setUser({ name: '', email: '' });
    };

    const handleLogin = (userData, token) => {
        // Store authentication data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        // Update state
        setIsAuthenticated(true);
        setUser(userData);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await googleAuth({
                idToken: credentialResponse.credential
            });

            // Store authentication data
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            // Update state
            setIsAuthenticated(true);
            setUser(response.user);
        } catch (error) {
            console.error('Google OAuth error:', error);
            // Handle error appropriately
        }
    };

    const handleGoogleError = () => {
        console.error('Google OAuth failed');
        // Handle error appropriately
    };

    const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

    // Show login/signup if not authenticated
    if (!isAuthenticated) {
        return (
            <QueryProvider>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    {authMode === 'login' ? (
                        <Login
                            onLogin={handleLogin}
                            onSwitchToSignup={() => setAuthMode('signup')}
                            onGoogleSuccess={handleGoogleSuccess}
                            onGoogleError={handleGoogleError}
                        />
                    ) : (
                        <Signup
                            onSignup={handleLogin}
                            onSwitchToLogin={() => setAuthMode('login')}
                            onGoogleSuccess={handleGoogleSuccess}
                            onGoogleError={handleGoogleError}
                        />
                    )}
                </GoogleOAuthProvider>
            </QueryProvider>
        );
    }

    return (
        <QueryProvider>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <AppContainer>
                    <Sidebar
                        activeScreen={activeScreen}
                        onScreenChange={handleScreenChange}
                        mobileOpen={mobileOpen}
                        onMobileToggle={handleMobileToggle}
                    />

                    <MainContent isMobile={isMobile}>
                        <AppBar
                            pageTitle={screenTitles[activeScreen]}
                            user={user}
                            onLogout={handleLogout}
                            onMobileMenuToggle={handleMobileToggle}
                        />

                        <ScreenContainer>
                            <Screen active={activeScreen === 'dashboard'}>
                                <Dashboard onScreenChange={handleScreenChange} />
                            </Screen>

                            <Screen active={activeScreen === 'groups'}>
                                <Groups />
                            </Screen>

                            <Screen active={activeScreen === 'expenses'}>
                                <Expenses />
                            </Screen>

                            <Screen active={activeScreen === 'history'}>
                                <HistoryPage />
                            </Screen>

                            <Screen active={activeScreen === 'profile'}>
                                <Profile onLogout={handleLogout} />
                            </Screen>
                        </ScreenContainer>
                    </MainContent>
                </AppContainer>
            </GoogleOAuthProvider>
        </QueryProvider>
    );
}

export default App; 
import React, { useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from './components/Layout/Sidebar';
import AppBar from './components/Layout/AppBar';
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import Expenses from './pages/Expenses';
import HistoryPage from './pages/History';
import Profile from './pages/Profile';

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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [user] = useState({
        name: 'Ali Ahmed',
        email: 'ali@example.com',
    });

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
        console.log('Logout clicked');
        // Handle logout logic
    };

    return (
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
    );
}

export default App; 
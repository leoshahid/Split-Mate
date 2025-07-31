import React from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Card,
    CardContent,
    Grid,
    Avatar,
} from '@mui/material';
import { Logout, AccountCircle } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { showSnackbar } = useSnackbar();

    const handleLogout = () => {
        logout();
        showSnackbar('Logged out successfully', 'info');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* App Bar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SplitMate
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                            <AccountCircle />
                        </Avatar>
                        <Typography variant="body2">
                            Welcome, {user?.name}
                        </Typography>
                        <Button
                            color="inherit"
                            startIcon={<Logout />}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Welcome Card */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    Welcome to SplitMate! 🎉
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Your expense tracking and splitting dashboard is ready. The team will implement the core features here.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Placeholder Cards */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    📊 Groups
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Create and manage expense groups with friends, roommates, or colleagues.
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 2 }}
                                    disabled
                                >
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    💰 Expenses
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Add expenses, track who paid what, and see balances at a glance.
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 2 }}
                                    disabled
                                >
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    ⚖️ Balances
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    View who owes what and settle up with friends easily.
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 2 }}
                                    disabled
                                >
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    📈 History
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Complete transaction history and expense reports.
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 2 }}
                                    disabled
                                >
                                    Coming Soon
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard; 
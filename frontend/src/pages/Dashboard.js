import React from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemAvatar, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    TrendingUp,
    TrendingDown,
    Group,
    Add,
    GroupAdd,
    AccountBalanceWallet,
    History,
    Landscape,
    Home,
    Restaurant,
    Hotel,
    DirectionsCar
} from '@mui/icons-material';
import {
    Card,
    Button,
    Avatar,
    Chip
} from 'components';

const DashboardContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3),
    },
}));

const WelcomeTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.875rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
}));

const WelcomeSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
    },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.25rem',
    },
}));

const BalanceCard = styled(Card)(({ theme, variant }) => ({
    padding: theme.spacing(3),
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const BalanceCardHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
}));

const BalanceCardTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem',
    fontWeight: 500,
    opacity: 0.9,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
    },
}));

const BalanceIcon = styled(Box)(({ theme }) => ({
    fontSize: '2rem',
    opacity: 0.8,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
}));

const BalanceAmount = styled(Typography)(({ theme }) => ({
    fontSize: '2.25rem',
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.75rem',
    },
}));

const BalanceSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    opacity: 0.9,
}));

const ActionButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(3),
    minHeight: 120,
    '& .MuiButton-startIcon': {
        margin: 0,
        fontSize: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        minHeight: 100,
        '& .MuiButton-startIcon': {
            fontSize: '1.5rem',
        },
    },
}));

const ActivityCard = styled(Card)(({ theme }) => ({
    height: '100%',
}));

const CardHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.5, 2),
    },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.125rem',
    },
}));

const TextButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 500,
    padding: theme.spacing(0.5, 1.5),
    minHeight: 'auto',
    '&:hover': {
        backgroundColor: theme.palette.primary.light + '20',
    },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(1.5, 0),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    '&:last-child': {
        borderBottom: 'none',
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 0),
    },
}));

const ListItemContent = styled(Box)(({ theme }) => ({
    flex: 1,
    minWidth: 0,
}));

const ListItemTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
    },
}));

const ListItemSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
    },
}));

const ListItemAction = styled(Box)(({ theme }) => ({
    flexShrink: 0,
}));

const Amount = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
    },
}));

const Dashboard = ({ onScreenChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const balanceCards = [
        {
            variant: 'balance-positive',
            title: "You're Owed",
            amount: "Rs. 2,500",
            subtitle: "From 3 pending settlements",
            icon: TrendingUp,
        },
        {
            variant: 'balance-negative',
            title: "You Owe",
            amount: "Rs. 0",
            subtitle: "All settled up!",
            icon: TrendingDown,
        },
        {
            variant: 'balance-primary',
            title: "Total Groups",
            amount: "5",
            subtitle: "Active expense groups",
            icon: Group,
        },
    ];

    const quickActions = [
        { label: 'Add Expense', icon: Add, variant: 'primary', action: 'expenses' },
        { label: 'Create Group', icon: GroupAdd, variant: 'secondary', action: 'groups' },
        { label: 'Settle Up', icon: AccountBalanceWallet, variant: 'success', action: 'settle' },
        { label: 'View History', icon: History, variant: 'warning', action: 'history' },
    ];

    const recentGroups = [
        {
            title: 'Trip to Murree',
            subtitle: '4 members • 3 expenses • 2 days ago',
            icon: Landscape,
            balance: '+Rs. 7,500',
            balanceVariant: 'positive',
        },
        {
            title: 'Monthly Rent',
            subtitle: '3 members • 1 expense • 1 week ago',
            icon: Home,
            balance: 'Rs. 0',
            balanceVariant: 'neutral',
        },
        {
            title: 'Office Lunches',
            subtitle: '6 members • 5 expenses • 3 days ago',
            icon: Restaurant,
            balance: '-Rs. 1,200',
            balanceVariant: 'negative',
        },
    ];

    const recentTransactions = [
        {
            title: 'Dinner at Food Court',
            subtitle: 'Paid by Sara • Trip to Murree • 2 hours ago',
            icon: Restaurant,
            amount: 'Rs. 4,000',
        },
        {
            title: 'Hotel Booking',
            subtitle: 'Paid by Usman • Trip to Murree • 1 day ago',
            icon: Hotel,
            amount: 'Rs. 10,000',
        },
        {
            title: 'Transport',
            subtitle: 'Paid by Ali • Trip to Murree • 1 day ago',
            icon: DirectionsCar,
            amount: 'Rs. 6,000',
        },
    ];

    const handleQuickAction = (action) => {
        if (action === 'settle') {
            // Handle settle up action
            console.log('Settle up clicked');
        } else {
            onScreenChange(action);
        }
    };

    return (
        <DashboardContainer>
            {/* Welcome Section */}
            <WelcomeSection>
                <WelcomeTitle>Welcome back, Ali! 👋</WelcomeTitle>
                <WelcomeSubtitle>
                    Here's what's happening with your expenses today
                </WelcomeSubtitle>
            </WelcomeSection>

            {/* Balance Overview Cards */}
            <Box sx={{ mb: 4 }}>
                <Grid container spacing={isMobile ? 2 : 3}>
                    {balanceCards.map((card, index) => {
                        const IconComponent = card.icon;
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <BalanceCard variant={card.variant}>
                                    <BalanceCardHeader>
                                        <BalanceCardTitle>{card.title}</BalanceCardTitle>
                                        <BalanceIcon>
                                            <IconComponent />
                                        </BalanceIcon>
                                    </BalanceCardHeader>
                                    <BalanceAmount>{card.amount}</BalanceAmount>
                                    <BalanceSubtitle>{card.subtitle}</BalanceSubtitle>
                                </BalanceCard>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>

            {/* Quick Actions */}
            <Box sx={{ mb: 4 }}>
                <SectionHeader>
                    <SectionTitle>Quick Actions</SectionTitle>
                </SectionHeader>
                <Grid container spacing={isMobile ? 1 : 2}>
                    {quickActions.map((action, index) => {
                        const IconComponent = action.icon;
                        return (
                            <Grid item xs={6} sm={6} md={3} key={index}>
                                <ActionButton
                                    variant={action.variant}
                                    startIcon={<IconComponent />}
                                    onClick={() => handleQuickAction(action.action)}
                                    fullWidth
                                >
                                    {action.label}
                                </ActionButton>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>

            {/* Recent Activity */}
            <Box>
                <Grid container spacing={isMobile ? 2 : 3}>
                    {/* Recent Groups */}
                    <Grid item xs={12} lg={6}>
                        <ActivityCard>
                            <CardHeader>
                                <CardTitle>Recent Groups</CardTitle>
                                <TextButton variant="text" size="small">
                                    View All
                                </TextButton>
                            </CardHeader>
                            <List sx={{ p: isMobile ? 1.5 : 2 }}>
                                {recentGroups.map((group, index) => {
                                    const IconComponent = group.icon;
                                    return (
                                        <StyledListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar variant="primary" size="medium">
                                                    <IconComponent />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemContent>
                                                <ListItemTitle>{group.title}</ListItemTitle>
                                                <ListItemSubtitle>{group.subtitle}</ListItemSubtitle>
                                            </ListItemContent>
                                            <ListItemAction>
                                                <Chip
                                                    label={group.balance}
                                                    variant={group.balanceVariant}
                                                />
                                            </ListItemAction>
                                        </StyledListItem>
                                    );
                                })}
                            </List>
                        </ActivityCard>
                    </Grid>

                    {/* Recent Transactions */}
                    <Grid item xs={12} lg={6}>
                        <ActivityCard>
                            <CardHeader>
                                <CardTitle>Recent Transactions</CardTitle>
                                <TextButton variant="text" size="small">
                                    View All
                                </TextButton>
                            </CardHeader>
                            <List sx={{ p: isMobile ? 1.5 : 2 }}>
                                {recentTransactions.map((transaction, index) => {
                                    const IconComponent = transaction.icon;
                                    return (
                                        <StyledListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar variant="primary" size="medium">
                                                    <IconComponent />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemContent>
                                                <ListItemTitle>{transaction.title}</ListItemTitle>
                                                <ListItemSubtitle>{transaction.subtitle}</ListItemSubtitle>
                                            </ListItemContent>
                                            <ListItemAction>
                                                <Amount>{transaction.amount}</Amount>
                                            </ListItemAction>
                                        </StyledListItem>
                                    );
                                })}
                            </List>
                        </ActivityCard>
                    </Grid>
                </Grid>
            </Box>
        </DashboardContainer>
    );
};

export default Dashboard; 
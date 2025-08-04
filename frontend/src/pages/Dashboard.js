import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, List, ListItem, ListItemAvatar, useTheme, useMediaQuery, Divider, IconButton, TextField, InputAdornment, Snackbar, Alert, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Search,
    Add,
    FilterList,
    PersonAdd,
    ExpandMore,
    ExpandLess,
    CheckCircle,
    Cancel,
    Send,
    Group as GroupIcon,
    Person,
    MoreVert,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import {
    Card,
    Button,
    Avatar,
    Chip as CustomChip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from 'components';
import api from '../services/api';

const DashboardContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: theme.spacing(2),
    },
}));

const OverallBalanceCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255,255,255,0.1)',
        borderRadius: theme.spacing(1),
    },
}));

const BalanceHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    position: 'relative',
    zIndex: 1,
}));

const BalanceTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem',
    fontWeight: 500,
    opacity: 0.9,
}));

const BalanceAmount = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    position: 'relative',
    zIndex: 1,
}));

const BalanceBreakdown = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    opacity: 0.8,
    position: 'relative',
    zIndex: 1,
}));

const GroupsListCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(0),
}));

const GroupsListHeader = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const SearchBox = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },
}));

const GroupItem = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child': {
        borderBottom: 'none',
    },
}));

const GroupInfo = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

const GroupHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const GroupName = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 600,
}));

const GroupBalance = styled(Typography)(({ theme, variant }) => ({
    fontSize: '1rem',
    fontWeight: 600,
    color: variant === 'positive' ? theme.palette.success.main :
        variant === 'negative' ? theme.palette.error.main :
            theme.palette.text.primary,
}));

const BalanceDetails = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
}));

const BalanceDetailItem = styled(Typography)(({ theme, variant }) => ({
    fontSize: '0.875rem',
    color: variant === 'positive' ? theme.palette.success.main :
        variant === 'negative' ? theme.palette.error.main :
            theme.palette.text.secondary,
}));

const SettledGroupsSection = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[50],
}));

const EmptyState = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(6, 2),
    color: theme.palette.text.secondary,
}));

const Dashboard = ({ onScreenChange }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [searchQuery, setSearchQuery] = useState('');
    const [showSettledGroups, setShowSettledGroups] = useState(false);
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([]);
    const [overallBalance, setOverallBalance] = useState({ total: 'PKR 0.00', breakdown: 'No balances' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Mock data - replace with API calls
    const mockGroups = [
        {
            id: 1,
            name: 'KBC Group',
            icon: 'KG',
            balance: {
                total: -2082,
                currency: 'PKR',
                breakdown: [
                    { name: 'Ali Z.', amount: -1075, type: 'owe' },
                    { name: 'Jutt', amount: -1015, type: 'owe' },
                    { name: 'Butt', amount: 8, type: 'owed' },
                ]
            }
        },
        {
            id: 2,
            name: 'Psl Group',
            icon: 'PG',
            balance: {
                total: 782.86,
                currency: 'PKR',
                breakdown: [
                    { name: 'Asad', amount: 782.86, type: 'owed' },
                ]
            }
        },
        {
            id: 3,
            name: 'Taybi Ki Shadi Group',
            icon: 'TS',
            balance: {
                total: 5470.67,
                currency: 'PKR',
                breakdown: [
                    { name: 'Asad', amount: 3880, type: 'owed' },
                    { name: 'Hamid N.', amount: 1590.67, type: 'owed' },
                ]
            }
        },
        {
            id: 4,
            name: 'Non-group expenses',
            icon: 'NG',
            balance: {
                total: 35113.34,
                currency: 'PKR',
                breakdown: [
                    { name: 'Butt', amount: 19980, type: 'owed' },
                    { name: 'Mian F.', amount: 8416.67, type: 'owed' },
                    { name: 'Plus 2 more balances', amount: 0, type: 'info' },
                ]
            }
        }
    ];

    const settledGroups = [
        { id: 5, name: 'Office Lunch Group', balance: 0 },
        { id: 6, name: 'Weekend Trip', balance: 0 },
        // ... more settled groups
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setGroups(mockGroups);
            setOverallBalance({
                total: 'PKR 39,284.87',
                breakdown: '$400.00'
            });
            setLoading(false);
        }, 1000);
    }, []);

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatBalance = (amount, currency) => {
        return `${currency} ${Math.abs(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const getBalanceText = (group) => {
        if (group.balance.total > 0) {
            return `you are owed ${formatBalance(group.balance.total, group.balance.currency)}`;
        } else if (group.balance.total < 0) {
            return `you owe ${formatBalance(group.balance.total, group.balance.currency)}`;
        } else {
            return 'settled up';
        }
    };

    const getBalanceVariant = (balance) => {
        if (balance > 0) return 'positive';
        if (balance < 0) return 'negative';
        return 'neutral';
    };

    const handleGroupClick = (group) => {
        // TODO: Navigate to group detail page
        console.log('Opening group:', group);
    };

    const handleAddExpense = () => {
        onScreenChange('expenses');
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading) {
        return (
            <DashboardContainer>
                <Typography>Loading dashboard...</Typography>
            </DashboardContainer>
        );
    }

    return (
        <DashboardContainer>
            {/* Header */}
            <HeaderSection>
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Groups
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your expense groups and balances
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <SearchBox
                        placeholder="Search groups..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        size="small"
                        sx={{ width: 300 }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={handleAddExpense}
                    >
                        Add expense
                    </Button>
                </Box>
            </HeaderSection>

            {/* Overall Balance */}
            <OverallBalanceCard>
                <BalanceHeader>
                    <BalanceTitle>Overall, you are owed</BalanceTitle>
                    <IconButton sx={{ color: 'white' }}>
                        <FilterList />
                    </IconButton>
                </BalanceHeader>
                <BalanceAmount>{overallBalance.total} +</BalanceAmount>
                <BalanceBreakdown>{overallBalance.breakdown}</BalanceBreakdown>
            </OverallBalanceCard>

            {/* Groups List */}
            <GroupsListCard>
                <GroupsListHeader>
                    <Typography variant="h6" fontWeight={600}>
                        Groups & Balances
                    </Typography>
                </GroupsListHeader>

                {filteredGroups.length === 0 ? (
                    <EmptyState>
                        <GroupIcon sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                        <Typography variant="h6" gutterBottom>
                            {searchQuery ? 'No groups found' : 'No groups yet'}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 3 }}>
                            {searchQuery ? 'Try adjusting your search terms' : 'Create your first group to start sharing expenses'}
                        </Typography>
                        {!searchQuery && (
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={handleAddExpense}
                            >
                                Create Your First Group
                            </Button>
                        )}
                    </EmptyState>
                ) : (
                    <List>
                        {filteredGroups.map((group) => (
                            <GroupItem key={group.id} onClick={() => handleGroupClick(group)}>
                                <ListItemAvatar>
                                    <Avatar sx={{
                                        backgroundColor: group.name === 'Non-group expenses' ? 'success.main' : 'primary.main',
                                        color: 'white'
                                    }}>
                                        {group.icon}
                                    </Avatar>
                                </ListItemAvatar>
                                <GroupInfo>
                                    <GroupHeader>
                                        <GroupName>{group.name}</GroupName>
                                        <GroupBalance variant={getBalanceVariant(group.balance.total)}>
                                            {getBalanceText(group)}
                                        </GroupBalance>
                                    </GroupHeader>
                                    <BalanceDetails>
                                        {group.balance.breakdown.map((item, index) => (
                                            <BalanceDetailItem
                                                key={index}
                                                variant={getBalanceVariant(item.amount)}
                                            >
                                                {item.type === 'owe' ? `You owe ${item.name} ` :
                                                    item.type === 'owed' ? `${item.name} owes you ` :
                                                        item.name}
                                                {item.amount !== 0 && formatBalance(item.amount, group.balance.currency)}
                                            </BalanceDetailItem>
                                        ))}
                                    </BalanceDetails>
                                </GroupInfo>
                            </GroupItem>
                        ))}
                    </List>
                )}

                {/* Settled Groups Section */}
                <SettledGroupsSection>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Hiding groups you settled up with over 7 days ago
                    </Typography>
                    <Button
                        variant="outlined"
                        color="success"
                        startIcon={showSettledGroups ? <VisibilityOff /> : <Visibility />}
                        onClick={() => setShowSettledGroups(!showSettledGroups)}
                        fullWidth
                    >
                        {showSettledGroups ? 'Hide' : 'Show'} {settledGroups.length} settled-up groups
                    </Button>

                    {showSettledGroups && (
                        <List sx={{ mt: 2 }}>
                            {settledGroups.map((group) => (
                                <GroupItem key={group.id} onClick={() => handleGroupClick(group)}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ backgroundColor: 'grey.300', color: 'grey.600' }}>
                                            {group.name.split(' ').map(n => n[0]).join('')}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <GroupInfo>
                                        <GroupHeader>
                                            <GroupName>{group.name}</GroupName>
                                            <Chip
                                                label="Settled up"
                                                color="success"
                                                size="small"
                                                icon={<CheckCircle />}
                                            />
                                        </GroupHeader>
                                    </GroupInfo>
                                </GroupItem>
                            ))}
                        </List>
                    )}
                </SettledGroupsSection>
            </GroupsListCard>

            {/* Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </DashboardContainer>
    );
};

export default Dashboard; 
import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery, Chip, Avatar, Box as MuiBox, TextField, InputAdornment, Snackbar, Alert, List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Person,
    Close,
    Add,
    Search,
    Group as GroupIcon,
    AccountBalanceWallet,
    TrendingUp,
    TrendingDown,
    MoreVert,
    Edit,
    Delete
} from '@mui/icons-material';
import {
    Box,
    Typography,
    Card,
    Button,
    InputField,
    Avatar as CustomAvatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
    MenuItem
} from 'components';
import api from '../services/api';

const GroupsContainer = styled(Box)(({ theme }) => ({
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

const SearchBox = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
    },
}));

const GroupCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: theme.shadows[8],
        transform: 'translateY(-2px)',
    },
}));

const GroupHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
}));

const GroupInfo = styled(Box)(({ theme }) => ({
    flex: 1,
}));

const GroupTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
}));

const GroupSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

const BalanceSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const BalanceItem = styled(Box)(({ theme, variant }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
    backgroundColor: variant === 'positive' ? theme.palette.success.light + '20' :
        variant === 'negative' ? theme.palette.error.light + '20' :
            theme.palette.grey[100],
    minWidth: 80,
}));

const BalanceAmount = styled(Typography)(({ theme, variant }) => ({
    fontSize: '1.125rem',
    fontWeight: 700,
    color: variant === 'positive' ? theme.palette.success.main :
        variant === 'negative' ? theme.palette.error.main :
            theme.palette.text.primary,
}));

const BalanceLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    textAlign: 'center',
}));

const MembersSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const MemberAvatar = styled(Avatar)(({ theme }) => ({
    width: 32,
    height: 32,
    fontSize: '0.75rem',
    border: `2px solid ${theme.palette.background.paper}`,
    marginLeft: -8,
    '&:first-of-type': {
        marginLeft: 0,
    },
}));

const EmptyState = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(6, 2),
    color: theme.palette.text.secondary,
}));

const FormCard = styled(Card)(({ theme }) => ({
    maxWidth: 800,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
        margin: 0,
    },
}));

const Form = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(2),
    },
}));

const FormGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

const FormLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
}));

const MemberInput = styled(Box)(({ theme }) => ({
    border: `2px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius * 1.5,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    minHeight: 60,
    transition: 'all 0.2s ease',

    '&:focus-within': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 3px ${theme.palette.primary.light}20`,
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        minHeight: 50,
    },
}));

const MemberTags = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
        gap: theme.spacing(0.5),
    },
}));

const MemberTag = styled(Chip)(({ theme }) => ({
    '& .MuiChip-avatar': {
        width: 20,
        height: 20,
        fontSize: '0.625rem',
    },
}));

const Groups = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [groups, setGroups] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    // Mock data - replace with API calls
    const mockGroups = [
        {
            id: 1,
            name: 'Trip to Murree',
            description: 'Weekend trip with friends',
            members: [
                { id: 1, name: 'Shahid', email: 'shahid@example.com', avatar: 'SH' },
                { id: 2, name: 'Usman Sudo', email: 'usman@example.com', avatar: 'US' },
                { id: 3, name: 'Jutt', email: 'jutt@example.com', avatar: 'JU' },
                { id: 4, name: 'Ali Zafar', email: 'ali@example.com', avatar: 'AZ' },
            ],
            balance: {
                owed: 7500,
                owe: 1200,
                currency: 'PKR'
            },
            recentExpenses: 3,
            lastActivity: '2 days ago'
        },
        {
            id: 2,
            name: 'Monthly Rent',
            description: 'Apartment rent sharing',
            members: [
                { id: 1, name: 'Shahid', email: 'shahid@example.com', avatar: 'SH' },
                { id: 5, name: 'Butt', email: 'butt@example.com', avatar: 'BU' },
                { id: 6, name: 'Hamid', email: 'hamid@example.com', avatar: 'HA' },
            ],
            balance: {
                owed: 0,
                owe: 0,
                currency: 'PKR'
            },
            recentExpenses: 1,
            lastActivity: '1 week ago'
        },
        {
            id: 3,
            name: 'Office Lunches',
            description: 'Daily lunch expenses',
            members: [
                { id: 1, name: 'Shahid', email: 'shahid@example.com', avatar: 'SH' },
                { id: 2, name: 'Usman Sudo', email: 'usman@example.com', avatar: 'US' },
                { id: 3, name: 'Jutt', email: 'jutt@example.com', avatar: 'JU' },
                { id: 4, name: 'Ali Zafar', email: 'ali@example.com', avatar: 'AZ' },
                { id: 7, name: 'Sara', email: 'sara@example.com', avatar: 'SA' },
            ],
            balance: {
                owed: 1800,
                owe: 2400,
                currency: 'PKR'
            },
            recentExpenses: 5,
            lastActivity: '3 days ago'
        }
    ];

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        members: ['Shahid (You)'],
    });

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setGroups(mockGroups);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatBalance = (amount, currency) => {
        return `${currency} ${amount.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })}`;
    };

    const handleCreateGroup = () => {
        // TODO: Implement group creation
        console.log('Creating group:', formData);
        setShowCreateDialog(false);
        setFormData({ name: '', description: '', members: ['Shahid (You)'] });
        setSnackbar({
            open: true,
            message: 'Group created successfully!',
            severity: 'success'
        });
    };

    const handleGroupClick = (group) => {
        // TODO: Navigate to group detail page
        console.log('Opening group:', group);
    };

    const handleMenuClick = (event, group) => {
        setAnchorEl(event.currentTarget);
        setSelectedGroup(group);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedGroup(null);
    };

    const handleEditGroup = () => {
        // TODO: Implement edit group
        console.log('Editing group:', selectedGroup);
        handleMenuClose();
    };

    const handleDeleteGroup = () => {
        // TODO: Implement delete group
        console.log('Deleting group:', selectedGroup);
        handleMenuClose();
        setSnackbar({
            open: true,
            message: 'Group deleted successfully!',
            severity: 'success'
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading) {
        return (
            <GroupsContainer>
                <Typography>Loading groups...</Typography>
            </GroupsContainer>
        );
    }

    return (
        <GroupsContainer>
            {/* Header */}
            <HeaderSection>
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Groups
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your expense groups
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
                        onClick={() => setShowCreateDialog(true)}
                    >
                        New Group
                    </Button>
                </Box>
            </HeaderSection>

            {/* Groups List */}
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
                            onClick={() => setShowCreateDialog(true)}
                        >
                            Create Your First Group
                        </Button>
                    )}
                </EmptyState>
            ) : (
                <Box>
                    {filteredGroups.map((group) => (
                        <GroupCard key={group.id} onClick={() => handleGroupClick(group)}>
                            <Box sx={{ p: 3 }}>
                                <GroupHeader>
                                    <GroupInfo>
                                        <GroupTitle>{group.name}</GroupTitle>
                                        <GroupSubtitle>{group.description}</GroupSubtitle>
                                        <Typography variant="caption" color="text.secondary">
                                            {group.recentExpenses} recent expenses • {group.lastActivity}
                                        </Typography>
                                    </GroupInfo>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleMenuClick(e, group);
                                        }}
                                    >
                                        <MoreVert />
                                    </IconButton>
                                </GroupHeader>

                                <BalanceSection>
                                    <BalanceItem variant={group.balance.owed > 0 ? 'positive' : 'neutral'}>
                                        <BalanceAmount variant={group.balance.owed > 0 ? 'positive' : 'neutral'}>
                                            {formatBalance(group.balance.owed, group.balance.currency)}
                                        </BalanceAmount>
                                        <BalanceLabel>You're owed</BalanceLabel>
                                    </BalanceItem>
                                    <BalanceItem variant={group.balance.owe > 0 ? 'negative' : 'neutral'}>
                                        <BalanceAmount variant={group.balance.owe > 0 ? 'negative' : 'neutral'}>
                                            {formatBalance(group.balance.owe, group.balance.currency)}
                                        </BalanceAmount>
                                        <BalanceLabel>You owe</BalanceLabel>
                                    </BalanceItem>
                                </BalanceSection>

                                <MembersSection>
                                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                                        {group.members.length} members:
                                    </Typography>
                                    {group.members.slice(0, 4).map((member, index) => (
                                        <MemberAvatar key={member.id} title={member.name}>
                                            {member.avatar}
                                        </MemberAvatar>
                                    ))}
                                    {group.members.length > 4 && (
                                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                            +{group.members.length - 4} more
                                        </Typography>
                                    )}
                                </MembersSection>
                            </Box>
                        </GroupCard>
                    ))}
                </Box>
            )}

            {/* Create Group Dialog */}
            <Dialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogContent>
                    <Form>
                        <FormGroup>
                            <FormLabel>Group Name</FormLabel>
                            <InputField
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Trip to Murree"
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Description (Optional)</FormLabel>
                            <InputField
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Brief description of the group"
                                multiline
                                rows={2}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Members</FormLabel>
                            <MemberInput>
                                <MemberTags>
                                    {formData.members.map((member, index) => (
                                        <MemberTag
                                            key={index}
                                            avatar={<CustomAvatar>{member.split(' ')[0][0]}</CustomAvatar>}
                                            label={member}
                                            onDelete={() => {
                                                if (member !== 'Shahid (You)') {
                                                    setFormData({
                                                        ...formData,
                                                        members: formData.members.filter(m => m !== member)
                                                    });
                                                }
                                            }}
                                        />
                                    ))}
                                </MemberTags>
                                <Typography variant="caption" color="text.secondary">
                                    You can add more members after creating the group
                                </Typography>
                            </MemberInput>
                        </FormGroup>
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowCreateDialog(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateGroup}
                        disabled={!formData.name.trim()}
                    >
                        Create Group
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Group Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditGroup}>
                    <Edit sx={{ mr: 1 }} />
                    Edit Group
                </MenuItem>
                <MenuItem onClick={handleDeleteGroup} sx={{ color: 'error.main' }}>
                    <Delete sx={{ mr: 1 }} />
                    Delete Group
                </MenuItem>
            </Menu>

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
        </GroupsContainer>
    );
};

export default Groups; 
import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery, Chip, Avatar, Box as MuiBox, TextField, InputAdornment, Snackbar, Alert, List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Search,
    Add,
    Close,
    Check,
    Person,
    Restaurant,
    Hotel,
    DirectionsCar,
    ShoppingCart,
    Receipt,
    MoreVert,
    Edit,
    Delete
} from '@mui/icons-material';
import {
    Box,
    Grid,
    Typography,
    FormControlLabel as CustomFormControlLabel,
    Radio as CustomRadio,
    Checkbox,
    Card,
    Button,
    InputField,
    Select,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Menu,
    MenuItem
} from 'components';
import api from '../services/api';

const ExpensesContainer = styled(Box)(({ theme }) => ({
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

const ExpenseCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
        boxShadow: theme.shadows[8],
        transform: 'translateY(-2px)',
    },
}));

const ExpenseHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(2),
}));

const ExpenseInfo = styled(Box)(({ theme }) => ({
    flex: 1,
}));

const ExpenseTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
}));

const ExpenseSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

const ExpenseAmount = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
}));

const ExpenseMeta = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(1),
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
    fontSize: '0.75rem',
    height: 24,
}));

const EmptyState = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(6, 2),
    color: theme.palette.text.secondary,
}));

const PayerDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.spacing(2),
        maxWidth: 400,
        width: '100%',
    },
}));

const PayerItem = styled(ListItem)(({ theme, selected }) => ({
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor: selected ? theme.palette.primary.light + '20' : 'transparent',
    border: selected ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const ParticipantChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    '& .MuiChip-avatar': {
        width: 24,
        height: 24,
        fontSize: '0.75rem',
    },
}));

const SearchResultsBox = styled(MuiBox)(({ theme }) => ({
    maxHeight: 200,
    overflowY: 'auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
}));

const SearchResultItem = styled(MuiBox)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5, 2),
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
        borderBottom: 'none',
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
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

const FormRow = styled(Grid)(({ theme }) => ({
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

const AmountInput = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    border: `2px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius * 1.5,
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.2s ease',

    '&:focus-within': {
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 3px ${theme.palette.primary.light}20`,
    },
}));

const CurrencySymbol = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1.5, 2),
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.text.secondary,
    fontWeight: 600,
    fontSize: '1.125rem',
    borderRight: `1px solid ${theme.palette.grey[300]}`,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 1.5),
        fontSize: '1rem',
    },
}));

const Expenses = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [expenses, setExpenses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showPayerDialog, setShowPayerDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    // Mock data - replace with API calls
    const mockExpenses = [
        {
            id: 1,
            title: 'Dinner at Food Court',
            description: 'Group dinner at mall food court',
            amount: 4000,
            currency: 'PKR',
            category: 'food',
            payer: { id: 1, name: 'Shahid', avatar: 'SH' },
            participants: [
                { id: 1, name: 'Shahid', avatar: 'SH' },
                { id: 2, name: 'Usman Sudo', avatar: 'US' },
                { id: 3, name: 'Jutt', avatar: 'JU' },
                { id: 4, name: 'Ali Zafar', avatar: 'AZ' },
            ],
            group: 'Trip to Murree',
            date: '2024-01-15',
            splitType: 'equal',
            isSettled: false
        },
        {
            id: 2,
            title: 'Hotel Booking',
            description: 'Hotel room for 2 nights',
            amount: 10000,
            currency: 'PKR',
            category: 'hotel',
            payer: { id: 2, name: 'Usman Sudo', avatar: 'US' },
            participants: [
                { id: 1, name: 'Shahid', avatar: 'SH' },
                { id: 2, name: 'Usman Sudo', avatar: 'US' },
                { id: 3, name: 'Jutt', avatar: 'JU' },
            ],
            group: 'Trip to Murree',
            date: '2024-01-14',
            splitType: 'equal',
            isSettled: false
        },
        {
            id: 3,
            title: 'Lunch at Office',
            description: 'Daily lunch expense',
            amount: 1200,
            currency: 'PKR',
            category: 'food',
            payer: { id: 1, name: 'Shahid', avatar: 'SH' },
            participants: [
                { id: 1, name: 'Shahid', avatar: 'SH' },
                { id: 2, name: 'Usman Sudo', avatar: 'US' },
            ],
            group: null, // Individual expense
            date: '2024-01-13',
            splitType: 'equal',
            isSettled: true
        }
    ];

    const [formData, setFormData] = useState({
        expenseType: 'individual',
        group: '',
        expenseTitle: '',
        amount: '',
        paidBy: null,
        splitType: 'equal',
        selectedMembers: ['Shahid (You)'],
        participants: [],
        category: 'other'
    });

    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const groups = [
        { value: 'Trip to Murree', label: 'Trip to Murree' },
        { value: 'Monthly Rent', label: 'Monthly Rent' },
        { value: 'Office Lunches', label: 'Office Lunches' },
    ];

    const members = [
        { value: 'Shahid (You)', label: 'Shahid (You)' },
        { value: 'Usman Sudo', label: 'Usman Sudo' },
        { value: 'Jutt', label: 'Jutt' },
        { value: 'Ali Zafar', label: 'Ali Zafar' },
    ];

    const [splitPreview, setSplitPreview] = useState([]);

    const categoryIcons = {
        food: Restaurant,
        hotel: Hotel,
        transport: DirectionsCar,
        shopping: ShoppingCart,
        other: Receipt
    };

    const categoryColors = {
        food: 'success',
        hotel: 'primary',
        transport: 'info',
        shopping: 'warning',
        other: 'default'
    };

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setExpenses(mockExpenses);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredExpenses = expenses.filter(expense =>
        expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.group?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatAmount = (amount, currency) => {
        return `${currency} ${amount.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleAddExpense = () => {
        setShowAddDialog(true);
    };

    const handleExpenseClick = (expense) => {
        // TODO: Navigate to expense detail page
        console.log('Opening expense:', expense);
    };

    const handleMenuClick = (event, expense) => {
        setAnchorEl(event.currentTarget);
        setSelectedExpense(expense);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedExpense(null);
    };

    const handleEditExpense = () => {
        // TODO: Implement edit expense
        console.log('Editing expense:', selectedExpense);
        handleMenuClose();
    };

    const handleDeleteExpense = () => {
        // TODO: Implement delete expense
        console.log('Deleting expense:', selectedExpense);
        handleMenuClose();
        setSnackbar({
            open: true,
            message: 'Expense deleted successfully!',
            severity: 'success'
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    if (loading) {
        return (
            <ExpensesContainer>
                <Typography>Loading expenses...</Typography>
            </ExpensesContainer>
        );
    }

    return (
        <ExpensesContainer>
            {/* Header */}
            <HeaderSection>
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        Expenses
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Track and manage your expenses
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <SearchBox
                        placeholder="Search expenses..."
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
                        Add Expense
                    </Button>
                </Box>
            </HeaderSection>

            {/* Expenses List */}
            {filteredExpenses.length === 0 ? (
                <EmptyState>
                    <Receipt sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                    <Typography variant="h6" gutterBottom>
                        {searchQuery ? 'No expenses found' : 'No expenses yet'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                        {searchQuery ? 'Try adjusting your search terms' : 'Add your first expense to start tracking'}
                    </Typography>
                    {!searchQuery && (
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={handleAddExpense}
                        >
                            Add Your First Expense
                        </Button>
                    )}
                </EmptyState>
            ) : (
                <Box>
                    {filteredExpenses.map((expense) => {
                        const CategoryIcon = categoryIcons[expense.category] || Receipt;
                        const categoryColor = categoryColors[expense.category] || 'default';

                        return (
                            <ExpenseCard key={expense.id} onClick={() => handleExpenseClick(expense)}>
                                <Box sx={{ p: 3 }}>
                                    <ExpenseHeader>
                                        <ExpenseInfo>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                <CategoryIcon color={categoryColor} />
                                                <ExpenseTitle>{expense.title}</ExpenseTitle>
                                            </Box>
                                            <ExpenseSubtitle>{expense.description}</ExpenseSubtitle>
                                            <ExpenseMeta>
                                                <CategoryChip
                                                    label={expense.category}
                                                    color={categoryColor}
                                                    size="small"
                                                />
                                                {expense.group && (
                                                    <Typography variant="caption" color="text.secondary">
                                                        {expense.group}
                                                    </Typography>
                                                )}
                                                <Typography variant="caption" color="text.secondary">
                                                    {formatDate(expense.date)}
                                                </Typography>
                                                {expense.isSettled && (
                                                    <Chip
                                                        label="Settled"
                                                        color="success"
                                                        size="small"
                                                        icon={<Check />}
                                                    />
                                                )}
                                            </ExpenseMeta>
                                        </ExpenseInfo>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <ExpenseAmount>{formatAmount(expense.amount, expense.currency)}</ExpenseAmount>
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleMenuClick(e, expense);
                                                }}
                                            >
                                                <MoreVert />
                                            </IconButton>
                                        </Box>
                                    </ExpenseHeader>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Paid by:
                                            </Typography>
                                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                                {expense.payer.avatar}
                                            </Avatar>
                                            <Typography variant="body2" fontWeight={500}>
                                                {expense.payer.name}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            •
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {expense.participants.length} participants
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            •
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                            {expense.splitType} split
                                        </Typography>
                                    </Box>
                                </Box>
                            </ExpenseCard>
                        );
                    })}
                </Box>
            )}

            {/* Add Expense Dialog */}
            <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogContent>
                    <Form>
                        {/* Expense Type Selection */}
                        <FormRow container>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormLabel>Expense Type</FormLabel>
                                    <RadioGroup
                                        value={formData.expenseType}
                                        onChange={(e) => setFormData({ ...formData, expenseType: e.target.value })}
                                        row
                                    >
                                        <FormControlLabel
                                            value="individual"
                                            control={<Radio />}
                                            label="Individual Expense (Splitwise style)"
                                        />
                                        <FormControlLabel
                                            value="group"
                                            control={<Radio />}
                                            label="Group Expense"
                                        />
                                    </RadioGroup>
                                </FormGroup>
                            </Grid>
                        </FormRow>

                        {/* Group Selection (only for group expenses) */}
                        {formData.expenseType === 'group' && (
                            <FormRow container>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <FormLabel>Group</FormLabel>
                                        <Select
                                            value={formData.group}
                                            onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                                            options={groups}
                                        />
                                    </FormGroup>
                                </Grid>
                            </FormRow>
                        )}

                        {/* Expense Details */}
                        <FormRow container>
                            <Grid item xs={12} md={6}>
                                <FormGroup>
                                    <FormLabel>Expense Title</FormLabel>
                                    <InputField
                                        value={formData.expenseTitle}
                                        onChange={(e) => setFormData({ ...formData, expenseTitle: e.target.value })}
                                        placeholder="e.g., Dinner at Food Court"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormGroup>
                                    <FormLabel>Amount</FormLabel>
                                    <AmountInput>
                                        <CurrencySymbol>₨</CurrencySymbol>
                                        <InputField
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            placeholder="0"
                                            type="number"
                                            step="0.01"
                                            sx={{ border: 'none', boxShadow: 'none' }}
                                        />
                                    </AmountInput>
                                </FormGroup>
                            </Grid>
                        </FormRow>

                        {/* Choose Payer */}
                        <FormRow container>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormLabel>Who Paid?</FormLabel>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setShowPayerDialog(true)}
                                        sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
                                    >
                                        {formData.paidBy ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                                                    {formData.paidBy.avatar}
                                                </Avatar>
                                                <Typography>{formData.paidBy.name}</Typography>
                                            </Box>
                                        ) : (
                                            'Choose payer'
                                        )}
                                    </Button>
                                </FormGroup>
                            </Grid>
                        </FormRow>

                        {/* Split Type */}
                        <FormRow container>
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormLabel>Split Type</FormLabel>
                                    <RadioGroup
                                        value={formData.splitType}
                                        onChange={(e) => setFormData({ ...formData, splitType: e.target.value })}
                                        row
                                    >
                                        <FormControlLabel
                                            value="equal"
                                            control={<Radio />}
                                            label="Split equally"
                                        />
                                        <FormControlLabel
                                            value="custom"
                                            control={<Radio />}
                                            label="Custom amounts"
                                        />
                                    </RadioGroup>
                                </FormGroup>
                            </Grid>
                        </FormRow>
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowAddDialog(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            // TODO: Implement expense creation
                            console.log('Creating expense:', formData);
                            setShowAddDialog(false);
                            setSnackbar({
                                open: true,
                                message: 'Expense added successfully!',
                                severity: 'success'
                            });
                        }}
                        disabled={!formData.expenseTitle || !formData.amount || !formData.paidBy}
                    >
                        Add Expense
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Choose Payer Dialog */}
            <PayerDialog open={showPayerDialog} onClose={() => setShowPayerDialog(false)}>
                <DialogTitle>Choose Payer</DialogTitle>
                <DialogContent>
                    <List>
                        {members.map((member) => (
                            <PayerItem
                                key={member.value}
                                selected={formData.paidBy?.name === member.label}
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        paidBy: {
                                            id: member.value,
                                            name: member.label,
                                            avatar: member.label.split(' ')[0][0]
                                        }
                                    });
                                    setShowPayerDialog(false);
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar>{member.label.split(' ')[0][0]}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={member.label} />
                                {formData.paidBy?.name === member.label && (
                                    <Check color="primary" />
                                )}
                            </PayerItem>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <PayerItem>
                            <ListItemAvatar>
                                <Avatar>MP</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Multiple people" />
                        </PayerItem>
                    </List>
                </DialogContent>
            </PayerDialog>

            {/* Expense Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditExpense}>
                    <Edit sx={{ mr: 1 }} />
                    Edit Expense
                </MenuItem>
                <MenuItem onClick={handleDeleteExpense} sx={{ color: 'error.main' }}>
                    <Delete sx={{ mr: 1 }} />
                    Delete Expense
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
        </ExpensesContainer>
    );
};

export default Expenses; 
import React, { useState, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Box,
    Grid,
    Typography,
    FormControlLabel,
    Radio,
    Checkbox,
    Card,
    Button,
    InputField,
    Select
} from 'components';

const ExpensesContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const ScreenHeader = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(3),
    },
}));

const ScreenTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.875rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
    },
}));

const ScreenSubtitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
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
    padding: theme.spacing(1.5, 1),
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    fontWeight: 600,
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 0.5),
        fontSize: '0.875rem',
    },
}));

const AmountInputField = styled(InputField)(({ theme }) => ({
    border: 'none',
    borderRadius: 0,
    flex: 1,
    '& .MuiOutlinedInput-root': {
        border: 'none',
        boxShadow: 'none',
    },
}));

const SplitOptions = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: theme.spacing(1),
    },
}));

const RadioOption = styled(FormControlLabel)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    cursor: 'pointer',
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: 'background-color 0.2s ease',

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },

    '& .MuiRadio-root': {
        color: theme.palette.grey[400],
        '&.Mui-checked': {
            color: theme.palette.primary.main,
        },
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
    },
}));

const CheckboxOption = styled(FormControlLabel)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    cursor: 'pointer',
    padding: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius * 1.5,
    transition: 'background-color 0.2s ease',

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },

    '& .MuiCheckbox-root': {
        color: theme.palette.grey[400],
        '&.Mui-checked': {
            color: theme.palette.primary.main,
        },
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
    },
}));

const MemberCheckboxes = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        gap: theme.spacing(1),
    },
}));

const SplitPreview = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius * 1.5,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.5),
    },
}));

const PreviewTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        marginBottom: theme.spacing(1.5),
    },
}));

const SplitBreakdown = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

const SplitItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 0),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,

    '&:last-child': {
        borderBottom: 'none',
    },
}));

const SplitName = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
    },
}));

const SplitAmount = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
    },
}));

const FormActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    paddingTop: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(2),
        gap: theme.spacing(1),
    },
}));

const Expenses = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [formData, setFormData] = useState({
        group: 'Trip to Murree',
        expenseTitle: 'Dinner at Food Court',
        amount: '4000',
        paidBy: 'Ali Ahmed (You)',
        splitType: 'equal',
        selectedMembers: ['Ali Ahmed (You)', 'Sara Ahmed', 'Usman Khan', 'Fatima Ali'],
    });

    const groups = [
        { value: 'Trip to Murree', label: 'Trip to Murree' },
        { value: 'Monthly Rent', label: 'Monthly Rent' },
        { value: 'Office Lunches', label: 'Office Lunches' },
    ];

    const members = [
        { value: 'Ali Ahmed (You)', label: 'Ali Ahmed (You)' },
        { value: 'Sara Ahmed', label: 'Sara Ahmed' },
        { value: 'Usman Khan', label: 'Usman Khan' },
        { value: 'Fatima Ali', label: 'Fatima Ali' },
    ];

    const [splitPreview, setSplitPreview] = useState([]);

    useEffect(() => {
        const amount = parseFloat(formData.amount) || 0;
        const memberCount = formData.selectedMembers.length;

        if (memberCount > 0) {
            const splitAmount = amount / memberCount;
            const preview = formData.selectedMembers.map(member => ({
                name: member,
                amount: splitAmount.toFixed(2),
            }));
            setSplitPreview(preview);
        } else {
            setSplitPreview([]);
        }
    }, [formData.amount, formData.selectedMembers, formData.splitType]);



    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleMemberToggle = (member) => {
        setFormData(prev => ({
            ...prev,
            selectedMembers: prev.selectedMembers.includes(member)
                ? prev.selectedMembers.filter(m => m !== member)
                : [...prev.selectedMembers, member],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Adding expense:', formData);
        // Handle form submission
    };

    return (
        <ExpensesContainer>
            <ScreenHeader>
                <ScreenTitle>Add Expense</ScreenTitle>
                <ScreenSubtitle>
                    Record a new expense for your group
                </ScreenSubtitle>
            </ScreenHeader>

            <FormCard variant="form">
                <Form component="form" onSubmit={handleSubmit}>
                    <FormRow container>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormLabel>Group</FormLabel>
                                <Select
                                    value={formData.group}
                                    onChange={(e) => handleInputChange('group', e.target.value)}
                                    options={groups}
                                />
                            </FormGroup>
                        </Grid>
                    </FormRow>

                    <FormRow container>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormLabel>Expense Title</FormLabel>
                                <InputField
                                    placeholder="e.g., Dinner at Food Court"
                                    value={formData.expenseTitle}
                                    onChange={(e) => handleInputChange('expenseTitle', e.target.value)}
                                />
                            </FormGroup>
                        </Grid>
                    </FormRow>

                    <FormRow container>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormLabel>Amount</FormLabel>
                                <AmountInput>
                                    <CurrencySymbol>Rs.</CurrencySymbol>
                                    <AmountInputField
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={(e) => handleInputChange('amount', e.target.value)}
                                        inputVariant="amount"
                                    />
                                </AmountInput>
                            </FormGroup>
                        </Grid>
                    </FormRow>

                    <FormRow container>
                        <Grid item xs={12}>
                            <FormGroup>
                                <FormLabel>Paid By</FormLabel>
                                <Select
                                    value={formData.paidBy}
                                    onChange={(e) => handleInputChange('paidBy', e.target.value)}
                                    options={members}
                                />
                            </FormGroup>
                        </Grid>
                    </FormRow>

                    <FormGroup>
                        <FormLabel>Split Options</FormLabel>
                        <SplitOptions>
                            <RadioOption
                                control={
                                    <Radio
                                        checked={formData.splitType === 'equal'}
                                        onChange={(e) => handleInputChange('splitType', e.target.value)}
                                        value="equal"
                                    />
                                }
                                label="Split Equally"
                            />
                            <RadioOption
                                control={
                                    <Radio
                                        checked={formData.splitType === 'custom'}
                                        onChange={(e) => handleInputChange('splitType', e.target.value)}
                                        value="custom"
                                    />
                                }
                                label="Custom Split"
                            />
                        </SplitOptions>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Select Members</FormLabel>
                        <MemberCheckboxes>
                            {members.map((member) => (
                                <CheckboxOption
                                    key={member.value}
                                    control={
                                        <Checkbox
                                            checked={formData.selectedMembers.includes(member.value)}
                                            onChange={() => handleMemberToggle(member.value)}
                                        />
                                    }
                                    label={member.label}
                                />
                            ))}
                        </MemberCheckboxes>
                    </FormGroup>

                    <SplitPreview>
                        <PreviewTitle>Split Preview</PreviewTitle>
                        <SplitBreakdown>
                            {splitPreview.map((item, index) => (
                                <SplitItem key={index}>
                                    <SplitName>{item.name}</SplitName>
                                    <SplitAmount>Rs. {item.amount}</SplitAmount>
                                </SplitItem>
                            ))}
                        </SplitBreakdown>
                    </SplitPreview>

                    <FormActions>
                        <Button variant="primary" type="submit" fullWidth={isMobile}>
                            Add Expense
                        </Button>
                    </FormActions>
                </Form>
            </FormCard>
        </ExpensesContainer>
    );
};

export default Expenses; 
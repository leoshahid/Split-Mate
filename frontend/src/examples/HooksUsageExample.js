import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Card, List, ListItem, ListItemText, Chip } from '@mui/material';
import {
    useLogin,
    useSignup,
    useGroups,
    useCreateGroup,
    useExpenses,
    useCreateExpense,
    useFriends,
    useSearchUsers,
    useCurrentUser,
    useAxios
} from '../hooks';

const HooksUsageExample = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [groupName, setGroupName] = useState('');
    const [expenseTitle, setExpenseTitle] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Get the callApi function
    const callApi = useAxios();

    // Authentication hooks
    const loginMutation = useLogin();
    const signupMutation = useSignup();
    const { data: currentUser, isLoading: userLoading } = useCurrentUser();

    // Groups hooks
    const { data: groups, isLoading: groupsLoading } = useGroups();
    const createGroupMutation = useCreateGroup();

    // Expenses hooks
    const { data: expenses, isLoading: expensesLoading } = useExpenses();
    const createExpenseMutation = useCreateExpense();

    // Friends hooks
    const { data: friends, isLoading: friendsLoading } = useFriends();
    const { data: searchResults, isLoading: searchLoading } = useSearchUsers(searchQuery);

    // Example of direct API call using useAxios
    const handleDirectApiCall = async () => {
        try {
            const data = await callApi({
                method: 'GET',
                url: '/groups',
                params: { limit: 5 }
            });
            console.log('Direct API call result:', data);
        } catch (error) {
            console.error('Direct API call failed:', error);
        }
    };

    // Handle login
    const handleLogin = async () => {
        try {
            await loginMutation.mutateAsync({ email, password });
            console.log('Login successful!');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Handle signup
    const handleSignup = async () => {
        try {
            await signupMutation.mutateAsync({ email, password, name: 'Test User' });
            console.log('Signup successful!');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    // Handle create group
    const handleCreateGroup = async () => {
        try {
            await createGroupMutation.mutateAsync({
                name: groupName,
                description: 'Test group',
                members: ['current-user-id']
            });
            setGroupName('');
            console.log('Group created successfully!');
        } catch (error) {
            console.error('Create group failed:', error);
        }
    };

    // Handle create expense
    const handleCreateExpense = async () => {
        try {
            await createExpenseMutation.mutateAsync({
                title: expenseTitle,
                amount: parseFloat(expenseAmount),
                description: 'Test expense',
                category: 'other',
                splitType: 'equal',
                participants: ['current-user-id']
            });
            setExpenseTitle('');
            setExpenseAmount('');
            console.log('Expense created successfully!');
        } catch (error) {
            console.error('Create expense failed:', error);
        }
    };

    return (
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                React Query Hooks Usage Example (Simplified Pattern)
            </Typography>

            {/* Direct API Call Example */}
            <Card sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Direct API Call with useAxios</Typography>
                <Button onClick={handleDirectApiCall} variant="outlined">
                    Make Direct API Call
                </Button>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    This shows how to use useAxios directly for one-off API calls
                </Typography>
            </Card>

            {/* Current User */}
            <Card sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Current User</Typography>
                {userLoading ? (
                    <Typography>Loading user...</Typography>
                ) : currentUser ? (
                    <Typography>Welcome, {currentUser.name}!</Typography>
                ) : (
                    <Typography>Not logged in</Typography>
                )}
            </Card>

            {/* Authentication */}
            <Card sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Authentication</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        size="small"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        size="small"
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? 'Logging in...' : 'Login'}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={handleSignup}
                        disabled={signupMutation.isPending}
                    >
                        {signupMutation.isPending ? 'Signing up...' : 'Signup'}
                    </Button>
                </Box>
            </Card>

            {/* Groups */}
            <Card sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Groups</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="Group Name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        size="small"
                    />
                    <Button
                        variant="contained"
                        onClick={handleCreateGroup}
                        disabled={createGroupMutation.isPending}
                    >
                        {createGroupMutation.isPending ? 'Creating...' : 'Create Group'}
                    </Button>
                </Box>
                {groupsLoading ? (
                    <Typography>Loading groups...</Typography>
                ) : (
                    <List>
                        {groups?.data?.map((group) => (
                            <ListItem key={group.id}>
                                <ListItemText
                                    primary={group.name}
                                    secondary={group.description}
                                />
                                <Chip label={`${group.members?.length || 0} members`} size="small" />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Card>

            {/* Expenses */}
            <Card sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Expenses</Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="Expense Title"
                        value={expenseTitle}
                        onChange={(e) => setExpenseTitle(e.target.value)}
                        size="small"
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        size="small"
                    />
                    <Button
                        variant="contained"
                        onClick={handleCreateExpense}
                        disabled={createExpenseMutation.isPending}
                    >
                        {createExpenseMutation.isPending ? 'Creating...' : 'Create Expense'}
                    </Button>
                </Box>
                {expensesLoading ? (
                    <Typography>Loading expenses...</Typography>
                ) : (
                    <List>
                        {expenses?.data?.map((expense) => (
                            <ListItem key={expense.id}>
                                <ListItemText
                                    primary={expense.title}
                                    secondary={`${expense.currency} ${expense.amount}`}
                                />
                                <Chip label={expense.category} size="small" />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Card>

            {/* Friends */}
            <Card sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Friends</Typography>
                <TextField
                    label="Search Users"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    size="small"
                    sx={{ mb: 2 }}
                />
                {friendsLoading ? (
                    <Typography>Loading friends...</Typography>
                ) : (
                    <List>
                        {friends?.data?.map((friend) => (
                            <ListItem key={friend.id}>
                                <ListItemText
                                    primary={friend.name}
                                    secondary={`Balance: ${friend.currency} ${friend.balance}`}
                                />
                                <Chip
                                    label={friend.balance > 0 ? 'Owes you' : 'You owe'}
                                    color={friend.balance > 0 ? 'success' : 'error'}
                                    size="small"
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Card>

            {/* Search Results */}
            {searchQuery && (
                <Card sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>Search Results</Typography>
                    {searchLoading ? (
                        <Typography>Searching...</Typography>
                    ) : (
                        <List>
                            {searchResults?.data?.map((user) => (
                                <ListItem key={user.id}>
                                    <ListItemText
                                        primary={user.name}
                                        secondary={user.email}
                                    />
                                    <Chip
                                        label={user.isFriend ? 'Already friend' : 'Add friend'}
                                        color={user.isFriend ? 'default' : 'primary'}
                                        size="small"
                                    />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Card>
            )}

            {/* Code Example */}
            <Card sx={{ p: 2, mt: 3 }}>
                <Typography variant="h6" gutterBottom>Code Example</Typography>
                <Typography variant="body2" component="pre" sx={{
                    backgroundColor: 'grey.100',
                    p: 2,
                    borderRadius: 1,
                    overflow: 'auto'
                }}>
                    {`// Simple hook usage pattern:
const callApi = useAxios()

// Query hook
const { data, isLoading } = useGroups()

// Mutation hook
const createGroupMutation = useCreateGroup()

// Direct API call
const data = await callApi({
    method: 'GET',
    url: '/groups',
    params: { limit: 5 }
})`}
                </Typography>
            </Card>
        </Box>
    );
};

export default HooksUsageExample; 
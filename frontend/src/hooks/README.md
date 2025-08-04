# React Query Hooks

This directory contains all the React Query hooks for the SplitMate application. The hooks follow a simple and consistent pattern using `useAxios` for API calls.

## Core Hook

### `useAxios`

A simple hook that returns a `callApi` function for making HTTP requests with automatic authentication and error handling.

```javascript
const callApi = useAxios();
const data = await callApi({
  method: "GET",
  url: "/api/endpoint",
});
```

## Hook Pattern

All hooks follow this simple pattern:

### Queries (GET requests)

```javascript
export const useGroups = () => {
  const callApi = useAxios();
  return useQuery([GROUPS_KEY], () =>
    callApi({
      method: "GET",
      url: "/groups",
    }).then((data) => data.data)
  );
};
```

### Mutations (POST/PUT/DELETE requests)

```javascript
export const useCreateGroup = () => {
  const callApi = useAxios();
  const queryClient = useQueryClient();

  return useMutation(
    (groupData) =>
      callApi({
        method: "POST",
        url: "/groups",
        data: groupData,
      }).then((data) => data.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GROUPS_KEY] });
      },
    }
  );
};
```

## Usage in Components

### Simple Query

```javascript
import { useGroups } from "hooks";

const MyComponent = () => {
  const { data: groups, isLoading, error } = useGroups();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {groups.map((group) => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
};
```

### Simple Mutation (Destructured Pattern)

```javascript
import { useCreateGroup } from "hooks";

const MyComponent = () => {
  const { mutateAsync: createGroup, isLoading: isCreating } = useCreateGroup();

  const handleCreate = async () => {
    try {
      await createGroup({ name: "New Group" });
      // Success - cache is automatically invalidated
    } catch (error) {
      // Handle error
    }
  };

  return (
    <button onClick={handleCreate} disabled={isCreating}>
      {isCreating ? "Creating..." : "Create Group"}
    </button>
  );
};
```

### With Parameters

```javascript
import { useGroup } from "hooks";

const MyComponent = ({ groupId }) => {
  const { data: group, isLoading } = useGroup(groupId);

  if (isLoading) return <div>Loading...</div>;

  return <div>{group?.name}</div>;
};
```

### Authentication Example

```javascript
import { useLogin } from "hooks";

const LoginComponent = () => {
  const { mutateAsync: login, isLoading: isLoggingIn } = useLogin();

  const handleLogin = async (credentials) => {
    try {
      const response = await login(credentials);
      // Handle successful login
      localStorage.setItem("token", response.token);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <button
      onClick={() => handleLogin({ email, password })}
      disabled={isLoggingIn}
    >
      {isLoggingIn ? "Signing in..." : "Sign In"}
    </button>
  );
};
```

## Available Hooks

### Authentication (`authHooks.js`)

- `useCurrentUser()` - Get current user
- `useLogin()` - Login mutation
- `useSignup()` - Signup mutation
- `useGoogleAuth()` - Google OAuth mutation
- `useSendVerificationCode()` - Send email verification
- `useVerifyEmail()` - Verify email mutation
- `useLogout()` - Logout mutation
- `useUpdateProfile()` - Update profile mutation
- `useChangePassword()` - Change password mutation

### Groups (`groupHooks.js`)

- `useGroups()` - Get all groups
- `useGroup(id)` - Get single group
- `useGroupBalances(groupId)` - Get group balances
- `useCreateGroup()` - Create group mutation
- `useUpdateGroup()` - Update group mutation
- `useDeleteGroup()` - Delete group mutation
- `useAddGroupMember()` - Add member mutation
- `useRemoveGroupMember()` - Remove member mutation
- `useGroupExpenses(groupId)` - Get group expenses
- `useSettleUpGroup()` - Settle up group mutation

### Expenses (`expenseHooks.js`)

- `useExpenses()` - Get all expenses
- `useExpense(id)` - Get single expense
- `useUserExpenses(userId)` - Get user expenses
- `useCreateExpense()` - Create expense mutation
- `useUpdateExpense()` - Update expense mutation
- `useDeleteExpense()` - Delete expense mutation
- `useExpenseCategories()` - Get expense categories
- `useExpenseStats(filters)` - Get expense statistics
- `useSettleUpExpense()` - Settle up expense mutation
- `useExpenseParticipants(expenseId)` - Get expense participants
- `useAddExpenseParticipant()` - Add participant mutation
- `useRemoveExpenseParticipant()` - Remove participant mutation

### Friends (`friendHooks.js`)

- `useFriends()` - Get all friends
- `useFriend(id)` - Get single friend
- `useSearchUsers(query)` - Search users
- `useFriendBalanceBreakdown(friendId)` - Get friend balance
- `useOverallBalance()` - Get overall balance
- `useSettleUpFriend()` - Settle up with friend mutation
- `useFriendTransactions(friendId)` - Get friend transactions
- `useFriendExpenses(friendId)` - Get friend expenses
- `useAutoCreateFriendship()` - Auto create friendship mutation
- `useFriendSuggestions()` - Get friend suggestions
- `useFriendStats()` - Get friend statistics
- `useRecentFriends()` - Get recent friends
- `useFriendsWithBalances()` - Get friends with balances

### Users (`userHooks.js`)

- `useUserProfile(userId)` - Get user profile
- `useUserPreferences(userId)` - Get user preferences
- `useUpdateUserPreferences()` - Update preferences mutation
- `useUserActivity(userId)` - Get user activity
- `useUserStats(userId)` - Get user statistics
- `useUpdateUserAvatar()` - Update avatar mutation
- `useUserNotifications(userId)` - Get user notifications
- `useMarkNotificationRead()` - Mark notification read mutation
- `useMarkAllNotificationsRead()` - Mark all notifications read mutation
- `useUserSettings(userId)` - Get user settings
- `useUpdateUserSettings()` - Update settings mutation
- `useDeleteUserAccount()` - Delete account mutation

## Query Keys

Query keys are defined in `commonHooks.js`:

- `AUTH_KEY` - Authentication related queries
- `USER_KEY` - User related queries
- `GROUPS_KEY` - Group related queries
- `EXPENSES_KEY` - Expense related queries
- `FRIENDS_KEY` - Friend related queries

## Benefits

1. **Simple & Clean** - Just pass `method` and `url` to `callApi`
2. **Automatic Caching** - React Query handles caching automatically
3. **Loading States** - Built-in `isLoading` state
4. **Error Handling** - Built-in error handling
5. **Cache Invalidation** - Automatic cache updates on mutations
6. **Type Safety** - Ready for TypeScript
7. **Consistent Pattern** - Same pattern across all hooks
8. **Direct useMutation** - Clean and simple mutation pattern

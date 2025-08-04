import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from './useAxios'
import { FRIENDS_KEY } from './commonHooks'

// Get all friends
export const useFriends = () => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY],
        () => callApi({
            method: 'GET',
            url: '/friends',
        }).then((data) => data.data)
    )
}

// Get single friend
export const useFriend = (id) => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY, id],
        () => callApi({
            method: 'GET',
            url: `/friends/${id}`,
        }).then((data) => data.data),
        {
            enabled: Boolean(id),
        }
    )
}

// Search users
export const useSearchUsers = (query) => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY, 'search', query],
        () => callApi({
            method: 'GET',
            url: '/friends/search',
            params: { query },
        }).then((data) => data.data),
        {
            enabled: Boolean(query && query.length >= 2),
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    )
}

// Get friend balance breakdown
export const useFriendBalanceBreakdown = (friendId) => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY, friendId, 'balance'],
        () => callApi({
            method: 'GET',
            url: `/friends/${friendId}/balance`,
        }).then((data) => data.data),
        {
            enabled: Boolean(friendId),
        }
    )
}

// Get overall balance
export const useOverallBalance = () => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY, 'overall-balance'],
        () => callApi({
            method: 'GET',
            url: '/friends/overall-balance',
        }).then((data) => data.data)
    )
}

// Settle up with friend
export const useSettleUpFriend = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ friendId, amount }) => callApi({
            method: 'POST',
            url: `/friends/${friendId}/settle-up`,
            data: { amount },
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [FRIENDS_KEY] })
                queryClient.invalidateQueries({ queryKey: [FRIENDS_KEY, variables.friendId] })
                queryClient.invalidateQueries({ queryKey: [FRIENDS_KEY, 'overall-balance'] })
            },
        }
    )
}

// Get friend transactions
export const useFriendTransactions = (friendId) => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY, friendId, 'transactions'],
        () => callApi({
            method: 'GET',
            url: `/friends/${friendId}/transactions`,
        }).then((data) => data.data),
        {
            enabled: Boolean(friendId),
        }
    )
}

// Get friend expenses
export const useFriendExpenses = (friendId) => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY, friendId, 'expenses'],
        () => callApi({
            method: 'GET',
            url: `/friends/${friendId}/expenses`,
        }).then((data) => data.data),
        {
            enabled: Boolean(friendId),
        }
    )
}

// Auto create friendship
export const useAutoCreateFriendship = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ userId1, userId2 }) => callApi({
            method: 'POST',
            url: '/friends/auto-create',
            data: { userId1, userId2 },
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [FRIENDS_KEY] })
            },
        }
    )
}

// Get friend suggestions
export const useFriendSuggestions = () => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY, 'suggestions'],
        () => callApi({
            method: 'GET',
            url: '/friends/suggestions',
        }).then((data) => data.data)
    )
}

// Get friend stats
export const useFriendStats = () => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY, 'stats'],
        () => callApi({
            method: 'GET',
            url: '/friends/stats',
        }).then((data) => data.data)
    )
}

// Get recent friends
export const useRecentFriends = () => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY, 'recent'],
        () => callApi({
            method: 'GET',
            url: '/friends/recent',
        }).then((data) => data.data)
    )
}

// Get friends with balances
export const useFriendsWithBalances = () => {
    const callApi = useAxios()
    return useQuery(
        [FRIENDS_KEY, 'with-balances'],
        () => callApi({
            method: 'GET',
            url: '/friends/with-balances',
        }).then((data) => data.data)
    )
} 
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from './useAxios'
import { EXPENSES_KEY } from './commonHooks'

// Get all expenses
export const useExpenses = () => {
    const callApi = useAxios()
    return useQuery(
        [EXPENSES_KEY],
        () => callApi({
            method: 'GET',
            url: '/expenses',
        }).then((data) => data.data)
    )
}

// Get single expense
export const useExpense = (id) => {
    const callApi = useAxios()
    return useQuery(
        [EXPENSES_KEY, id],
        () => callApi({
            method: 'GET',
            url: `/expenses/${id}`,
        }).then((data) => data.data),
        {
            enabled: Boolean(id),
        }
    )
}

// Get user expenses
export const useUserExpenses = (userId) => {
    const callApi = useAxios()
    return useQuery(
        [EXPENSES_KEY, 'user', userId],
        () => callApi({
            method: 'GET',
            url: `/expenses/user/${userId}`,
        }).then((data) => data.data),
        {
            enabled: Boolean(userId),
        }
    )
}

// Create expense
export const useCreateExpense = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (expenseData) => callApi({
            method: 'POST',
            url: '/expenses',
            data: expenseData,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY] })
            },
        }
    )
}

// Update expense
export const useUpdateExpense = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ id, ...expenseData }) => callApi({
            method: 'PUT',
            url: `/expenses/${id}`,
            data: expenseData,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY] })
                queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY, variables.id] })
            },
        }
    )
}

// Delete expense
export const useDeleteExpense = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (id) => callApi({
            method: 'DELETE',
            url: `/expenses/${id}`,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY] })
            },
        }
    )
}

// Get expense categories
export const useExpenseCategories = () => {
    const callApi = useAxios()
    return useQuery(
        [EXPENSES_KEY, 'categories'],
        () => callApi({
            method: 'GET',
            url: '/expenses/categories',
        }).then((data) => data.data),
        {
            staleTime: 10 * 60 * 1000, // 10 minutes
        }
    )
}

// Get expense stats
export const useExpenseStats = (filters = {}) => {
    const callApi = useAxios()
    return useQuery(
        [EXPENSES_KEY, 'stats', filters],
        () => callApi({
            method: 'GET',
            url: '/expenses/stats',
            params: filters,
        }).then((data) => data.data)
    )
}

// Settle up expense
export const useSettleUpExpense = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (expenseId) => callApi({
            method: 'POST',
            url: `/expenses/${expenseId}/settle-up`,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY] })
            },
        }
    )
}

// Get expense participants
export const useExpenseParticipants = (expenseId) => {
    const callApi = useAxios()
    return useQuery(
        [EXPENSES_KEY, expenseId, 'participants'],
        () => callApi({
            method: 'GET',
            url: `/expenses/${expenseId}/participants`,
        }).then((data) => data.data),
        {
            enabled: Boolean(expenseId),
        }
    )
}

// Add expense participant
export const useAddExpenseParticipant = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ expenseId, participantData }) => callApi({
            method: 'POST',
            url: `/expenses/${expenseId}/participants`,
            data: participantData,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY] })
                queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY, variables.expenseId] })
            },
        }
    )
}

// Remove expense participant
export const useRemoveExpenseParticipant = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ expenseId, participantId }) => callApi({
            method: 'DELETE',
            url: `/expenses/${expenseId}/participants/${participantId}`,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY] })
                queryClient.invalidateQueries({ queryKey: [EXPENSES_KEY, variables.expenseId] })
            },
        }
    )
} 
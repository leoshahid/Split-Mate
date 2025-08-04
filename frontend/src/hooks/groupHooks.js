import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from './useAxios'
import { GROUPS_KEY } from './commonHooks'

// Get all groups
export const useGroups = () => {
    const callApi = useAxios()
    return useQuery(
        [GROUPS_KEY],
        () => callApi({
            method: 'GET',
            url: '/groups',
        }).then((data) => data.data)
    )
}

// Get single group
export const useGroup = (id) => {
    const callApi = useAxios()
    return useQuery(
        [GROUPS_KEY, id],
        () => callApi({
            method: 'GET',
            url: `/groups/${id}`,
        }).then((data) => data.data),
        {
            enabled: Boolean(id),
        }
    )
}

// Get group balances
export const useGroupBalances = (groupId) => {
    const callApi = useAxios()
    return useQuery(
        [GROUPS_KEY, groupId, 'balances'],
        () => callApi({
            method: 'GET',
            url: `/groups/${groupId}/balances`,
        }).then((data) => data.data),
        {
            enabled: Boolean(groupId),
        }
    )
}

// Create group
export const useCreateGroup = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (groupData) => callApi({
            method: 'POST',
            url: '/groups',
            data: groupData,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY] })
            },
        }
    )
}

// Update group
export const useUpdateGroup = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ id, ...groupData }) => callApi({
            method: 'PUT',
            url: `/groups/${id}`,
            data: groupData,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY] })
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY, variables.id] })
            },
        }
    )
}

// Delete group
export const useDeleteGroup = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (id) => callApi({
            method: 'DELETE',
            url: `/groups/${id}`,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY] })
            },
        }
    )
}

// Add group member
export const useAddGroupMember = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ groupId, memberData }) => callApi({
            method: 'POST',
            url: `/groups/${groupId}/members`,
            data: memberData,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY] })
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY, variables.groupId] })
            },
        }
    )
}

// Remove group member
export const useRemoveGroupMember = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ groupId, memberId }) => callApi({
            method: 'DELETE',
            url: `/groups/${groupId}/members/${memberId}`,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY] })
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY, variables.groupId] })
            },
        }
    )
}

// Get group expenses
export const useGroupExpenses = (groupId) => {
    const callApi = useAxios()
    return useQuery(
        [GROUPS_KEY, groupId, 'expenses'],
        () => callApi({
            method: 'GET',
            url: `/groups/${groupId}/expenses`,
        }).then((data) => data.data),
        {
            enabled: Boolean(groupId),
        }
    )
}

// Settle up group
export const useSettleUpGroup = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (groupId) => callApi({
            method: 'POST',
            url: `/groups/${groupId}/settle-up`,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY] })
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY, variables] })
                queryClient.invalidateQueries({ queryKey: [GROUPS_KEY, variables, 'balances'] })
            },
        }
    )
} 
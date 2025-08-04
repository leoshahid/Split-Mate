import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from './useAxios'
import { USER_KEY } from './commonHooks'

// Get user profile
export const useUserProfile = (userId) => {
    const callApi = useAxios()
    return useQuery(
        [USER_KEY, userId, 'profile'],
        () => callApi({
            method: 'GET',
            url: `/users/${userId}/profile`,
        }).then((data) => data.data),
        {
            enabled: Boolean(userId),
        }
    )
}

// Get user preferences
export const useUserPreferences = (userId) => {
    const callApi = useAxios()
    return useQuery(
        [USER_KEY, userId, 'preferences'],
        () => callApi({
            method: 'GET',
            url: `/users/${userId}/preferences`,
        }).then((data) => data.data),
        {
            enabled: Boolean(userId),
        }
    )
}

// Update user preferences
export const useUpdateUserPreferences = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ userId, preferences }) => callApi({
            method: 'PUT',
            url: `/users/${userId}/preferences`,
            data: preferences,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [USER_KEY, variables.userId, 'preferences'] })
            },
        }
    )
}

// Get user activity
export const useUserActivity = (userId) => {
    const callApi = useAxios()
    return useQuery(
        [USER_KEY, userId, 'activity'],
        () => callApi({
            method: 'GET',
            url: `/users/${userId}/activity`,
        }).then((data) => data.data),
        {
            enabled: Boolean(userId),
        }
    )
}

// Get user stats
export const useUserStats = (userId) => {
    const callApi = useAxios()
    return useQuery(
        [USER_KEY, userId, 'stats'],
        () => callApi({
            method: 'GET',
            url: `/users/${userId}/stats`,
        }).then((data) => data.data),
        {
            enabled: Boolean(userId),
        }
    )
}

// Update user avatar
export const useUpdateUserAvatar = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ userId, avatarData }) => callApi({
            method: 'PUT',
            url: `/users/${userId}/avatar`,
            data: avatarData,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [USER_KEY, variables.userId, 'profile'] })
            },
        }
    )
}

// Get user notifications
export const useUserNotifications = (userId) => {
    const callApi = useAxios()
    return useQuery(
        [USER_KEY, userId, 'notifications'],
        () => callApi({
            method: 'GET',
            url: `/users/${userId}/notifications`,
        }).then((data) => data.data),
        {
            enabled: Boolean(userId),
        }
    )
}

// Mark notification as read
export const useMarkNotificationRead = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ userId, notificationId }) => callApi({
            method: 'PUT',
            url: `/users/${userId}/notifications/${notificationId}/read`,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [USER_KEY, variables.userId, 'notifications'] })
            },
        }
    )
}

// Mark all notifications as read
export const useMarkAllNotificationsRead = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (userId) => callApi({
            method: 'PUT',
            url: `/users/${userId}/notifications/read-all`,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [USER_KEY, variables, 'notifications'] })
            },
        }
    )
}

// Get user settings
export const useUserSettings = (userId) => {
    const callApi = useAxios()
    return useQuery(
        [USER_KEY, userId, 'settings'],
        () => callApi({
            method: 'GET',
            url: `/users/${userId}/settings`,
        }).then((data) => data.data),
        {
            enabled: Boolean(userId),
        }
    )
}

// Update user settings
export const useUpdateUserSettings = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        ({ userId, settings }) => callApi({
            method: 'PUT',
            url: `/users/${userId}/settings`,
            data: settings,
        }).then((data) => data.data),
        {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries({ queryKey: [USER_KEY, variables.userId, 'settings'] })
            },
        }
    )
}

// Delete user account
export const useDeleteUserAccount = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (userId) => callApi({
            method: 'DELETE',
            url: `/users/${userId}`,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.clear()
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            },
        }
    )
} 
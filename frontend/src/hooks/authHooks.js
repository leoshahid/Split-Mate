import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from './useAxios'
import { AUTH_KEY } from './commonHooks'

// Get current user
export const useCurrentUser = () => {
    const callApi = useAxios()
    return useQuery(
        [AUTH_KEY, 'currentUser'],
        () => callApi({
            method: 'GET',
            url: '/auth/me',
        }).then((data) => data.data),
        {
            retry: false,
            staleTime: 5 * 60 * 1000, // 5 minutes
        }
    )
}

// Login
export const useLogin = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (credentials) => callApi({
            method: 'POST',
            url: '/auth/login',
            data: credentials,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [AUTH_KEY] })
            },
        }
    )
}

// Signup
export const useSignup = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (userData) => callApi({
            method: 'POST',
            url: '/auth/signup',
            data: userData,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [AUTH_KEY] })
            },
        }
    )
}

// Google Auth
export const useGoogleAuth = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (googleData) => callApi({
            method: 'POST',
            url: '/auth/google',
            data: googleData,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [AUTH_KEY] })
            },
        }
    )
}

// Send verification code
export const useSendVerificationCode = () => {
    const callApi = useAxios()

    return useMutation(
        (emailData) => callApi({
            method: 'POST',
            url: '/auth/send-verification',
            data: emailData,
        }).then((data) => data.data)
    )
}

// Verify email
export const useVerifyEmail = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (verificationData) => callApi({
            method: 'POST',
            url: '/auth/verify-email',
            data: verificationData,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [AUTH_KEY] })
            },
        }
    )
}

// Logout
export const useLogout = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        () => callApi({
            method: 'POST',
            url: '/auth/logout',
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

// Update profile
export const useUpdateProfile = () => {
    const callApi = useAxios()
    const queryClient = useQueryClient()

    return useMutation(
        (profileData) => callApi({
            method: 'PUT',
            url: '/auth/profile',
            data: profileData,
        }).then((data) => data.data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [AUTH_KEY] })
            },
        }
    )
}

// Change password
export const useChangePassword = () => {
    const callApi = useAxios()

    return useMutation(
        (passwordData) => callApi({
            method: 'PUT',
            url: '/auth/change-password',
            data: passwordData,
        }).then((data) => data.data)
    )
} 
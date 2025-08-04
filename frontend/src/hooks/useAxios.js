import { useCallback } from 'react'
import axios from 'axios'

/**
 * Returns a function that can be used to call an API.
 * This function wraps the axios instance.
 */
const useAxios = (baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001/api') => {
    const callApi = useCallback(
        async ({ headers = {}, ...rest }) => {
            try {
                // Get token from localStorage (simple approach for SplitMate)
                const token = localStorage.getItem('token')

                const { data } = await axios({
                    baseURL: baseUrl,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }),
                        ...headers,
                    },
                    ...rest,
                    validateStatus: (status) => status >= 200 && status <= 299,
                })
                return data
            } catch (err) {
                if (err && err.response && err.response.status === 401) {
                    // Clear authentication data
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    // Reload page to redirect to login (since we don't have React Router)
                    window.location.reload()
                } else if (err && err.response && err.response.status === 503) {
                    console.error('Service temporarily unavailable')
                    // Could show a maintenance modal here
                } else if (err && err.response && err.response.status === 404) {
                    console.error('Resource not found')
                    // Could show a not found page here
                }
                throw err
            }
        },
        [baseUrl],
    )

    return callApi
}

export default useAxios 
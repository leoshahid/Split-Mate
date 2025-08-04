import { useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useAxios = (baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001/api') => {
    const navigate = useNavigate()

    const callApi = useCallback(
        async ({ headers = {}, ...rest }) => {
            try {
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
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                    navigate('/login')
                } else if (err && err.response && err.response.status === 503) {
                    navigate('/maintenance')
                } else if (err && err.response && err.response.status === 404) {
                    navigate('/not-found')
                }
                throw err
            }
        },
        [navigate, baseUrl],
    )

    return callApi
}

export default useAxios 
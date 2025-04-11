import axios from 'axios'

import refresh from "../api/refresh.tsx"
import Config from "../utils/Config.tsx"

const api = axios.create({
    baseURL: Config.api.__base__,
})

api.interceptors.response.use(response => {
    return response
}, async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== Config.api.refresh) {
        try {
            const response = await refresh()
            originalRequest.headers.Authorization = `Bearer ${response.tokens.access}`
            return api(originalRequest)
        } catch {
            throw error
        }
    }
    throw error
})

export default api

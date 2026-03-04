import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // send HTTP-only cookies automatically
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// ──────────────────────────────────────────────────────────────
// Response interceptor – handle 401 with silent cookie refresh
// ──────────────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
    resolve: () => void;
    reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve();
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // If 401 and not already retried and not the refresh endpoint itself
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/api/auth/refresh')
        ) {
            if (isRefreshing) {
                // Queue up while refresh is in progress
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: () => resolve(api(originalRequest)),
                        reject,
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh – backend will set new accessToken cookie
                await axios.post(
                    `${API_BASE_URL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                processQueue(null);
                // Retry the original request – new cookie is set automatically
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                // Redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;

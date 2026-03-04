import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://stayindia-booking-mern-hotel-booking-5.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials:true
});

// Request interceptor for API calls
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for API calls
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        // Handle 401 unauthenticated
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            // Logout user if token is invalid
            try {
                const { default: useAuthStore } = await import('../store/useAuthStore');
                useAuthStore.getState().logout();
            } catch (e) {
                localStorage.removeItem('token');
            }
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosClient;

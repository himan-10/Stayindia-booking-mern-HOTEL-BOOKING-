import { create } from 'zustand';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: localStorage.getItem('token') || null,

    loadUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            set({ isLoading: false, isAuthenticated: false, user: null });
            return;
        }
        try {
            const res = await axiosClient.get('/auth/me');
            set({ user: res.data.user, isAuthenticated: true, isLoading: false, token });
        } catch {
            set({ isLoading: false, isAuthenticated: false, user: null, token: null });
            localStorage.removeItem('token');
        }
    },

    login: async (email, password) => {
        try {
            const res = await axiosClient.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            set({ user: res.data.user, isAuthenticated: true, token: res.data.token });
            toast.success('Logged in successfully!');
            return true;
        } catch (err) {
            toast.error(err.response?.data?.error || 'Login failed');
            return false;
        }
    },

    register: async (name, email, password) => {
        try {
            const res = await axiosClient.post('/auth/register', { name, email, password });
            localStorage.setItem('token', res.data.token);
            set({ user: res.data.user, isAuthenticated: true, token: res.data.token });
            toast.success('Registered successfully!');
            return true;
        } catch (err) {
            toast.error(err.response?.data?.error || 'Registration failed');
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, isAuthenticated: false, token: null });
        toast.info('Logged out');
    },
}));

export default useAuthStore;

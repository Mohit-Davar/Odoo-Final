import axios from 'axios';
import { create } from 'zustand';

import { api } from '@/api/BaseAPI.js';

export const useAuthStore = create((set, get) => {
    const setAccessToken = (token) => {
        set({ accessToken: token });
    };

    // Request Interceptor
    api.interceptors.request.use((config) => {
        const token = get().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const logout = async () => {
        try {
            // Optional: hit the server to clear session/cookies
            await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {}, { withCredentials: true });
        } catch (err) {
            console.error('Logout API error:', err);
        } finally {
            // Clear token locally
            set({ accessToken: null });
            // Redirect to login
            window.location.href = '/login';
        }
    };

    // Response Interceptor with auto refresh
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (!originalRequest || originalRequest._retry) return Promise.reject(error);

            if (error.response?.status === 401) {
                originalRequest._retry = true;
                try {
                    const res = await axios.get(
                        `${import.meta.env.VITE_BASE_URL}/auth/session`,
                        { withCredentials: true }
                    );
                    const newToken = res.data.accessToken;
                    set({ accessToken: newToken });
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );

    return {
        accessToken: null,
        setAccessToken,
        logout
    };
});
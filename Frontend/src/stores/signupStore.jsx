import { create } from 'zustand';

export const useSignupStore = create((set) => ({
    userDetails: {
        email: '',
        name: ''
    },

    setUserDetails: (details) => set({ userDetails: details }),

    clearSignupData: () => set({
        userDetails: {
            email: '',
            name: ''
        }
    }),
}));
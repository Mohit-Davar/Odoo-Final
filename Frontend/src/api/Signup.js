import axios from 'axios';

export const newUser = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`, { name, email, password }, { withCredentials: true });
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Internal Servor error during Signup");
    }
};
export const verifyOTP = async ({ email, otp }) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/otp`, { email, otp }, { withCredentials: true });
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Internal Servor error during OTP verification");
    }
};
export const resendOTP = async ({ email }) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_BASE_URL}/auth/otp`, { email }, { withCredentials: true });
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Internal Servor error");
    }
};
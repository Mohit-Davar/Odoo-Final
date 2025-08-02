import { z } from 'zod';

export const signupSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(50, "Name must be under 50 characters")
        .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password must be under 64 characters"),

    rememberMe: z.boolean().optional()
});

export const otpSchema = z.object({
    otp: z.string()
        .min(1, "OTP is required")
        .length(6, "OTP must be 6 digits")
})
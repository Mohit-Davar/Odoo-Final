import {
    newUser,
    resendOTP,
    verifyOTP,
} from '@/api/Signup';
import {
    showErrorToast,
    showSuccessToast,
} from '@/lib/showToast';

export const handleUserSignup = async (
    data,
    setUserDetails,
    onSuccess
) => {
    try {
        const { message } = await newUser(data);
        showSuccessToast(message);
        setUserDetails({
            email: data.email,
            name: data.name
        });
        onSuccess();
    } catch (error) {
        showErrorToast(error?.message || "Failed to signup");
    }
};

export const handleVerifyOTP = async (
    data,
    setAccessToken,
    email,
    navigate
) => {
    if (!email) {
        showErrorToast("Missing user details.");
        return;
    }
    try {
        const { accessToken } = await verifyOTP({
            email: email,
            otp: data.otp
        });
        setAccessToken(accessToken);
        navigate("/home");
    } catch (err) {
        showErrorToast(err?.message || "Failed to verify OTP");
    }
};

export const handleResendOTP = async (
    setIsResending,
    email,
    name,
) => {
    if (!email || !name) {
        showErrorToast("Missing user details.");
        return;
    }
    setIsResending(true);
    try {
        await resendOTP({ email, name });
        showSuccessToast("OTP resent successfully");
    } catch (err) {
        showErrorToast(err?.message || "Failed to resend OTP");
    } finally {
        setIsResending(false);
    }
};
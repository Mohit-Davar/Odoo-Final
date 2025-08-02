import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { otpSchema } from '@/schema/signup';
import { useAuthStore } from '@/stores/authStore';
import { useSignupStore } from '@/stores/signupStore';
import {
    handleResendOTP,
    handleVerifyOTP,
} from '@/handlers/signup';
import {
    Button,
    InputOtp,
    Spinner,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';

export default function OtpVerification() {

    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm({
        mode: 'onChandge',
        resolver: zodResolver(otpSchema)
    });
    const [isResending, setIsResending] = useState(false);
    const { setAccessToken } = useAuthStore();
    const { userDetails: { email, name } } = useSignupStore();

    const onSubmit = async (data) => handleVerifyOTP(data, setAccessToken, email, navigate);

    const onResend = async () => handleResendOTP(setIsResending, email, name);

    return (
        <>
            {/* Heading */}
            <h2 className="font-bold text-primary text-2xl text-center">Verify Email</h2>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6">
                {/* OTP input */}
                <InputOtp
                    isInvalid={!!errors.otp}
                    length={6}
                    errorMessage="Invalid OTP code"
                    {...register("otp")}
                />
                {/* Vrify OTP Button */}
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    spinner={<Spinner variant="simple" size='sm' />}
                    variant='ghost'
                    color='primary'
                    className='w-full'
                >
                    {isSubmitting ? "" : "Verify Email"}
                </Button>
            </form>
            {/* Resend Button */}
            <div className="flex justify-center">
                <span className="text-slate-600 text-sm">Didn&apos;t receive the code?
                    <button
                        type='button'
                        onClick={onResend}
                        disabled={isResending || isSubmitting}
                        className="sm:inline ml-1 font-bold text-primary decoration-2 enabled:hover:underline underline-offset-4 hblock"
                    >
                        Resend
                    </button>
                </span>
            </div>
        </>
    );
}
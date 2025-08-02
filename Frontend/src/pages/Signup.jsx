import {
    useEffect,
    useState,
} from 'react';
import { motion } from 'framer-motion';
import SignupForm from '@/components/signup/Form';
import OtpVerification from '@/components/signup/OTP';
import { useSignupStore } from '@/stores/signupStore';

export default function SignupPage() {
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const { clearSignupData } = useSignupStore();
    const handleFormSubmitSuccess = () => setVerifyingOtp(true);

    useEffect(() => {
        return () => {
            clearSignupData();
        };
    }, [clearSignupData]);

    return (
        <main className="flex justify-center items-center bg-primary p-4 w-full min-h-screen">
            <motion.div
                transition={{
                    duration: 0.2,
                    ease: "linear"
                }}
                layout
                className="flex flex-col gap-6 bg-white px-[10vw] sm:px-16 py-10 rounded-xl w-[30rem] font-Poppins"
            >
                {verifyingOtp
                    ? <OtpVerification />
                    : <SignupForm onSuccess={handleFormSubmitSuccess} />
                }
            </motion.div>
        </main>
    );
}
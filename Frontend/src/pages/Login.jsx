import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
    Link,
    useNavigate,
} from 'react-router-dom';
import { PasswordInput } from '@/components/ui/Inputs';
import { loginSchema } from '@/schema/login';
import { useAuthStore } from '@/stores/authStore';
import { handleUserLogin } from '@/handlers/login';
import {
    Button,
    Input,
    Spinner,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
    const { setAccessToken } = useAuthStore();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur'
    });

    const onSubmit = async (data) => handleUserLogin(data, setAccessToken, navigate);

    return (
        <main className="relative flex justify-center items-center bg-primary p-4 w-full min-h-screen">
            <motion.div
                transition={{
                    duration: 0.1,
                    ease: "linear"
                }}
                layout
                className="flex flex-col gap-6 bg-white shadow-lg px-[10vw] sm:px-16 py-10 rounded-xl w-[30rem] font-Poppins"
            >
                {/* Heading */}
                <h2 className="font-bold text-primary text-2xl text-center">Sign In</h2>
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    {/* Email */}
                    <div className="mb-5">
                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            isRequired
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                            {...register("email")}
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-5">
                        <PasswordInput
                            id="password"
                            isRequired
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            {...register("password")}
                        />
                    </div>
                    {/* Login Button */}
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        spinner={<Spinner variant="simple" size='sm' />}
                        variant='ghost'
                        color='primary'
                    >
                        {isSubmitting ? "" : "Login"}
                    </Button>
                </form>
                {/* Signup Link */}
                <div className="flex justify-center">
                    <span className="text-slate-600 text-sm">Don&apos;t have an account?
                        <Link to="/signup" className="block sm:inline ml-1 font-bold text-primary decoration-2 hover:underline underline-offset-4">
                            Sign up
                        </Link>
                    </span>
                </div>
            </motion.div>
        </main>
    );
}
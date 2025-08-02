import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { PasswordInput } from '@/components/ui/Inputs';
import { signupSchema } from '@/schema/signup';
import { useSignupStore } from '@/stores/signupStore';
import { handleUserSignup } from '@/handlers/signup';
import {
    Button,
    Input,
    Spinner
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignupForm({ onSuccess }) {
    const { setUserDetails } = useSignupStore();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signupSchema),
        mode: 'onBlur'
    });

    const onSubmit = async (data) => await handleUserSignup(data, setUserDetails, onSuccess);

    return (
        <>
            <h2 className="font-bold text-primary text-2xl text-center">Create My Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Name */}
                <div className="mb-5">
                    <Input
                        id="name"
                        type="text"
                        label="Full Name"
                        isRequired
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                        {...register("name")}
                    />
                </div>
                {/* Email */}
                <div className="mb-5">
                    <Input
                        id="email"
                        type="email"
                        label="Email Address"
                        isRequired
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                        {...register("email")}
                    />
                </div>
                {/* Password */}
                <div className="mb-3">
                    <PasswordInput
                        id="password"
                        label="Password"
                        isRequired
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                        {...register("password")}
                    />
                </div>
                {/* Submit */}
                <Button
                    type="submit"
                    isLoading={isSubmitting}
                    spinner={<Spinner variant="simple" size='sm' />}
                    variant='ghost'
                    color='primary'
                >
                    {isSubmitting ? "" : "Get OTP"}
                </Button>
            </form>

            {/* SignIn Link */}
            <div className="flex justify-center mt-4">
                <span className="text-slate-600 text-sm">
                    Already have an account?
                    <Link to="/login" className="ml-1 font-bold text-primary hover:underline">
                        Sign in
                    </Link>
                </span>
            </div>
        </>
    );
}
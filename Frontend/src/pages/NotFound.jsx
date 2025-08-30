import {
    Link,
    useNavigate
} from 'react-router-dom';
import { Button } from '@heroui/react';
import {
    Home,
    ArrowLeft,
    Mail
} from 'lucide-react';

export default function Error() {
    const navigate = useNavigate();

    return (
        <main className="relative flex justify-center items-center bg-background px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="mx-auto max-w-4xl text-center">
                {/* Logo/Brand */}
                <div className="mb-8">
                    <h1 className="mb-2 font-bold text-white text-3xl">
                        Event<span className="text-red-500">Hive</span>
                    </h1>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 mx-auto w-16 h-0.5"></div>
                </div>

                {/* Error Content */}
                <div className="space-y-8">
                    {/* 404 Number */}
                    <div className="bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 font-black text-transparent text-8xl sm:text-9xl">
                        404
                    </div>

                    {/* Error Message */}
                    <div className="space-y-4">
                        <h2 className="font-bold text-white text-2xl sm:text-3xl">
                            Page Not Found
                        </h2>

                        <p className="mx-auto max-w-2xl text-gray-300 text-lg leading-relaxed">
                            Oops! The page you&apos;re looking for seems to have vanished into the digital void.
                            Don&apos;t worry, even the best events sometimes take unexpected turns.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex sm:flex-row flex-col justify-center items-center sm:space-x-6 space-y-4 sm:space-y-0 mt-12">
                        <Button
                            color="primary"
                            variant="solid"
                            size="lg"
                            radius="full"
                            startContent={<ArrowLeft className="w-5 h-5" />}
                            onPress={() => navigate(-1)}
                            className="px-8 py-3 font-semibold text-gray-300 transition-all duration-300"
                        >
                            Go Back
                        </Button>

                        <Button
                            color="default"
                            variant="bordered"
                            size="lg"
                            radius="full"
                            startContent={<Home className="w-5 h-5" />}
                            onPress={() => navigate('/')}
                            className="hover:bg-gray-800/50 px-8 py-3 border-gray-600 hover:border-gray-400 font-semibold text-gray-300 hover:text-white transition-all duration-300"
                        >
                            Home
                        </Button>
                    </div>

                    {/* Help Section */}
                    <div className="mt-16">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="from-transparent via-gray-600 to-transparent border-gradient-to-r border-t w-full"></div>
                            </div>
                            <div className="relative flex justify-center">
                                <div className="bg-gray-900 px-6 py-3 border border-gray-700 rounded-full">
                                    <span className="font-medium text-gray-400 text-sm">
                                        Need Help?
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mt-4">
                            <p className="mx-auto max-w-xl text-gray-400 text-sm">
                                If you believe this is an error or need assistance, our support team is here to help.
                            </p>

                            <Link
                                to="/"
                                className="flex sm:flex-row flex-col justify-center items-center sm:space-x-6 space-y-3 sm:space-y-0">
                                <Button
                                    variant="light"
                                    size="sm"
                                    color='primary'
                                    radius="full"
                                    startContent={<Mail className="w-4 h-4" />}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                    Contact Support
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
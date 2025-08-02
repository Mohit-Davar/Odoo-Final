import 'react-toastify/dist/ReactToastify.css';
import {
    AlertCircle,
    AlertTriangle,
} from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import { cn } from '@/lib/clsx';

export const Toast = () => (
    <ToastContainer
        newestOnTop
    />
);

export function LoadingError({ title, message, className }) {
    return (
        <div className={cn(
            "mb-6 p-4 border-2 border-red-400 bg-red-50 rounded-lg flex items-center gap-4",
            className
        )}
            role="alert"
        >

            <AlertTriangle className="text-red-500 shrink-0" size={24} />
            <div className="flex-1">
                <p className="font-medium text-red-700">{title}</p>
                <p className="text-red-600 text-sm">{message}</p>
            </div>
        </div>
    );
}

export function EmptyState({ message }) {
    return (
        <div className="flex flex-col justify-center items-center py-12 text-gray-500">
            <p className="mb-4">{message}</p>
        </div>
    );
}

export function FetchError({ message }) {
    return (
        <div className="flex items-center gap-2 bg-red-50 mb-4 p-3 border border-red-200 rounded-lg text-red-700">
            <AlertCircle size={16} />
            <span className="text-sm">{message}</span>
        </div>
    );
}
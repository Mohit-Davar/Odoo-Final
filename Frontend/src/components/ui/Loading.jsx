import { cn } from '@/lib/clsx';

export function ListSkeleton({ repetitions = 5, className }) {
    const skeletonItems = Array.from({ length: repetitions }, (_, index) => (
        <div key={index} className="flex justify-between items-center pt-4">
            <div>
                <div className="bg-gray-300 mb-2.5 rounded-full w-24 h-2.5"></div>
                <div className="bg-gray-200 rounded-full w-32 h-2"></div>
            </div>
            <div className="bg-gray-300 rounded-full w-12 h-2.5"></div>
        </div>
    ));

    return (
        <div
            role="status"
            className={cn(
                "p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-sm animate-pulse md:p-6",
                className
            )}
        >
            {skeletonItems}
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export function WidgetSkeleton() {
    return (
        <div role="status" className="shadow-sm p-4 md:p-6 border border-gray-200 rounded-sm animate-pulse duration-100">
            <div className="bg-gray-200 mb-2.5 rounded-full w-32 h-2.5"></div>
            <div className="bg-gray-200 mb-10 rounded-full w-48 h-2"></div>
            <div className="flex items-baseline mt-4">
                <div className="bg-gray-200 rounded-t-lg w-full h-72"></div>
                <div className="bg-gray-200 ms-6 rounded-t-lg w-full h-56"></div>
                <div className="bg-gray-200 ms-6 rounded-t-lg w-full h-72"></div>
                <div className="bg-gray-200 ms-6 rounded-t-lg w-full h-64"></div>
                <div className="bg-gray-200 ms-6 rounded-t-lg w-full h-80"></div>
                <div className="bg-gray-200 ms-6 rounded-t-lg w-full h-72"></div>
                <div className="bg-gray-200 ms-6 rounded-t-lg w-full h-80"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
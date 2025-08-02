import { cn } from '@/lib/clsx';

export function BrutalButton({ className, children, ...props }) {
    return (
        <button
            className={cn(
                "shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)]",
                "sm:px-4 sm:py-2 p-2 rounded-md border-2 uppercase border-black text-sm transition duration-200",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
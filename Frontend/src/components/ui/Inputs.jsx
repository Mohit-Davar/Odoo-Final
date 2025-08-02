import { useState } from 'react';
import {
    EyeFilledIcon,
    EyeSlashFilledIcon,
} from '@/components/ui/Icons';
import { Input } from '@heroui/react';

export function PasswordInput(props) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Input
            endContent={
                <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-default-400 text-2xl pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-default-400 text-2xl pointer-events-none" />
                    )}
                </button>
            }
            label="Password"
            type={isVisible ? "text" : "password"}
            {...props}
        />
    );
}

export function SearchBar({ searchQuery, onSearchChange, label }) {
    return (
        <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="mb-6"
            label={label}
        />
    );
}
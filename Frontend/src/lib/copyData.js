import {
    showErrorToast,
    showSuccessToast,
} from '@/lib/showToast';

export const copyData = (token) => {
    try {
        navigator.clipboard.writeText(token);
        showSuccessToast("Copied.");
    } catch {
        showErrorToast("Failed to copy.");
    }
};
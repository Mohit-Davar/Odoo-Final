import {
    Bounce,
    toast,
} from 'react-toastify';

const DEFAULT_TOAST_OPTIONS = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style: {
        width: "100%",
        maxWidth: "400px",
        margin: "50px auto",
        borderRadius: "10px",
        textAlign: "center",
        fontFamily: "Poppins",
        padding: "20px 30px 20px 20px",
    }
};

export const showErrorToast = (message) => {
    toast.error(message, DEFAULT_TOAST_OPTIONS);
};

export const showSuccessToast = (message) => {
    toast.success(message, DEFAULT_TOAST_OPTIONS);
};

export const showInfoToast = (message) => {
    toast.info(message, DEFAULT_TOAST_OPTIONS);
};

export const showWarnToast = (message) => {
    toast.warn(message, DEFAULT_TOAST_OPTIONS);
};